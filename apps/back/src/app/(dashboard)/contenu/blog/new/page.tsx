'use client'

import { useState } from 'react'
import { TiptapEditor } from '@/components/tiptap-editor'

export default function NewBlogPost() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('professionnel')
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [content, setContent] = useState('')
  const [generating, setGenerating] = useState(false)

  async function handleGenerate() {
    setGenerating(true)
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generate_blog', topic, tone, length }),
    })
    const data = await res.json()
    if (data.html) {
      setContent(data.html)
    }
    setGenerating(false)
  }

  async function handlePublish() {
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'blog', topic, content, publish: true }),
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nouvel article IA</h1>
        <p className="text-gray-600">L&apos;IA génère, vous éditez et publiez.</p>
      </div>

      {/* Generation form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sujet de l&apos;article</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Ex: Comment fidéliser ses clients en 2026"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ton</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="professionnel">Professionnel</option>
              <option value="decontracte">Décontracté</option>
              <option value="expert">Expert</option>
              <option value="pedagogique">Pédagogique</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longueur</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as 'short' | 'medium' | 'long')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="short">Court (~300 mots)</option>
              <option value="medium">Moyen (~600 mots)</option>
              <option value="long">Long (~1200 mots)</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating || !topic}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
        >
          {generating ? 'Génération en cours...' : 'Générer avec l\'IA'}
        </button>
      </div>

      {/* Editor */}
      {content && (
        <>
          <TiptapEditor content={content} onChange={setContent} />
          <div className="flex justify-end gap-3">
            <button
              onClick={handlePublish}
              className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Publier l&apos;article
            </button>
          </div>
        </>
      )}
    </div>
  )
}
