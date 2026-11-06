# 06 — Manejo de cambios

*Estado: aprobado.*

## Dónde vive el backlog

Todo en GitHub, en el mismo repositorio del código:

- **Issues** para cada historia, cambio o bug, enlazados al pull request que los resuelve.
- **Un tablero de GitHub Projects** con las columnas Pendiente, Esta semana, En progreso y Terminado.
- **Un milestone por rebanada** del plan (0 a 11), para ver el avance de cada una.
- **Etiquetas por tipo:** `requisito-nuevo`, `cambio-requisito`, `tecnico` y `bug`.
- **Una plantilla de issue para cambios** (`.github/ISSUE_TEMPLATE/cambio.md`) que incluye la lista de análisis de impacto, para no saltarse ningún paso.

## Proceso para cada cambio

1. **Registrar** el cambio en el backlog, con quién lo pidió y qué problema resuelve.
2. **Clasificar:** requisito nuevo, cambio a un requisito existente, descubrimiento técnico o bug.
3. **Analizar el impacto** con esta lista:
   - [ ] ¿Qué historias toca? (RF)
   - [ ] ¿Qué reglas de negocio cambian o chocan? (RN)
   - [ ] ¿Qué entidades o estados cambian?
   - [ ] ¿Hay que migrar datos existentes?
   - [ ] ¿Qué tests cambian?
   - [ ] ¿Contradice algún ADR?
4. **Decidir:** si bloquea una métrica de éxito o una historia del MVP, entra en la próxima semana; si no, va a la versión 2. Los bugs críticos se atienden de inmediato.
5. **Actualizar los documentos:** la historia o regla cambiada se marca con su nueva versión, y el cambio se anota en el registro de abajo. Si cambia una decisión técnica, se escribe un ADR nuevo y el anterior se marca como reemplazado, sin borrarlo.
6. **Implementar** como una rebanada propia: primero el test con la regla nueva, después el código.

## Ritmo semanal

- **Inicio de semana:** elegir qué se hace esa semana.
- **Durante la semana:** los cambios que llegan se registran, pero no entran a mitad de una rebanada, salvo bugs críticos.
- **Fin de semana:** demo de lo hecho (a la tesorera en los hitos, o grabándose) y 15 minutos de retrospectiva: qué cambió, qué se aprendió, qué se ajusta.

## Registro de cambios

| Fecha | Cambio | Tipo | Afectó |
| --- | --- | --- | --- |
| 2026-11-04 | El asistente y las notificaciones pasan de WhatsApp a la app web y el correo | Cambio de requisito | D-04 y D-05 reemplazadas por D-07 y D-08; RF-13 |
| 2026-11-04 | Un comprobante rechazado libera su número para volver a subirlo | Conflicto entre reglas | RN-10, RF-01 |
| 2026-11-04 | Se agregan arriendo de parqueaderos y condonación de cobros | Requisito nuevo (descubierto en el dominio) | RF-17, RF-18, RN-22 a RN-25 |
| 2026-11-04 | Separación entre condominios: de esquema por condominio a base compartida | Decisión técnica | ADR-002 |
