export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            9.0
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl text-center mb-8">
          Votre site web & CRM propulsé par l&apos;IA. De la parole au deploy.
        </p>
        <div className="flex gap-4">
          <a
            href="#pricing"
            className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Voir les offres
          </a>
          <a
            href="/agents"
            className="px-8 py-3 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition"
          >
            Nos agents IA
          </a>
        </div>
      </section>
    </main>
  )
}
