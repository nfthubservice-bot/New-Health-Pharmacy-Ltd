
import { PharmacyData } from "../types";

/**
 * Fetches the pharmacy content. 
 * AI features have been removed, so this now returns curated static content.
 */
export async function fetchPharmacyContent(): Promise<PharmacyData> {
  return {
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
}
