export interface Merchant {
  id: string;
  user_id?: string;
  business_name: string;
  business_name_ar?: string;
  phone_number: string;
  whatsapp_number: string;
  subscription_tier?: string;
  subscription_status?: string;
  message_quota?: number;
  message_used?: number;
  bot_name?: string;
  bot_personality?: any; // JSONB field
  business_hours?: any; // JSONB field
  auto_responses?: any; // JSONB field
  webhook_secret?: string;
  whatsapp_session_data?: string;
  whatsapp_connected?: boolean;
  created_at: string;
  updated_at: string;
}