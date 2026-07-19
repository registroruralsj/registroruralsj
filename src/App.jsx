import { useState, useEffect, useMemo } from "react";
import { Search, Plus, X, MapPin, MessageCircle, Phone, Star, ImagePlus, Trash2, Video } from "lucide-react";
import { supabase } from "./supabaseClient";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

/* Iconos de línea dibujados a medida — nada de librería genérica, para que cada
   categoría se sienta propia del campo y no de un marketplace cualquiera. */
function IconServicios({ size = 20, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 15.5c1.2-4 3.4-6 6.2-6 1 0 1.7.4 2.8 1.2" />
      <path d="M21 15.5c-1.2-4-3.4-6-6.2-6-1 0-1.7.4-2.8 1.2" />
      <path d="M9 10.5V6.8a1.8 1.8 0 0 1 3.6 0" />
      <path d="M12.6 10.5V7.6a1.6 1.6 0 0 1 3.2 0v3" />
      <path d="M5.5 16.5 4 20.5h16l-1.5-4" />
    </svg>
  );
}
function IconMaquinaria({ size = 20, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="6.5" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="3.4" />
      <path d="M6.5 14.5V9h4.2l3 3.2H17c1 0 1.7.7 1.7 1.8v1" />
      <path d="M10.7 9V6.2h3.4" />
      <path d="M3.5 14.5h3" />
    </svg>
  );
}
function IconInsumos({ size = 20, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21V9.5" />
      <path d="M12 9.5c0-3-1.6-5-3.4-6.5C10 4 12 5.4 12 9.5" />
      <path d="M12 9.5c0-3 1.6-5 3.4-6.5C14 4 12 5.4 12 9.5" />
      <path d="M12 13.5c0-2.4-1.3-4-2.9-5.2 1.2 1 2.9 2 2.9 5.2" />
      <path d="M12 13.5c0-2.4 1.3-4 2.9-5.2-1.2 1-2.9 2-2.9 5.2" />
    </svg>
  );
}
function IconGanado({ size = 20, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 8.5c0-1.8 1.3-3 2.8-2.6C7.4 4.4 8.5 3.5 9.7 4c.9-1 2.6-1 3.6-.2 1.2-.6 2.5.2 2.7 1.6 1.6-.3 2.8 1 2.8 2.8" />
      <path d="M6 8.8C4.6 8.3 3.3 9.2 3.3 10.6" />
      <path d="M18 8.8c1.4-.5 2.7.4 2.7 1.8" />
      <ellipse cx="12" cy="12.5" rx="5.6" ry="5" />
      <circle cx="9.8" cy="12" r=".5" fill="currentColor" />
      <circle cx="14.2" cy="12" r=".5" fill="currentColor" />
      <path d="M10.6 14.3c.5.5 2.3.5 2.8 0" />
    </svg>
  );
}

function IconCampos({ size = 20, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M4.5 8.5V19h15V8.5" />
      <path d="M4.5 19h15" />
      <path d="M9 19v-6h6v6" />
      <path d="M14.5 12.5 17 10" />
      <path d="M17 10v2.4M17 10h-2.4" />
    </svg>
  );
}

function IconLogoCampo({ size = 26, ...props }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="20" cy="20" r="17.3" strokeWidth="1.3" opacity="0.5" />
      <path d="M20 29V13.5" strokeWidth="1.7" />
      <path d="M20 13.5c-2.8-1-4.6-3.1-4.6-6.8 1.9 1 3.6 1 4.6 2.8 1-1.8 2.7-1.8 4.6-2.8 0 3.7-1.8 5.8-4.6 6.8z" fill="currentColor" stroke="none" opacity="0.92" />
      <path d="M20 18.8c-2.1-.5-3.5-1.8-4-4 1.5.3 2.7.7 3.6 2" />
      <path d="M20 18.8c2.1-.5 3.5-1.8 4-4-1.5.3-2.7.7-3.6 2" />
      <path d="M20 23.4c-1.9-.4-3.2-1.6-3.6-3.6 1.4.3 2.4.6 3.2 1.8" />
      <path d="M20 23.4c1.9-.4 3.2-1.6 3.6-3.6-1.4.3-2.4.6-3.2 1.8" />
      <path d="M13 29h14" strokeWidth="1.3" opacity="0.75" />
    </svg>
  );
}

function BrandSeal({ size = 62 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="rr-seal">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <path id="rr-seal-arc-top" d="M 14 50 A 36 36 0 0 1 86 50" fill="none" />
      <path id="rr-seal-arc-bottom" d="M 20 66 A 32 32 0 0 0 80 66" fill="none" />
      <text fontSize="8.4" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2" fill="currentColor">
        <textPath href="#rr-seal-arc-top" startOffset="50%" textAnchor="middle">REGISTRO RURAL</textPath>
      </text>
      <text fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2.5" fill="currentColor">
        <textPath href="#rr-seal-arc-bottom" startOffset="50%" textAnchor="middle">SAN JOSÉ</textPath>
      </text>
      <path d="M50 50.5c4.3 1.6 7 5 7 8.8 0 2.3-1.1 4-2.9 5-.5-2.8-1.7-4.6-3.4-6.2-1.7 1.6-2.9 3.4-3.4 6.2-1.8-1-2.9-2.7-2.9-5 0-3.8 2.7-7.2 6.6-8.8z" fill="currentColor" opacity="0.92" />
      <path d="M50 52v11.5" strokeWidth="0.9" opacity="0.5" fill="none" stroke="currentColor" />
      <path d="M39.5 68c4.5-2.1 9-2.1 14 0s9.5 2.1 14 0" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.8" />
      <path d="M41 71.8c4-1.9 8.3-1.9 12.5 0s8.5 1.9 12.5 0" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
    </svg>
  );
}

// Emblemas ilustrados propios en vez de fotos de stock: no dependen de ningún
// servicio externo (por eso antes no se veían) y refuerzan el aire de sello oficial.
function IconLecheria({ size = 54, ...props }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M38 28h24l4 10v42a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V38z" />
      <path d="M42 28v-8a8 5 0 0 1 16 0v8" />
      <line x1="34" y1="52" x2="66" y2="52" strokeWidth="1.4" opacity="0.6" />
      <path d="M50 62c3 3 3 7 0 10-3-3-3-7 0-10z" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  );
}
function IconOvinosGrande({ size = 54, ...props }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="46" cy="58" rx="28" ry="17" />
      <path d="M22 50a6 6 0 0 1 10-4M32 44a6 6 0 0 1 10-3M44 42a6 6 0 0 1 10-2M56 43a6 6 0 0 1 10 0M66 47a6 6 0 0 1 8 3" strokeWidth="1.6" />
      <circle cx="76" cy="52" r="9" />
      <path d="M80 46q4-3 5 2" strokeWidth="1.4" />
      <path d="M28 72v10M40 74v10M54 74v10M64 72v10" strokeWidth="1.8" />
    </svg>
  );
}
function IconPapaGrande({ size = 54, ...props }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M30 55c-4-10 2-20 14-21 8-5 20-2 24 6 9 1 14 10 10 18 4 6 1 15-8 17-6 6-18 6-25 0-10 0-17-9-15-20z" />
      <circle cx="40" cy="50" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="55" cy="60" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="48" cy="42" r="1.6" fill="currentColor" stroke="none" />
      <path d="M50 34c-2-6-1-11 3-14M56 34c2-5 6-8 10-8" strokeWidth="1.6" />
    </svg>
  );
}
function IconCampoAbierto({ size = 54, ...props }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="70" cy="30" r="10" strokeWidth="2" />
      <line x1="15" y1="60" x2="85" y2="60" strokeWidth="1.8" />
      <path d="M15 68c8-4 16-4 24 0s16 4 24 0 16-4 22 0" strokeWidth="1.6" />
      <path d="M15 78c8-4 16-4 24 0s16 4 24 0 16-4 22 0" strokeWidth="1.4" opacity="0.7" />
      <path d="M28 60V44c0-4 3-7 3-7s3 3 3 7v16" strokeWidth="1.6" />
    </svg>
  );
}

const CAMPO_EMBLEMAS = [
  { key: "lecheria", Icon: IconLecheria, caption: "Lechería", foto: "https://images.pexels.com/photos/11679517/pexels-photo-11679517.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { key: "ovinos", Icon: IconOvinosGrande, caption: "Ovinos", foto: "https://images.pexels.com/photos/16286489/pexels-photo-16286489.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { key: "papa", Icon: IconPapaGrande, caption: "Papa", foto: "https://images.pexels.com/photos/2797398/pexels-photo-2797398.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { key: "campo-abierto", Icon: IconCampoAbierto, caption: "Campo abierto", foto: "https://images.pexels.com/photos/26699517/pexels-photo-26699517.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

// Muestra la foto real de public/fotos/ si existe; si todavía no se subió (o no
// carga), cae de vuelta al ícono dibujado para que la web nunca se vea rota.
function CampoBanner() {
  const [failed, setFailed] = useState({});
  return (
    <div className="rr-campo-grid">
      {CAMPO_EMBLEMAS.map((f) => (
        <figure className="rr-campo-photo" key={f.key}>
          {failed[f.key] ? (
            <div className="rr-emblem-inner"><f.Icon /></div>
          ) : (
            <img
              className="rr-campo-photo-img"
              src={f.foto}
              alt={f.caption}
              loading="lazy"
              onError={() => setFailed((prev) => ({ ...prev, [f.key]: true }))}
            />
          )}
          <figcaption>{f.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// Mapa interactivo de Leaflet con los avisos agrupados por zona
function MapaAvisos({ listings }) {
  const porZona = useMemo(() => {
    const acc = {};
    for (const l of listings) {
      if (l.estado === "resuelto") continue;
      const coords = ZONA_COORDS[l.zona];
      if (!coords) continue;
      if (!acc[l.zona]) acc[l.zona] = { coords, avisos: [] };
      acc[l.zona].avisos.push(l);
    }
    return Object.values(acc);
  }, [listings]);

  if (!porZona.length) return null;

  return (
    <div className="rr-mapa-leaflet-wrap">
      <h2 className="rr-mapa-title">Avisos por zona</h2>
      <MapContainer
        center={[-34.33, -56.85]}
        zoom={9}
        scrollWheelZoom={false}
        className="rr-mapa-leaflet"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap'
        />
        {porZona.map(({ coords, avisos }) => (
          <CircleMarker
            key={avisos[0].zona}
            center={coords}
            radius={Math.min(8 + avisos.length * 3, 24)}
            pathOptions={{ color: "#8C3A1E", fillColor: "#8C3A1E", fillOpacity: 0.82, weight: 1.5 }}
          >
            <Popup>
              <div className="rr-mapa-popup">
                <strong>{avisos[0].zona}</strong>
                <span>{avisos.length} {avisos.length === 1 ? "aviso" : "avisos"}</span>
                <ul>
                  {avisos.slice(0, 5).map((a) => (
                    <li key={a.id}>
                      <a href={`#aviso-${a.id}`}>{a.titulo}</a>
                    </li>
                  ))}
                  {avisos.length > 5 && <li>y {avisos.length - 5} más...</li>}
                </ul>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

// Mapa simplificado y dibujado a mano (no es cartografía exacta) para ubicar
// San José dentro de Uruguay de un vistazo.
function MapaUruguay({ size = 130 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size * 0.86} className="rr-mapa">
      <path
        d="M46 22 L104 18 L150 34 L168 62 L162 96 L150 128 L120 158 L92 178 L74 168 L48 150 L28 128 L20 96 L24 60 Z"
        fill="var(--paper-card)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="118" r="3.5" fill="currentColor" opacity="0.55" />
      <text x="124" y="116" fontSize="9" fontFamily="'Public Sans', sans-serif" fill="currentColor" opacity="0.6">Montevideo</text>

      <circle cx="72" cy="122" r="9" fill="none" stroke="var(--stamp)" strokeWidth="1.6" strokeDasharray="2 2" />
      <path d="M72 108c5 0 9 4 9 9 0 6-9 15-9 15s-9-9-9-15c0-5 4-9 9-9z" fill="var(--stamp)" />
      <circle cx="72" cy="117" r="2.6" fill="var(--paper-card)" />
      <text x="72" y="146" textAnchor="middle" fontSize="10.5" fontWeight="700" fontFamily="'Public Sans', sans-serif" fill="var(--stamp)">San José</text>
    </svg>
  );
}

const CATEGORIES = [
  { id: "servicios", label: "Servicios", icon: IconServicios, desc: "Changas, mano de obra, esquila, fletes" },
  { id: "maquinaria", label: "Maquinaria", icon: IconMaquinaria, desc: "Tractores, implementos, herramientas" },
  { id: "insumos", label: "Insumos", icon: IconInsumos, desc: "Semillas, fertilizantes, alambre, sales" },
  { id: "ganado", label: "Ganado", icon: IconGanado, desc: "Vacunos, ovinos, equinos" },
  { id: "campos", label: "Campos", icon: IconCampos, desc: "Compra, venta y arriendo de campos y padrones" },
];

const ZONAS = [
  "San José de Mayo", "Libertad", "Ecilda Paullier", "Rodríguez", "Raigón",
  "Mal Abrigo", "Puntas de Valdez", "Villa Rodríguez", "Rafael Perazza",
  "Cañada Grande", "Otra zona del departamento",
];

// Coordenadas aproximadas de cada zona del departamento para el mapa
const ZONA_COORDS = {
  "San José de Mayo":       [-34.337, -56.714],
  "Libertad":               [-34.638, -56.619],
  "Ecilda Paullier":        [-34.315, -57.100],
  "Rodríguez":              [-34.060, -56.993],
  "Raigón":                 [-34.187, -56.710],
  "Mal Abrigo":             [-34.255, -57.239],
  "Puntas de Valdez":       [-34.080, -56.655],
  "Villa Rodríguez":        [-34.060, -56.420],
  "Rafael Perazza":         [-34.043, -57.037],
  "Cañada Grande":          [-34.440, -57.005],
  "Otra zona del departamento": [-34.337, -56.714],
};

const MIS_AVISOS_KEY = "marketplace-mis-avisos-sanjose";
const GUARDADOS_KEY = "marketplace-guardados-sanjose";
const PUSH_ASKED_KEY = "marketplace-push-asked-sanjose";

function normalizeContact(contacto) {
  return (contacto || "").replace(/\D/g, "");
}

// Celular uruguayo: 8 o 9 dígitos, con o sin el 0 inicial, empezando en 9 (ej: 099123456 o 99123456).
function isValidPhone(contacto) {
  return /^0?9[0-9]{7,8}$/.test(normalizeContact(contacto));
}

const emptyRatingForm = { stars: 0, comment: "", nombre: "" };

const MAX_FOTOS = 3;
const RATE_LIMIT_KEY = "marketplace-publish-times-sanjose";
const RATE_LIMIT_MAX = 5; // avisos nuevos permitidos por hora, por navegador

// Freno básico contra spam automatizado: como cualquiera puede publicar sin
// login, limitamos cuántos avisos nuevos puede cargar el mismo navegador por hora.
function checkRateLimit() {
  let times = [];
  try {
    times = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
  } catch (err) {
    times = [];
  }
  const unaHoraAtras = Date.now() - 60 * 60 * 1000;
  times = times.filter((t) => t > unaHoraAtras);
  if (times.length >= RATE_LIMIT_MAX) return false;
  times.push(Date.now());
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(times));
  } catch (err) {
    // si no se puede guardar, dejamos pasar la publicación igual
  }
  return true;
}

const emptyForm = {
  tipo: "ofrezco",
  categoria: "servicios",
  titulo: "",
  descripcion: "",
  zona: ZONAS[0],
  precio: "",
  nombre: "",
  contacto: "",
  fotos: [],
  video: "",
};

// Redimensiona y comprime la foto en el navegador antes de guardarla, así un
// aviso con foto no infla demasiado el localStorage (que tiene un límite chico).
function compressImage(file, maxWidth = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("No se pudo leer la imagen"));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return "hoy";
  if (days === 1) return "ayer";
  if (days < 7) return `hace ${days} días`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `hace ${weeks} sem`;
  return new Date(iso).toLocaleDateString("es-UY", { day: "numeric", month: "short" });
}

function seedListings() {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      tipo: "ofrezco",
      categoria: "servicios",
      titulo: "Esquilador con equipo propio",
      descripcion: "Trabajo a máquina, disponible para majadas chicas y medianas. Experiencia en la zona de Raigón.",
      zona: "Raigón",
      precio: "A convenir por cabeza",
      nombre: "Walter",
      contacto: "099123456",
      estado: "activo",
      fotos: [],
      video: "",
      fecha: new Date(now - 86400000 * 2).toISOString(),
    },
    {
      id: "seed-2",
      tipo: "ofrezco",
      categoria: "maquinaria",
      titulo: "Alquiler de rotativa 1,80m",
      descripcion: "Rotativa en buen estado, se alquila por día o por hectárea trabajada. Entrego en la zona.",
      zona: "Ecilda Paullier",
      precio: "US$ 15 / hectárea",
      nombre: "Rodrigo",
      contacto: "098765432",
      estado: "activo",
      fotos: [],
      video: "",
      fecha: new Date(now - 86400000 * 5).toISOString(),
    },
    {
      id: "seed-3",
      tipo: "busco",
      categoria: "ganado",
      titulo: "Busco 10 vaquillonas Hereford",
      descripcion: "Para recría, preferentemente entoradas o próximas a servicio. Pago contado.",
      zona: "San José de Mayo",
      precio: "Consultar precio de mercado",
      nombre: "Marcelo",
      contacto: "091234567",
      estado: "activo",
      fotos: [],
      video: "",
      fecha: new Date(now - 86400000).toISOString(),
    },
  ];
}

// Datos de ejemplo para que la vista de reseñas tenga contenido en esta demo.
// En producción esto llega solo de lo que la gente carga con el formulario de calificación.
function seedRatings() {
  const now = Date.now();
  return {
    "099123456": {
      count: 2,
      total: 9,
      reviews: [
        { stars: 5, comment: "Vino puntual y dejó la majada impecable. Recontra recomendado.", nombre: "Ana", fecha: new Date(now - 86400000 * 3).toISOString() },
        { stars: 4, comment: "Buen trabajo, un poco de demora en confirmar la fecha.", nombre: "Julio", fecha: new Date(now - 86400000 * 9).toISOString() },
      ],
    },
  };
}

// ─── BANNER PUBLICITARIO ────────────────────────────────────────────────────
// Para agregar o cambiar el anunciante, editá estas líneas. Si no querés
// mostrar ningún banner, poné BANNER_ACTIVO = false.
const BANNER_ACTIVO = true;
const BANNER = {
  empresa: "Tu empresa aquí",
  eslogan: "Anunciá tu agroveterinaria, semillería o servicio rural en esta página.",
  url: null, // null o "https://tu-link.com"
  telefono: null, // null o "099123456"
  etiqueta: "Espacio publicitario disponible",
};

// ─── ACERCA DE ──────────────────────────────────────────────────────────────
const ACERCA_DE = `Registro Rural San José es una plataforma gratuita creada para conectar a productores, trabajadores autónomos y empresas del agro del Departamento de San José, Uruguay.

Acá podés publicar o encontrar avisos de servicios rurales, maquinaria agrícola, insumos, ganado y campos. No cobramos comisión por ninguna operación: el trato se cierra directamente entre las partes por WhatsApp o teléfono.

Nació con el objetivo de darle visibilidad a la actividad rural del departamento — desde el pequeño productor familiar hasta la empresa agropecuaria — en un solo lugar, simple y sin burocracia.

Si querés publicar un aviso de tu negocio o aparecer como anunciante en esta página, escribinos al WhatsApp del administrador.`;

// Convierte las filas planas que llegan de Supabase
// a la forma agrupada por contacto que usa el resto de la app.
function groupRatings(rows) {
  const grouped = {};
  for (const r of rows) {
    const key = normalizeContact(r.contacto);
    if (!grouped[key]) grouped[key] = { count: 0, total: 0, reviews: [] };
    grouped[key].count += 1;
    grouped[key].total += r.estrellas;
    grouped[key].reviews.push({ stars: r.estrellas, comment: r.comentario, nombre: r.autor, fecha: r.fecha });
  }
  return grouped;
}

export default function RegistroRuralSanJose() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storageOk, setStorageOk] = useState(true);
  const [filterCat, setFilterCat] = useState("todos");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [justPublished, setJustPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [videoBusy, setVideoBusy] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [ratings, setRatings] = useState({});
  const [ratingTarget, setRatingTarget] = useState(null); // { contacto, nombre }
  const [ratingForm, setRatingForm] = useState(emptyRatingForm);
  const [ratingSaving, setRatingSaving] = useState(false);
  const [ratingToast, setRatingToast] = useState(false);
  const [reviewsTarget, setReviewsTarget] = useState(null); // { contacto, nombre }
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [misAvisos, setMisAvisos] = useState([]); // ids de los avisos publicados desde este mismo navegador
  const [guardados, setGuardados] = useState([]);
  const [onlyMine, setOnlyMine] = useState(false);
  const [onlyGuardados, setOnlyGuardados] = useState(false);
  const [activeView, setActiveView] = useState("avisos"); // "avisos" | "acerca"
  const [pushGranted, setPushGranted] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [reportingId, setReportingId] = useState(null);
  const [reportSent, setReportSent] = useState({}); // { [id]: true } — para no dejar reportar 2 veces seguidas en la misma sesión
  const [reportToast, setReportToast] = useState(false);
  const [resolvingId, setResolvingId] = useState(null);
  const [filterZona, setFilterZona] = useState("todas");
  const [sortBy, setSortBy] = useState("recientes");
  const [visibleCount, setVisibleCount] = useState(9);
  const [publishError, setPublishError] = useState("");
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .order("fecha", { ascending: false });
        if (error) throw error;
        setListings(data && data.length ? data : seedListings());
        setStorageOk(true);
      } catch (err) {
        setListings(seedListings());
        setStorageOk(false);
      }
      try {
        const { data, error } = await supabase
          .from("ratings")
          .select("*")
          .order("fecha", { ascending: false });
        if (error) throw error;
        setRatings(data && data.length ? groupRatings(data) : seedRatings());
      } catch (err) {
        setRatings(seedRatings());
      }
      try {
        const raw = localStorage.getItem(MIS_AVISOS_KEY);
        setMisAvisos(raw ? JSON.parse(raw) : []);
      } catch (err) {
        setMisAvisos([]);
      }
      try {
        const raw = localStorage.getItem(GUARDADOS_KEY);
        setGuardados(raw ? JSON.parse(raw) : []);
      } catch (err) {
        setGuardados([]);
      }
      if ("Notification" in window) {
        setPushGranted(Notification.permission === "granted");
      }
      setLoading(false);
    }
    cargarDatos();
  }, []);

  useEffect(() => {
    setVisibleCount(9);
  }, [filterCat, filterTipo, filterZona, query, onlyMine, onlyGuardados, sortBy]);

  useEffect(() => {
    if (loading || !listings.length) return;
    const hash = window.location.hash;
    if (hash.startsWith("#aviso-")) {
      const id = hash.replace("#aviso-", "");
      const el = document.getElementById(`aviso-${id}`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("rr-card-highlight");
          setTimeout(() => el.classList.remove("rr-card-highlight"), 2200);
        }, 200);
      }
    }
  }, [loading, listings]);

  function persist(next) {
    setListings(next);
  }

  function persistMisAvisos(next) {
    setMisAvisos(next);
    try {
      localStorage.setItem(MIS_AVISOS_KEY, JSON.stringify(next));
    } catch (err) {
      // no es grave: en el peor caso, esta persona no ve el botón de "borrar mi aviso"
    }
  }

  async function deleteListing(id) {
    persist(listings.filter((l) => l.id !== id));
    persistMisAvisos(misAvisos.filter((mid) => mid !== id));
    setConfirmDeleteId(null);
    setDeleteToast(true);
    setTimeout(() => setDeleteToast(false), 2200);
    try {
      await supabase.from("listings").delete().eq("id", id);
    } catch (err) {
      // el aviso ya se sacó de la vista; si falló el borrado remoto, reaparecerá
      // al recargar la página, pero no bloqueamos la experiencia por eso
    }
  }

  function openEditForm(listing) {
    const { id, fecha, estado, ...rest } = listing;
    setForm({ ...emptyForm, ...rest, fotos: rest.fotos || [], video: rest.video || "" });
    setEditingId(id);
    setPhotoError("");
    setVideoError("");
    setPublishError("");
    setShowForm(true);
  }

  async function toggleResolved(listing) {
    const nuevoEstado = listing.estado === "resuelto" ? "activo" : "resuelto";
    persist(listings.map((x) => (x.id === listing.id ? { ...x, estado: nuevoEstado } : x)));
    setResolvingId(null);
    try {
      await supabase.from("listings").update({ estado: nuevoEstado }).eq("id", listing.id);
    } catch (err) {
      // si falla, se corrige solo al recargar la página
    }
  }

  async function submitReport(id, motivo) {
    setReportingId(null);
    setReportSent((prev) => ({ ...prev, [id]: true }));
    setReportToast(true);
    setTimeout(() => setReportToast(false), 2500);
    try {
      await supabase.from("reports").insert({
        id: `${Date.now()}`,
        listing_id: id,
        motivo,
        fecha: new Date().toISOString(),
      });
    } catch (err) {
      // el reporte no bloquea nada para quien lo hizo, aunque falle el guardado
    }
  }

  function toggleGuardado(id) {
    const next = guardados.includes(id)
      ? guardados.filter((g) => g !== id)
      : [...guardados, id];
    setGuardados(next);
    try { localStorage.setItem(GUARDADOS_KEY, JSON.stringify(next)); } catch (err) {}
  }

  async function pedirPermisoNotificaciones() {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPushGranted(result === "granted");
    try { localStorage.setItem(PUSH_ASKED_KEY, "1"); } catch (err) {}
  }

  function notificarNuevoAviso(aviso) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    new Notification("Nuevo aviso en Registro Rural San José", {
      body: `${aviso.tipo === "busco" ? "Busco" : "Ofrezco"}: ${aviso.titulo} · ${aviso.zona}`,
      icon: "./favicon-192.png",
    });
  }

  function shareListing(l) {
    const url = `${window.location.origin}${window.location.pathname}#aviso-${l.id}`;
    const text = `Mirá este aviso en Registro Rural San José: "${l.titulo}"`;
    if (navigator.share) {
      navigator.share({ title: l.titulo, text, url }).catch(() => {});
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setShareToast(true);
          setTimeout(() => setShareToast(false), 2200);
        })
        .catch(() => {});
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.titulo.trim() || !isValidPhone(form.contacto)) return;

    if (editingId) {
      setSaving(true);
      persist(listings.map((l) => (l.id === editingId ? { ...l, ...form } : l)));
      try {
        const { error } = await supabase.from("listings").update(form).eq("id", editingId);
        if (error) throw error;
        setStorageOk(true);
      } catch (err) {
        setStorageOk(false);
      }
      setEditingId(null);
      setSaving(false);
      setForm(emptyForm);
      setJustPublished(true);
      setTimeout(() => setJustPublished(false), 2200);
      setShowForm(false);
      return;
    }

    if (!checkRateLimit()) {
      setPublishError(
        `Ya publicaste varios avisos en la última hora (máximo ${RATE_LIMIT_MAX}). Esperá un rato antes de publicar otro — es para evitar spam.`
      );
      return;
    }
    setPublishError("");
    setSaving(true);
    const nuevo = {
      id: `${Date.now()}`,
      ...form,
      estado: "activo",
      fecha: new Date().toISOString(),
    };
    persist([nuevo, ...listings]);
    persistMisAvisos([...misAvisos, nuevo.id]);
    try {
      const { error } = await supabase.from("listings").insert(nuevo);
      if (error) throw error;
      setStorageOk(true);
    } catch (err) {
      setStorageOk(false);
    }
    setSaving(false);
    setForm(emptyForm);
    notificarNuevoAviso(nuevo);
    setJustPublished(true);
    setTimeout(() => setJustPublished(false), 2200);
    setShowForm(false);
  }

  async function handlePhotoChange(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Elegí un archivo de imagen (JPG, PNG, etc).");
      return;
    }
    setPhotoError("");
    setPhotoBusy(true);
    try {
      const dataUrl = await compressImage(file);
      setForm((f) => ({ ...f, fotos: [...f.fotos, dataUrl].slice(0, MAX_FOTOS) }));
    } catch (err) {
      setPhotoError("No se pudo procesar esa imagen, probá con otra.");
    }
    setPhotoBusy(false);
  }

  function removePhoto(index) {
    setForm((f) => ({ ...f, fotos: f.fotos.filter((_, i) => i !== index) }));
  }

  const MAX_VIDEO_BYTES = 4 * 1024 * 1024; // ~4MB: límite práctico para que entre en localStorage

  async function handleVideoChange(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setVideoError("Elegí un archivo de video válido.");
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      setVideoError(
        "Ese video pesa demasiado para subirlo directo (máx. ~4MB, unos 10-15 segundos). Grabá uno más corto, o subilo a YouTube/Instagram y pegá el link abajo."
      );
      return;
    }
    setVideoError("");
    setVideoBusy(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("No se pudo leer el video"));
        reader.readAsDataURL(file);
      });
      setForm((f) => ({ ...f, video: dataUrl }));
    } catch (err) {
      setVideoError("No se pudo procesar ese video, probá con otro.");
    }
    setVideoBusy(false);
  }

  function persistRatings(next) {
    setRatings(next);
  }

  async function handleRatingSubmit(e) {
    e.preventDefault();
    if (!ratingTarget || ratingForm.stars < 1) return;
    setRatingSaving(true);
    const key = normalizeContact(ratingTarget.contacto);
    const prev = ratings[key] || { count: 0, total: 0, reviews: [] };
    const nuevaReview = { stars: ratingForm.stars, comment: ratingForm.comment, nombre: ratingForm.nombre, fecha: new Date().toISOString() };
    const nextEntry = {
      count: prev.count + 1,
      total: prev.total + ratingForm.stars,
      reviews: [nuevaReview, ...prev.reviews],
    };
    persistRatings({ ...ratings, [key]: nextEntry });
    try {
      const { error } = await supabase.from("ratings").insert({
        id: `${Date.now()}`,
        contacto: ratingTarget.contacto,
        estrellas: ratingForm.stars,
        comentario: ratingForm.comment,
        autor: ratingForm.nombre,
        fecha: nuevaReview.fecha,
      });
      if (error) throw error;
    } catch (err) {
      // la calificación queda visible en esta sesión igual, aunque no se haya
      // guardado del lado del servidor
    }
    setRatingSaving(false);
    setRatingTarget(null);
    setRatingForm(emptyRatingForm);
    setRatingToast(true);
    setTimeout(() => setRatingToast(false), 2200);
  }

  function ratingStats(contacto) {
    const entry = ratings[normalizeContact(contacto)];
    if (!entry || entry.count === 0) return null;
    return { avg: entry.total / entry.count, count: entry.count };
  }

  function ratingReviews(contacto) {
    const entry = ratings[normalizeContact(contacto)];
    return entry ? entry.reviews : [];
  }

  function precioNumerico(precio) {
    if (!precio) return null;
    const n = parseFloat(String(precio).replace(/[^\d.,]/g, "").replace(",", "."));
    return isNaN(n) ? null : n;
  }

  const filtered = listings
    .filter((l) => {
      if (onlyGuardados && !guardados.includes(l.id)) return false;
      if (onlyMine && !misAvisos.includes(l.id)) return false;
      if (!onlyMine && !onlyGuardados && l.estado === "resuelto") return false;
      if (filterCat !== "todos" && l.categoria !== filterCat) return false;
      if (filterTipo !== "todos" && l.tipo !== filterTipo) return false;
      if (filterZona !== "todas" && l.zona !== filterZona) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!l.titulo.toLowerCase().includes(q) && !l.descripcion.toLowerCase().includes(q) && !l.zona.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "precio_asc" || sortBy === "precio_desc") {
        const pa = precioNumerico(a.precio);
        const pb = precioNumerico(b.precio);
        if (pa === null && pb === null) return 0;
        if (pa === null) return 1;
        if (pb === null) return -1;
        return sortBy === "precio_asc" ? pa - pb : pb - pa;
      }
      return new Date(b.fecha) - new Date(a.fecha);
    });

  const visibleListings = filtered.slice(0, visibleCount);

  return (
    <div className="rr-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .rr-root {
          --paper: #E4E2B4;
          --paper-card: #F3F1DA;
          --ink: #1F2E16;
          --ink-soft: #4C5C2E;
          --line: #A9AE6C;
          --stamp: #8C3A1E;
          --stamp-soft: #A8532E;
          --gold: #AC8A28;
          --green: #2E5C1C;
          --green-soft: #427B29;
          font-family: 'Public Sans', sans-serif;
          background-color: var(--paper);
          background-image:
            radial-gradient(rgba(31,46,22,0.07) 0.7px, transparent 0.7px),
            radial-gradient(rgba(31,46,22,0.05) 0.7px, transparent 0.7px);
          background-size: 26px 26px, 26px 26px;
          background-position: 0 0, 13px 13px;
          color: var(--ink);
          min-height: 100%;
          padding: 0;
        }
        .rr-root * { box-sizing: border-box; }
        .rr-display { font-family: 'Libre Baskerville', serif; }
        .rr-mono { font-family: 'IBM Plex Mono', monospace; }

        .rr-hero {
          border-bottom: none;
          padding: 36px 24px 0;
          position: relative;
        }
        .rr-hero-photo {
          position: relative;
          margin: 0 -24px 6px;
          padding: 30px 24px 34px;
          background-image:
            linear-gradient(180deg, rgba(31,46,22,0.32) 0%, rgba(31,46,22,0.58) 65%, rgba(31,46,22,0.58) 100%),
            url('https://images.pexels.com/photos/8402141/pexels-photo-8402141.jpeg?auto=compress&cs=tinysrgb&w=1400');
          background-size: cover;
          background-position: center 55%;
          overflow: hidden;
        }
        .rr-hero-photo::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 46px;
          background: linear-gradient(180deg, rgba(228,226,180,0) 0%, var(--paper) 100%);
          pointer-events: none;
        }
        .rr-hero-photo .rr-eyebrow,
        .rr-hero-photo .rr-title,
        .rr-hero-photo .rr-sub {
          color: #F3F1DA;
          position: relative;
          z-index: 1;
        }
        .rr-hero-photo .rr-title span { color: #E9C15A; }
        .rr-hero-photo .rr-seal { color: #F3F1DA; opacity: 0.95; position: relative; z-index: 1; }
        .rr-hero-photo .rr-cta { position: relative; z-index: 1; }
        .rr-hero-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 6px;
        }
        .rr-seal { color: var(--stamp); flex-shrink: 0; opacity: 0.92; }
        .rr-fenceline {
          width: 100%;
          height: 22px;
          color: var(--line);
          margin-top: 26px;
          display: block;
        }
        .rr-campo-wrap { padding: 18px 0 32px; }
        .rr-campo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .rr-campo-photo {
          margin: 0;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--line);
          aspect-ratio: 4 / 3;
          background: var(--paper-card);
          padding-bottom: 26px;
        }
        .rr-emblem-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--stamp);
          background:
            radial-gradient(rgba(31,46,22,0.05) 0.7px, transparent 0.7px);
          background-size: 10px 10px;
        }
        .rr-campo-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rr-campo-photo figcaption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--paper-card);
          border-top: 1px dashed var(--line);
          color: var(--ink);
          font-family: 'Public Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-align: center;
          padding: 7px 8px;
        }
        .rr-campo-caption {
          display: block;
          margin-top: 10px;
          font-size: 12px;
          color: var(--ink-soft);
          font-style: italic;
        }
        @media (max-width: 560px) {
          .rr-campo-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .rr-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 0;
          max-width: 60%;
          padding-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rr-eyebrow svg { flex-shrink: 0; color: var(--stamp); }
        .rr-title {
          font-size: 40px;
          font-weight: 700;
          line-height: 1.05;
          margin: 0 0 8px;
        }
        .rr-title span { color: var(--stamp); }
        .rr-sub {
          color: var(--ink-soft);
          font-size: 15px;
          max-width: 480px;
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .rr-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--green);
          color: var(--paper-card);
          border: none;
          padding: 12px 20px;
          font-family: 'Public Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .rr-cta:hover { background: var(--green-soft); }
        .rr-cta:active { transform: scale(0.98); }
        .rr-cta:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

        .rr-controls {
          padding: 20px 24px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .rr-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--paper-card);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 8px 12px;
          flex: 1;
          min-width: 200px;
        }
        .rr-search input {
          border: none;
          background: transparent;
          outline: none;
          font-family: 'Public Sans', sans-serif;
          font-size: 14px;
          color: var(--ink);
          width: 100%;
        }
        .rr-search input::placeholder { color: var(--ink-soft); }

        .rr-mine-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--paper-card);
          border: 1px solid var(--line);
          color: var(--ink-soft);
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 9px 14px;
          border-radius: 3px;
          cursor: pointer;
          white-space: nowrap;
        }
        .rr-mine-btn:hover { border-color: var(--stamp); color: var(--ink); }
        .rr-mine-btn.active {
          background: var(--stamp);
          border-color: var(--stamp);
          color: var(--paper-card);
        }

        .rr-filters-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          padding: 0 24px 14px;
        }
        .rr-select-inline {
          font-family: 'Public Sans', sans-serif;
          font-size: 12.5px;
          color: var(--ink);
          background: var(--paper-card);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 7px 10px;
          cursor: pointer;
        }

        .rr-skeleton {
          background: var(--paper-card);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 18px;
        }
        .rr-skeleton-photo {
          aspect-ratio: 4 / 3;
          margin: -18px -18px 12px;
          background: linear-gradient(90deg, var(--line) 25%, rgba(0,0,0,0.06) 37%, var(--line) 63%);
          background-size: 400% 100%;
          animation: rr-shimmer 1.4s ease infinite;
        }
        .rr-skeleton-line {
          height: 10px;
          border-radius: 2px;
          margin-bottom: 8px;
          background: linear-gradient(90deg, var(--line) 25%, rgba(0,0,0,0.06) 37%, var(--line) 63%);
          background-size: 400% 100%;
          animation: rr-shimmer 1.4s ease infinite;
        }
        @keyframes rr-shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }

        .rr-mostrar-mas-wrap {
          display: flex;
          justify-content: center;
          padding: 4px 24px 32px;
        }
        .rr-mostrar-mas {
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          background: var(--paper-card);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 10px 20px;
          cursor: pointer;
        }
        .rr-mostrar-mas:hover { border-color: var(--stamp); color: var(--stamp); }

        .rr-card-resuelto { opacity: 0.68; }
        .rr-resuelto-ribbon {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--ink);
          color: var(--paper-card);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 3px;
          z-index: 2;
        }
        .rr-card-highlight {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }

        .rr-card-utility-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .rr-utility-link {
          background: transparent;
          border: none;
          padding: 0;
          font-family: 'Public Sans', sans-serif;
          font-size: 11.5px;
          color: var(--ink-soft);
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: color 0.15s ease, text-decoration-color 0.15s ease;
        }
        .rr-utility-link:hover { color: var(--stamp); text-decoration-color: var(--stamp); }
        .rr-utility-muted { text-decoration: none; cursor: default; color: var(--ink-soft); opacity: 0.7; }

        .rr-report-picker {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .rr-report-picker button {
          font-family: 'Public Sans', sans-serif;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 3px;
          border: 1px solid var(--line);
          background: var(--paper-card);
          color: var(--ink-soft);
          cursor: pointer;
        }
        .rr-report-picker button:hover { border-color: var(--stamp); color: var(--stamp); }
        .rr-report-cancel { opacity: 0.7; }

        .rr-owner-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 1px dashed var(--line);
          padding-top: 10px;
        }
        .rr-owner-link {
          align-self: flex-start;
          background: transparent;
          border: none;
          padding: 0;
          font-family: 'Public Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--green);
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: transparent;
        }
        .rr-owner-link:hover { text-decoration-color: var(--green); }

        .rr-publish-error {
          background: #F3E7D8;
          border: 1px solid var(--gold);
          border-radius: 3px;
          padding: 10px 12px;
          font-size: 12.5px;
          color: var(--ink);
          margin-bottom: 14px;
        }

        .rr-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          padding: 16px 24px 0;
        }
        .rr-tab {
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid var(--line);
          background: var(--paper-card);
          color: var(--ink-soft);
          padding: 8px 14px;
          border-radius: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .rr-tab:hover { border-color: var(--stamp); color: var(--ink); }
        .rr-tab.active {
          background: var(--ink);
          color: var(--paper-card);
          border-color: var(--ink);
        }
        .rr-tab:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

        .rr-toggle {
          display: flex;
          gap: 6px;
          padding: 10px 24px 0;
        }
        .rr-toggle button {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink-soft);
          padding: 6px 12px;
          border-radius: 3px;
          cursor: pointer;
        }
        .rr-toggle button.active {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
          font-weight: 500;
        }

        .rr-grid {
          padding: 20px 24px 60px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .rr-card {
          background: var(--paper-card);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rr-card-photo {
          margin: -18px -18px 4px;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 4px 4px 0 0;
          background: var(--line);
          position: relative;
        }
        .rr-card-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rr-card-photo-extra {
          position: absolute;
          bottom: 6px;
          right: 6px;
          display: flex;
          gap: 4px;
        }
        .rr-card-photo-extra img {
          width: 34px;
          height: 34px;
          border-radius: 3px;
          border: 1.5px solid var(--paper-card);
          object-fit: cover;
        }
        .rr-video-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: var(--stamp);
          text-decoration: none;
          margin-top: -4px;
          width: fit-content;
        }
        .rr-video-link:hover { color: var(--stamp-soft); text-decoration: underline; }
        .rr-stamp {
          position: absolute;
          top: -10px;
          left: 14px;
          transform: rotate(-4deg);
          background: var(--stamp);
          color: var(--paper-card);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          border: 1px solid rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .rr-stamp.busco { background: var(--green); }
        .rr-card-head { margin-top: 8px; }
        .rr-card-title {
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          font-size: 19px;
          line-height: 1.2;
          margin: 0 0 4px;
        }
        .rr-card-zona {
          font-size: 12px;
          color: var(--ink-soft);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .rr-card-desc {
          font-size: 14px;
          color: var(--ink);
          line-height: 1.5;
          flex: 1;
        }
        .rr-rating-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: -4px;
        }
        .rr-rating-stat {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          padding: 0;
          font-family: 'Public Sans', sans-serif;
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: text-decoration-color 0.15s ease;
        }
        .rr-rating-stat:hover { text-decoration-color: var(--ink); }
        .rr-rating-empty {
          font-weight: 400;
          color: var(--ink-soft);
          font-style: italic;
          cursor: default;
          text-decoration: none !important;
        }
        .rr-rate-link {
          background: transparent;
          border: none;
          color: var(--stamp);
          font-size: 12px;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
        }
        .rr-rate-link:hover { color: var(--stamp-soft); }

        .rr-star-picker {
          display: flex;
          gap: 4px;
        }
        .rr-star-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px;
          line-height: 0;
        }

        .rr-card-foot {
          border-top: 1px dashed var(--line);
          padding-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .rr-price {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--stamp);
          font-weight: 500;
        }
        .rr-date {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--ink-soft);
        }
        .rr-contact {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--ink-soft);
          margin-top: -4px;
        }
        .rr-contact-actions {
          display: flex;
          gap: 8px;
        }
        .rr-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex: 1;
          background: transparent;
          border: 1px solid var(--green);
          color: var(--green);
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 10px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
        }
        .rr-contact-btn:hover { background: var(--green); color: var(--paper-card); }
        .rr-call-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex: 1;
          background: transparent;
          border: 1px solid var(--stamp);
          color: var(--stamp);
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 10px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
        }
        .rr-call-btn:hover { background: var(--stamp); color: var(--paper-card); }

        .rr-delete-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          color: var(--ink-soft);
          font-family: 'Public Sans', sans-serif;
          font-size: 11.5px;
          cursor: pointer;
          padding: 2px 0;
          align-self: flex-start;
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: color 0.15s ease, text-decoration-color 0.15s ease;
        }
        .rr-delete-link:hover { color: var(--stamp); text-decoration-color: var(--stamp); }
        .rr-delete-confirm {
          border: 1px dashed var(--stamp);
          border-radius: 3px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rr-delete-confirm span {
          font-size: 12px;
          color: var(--ink);
          font-weight: 600;
        }
        .rr-delete-confirm-actions { display: flex; gap: 8px; }
        .rr-delete-yes, .rr-delete-no {
          font-family: 'Public Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .rr-delete-yes {
          background: var(--stamp);
          border: 1px solid var(--stamp);
          color: var(--paper-card);
        }
        .rr-delete-no {
          background: transparent;
          border: 1px solid var(--line);
          color: var(--ink-soft);
        }

        .rr-empty {
          padding: 60px 24px;
          text-align: center;
          color: var(--ink-soft);
        }
        .rr-empty-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 22px;
          color: var(--ink);
          margin-bottom: 6px;
        }

        .rr-overlay {
          position: fixed;
          inset: 0;
          background: rgba(31, 46, 22, 0.45);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 16px;
          overflow-y: auto;
          z-index: 50;
        }
        .rr-modal {
          background: var(--paper-card);
          border-radius: 6px;
          max-width: 480px;
          width: 100%;
          padding: 24px;
          position: relative;
          border: 1px solid var(--line);
        }
        .rr-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--ink-soft);
          padding: 4px;
        }
        .rr-modal-close:hover { color: var(--ink); }
        .rr-modal h2 {
          font-family: 'Libre Baskerville', serif;
          font-size: 24px;
          margin: 0 0 4px;
        }
        .rr-modal p.rr-modal-sub {
          color: var(--ink-soft);
          font-size: 13px;
          margin: 0 0 20px;
        }
        .rr-field { margin-bottom: 14px; }
        .rr-field label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-soft);
          margin-bottom: 6px;
        }
        .rr-field input, .rr-field select, .rr-field textarea {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--paper);
          border-radius: 3px;
          padding: 10px 12px;
          font-family: 'Public Sans', sans-serif;
          font-size: 14px;
          color: var(--ink);
        }
        .rr-field textarea { resize: vertical; min-height: 70px; }
        .rr-field-hint {
          display: block;
          margin-top: 5px;
          font-size: 11px;
          color: var(--ink-soft);
        }
        .rr-field-error { color: var(--stamp); }
        .rr-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .rr-photo-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px dashed var(--line);
          border-radius: 3px;
          cursor: pointer;
          color: var(--ink-soft);
          font-size: 11px;
          text-align: center;
          background: var(--paper);
          position: relative;
        }
        .rr-photo-upload-tile {
          aspect-ratio: 1 / 1;
          padding: 6px;
        }
        .rr-photo-upload:hover { border-color: var(--stamp); color: var(--ink); }
        .rr-photo-upload input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
        }
        .rr-photo-preview {
          position: relative;
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid var(--line);
          aspect-ratio: 1 / 1;
        }
        .rr-photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rr-photo-remove {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(31,46,22,0.82);
          color: #F3F1DA;
          border: none;
          border-radius: 3px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .rr-video-upload-row {
          flex-direction: row;
          aspect-ratio: auto;
          padding: 10px 12px;
          gap: 8px;
          font-size: 13px;
        }
        .rr-video-preview {
          position: relative;
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .rr-video-preview video {
          width: 100%;
          max-height: 220px;
          display: block;
          background: #000;
        }
        .rr-video-link-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px;
          font-size: 13px;
          color: var(--ink-soft);
          background: var(--paper);
        }
        .rr-card-video {
          width: 100%;
          max-height: 200px;
          display: block;
          border-radius: 3px;
          margin-top: -4px;
          background: #000;
        }
        .rr-field input:focus, .rr-field select:focus, .rr-field textarea:focus {
          outline: 2px solid var(--gold);
          outline-offset: 1px;
        }
        .rr-radio-row { display: flex; gap: 8px; }
        .rr-radio-row label {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 9px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          text-transform: none;
          color: var(--ink-soft);
        }
        .rr-radio-row input { width: auto; margin: 0; }
        .rr-radio-row label.checked {
          border-color: var(--stamp);
          color: var(--stamp);
          background: rgba(140, 58, 30, 0.08);
        }
        .rr-submit {
          width: 100%;
          background: var(--green);
          color: var(--paper-card);
          border: none;
          padding: 13px;
          border-radius: 3px;
          font-family: 'Public Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          margin-top: 4px;
        }
        .rr-submit:hover { background: var(--green-soft); }
        .rr-submit:disabled { opacity: 0.6; cursor: default; }

        .rr-mapa-leaflet-wrap {
          padding: 28px 24px 8px;
        }
        .rr-mapa-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 14px;
          color: var(--ink);
        }
        .rr-mapa-leaflet {
          width: 100%;
          height: 340px;
          border-radius: 6px;
          border: 1px solid var(--line);
          z-index: 0;
        }
        .rr-mapa-popup strong {
          display: block;
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          margin-bottom: 2px;
          color: var(--ink);
        }
        .rr-mapa-popup span {
          display: block;
          font-size: 11px;
          color: var(--ink-soft);
          margin-bottom: 6px;
        }
        .rr-mapa-popup ul {
          margin: 0;
          padding: 0 0 0 14px;
          font-size: 12px;
          color: var(--ink);
        }
        .rr-mapa-popup ul li { margin-bottom: 2px; }
        .rr-mapa-popup ul a { color: var(--stamp); text-decoration: none; }
        .rr-mapa-popup ul a:hover { text-decoration: underline; }

        .rr-controls-right {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .rr-push-btn { border-color: var(--green) !important; color: var(--green) !important; }
        .rr-push-active {
          font-family: 'Public Sans', sans-serif;
          font-size: 12px;
          color: var(--green);
        }
        .rr-guardado-active { color: var(--stamp) !important; }

        .rr-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .rr-acerca-link {
          background: transparent;
          border: none;
          color: rgba(243,241,218,0.8);
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: transparent;
          padding: 0;
        }
        .rr-acerca-link:hover { text-decoration-color: currentColor; }

        .rr-acerca {
          padding: 28px 24px 16px;
          max-width: 680px;
          margin: 0 auto;
        }
        .rr-acerca-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--ink);
        }
        .rr-acerca p {
          font-family: 'Public Sans', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0 0 12px;
        }

        .rr-banner-ad {
          position: relative;
          margin: 0 24px 24px;
          border: 1px solid var(--gold);
          border-radius: 5px;
          background: linear-gradient(135deg, #fdfbf0 0%, #f7f4d8 100%);
          padding: 16px 18px;
        }
        .rr-banner-label {
          position: absolute;
          top: -9px;
          left: 14px;
          background: var(--gold);
          color: var(--ink);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 2px;
        }
        .rr-banner-content strong {
          display: block;
          font-family: 'Public Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .rr-banner-content p {
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          color: var(--ink-soft);
          margin: 0 0 12px;
          line-height: 1.5;
        }
        .rr-banner-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .rr-banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'Public Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 3px;
          border: 1px solid var(--gold);
          color: var(--ink);
          background: transparent;
          text-decoration: none;
          cursor: pointer;
        }
        .rr-banner-btn:hover { background: var(--gold); }
        .rr-banner-btn-wa { border-color: var(--green); color: var(--green); }
        .rr-banner-btn-wa:hover { background: var(--green); color: var(--paper-card); }

        .rr-region {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 36px;
          flex-wrap: wrap;
          padding: 28px 24px 8px;
          color: var(--ink-soft);
        }
        .rr-region-escudo {
          height: 128px;
          width: auto;
        }
        .rr-mapa { color: var(--ink-soft); }

        .rr-footer {
          border-top: 1px dashed var(--line);
          padding: 18px 24px 32px;
          max-width: 640px;
          margin: 0 auto;
        }
        .rr-footer p {
          font-family: 'Public Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.75;
          color: var(--ink-soft);
          text-align: center;
          margin: 0;
        }

        .rr-toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          background: var(--stamp);
          color: var(--paper-card);
          padding: 12px 22px;
          border-radius: 4px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 60;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .rr-como {
          padding: 8px 24px 20px;
          text-align: center;
        }
        .rr-como-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 6px;
          color: var(--ink);
        }
        .rr-como-sub {
          font-family: 'Public Sans', sans-serif;
          font-size: 13.5px;
          color: var(--ink-soft);
          margin: 0 0 22px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .rr-como-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 18px;
          max-width: 900px;
          margin: 0 auto;
        }
        .rr-como-step {
          background: var(--paper-card);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 20px 16px;
          text-align: left;
          position: relative;
        }
        .rr-como-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--stamp);
          color: var(--paper-card);
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 10px;
        }
        .rr-como-step h3 {
          font-family: 'Public Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 6px;
          color: var(--ink);
        }
        .rr-como-step p {
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: var(--ink-soft);
          margin: 0;
        }

        .rr-actividad {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          font-family: 'Public Sans', sans-serif;
          font-size: 12.5px;
          color: var(--ink-soft);
          border-top: 1px dashed var(--line);
          border-bottom: 1px dashed var(--line);
          margin-bottom: 4px;
        }
        .rr-actividad strong { color: var(--ink); }
        .rr-actividad-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4CAF50;
          flex-shrink: 0;
          animation: rr-pulse 2s ease-in-out infinite;
        }
        @keyframes rr-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .rr-warn {
          margin: 0 24px 0;
          background: #F3E7D8;
          border: 1px solid var(--gold);
          border-radius: 3px;
          padding: 10px 14px;
          font-size: 12px;
          color: var(--ink-soft);
        }

        .rr-reviews-summary {
          display: flex;
          align-items: baseline;
          gap: 10px;
          border-bottom: 1px dashed var(--line);
          padding-bottom: 14px;
          margin-bottom: 14px;
        }
        .rr-reviews-avg {
          font-family: 'Libre Baskerville', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--ink);
        }
        .rr-reviews-count {
          font-size: 12px;
          color: var(--ink-soft);
        }
        .rr-review-item {
          border-bottom: 1px solid var(--line);
          padding: 12px 0;
        }
        .rr-review-item:last-child { border-bottom: none; padding-bottom: 0; }
        .rr-review-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .rr-review-name {
          font-weight: 600;
          font-size: 13px;
          color: var(--ink);
        }
        .rr-review-date {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--ink-soft);
        }
        .rr-review-stars { display: flex; gap: 1px; margin-bottom: 5px; }
        .rr-review-comment {
          font-size: 13px;
          color: var(--ink);
          line-height: 1.5;
        }
        .rr-review-empty {
          text-align: center;
          color: var(--ink-soft);
          font-size: 13px;
          padding: 12px 0;
        }

        @media (max-width: 560px) {
          .rr-title { font-size: 30px; }
          .rr-hero { padding: 24px 16px 0; }
          .rr-hero-top { align-items: center; }
          .rr-eyebrow { max-width: 55%; padding-top: 0; font-size: 9.5px; }
          .rr-seal { width: 44px; height: 44px; }
          .rr-controls, .rr-tabs, .rr-toggle, .rr-grid { padding-left: 16px; padding-right: 16px; }
        }
      `}</style>

      <header className="rr-hero">
        <div className="rr-hero-photo">
          <div className="rr-hero-top">
            <div className="rr-eyebrow"><IconLogoCampo size={19} /> Registro rural · Departamento de San José</div>
            <BrandSeal size={58} />
          </div>
          <h1 className="rr-title">Se ofrece, se busca,<br/><span>se consigue.</span></h1>
          <p className="rr-sub">
            Servicios, maquinaria, insumos y ganado — un solo lugar para pequeños
            productores, empresas del agro y trabajadores autónomos del departamento.
            Nada de lo que no sea del campo.
          </p>
          <div className="rr-cta-row">
            <button className="rr-cta" onClick={() => { setPhotoError(""); setVideoError(""); setPublishError(""); setEditingId(null); setForm(emptyForm); setShowForm(true); }}>
              <Plus size={16} /> Publicar un aviso
            </button>
            <button className="rr-acerca-link" onClick={() => setActiveView((v) => v === "acerca" ? "avisos" : "acerca")}>
              {activeView === "acerca" ? "← Volver a los avisos" : "¿Qué es esto?"}
            </button>
          </div>
        </div>
        <svg className="rr-fenceline" viewBox="0 0 800 34" preserveAspectRatio="none">
          <line x1="0" y1="24" x2="800" y2="24" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="10" x2="800" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={i} x1={20 + i * 48} y1="2" x2={20 + i * 48} y2="30" stroke="currentColor" strokeWidth="2" />
          ))}
        </svg>
        <div className="rr-campo-wrap">
          <CampoBanner />
          <span className="rr-campo-caption">Lechería, ovinos y papa — lo que caracteriza al campo maragato</span>
        </div>
      </header>

      <section className="rr-como">
        <h2 className="rr-como-title">¿Cómo funciona?</h2>
        <p className="rr-como-sub">Es simple: mirá lo que hay, contactá directo, o publicá lo tuyo. No hace falta registrarse.</p>
        <div className="rr-como-grid">
          <div className="rr-como-step">
            <span className="rr-como-num">1</span>
            <h3>Mirá los avisos</h3>
            <p>Recorré las categorías (Servicios, Maquinaria, Insumos, Ganado, Campos) o buscá directamente lo que necesitás con el buscador de arriba.</p>
          </div>
          <div className="rr-como-step">
            <span className="rr-como-num">2</span>
            <h3>Contactá directo</h3>
            <p>Cada aviso tiene un botón para escribir por WhatsApp o llamar por teléfono a la persona que lo publicó. Hablás directo con ella, sin intermediarios.</p>
          </div>
          <div className="rr-como-step">
            <span className="rr-como-num">3</span>
            <h3>Publicá lo tuyo</h3>
            <p>¿Tenés algo para ofrecer o necesitás algo? Tocá "Publicar un aviso", completá el formulario con tus datos y listo — queda visible para todos, gratis.</p>
          </div>
        </div>
      </section>

      {!loading && listings.length > 0 && (() => {
        const ultimo = listings.reduce((a, b) => new Date(a.fecha) > new Date(b.fecha) ? a : b);
        return (
          <div className="rr-actividad">
            <span className="rr-actividad-dot" />
            Último aviso publicado <strong>{timeAgo(ultimo.fecha)}</strong> — "{ultimo.titulo}"
          </div>
        );
      })()}

      {!storageOk && (
        <div className="rr-warn">
          No se pudo conectar con el servidor en este momento — los avisos que veas o publiques ahora
          pueden no estar actualizados o no guardarse para los demás. Probá recargar la página en un rato.
        </div>
      )}

      <div className="rr-controls">
        <div className="rr-search">
          <Search size={15} color="var(--ink-soft)" />
          <input
            placeholder="Buscar por título, zona o descripción..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="rr-controls-right">
          <button
            className={`rr-mine-btn ${onlyMine ? "active" : ""}`}
            onClick={() => { setOnlyMine((v) => !v); setOnlyGuardados(false); }}
          >
            Mis avisos {misAvisos.length > 0 && `(${misAvisos.length})`}
          </button>
          <button
            className={`rr-mine-btn ${onlyGuardados ? "active" : ""}`}
            onClick={() => { setOnlyGuardados((v) => !v); setOnlyMine(false); }}
          >
            ♥ Guardados {guardados.length > 0 && `(${guardados.length})`}
          </button>
          {"Notification" in window && !pushGranted && (
            <button className="rr-mine-btn rr-push-btn" onClick={pedirPermisoNotificaciones}>
              🔔 Avisos nuevos
            </button>
          )}
          {pushGranted && (
            <span className="rr-push-active">🔔 Notificaciones activas</span>
          )}
        </div>
      </div>

      <div className="rr-tabs">
        <button className={`rr-tab ${filterCat === "todos" ? "active" : ""}`} onClick={() => setFilterCat("todos")}>
          Todos
        </button>
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              className={`rr-tab ${filterCat === c.id ? "active" : ""}`}
              onClick={() => setFilterCat(c.id)}
            >
              <Icon size={14} /> {c.label}
            </button>
          );
        })}
      </div>

      <div className="rr-toggle">
        <button className={filterTipo === "todos" ? "active" : ""} onClick={() => setFilterTipo("todos")}>TODOS</button>
        <button className={filterTipo === "ofrezco" ? "active" : ""} onClick={() => setFilterTipo("ofrezco")}>OFREZCO</button>
        <button className={filterTipo === "busco" ? "active" : ""} onClick={() => setFilterTipo("busco")}>BUSCO</button>
      </div>

      <div className="rr-filters-row">
        <select className="rr-select-inline" value={filterZona} onChange={(e) => setFilterZona(e.target.value)}>
          <option value="todas">Todas las zonas</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <select className="rr-select-inline" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recientes">Más recientes</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
        </select>
      </div>

      {loading ? (
        <div className="rr-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="rr-skeleton" key={i}>
              <div className="rr-skeleton-photo" />
              <div className="rr-skeleton-line" style={{ width: "70%" }} />
              <div className="rr-skeleton-line" style={{ width: "45%" }} />
              <div className="rr-skeleton-line" style={{ width: "90%" }} />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rr-empty">
          {onlyMine ? (
            <>
              <div className="rr-empty-title">Todavía no publicaste ningún aviso.</div>
              <p>Los avisos que publiques desde este mismo navegador van a aparecer acá.</p>
            </>
          ) : (
            <>
              <div className="rr-empty-title">Todavía no hay avisos acá.</div>
              <p>Sé el primero en publicar en esta categoría.</p>
            </>
          )}
        </div>
      ) : (
        <div className="rr-grid">
          {visibleListings.map((l) => {
            const cat = CATEGORIES.find((c) => c.id === l.categoria);
            const Icon = cat ? cat.icon : IconGanado;
            const waNumber = normalizeContact(l.contacto).replace(/^0/, "");
            const waLink = `https://wa.me/598${waNumber}?text=${encodeURIComponent(
              `Hola ${l.nombre}, te escribo por tu aviso "${l.titulo}" en Registro Rural San José.`
            )}`;
            const stats = ratingStats(l.contacto);
            // Compatibilidad con avisos viejos que tenían una sola "foto" en vez de "fotos".
            const fotos = l.fotos && l.fotos.length ? l.fotos : l.foto ? [l.foto] : [];
            return (
              <div className={`rr-card ${l.estado === "resuelto" ? "rr-card-resuelto" : ""}`} key={l.id} id={`aviso-${l.id}`}>
                {l.estado === "resuelto" && <div className="rr-resuelto-ribbon">Resuelto</div>}
                {fotos.length > 0 && (
                  <div className="rr-card-photo">
                    <img src={fotos[0]} alt={l.titulo} loading="lazy" />
                    {fotos.length > 1 && (
                      <div className="rr-card-photo-extra">
                        {fotos.slice(1, 3).map((f, i) => (
                          <img key={i} src={f} alt={`${l.titulo} foto ${i + 2}`} loading="lazy" />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className={`rr-stamp ${l.tipo === "busco" ? "busco" : ""}`}>
                  <Icon size={11} /> {l.tipo === "busco" ? "Busco" : "Ofrezco"} · {cat ? cat.label : l.categoria}
                </div>
                <div className="rr-card-head">
                  <h3 className="rr-card-title">{l.titulo}</h3>
                  <div className="rr-card-zona"><MapPin size={12} /> {l.zona}</div>
                </div>
                <p className="rr-card-desc">{l.descripcion}</p>
                {l.video && (
                  l.video.startsWith("data:video") ? (
                    <video className="rr-card-video" src={l.video} controls preload="metadata" />
                  ) : (
                    <a className="rr-video-link" href={l.video} target="_blank" rel="noopener noreferrer">
                      <Video size={13} /> Ver video
                    </a>
                  )
                )}
                <div className="rr-contact">
                  <Phone size={13} /> {l.nombre} · {l.contacto}
                </div>
                <div className="rr-rating-row">
                  {stats ? (
                    <button
                      className="rr-rating-stat"
                      onClick={() => setReviewsTarget({ contacto: l.contacto, nombre: l.nombre })}
                    >
                      <Star size={13} fill="var(--gold)" color="var(--gold)" /> {stats.avg.toFixed(1)} ({stats.count})
                    </button>
                  ) : (
                    <span className="rr-rating-stat rr-rating-empty">Sin calificaciones aún</span>
                  )}
                  <button
                    className="rr-rate-link"
                    onClick={() => { setRatingTarget({ contacto: l.contacto, nombre: l.nombre }); setRatingForm(emptyRatingForm); }}
                  >
                    Calificar
                  </button>
                </div>
                <div className="rr-card-foot">
                  <span className="rr-price">{l.precio || "A convenir"}</span>
                  <span className="rr-date">{timeAgo(l.fecha)}</span>
                </div>
                <div className="rr-contact-actions">
                  <a className="rr-contact-btn" href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <a className="rr-call-btn" href={`tel:+598${waNumber}`}>
                    <Phone size={14} /> Llamar
                  </a>
                </div>

                <div className="rr-card-utility-row">
                  <button type="button" className="rr-utility-link" onClick={() => shareListing(l)}>
                    Compartir
                  </button>
                  <button
                    type="button"
                    className={`rr-utility-link ${guardados.includes(l.id) ? "rr-guardado-active" : ""}`}
                    onClick={() => toggleGuardado(l.id)}
                  >
                    {guardados.includes(l.id) ? "♥ Guardado" : "♡ Guardar"}
                  </button>
                  {reportSent[l.id] ? (
                    <span className="rr-utility-link rr-utility-muted">Reportado, gracias</span>
                  ) : reportingId === l.id ? (
                    <div className="rr-report-picker">
                      <button type="button" onClick={() => submitReport(l.id, "spam")}>Spam</button>
                      <button type="button" onClick={() => submitReport(l.id, "falso")}>Contenido falso</button>
                      <button type="button" onClick={() => submitReport(l.id, "precio")}>Precio abusivo</button>
                      <button type="button" onClick={() => submitReport(l.id, "otro")}>Otro</button>
                      <button type="button" className="rr-report-cancel" onClick={() => setReportingId(null)}>Cancelar</button>
                    </div>
                  ) : (
                    <button type="button" className="rr-utility-link" onClick={() => setReportingId(l.id)}>
                      Reportar
                    </button>
                  )}
                </div>

                {misAvisos.includes(l.id) && (
                  <div className="rr-owner-row">
                    <button type="button" className="rr-owner-link" onClick={() => openEditForm(l)}>
                      Editar
                    </button>
                    <button type="button" className="rr-owner-link" onClick={() => toggleResolved(l)}>
                      {l.estado === "resuelto" ? "Reactivar aviso" : "Marcar como resuelto"}
                    </button>
                    {confirmDeleteId === l.id ? (
                      <div className="rr-delete-confirm">
                        <span>¿Borrar este aviso?</span>
                        <div className="rr-delete-confirm-actions">
                          <button type="button" className="rr-delete-yes" onClick={() => deleteListing(l.id)}>
                            Sí, borrar
                          </button>
                          <button type="button" className="rr-delete-no" onClick={() => setConfirmDeleteId(null)}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="rr-delete-link"
                        onClick={() => setConfirmDeleteId(l.id)}
                      >
                        <Trash2 size={12} /> Borrar mi aviso
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length > visibleCount && (
        <div className="rr-mostrar-mas-wrap">
          <button className="rr-mostrar-mas" onClick={() => setVisibleCount((v) => v + 9)}>
            Mostrar más avisos ({filtered.length - visibleCount} más)
          </button>
        </div>
      )}

      {!loading && listings.length > 0 && <MapaAvisos listings={listings} />}

      {activeView === "acerca" && (
        <section className="rr-acerca">
          <h2 className="rr-acerca-title">Sobre Registro Rural San José</h2>
          {ACERCA_DE.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      {BANNER_ACTIVO && (
        <div className="rr-banner-ad">
          <span className="rr-banner-label">{BANNER.etiqueta}</span>
          <div className="rr-banner-content">
            <strong>{BANNER.empresa}</strong>
            <p>{BANNER.eslogan}</p>
            <div className="rr-banner-actions">
              {BANNER.url && (
                <a href={BANNER.url} target="_blank" rel="noopener noreferrer" className="rr-banner-btn">
                  Ver más
                </a>
              )}
              {BANNER.telefono && (
                <a href={`https://wa.me/598${BANNER.telefono.replace(/^0/, "")}`} target="_blank" rel="noopener noreferrer" className="rr-banner-btn rr-banner-btn-wa">
                  <MessageCircle size={14} /> WhatsApp
                </a>
              )}
              {!BANNER.url && !BANNER.telefono && (
                <a href="mailto:registroruralsj@gmail.com" className="rr-banner-btn">
                  Contactar para anunciar
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="rr-region">
        <img className="rr-region-escudo" src={`${import.meta.env.BASE_URL}images/escudo-sanjose.png`} alt="Escudo de San José de Mayo" />
        <MapaUruguay />
      </div>

      <footer className="rr-footer">
        <p>
          Registro Rural San José es un espacio abierto para pequeños productores,
          empresas del agro y trabajadores autónomos del departamento, donde pueden
          ofrecer sus servicios, maquinaria, insumos o ganado, y también encontrar lo
          que necesitan. No participamos en las operaciones que se acuerden entre las
          partes ni nos hacemos responsables por la calidad, el cumplimiento, el pago
          o cualquier otro aspecto de una compra, venta o contratación: solo ofrecemos
          la posibilidad de que oferta y demanda se encuentren. Verificá vos mismo la
          seriedad de la otra parte antes de cerrar cualquier trato.
        </p>
      </footer>

      {showForm && (
        <div className="rr-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); setEditingId(null); } }}>
          <div className="rr-modal">
            <button className="rr-modal-close" onClick={() => { setShowForm(false); setEditingId(null); }} aria-label="Cerrar">
              <X size={20} />
            </button>
            <h2>{editingId ? "Editar aviso" : "Publicar un aviso"}</h2>
            <p className="rr-modal-sub">
              {editingId ? "Los cambios se guardan sobre el mismo aviso." : "Va a quedar visible para todos los que visiten esta página."}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="rr-field">
                <label>¿Ofrecés o buscás?</label>
                <div className="rr-radio-row">
                  <label className={form.tipo === "ofrezco" ? "checked" : ""}>
                    <input type="radio" name="tipo" checked={form.tipo === "ofrezco"} onChange={() => setForm({ ...form, tipo: "ofrezco" })} />
                    Ofrezco
                  </label>
                  <label className={form.tipo === "busco" ? "checked" : ""}>
                    <input type="radio" name="tipo" checked={form.tipo === "busco"} onChange={() => setForm({ ...form, tipo: "busco" })} />
                    Busco
                  </label>
                </div>
              </div>

              <div className="rr-field">
                <label>Categoría</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="rr-field">
                <label>Título del aviso</label>
                <input
                  required
                  placeholder="Ej: Tractor con rastra, alquiler por día"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                />
              </div>

              <div className="rr-field">
                <label>Descripción</label>
                <textarea
                  placeholder="Contá los detalles: condiciones, disponibilidad, experiencia, estado del equipo, etc."
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />
              </div>

              <div className="rr-field">
                <label>Fotos (opcional, hasta {MAX_FOTOS})</label>
                <div className="rr-photo-grid">
                  {form.fotos.map((foto, i) => (
                    <div className="rr-photo-preview" key={i}>
                      <img src={foto} alt={`Foto ${i + 1} del aviso`} />
                      <button
                        type="button"
                        className="rr-photo-remove"
                        onClick={() => removePhoto(i)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  {form.fotos.length < MAX_FOTOS && (
                    <label className="rr-photo-upload rr-photo-upload-tile">
                      <ImagePlus size={18} />
                      <span>{photoBusy ? "Procesando..." : "Agregar foto"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        disabled={photoBusy}
                      />
                    </label>
                  )}
                </div>
                {photoError && <span className="rr-field-hint rr-field-error">{photoError}</span>}
              </div>

              <div className="rr-field">
                <label>Video (opcional)</label>
                {form.video ? (
                  <div className="rr-video-preview">
                    {form.video.startsWith("data:video") ? (
                      <video src={form.video} controls />
                    ) : (
                      <div className="rr-video-link-chip"><Video size={14} /> Link de video cargado</div>
                    )}
                    <button
                      type="button"
                      className="rr-photo-remove"
                      onClick={() => setForm({ ...form, video: "" })}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="rr-photo-upload rr-video-upload-row">
                      <Video size={18} />
                      <span>{videoBusy ? "Procesando video..." : "Subir video desde la galería"}</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        disabled={videoBusy}
                      />
                    </label>
                    <span className="rr-field-hint">
                      Máximo ~4MB (10-15 segundos). Si es más largo, subilo a YouTube, Instagram o Drive y pegá el link acá:
                    </span>
                    <input
                      type="url"
                      placeholder="O pegá un link (YouTube, Instagram, Drive...)"
                      value={form.video}
                      onChange={(e) => setForm({ ...form, video: e.target.value })}
                      style={{ marginTop: "6px" }}
                    />
                  </>
                )}
                {videoError && <span className="rr-field-hint rr-field-error">{videoError}</span>}
              </div>

              <div className="rr-field">
                <label>Zona</label>
                <select value={form.zona} onChange={(e) => setForm({ ...form, zona: e.target.value })}>
                  {ZONAS.map((z) => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>

              <div className="rr-field">
                <label>Precio (opcional)</label>
                <input
                  placeholder="Ej: US$ 20 por hora, o 'a convenir'"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                />
              </div>

              <div className="rr-field">
                <label>Tu nombre</label>
                <input
                  required
                  placeholder="Nombre y apellido"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </div>

              <div className="rr-field">
                <label>WhatsApp / teléfono</label>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="0?9[0-9]{7,8}"
                  title="Ingresá un celular uruguayo válido, por ejemplo 099123456"
                  placeholder="099 123 456"
                  value={form.contacto}
                  onChange={(e) => setForm({ ...form, contacto: e.target.value.replace(/\D/g, "").slice(0, 9) })}
                />
                <span className="rr-field-hint">Solo números, sin +598. Ej: 099123456</span>
              </div>

              {publishError && <div className="rr-publish-error">{publishError}</div>}

              <button className="rr-submit" type="submit" disabled={saving || !isValidPhone(form.contacto)}>
                {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Publicar aviso"}
              </button>
            </form>
          </div>
        </div>
      )}

      {ratingTarget && (
        <div className="rr-overlay" onClick={(e) => { if (e.target === e.currentTarget) setRatingTarget(null); }}>
          <div className="rr-modal">
            <button className="rr-modal-close" onClick={() => setRatingTarget(null)} aria-label="Cerrar">
              <X size={20} />
            </button>
            <h2>Calificar a {ratingTarget.nombre}</h2>
            <p className="rr-modal-sub">Contá cómo te fue comprando, vendiendo o contratando este servicio.</p>
            <form onSubmit={handleRatingSubmit}>
              <div className="rr-field">
                <label>Tu puntaje</label>
                <div className="rr-star-picker">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      className="rr-star-btn"
                      aria-label={`${n} estrellas`}
                      onClick={() => setRatingForm({ ...ratingForm, stars: n })}
                    >
                      <Star
                        size={26}
                        fill={n <= ratingForm.stars ? "var(--gold)" : "none"}
                        color="var(--gold)"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="rr-field">
                <label>Comentario (opcional)</label>
                <textarea
                  placeholder="Ej: cumplió el trato, la maquinaria estaba en buen estado, llegó puntual..."
                  value={ratingForm.comment}
                  onChange={(e) => setRatingForm({ ...ratingForm, comment: e.target.value })}
                />
              </div>

              <div className="rr-field">
                <label>Tu nombre</label>
                <input
                  required
                  placeholder="Nombre y apellido"
                  value={ratingForm.nombre}
                  onChange={(e) => setRatingForm({ ...ratingForm, nombre: e.target.value })}
                />
              </div>

              <button className="rr-submit" type="submit" disabled={ratingSaving || ratingForm.stars < 1}>
                {ratingSaving ? "Guardando..." : "Guardar calificación"}
              </button>
            </form>
          </div>
        </div>
      )}

      {reviewsTarget && (() => {
        const stats = ratingStats(reviewsTarget.contacto);
        const reviews = ratingReviews(reviewsTarget.contacto);
        return (
          <div className="rr-overlay" onClick={(e) => { if (e.target === e.currentTarget) setReviewsTarget(null); }}>
            <div className="rr-modal">
              <button className="rr-modal-close" onClick={() => setReviewsTarget(null)} aria-label="Cerrar">
                <X size={20} />
              </button>
              <h2>Reseñas de {reviewsTarget.nombre}</h2>
              <p className="rr-modal-sub">Lo que dice la gente que ya hizo un trato.</p>

              {stats && (
                <div className="rr-reviews-summary">
                  <span className="rr-reviews-avg">{stats.avg.toFixed(1)}</span>
                  <div>
                    <div className="rr-review-stars">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} size={14} fill={n <= Math.round(stats.avg) ? "var(--gold)" : "none"} color="var(--gold)" />
                      ))}
                    </div>
                    <span className="rr-reviews-count">{stats.count} {stats.count === 1 ? "calificación" : "calificaciones"}</span>
                  </div>
                </div>
              )}

              {reviews.length === 0 ? (
                <div className="rr-review-empty">Todavía no hay reseñas para mostrar.</div>
              ) : (
                <div>
                  {reviews.map((r, i) => (
                    <div className="rr-review-item" key={i}>
                      <div className="rr-review-head">
                        <span className="rr-review-name">{r.nombre}</span>
                        <span className="rr-review-date">{timeAgo(r.fecha)}</span>
                      </div>
                      <div className="rr-review-stars">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} size={13} fill={n <= r.stars ? "var(--gold)" : "none"} color="var(--gold)" />
                        ))}
                      </div>
                      {r.comment && <p className="rr-review-comment">{r.comment}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {justPublished && <div className="rr-toast">✓ Aviso publicado</div>}
      {ratingToast && <div className="rr-toast">✓ Calificación guardada</div>}
      {deleteToast && <div className="rr-toast">✓ Aviso borrado</div>}
      {shareToast && <div className="rr-toast">✓ Link copiado</div>}
      {reportToast && <div className="rr-toast">✓ Gracias, reportamos tu aviso</div>}
    </div>
  );
}