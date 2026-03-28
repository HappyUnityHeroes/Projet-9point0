'use client'

import { useState } from 'react'

export default function AgentPage() {
  const [sessionActive, setSessionActive] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])

  const leaAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_LEA
  const sofiaAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_SOFIA

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agent vocal</h1>
        <p className="text-gray-600">Parlez à votre agent pour décrire vos besoins</p>
      </div>

      {/* Agent selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setSessionActive(true)}
          className="p-6 rounded-xl border-2 border-pink-200 bg-pink-50 text-left hover:border-pink-400 transition"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg mb-3">
            L
          </div>
          <h3 className="font-bold text-gray-900">Léa</h3>
          <p className="text-sm text-gray-600">Design & Site Web</p>
          <p className="text-xs text-gray-400 mt-1">Brief visuel, contenu, UX</p>
        </button>

        <button
          onClick={() => setSessionActive(true)}
          className="p-6 rounded-xl border-2 border-blue-200 bg-blue-50 text-left hover:border-blue-400 transition"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg mb-3">
            S
          </div>
          <h3 className="font-bold text-gray-900">Sofia</h3>
          <p className="text-sm text-gray-600">CRM & Relation client</p>
          <p className="text-xs text-gray-400 mt-1">Pipeline, automatisations, data</p>
        </button>
      </div>

      {/* Session area */}
      {sessionActive ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-900">Session en cours</span>
          </div>

          {leaAgentId || sofiaAgentId ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-sm text-gray-500">
              Widget ElevenLabs Conversational AI
              <br />
              <span className="text-xs text-gray-400">Agent ID configuré</span>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-sm text-gray-500">
              Les agents vocaux seront activés une fois les clés ElevenLabs configurées.
              <br />
              <span className="text-xs text-gray-400">NEXT_PUBLIC_ELEVENLABS_AGENT_ID_LEA</span>
            </div>
          )}

          <button
            onClick={() => {
              setSessionActive(false)
              setTranscript(['Agent: Bonjour ! Comment puis-je vous aider ?', 'Vous: [Session terminée]'])
            }}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
          >
            Terminer la session
          </button>
        </div>
      ) : null}

      {/* Transcript */}
      {transcript.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Transcription</h3>
          <div className="space-y-2">
            {transcript.map((line, i) => (
              <p key={i} className="text-sm text-gray-700">{line}</p>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Créer un ticket depuis cette session
          </button>
        </div>
      )}
    </div>
  )
}
