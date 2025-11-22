import { Concept } from "@/types";

export const SEED_DATA: Omit<
  Concept,
  "id" | "createdAt" | "updatedAt" | "mastered" | "favorite"
>[] = [
  {
    term: "Closure",
    category: "JavaScript",
    definition: "Una función que recuerda el entorno en el que fue creada.",
    notes:
      "Un **closure** es la combinación de una función y el entorno léxico en el que fue declarada. Esto permite a la función acceder a variables de un ámbito exterior incluso después de que ese ámbito haya terminado su ejecución.\\n\\nEs fundamental para patrones como:\\n- Data Privacy (variables privadas)\\n- Currying\\n- Factory Functions",
    codeSnippet: `function makeCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`,
  },
  {
    term: "Event Loop",
    category: "JavaScript",
    definition: "Mecanismo que maneja la ejecución de código asíncrono en JS.",
    notes:
      "El **Event Loop** es el responsable de ejecutar el código, recoger y procesar eventos y ejecutar las tareas en cola. JavaScript tiene un modelo de concurrencia basado en un 'loop de eventos'.\\n\\nComponentes clave:\\n- Call Stack\\n- Web APIs\\n- Callback Queue\\n- Microtask Queue (Promesas)",
    codeSnippet: `console.log('Start');\n\nsetTimeout(() => {\n  console.log('Timeout');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('Promise');\n});\n\nconsole.log('End');\n\n// Output:\n// Start\n// End\n// Promise\n// Timeout`,
  },
  {
    term: "React Hooks",
    category: "React",
    definition:
      "Funciones que permiten usar estado y ciclo de vida en componentes funcionales.",
    notes:
      "Los **Hooks** son una nueva incorporación en React 16.8. Te permiten usar el estado y otras características de React sin escribir una clase.\\n\\nReglas:\\n1. Solo llamar Hooks en el nivel superior.\\n2. Solo llamar Hooks desde componentes funcionales de React.",
    codeSnippet: `import React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = \`You clicked \${count} times\`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}`,
  },
  {
    term: "Zustand",
    category: "State Management",
    definition:
      "Una solución de gestión de estado pequeña, rápida y escalable.",
    notes:
      "**Zustand** utiliza hooks para acceder al estado. Es menos boilerplate que Redux y no requiere envolver tu aplicación en proveedores de contexto.\\n\\nCaracterísticas:\\n- API simple basada en hooks\\n- Sin boilerplate\\n- Renderizado selectivo",
    codeSnippet: `import create from 'zustand';\n\nconst useStore = create((set) => ({\n  bears: 0,\n  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),\n  removeAllBears: () => set({ bears: 0 }),\n}));\n\nfunction BearCounter() {\n  const bears = useStore((state) => state.bears);\n  return <h1>{bears} around here ...</h1>;\n}`,
  },
  {
    term: "Tailwind CSS",
    category: "CSS",
    definition:
      "Un framework CSS 'utility-first' para construir diseños personalizados rápidamente.",
    notes:
      "**Tailwind CSS** es altamente personalizable y de bajo nivel. Te da todos los bloques de construcción que necesitas para construir diseños a medida sin estilos opinados molestos que tienes que luchar para anular.",
    codeSnippet: `<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">\n  <div class="shrink-0">\n    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">\n  </div>\n  <div>\n    <div class="text-xl font-medium text-black">ChitChat</div>\n    <p class="text-slate-500">You have a new message!</p>\n  </div>\n</div>`,
  },
  {
    term: "Next.js",
    category: "Framework",
    definition: "El framework de React para la web.",
    notes:
      "**Next.js** te permite crear aplicaciones web de alta calidad con el poder de los componentes de React.\\n\\nCaracterísticas principales:\\n- Renderizado del lado del servidor (SSR)\\n- Generación de sitios estáticos (SSG)\\n- Rutas API\\n- Sistema de enrutamiento basado en archivos",
    codeSnippet: `// app/page.tsx\nexport default function Page() {\n  return <h1>Hello, Next.js!</h1>;\n}`,
  },
  {
    term: "TypeScript",
    category: "Language",
    definition:
      "Un superconjunto tipado de JavaScript que se compila a JavaScript plano.",
    notes:
      "**TypeScript** agrega tipos estáticos opcionales a JavaScript. Esto ayuda a detectar errores temprano en el desarrollo y mejora la experiencia del desarrollador con autocompletado y refactorización más segura.",
    codeSnippet: `interface User {\n  name: string;\n  id: number;\n}\n\nconst user: User = {\n  name: "Hayes",\n  id: 0,\n};\n\nfunction deleteUser(user: User) {\n  // ...\n}`,
  },
  {
    term: "Promise",
    category: "JavaScript",
    definition:
      "Un objeto que representa la terminación o el fracaso eventual de una operación asíncrona.",
    notes:
      "Una **Promise** es un proxy de un valor no necesariamente conocido cuando se crea la promesa. Permite asociar manejadores con el valor eventual de éxito o la razón de fracaso de una acción asíncrona.",
    codeSnippet: `const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Success!");\n  }, 300);\n});\n\nmyPromise.then((value) => {\n  console.log(value);\n});`,
  },
  {
    term: "Async/Await",
    category: "JavaScript",
    definition: "Sintaxis para trabajar con Promesas de una manera más cómoda.",
    notes:
      "**Async/Await** es azúcar sintáctico sobre las Promesas, haciendo que el código asíncrono se vea y se comporte un poco más como código síncrono.",
    codeSnippet: `async function fetchUser() {\n  try {\n    const response = await fetch('/api/user');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}`,
  },
  {
    term: "Virtual DOM",
    category: "React",
    definition: "Una representación ligera en memoria del DOM real.",
    notes:
      "El **Virtual DOM** (VDOM) es un concepto de programación donde una representación ideal o 'virtual' de la UI se mantiene en memoria y se sincroniza con el DOM 'real' por una biblioteca como ReactDOM. Este proceso se llama reconciliación.",
    codeSnippet: `// React actualiza el DOM real solo donde es necesario\nconst element = <h1>Hello, world</h1>;\nReactDOM.render(element, document.getElementById('root'));`,
  },
  {
    term: "JSX",
    category: "React",
    definition:
      "Una extensión de sintaxis para JavaScript que permite escribir HTML dentro de JS.",
    notes:
      "**JSX** produce 'elementos' de React. No es ni una cadena ni HTML. React no requiere usar JSX, pero la mayoría de la gente lo encuentra útil como ayuda visual cuando trabaja con UI dentro del código JavaScript.",
    codeSnippet: `const name = 'Josh Perez';\nconst element = <h1>Hello, {name}</h1>;`,
  },
  {
    term: "Component Lifecycle",
    category: "React",
    definition:
      "Las fases por las que pasa un componente: Montaje, Actualización y Desmontaje.",
    notes:
      "En los componentes de clase, métodos como `componentDidMount`, `componentDidUpdate` y `componentWillUnmount` manejan esto. En componentes funcionales, `useEffect` cubre la mayoría de estos casos de uso.",
    codeSnippet: `useEffect(() => {\n  // componentDidMount & componentDidUpdate\n  console.log('Component updated');\n\n  return () => {\n    // componentWillUnmount\n    console.log('Component unmounted');\n  };\n});`,
  },
  {
    term: "Props",
    category: "React",
    definition: "Argumentos pasados a componentes de React.",
    notes:
      "**Props** son abreviatura de propiedades. Son de solo lectura (inmutables). Un componente nunca debe modificar sus propias props.",
    codeSnippet: `function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}`,
  },
  {
    term: "State",
    category: "React",
    definition:
      "Un objeto que determina cómo se renderiza y se comporta un componente.",
    notes:
      "El **State** es similar a las props, pero es privado y está completamente controlado por el componente. Cuando el estado cambia, el componente se vuelve a renderizar.",
    codeSnippet: `const [count, setCount] = useState(0);`,
  },
  {
    term: "Context API",
    category: "React",
    definition:
      "Forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente.",
    notes:
      "**Context** está diseñado para compartir datos que pueden considerarse 'globales' para un árbol de componentes de React, como el usuario autenticado actual, el tema o el idioma preferido.",
    codeSnippet: `const ThemeContext = React.createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}`,
  },
  {
    term: "Higher-Order Component",
    category: "React",
    definition:
      "Una función que toma un componente y devuelve un nuevo componente.",
    notes:
      "Un **HOC** es una técnica avanzada en React para reutilizar la lógica de componentes. No son parte de la API de React, per se. Son un patrón que surge de la naturaleza compositiva de React.",
    codeSnippet: `function withSubscription(WrappedComponent, selectData) {\n  return class extends React.Component {\n    // ...\n    render() {\n      return <WrappedComponent data={this.state.data} {...this.props} />;\n    }\n  };\n}`,
  },
  {
    term: "Render Props",
    category: "React",
    definition:
      "Una técnica para compartir código entre componentes usando una prop cuyo valor es una función.",
    notes:
      "Un componente con una **render prop** toma una función que devuelve un elemento de React y la llama en lugar de implementar su propia lógica de renderizado.",
    codeSnippet: `<DataProvider render={data => (\n  <h1>Hello {data.target}</h1>\n)}/>`,
  },
  {
    term: "Memoization",
    category: "Optimization",
    definition:
      "Técnica de optimización que almacena los resultados de llamadas a funciones costosas.",
    notes:
      "En React, `React.memo`, `useMemo` y `useCallback` se utilizan para la **memoización**. Ayudan a evitar cálculos innecesarios o re-renderizados.",
    codeSnippet: `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`,
  },
  {
    term: "Server-Side Rendering",
    category: "Next.js",
    definition:
      "Generar el HTML completo de una página en el servidor en cada solicitud.",
    notes:
      "**SSR** mejora el SEO y el rendimiento de la primera pintura. En Next.js, esto solía hacerse con `getServerSideProps`, pero ahora es el comportamiento predeterminado en App Router.",
    codeSnippet: `// En Pages Router\nexport async function getServerSideProps(context) {\n  return {\n    props: {}, // will be passed to the page component as props\n  }\n}`,
  },
  {
    term: "Static Site Generation",
    category: "Next.js",
    definition: "Generar el HTML en el momento de la compilación.",
    notes:
      "**SSG** permite que las páginas se almacenen en caché por un CDN. Es ideal para blogs, documentación y sitios de marketing.",
    codeSnippet: `// En Pages Router\nexport async function getStaticProps(context) {\n  return {\n    props: {}, \n  }\n}`,
  },
  {
    term: "Incremental Static Regeneration",
    category: "Next.js",
    definition:
      "Permite crear o actualizar páginas estáticas después de haber construido el sitio.",
    notes:
      "**ISR** te permite usar generación estática a nivel de página, sin tener que reconstruir todo el sitio. Puedes retener los beneficios de lo estático mientras escalas a millones de páginas.",
    codeSnippet: `export async function getStaticProps() {\n  return {\n    props: {\n      posts,\n    },\n    revalidate: 10, // In seconds\n  };\n}`,
  },
  {
    term: "Middleware",
    category: "Next.js",
    definition: "Código que se ejecuta antes de que se complete una solicitud.",
    notes:
      "El **Middleware** te permite ejecutar código antes de que una solicitud se complete. Luego, según la solicitud entrante, puedes modificar la respuesta reescribiendo, redirigiendo, modificando los encabezados de solicitud o respuesta, o respondiendo directamente.",
    codeSnippet: `import { NextResponse } from 'next/server'\nimport type { NextRequest } from 'next/server'\n\nexport function middleware(request: NextRequest) {\n  return NextResponse.redirect(new URL('/home', request.url))\n}`,
  },
  {
    term: "API Routes",
    category: "Next.js",
    definition:
      "Permite crear una API RESTful dentro de una aplicación Next.js.",
    notes:
      "Cualquier archivo dentro de la carpeta `pages/api` se asigna a `/api/*` y se tratará como un punto final de API en lugar de una página.",
    codeSnippet: `export default function handler(req, res) {\n  res.status(200).json({ name: 'John Doe' })\n}`,
  },
  {
    term: "Flexbox",
    category: "CSS",
    definition:
      "Modelo de diseño unidimensional para distribuir espacio entre elementos.",
    notes:
      "**Flexbox** facilita el diseño de estructuras de diseño flexibles y receptivas sin usar flotadores o posicionamiento.",
    codeSnippet: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
  },
  {
    term: "Grid Layout",
    category: "CSS",
    definition: "Sistema de diseño bidimensional para la web.",
    notes:
      "**CSS Grid** te permite diseñar diseños web complejos fácilmente. A diferencia de Flexbox, que es unidimensional, Grid maneja tanto columnas como filas.",
    codeSnippet: `.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}`,
  },
  {
    term: "Box Model",
    category: "CSS",
    definition:
      "Concepto fundamental que describe cómo se renderizan los elementos.",
    notes:
      "El **Box Model** consta de márgenes, bordes, relleno y el contenido real. Entender esto es crucial para el diseño y la alineación.",
    codeSnippet: `* {\n  box-sizing: border-box;\n}`,
  },
  {
    term: "Selectors",
    category: "CSS",
    definition:
      "Patrones utilizados para seleccionar el elemento(s) que deseas estilizar.",
    notes:
      "Los selectores pueden ser simples (nombre de etiqueta, id, clase) o complejos (descendiente, hijo, hermano adyacente, pseudo-clases).",
    codeSnippet: `div > p.highlight {\n  color: yellow;\n}`,
  },
  {
    term: "Media Queries",
    category: "CSS",
    definition:
      "Técnica para aplicar estilos CSS basados en condiciones como el ancho de la pantalla.",
    notes:
      "Las **Media Queries** son la piedra angular del diseño web responsivo (RWD).",
    codeSnippet: `@media (max-width: 600px) {\n  .sidebar {\n    display: none;\n  }\n}`,
  },
  {
    term: "Pseudo-classes",
    category: "CSS",
    definition:
      "Palabra clave añadida a un selector que especifica un estado especial.",
    notes:
      "Ejemplos incluyen `:hover`, `:focus`, `:active`, `:first-child`, etc.",
    codeSnippet: `button:hover {\n  background-color: blue;\n}`,
  },
  {
    term: "REST API",
    category: "Backend",
    definition: "Estilo arquitectónico para diseñar aplicaciones en red.",
    notes:
      "**REST** (Representational State Transfer) utiliza métodos HTTP estándar (GET, POST, PUT, DELETE) para realizar operaciones CRUD en recursos.",
    codeSnippet: `GET /api/users/1\nPOST /api/users\nPUT /api/users/1\nDELETE /api/users/1`,
  },
  {
    term: "GraphQL",
    category: "Backend",
    definition:
      "Lenguaje de consulta para APIs y un tiempo de ejecución para cumplir esas consultas.",
    notes:
      "**GraphQL** permite a los clientes solicitar exactamente los datos que necesitan y nada más. Evita el over-fetching y under-fetching.",
    codeSnippet: `query {\n  user(id: "1") {\n    name\n    email\n  }\n}`,
  },
  {
    term: "JWT",
    category: "Security",
    definition:
      "Estándar abierto para transmitir información de forma segura entre partes como un objeto JSON.",
    notes:
      "**JSON Web Token** se utiliza comúnmente para la autenticación y el intercambio de información. Consta de tres partes: encabezado, carga útil y firma.",
    codeSnippet: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
  },
  {
    term: "OAuth",
    category: "Security",
    definition: "Estándar abierto para la delegación de acceso.",
    notes:
      "**OAuth** permite a los usuarios otorgar a sitios web o aplicaciones acceso a su información en otros sitios web pero sin darles las contraseñas.",
    codeSnippet: `// Flujo típico de OAuth 2.0`,
  },
  {
    term: "CORS",
    category: "Security",
    definition:
      "Mecanismo que permite que recursos restringidos se soliciten desde otro dominio.",
    notes:
      "**Cross-Origin Resource Sharing** es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado iniciadas desde scripts.",
    codeSnippet: `Access-Control-Allow-Origin: *`,
  },
  {
    term: "SQL",
    category: "Database",
    definition: "Lenguaje estándar para gestionar bases de datos relacionales.",
    notes:
      "**Structured Query Language** se utiliza para consultar, insertar, actualizar y modificar datos.",
    codeSnippet: `SELECT * FROM users WHERE active = 1;`,
  },
  {
    term: "NoSQL",
    category: "Database",
    definition:
      "Bases de datos que no utilizan el esquema tabular de filas y columnas.",
    notes:
      "**NoSQL** abarca una amplia variedad de modelos de datos, incluidos documentos, gráficos, clave-valor y columnas anchas. MongoDB es un ejemplo popular.",
    codeSnippet: `db.users.find({ active: true })`,
  },
  {
    term: "ORM",
    category: "Database",
    definition:
      "Técnica para convertir datos entre sistemas de tipos incompatibles.",
    notes:
      "**Object-Relational Mapping** permite a los desarrolladores trabajar con una base de datos utilizando objetos en lugar de SQL. Ejemplos: Prisma, TypeORM, Sequelize.",
    codeSnippet: `const user = await prisma.user.create({ data: { name: 'Alice' } })`,
  },
  {
    term: "Git",
    category: "Tools",
    definition: "Sistema de control de versiones distribuido.",
    notes:
      "**Git** se utiliza para rastrear cambios en el código fuente durante el desarrollo de software.",
    codeSnippet: `git commit -m "Initial commit"`,
  },
  {
    term: "Docker",
    category: "DevOps",
    definition:
      "Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.",
    notes:
      "**Docker** permite empaquetar una aplicación con todas sus dependencias en una unidad estandarizada para el desarrollo de software.",
    codeSnippet: `FROM node:14\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]`,
  },
  {
    term: "CI/CD",
    category: "DevOps",
    definition: "Integración Continua y Entrega/Despliegue Continuo.",
    notes:
      "**CI/CD** es un método para entregar aplicaciones a los clientes con frecuencia mediante la introducción de automatización en las etapas de desarrollo de aplicaciones.",
    codeSnippet: `// .github/workflows/main.yml\nname: CI\non: [push]`,
  },
  {
    term: "Webpack",
    category: "Tools",
    definition:
      "Empaquetador de módulos estáticos para aplicaciones JavaScript modernas.",
    notes:
      "**Webpack** procesa tu aplicación y crea un gráfico de dependencias que mapea cada módulo que tu proyecto necesita y genera uno o más paquetes.",
    codeSnippet: `module.exports = {\n  entry: './src/index.js',\n  output: {\n    filename: 'bundle.js',\n  },\n};`,
  },
  {
    term: "Babel",
    category: "Tools",
    definition: "Compilador de JavaScript.",
    notes:
      "**Babel** se utiliza principalmente para convertir código ECMAScript 2015+ en una versión compatible con versiones anteriores de JavaScript.",
    codeSnippet: `// .babelrc\n{\n  "presets": ["@babel/preset-env", "@babel/preset-react"]\n}`,
  },
  {
    term: "NPM",
    category: "Tools",
    definition:
      "Gestor de paquetes para el lenguaje de programación JavaScript.",
    notes: "**NPM** es el registro de software más grande del mundo.",
    codeSnippet: `npm install react`,
  },
  {
    term: "Yarn",
    category: "Tools",
    definition: "Gestor de paquetes que funciona como alternativa a npm.",
    notes:
      "**Yarn** fue creado por Facebook para resolver algunos problemas de consistencia, seguridad y rendimiento con npm.",
    codeSnippet: `yarn add react`,
  },
  {
    term: "Jest",
    category: "Testing",
    definition: "Marco de pruebas de JavaScript mantenido por Facebook.",
    notes:
      "**Jest** funciona con proyectos que utilizan: Babel, TypeScript, Node, React, Angular, Vue y más.",
    codeSnippet: `test('adds 1 + 2 to equal 3', () => {\n  expect(sum(1, 2)).toBe(3);\n});`,
  },
  {
    term: "Cypress",
    category: "Testing",
    definition: "Herramienta de prueba de front-end para la web moderna.",
    notes:
      "**Cypress** permite escribir todo tipo de pruebas: End-to-end, Integración y Unitarias.",
    codeSnippet: `cy.visit('https://example.cypress.io')`,
  },
  {
    term: "Design Patterns",
    category: "Architecture",
    definition:
      "Soluciones reutilizables a problemas comunes en el diseño de software.",
    notes:
      "Ejemplos incluyen Singleton, Factory, Observer, Strategy, Decorator.",
    codeSnippet: `class Singleton {\n  constructor() {\n    if (!Singleton.instance) {\n      Singleton.instance = this;\n    }\n    return Singleton.instance;\n  }\n}`,
  },
  {
    term: "Microservices",
    category: "Architecture",
    definition:
      "Estilo arquitectónico que estructura una aplicación como una colección de servicios.",
    notes:
      "Los **Microservicios** son altamente mantenibles y comprobables, acoplados libremente, desplegables independientemente y organizados en torno a capacidades comerciales.",
    codeSnippet: `// Service A -> HTTP -> Service B`,
  },
  {
    term: "Monolith",
    category: "Architecture",
    definition:
      "Aplicación de software de un solo nivel en la que la interfaz de usuario y el código de acceso a datos se combinan en un solo programa.",
    notes:
      "Las aplicaciones **monolíticas** pueden ser más fáciles de desarrollar inicialmente, pero pueden volverse difíciles de mantener y escalar a medida que crecen.",
    codeSnippet: `// All code in one repo`,
  },
  {
    term: "SOLID",
    category: "Architecture",
    definition:
      "Cinco principios de diseño destinados a hacer que los diseños de software sean más comprensibles, flexibles y mantenibles.",
    notes:
      "**S**ingle Responsibility, **O**pen-Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion.",
    codeSnippet: `// Interface Segregation Principle example`,
  },
  {
    term: "Agile",
    category: "Methodology",
    definition:
      "Enfoque iterativo para la gestión de proyectos y el desarrollo de software.",
    notes:
      "**Agile** ayuda a los equipos a entregar valor a sus clientes más rápido y con menos dolores de cabeza.",
    codeSnippet: `// Sprint planning, Daily standup, Retrospective`,
  },
  {
    term: "Scrum",
    category: "Methodology",
    definition:
      "Marco de trabajo ágil para gestionar el trabajo de conocimiento.",
    notes: "**Scrum** es un marco heurístico, basado en el empirismo.",
    codeSnippet: `// Roles: Product Owner, Scrum Master, Team`,
  },
  {
    term: "Kanban",
    category: "Methodology",
    definition:
      "Método para gestionar el trabajo de conocimiento con énfasis en la entrega justo a tiempo.",
    notes:
      "**Kanban** visualiza el trabajo, limita el trabajo en curso y maximiza la eficiencia (o flujo).",
    codeSnippet: `// To Do -> In Progress -> Done`,
  },
];
