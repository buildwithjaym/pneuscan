import { supabase } from "../core/supabase.js";

const form = document.getElementById("signupForm");
const msg = document.getElementById("msg");

function setMsg(text, ok = false) {
    msg.textContent = text;
    msg.classList.toggle("ok", ok);
    msg.classList.toggle("bad", !ok);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("Creating account…", true);

    const full_name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name }
        }
    });

    if (error) {
        setMsg(error.message, false);
        return;
    }

    // If email confirmations are enabled, user must verify first
    setMsg("Account created. If email verification is enabled, check your inbox.", true);

    // You can redirect immediately for no-email-confirm setups
    window.location.href = "/auth/login.html";
});