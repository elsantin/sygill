# Documentación de Sygill

Bienvenido a la documentación de Sygill - tu grimorio digital de conocimiento.

## 📚 Índice de Documentación

### Para Usuarios

- **[README.md](../README.md)** - Inicio rápido, características y uso básico
  - Instalación y setup
  - Características principales
  - Guía de uso
  - Deployment

### Para Desarrolladores

- **[agents.md](./agents.md)** - Arquitectura de agentes y sistemas

  - Visión general de agentes
  - Flujos de datos
  - API y extensibilidad
  - Roadmap técnico

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Decisiones técnicas y diseño

  - Principios de diseño
  - Stack tecnológico
  - Performance y optimización
  - Seguridad y escalabilidad

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Guía para contribuciones
  - Estándares de código
  - Proceso de PR
  - Testing guidelines
  - Setup de desarrollo

## 🚀 Quick Links

### Empezar

```bash
git clone https://github.com/tu-usuario/sygill.git
cd sygill
npm install
npm run dev
```

### Crear tu Primer Concepto

1. Abre http://localhost:3000
2. Click "Seed Database" para datos de ejemplo
3. Click "New Entry" para crear tu concepto
4. Edita y guarda

### Estudiar

1. Click "Study Mode"
2. Navega con teclado o botones
3. Revela información
4. Marca como masterizado

## 📖 Lecturas Recomendadas

### Nuevo en el Proyecto?

1. Lee [README.md](../README.md) para entender qué hace Sygill
2. Revisa [agents.md](./agents.md) para ver cómo está construido
3. Consulta [CONTRIBUTING.md](../CONTRIBUTING.md) para empezar a contribuir

### Extendiendo Sygill?

1. [agents.md - Configuración y Extensión](./agents.md#configuración-y-extensión)
2. [ARCHITECTURE.md - Future Changes](./ARCHITECTURE.md#future-architectural-changes)
3. [agents.md - Roadmap](./agents.md#roadmap)

### Debugging?

1. [ARCHITECTURE.md - Monitoring](./ARCHITECTURE.md#monitoring--debugging)
2. [agents.md - Testing](./agents.md#testing)

## 🗺️ Mapa del Código

```
Flujo de Datos Principal:
User Input → Component → Zustand Store → localStorage → UI Update

Búsqueda:
SearchBar → useStore.searchQuery → Fuse.js → Filtered Results

Estudio:
Study Mode → FlashcardMode → Navigation → Mastery Toggle → Store Update
```

## 🔧 Casos de Uso Comunes

### Agregar un Nuevo Campo a Concept

1. Actualiza `types/index.ts`
2. Actualiza `ConceptDetail.tsx`
3. Actualiza `seed-data.ts`
4. Actualiza documentación

Ver: [agents.md - Agregar Nuevo Campo](./agents.md#agregar-nuevo-campo-a-concept)

### Integrar AI Real

1. Instala SDK (OpenAI, etc.)
2. Crea API route
3. Actualiza `AIChatInterface.tsx`
4. Implementa streaming

Ver: [agents.md - Integrar AI Real](./agents.md#integrar-ai-real)

### Personalizar Tema

1. Edita variables CSS en `app/globals.css`
2. Modifica fuentes en `app/layout.tsx`
3. Actualiza componentes si necesario

Ver: [agents.md - Personalizar Tema](./agents.md#personalizar-tema)

## 💡 Tips

### Performance

- Usa `React.memo` para componentes costosos
- Implementa virtualización para listas >100 items
- Considera code splitting para bundles grandes

### Testing

- Tests unitarios para lógica de negocio
- Tests de integración para flujos completos
- E2E para user journeys críticos

### Deployment

- **Vercel**: Zero-config, recomendado
- **Netlify**: Excelente para sites estáticos
- **Self-hosted**: Requiere Node.js 18+

## 📞 Soporte

- 🐛 **Bugs**: [GitHub Issues](https://github.com/tu-usuario/sygill/issues)
- 💬 **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/sygill/discussions)
- 📧 **Email**: [tu-email]

## 🔄 Actualizaciones

Esta documentación se actualiza con cada release. Última actualización: **Noviembre 2025**

---

**Versión**: 1.0.0 | **Estado**: Estable | **License**: [Especificar]
