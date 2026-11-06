# ADR-003: Despliegue

*Estado: aceptado.*

**Contexto.** El presupuesto de infraestructura es bajo (el precio supuesto es de unos 120 USD al mes por condominio y debe cubrir IA, servidor, correos y almacenamiento). El autor tiene experiencia con AWS (SAM, Lambda, SQS).

**Opciones consideradas.**

1. AWS con servicios administrados (Lambda, SQS, RDS): escala sola y el autor ya la conoce, pero el costo mensual es alto para el tamaño del proyecto.
2. Un servidor VPS con Docker Compose.

**Decisión.** Un VPS con Docker Compose.

**Razones.** Costo bajo y predecible, y un solo servidor sirve a todos los condominios: el costo por condominio baja a medida que se suman clientes.

**Componentes en el servidor.** Frontend Next.js, API NestJS, un proceso worker de NestJS para tareas en segundo plano (mismo código, proceso separado), PostgreSQL y un proxy inverso con HTTPS. La cola usa Redis (ADR-004).

**Consecuencias.**

- El autor es responsable de lo que AWS haría solo: actualizaciones de seguridad, monitoreo y respaldos.
- Los respaldos se guardan fuera del VPS, en otro proveedor o ubicación; un respaldo en el mismo servidor no protege si el servidor se pierde (RNF-09).
- Es un único punto de falla. Se acepta para el MVP, con un procedimiento de recuperación documentado y probado.
- Docker Compose permite levantar el mismo entorno en local y en producción, y migrar a otro proveedor sin reescribir nada.
