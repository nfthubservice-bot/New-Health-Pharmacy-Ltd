
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

// Added missing ChatMessage interface to support clinical AI assistant history
export interface ChatMessage {
  role: 'user' | 'model';
  parts: {
    text?: string;
    inlineData?: {
      data: string;
      mimeType: string;
    };
    functionCall?: {
      name: string;
      args: any;
    };
    functionResponse?: {
      name: string;
      response: any;
    };
  }[];
  groundingMetadata?: any;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
}

export interface BookingFormState {
  name: string;
  phone: string;
  address: string;
  needs: string;
  date: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
}

export type Page = 'home' | 'about' | 'services' | 'booking' | 'testimonials' | 'contact' | 'privacy';
export type AspectRatio = "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";
export type ImageSize = "1K" | "2K" | "4K";
