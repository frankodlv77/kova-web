export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const systemPrompt = `Sos el asistente virtual de KOVA, una agencia de automatización e IA con base en Argentina. Tu nombre es ARIA. Tu trabajo es entender el negocio del visitante y ayudarlo a identificar qué procesos puede automatizar para ahorrar tiempo y escalar.

Tu personalidad: directo, sin vueltas, sin hype. Hablás en español rioplatense informal (voseo). No prometés cosas que no existen. Cuando entendés el negocio del usuario, sugerís 2 o 3 automatizaciones concretas que le cambiarían la operación.

Flujo de la conversación:
1. Preguntás qué hace el negocio y cuánta gente tienen
2. Preguntás cuáles son las tareas más repetitivas o que más tiempo consumen
3. Con esa info, explicás 2-3 automatizaciones específicas que KOVA podría implementar
4. Invitás a agendar una llamada gratuita de 30 minutos

Nunca mencionés precios. Si preguntan cuánto cuesta, decís "eso lo vemos en la llamada, depende del alcance".
Máximo 3-4 oraciones por respuesta. No hagas listas largas. Conversacional.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.slice(-10)
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return new Response(
        JSON.stringify({ content: 'Tuve un problema técnico. Escribime al WhatsApp y te respondo ahora mismo.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || 'No pude procesar tu mensaje. Intentá de nuevo.';

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Handler error:', error);
    return new Response(
      JSON.stringify({ content: 'Tuve un problema técnico. Escribime al WhatsApp y te respondo ahora mismo.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
