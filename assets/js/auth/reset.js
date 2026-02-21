import { supabase } from "../core/supabase.js";

const form = document.getElementById("resetForm");
const msg = document.getElementById("msg");

function setMsg(text, ok = false) {
    msg.textContent = text;
    msg.classList.toggle("ok", ok);
    msg.classList.toggle("bad", !ok);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("Updating password…", true);

    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        setMsg(error.message, false);
        return;
    }

    setMsg("Password updated. Redirecting to login…", true);
    setTimeout(() => (window.location.href = "/auth/login.html"), 900);
});