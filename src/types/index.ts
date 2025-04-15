
export interface DisclosureProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  }
  
export interface ChakraTypes {
    variant: string;

}
export interface Partner {
  produto_valor: number;
  id: number;
  partner_id: string;
  level_id: string;
  campaign_link: string;
  logo: string;
  name: string;
  cpa_reward: number;
  cashback_perc: number;
  auth_token: string;
  _id: string;
  active: boolean;
}

export interface SearchPartner {
  _id: string;
  name: string;
  logo: string;
  cashback_perc?: number; // Para cashback
  produto_valor?: string; // Para ofertas
  type: "cashback" | "offer"; // Para diferenciar os tipos
}



export interface Address {
  cep: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
  gender: "Male" | "Female" | "Other";
  birthDate: Date;
  phone: string;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  isAdmin: boolean;
  points: number;
  cashback: number;
  level: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  profilePicture?: string;
  address: Address;
  created_at: Date;
  updated_at: Date;
}

export interface OfferProps {
  imageUrl: string;
  partnerName: string;
  cashback: string;
}

export interface CashbackProps {
  imageUrl: string;
  partnerName: string;
  currency: string;
}

export interface ApiResponse {
  id: string;
  cashback: string;
  partner_id: string;
  level_id: string;
  campaign_link: string;
  logo: string;
  name: string;
  cpa_reward: number;
  rs_reward: number;
  money_reward: number;
  auth_token: string;
  active: boolean;
  reward_type:  string;
  cashback_perc: number;
  profile_banner: string;
  campaign_banner: string;
  rules: string;
  created_at: string;
  updated_at: string;
  _id: string;
}
