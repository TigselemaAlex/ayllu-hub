# ADR-004: Cola de trabajos en segundo plano

*Estado: aceptado.*

**Contexto.** Varias tareas no pueden correr dentro de una petición: lectura de comprobantes con IA, envío de avisos en lote (RF-04), generación mensual de cobros (RF-06) y recordatorios (RF-14). Deben reintentarse sin duplicar ni perder nada (RNF-05).

**Opciones consideradas.**

1. BullMQ con Redis.
2. Una cola sobre PostgreSQL (por ejemplo, pg-boss).

**Decisión.** BullMQ con Redis.

**Razones.** Tiene integración oficial con NestJS, es muy usada en la industria y hay mucho material para aprender.

**Consecuencias.**

- Redis es un servicio más en el servidor: se configura con persistencia en disco para no perder trabajos si se reinicia, y nunca se expone a internet.
- La cola entrega cada trabajo al menos una vez, así que todo trabajo debe ser idempotente: si corre dos veces, el resultado es el mismo.
- Encolar un trabajo y guardar en la base de datos son dos operaciones separadas. Si una falla y la otra no, quedan inconsistentes; se resolverá con el patrón Outbox cuando aparezca el problema.
- Las tareas programadas (día 1 y recordatorios) también corren como trabajos de BullMQ, para tener reintentos y visibilidad de fallos.
