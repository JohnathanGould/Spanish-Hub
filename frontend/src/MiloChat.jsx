import { useState, useRef, useEffect } from "react"

const initialMessages = [
  {
    role: "milo",
    content: "¡Hola! Soy Milo, tu tutor de español. ¿Cómo estás hoy?",
  },
]

export function MiloChat({ userUid }) {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const [mode, setMode] = useState('chat')
  const [translateDir, setTranslateDir] = useState('en-es')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    if (mode === 'chat' && usageCount >= 30) return

    const userMessage = {
      role: "user",
      content: inputValue.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    if (mode === 'translate') {
      try {
        const targetLang = translateDir === 'en-es' ? 'ES' : 'EN'
        const response = await fetch("/api/translate-deepl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userMessage.content, targetLang }),
        })
        const data = await response.json()
        const result = data.translatedText || data.translation || (data.translations && data.translations[0]?.text) || data.text
        setMessages((prev) => [
          ...prev,
          { role: "milo", content: result || "Translation unavailable right now." },
        ])
        if (!response.ok || !result) {
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { role: "milo", content: "Translation unavailable right now." },
          ])
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "milo", content: "Translation unavailable right now." },
        ])
      } finally {
        setIsLoading(false)
      }
      return
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-10).map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
          userUid: userUid || "anonymous",
        }),
      })

      const data = await response.json()

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          { role: "milo", content: data.message || "Daily limit reached." },
        ])
      } else if (!response.ok) {
        const isQuota = data.error === "quota_exceeded"
        setMessages((prev) => [
          ...prev,
          {
            role: "milo",
            content: isQuota
              ? "Milo's free daily limit has been reached — he'll be back tomorrow! 🌙 If you'd like to help keep Milo running without limits, consider supporting Milo Speaks Spanish on Ko-fi ☕ — every donation helps!"
              : "Milo is unavailable right now. Try again in a moment.",
          },
        ])
      } else {
        setMessages((prev) => [...prev, { role: "milo", content: data.reply }])
        setUsageCount((prev) => prev + 1)

        if (!isMuted && data.reply) {
          const spanishText = data.reply.replace(/\[.*?\]/g, "").trim()
          const translations = [...data.reply.matchAll(/\[([^\]]+)\]/g)].map(m => m[1])
          const translationText = translations.length > 0 ? translations.join(", ") : ""

          const voices = speechSynthesis.getVoices()
          const spanishVoice = voices.find((v) => v.lang.startsWith("es"))
          const englishVoice = voices.find((v) => v.lang.startsWith("en"))

          const spanishUtterance = new SpeechSynthesisUtterance(spanishText)
          if (spanishVoice) spanishUtterance.voice = spanishVoice
          spanishUtterance.lang = "es-MX"

          speechSynthesis.speak(spanishUtterance)

          if (translationText) {
            const englishUtterance = new SpeechSynthesisUtterance(translationText)
            if (englishVoice) englishUtterance.voice = englishVoice
            englishUtterance.lang = "en-US"
            spanishUtterance.onend = () => speechSynthesis.speak(englishUtterance)
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "milo", content: "Connection issue. Check your internet and try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Voice input requires Chrome or Edge.")
      return
    }

    const recognition = new SpeechRecognition()
    const lang = mode === 'translate'
      ? (translateDir === 'en-es' ? 'en-US' : 'es-ES')
      : 'es-ES'
    recognition.lang = lang
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      setInputValue(event.results[0][0].transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)

    recognition.start()
    setIsRecording(true)
  }

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev)
    if (!isMuted) speechSynthesis.cancel()
  }

  const sendEnabled = !!inputValue.trim() && (mode === 'translate' || usageCount < 30)

  const inputPlaceholder = mode === 'translate'
    ? (translateDir === 'en-es' ? "Type in English..." : "Escribe en español...")
    : "Escribe en español..."

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, background: "white" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ede9fe", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
            🐾
          </div>
          <span style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>Milo</span>
        </div>
        <button
          onClick={handleMuteToggle}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#6b7280" }}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px", minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "512px", margin: "0 auto" }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "flex-end", gap: "8px", flexDirection: message.role === "user" ? "row-reverse" : "row" }}
            >
              {message.role === "milo" && (
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "white", flexShrink: 0 }}>
                  M
                </div>
              )}
              <div style={{
                maxWidth: "80%", borderRadius: "18px", padding: "10px 16px",
                background: message.role === "user" ? "#7c3aed" : "#f3f4f6",
                color: message.role === "user" ? "white" : "#111827"
              }}>
                <p style={{ fontSize: "14px", lineHeight: "1.5", margin: 0 }}>{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "white", flexShrink: 0 }}>
                M
              </div>
              <div style={{ borderRadius: "18px", padding: "10px 16px", background: "#f3f4f6" }}>
                <p style={{ fontSize: "14px", color: "#9ca3af", fontStyle: "italic", margin: 0 }}>Milo está escribiendo...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid #ede9fe", padding: "12px 16px 96px", flexShrink: 0 }}>
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{usageCount}/30 messages today</span>
        </div>

        <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center", marginBottom: "12px" }}>
          <button
            onClick={() => setMode('chat')}
            style={{
              padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: "700",
              border: "2px solid", cursor: "pointer", transition: "all 0.15s",
              borderColor: mode === 'chat' ? "#7c3aed" : "#e5e7eb",
              background: mode === 'chat' ? "#7c3aed" : "white",
              color: mode === 'chat' ? "white" : "#6b7280",
              boxShadow: mode === 'chat' ? "0 0 0 3px #ddd6fe" : "none",
            }}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setMode('translate')}
            style={{
              padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: "700",
              border: "2px solid", cursor: "pointer", transition: "all 0.15s",
              borderColor: mode === 'translate' ? "#7c3aed" : "#e5e7eb",
              background: mode === 'translate' ? "#7c3aed" : "white",
              color: mode === 'translate' ? "white" : "#6b7280",
              boxShadow: mode === 'translate' ? "0 0 0 3px #ddd6fe" : "none",
            }}
          >
            🔄 Translate
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", opacity: mode === 'translate' ? 1 : 0, pointerEvents: mode === 'translate' ? "auto" : "none", transition: "opacity 0.2s" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: translateDir === 'en-es' ? "#7c3aed" : "#9ca3af" }}>EN</span>
            <button
              onClick={() => setTranslateDir((d) => d === 'en-es' ? 'es-en' : 'en-es')}
              aria-label="Swap direction"
              style={{
                width: "28px", height: "28px", borderRadius: "50%", background: "#7c3aed",
                color: "white", fontSize: "13px", fontWeight: "700", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              ⇄
            </button>
            <span style={{ fontSize: "12px", fontWeight: "700", color: translateDir === 'es-en' ? "#7c3aed" : "#9ca3af" }}>SP</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", maxWidth: "512px", margin: "0 auto" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={inputPlaceholder}
              disabled={mode === 'chat' && usageCount >= 30}
              style={{ width: "100%", height: "44px", borderRadius: "22px", border: "1px solid #ddd6fe", background: "#f9fafb", padding: "0 48px 0 16px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!sendEnabled}
              style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: sendEnabled ? "#7c3aed" : "#c4b5fd", border: "none", cursor: sendEnabled ? "pointer" : "not-allowed", color: "white", fontSize: "16px" }}
            >
              ➤
            </button>
          </div>

          <button
            onClick={handleMicClick}
            disabled={mode === 'chat' && usageCount >= 30}
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: isRecording ? "2px solid #f87171" : "1px solid #ddd6fe", background: isRecording ? "#fef2f2" : "white", cursor: "pointer", fontSize: "20px", animation: isRecording ? "pulse 1s infinite" : "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}
          >
            <span>🎤</span>
            {mode === 'translate' && (
              <span style={{ fontSize: "10px", color: "#9ca3af", lineHeight: 1 }}>
                {translateDir === 'en-es' ? 'EN' : 'SP'}
              </span>
            )}
          </button>
        </div>

        {mode === 'chat' && usageCount >= 30 && (
          <p style={{ textAlign: "center", fontSize: "12px", color: "#ef4444", marginTop: "8px" }}>
            You've reached your daily message limit. Come back tomorrow!
          </p>
        )}
      </div>
    </div>
  )
}

export default MiloChat