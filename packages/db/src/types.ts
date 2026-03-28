export type Tier = 'orbite' | 'ariane' | 'interstellar' | 'multivers'
export type ProjectStatus = 'building' | 'review' | 'live' | 'paused'
export type TicketStatus = 'open' | 'in_progress' | 'review' | 'done' | 'rejected'
export type TicketType = 'content' | 'feature' | 'bug' | 'scope_exceeded'
export type ContactStatus = 'lead' | 'prospect' | 'client' | 'perdu'
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          tier: Tier
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: SubscriptionStatus
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      projects: {
        Row: {
          id: string
          user_id: string
          type: 'site' | 'crm'
          status: ProjectStatus
          config: Record<string, unknown>
          deployed_url: string | null
          preview_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      tickets: {
        Row: {
          id: string
          project_id: string
          user_id: string
          type: TicketType
          status: TicketStatus
          created_by: 'client' | 'agent_ia' | 'system'
          scope_check: 'in_scope' | 'out_of_scope'
          brief: Record<string, unknown>
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>
      }
      contacts: {
        Row: {
          id: string
          project_id: string
          name: string
          email: string
          phone: string | null
          status: ContactStatus
          pipeline_stage: string | null
          score_ia: number | null
          notes: Record<string, unknown>
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
      }
      ai_usage: {
        Row: {
          id: string
          user_id: string
          date: string
          tokens_used: number
          tokens_cap: number
          cost_eur: number
        }
        Insert: Omit<Database['public']['Tables']['ai_usage']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['ai_usage']['Insert']>
      }
    }
  }
}
