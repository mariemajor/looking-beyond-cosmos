export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      daily_rituals: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string
          description: string
          difficulty: string
          duration_minutes: number
          elements: string[] | null
          id: string
          instructions: Json
          moon_phase: string[] | null
          season: string[] | null
          spiritual_paths: string[] | null
          title: string
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string
          description: string
          difficulty?: string
          duration_minutes: number
          elements?: string[] | null
          id?: string
          instructions: Json
          moon_phase?: string[] | null
          season?: string[] | null
          spiritual_paths?: string[] | null
          title: string
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description?: string
          difficulty?: string
          duration_minutes?: number
          elements?: string[] | null
          id?: string
          instructions?: Json
          moon_phase?: string[] | null
          season?: string[] | null
          spiritual_paths?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          created_at: string
          experience_level: string | null
          id: string
          intentions: string[] | null
          name: string | null
          preferred_elements: string[] | null
          spiritual_path: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          experience_level?: string | null
          id?: string
          intentions?: string[] | null
          name?: string | null
          preferred_elements?: string[] | null
          spiritual_path?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          experience_level?: string | null
          id?: string
          intentions?: string[] | null
          name?: string | null
          preferred_elements?: string[] | null
          spiritual_path?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      spiritual_tips: {
        Row: {
          category: string
          content: string
          created_at: string
          difficulty: string
          id: string
          spiritual_paths: string[] | null
          tags: string[] | null
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          difficulty?: string
          id?: string
          spiritual_paths?: string[] | null
          tags?: string[] | null
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          difficulty?: string
          id?: string
          spiritual_paths?: string[] | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      user_daily_content: {
        Row: {
          completed: boolean | null
          content_date: string
          created_at: string
          id: string
          notes: string | null
          ritual_id: string | null
          tip_id: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          content_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          ritual_id?: string | null
          tip_id?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          content_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          ritual_id?: string | null
          tip_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_content_ritual_id_fkey"
            columns: ["ritual_id"]
            isOneToOne: false
            referencedRelation: "daily_rituals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_daily_content_tip_id_fkey"
            columns: ["tip_id"]
            isOneToOne: false
            referencedRelation: "spiritual_tips"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
