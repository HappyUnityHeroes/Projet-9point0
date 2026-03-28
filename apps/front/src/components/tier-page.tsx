import { Footer } from './footer'

interface TierPageProps {
  name: string
  price: number
  gradient: string
  description: string
  features: string[]
  highlights: string[]
}

export function TierPage({ name, price, gradient, description, features, highlights }: TierPageProps) {
  return (
    <main className="bg-black text-white">
      <section className="pt-32 pb-16 px-4 text-center">
        <span className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-bold mb-6`}>
          {name}
        </span>
        <h1 className="text-5xl font-black text-white mb-4">{name}</h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto mb-8">{description}</p>
        <div className="mb-8">
          <span className="text-6xl font-black text-white">{price}</span>
          <span className="text-2xl text-gray-400">€/mois</span>
        </div>
        <form action="/api/checkout" method="POST" className="inline-block">
          <input type="hidden" name="tier" value={name.toLowerCase()} />
          <button
            type="submit"
            className={`px-10 py-4 bg-gradient-to-r ${gradient} text-white rounded-full font-bold text-lg hover:opacity-90 transition shadow-lg`}
          >
            Choisir {name}
          </button>
        </form>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Ce qui est inclus</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-gray-900/50 border border-white/10">
              <span className="text-green-400 mt-0.5">&#10003;</span>
              <span className="text-gray-300">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Points forts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h} className="p-6 rounded-xl bg-gray-900/50 border border-white/10 text-center">
                <p className="text-gray-300">{h}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
