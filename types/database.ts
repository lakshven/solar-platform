// These types cover the tables the front-end actually reads/writes
// directly. Once your schema is deployed, regenerate the full set with:
//
//   npx supabase gen types typescript --project-id <your-project-ref> > types/database.ts
//
// ...and this file becomes redundant / gets replaced wholesale.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          source:
            | "check-your-savings"
            | "existing-solar-battery"
            | "commercial"
            | "farm"
            | "landlord"
            | "referral"
            | "contact-form"
            | "other";
          status: "new" | "contacted" | "quoted" | "converted" | "lost";
          full_name: string | null;
          email: string | null;
          phone: string | null;
          postcode: string | null;
          property_id: string | null;
          referred_by_referral_id: string | null;
          marketing_opt_in: boolean;
          notes: string | null;
          lead_score: number | null;
          lead_tier: "hot" | "warm" | "cold" | null;
          bundle_score: number | null;
          predicted_revenue: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["leads"]["Row"]> & {
          source: Database["public"]["Tables"]["leads"]["Row"]["source"];
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
        Relationships: [];
      };
      calculator_submissions: {
        Row: {
          id: string;
          lead_id: string | null;
          input: Json;
          scenarios: Json;
          recommended_scenario: string | null;
          current_annual_bill: number | null;
          address: Json | null;
          satellite: Json | null;
          location_intelligence: Json | null;
          explainability: Json | null;
          lead_intelligence: Json | null;
          confidence_score: number | null;
          lead_score: number | null;
          predicted_revenue: number | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["calculator_submissions"]["Row"]> & {
          input: Json;
          scenarios: Json;
        };
        Update: Partial<Database["public"]["Tables"]["calculator_submissions"]["Row"]>;
        Relationships: [];
      };
      commercial_enquiries: {
        Row: {
          id: string;
          lead_id: string | null;
          business_type: string | null;
          site_postcode: string | null;
          annual_consumption_kwh: number | null;
          roof_or_land_area_sqm: number | null;
          priority: string | null;
          number_of_properties: number;
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["commercial_enquiries"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["commercial_enquiries"]["Row"]>;
        Relationships: [];
      };
      case_studies: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          summary: string | null;
          system_size_kwp: number | null;
          battery_size_kwh: number | null;
          annual_saving_gbp: number | null;
          cover_image_url: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["case_studies"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["case_studies"]["Row"]>;
        Relationships: [];
      };
      employees: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          job_title: string;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["employees"]["Row"]> & {
          user_id: string;
          full_name: string;
          job_title: string;
        };
        Update: Partial<Database["public"]["Tables"]["employees"]["Row"]>;
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          employee_id: string | null;
          customer_name: string;
          address: string | null;
          job_type: string;
          status: string;
          scheduled_date: string | null;
          completed_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["jobs"]["Row"]> & {
          customer_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["jobs"]["Row"]>;
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          employee_id: string;
          job_id: string | null;
          amount: number;
          status: string;
          paid_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["payments"]["Row"]> & {
          employee_id: string;
          amount: number;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          email_verified: boolean;
          referral_code: string | null;
          referral_clicks: number;
          referral_first_clicked_at: string | null;
          referral_last_clicked_at: string | null;
          created_at: string;
          updated_at: string;
        };

        Insert: Partial<
          Database["public"]["Tables"]["customers"]["Row"]
        > & {
          full_name: string;
          email: string;
        };

        Update: Partial<
          Database["public"]["Tables"]["customers"]["Row"]
        >;

        Relationships: [];
      };
      properties: {
        Row: {
          id: string;
          customer_id: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          postcode: string;
          property_type: string;
          roof_suitability: string | null;
          existing_solar: boolean;
          existing_solar_kwp: number | null;
          existing_battery: boolean;
          heating_system: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["properties"]["Row"]> & { postcode: string };
        Update: Partial<Database["public"]["Tables"]["properties"]["Row"]>;
        Relationships: [];
      };
      maintenance_subscriptions: {
        Row: {
          id: string;
          customer_id: string;
          solar_system_id: string | null;
          status: "active" | "paused" | "cancelled";
          frequency: "quarterly" | "biannual" | "annual";
          price_amount: number;
          price_currency: string;
          next_service_date: string | null;
          next_service_time: string | null;
          payment_provider_subscription_id: string | null;
          created_at: string;
          updated_at: string;
          cancelled_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["maintenance_subscriptions"]["Row"]> & {
          customer_id: string;
          solar_system_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["maintenance_subscriptions"]["Row"]>;
        Relationships: [];
      };
      service_visits: {
        Row: {
          id: string;
          subscription_id: string;
          customer_id: string;
          employee_id: string | null;
          scheduled_date: string;
          scheduled_time: string | null;
          status: "scheduled" | "completed" | "cancelled";
          notes: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["service_visits"]["Row"]> & {
          subscription_id: string;
          scheduled_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["service_visits"]["Row"]>;
        Relationships: [];
      };
      maintenance_payments: {
        Row: {
          id: string;
          service_visit_id: string;
          subscription_id: string;
          customer_id: string;
          amount: number;
          currency: string;
          status: "pending" | "paid" | "waived" | "failed";
          reward_id: string | null;
          payment_reference: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["maintenance_payments"]["Row"]> & {
          service_visit_id: string;
          subscription_id: string;
          customer_id: string;
          amount: number;
          currency: string;
          status: "pending" | "paid" | "waived" | "failed";
        };
        Update: Partial<Database["public"]["Tables"]["maintenance_payments"]["Row"]>;
        Relationships: [];
      };
      solar_systems: {
        Row: {
          id: string;
          customer_id: string;
          capacity_kw: number;
          panel_count: number | null;
          install_date: string | null;
          inverter_type: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["solar_systems"]["Row"]> & {
          customer_id: string;
          capacity_kw: number;
        };
        Update: Partial<Database["public"]["Tables"]["solar_systems"]["Row"]>;
        Relationships: [];
      };
      payment_methods: {
        Row: {
          id: string;
          customer_id: string;
          brand: string;
          last4: string;
          exp_month: number;
          exp_year: number;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["payment_methods"]["Row"]> & {
          customer_id: string;
          last4: string;
          exp_month: number;
          exp_year: number;
        };
        Update: Partial<Database["public"]["Tables"]["payment_methods"]["Row"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          category: string;
          tags: string[];
          published_at: string;
          updated_at: string | null;
          author_name: string;
          author_role: string;
          author_initials: string;
          hero_gradient: string;
          cover_image_url: string | null;
          content: Json;
          faq: Json | null;
          featured: boolean;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
          description: string;
          category: string;
          author_name: string;
          author_role: string;
          author_initials: string;
          content: Json;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
        Relationships: [];
      };
      referrals: {
        Row: {
          id: string;

          referrer_customer_id: string;
          referred_user_id: string | null;

          referred_name: string | null;
          referred_email: string | null;

          referral_code: string;

          status:
            | "pending"
            | "contacted"
            | "booked"
            | "installation_completed"
            | "reward_issued"
            | "cancelled";

          discount_amount: number;
          discount_currency: string;
          discount_applied: boolean;
          discount_applied_at: string | null;

          installation_id: string | null;

          click_count: number;
          first_clicked_at: string | null;
          last_clicked_at: string | null;

          contacted_at: string | null;
          booked_at: string | null;
          installation_completed_at: string | null;

          reward_issued: boolean;
          reward_issued_at: string | null;

          notes: string | null;

          created_at: string;
          updated_at: string;
        };

        Insert: Partial<
          Database["public"]["Tables"]["referrals"]["Row"]
        > & {
          referrer_customer_id: string;
          referral_code: string;
        };

        Update: Partial<
          Database["public"]["Tables"]["referrals"]["Row"]
        >;

        Relationships: [
          {
            foreignKeyName: "referrals_referrer_customer_id_fkey";
            columns: ["referrer_customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      referral_rewards: {
        Row: {
          id: string;

          referral_id: string;
          customer_id: string;

          reward_type: "FREE_MAINTENANCE";

          status:
            | "pending"
            | "available"
            | "redeemed"
            | "expired"
            | "cancelled";

          maintenance_sessions: number;

          issued_at: string | null;
          redeemed_at: string | null;
          expires_at: string | null;

          maintenance_session_id: string | null;

          notes: string | null;

          created_at: string;
          updated_at: string;
        };

        Insert: Partial<
          Database["public"]["Tables"]["referral_rewards"]["Row"]
        > & {
          referral_id: string;
          customer_id: string;
        };

        Update: Partial<
          Database["public"]["Tables"]["referral_rewards"]["Row"]
        >;

        Relationships: [
          {
            foreignKeyName: "referral_rewards_referral_id_fkey";
            columns: ["referral_id"];
            isOneToOne: false;
            referencedRelation: "referrals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referral_rewards_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      energy_summary_last_30_days: {
        Row: {
          property_id: string;
          solar_generated_kwh: number;
          home_consumption_kwh: number;
          grid_imported_kwh: number;
          grid_exported_kwh: number;
          estimated_saving_gbp: number;
          co2_reduction_kg: number;
        };
        Relationships: [];
      };
    };
    
    Functions: {
      record_referral_click: {
        Args: {
          p_referral_id: string;
          p_session_id: string;
          p_user_agent: string;
        };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
