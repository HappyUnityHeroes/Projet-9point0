'use client'

import { useState } from 'react'
import { TiptapEditor } from '@/components/tiptap-editor'

export default function EditPageContent({ params }: { params: { pageId: string } }) {
  const [content, setContent] = useState('<h2>Bienvenue</h2><p>Modifiez le contenu de votre page ici.</p>')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: params.pageId, content }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handlePublish() {
    setSaving(true)
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: params.pageId, content, publish: true }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Éditeur de contenu</h1>
          <p className="text-sm text-gray-500">Page : {params.pageId}</p>
        </div>
        <div className="flex gap-3">
          {saved && (
            <span className="flex items-center text-sm text-green-600 font-medium">
              &#10003; Sauvegardé
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            Publier
          </button>
        </div>
      </div>

      <TiptapEditor content={content} onChange={setContent} />
    </div>
  )
}
