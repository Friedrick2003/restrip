import { useEffect } from "react";

export const fmt = (n) => `$${Number(n).toLocaleString()}`;

export function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{ position:"fixed", bottom:36, right:36, zIndex:9999, background: type==="success"?"#111009":"#1a0808",
      color:"#f5efe6", padding:"18px 28px", border:"1px solid", borderColor: type==="success"?"#b8943f":"rgba(192,57,43,0.5)",
      fontSize:13, fontFamily:"'Jost',sans-serif", boxShadow:"0 16px 48px rgba(0,0,0,0.6)", display:"flex",
      alignItems:"center", gap:12, minWidth:280, borderLeft:`3px solid ${type==="success"?"#b8943f":"#ef5350"}` }}>
      <span style={{ color: type==="success"?"#b8943f":"#ef5350", fontSize:16 }}>{type==="success"?"✦":"✕"}</span>
      {msg}
      <span onClick={onClose} style={{ marginLeft:"auto", cursor:"pointer", color:"#9a8e7e" }}>×</span>
    </div>
  );
}

export function Spinner() {
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", padding:"80px 0" }}>
      <div style={{ width:40, height:40, border:"2px solid rgba(184,148,63,0.2)", borderTop:"2px solid #b8943f", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export function Tag({ label, color = "#b8943f" }) {
  return (
    <span style={{ display:"inline-block", padding:"3px 10px", fontSize:10, fontWeight:600,
      letterSpacing:"1.5px", textTransform:"uppercase", background:`${color}22`,
      color: color==="green"?"#81c784": color==="red"?"#ef9a9a": "#d4af6a",
      borderColor: color==="green"?"rgba(46,125,50,0.3)": color==="red"?"rgba(192,57,43,0.3)":"rgba(184,148,63,0.3)",
      border:"1px solid" }}>
      {label}
    </span>
  );
}

export function Stars({ rating }) {
  return <span style={{ color:"#b8943f", fontSize:13 }}>{"★".repeat(Math.floor(rating))}{"☆".repeat(5-Math.floor(rating))}</span>;
}

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#b8943f;--gold2:#d4af6a;--gold3:#f0d090;
  --dark:#0a0806;--dark2:#111009;--dark3:#1a1610;--dark4:#231f16;
  --cream:#f5efe6;--cream2:#ede4d6;--muted:#9a8e7e;--border:rgba(184,148,63,0.2);
}
body{font-family:'Jost',sans-serif;background:var(--dark);color:var(--cream);overflow-x:hidden}
h1,h2,h3,h4{font-family:'Cormorant Garamond',serif}
input,select,button,textarea{font-family:'Jost',sans-serif}
::selection{background:var(--gold);color:var(--dark)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--dark2)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px}
.gold-line{display:inline-block;width:40px;height:1px;background:var(--gold);vertical-align:middle;margin-right:12px}
.section-tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);font-weight:500;display:flex;align-items:center}
.btn-primary{background:var(--gold);color:var(--dark);border:none;padding:14px 36px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s}
.btn-primary:hover{background:#a07830;transform:translateY(-2px);box-shadow:0 12px 40px rgba(184,148,63,0.35)}
.btn-primary:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.btn-outline{background:transparent;color:var(--gold2);border:1px solid var(--gold);padding:13px 34px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s}
.btn-outline:hover{background:var(--gold);color:var(--dark)}
.input-dark{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(184,148,63,0.25);color:var(--cream);padding:13px 16px;font-size:13px;outline:none;transition:border .2s}
.input-dark::placeholder{color:var(--muted)}
.input-dark:focus{border-color:var(--gold)}
.input-dark option{background:var(--dark3);color:var(--cream)}
.hotel-card{position:relative;overflow:hidden;cursor:pointer;background:var(--dark3)}
.hotel-card img{transition:transform .6s ease;display:block;width:100%;height:100%;object-fit:cover}
.hotel-card:hover img{transform:scale(1.07)}
.hotel-card .overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,4,3,0.95) 0%,rgba(5,4,3,0.2) 60%,transparent 100%)}
.hotel-card .card-content{position:absolute;bottom:0;left:0;right:0;padding:28px 24px;transition:transform .3s}
.hotel-card:hover .card-content{transform:translateY(-6px)}
.nav-item{color:rgba(245,239,230,0.65);font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:color .2s;padding:4px 0;border-bottom:1px solid transparent;background:none;border-top:none;border-left:none;border-right:none}
.nav-item:hover,.nav-item.active{color:var(--gold2);border-bottom-color:var(--gold)}
.room-card{border:1px solid var(--border);background:var(--dark3);cursor:pointer;transition:all .3s;overflow:hidden}
.room-card:hover,.room-card.selected{border-color:var(--gold);background:var(--dark4)}
.stat-card{border:1px solid var(--border);background:var(--dark3);padding:28px 24px;position:relative;overflow:hidden}
.stat-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--gold)}
.table-row{border-bottom:1px solid rgba(184,148,63,0.1)}
.table-row:hover{background:rgba(184,148,63,0.05)}
.amenity-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border:1px solid var(--border);color:var(--muted);font-size:12px}
.amenity-pill::before{content:'';display:inline-block;width:4px;height:4px;background:var(--gold);border-radius:50%}
.fade-in{animation:fadeUp .8s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
`;
