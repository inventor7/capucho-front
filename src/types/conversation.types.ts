export interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  wilaya?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  merchant_id: string;
  customer_id: string;
  channel: string; // whatsapp, facebook, instagram, telegram
  status: string; // active, resolved, abandoned
  context?: any; // JSONB field - Current cart, user intent, etc.
  last_message_at: string;
  created_at: string;
  customer: Customer;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: string; // customer, bot, agent
  content: string;
  metadata?: any; // JSONB field - Media URLs, button clicks, etc.
  ai_context?: any; // JSONB field - Prompt, model used, tokens
  created_at: string;
}