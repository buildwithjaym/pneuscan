import { supabase } from "../core/supabase.js";

const form = document.getElementById("forgotForm");
const msg = document.getElementById("msg");

function setMsg(text, ok = false) {
    msg.textContent = text;
    msg.classList.toggle("ok", ok);
    msg.classList.toggle("bad", !ok);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("Sending reset link…", true);

    const email = document.getElementById("email").value.trim();

    // IMPORTANT: set your site URL in Supabase Auth settings
    // Also set "Redirect URLs" to include your deployed domain and local dev
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset.html`
    });

    if (error) {
        setMsg(error.message, false);
        return;
    }

    setMsg("Reset link sent. Check your email.", true);
});