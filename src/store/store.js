import { create } from "zustand";
import { supabase } from "./supabaseClient";

export const useAuthStore = create((set) => ({
  user: null,
  session: null, // <-- Armazena a session do supabase
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ loading: false });
      alert(error.message);
    } else {
      set({
        user: data.user,
        session: data.session, // Aqui você já tem o access_token
        loading: false,
      });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  setUser: (user) => set({ user }),
}));
