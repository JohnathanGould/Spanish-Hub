import { useState, useRef, useEffect } from "react"

const initialMessages = [
  {
    role: "sofia",
    content: "¡Hola! Soy Sofia, tu tutora de español. ¿Cómo estás hoy?",
  },
]

export function SofiaChat({ userUid }) {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || usageCount >= 30) return

    const userMessage = {
      role: "user",
      content: inputValue.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("https://spanish-hub-zeta.vercel.app/api/chat", {
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
          { role: "sofia", content: data.message || "Daily limit reached." },
        ])
      } else if (!response.ok) {
        const isQuota = data.error === "quota_exceeded"
        setMessages((prev) => [
          ...prev,
          {
            role: "sofia",
            content: isQuota
              ? "Sofia's free daily limit has been reached — she'll be back tomorrow! 🌙 If you'd like to help keep Sofia running without limits, consider supporting Milo Speaks Spanish on Ko-fi ☕ — every donation helps!"
              : "Sofia is unavailable right now. Try again in a moment.",
          },
        ])
      } else {
        setMessages((prev) => [...prev, { role: "sofia", content: data.reply }])
        setUsageCount((prev) => prev + 1)

        if (!isMuted && data.reply) {
          const utterance = new SpeechSynthesisUtterance(data.reply)
          const voices = speechSynthesis.getVoices()
          const spanishVoice = voices.find((v) => v.lang.startsWith("es"))
          if (spanishVoice) utterance.voice = spanishVoice
          utterance.lang = "es-MX"
          speechSynthesis.speak(utterance)
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "sofia", content: "Connection issue. Check your internet and try again." },
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
    recognition.lang = "es-ES"
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", background: "white" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ede9fe", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
            🤖
          </div>
          <span style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>Sofia</span>
        </div>
        <button
          onClick={handleMuteToggle}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#6b7280" }}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "512px", margin: "0 auto" }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "flex-end", gap: "8px", flexDirection: message.role === "user" ? "row-reverse" : "row" }}
            >
              {message.role === "sofia" && (
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "white", flexShrink: 0 }}>
                  S
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
                S
              </div>
              <div style={{ borderRadius: "18px", padding: "10px 16px", background: "#f3f4f6" }}>
                <p style={{ fontSize: "14px", color: "#9ca3af", fontStyle: "italic", margin: 0 }}>Sofia está escribiendo...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid #ede9fe", padding: "12px 16px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{usageCount}/30 messages today</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", maxWidth: "512px", margin: "0 auto" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe en español..."
              disabled={usageCount >= 30}
              style={{ width: "100%", height: "44px", borderRadius: "22px", border: "1px solid #ddd6fe", background: "#f9fafb", padding: "0 48px 0 16px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || usageCount >= 30}
              style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: !inputValue.trim() || usageCount >= 30 ? "#c4b5fd" : "#7c3aed", border: "none", cursor: !inputValue.trim() || usageCount >= 30 ? "not-allowed" : "pointer", color: "white", fontSize: "16px" }}
            >
              ➤
            </button>
          </div>

          <button
            onClick={handleMicClick}
            disabled={usageCount >= 30}
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: isRecording ? "2px solid #f87171" : "1px solid #ddd6fe", background: isRecording ? "#fef2f2" : "white", cursor: "pointer", fontSize: "20px", animation: isRecording ? "pulse 1s infinite" : "none" }}
          >
            🎤
          </button>
        </div>

        {usageCount >= 30 && (
          <p style={{ textAlign: "center", fontSize: "12px", color: "#ef4444", marginTop: "8px" }}>
            You've reached your daily message limit. Come back tomorrow!
          </p>
        )}
      </div>
    </div>
  )
}

export default SofiaChat