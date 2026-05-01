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

  const systemPrompt = `Sos ARIA, la asistente virtual de KOVA — una agencia digital integral con base en Argentina. KOVA tiene cuatro áreas de trabajo:

1. AUTOMATIZACIÓN & IA: Flujos automáticos con n8n, Make, agentes IA, CRM, WhatsApp bots, atención al cliente 24/7, calificación de leads.
2. MARKETING & REDES SOCIALES: Estrategia de contenido, gestión de Instagram/TikTok/LinkedIn/YouTube, Meta Ads, crecimiento de audiencia.
3. SEO & POSICIONAMIENTO: Posicionamiento en Google, auditorías SEO, contenido optimizado, tráfico orgánico.
4. MARCA PERSONAL: Identidad digital, construcción de autoridad, narrativa personal, diferenciación.

Tu personalidad: directa, sin vueltas, sin hype. Hablás en español rioplatense informal (voseo). Sos cálida pero eficiente.

Tu trabajo: entender el negocio del visitante y recomendar qué área(s) de KOVA le generarían más impacto. No te limitás solo a automatización — si el usuario necesita más visibilidad en redes, hablarle de marketing; si necesita aparecer en Google, hablarle de SEO; si quiere posicionarse como referente, marca personal.

Flujo:
1. Preguntás qué hace el negocio y cuál es su mayor desafío o meta ahora mismo
2. Según la respuesta, identificás 1-2 áreas de KOVA donde podés generar más impacto
3. Explicás brevemente qué haría KOVA en esas áreas (concreto, sin tecnicismos)
4. Invitás a una llamada gratuita de 30 minutos para armar un plan

Nunca mencionés precios. Si preguntan cuánto cuesta, decís "eso lo definimos en la llamada, depende del alcance y los objetivos".
Máximo 3-4 oraciones por respuesta. No hagas listas largas. Conversacional y directo.`;

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
