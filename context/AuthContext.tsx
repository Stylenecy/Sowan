"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";

export interface AuthUser {
  id?: string;
  name: string;
  email?: string;
  role?: "customer" | "mentor" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (name: string) => void;
  loginWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
    role: "customer" | "mentor"
  ) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  isLoading: boolean;
  isSupabaseMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SUPABASE_CONFIGURED =
  typeof process !== "undefined" &&
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function fetchProfile(supabaseUser: User): Promise<AuthUser> {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("id", supabaseUser.id)
    .single();

  return {
    id: supabaseUser.id,
    name: data?.name ?? supabaseUser.email ?? "User",
    email: supabaseUser.email ?? undefined,
    role: (data?.role as "customer" | "mentor" | "admin") ?? "customer",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (SUPABASE_CONFIGURED) {
      let mounted = true;

      import("@/lib/supabase/client").then(({ createClient }) => {
        const supabase = createClient();

        supabase.auth.getSession().then(async ({ data: { session } }) => {
          if (!mounted) return;
          if (session?.user) {
            const profile = await fetchProfile(session.user);
            setUser(profile);
          }
          setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_, session) => {
            if (!mounted) return;
            if (session?.user) {
              const profile = await fetchProfile(session.user);
              setUser(profile);
            } else {
              setUser(null);
            }
            setIsLoading(false);
          }
        );

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      });
    } else {
      // Demo / localStorage mode
      const stored = localStorage.getItem("sowan_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("sowan_user");
        }
      }
      setIsLoading(false);
    }
  }, []);

  // Demo login (no Supabase needed)
  const login = (name: string) => {
    const roleMap: Record<string, "customer" | "mentor" | "admin"> = {
      "Opa Adriel": "mentor",
      "Admin": "admin",
    };
    const newUser: AuthUser = { name, role: roleMap[name] || "customer" };
    setUser(newUser);
    localStorage.setItem("sowan_user", JSON.stringify(newUser));
  };

  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    if (!SUPABASE_CONFIGURED) return { error: "Supabase not configured — use demo login" };
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUpWithEmail = async (
    name: string,
    email: string,
    password: string,
    role: "customer" | "mentor" | "admin"
  ): Promise<{ error: string | null }> => {
    if (!SUPABASE_CONFIGURED) return { error: "Supabase not configured — use demo login" };
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } },
    });
    if (error) return { error: error.message };
    if (data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, name, role });
    }
    return { error: null };
  };

  const logout = async () => {
    if (SUPABASE_CONFIGURED) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("sowan_user");
    localStorage.removeItem("sowan_booked_mentor");
    localStorage.removeItem("sowan_selected_time");
    localStorage.removeItem("sowan_room_id");
    localStorage.removeItem("sowan_lang");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithEmail,
        signUpWithEmail,
        logout,
        showLoginModal,
        setShowLoginModal,
        isLoading,
        isSupabaseMode: SUPABASE_CONFIGURED,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
