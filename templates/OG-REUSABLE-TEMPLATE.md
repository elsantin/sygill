# 🎨 Plantilla Reutilizable: Open Graph Dinámico con Iconos

## 📋 Descripción

Esta es una guía paso a paso para implementar imágenes Open Graph dinámicas en **cualquier proyecto Next.js**. El sistema genera imágenes automáticamente usando el **icono/logo del proyecto** sin texto adicional en la imagen (el texto va en la descripción).

**Características:**

- ✅ Generación dinámica de imágenes OG (1200x630px)
- ✅ Usa el icono/logo del proyecto
- ✅ Sin texto en la imagen (solo icono + gradiente)
- ✅ Texto dinámico en meta tags (título y descripción)
- ✅ Multi-idioma automático
- ✅ Caché optimizado (1 año)
- ✅ Performance: ~2-3s generación, ~300KB tamaño

---

## 🚀 Implementación Paso a Paso

### Paso 1: Instalar Dependencias

```bash
npm install @vercel/og
```

---

### Paso 2: Preparar el Icono/Logo

**Requisitos:**

- Formato: PNG con transparencia
- Tamaño recomendado: 512x512px o mayor
- Ubicación: `public/icon.png` (o el nombre que prefieras)

```bash
# Verifica que existe
ls public/icon.png
```

---

### Paso 3: Crear API Route para Generar Imágenes

**Archivo:** `app/api/og/route.tsx`

```tsx
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parámetros opcionales
    const title = searchParams.get("title") || "Mi Sitio";
    const locale = searchParams.get("locale") || "en";
    const type = searchParams.get("type") || "default";

    // URL del icono (ajusta según tu proyecto)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const iconUrl = `${baseUrl}/icon.png`;

    // Colores del gradiente (personaliza según tu marca)
    const colors = {
      primary: "#3b82f6", // Azul
      secondary: "#8b5cf6", // Púrpura
      dark: "#0c0a09", // Oscuro
      light: "#fafaf9", // Claro
    };

    // Badge según el tipo (opcional)
    let badge = "";
    if (type === "blog") {
      badge = locale === "es" ? "📝 Blog" : "📝 Blog";
    } else if (type === "resource") {
      badge = locale === "es" ? "📚 Recurso" : "📚 Resource";
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.secondary} 100%)`,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {/* Icono centrado */}
          <img
            src={iconUrl}
            width="200"
            height="200"
            style={{
              objectFit: "contain",
            }}
          />

          {/* Badge opcional (abajo) */}
          {badge && (
            <div
              style={{
                position: "absolute",
                bottom: 40,
                right: 40,
                background: "rgba(0, 0, 0, 0.7)",
                color: colors.light,
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              {badge}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
          "content-type": "image/png",
        },
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
```

---

### Paso 4: Crear Utilidad para Construir URLs

**Archivo:** `lib/metadata-utils.ts`

```typescript
/**
 * Construye la URL de la imagen Open Graph dinámica
 */
export function buildOGImageUrl({
  title,
  locale = "en",
  type = "default",
}: {
  title: string;
  locale?: string;
  type?: "default" | "blog" | "resource";
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const params = new URLSearchParams({
    title: title.substring(0, 100), // Limitar longitud
    locale,
    type,
  });

  return `${baseUrl}/api/og?${params.toString()}`;
}

/**
 * Genera metadata completa para una página
 */
export function generatePageMetadata({
  title,
  description,
  locale = "en",
  path = "",
  type = "default",
}: {
  title: string;
  description: string;
  locale?: string;
  path?: string;
  type?: "default" | "blog" | "resource";
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${baseUrl}${path}`;
  const ogImage = buildOGImageUrl({ title, locale, type });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
```

---

### Paso 5: Integrar en Layout Principal

**Archivo:** `app/[locale]/layout.tsx` (o `app/layout.tsx`)

```typescript
import { generatePageMetadata } from "@/lib/metadata-utils";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || "en";

  // Obtén el título y descripción de tus traducciones
  const title = "Mi Sitio Web"; // O desde i18n
  const description = "Descripción de mi sitio"; // O desde i18n

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/${locale}`,
    type: "default",
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

---

### Paso 6: Integrar en Páginas Dinámicas (Blog, Recursos, etc.)

**Ejemplo:** `app/[locale]/blog/[slug]/page.tsx`

```typescript
import { generatePageMetadata } from "@/lib/metadata-utils";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;

  // Obtén los datos del post
  const post = await getPost(slug);

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    locale,
    path: `/${locale}/blog/${slug}`,
    type: "blog",
  });
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return <article>{/* Tu contenido */}</article>;
}
```

---

## 🎨 Personalización

### Cambiar Colores del Gradiente

Edita `app/api/og/route.tsx`:

```typescript
const colors = {
  primary: "#TU_COLOR_1", // Color principal
  secondary: "#TU_COLOR_2", // Color secundario
  dark: "#0c0a09", // Fondo oscuro
  light: "#fafaf9", // Texto claro
};
```

### Cambiar Tamaño del Icono

```typescript
<img
  src={iconUrl}
  width="250"  // ← Ajusta aquí
  height="250" // ← Y aquí
  ...
/>
```

### Agregar Nombre del Sitio

```typescript
<div
  style={{
    // ... estilos del contenedor
  }}
>
  <img src={iconUrl} ... />

  {/* Nombre del sitio */}
  <div
    style={{
      marginTop: 30,
      fontSize: 48,
      fontWeight: "700",
      color: colors.light,
    }}
  >
    Mi Sitio
  </div>
</div>
```

### Cambiar Posición del Badge

```typescript
<div
  style={{
    position: "absolute",
    bottom: 40, // ← Distancia desde abajo
    right: 40, // ← Distancia desde derecha
    // ... resto de estilos
  }}
>
  {badge}
</div>
```

---

## 🧪 Testing

### 1. Testing Local

```bash
# Inicia el servidor
npm run dev

# Abre en navegador
http://localhost:3000/api/og?title=Test&type=default
http://localhost:3000/api/og?title=Test&type=blog
http://localhost:3000/api/og?title=Test&locale=es
```

### 2. Testing en Producción

**Facebook/WhatsApp/LinkedIn:**

```
https://developers.facebook.com/tools/debug/
```

**Twitter:**

```
https://cards-dev.twitter.com/validator
```

**WhatsApp:**

- Envía tu URL a un chat
- Verifica el preview

---

## 📐 Especificaciones

```
Dimensiones:  1200 x 630 px
Ratio:        1.91:1
Formato:      PNG
Tamaño:       ~300 KB
Caché:        1 año (inmutable)
```

---

## ✅ Checklist de Implementación

- [ ] Instalar `@vercel/og`
- [ ] Preparar icono en `public/icon.png`
- [ ] Crear `app/api/og/route.tsx`
- [ ] Crear `lib/metadata-utils.ts`
- [ ] Integrar en layout principal
- [ ] Integrar en páginas dinámicas (blog, etc.)
- [ ] Personalizar colores del gradiente
- [ ] Testing local
- [ ] Deploy a producción
- [ ] Testing en redes sociales

---

## 🎯 Resultado Final

Cuando compartas tu sitio en redes sociales:

```
┌─────────────────────────────────────┐
│                                     │
│          [TU ICONO]                 │
│                                     │
│                          [Badge]    │
├─────────────────────────────────────┤
│ Título de tu página                 │
│ Descripción dinámica de tu página   │
│ tu-sitio.com                        │
└─────────────────────────────────────┘
```

**Ventajas:**

- ✅ Imagen limpia y profesional (solo icono)
- ✅ Texto dinámico en meta tags (fácil de leer)
- ✅ Cero mantenimiento manual
- ✅ Performance optimizada
- ✅ Funciona en todas las redes sociales

---

## 🔧 Troubleshooting

### La imagen no se genera

1. Verifica que `public/icon.png` existe
2. Revisa los logs del servidor
3. Prueba la URL directamente: `/api/og?title=Test`

### El icono no aparece

1. Verifica la URL del icono en el código
2. Asegúrate que `NEXT_PUBLIC_SITE_URL` esté configurado
3. Verifica que el icono sea PNG con transparencia

### Imagen muy grande

1. Reduce el tamaño del icono
2. Optimiza el PNG con TinyPNG
3. Simplifica el gradiente

---

## 📚 Referencias

- [Vercel OG Image](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- [Open Graph Protocol](https://ogp.me/)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

**Creado:** 2025-11-14
**Versión:** 1.0
**Proyecto base:** Chill Chess Club
