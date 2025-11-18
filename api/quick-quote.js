export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { nom, organisation, email, formule, budget, message, source } = body;

  if (!email || !nom) {
    res.status(400).json({ ok: false, error: 'Missing required fields' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.QUICK_QUOTE_TARGET_EMAIL;

  if (!apiKey || !targetEmail) {
    console.error('❌ Quick quote API: missing environment variables');
    res.status(500).json({ ok: false, error: 'Configuration error' });
    return;
  }

  const subject = '[EfSVP] Nouvelle demande rapide';
  const htmlContent = buildEmailContent({ nom, organisation, email, formule, budget, message, source });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EfSVP <onboarding@resend.dev>',
        to: targetEmail,
        reply_to: email,
        subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend error: ${response.status} ${errorText}`);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('❌ Quick quote API error', error);
    res.status(500).json({ ok: false, error: 'Send failed' });
  }
}

function safeParse(content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ Quick quote API: unable to parse body', error);
    return {};
  }
}

function buildEmailContent(payload) {
  const { nom, organisation, email, formule, budget, message, source } = payload;
  const lines = [
    `<p><strong>Nom :</strong> ${escapeHtml(nom)}</p>`,
    organisation ? `<p><strong>Organisation :</strong> ${escapeHtml(organisation)}</p>` : '',
    email ? `<p><strong>Email :</strong> ${escapeHtml(email)}</p>` : '',
    formule ? `<p><strong>Formule :</strong> ${escapeHtml(formule)}</p>` : '',
    budget ? `<p><strong>Budget :</strong> ${escapeHtml(budget)}</p>` : '',
    message ? `<p><strong>Message :</strong><br/>${escapeHtml(message)}</p>` : '',
    source ? `<p><strong>Source :</strong> ${escapeHtml(source)}</p>` : '',
  ].filter(Boolean);

  return `
    <div>
      <p>Nouvelle demande rapide reçue depuis le site EfSVP.</p>
      ${lines.join('\n')}
    </div>
  `;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return map[char] || char;
  });
}
