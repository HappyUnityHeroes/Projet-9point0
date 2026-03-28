export default function StatsPage() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Suivez les performances de votre site</p>
      </div>

      {plausibleDomain ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <iframe
            plausible-embed="true"
            src={`https://plausible.io/share/${plausibleDomain}?auth=YOUR_SHARED_LINK&embed=true&theme=light`}
            loading="lazy"
            className="w-full h-[600px] border-0"
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics bientôt disponibles</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Les analytics seront activées une fois votre site déployé et Plausible configuré.
          </p>
          <div className="grid grid-cols-4 gap-4 mt-8">
            {['Visiteurs', 'Pages vues', 'Taux rebond', 'Durée moy.'].map((label) => (
              <div key={label} className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-300 mt-1">—</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
