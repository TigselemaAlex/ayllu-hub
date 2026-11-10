# ADR-010: Gestor de paquetes y herramienta de monorepo

*Estado: aceptado.*

**Contexto.** ADR-001 define un monorepo en TypeScript con tres paquetes al inicio: `apps/api` (NestJS, con su worker), `apps/web` (Next.js) y `packages/shared` (tipos y validaciones compartidas). Hace falta un gestor de paquetes que enlace esos paquetes entre sí y una forma de ejecutar tareas (build, lint, test) en el orden correcto. El código se despliega en contenedores Docker (ADR-003), así que lo que funciona en la máquina del autor debe funcionar igual en la imagen.

**Opciones consideradas: gestor de paquetes.**

1. npm: ya viene con Node, pero permite importar dependencias que un paquete no declaró (dependencias fantasma), lo que puede funcionar en local y fallar en Docker.
2. pnpm: estricto con las dependencias declaradas, rápido y eficiente en disco; requiere instalarlo, porque Node dejó de incluir Corepack.
3. Yarn v4: rápido, pero su modo estricto (Plug'n'Play) genera fricción con varias herramientas.

**Opciones consideradas: herramienta de monorepo.**

1. Solo los workspaces del gestor de paquetes.
2. Turborepo: agrega caché de tareas.
3. Nx: caché, generadores de código y plugins, con configuración amplia y comportamiento poco visible.

**Decisión.** pnpm con sus workspaces, sin herramienta de monorepo adicional.

**Razones.**

- pnpm falla en local si un paquete importa algo que no declaró; el error aparece en la máquina del autor y no en producción.
- `pnpm -r` ejecuta las tareas en todos los paquetes en orden de dependencias (`shared` antes que `api` y `web`), que es lo que el proyecto necesita con tres paquetes.
- Aprendizaje: sin capas extra, el autor entiende cómo funcionan los workspaces antes de agregar herramientas encima.
- Es una decisión barata de revertir: Turborepo se puede agregar sobre pnpm sin rehacer el repositorio.

**Consecuencias.**

- La versión exacta de pnpm se fija en el campo `packageManager` del `package.json` raíz; la de Node, en `.node-version`. Local, CI y Docker usan las mismas.
- Sin Corepack, pnpm se instala explícitamente en cada entorno: en la máquina del autor, en CI y dentro de las imágenes Docker.
- Los paquetes internos se referencian con `workspace:*` y se publican con el prefijo `@ayllu/`.
- Sin caché de tareas, CI ejecuta todo en cada push. **Se reevalúa Turborepo con un ADR nuevo si CI tarda más de 5 minutos** de forma sostenida.
