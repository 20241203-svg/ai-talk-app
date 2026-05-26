export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { system, messages } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system,
        messages
      })
    });
    const data = await response.json();
    const reply = data.content.map(c => c.text || '').join('');
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: 'エラーが発生しました' });
  }
}
