export default function CGVPage() {
  return (
    <>
      <section className="relative pt-28 pb-20 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-2">Conditions Générales de Vente</h1>
          <p className="text-slate-500 text-sm mb-12">
            En vigueur au 1er janvier 2026 — applicables à toutes les prestations ShineUp Detailing.
          </p>

          <div className="space-y-10">

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">1. Identification</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 space-y-2">
                <p><span className="text-slate-500">Prestataire :</span> ShineUp Detailing — Micro-entreprise</p>
                <p><span className="text-slate-500">Responsable :</span> Louis Estivin, Brest (29200)</p>
                <p><span className="text-slate-500">Email :</span>{' '}
                  <a href="mailto:shineup.brest@gmail.com" className="text-emerald-400">shineup.brest@gmail.com</a>
                </p>
                <p><span className="text-slate-500">Téléphone :</span>{' '}
                  <a href="tel:+33647805116" className="text-emerald-400">06 47 80 51 16</a>
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">2. Objet</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  Les présentes CGV régissent les relations contractuelles entre ShineUp Detailing et tout client
                  (particulier ou professionnel) ayant recours à ses prestations de nettoyage et d&apos;entretien automobile à domicile.
                  Toute réservation implique l&apos;acceptation pleine et entière des présentes CGV.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">3. Prestations proposées</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>ShineUp Detailing propose trois formules de nettoyage automobile mobile :</p>
                <div className="space-y-2 mt-2">
                  {[
                    { name: 'Express Intérieur', price: '45 €', desc: 'Nettoyage complet de l\'habitacle — durée ~1h.' },
                    { name: 'Deep Clean',         price: '90 €', desc: 'Intérieur complet + carrosserie + vitres — durée ~1h45.' },
                    { name: 'Intégrale Premium',  price: '150 €', desc: 'Deep Clean + polish carrosserie + protection — durée ~2h30.' },
                  ].map(f => (
                    <div key={f.name} className="flex items-start gap-3 bg-slate-800/40 rounded-lg p-3">
                      <span className="font-bold text-white w-36 flex-shrink-0">{f.name}</span>
                      <span className="text-emerald-400 font-bold w-16 flex-shrink-0">{f.price}</span>
                      <span className="text-slate-400">{f.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3">
                  Une majoration de <span className="text-white font-bold">20 €</span> s&apos;applique aux véhicules de type SUV,
                  monospace ou utilitaire (longueur supérieure à 4,5 m).
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">4. Réservation</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  La réservation s&apos;effectue via le formulaire en ligne, par téléphone ou par WhatsApp.
                  Elle est confirmée dès réception d&apos;un message de confirmation de la part de ShineUp Detailing.
                </p>
                <p>
                  Le client s&apos;engage à mettre à disposition du prestataire le véhicule concerné, un point d&apos;eau
                  et une prise électrique standard au moment convenu.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">5. Tarifs et paiement</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  Les tarifs affichés sont en euros TTC (TVA non applicable, art. 293B du CGI — micro-entreprise).
                </p>
                <p>Le paiement intervient <span className="text-white font-semibold">après réalisation de la prestation</span>, par l&apos;un des moyens suivants :</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
                  <li>Espèces</li>
                  <li>Virement bancaire</li>
                  <li>Carte bancaire (via terminal portable)</li>
                  <li>PayPal</li>
                  <li>Lydia / Sumeria</li>
                </ul>
                <p>
                  Le déplacement dans un rayon de 20 km autour de Brest est inclus dans le tarif.
                  Au-delà, un supplément de <span className="text-white font-semibold">0,40 €/km</span> sera facturé.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">6. Annulation et report</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  Le client peut annuler ou reporter sa réservation sans frais jusqu&apos;à{' '}
                  <span className="text-white font-semibold">24h avant</span> l&apos;heure prévue de la prestation.
                </p>
                <p>
                  En cas d&apos;annulation tardive (moins de 24h) ou d&apos;absence du client sans prévenir, ShineUp Detailing
                  se réserve le droit de facturer des frais de déplacement de <span className="text-white font-semibold">15 €</span>.
                </p>
                <p>
                  En cas d&apos;intempéries rendant la prestation impossible (pluie forte, gel), ShineUp Detailing peut reporter
                  le rendez-vous à une date ultérieure sans pénalité.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">7. Garantie satisfaction</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  ShineUp Detailing garantit la qualité de ses prestations.{' '}
                  <span className="text-white font-semibold">Si le client n&apos;est pas satisfait du résultat dans les 24h suivant la prestation</span>,
                  le prestataire s&apos;engage à revenir corriger gratuitement les défauts signalés.
                </p>
                <p>
                  Cette garantie est valable sous réserve que le véhicule n&apos;ait pas été utilisé de façon à altérer
                  le résultat après la prestation (trajet sur route boueuse, etc.).
                </p>
                <p>
                  La garantie ne couvre pas les défauts liés à l&apos;état initial du véhicule (rayures profondes,
                  taches permanentes) dûment signalés avant la prestation.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">8. Responsabilité</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  ShineUp Detailing s&apos;engage à apporter le plus grand soin à la réalisation des prestations.
                  Le prestataire est assuré en responsabilité civile professionnelle pour les dommages
                  qui pourraient survenir lors de l&apos;exécution des travaux.
                </p>
                <p>
                  Tout dommage constaté sur le véhicule avant la prestation doit être signalé et documenté (photos)
                  préalablement à l&apos;intervention. À défaut, aucune réclamation ne pourra être acceptée pour ces dommages préexistants.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">9. Programme de parrainage</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  ShineUp Detailing propose un programme de parrainage : le client ayant recommandé le service
                  bénéficie de <span className="text-white font-semibold">20 € de réduction</span> sur sa prochaine prestation,
                  et le filleul de <span className="text-white font-semibold">10 € de réduction</span> sur sa première réservation.
                </p>
                <p>
                  Cette réduction est accordée après réalisation de la prestation du filleul. Elle est non cumulable
                  avec d&apos;autres offres promotionnelles.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">10. Litiges</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  En cas de litige, le client peut contacter ShineUp Detailing par email à{' '}
                  <a href="mailto:shineup.brest@gmail.com" className="text-emerald-400">shineup.brest@gmail.com</a>{' '}
                  afin de trouver une solution amiable.
                </p>
                <p>
                  En l&apos;absence de résolution amiable, le litige sera soumis aux tribunaux compétents du ressort de Brest,
                  conformément au droit français.
                </p>
                <p>
                  Le client peut également recourir à la médiation de la consommation via la plateforme européenne de règlement
                  en ligne des litiges (RLL) : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">ec.europa.eu/consumers/odr</a>.
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
