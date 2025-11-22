# 🔮 Sygill - Tu Grimorio Digital de Conocimiento

> _Un grimorio místico para dominar conceptos de programación_

Sygill es una aplicación de gestión de conocimiento diseñada para desarrolladores que desean organizar, estudiar y dominar conceptos de programación de manera efectiva. Combina una estética mística con funcionalidad moderna para crear una experiencia de aprendizaje inmersiva.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Características

### 📚 Gestión de Conceptos

- **CRUD Completo**: Crea, lee, actualiza y elimina conceptos de programación
- **Categorización Dinámica**: Organiza conceptos por categorías (JavaScript, React, CSS, etc.)
- **Código con Sintaxis**: Syntax highlighting para snippets de código
- **Notas Extensas**: Agrega notas detalladas y contexto a cada concepto

### 🔍 Búsqueda Inteligente

- **Fuzzy Search**: Búsqueda tolerante a errores tipográficos usando Fuse.js
- **Multi-campo**: Busca en términos, definiciones, categorías y notas
- **Tiempo Real**: Resultados instantáneos mientras escribes

### 🧠 Modo de Estudio

- **Flashcards Interactivas**: Sistema de flashcards para estudiar conceptos
- **Progreso Visual**: Track de conceptos masterizados vs pendientes
- **Navegación Fluida**: Usa botones o teclado para navegar

### 🎨 Experiencia de Usuario

- **Tema Claro/Oscuro**: Soporte completo para ambos temas
- **Animaciones Suaves**: Transiciones elegantes con Framer Motion
- **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil
- **Estética Mística**: Temática visual única inspirada en grimorios antiguos

### 💾 Persistencia y Datos

- **LocalStorage**: Tus datos se guardan automáticamente en el navegador
- **Import/Export**: Exporta e importa tus conceptos en formato JSON
- **Seed Data**: Base de datos inicial con ~50 conceptos de programación
- **CodePen Export**: Exporta código directamente a CodePen

### 🤖 AI Chat Interface

- **Chat Flotante**: Interfaz conversacional para interactuar con tus conceptos
- **UI Mystical**: Diseño coherente con el tema del grimorio
- **Preparado para AI**: Arquitectura lista para integración con LLMs

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sygill.git
cd sygill

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Primer Uso

1. La aplicación iniciará con la base de datos vacía
2. Haz clic en **"Seed Database"** para cargar ~50 conceptos de ejemplo
3. Explora los conceptos haciendo clic en las tarjetas
4. Usa la barra de búsqueda para filtrar conceptos
5. Crea tu primer concepto con el botón **"New Entry"**

## 📖 Uso

### Crear un Concepto

1. Click en **"New Entry"** en la esquina superior derecha
2. Edita el término, categoría, definición, notas y código
3. Los cambios se guardan automáticamente

### Estudiar con Flashcards

1. Click en **"Study Mode"**
2. Navega entre conceptos con las flechas o teclado
3. Click en "Revelar" para ver la información completa
4. Marca conceptos como "Masterizados" cuando los domines

### Buscar Conceptos

1. Usa la barra de búsqueda en el header
2. Escribe cualquier término - la búsqueda fuzzy encontrará coincidencias
3. Los resultados se filtran en tiempo real

### Export/Import

**Exportar**:

1. Abre Settings (⚙️)
2. Click en "Export Data"
3. Se descarga un archivo JSON con todos tus conceptos

**Importar**:

1. Abre Settings (⚙️)
2. Click en "Import Data"
3. Selecciona un archivo JSON válido
4. Tus conceptos se cargarán

## 🏗️ Arquitectura

### Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Search**: Fuse.js
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: Lucide React

### Estructura del Proyecto

```
sygill/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── AIChatInterface.tsx
│   ├── ConceptCard.tsx
│   ├── ConceptDetail.tsx
│   ├── FlashcardMode.tsx
│   ├── SettingsModal.tsx
│   ├── ThemeToggle.tsx
│   ├── layout/            # Componentes de layout
│   └── ui/                # Componentes UI reutilizables
├── lib/                   # Utilidades y helpers
│   ├── codepen.ts         # Integración CodePen
│   ├── seed-data.ts       # Datos iniciales
│   └── utils.ts           # Funciones utilidad
├── store/                 # Estado global
│   └── useStore.ts        # Zustand store
├── types/                 # Definiciones TypeScript
│   └── index.ts           # Tipos principales
└── public/                # Assets estáticos
```

### Componentes Principales

- **`page.tsx`**: Página principal, grid de conceptos, búsqueda
- **`ConceptCard.tsx`**: Vista de tarjeta individual de concepto
- **`ConceptDetail.tsx`**: Modal detallado con edición
- **`FlashcardMode.tsx`**: Modo de estudio con flashcards
- **`AIChatInterface.tsx`**: Chat flotante para AI
- **`useStore.ts`**: Estado global y persistencia

Para más detalles, consulta [docs/agents.md](docs/agents.md).

## 🎨 Personalización

### Colores y Temas

Los colores se definen en `app/globals.css` usando CSS variables. Modifica las variables para personalizar:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

### Tipografía

Sygill usa dos fuentes:

- **Cinzel Decorative**: Headers (estilo místico)
- **Lora**: Body text (lectura confortable)

Cambia las fuentes en `app/layout.tsx`.

### Seed Data

Personaliza los conceptos iniciales en `lib/seed-data.ts`. Formato:

```typescript
{
  term: "Nombre del Concepto",
  category: "Categoría",
  definition: "Definición breve",
  notes: "Notas extensas...",
  codeSnippet: "// Código de ejemplo"
}
```

## 📚 Documentación Adicional

- **[docs/agents.md](docs/agents.md)**: Documentación detallada de arquitectura y agentes
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Decisiones de diseño y patrones

## 🧪 Testing

```bash
# Ejecutar tests (cuando se implementen)
npm run test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Vercel (Recomendado)

1. Push a GitHub
2. Importa el proyecto en Vercel
3. Deploy automático en cada push

### Build Manual

```bash
# Build de producción
npm run build

# Ejecutar build
npm run start
```

### Plataformas Soportadas

- ✅ Vercel
- ✅ Netlify
- ✅ Cloudflare Pages
- ✅ Railway
- ✅ Cualquier servidor Node.js

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Coding Standards

- TypeScript strict mode
- ESLint para linting
- Prettier para formatting
- Conventional commits
- Tests para nuevas features

## 📝 Roadmap

### v1.1

- [ ] AI Chat funcional (OpenAI/Anthropic)
- [ ] Spaced repetition algorithm
- [ ] Rich text editor para notes
- [ ] Keyboard shortcuts overlay

### v2.0

- [ ] Multi-user con auth
- [ ] Sync entre dispositivos
- [ ] Mobile app (React Native)
- [ ] Analytics y gamification

## 📄 Licencia

[Especificar licencia - MIT, Apache, etc.]

## 🙏 Agradecimientos

- Next.js team por el increíble framework
- Vercel por el hosting
- Todos los contribuidores open-source

---

**Hecho con 🔮 y ☕ por [Tu Nombre]**
