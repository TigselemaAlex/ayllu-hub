# ADR-001: Stack del proyecto

*Estado: aceptado.*

**Contexto.** El proyecto tiene dos objetivos: construir un producto real para el condominio piloto y servir como proyecto de aprendizaje para mejorar el perfil profesional del autor. Los requisitos piden diseño primero para móvil y pantallas que carguen en menos de 2 segundos con datos móviles (RNF-04, RNF-06), módulos de negocio con fronteras claras, permisos por acción y tareas programadas y en lote (RF-04, RF-06, RF-14).

**Opciones consideradas.**

1. Solo Next.js, con la lógica en el mismo proyecto (server actions y rutas de API).
2. Next.js + FastAPI.
3. Next.js + Spring Boot (stack cercano al de la tesis).
4. Next.js + NestJS.

**Decisión.** Frontend con Next.js y backend con NestJS, ambos en TypeScript.

**Razones.**

- Aprendizaje: el autor tiene un nivel básico de Next.js y quiere aprender NestJS, que ve mucho en el mercado.
- Next.js permite renderizar en el servidor para que el residente vea su estado de cuenta rápido desde el celular.
- La estructura de NestJS coincide con el diseño del dominio: sus módulos corresponden a los módulos de negocio, y trae herramientas para permisos por acción, tareas programadas y colas.
- Un solo lenguaje en ambos lados permite compartir tipos entre frontend y backend.

**Consecuencias.**

- Hay dos aplicaciones que desplegar y comunicar, y la autenticación debe funcionar entre ambas.
- Conviene un monorepo para compartir tipos y validaciones.
- Aprender dos tecnologías a la vez hace más lento el inicio. Mitigación: la lógica de negocio vive en NestJS y se escribe a mano; el frontend se mantiene simple.
- La ventaja del renderizado en el servidor se mide (RNF-06), no se supone: en pantallas privadas de cada usuario el beneficio es menor que en páginas públicas.
