# Contributing to Sygill

¡Gracias por tu interés en contribuir a Sygill! Este documento proporciona pautas para contribuir al proyecto.

## Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo que es mejor para la comunidad
- Muestra empatía hacia otros miembros de la comunidad

## Cómo Contribuir

### Reportar Bugs

Antes de crear un issue, por favor:

1. Verifica que el bug no haya sido reportado antes
2. Verifica que el bug existe en la última versión
3. Incluye pasos claros para reproducirlo

**Template de Bug Report**:

```
**Descripción**: [Descripción breve del bug]

**Pasos para reproducir**:
1. ...
2. ...

**Comportamiento esperado**: [Qué debería pasar]

**Comportamiento actual**: [Qué está pasando]

**Screenshots**: [Si aplica]

**Entorno**:
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.17.0]
```

### Sugerir Features

Para sugerir un nuevo feature:

1. Verifica que no exista ya un issue similar
2. Describe el problema que resuelve
3. Propón una solución
4. Considera alternativas

**Template de Feature Request**:

```
**Problema**: [Qué problema resuelve este feature]

**Solución propuesta**: [Cómo funcionaría]

**Alternativas**: [Otras soluciones consideradas]

**Contexto adicional**: [Screenshots, mockups, etc.]
```

### Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/mi-feature
   ```
3. **Haz tus cambios** siguiendo los estándares de código
4. **Escribe tests** para tu código
5. **Actualiza documentación** si aplica
6. **Commit** con mensajes claros:
   ```bash
   git commit -m "feat: add dark mode toggle"
   ```
7. **Push** a tu fork:
   ```bash
   git push origin feature/mi-feature
   ```
8. **Abre un Pull Request**

## Estándares de Código

### TypeScript

- Usa TypeScript strict mode
- Define tipos explícitos para props y funciones
- Evita `any`, usa `unknown` si es necesario
- Usa interfaces para objetos, types para unions

**Ejemplo**:

```typescript
// ✅ Bien
interface ConceptProps {
  concept: Concept;
  onClick: (id: string) => void;
}

// ❌ Mal
function Component(props: any) {
  // ...
}
```

### React

- Usa functional components
- Usa hooks apropiadamente
- Memoiza cuando sea necesario
- Evita prop drilling excesivo

**Ejemplo**:

```typescript
// ✅ Bien
const ConceptCard = React.memo<ConceptCardProps>(({ concept }) => {
  return <div>{concept.term}</div>;
});

// ❌ Mal
function ConceptCard(props) {
  return <div>{props.concept.term}</div>;
}
```

### Naming Conventions

- **Componentes**: PascalCase (`ConceptCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useStore.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_CONCEPTS`)
- **Types/Interfaces**: PascalCase (`Concept`, `ConceptFormData`)

### File Structure

```
component-name/
├── ComponentName.tsx       # Componente principal
├── ComponentName.test.tsx  # Tests
├── types.ts               # Tipos específicos
└── index.ts               # Exports
```

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nuevo feature
- `fix:` - Bug fix
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan código)
- `refactor:` - Refactoring
- `test:` - Agregar/modificar tests
- `chore:` - Tareas de mantenimiento

**Ejemplos**:

```bash
feat: add flashcard navigation with keyboard
fix: resolve search not working with special chars
docs: update README with new features
refactor: extract search logic to custom hook
```

## Testing

### Unit Tests

Usa Jest + React Testing Library:

```typescript
import { render, screen } from "@testing-library/react";
import { ConceptCard } from "./ConceptCard";

describe("ConceptCard", () => {
  it("renders concept term", () => {
    const concept = { term: "Test" /* ... */ };
    render(<ConceptCard concept={concept} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

## Documentación

### JSDoc

Documenta funciones complejas:

```typescript
/**
 * Searches concepts using fuzzy matching
 * @param concepts - Array of concepts to search
 * @param query - Search query string
 * @param threshold - Fuzzy match threshold (0-1)
 * @returns Filtered and ranked concepts
 */
function searchConcepts(
  concepts: Concept[],
  query: string,
  threshold: number = 0.3
): Concept[] {
  // ...
}
```

### README Updates

Si tu PR agrega features o cambia funcionalidad:

1. Actualiza `README.md`
2. Actualiza `docs/agents.md` si afecta arquitectura
3. Agrega ejemplos de uso
4. Actualiza screenshots si aplica

## Proceso de Review

### Para Reviewers

- Sé constructivo y amable
- Verifica que los tests pasen
- Revisa impacto en performance
- Verifica accesibilidad
- Prueba localmente si es posible

### Para Contributors

- Responde a feedback constructivamente
- Haz cambios solicitados en commits separados
- No fuerces push después de review
- Marca conversaciones como resueltas cuando sea apropiado

## Setup de Desarrollo

```bash
# Clone
git clone https://github.com/tu-usuario/sygill.git
cd sygill

# Install
npm install

# Dev server
npm run dev

# Lint
npm run lint

# Build
npm run build
```

### Herramientas Recomendadas

- **Editor**: VS Code
- **Extensions**:
  - ESLint
  - Prettier
  - TypeScript and JavaScript
  - Tailwind CSS IntelliSense
  - Error Lens

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Notas Adicionales

### Performance

- Evita re-renders innecesarios (usa `React.memo`, `useMemo`, `useCallback`)
- Considera lazy loading para componentes grandes
- Optimiza imágenes y assets
- Monitorea bundle size

### Accessibility

- Usa HTML semántico
- Agrega ARIA labels cuando sea necesario
- Asegura navegación por teclado
- Mantén contraste de colores adecuado
- Testea con screen readers

### Seguridad

- Nunca commitees API keys o secrets
- Sanitiza inputs de usuario
- Usa dependencias actualizadas
- Revisa alertas de seguridad de GitHub

## Preguntas?

Si tienes preguntas:

- Abre un GitHub Discussion
- Pregunta en el issue relacionado
- Contacta a los maintainers

---

¡Gracias por contribuir a Sygill! 🔮
