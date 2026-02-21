// assets/js/core/auth-guard.js
import { supabase } from "./supabase.js";

export async function requireAuth() {
    const { data, error } = await supabase.auth.getSession();
    if (error) console.warn(error);

    const session = data?.session;
    if (!session) {
        window.location.href = "/auth/login.html";
        return null;
    }
    return session;
}

export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login.html";
}