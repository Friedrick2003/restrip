// ── Auth Page ─────────────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode,  setMode]  = useState("login");
  const [form,  setForm]  = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [busy,  setBusy]  = useState(false);

  const handle = async () => {
    setError(""); setBusy(true);
    try {
      if (mode === "login") await login(form.email, form.password);
      else                  await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex" }}>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:60, background:"#111009" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:300, color:"#f5efe6", lineHeight:1 }}>{mode==="login"?"Welcome":"Join Us"}</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:600, color:"#d4af6a", lineHeight:1 }}>{mode==="login"?"Back.":"Today."}</div>
            <p style={{ color:"#9a8e7e", fontSize:13, marginTop:14 }}>{mode==="login"?"Sign in to access your reservations.":"Create your account for curated luxury experiences."}</p>
          </div>
          <div style={{ background:"rgba(184,148,63,0.08)", border:"1px solid rgba(184,148,63,0.2)", padding:"12px 16px", marginBottom:24, fontSize:12, color:"#b8943f" }}>
            <strong>Demo admin:</strong> admin@restrip.com / Admin@123<br />
            <strong>Demo user:</strong> demo@restrip.com / Demo@1234
          </div>
          {mode==="register" && (
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:9, letterSpacing:2.5, color:"#b8943f", textTransform:"uppercase", fontWeight:600, marginBottom:8 }}>Full Name</div>
              <input className="input-dark" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} />
            </div>
          )}
          {[{ label:"Email Address", key:"email", type:"email", ph:"you@example.com" },
            { label:"Password",      key:"password", type:"password", ph:"••••••••" }].map(({ label,key,type,ph }) => (
            <div key={key} style={{ marginBottom:16 }}>
              <div style={{ fontSize:9, letterSpacing:2.5, color:"#b8943f", textTransform:"uppercase", fontWeight:600, marginBottom:8 }}>{label}</div>
              <input className="input-dark" type={type} placeholder={ph} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                onKeyDown={e => e.key==="Enter" && handle()} />
            </div>
          ))}
          {error && <div style={{ background:"rgba(192,57,43,0.15)", border:"1px solid rgba(192,57,43,0.3)", color:"#ef9a9a", padding:"10px 14px", fontSize:12, marginBottom:16 }}>{error}</div>}
          <button className="btn-primary" style={{ width:"100%", padding:16, marginTop:8 }} disabled={busy} onClick={handle}>
            {busy ? "Please wait..." : mode==="login" ? "Sign In" : "Create Account"}
          </button>
          <p style={{ textAlign:"center", marginTop:20, fontSize:12, color:"#9a8e7e" }}>
            {mode==="login" ? "New to Restrip? " : "Already a member? "}
            <span onClick={() => { setMode(m => m==="login"?"register":"login"); setError(""); }}
              style={{ color:"#b8943f", cursor:"pointer" }}>
              {mode==="login" ? "Create account" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=85" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(10,8,6,0.5),rgba(10,8,6,0.1))" }} />
        <div style={{ position:"absolute", bottom:64, left:56, right:56 }}>
          <div style={{ width:40, height:1, background:"#b8943f", marginBottom:16 }} />
          <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontStyle:"italic", color:"#fff", lineHeight:1.4, textShadow:"0 2px 16px rgba(0,0,0,0.5)" }}>
            "Not all those who wander are lost — some are simply loyal Restrip members."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
