import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">Gérez vos articles de blog</p>
        </div>
        <Link
          href="/contenu/blog/new"
          className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          + Nouvel article IA
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        Aucun article pour le moment. Créez votre premier article avec l&apos;IA.
      </div>
    </div>
  )
}
