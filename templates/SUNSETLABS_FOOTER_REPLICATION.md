# SunsetLabs Footer - Replication Guide

## 📋 Prompt para Implementar en Otras Aplicaciones

Copia y pega este prompt cuando quieras agregar el footer de SunsetLabs a otra aplicación:

---

**Prompt:**

```
Necesito implementar el footer de branding de SunsetLabs en esta aplicación.

REQUISITOS:
1. Crear el componente SunsetLabsCredit.tsx
2. Agregar los colores de SunsetLabs al Tailwind config
3. Colocar el footer al final de la página principal

COLORES DE SUNSETLABS:
- Orange: #FDAD1F
- Pink: #C682B1
- Magenta: #C2185B
- Blue: #4A90E2
- Dark: #1a0a1f

CARACTERÍSTICAS DEL FOOTER:
- Logo colorido con efectos de glow
- Hover effects suaves (300ms)
- Link a https://sunsetlabs.dev
- Subtítulo: "Web Development from Margarita Island, Venezuela 🏝️"
- Espaciado vertical balanceado (pt-6 pb-6)
- Borde superior sutil
```

---

## 🎨 Código del Componente

### 1. Componente React (SunsetLabsCredit.tsx)

```tsx
export default function SunsetLabsCredit() {
  return (
    <div className="text-center pt-6 pb-6 border-t border-gray-800/50">
      <a
        href="https://sunsetlabs.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="flex items-center justify-center gap-1 mb-2">
          <span
            className="text-sunsetlabs-pink font-mono text-lg group-hover:text-sunsetlabs-magenta transition-all duration-300"
            style={{ textShadow: "0 0 10px rgba(198, 130, 177, 0.3)" }}
          >
            {"{"}
          </span>
          <span
            className="text-sunsetlabs-orange font-bold text-base tracking-wide"
            style={{ textShadow: "0 0 15px rgba(253, 173, 31, 0.4)" }}
          >
            Sunset
          </span>
          <span
            className="text-sunsetlabs-pink font-bold text-base tracking-wide group-hover:text-sunsetlabs-magenta transition-all duration-300"
            style={{ textShadow: "0 0 15px rgba(198, 130, 177, 0.4)" }}
          >
            Labs
          </span>
          <span
            className="text-sunsetlabs-pink font-mono text-lg group-hover:text-sunsetlabs-magenta transition-all duration-300"
            style={{ textShadow: "0 0 10px rgba(198, 130, 177, 0.3)" }}
          >
            {"}"}
          </span>
        </div>
        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
          Web Development from Margarita Island, Venezuela 🏝️
        </p>
      </a>
    </div>
  );
}
```

### 2. Configuración de Tailwind (tailwind.config.js)

Agregar estos colores en la sección `extend.colors`:

```javascript
colors: {
  'sunsetlabs-orange': '#FDAD1F',
  'sunsetlabs-pink': '#C682B1',
  'sunsetlabs-magenta': '#C2185B',
  'sunsetlabs-blue': '#4A90E2',
  'sunsetlabs-dark': '#1a0a1f',
}
```

### 3. Uso en la Aplicación

```tsx
import SunsetLabsCredit from "@/components/SunsetLabsCredit";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Tu contenido principal */}
      <main className="flex-1">{/* ... */}</main>

      {/* Footer de SunsetLabs */}
      <footer>
        <SunsetLabsCredit />
      </footer>
    </div>
  );
}
```

---

## 🎯 Características Visuales

### Efectos de Glow

- **Orange (Sunset)**: `text-shadow: 0 0 15px rgba(253, 173, 31, 0.4)`
- **Pink (Labs)**: `text-shadow: 0 0 15px rgba(198, 130, 177, 0.4)`
- **Brackets**: `text-shadow: 0 0 10px rgba(198, 130, 177, 0.3)`

### Transiciones

- **Duración**: 300ms
- **Timing**: ease (default)
- **Hover**: Pink → Magenta en brackets y "Labs"

### Espaciado

- **Padding vertical**: `pt-6 pb-6` (1.5rem arriba y abajo)
- **Gap entre elementos**: `gap-1` (0.25rem)
- **Margin bottom del logo**: `mb-2` (0.5rem)

---

## 📱 Responsive

El componente es responsive por defecto:

- Texto se ajusta automáticamente
- Centrado en todas las resoluciones
- Funciona en mobile, tablet y desktop

---

## ✅ Checklist de Implementación

- [ ] Crear archivo `components/SunsetLabsCredit.tsx`
- [ ] Agregar colores a `tailwind.config.js`
- [ ] Importar componente en página principal
- [ ] Colocar dentro de un `<footer>` tag
- [ ] Verificar que el link funcione
- [ ] Probar hover effects
- [ ] Verificar en mobile

---

## 🎨 Variaciones Opcionales

### Footer con fondo oscuro

```tsx
<div className="text-center pt-6 pb-6 border-t border-gray-800/50 bg-black/20">
```

### Footer más compacto

```tsx
<div className="text-center pt-4 pb-4 border-t border-gray-800/50">
```

### Footer con más espacio

```tsx
<div className="text-center pt-8 pb-8 border-t border-gray-800/50">
```

---

## 📝 Notas

- El componente no tiene dependencias externas
- Funciona con cualquier framework React (Next.js, Vite, CRA)
- Los colores están optimizados para fondos oscuros
- El emoji 🏝️ es parte de la identidad de SunsetLabs

---

**Creado**: 2025-11-01
**Versión**: 1.0.0
**Aplicación original**: Clarity
