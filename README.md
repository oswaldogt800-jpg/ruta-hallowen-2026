# Ruta de Halloween 🎃

Mapa real (OpenStreetMap) donde los vecinos registran su casa y aparece una calabaza. Registros compartidos con Netlify Functions + Netlify Blobs (sin base de datos aparte).

## Publicar en Netlify
1. Sube esta carpeta a un repositorio de GitHub (o arrástrala a Netlify con Netlify CLI: `netlify deploy --prod`).
2. En Netlify: Add new site → Import an existing project → elige el repo. No requiere comando de build.
3. En Site configuration → Environment variables agrega `ADMIN_KEY` con una clave tuya (sirve para quitar casas con el botón "Modo admin").
4. Abre el sitio y comparte el enlace con los vecinos.

## Personalizar
- En `index.html`, cambia `CENTER` y `ZOOM` al centro de tu fraccionamiento.

## Notas
- Las direcciones se buscan con Nominatim y las rutas a pie con el servidor demo de OSRM. Sirven bien para un fraccionamiento; si el uso crece, conviene un proveedor propio.
- Los domicilios son visibles para quien abra la página: pide autorización a cada vecino antes de registrarlo.

## Casas con dulces
Al registrarse, cada vecino marca si da dulces. El mapa y la ruta muestran solo las casas con dulces (se puede desactivar el filtro en "Ver mapa").

## ¿GitHub o Supabase?
- GitHub guarda el código y Netlify lo publica desde ahí. GitHub Pages solo sirve páginas fijas, por eso aquí se usa Netlify.
- Los registros hoy se guardan en Netlify Blobs. Si prefieres Supabase como base de datos, solo hay que cambiar `netlify/functions/casas.mjs` por consultas a una tabla `casas` (id, nom, dir, info, dulces, lat, lng).
