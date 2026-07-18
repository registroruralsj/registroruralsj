# Registro Rural San José

Marketplace del agro para el departamento de San José, Uruguay.

## Cómo publicarlo en Netlify (gratis)

### Opción A — arrastrando la carpeta (la más simple, sin GitHub)
1. Entrá a [app.netlify.com](https://app.netlify.com) y creá una cuenta gratis.
2. En tu computadora, corré estos dos comandos adentro de esta carpeta (necesitás tener [Node.js](https://nodejs.org) instalado):
   ```
   npm install
   npm run build
   ```
3. Esto va a crear una carpeta llamada `dist`.
4. En Netlify, andá a la sección "Sites" y arrastrá la carpeta `dist` al recuadro que dice "Drag and drop your site output folder here".
5. Listo — te da una URL gratis tipo `tuproyecto.netlify.app`.

### Opción B — conectado a GitHub (recomendada si vas a seguir editando)
1. Subí esta carpeta completa a un repositorio nuevo en [github.com](https://github.com) (gratis).
2. En Netlify: "Add new site" → "Import an existing project" → elegís GitHub y el repo.
3. Netlify va a detectar automáticamente `npm run build` y la carpeta `dist` gracias al archivo `netlify.toml` que ya está incluido acá.
4. Cada vez que subas un cambio al repo, Netlify va a re-publicar la web sola.

## Importante sobre el guardado de datos

Esta versión guarda los avisos y las calificaciones en el `localStorage` del navegador — es decir, **cada persona que entra a la web ve y guarda sus propios datos, no compartidos con los demás**. Sirve para probarla vos, pero si querés que sea un marketplace real donde todos vean los mismos avisos, hay que sumar una base de datos compartida (por ejemplo, Supabase, que también tiene plan gratis).

## Desarrollo local

```
npm install
npm run dev
```

Abre `http://localhost:5173` con recarga automática mientras editás.
