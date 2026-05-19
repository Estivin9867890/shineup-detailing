export default function MentionsLegalesPage() {
  return (
    <>
      <section className="relative pt-28 pb-20 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-2">Mentions légales</h1>
          <p className="text-slate-500 text-sm mb-12">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN).</p>

          <div className="space-y-10">

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">1. Éditeur du site</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-500">Nom commercial :</span> ShineUp Detailing</p>
                <p><span className="text-slate-500">Statut juridique :</span> Micro-entreprise</p>
                <p><span className="text-slate-500">Responsable de publication :</span> Louis Estivin</p>
                <p><span className="text-slate-500">Ville :</span> Brest (29200), Finistère, France</p>
                <p><span className="text-slate-500">Téléphone :</span>{' '}
                  <a href="tel:+33647805116" className="text-white hover:text-emerald-400 transition-colors">06 47 80 51 16</a>
                </p>
                <p><span className="text-slate-500">Email :</span>{' '}
                  <a href="mailto:shineup.brest@gmail.com" className="text-white hover:text-emerald-400 transition-colors">shineup.brest@gmail.com</a>
                </p>
                <p><span className="text-slate-500">SIRET :</span> En cours d&apos;immatriculation</p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">2. Hébergement</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-500">Hébergeur :</span> Vercel Inc.</p>
                <p><span className="text-slate-500">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
                <p><span className="text-slate-500">Site web :</span>{' '}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">vercel.com</a>
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">3. Propriété intellectuelle</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive de ShineUp Detailing,
                  sauf mentions contraires. Toute reproduction, distribution, modification ou utilisation à des fins commerciales
                  est strictement interdite sans autorisation préalable écrite.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">4. Responsabilité</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  ShineUp Detailing s&apos;efforce de maintenir les informations publiées sur ce site aussi exactes que possible,
                  mais ne saurait garantir leur exactitude, complétude ou actualité.
                </p>
                <p>
                  ShineUp Detailing se réserve le droit de modifier le contenu de ce site à tout moment et sans préavis.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">5. Liens hypertextes</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  Ce site peut contenir des liens vers d&apos;autres sites. ShineUp Detailing n&apos;est pas responsable
                  du contenu de ces sites externes et ne saurait être tenu responsable des dommages résultant de leur utilisation.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">6. Droit applicable</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-black mb-4 text-emerald-400">7. Contact</h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-sm text-slate-300">
                <p>
                  Pour toute question relative aux présentes mentions légales :{' '}
                  <a href="mailto:shineup.brest@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">shineup.brest@gmail.com</a>
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
