export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="relative pt-28 pb-20 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-2">Politique de confidentialité</h1>
          <p className="text-slate-500 text-sm mb-12">
            Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
            et à la loi Informatique et Libertés n° 78-17 du 6 janvier 1978.
          </p>

          <div className="space-y-10">

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">1. Responsable du traitement</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 space-y-2">
                <p><span className="text-slate-500">Entité :</span> ShineUp Detailing (micro-entreprise)</p>
                <p><span className="text-slate-500">Responsable :</span> Louis Estivin</p>
                <p><span className="text-slate-500">Ville :</span> Brest (29200), France</p>
                <p><span className="text-slate-500">Contact :</span>{' '}
                  <a href="mailto:shineup.brest@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">shineup.brest@gmail.com</a>
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">2. Données collectées</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-4">
                <p>ShineUp Detailing collecte uniquement les données strictement nécessaires à la réalisation des prestations :</p>
                <div className="space-y-3">
                  {[
                    { type: 'Lors d\'une réservation', data: 'Prénom, nom, numéro de téléphone, adresse email, adresse d\'intervention, créneau choisi, véhicule (marque/modèle/taille).' },
                    { type: 'Navigation sur le site', data: 'Données techniques anonymisées (type de navigateur, pages visitées) collectées par l\'hébergeur Vercel à des fins de diagnostic.' },
                    { type: 'Contact WhatsApp / téléphone', data: 'Le numéro de téléphone et les messages échangés, conservés dans l\'application de messagerie.' },
                  ].map(item => (
                    <div key={item.type} className="bg-slate-800/40 rounded-lg p-4">
                      <p className="font-semibold text-white mb-1">{item.type}</p>
                      <p className="text-slate-400">{item.data}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500">
                  Ce site n&apos;utilise pas de cookies de tracking, de publicité comportementale ou d&apos;outils d&apos;analyse tiers (Google Analytics, etc.).
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">3. Finalité des traitements</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>Les données collectées sont utilisées exclusivement pour :</p>
                <ul className="list-disc list-inside space-y-2 mt-3 text-slate-400">
                  <li>Confirmer et planifier les réservations</li>
                  <li>Vous contacter avant/après la prestation</li>
                  <li>Gérer la garantie satisfaction</li>
                  <li>Envoyer une confirmation ou un rappel de rendez-vous</li>
                </ul>
                <p className="mt-3">
                  Vos données ne sont jamais vendues, partagées avec des tiers à des fins commerciales, ni utilisées à des fins publicitaires.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">4. Base légale</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  Les traitements reposent sur l&apos;exécution du contrat de prestation de services (art. 6.1.b du RGPD)
                  et, pour la gestion des communications, sur l&apos;intérêt légitime de l&apos;entreprise (art. 6.1.f du RGPD).
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">5. Durée de conservation</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-2">
                <p>Vos données sont conservées pour les durées suivantes :</p>
                <ul className="list-disc list-inside space-y-2 mt-3 text-slate-400">
                  <li>Données de réservation : <span className="text-white">3 ans</span> à compter de la dernière prestation</li>
                  <li>Données de facturation : <span className="text-white">10 ans</span> (obligation légale comptable)</li>
                  <li>Échanges WhatsApp : durée de conservation propre à l&apos;application</li>
                </ul>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">6. Vos droits</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>Conformément au RGPD, vous disposez des droits suivants sur vos données :</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { right: 'Droit d\'accès', desc: 'Obtenir une copie de vos données' },
                    { right: 'Droit de rectification', desc: 'Corriger des données inexactes' },
                    { right: 'Droit à l\'effacement', desc: 'Supprimer vos données' },
                    { right: 'Droit d\'opposition', desc: 'Vous opposer à un traitement' },
                    { right: 'Droit à la portabilité', desc: 'Recevoir vos données' },
                    { right: 'Droit à la limitation', desc: 'Limiter un traitement' },
                  ].map(r => (
                    <div key={r.right} className="bg-slate-800/40 rounded-lg p-3">
                      <p className="font-semibold text-white text-xs mb-0.5">{r.right}</p>
                      <p className="text-slate-500 text-xs">{r.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3">
                  Pour exercer ces droits, contactez-nous par email :{' '}
                  <a href="mailto:shineup.brest@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">shineup.brest@gmail.com</a>.
                  Nous répondons dans un délai maximum de 30 jours.
                </p>
                <p>
                  Vous pouvez également introduire une réclamation auprès de la{' '}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">CNIL</a>{' '}
                  (Commission Nationale de l&apos;Informatique et des Libertés).
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">7. Sécurité</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  ShineUp Detailing met en œuvre des mesures techniques et organisationnelles adaptées pour protéger
                  vos données contre tout accès non autorisé, perte ou altération. Le site est hébergé sur l&apos;infrastructure
                  sécurisée de Vercel (HTTPS, certificats TLS).
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">8. Cookies</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  Ce site n&apos;utilise pas de cookies de suivi publicitaire ou de profilage.
                  Des cookies techniques strictement nécessaires au bon fonctionnement du site peuvent être déposés
                  par l&apos;hébergeur Vercel.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies, sans impact sur votre navigation sur ce site.
                </p>
              </div>
            </article>

          </div>

          <p className="text-xs text-slate-700 mt-12 text-center">
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </section>
    </>
  )
}
