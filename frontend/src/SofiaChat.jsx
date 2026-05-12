import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

const initialMessages = [
  {
    role: "sofia",
    content: "¡Hola! Soy Sofia, tu tutora de español. ¿Cómo estás hoy?",
  },
]

export function SofiaChat() {
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
          userUid: "anonymous",
        }),
      })

      const data = await response.json()

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          { role: "sofia", content: data.message || "Daily limit reached." },
        ])
      } else if (!response.ok) {
  const isQuota = data.error === "quota_exceeded";
  setMessages((prev) => [
    ...prev,
    {
      role: "sofia",
      content: isQuota
        ? "Sofia's free daily limit has been reached — she'll be back tomorrow! 🌙 If you'd like to help keep Sofia running without limits, consider supporting Milo Speaks Spanish on Ko-fi ☕ — every donation helps!"
        : "Sofia is unavailable right now. Try again in a moment.",
    },
  ])
}
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
    <div className="flex h-dvh flex-col bg-white">
      <header className="flex items-center justify-between border-b border-violet-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
            🤖
          </div>
          <span className="text-lg font-semibold text-gray-900">Sofia</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMuteToggle}
          className="text-gray-600 hover:bg-violet-50 hover:text-violet-600"
        >
          {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto flex max-w-lg flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {message.role === "sofia" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                  S
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  message.role === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                S
              </div>
              <div className="rounded-2xl bg-gray-100 px-4 py-2.5">
                <p className="text-sm text-gray-500 italic">Sofia está escribiendo...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-violet-100 bg-white px-4 pb-6 pt-3">
        <div className="mb-2 text-center">
          <span className="text-xs text-gray-500">{usageCount}/30 messages today</span>
        </div>

        <div className="mx-auto flex max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe en español..."
              disabled={usageCount >= 30}
              className="h-11 rounded-full border-violet-200 bg-gray-50 pr-12 focus-visible:border-violet-400 focus-visible:ring-violet-200"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || usageCount >= 30}
              className="absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300"
            >
              <Send className="size-4" />
            </Button>
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={handleMicClick}
            disabled={usageCount >= 30}
            className={`size-11 rounded-full border-violet-200 ${
              isRecording ? "animate-pulse border-red-400 bg-red-50 text-red-600" : ""
            }`}
          >
            <Mic className={`size-5 ${isRecording ? "text-red-600" : ""}`} />
          </Button>
        </div>

        {usageCount >= 30 && (
          <p className="mt-2 text-center text-xs text-red-500">
            You've reached your daily message limit. Come back tomorrow!
          </p>
        )}
      </div>
    </div>
  )
}

export default SofiaChat