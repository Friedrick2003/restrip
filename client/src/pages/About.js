export default function About() {
  const urls = [
    { label: "Frontend (Vercel)", url: "https://client-frn6kczqo-friedrick2003s-projects.vercel.app" },
    { label: "Backend API (Railway)", url: "https://restrip-backend-production.up.railway.app/api" },
    { label: "Health Check", url: "https://restrip-backend-production.up.railway.app/api/health" },
    { label: "GitHub Repository", url: "https://github.com/Friedrick2003/restrip" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f9f7f3", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ marginBottom: 60, textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, color: "#1a1a1a", marginBottom: 16, letterSpacing: 2 }}>
            About Restrip
          </h1>
          <p style={{ fontSize: 16, color: "#6b6b6b", lineHeight: 1.6 }}>
            A luxury hotel booking platform built with modern web technologies and deployed on cutting-edge cloud infrastructure.
          </p>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 16, letterSpacing: 1.5 }}>
            Tech Stack
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, margin: "24px 0" }}>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Frontend</h3>
              <p style={{ fontSize: 14, color: "#6b6b6b", lineHeight: 1.8 }}>React 18 with Create React App</p>
            </div>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Backend</h3>
              <p style={{ fontSize: 14, color: "#6b6b6b", lineHeight: 1.8 }}>Node.js + Express.js</p>
            </div>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Database</h3>
              <p style={{ fontSize: 14, color: "#6b6b6b", lineHeight: 1.8 }}>MongoDB Atlas</p>
            </div>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Deployment</h3>
              <p style={{ fontSize: 14, color: "#6b6b6b", lineHeight: 1.8 }}>Vercel + Railway</p>
            </div>
          </div>
        </div>

        {/* Production URLs */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 24, letterSpacing: 1.5 }}>
            Production URLs
          </h2>
          <div style={{ display: "grid", gap: 16 }}>
            {urls.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: 20,
                  background: "#fff",
                  border: "1px solid #e0d5c8",
                  borderRadius: 4,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#b8943f";
                  e.target.style.background = "#faf8f5";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e0d5c8";
                  e.target.style.background = "#fff";
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 14, color: "#1a1a1a", wordBreak: "break-all", fontFamily: "monospace" }}>
                  {item.url}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Demo Credentials */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 24, letterSpacing: 1.5 }}>
            Demo Credentials
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ padding: 20, background: "#fff", border: "1px solid #e0d5c8", borderRadius: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>
                Admin Account
              </div>
              <div style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 8 }}>
                <strong>Email:</strong> admin@restrip.com
              </div>
              <div style={{ fontSize: 14, color: "#6b6b6b" }}>
                <strong>Password:</strong> Admin@123
              </div>
            </div>
            <div style={{ padding: 20, background: "#fff", border: "1px solid #e0d5c8", borderRadius: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#b8943f", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>
                Demo Account
              </div>
              <div style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 8 }}>
                <strong>Email:</strong> demo@restrip.com
              </div>
              <div style={{ fontSize: 14, color: "#6b6b6b" }}>
                <strong>Password:</strong> Demo@1234
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 24, letterSpacing: 1.5 }}>
            Features
          </h2>
          <ul style={{ fontSize: 14, color: "#6b6b6b", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Browse luxury hotels and rooms with detailed information</li>
            <li>Real-time availability checking and booking confirmation</li>
            <li>Secure JWT authentication with refresh tokens</li>
            <li>Admin panel for hotel and room management</li>
            <li>Booking history and cancellation support</li>
            <li>Concurrency-safe booking system</li>
            <li>Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
