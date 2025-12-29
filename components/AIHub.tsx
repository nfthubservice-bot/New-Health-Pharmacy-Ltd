
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type, Modality, FunctionDeclaration, LiveServerMessage, GenerateContentResponse } from "@google/genai";
import { ChatMessage, PharmacyData } from '../types';

const WEBSITE_SERVICES = [
  "Personalized Health Consultations: In-store or telephonic consultations with expert pharmacists to offer personalized health advice.",
  "Medical Equipment and Supply Sales: Blood pressure monitors, diabetes care products, and mobility aids.",
  "Health Screenings: Basic health screening services like blood pressure checks and cholesterol monitoring.",
  "Chronic Disease Support: Specialized management for diabetes, hypertension, and asthma.",
  "Wellness and Lifestyle Products: Vitamins, supplements, and wellness items for healthy lifestyles.",
  "Home Delivery of Medications: YES, we offer prompt delivery services for prescription medications and health products.",
  "Health Consultations: Our knowledgeable pharmacists are available to provide health advice and support, ensuring you make informed decisions about your health."
];

const pharmacyTools: FunctionDeclaration[] = [
  {
    name: 'checkStock',
    parameters: {
      type: Type.OBJECT,
      description: 'Check if a specific medication or health product is currently in stock at the pharmacy.',
      properties: {
        productName: { type: Type.STRING, description: 'The name of the medication or product to check.' },
      },
      required: ['productName'],
    },
  },
  {
    name: 'bookConsultation',
    parameters: {
      type: Type.OBJECT,
      description: 'Schedule a professional consultation with a clinical specialist.',
      properties: {
        date: { type: Type.STRING, description: 'Preferred date for the consultation (YYYY-MM-DD).' },
        specialty: { type: Type.STRING, description: 'The area of health concern (e.g., Pediatrics, Geriatrics, Chronic Pain).' },
      },
      required: ['date', 'specialty'],
    },
  },
];

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface AIHubProps {
  pharmacyData: PharmacyData;
}

const AIHub: React.FC<AIHubProps> = ({ pharmacyData }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <div className="bg-emerald-600/10 dark:bg-emerald-400/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-100 dark:border-emerald-800 transition-colors">
            <i className="fa-solid fa-wand-magic-sparkles text-3xl text-emerald-600 dark:text-emerald-400 drop-shadow-sm"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight transition-colors uppercase">AI Health Hub</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto transition-colors font-medium">
            Experience the future of personalized healthcare with our suite of advanced AI assistants.
          </p>
        </div>

        <div className="flex justify-center space-x-2 mb-10 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-md mx-auto transition-all">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 rounded-xl font-black transition-all flex items-center justify-center space-x-3 text-sm uppercase tracking-widest ${activeTab === 'chat' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <i className="fa-solid fa-comment-medical text-lg"></i>
            <span>Assistant</span>
          </button>
          <button 
            onClick={() => setActiveTab('voice')}
            className={`flex-1 py-4 rounded-xl font-black transition-all flex items-center justify-center space-x-3 text-sm uppercase tracking-widest ${activeTab === 'voice' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <i className="fa-solid fa-wave-square text-lg"></i>
            <span>Voice</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 min-h-[600px] overflow-hidden transition-all duration-500">
          {activeTab === 'chat' && <ChatAssistant pharmacyData={pharmacyData} />}
          {activeTab === 'voice' && <VoiceAssistant pharmacyData={pharmacyData} />}
        </div>
      </div>
    </div>
  );
};

const ChatAssistant: React.FC<{ pharmacyData: PharmacyData }> = ({ pharmacyData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('nh_chat_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [{ role: 'model', parts: [{ text: "Welcome to New-Health Pharmacy. I am your Clinical AI Assistant. I can help with drug information, check our local stock, or analyze clinical images. How can I assist your health journey today?" }] }];
  });
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('nh_chat_history', JSON.stringify(messages));
  }, [messages, loading]);

  const clearChat = () => {
    const defaultMsg: ChatMessage[] = [{ role: 'model', parts: [{ text: "Chat history cleared. How can I assist you now?" }] }];
    setMessages(defaultMsg);
    localStorage.removeItem('nh_chat_history');
  };

  const callAIWithRetry = async (ai: GoogleGenAI, config: any, retries = 3, delay = 2000): Promise<GenerateContentResponse> => {
    try {
      return await ai.models.generateContent(config);
    } catch (error: any) {
      const is429 = error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED');
      if (retries > 0 && is429) {
        await new Promise(r => setTimeout(r, delay));
        return callAIWithRetry(ai, config, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: ChatMessage = { 
      role: 'user', 
      parts: [
        ...(selectedImage ? [{ inlineData: { data: selectedImage.split(',')[1], mimeType: 'image/jpeg' } }] : []),
        { text: input }
      ]
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const modelName = deepAnalysis ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
      
      const websiteContext = `
        BUSINESS: ${pharmacyData.name}. Location: ${pharmacyData.contactInfo.address}.
        Plus Code: 3FJ8+HV Abuja. Phone: ${pharmacyData.contactInfo.phone}.
        Hours: Mon-Sat 8am-7pm (Sun Closed).
        Services: ${WEBSITE_SERVICES.join(', ')}.
        Delivery: YES, we deliver.
      `;

      let tools: any[] = [];
      if (deepAnalysis) {
        tools = [{ functionDeclarations: pharmacyTools }];
      } else {
        tools = [{ googleSearch: {} }];
      }

      const response = await callAIWithRetry(ai, {
        model: modelName,
        contents: [...messages, userMessage].map(m => ({ role: m.role, parts: m.parts })),
        config: {
          systemInstruction: `You are the New-Health Clinical Specialist. ${websiteContext} Be empathetic. Use real context.`,
          tools: tools,
          // Optimization: Removed explicit thinkingBudget to let Gemini 3 models decide
        }
      });

      const functionCalls = response.candidates?.[0]?.content?.parts.filter(p => p.functionCall);
      if (functionCalls && functionCalls.length > 0) {
        const toolResults = functionCalls.map(fc => {
          const name = fc.functionCall!.name;
          const args = fc.functionCall!.args as any;
          let result = { status: 'Success', message: 'Task completed.' };
          if (name === 'checkStock') result = { status: 'Checking...', message: `${args.productName} is likely in stock at our Wuse branch.` };
          return { functionResponse: { name, response: { result } } };
        });

        const secondResponse = await callAIWithRetry(ai, {
          model: modelName,
          contents: [
            ...messages,
            userMessage,
            { role: 'model', parts: response.candidates?.[0]?.content?.parts || [] },
            { role: 'user', parts: toolResults as any }
          ],
          config: { tools: [{ functionDeclarations: pharmacyTools }] }
        });

        setMessages(prev => [...prev, { role: 'model', parts: [{ text: secondResponse.text }] }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'model', 
          parts: [{ text: response.text || "I'm processing that. One moment." }],
          groundingMetadata: response.candidates?.[0]?.groundingMetadata 
        }]);
      }
    } catch (error: any) {
      console.warn("Chat Compatibility Warning:", error.message);
      let errorMsg = "I'm having a bit of trouble connecting to the clinical database. Please try again or call us at 08039366563.";
      if (error.message?.includes('429')) {
        errorMsg = "We're experiencing high volumes. For immediate support, please WhatsApp us or call 08039366563.";
      }
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: errorMsg }] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[750px] bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="px-6 md:px-10 py-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
          <span className="font-black text-slate-800 dark:text-slate-100 transition-colors tracking-tight text-lg uppercase">Clinical AI Specialist</span>
        </div>
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center space-x-2.5">
            <span className="text-[10px] md:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">Deep Analysis</span>
            <button 
              onClick={() => setDeepAnalysis(!deepAnalysis)}
              className={`w-11 h-6 rounded-full transition-all relative shadow-inner ${deepAnalysis ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${deepAnalysis ? 'left-6' : 'left-1'}`}></div>
            </button>
          </div>
          <button 
            onClick={clearChat}
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-all text-xs md:text-sm font-black flex items-center space-x-2 group"
          >
            <i className="fa-solid fa-trash-can group-hover:rotate-12 transition-transform"></i>
            <span className="hidden sm:inline uppercase tracking-widest">Clear</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
            <div className={`max-w-[90%] md:max-w-[80%] p-6 rounded-[2.5rem] shadow-sm relative ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none shadow-emerald-500/10' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-transparent dark:border-slate-700 transition-all'}`}>
              <div className={`absolute top-0 ${m.role === 'user' ? '-right-2' : '-left-2'} w-4 h-4 bg-inherit`}></div>
              {m.parts.map((p, j) => (
                <div key={j}>
                  {p.text && <p className="whitespace-pre-wrap leading-relaxed font-medium">{p.text}</p>}
                  {p.inlineData && <img src={`data:${p.inlineData.mimeType};base64,${p.inlineData.data}`} alt="Health reference" className="mt-5 rounded-[2rem] max-w-full md:max-w-md border-8 border-white dark:border-slate-700 shadow-2xl" />}
                </div>
              ))}
              {m.groundingMetadata?.groundingChunks?.map((chunk: any, k: number) => (
                <div key={k} className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-[10px] md:text-xs">
                   {chunk.web && (
                     <a href={chunk.web.uri} target="_blank" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black uppercase tracking-widest py-2">
                       <i className="fa-solid fa-earth-africa text-base"></i>
                       <span>{chunk.web.title}</span>
                     </a>
                   )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-[2.5rem] flex items-center space-x-4 transition-colors">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Assistant is reasoning...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-6 md:p-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
        {selectedImage && (
          <div className="relative inline-block mb-6 animate-fade-in group">
            <img src={selectedImage} alt="Preview" className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-[2rem] border-4 border-emerald-500 shadow-2xl transition-all group-hover:scale-105" />
            <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-xl hover:bg-red-600 transition-colors border-2 border-white dark:border-slate-900">
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        )}
        <div className="flex items-center space-x-3 md:space-x-5 bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded-[3rem] border border-slate-200 dark:border-slate-700 transition-all shadow-inner focus-within:ring-2 focus-within:ring-emerald-500/20">
          <input type="file" ref={fileInputRef} onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setSelectedImage(reader.result as string);
              reader.readAsDataURL(file);
            }
          }} accept="image/*" className="hidden" />
          
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-600 transition-all shadow-sm border border-slate-100 dark:border-slate-600 active:scale-95 group"
            title="Upload clinical image"
          >
            <i className="fa-solid fa-camera-retro text-xl md:text-2xl transition-transform group-hover:rotate-6"></i>
          </button>
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything about your health..."
            className="flex-1 min-w-0 bg-transparent px-3 md:px-5 py-3 outline-none font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors text-sm md:text-lg"
          />

          <button 
            onClick={sendMessage} 
            disabled={loading || (!input.trim() && !selectedImage)}
            className="h-12 w-12 md:h-14 md:px-10 shrink-0 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center md:space-x-3 font-black group"
          >
            <span className="hidden md:inline uppercase tracking-[0.2em] text-sm">Send</span>
            <i className="fa-solid fa-paper-plane text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const VoiceAssistant: React.FC<{ pharmacyData: PharmacyData }> = ({ pharmacyData }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcriptions, setTranscriptions] = useState<{role: string, text: string}[]>([]);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const startVoice = async () => {
    try {
      setIsActive(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const websiteContext = `
        BUSINESS KNOWLEDGE:
        - Name: ${pharmacyData.name}
        - Services Offered: ${WEBSITE_SERVICES.join(', ')}
        - Location: ${pharmacyData.contactInfo.address}
        - Google Plus Code: 3FJ8+HV Abuja
        - Home Delivery: YES, we offer prompt home delivery.
        - Hours: Monday to Saturday, 8:00 AM – 7:00 PM (Closed on Sundays).
      `;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const data = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(data.length);
              for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ 
                media: pcmBlob
              }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // IA Enhancement: Handle Function Calling in Live Voice session
            if (msg.toolCall) {
              for (const fc of msg.toolCall.functionCalls) {
                let result = "ok";
                if (fc.name === 'checkStock') {
                  result = "The requested product is in stock and available for immediate pickup or delivery.";
                } else if (fc.name === 'bookConsultation') {
                  result = "Consultation scheduled successfully. We will reach out for confirmation.";
                }
                
                sessionPromise.then(session => {
                  session.sendToolResponse({
                    functionResponses: {
                      id: fc.id,
                      name: fc.name,
                      response: { result: result },
                    }
                  });
                });
              }
            }

            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                audioContextRef.current!,
                24000,
                1
              );
              
              const source = audioContextRef.current!.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current!.destination);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current!.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (msg.serverContent?.outputTranscription) {
              setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'AI') return [...prev.slice(0, -1), { role: 'AI', text: last.text + msg.serverContent!.outputTranscription!.text }];
                return [...prev, { role: 'AI', text: msg.serverContent!.outputTranscription!.text }];
              });
            }
            if (msg.serverContent?.inputTranscription) {
              setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'You') return [...prev.slice(0, -1), { role: 'You', text: last.text + msg.serverContent!.inputTranscription!.text }];
                return [...prev, { role: 'You', text: msg.serverContent!.inputTranscription!.text }];
              });
            }
            
            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => { console.error(e); setIsActive(false); },
          onclose: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          tools: [{ functionDeclarations: pharmacyTools }], // IA Enhancement: Live Tooling
          systemInstruction: `You are the New-Health Voice Assistant. ${websiteContext} Speak with professional warmth. Help with pharmacy questions based on our specific services. If asked about home delivery, answer YES. If asked about hours, state clearly that we are open Monday to Saturday, 8:00 AM to 7:00 PM and closed on Sundays. Mention Plus Code 3FJ8+HV if asked for location details. Also mention that our knowledgeable pharmacists are available to provide health advice and support through Health Consultations.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {}
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsActive(false);
      alert("Microphone access is required for Voice Assistant.");
    }
  };

  const stopVoice = () => {
    sessionRef.current?.close();
    setIsActive(false);
  };

  return (
    <div className="p-10 md:p-20 flex flex-col items-center justify-center h-full animate-fade-in bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="relative mb-12 md:mb-16">
        <div className={`absolute inset-0 rounded-full blur-[80px] opacity-20 transition-all duration-1000 ${isActive ? 'bg-emerald-500 scale-150 animate-pulse' : 'bg-transparent'}`}></div>
        <div className={`w-56 h-56 md:w-80 md:h-80 rounded-full flex items-center justify-center border-8 transition-all duration-700 relative z-10 ${isActive ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-105 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-xl'}`}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-full">
             {isActive && (
               <div className="flex space-x-1.5 items-end h-10 md:h-16">
                 {[...Array(12)].map((_, i) => (
                   <div key={i} className="w-1 md:w-2 bg-emerald-500 rounded-full animate-pulse" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.08}s` }}></div>
                 ))}
               </div>
             )}
          </div>
          <button 
            onClick={isActive ? stopVoice : startVoice}
            className={`w-36 h-36 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center text-white transition-all shadow-2xl active:scale-90 z-20 group ${isActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <i className={`fa-solid ${isActive ? 'fa-phone-slash' : 'fa-microphone-lines'} text-4xl md:text-6xl mb-3 transition-transform group-hover:scale-110 drop-shadow-lg`}></i>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{isActive ? "End Call" : "Connect"}</span>
          </button>
        </div>
      </div>
      
      <div className="text-center mb-12 max-w-lg">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 transition-colors tracking-tight uppercase">{isActive ? "Live Consultation" : "Voice Specialist"}</h3>
        <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm transition-colors text-sm md:text-lg leading-relaxed">{isActive ? "Your health is our priority. Speak naturally, we are listening." : "Tap to connect with our clinical AI via high-fidelity real-time audio."}</p>
      </div>
      
      <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[3rem] p-6 md:p-10 h-64 md:h-80 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 transition-all shadow-inner">
        {transcriptions.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-300 dark:text-slate-600 transition-colors opacity-50">
            <i className="fa-solid fa-wave-square text-4xl mb-4 animate-pulse"></i>
            <p className="italic font-bold text-sm uppercase tracking-widest">Awaiting Audio Link...</p>
          </div>
        )}
        {transcriptions.map((t, i) => (
          <div key={i} className={`flex ${t.role === 'You' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
             <div className={`p-4 md:p-6 rounded-[2rem] max-w-[85%] text-xs md:text-base font-bold shadow-sm ${t.role === 'You' ? 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 transition-colors'}`}>
                <div className="flex items-center space-x-2 mb-2 opacity-50">
                  <i className={`fa-solid ${t.role === 'You' ? 'fa-user' : 'fa-robot'} text-[10px]`}></i>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">{t.role}</span>
                </div>
                {t.text}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIHub;
