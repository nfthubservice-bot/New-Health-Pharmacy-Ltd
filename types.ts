
export interface PharmacyData {
  name: string;
  tagline: string;
  heroHook: string;
  about: string;
  valueProps: {
    title: string;
    description: string;
    icon: string;
  }[];
  reviews: {
    author: string;
    text: string;
    rating: number;
    avatar: string;
  }[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text?: string; inlineData?: { data: string; mimeType: string } }[];
  groundingMetadata?: any;
}

export type Page = 'home' | 'about' | 'services' | 'gallery' | 'testimonials' | 'ai-hub' | 'contact';
export type AspectRatio = "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";
export type ImageSize = "1K" | "2K" | "4K";
