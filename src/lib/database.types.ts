export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          civility: string | null
          origin: string | null
          contact_type: string | null
          contact_referent: string | null
          pedagogy_referent: string | null
          formation: string | null
          last_name: string
          first_name: string
          mobile_phone: string | null
          landline_phone: string | null
          email: string | null
          contact_status: string | null
          call_status: string | null
          refusal_reason: string | null
          learner_status: string | null
          financing: string | null
          appointment_status: string | null
          appointment_date: string | null
          appointment_time: string | null
          status_comment: string | null
          appointment_comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          civility?: string | null
          origin?: string | null
          contact_type?: string | null
          contact_referent?: string | null
          pedagogy_referent?: string | null
          formation?: string | null
          last_name: string
          first_name: string
          mobile_phone?: string | null
          landline_phone?: string | null
          email?: string | null
          contact_status?: string | null
          call_status?: string | null
          refusal_reason?: string | null
          learner_status?: string | null
          financing?: string | null
          appointment_status?: string | null
          appointment_date?: string | null
          appointment_time?: string | null
          status_comment?: string | null
          appointment_comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          civility?: string | null
          origin?: string | null
          contact_type?: string | null
          contact_referent?: string | null
          pedagogy_referent?: string | null
          formation?: string | null
          last_name?: string
          first_name?: string
          mobile_phone?: string | null
          landline_phone?: string | null
          email?: string | null
          contact_status?: string | null
          call_status?: string | null
          refusal_reason?: string | null
          learner_status?: string | null
          financing?: string | null
          appointment_status?: string | null
          appointment_date?: string | null
          appointment_time?: string | null
          status_comment?: string | null
          appointment_comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          siret: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          phone: string | null
          email: string | null
          website: string | null
          sector: string | null
          contact_civility: string | null
          contact_last_name: string | null
          contact_first_name: string | null
          contact_role: string | null
          contact_phone: string | null
          contact_email: string | null
          referent: string | null
          apprentice_count: number
          relationship_status: string | null
          comments: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          siret?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          sector?: string | null
          contact_civility?: string | null
          contact_last_name?: string | null
          contact_first_name?: string | null
          contact_role?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          referent?: string | null
          apprentice_count?: number
          relationship_status?: string | null
          comments?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          siret?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          sector?: string | null
          contact_civility?: string | null
          contact_last_name?: string | null
          contact_first_name?: string | null
          contact_role?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          referent?: string | null
          apprentice_count?: number
          relationship_status?: string | null
          comments?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}