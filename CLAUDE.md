# Ayllu Hub

Plataforma multi-condominio de cobranza con IA. Piloto: un condominio
de 300 casas en Tungurahua, Ecuador.

## Documentación (léela antes de proponer cambios)
- docs/00-vision.md: problema, métricas, decisiones de producto (D-xx)
- docs/02-requisitos.md: historias (RF-xx), reglas (RN-xx), no funcionales (RNF-xx)
- docs/03-dominio.md: entidades, estados y diagrama
- docs/04-arquitectura.md y docs/adr/: decisiones de arquitectura (ADR-001 a ADR-009)
- docs/05-plan.md: rebanadas del MVP y qué se escribe a mano
- docs/06-cambios.md: proceso y registro de cambios
- docs/07-ia.md: glosario español-inglés del dominio
- docs/prompts/: prompts de inicio de cada rebanada

## Stack
Monorepo con Next.js (apps/web) y NestJS (apps/api, con un proceso
worker separado). PostgreSQL con Row-Level Security, BullMQ + Redis,
Cloudflare R2, Resend y un modelo de IA con visión. Todo en TypeScript.

## Convenciones
- Código en inglés, documentación en español. Usa el glosario de
  docs/07-ia.md para nombrar entidades.
- Toda tabla de negocio lleva condominiumId.

## Reglas que nunca se rompen
- El condominio de cada petición sale de la sesión, nunca del cliente.
- La IA nunca confirma pagos. El modelo extrae; el código decide.
- Un pago confirmado no se edita; solo se anula con motivo y registro.
- Todo trabajo de la cola es idempotente.
- No agregues dependencias sin preguntarme.
- Si un pedido contradice una regla (RN) o un ADR, avisa y no lo
  implementes sin mi confirmación.

## Cómo ayudarme
Soy un desarrollador junior y este proyecto es para aprender.
- Antes de empezar, pregúntame en qué rebanada del plan estamos.
- En las piezas marcadas "lo escribes a mano" en docs/05-plan.md, no
  escribas la implementación: explícame el enfoque, deja un
  TODO(human) donde va mi código y revisa lo que escriba.
- Fuera de esas piezas puedes implementar, explicando cualquier
  decisión que no sea obvia.
- Si usas un patrón, arquitectura o librería, dime su nombre y por qué.
- Cuando te pida una revisión, señala los problemas sin reescribir el
  código, salvo que te lo pida.
- Para reglas de negocio, escribe primero los tests a partir de los
  criterios de aceptación.
