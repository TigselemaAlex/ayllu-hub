# 05 — Plan del MVP

*Estado: aprobado. Las semanas son una estimación y se recalibran con el avance real.*

**Supuesto de ritmo:** unas 20 horas por semana (4 horas diarias, 5 días). Estimación total: unas 340 horas, más un colchón de 2 semanas para imprevistos y aprendizaje.

| # | Rebanada | Semanas | Lo escribes a mano | Prueba de salida |
| --- | --- | --- | --- | --- |
| 0 | Esqueleto: monorepo, Docker local, CI y despliegue | 1 | Estructura de módulos y Docker Compose | URL pública donde Next.js muestra datos de NestJS; CI en verde |
| 1 | Condominio, inicio de sesión y cargos | 2–3 | Permisos por acción y manejo de sesiones | El administrador crea un condominio y la tesorera inicia sesión; tests de permisos |
| 2 | Unidades, personas, vínculos e invitaciones | 3–5 | Resolución del condominio por petición, políticas de Row-Level Security y vínculos con fechas | Test: un usuario del condominio A no ve datos del B; un inquilino con salida registrada pierde su sesión |
| 3 | Cobros del día 1, estado de cuenta y mora | 5–6 | Generación idempotente y cálculo de saldo y mora | Ejecutar la generación dos veces no duplica cobros; el estado de cuenta muestra la mora |
| 4 | Pagos: efectivo, revisión en lote, reparto y recibos | 7–8 | Aplicación de pagos a cobros, inmutabilidad y numeración de recibos | Un lote de 20 pagos aplicado; recibo en PDF descargable; un pago confirmado no se puede editar |
| 5 | Subida de comprobantes | 9 | Regla de duplicados (RN-10) y enlaces temporales | El mismo comprobante dos veces es rechazado; el enlace temporal vence |
| 6 | Notificaciones y avisos en lote | 10 | Worker idempotente con reintentos y registro de notificaciones | Matar el worker a mitad de un lote de 300 avisos sin duplicados ni perdidos |
| 7 | Multas, parqueaderos, extraordinarias y condonación | 11–12 | Doble aprobación y auditoría de anulaciones | Una condonación no se aplica sin la segunda aprobación; cada anulación queda registrada |
| 8 | IA: lectura de comprobantes | 13–14 | Validación de la respuesta del modelo y ejecutor de evals | Evals con 30 o más comprobantes: exactitud y costo por imagen medidos |
| 9 | Recordatorios y reportes | 15 | Selección de destinatarios (5 días antes, solo con saldo) | El recordatorio solo llega a quien debe; el reporte cuadra con los datos |
| 10 | Asistente | 16–17 | Herramientas de solo lectura con verificación de unidad, y evals del asistente | Las evals pasan, incluidos los intentos de ver otra unidad |
| 11 | Producción, respaldos y piloto | 18 | Script de respaldo y restauración | Restauración probada; el condominio piloto usando el sistema |
| — | Colchón | 19–20 | — | — |

## Hitos con la tesorera

- **Hito A (semana 8): flujo de dinero manual.** La tesorera prueba registrar cobros, efectivo y confirmar en lote, sin IA ni correos. Primer feedback real.
- **Hito B (semana 14): comprobantes con IA.** Los residentes de prueba suben comprobantes y la IA los lee.
- **Hito C (semana 18): piloto completo.** El condominio usa el sistema y empiezan a medirse las métricas de la visión.

## Definición de terminado de cada rebanada

- [ ] Cumple los criterios de aceptación de sus historias
- [ ] Tiene tests de sus reglas y pasa CI
- [ ] Está desplegada y probada en el servidor real
- [ ] Si hubo una decisión importante, tiene su ADR
- [ ] Anotaste en 2 líneas qué aprendiste

Si una rebanada se alarga, se mueve el calendario, no la definición de terminado.

## Cómo se ajusta el plan

- **Registrar horas reales por rebanada.** Al terminar cada una, se compara con lo estimado.
- **Recalibrar después de la rebanada 2.** Si las tres primeras tomaron, por ejemplo, 30% menos de lo estimado, el resto del calendario se ajusta en esa proporción.
- **Si se avanza más rápido:** se empieza la siguiente rebanada. No se agregan funciones que no están en el alcance del MVP; las ideas nuevas van a la lista de la versión 2 y se adelanta el piloto.
- **Si se avanza más lento:** se mueve el calendario, nunca la definición de terminado. Si el retraso es grande, se revisa qué parte del alcance puede pasar a la versión 2.
- **Revisión del plan en cada hito con la tesorera** (semanas 8, 14 y 18).

## Registro de horas

| Rebanada | Estimado | Real | Nota |
| --- | --- | --- | --- |
| 0 | 20 h | | |
