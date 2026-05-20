import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { dbServer, DB_ID, COLS } from '@/lib/appwrite-server'

const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_VOTRE_CLE_ICI'
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const TEAM_EMAIL = 'shineup.brest@gmail.com'
const FROM       = 'ShineUp Detailing <onboarding@resend.dev>'

const FORMULA_INFO: Record<string, { name: string; price: number }> = {
  'express':     { name: 'Express Intérieur', price: 45  },
  'deep-clean':  { name: 'Deep Clean',         price: 90  },
  'premium':     { name: 'Intégrale Premium',  price: 150 },
}

const VEHICLE_LABEL: Record<string, string> = {
  citadine: 'Citadine',
  berline:  'Berline / Break',
  suv:      'SUV / Monospace',
}

function fmtDate(d: string) {
  return new Date(`${d}T12:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function teamHtml(b: Record<string, string>, formulaName: string, total: number) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Nouvelle réservation ShineUp</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#064e3b,#065f46);padding:28px 32px;">
            <p style="margin:0;color:#6ee7b7;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">ShineUp Detailing — Brest</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;">🚗 Nouvelle réservation</h1>
          </td>
        </tr>

        <!-- Recap box -->
        <tr>
          <td style="padding:28px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:12px;padding:20px;border:1px solid #334155;">
              <tr>
                <td style="padding:6px 0;">
                  <span style="color:#94a3b8;font-size:13px;">Formule</span><br>
                  <span style="color:#ffffff;font-size:16px;font-weight:700;">${formulaName}</span>
                </td>
              </tr>
              <tr><td style="border-top:1px solid #1e293b;padding:6px 0;"></td></tr>
              <tr>
                <td style="padding:6px 0;">
                  <span style="color:#94a3b8;font-size:13px;">Véhicule</span><br>
                  <span style="color:#ffffff;font-size:15px;font-weight:600;">${VEHICLE_LABEL[b.vehicleSize] ?? b.vehicleSize}${b.vehicleSize === 'suv' ? ' <span style="color:#f59e0b;font-size:13px;">(+20 €)</span>' : ''}</span>
                </td>
              </tr>
              <tr><td style="border-top:1px solid #1e293b;padding:6px 0;"></td></tr>
              <tr>
                <td style="padding:6px 0;">
                  <span style="color:#94a3b8;font-size:13px;">Date & heure</span><br>
                  <span style="color:#34d399;font-size:16px;font-weight:700;">${fmtDate(b.date)} à ${b.time}</span>
                </td>
              </tr>
              <tr><td style="border-top:1px solid #334155;padding:8px 0;"></td></tr>
              <tr>
                <td style="padding:4px 0;">
                  <span style="color:#94a3b8;font-size:13px;">Total</span><br>
                  <span style="color:#34d399;font-size:24px;font-weight:900;">${total} €</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Client info -->
        <tr>
          <td style="padding:20px 32px 0;">
            <h2 style="color:#e2e8f0;font-size:15px;font-weight:700;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.5px;">Client</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:5px 0;color:#94a3b8;font-size:13px;width:120px;">Nom</td>
                <td style="padding:5px 0;color:#ffffff;font-size:14px;font-weight:600;">${b.name}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#94a3b8;font-size:13px;">Téléphone</td>
                <td style="padding:5px 0;color:#34d399;font-size:14px;font-weight:700;">${b.phone}</td>
              </tr>
              ${b.email ? `<tr>
                <td style="padding:5px 0;color:#94a3b8;font-size:13px;">Email</td>
                <td style="padding:5px 0;color:#ffffff;font-size:14px;">${b.email}</td>
              </tr>` : ''}
              <tr>
                <td style="padding:5px 0;color:#94a3b8;font-size:13px;">Adresse</td>
                <td style="padding:5px 0;color:#ffffff;font-size:14px;">${b.address}</td>
              </tr>
              ${b.notes ? `<tr>
                <td style="padding:5px 0;color:#94a3b8;font-size:13px;vertical-align:top;">Notes</td>
                <td style="padding:5px 0;color:#cbd5e1;font-size:13px;font-style:italic;">${b.notes}</td>
              </tr>` : ''}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:24px 32px 32px;">
            <a href="tel:+33${b.phone.replace(/\D/g,'').replace(/^0/,'')}}"
               style="display:inline-block;background:#059669;color:#ffffff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
              📞 Appeler ${b.name.split(' ')[0]}
            </a>
            ${b.email ? `<a href="mailto:${b.email}"
               style="display:inline-block;margin-left:10px;background:#1e293b;border:1px solid #475569;color:#e2e8f0;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
              ✉️ Répondre par email
            </a>` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0f172a;padding:16px 32px;border-top:1px solid #334155;">
            <p style="margin:0;color:#475569;font-size:12px;">ShineUp Detailing · shineup.brest@gmail.com · 06 47 80 51 16</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function clientHtml(name: string, formulaName: string, date: string, time: string, total: number) {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Réservation confirmée — ShineUp Detailing</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#064e3b,#065f46);padding:32px;text-align:center;">
            <p style="margin:0 0 8px;font-size:36px;">✨</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">Réservation reçue !</h1>
            <p style="margin:8px 0 0;color:#a7f3d0;font-size:14px;">ShineUp Detailing · Brest</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 20px;color:#334155;font-size:16px;">
              Bonjour <strong>${firstName}</strong>,<br><br>
              Nous avons bien reçu votre demande de réservation. Nous vous contacterons rapidement au
              numéro indiqué pour confirmer le créneau.
            </p>

            <!-- Recap -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1faf7;border-radius:12px;padding:20px;border:1px solid #d1fae5;margin-bottom:24px;">
              <tr>
                <td style="padding:5px 0;color:#6b7280;font-size:13px;width:120px;">Formule</td>
                <td style="padding:5px 0;color:#111827;font-size:14px;font-weight:700;">${formulaName}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;font-size:13px;">Date souhaitée</td>
                <td style="padding:5px 0;color:#059669;font-size:14px;font-weight:700;">${fmtDate(date)} à ${time}</td>
              </tr>
              <tr>
                <td style="padding:8px 0 0;color:#6b7280;font-size:13px;">Total</td>
                <td style="padding:8px 0 0;color:#059669;font-size:20px;font-weight:900;">${total} €</td>
              </tr>
            </table>

            <p style="margin:0 0 8px;color:#64748b;font-size:13px;line-height:1.7;">
              💡 <strong>Rappel :</strong> prévoyez un accès à un robinet et une prise électrique standard.<br>
              🛡️ <strong>Garantie :</strong> si vous n'êtes pas satisfait dans les 24h, on revient — gratuitement.
            </p>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0 0 10px;color:#64748b;font-size:13px;">Une question ? Contactez-nous directement :</p>
            <a href="tel:+33647805116" style="color:#059669;font-weight:700;font-size:15px;text-decoration:none;">06 47 80 51 16</a>
            <span style="color:#cbd5e1;margin:0 8px;">·</span>
            <a href="mailto:shineup.brest@gmail.com" style="color:#059669;font-size:13px;text-decoration:none;">shineup.brest@gmail.com</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#94a3b8;font-size:11px;">ShineUp Detailing · Micro-entreprise · Brest, Finistère</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: Request) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { formula, vehicleSize, date, time, name, phone, email, address, notes } = body
  const surcharge   = vehicleSize === 'suv' ? 20 : 0
  const info        = FORMULA_INFO[formula]
  const total       = (info?.price ?? 0) + surcharge
  const formulaName = info?.name ?? formula

  // Dev mode — log to console, return success
  if (!resend) {
    console.log('\n📧 [RESEND non configuré] Réservation reçue :')
    console.log(`  Client   : ${name} · ${phone}${email ? ` · ${email}` : ''}`)
    console.log(`  Formule  : ${formulaName} — ${total} €`)
    console.log(`  Créneau  : ${fmtDate(date)} à ${time}`)
    console.log(`  Adresse  : ${address}`)
    if (notes) console.log(`  Notes    : ${notes}`)
    console.log('  → Ajoutez RESEND_API_KEY dans .env.local pour activer les emails\n')
    return NextResponse.json({ ok: true, dev: true })
  }

  try {
    // 1. Notification équipe
    await resend.emails.send({
      from:     FROM,
      to:       [TEAM_EMAIL],
      replyTo:  email || TEAM_EMAIL,
      subject:  `🚗 Réservation — ${formulaName} · ${fmtDate(date)} ${time} · ${name}`,
      html:     teamHtml({ formula, vehicleSize, date, time, name, phone, email: email ?? '', address, notes: notes ?? '' }, formulaName, total),
    })

    // 2. Confirmation client (si email fourni)
    if (email) {
      await resend.emails.send({
        from:     FROM,
        to:       [email],
        replyTo:  TEAM_EMAIL,
        subject:  `✅ Votre réservation ShineUp Detailing — ${fmtDate(date)} ${time}`,
        html:     clientHtml(name, formulaName, date, time, total),
      })
    }

    // Save to Appwrite (citadine/berline → 'standard', suv → 'suv')
    const bookingId = `bk-${Date.now()}`
    await dbServer.createDocument(DB_ID, COLS.bookings, bookingId, {
      date:        date,
      clientName:  name,
      formula:     formula,
      vehicleSize: vehicleSize === 'suv' ? 'suv' : 'standard',
      source:      'web',
      status:      'pending',
      price:       total,
      assignedTo:  '',
    }).catch(err => console.error('Appwrite save error:', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Échec envoi email' }, { status: 500 })
  }
}
