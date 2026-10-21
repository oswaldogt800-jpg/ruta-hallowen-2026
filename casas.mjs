import { getStore } from "@netlify/blobs";

const json = (d, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json" } });
const clean = (v, n) => String(v || "").trim().slice(0, n);

export default async (req) => {
  const store = getStore("halloween");
  const list = (await store.get("casas", { type: "json" })) || [];

  if (req.method === "GET") return json(list);

  if (req.method === "POST") {
    const b = await req.json().catch(() => null);
    if (!b) return json({ error: "Datos inválidos" }, 400);
    const lat = Number(b.lat), lng = Number(b.lng);
    const nom = clean(b.nom, 40), dir = clean(b.dir, 80);
    if (!nom || !dir || !isFinite(lat) || !isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180)
      return json({ error: "Faltan datos" }, 400);
    if (list.length >= 300) return json({ error: "Se alcanzó el límite de casas" }, 400);
    const casa = { id: crypto.randomUUID(), nom, dir, info: clean(b.info, 80), dulces: b.dulces !== false, lat, lng, t: Date.now() };
    list.push(casa);
    await store.setJSON("casas", list);
    return json(casa, 201);
  }

  if (req.method === "DELETE") {
    const key = process.env.ADMIN_KEY;
    if (!key || req.headers.get("x-admin-key") !== key) return json({ error: "No autorizado" }, 401);
    const id = new URL(req.url).searchParams.get("id");
    await store.setJSON("casas", list.filter((c) => c.id !== id));
    return json({ ok: true });
  }

  return json({ error: "Método no permitido" }, 405);
};

export const config = { path: "/api/casas" };
