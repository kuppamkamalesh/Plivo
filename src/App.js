import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("summary");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!process.env.REACT_APP_n8nLink) {
      setError("Configuration error: REACT_APP_n8nLink not set.");
      return;
    }

    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    if (text.length > 1500) {
      setError("Input too long (max 1500 characters). Please shorten it.");
      return;
    }

    setLoading(true);
    const payload = { text: text.trim(), mode };
    let attempt = 0;
    let resp;

    while (attempt < 2) {
      try {
        resp = await axios.post(process.env.REACT_APP_n8nLink, payload, {
          timeout: 20000,
        });
        break;
      } catch (err) {
        attempt++;
        if (attempt >= 2) {
          setError(err?.response?.data || err.message || "Request failed");
          setLoading(false);
          return;
        }
      }
    }

    if (resp?.data) {
      let modifyData;
      if (resp.data.analysis?.includes("**")) {
        modifyData = resp.data.analysis.replace(/\*\*/g, "");
      }
      setResult(modifyData || resp.data.analysis);
    } else {
      setError("No response from workflow");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1c1f26, #0e1014)",
        color: "#f1f1f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 20,
          padding: 30,
          boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          transition: "all 0.3s ease",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 32,
            fontWeight: 700,
            background: "linear-gradient(90deg,#58a6ff,#ff6ec4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: 1.2,
            margin: 0,
          }}
        >
          Text Intelligence Hub
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#ccc",
            marginTop: -5,
            marginBottom: 10,
            fontSize: 15,
          }}
        >
          Run smart text analysis using <strong>n8n</strong> +{" "}
          <strong>LLM</strong>
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write or paste your text here..."
            rows={10}
            style={{
              width: "100%",
              fontSize: 15,
              borderRadius: 12,
              border: "none",
              padding: 16,
              resize: "none",
              background: "#1e2229",
              color: "#fff",
              outline: "none",
              lineHeight: 1.6,
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 8px rgba(88,166,255,0.6)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "inset 0 0 8px rgba(0,0,0,0.3)";
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#13161c",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 0 8px rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>
                Choose Mode
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    color: mode === "summary" ? "#58a6ff" : "#ccc",
                  }}
                >
                  <input
                    type="radio"
                    checked={mode === "summary"}
                    onChange={() => setMode("summary")}
                  />{" "}
                  Summary
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    color: mode === "sentiment" ? "#ff6ec4" : "#ccc",
                  }}
                >
                  <input
                    type="radio"
                    checked={mode === "sentiment"}
                    onChange={() => setMode("sentiment")}
                  />{" "}
                  Sentiment
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 20,
                padding: "12px 0",
                borderRadius: 10,
                border: "none",
                background: loading
                  ? "linear-gradient(90deg,#555,#777)"
                  : "linear-gradient(90deg,#58a6ff,#ff6ec4)",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: 0.4,
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#fff",
                      animation: "dot 0.8s infinite ease-in-out",
                    }}
                  ></div>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#fff",
                      animation: "dot 0.8s infinite ease-in-out 0.2s",
                    }}
                  ></div>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#fff",
                      animation: "dot 0.8s infinite ease-in-out 0.4s",
                    }}
                  ></div>
                  <style>
                    {`
                      @keyframes dot {
                        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                        40% { transform: scale(1.3); opacity: 1; }
                      }
                    `}
                  </style>
                </div>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </form>

        <div style={{ marginTop: 10 }}>
          {error && (
            <div
              style={{
                background: "#3a0f0f",
                color: "#ff8080",
                padding: 14,
                borderRadius: 10,
                border: "1px solid #ff4c4c",
                whiteSpace: "pre-wrap",
                boxShadow: "0 0 10px rgba(255,0,0,0.2)",
              }}
            >
              ⚠️ {String(error)}
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: 18,
                background: "linear-gradient(135deg,#181c24,#20242d)",
                borderRadius: 12,
                padding: 20,
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 20px rgba(88,166,255,0.15)",
                animation: "fadeIn 0.4s ease",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  fontWeight: 600,
                  color: "#58a6ff",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: 6,
                  marginBottom: 10,
                }}
              >
                Analysis Result
              </h3>
              <div
                style={{
                  color: "#e5e5e5",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                }}
              >
                {result}
              </div>
            </div>
          )}
        </div>

        <footer
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#999",
            marginTop: 30,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 10,
          }}
        >
          <div>© 2025 Kuppam Kamalesh | Powered by n8n + React</div>
        </footer>
      </div>
    </div>
  );
}
