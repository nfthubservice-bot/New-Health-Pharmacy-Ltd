
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PharmacyData } from "../types";

const CACHE_KEY = 'nh_pharmacy_content_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Robust retry wrapper for API calls to handle 429 errors gracefully
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1500): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isQuotaError = error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED');
    if (retries > 0 && isQuotaError) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function fetchPharmacyContent(): Promise<PharmacyData> {
  // 1. Check Cache first to avoid hitting quota
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    } catch (e) {
      console.warn("Cache parsing failed, fetching fresh content.");
    }
  }

  // 2. Default Data (Robust Fallback)
  const fallbackData: PharmacyData = {
    name: "New-Health Pharmacy Ltd",
    tagline: "Excellence in Health & Wellness",
    heroHook: "Your Premier Wholesale Pharmacy for Medications Supplements, Skincare, & More. Elevate Your Wellness with Us.",
    about: "Providing top-tier pharmaceutical care, diagnostic services, and wellness products with a focus on quality and authenticity.",
    valueProps: [
      { title: "Genuine Medications", description: "100% certified pharmaceutical products sourced directly with rigorous verification.", icon: "fa-shield-heart" },
      { title: "Expert Consultation", description: "Consult with our highly qualified pharmacists for personalized health advice.", icon: "fa-user-md" },
      { title: "Wholesale Value", description: "Access authentic medications at the most affordable wholesale rates in Abuja.", icon: "fa-tags" }
    ],
    reviews: [
      { author: "Idoko Joseph", text: "It's one of the pharmacy in the heart of Abuja where you can get all sorts of drugs at affordable prices. I highly recommend this place.", rating: 5, avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=150" },
      { author: "Stella A. Ogbonna", text: "Very good and accommodating. The guys are wonderful people especially their manager Philip.", rating: 5, avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150" }
    ],
    contactInfo: {
      address: "Behind LG, 4 Ajesa St, Wuse, Abuja (Plus Code: 3FJ8+HV Abuja)",
      phone: "08039366563",
      email: "info@newhealthpharmacy.com",
      hours: "Mon - Sat: 8:00 AM – 7:00 PM (Sunday: Closed)"
    }
  };

  if (!process.env.API_KEY) return fallbackData;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview as the default standard model for robust content generation
    const response: GenerateContentResponse = await withRetry(() => ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate professional pharmacy marketing content for 'New-Health Pharmacy Ltd' in Wuse, Abuja. 
      Use tagline: 'Your Premier Wholesale Pharmacy for Medications Supplements, Skincare, & More. Elevate Your Wellness with Us.'
      Focus on wholesale prices and 100% authentic medications. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            tagline: { type: Type.STRING },
            heroHook: { type: Type.STRING },
            about: { type: Type.STRING },
            valueProps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING }
                }
              }
            },
            reviews: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  author: { type: Type.STRING },
                  text: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  avatar: { type: Type.STRING }
                }
              }
            },
            contactInfo: {
              type: Type.OBJECT,
              properties: {
                address: { type: Type.STRING },
                phone: { type: Type.STRING },
                email: { type: Type.STRING },
                hours: { type: Type.STRING }
              }
            }
          },
          required: ["name", "tagline", "heroHook", "about", "valueProps", "reviews", "contactInfo"]
        }
      }
    }));

    const parsed = JSON.parse(response.text || "{}") as PharmacyData;
    
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: parsed,
      timestamp: Date.now()
    }));

    return parsed;
  } catch (error: any) {
    console.warn("Gemini Service Fallback active.");
    return fallbackData;
  }
}
