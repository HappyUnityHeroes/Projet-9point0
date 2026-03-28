export function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          9.0
        </div>
        <nav className="flex gap-6 text-sm text-gray-500">
          <a href="/agents" className="hover:text-white transition">Agents</a>
          <a href="#pricing" className="hover:text-white transition">Tarifs</a>
          <a href="/lancement" className="hover:text-white transition">Lancement</a>
        </nav>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} 9.0 — Tous droits réservés
        </p>
      </div>
    </footer>
  )
}
