# 00 — Visión del producto

*Nombre: Ayllu Hub (repositorio `ayllu-hub`). Estado: aprobado.*

**Problema.** En condominios grandes, como uno de 300 casas y 4 locales en Tungurahua, la directiva gestiona la cobranza con Excel, papel y WhatsApp personal. Los pagos llegan por transferencia con comprobante por WhatsApp o en efectivo a los guardias, se registran dos veces (papel y Excel) y la morosidad se lleva en un archivo aparte. Los residentes esperan días, a veces más de una semana, para saber si su pago fue registrado, y deben retirar en la garita un recibo físico que es su única prueba de pago.

**Usuarios.** Tesorera y directiva (registran y validan), residentes y propietarios (pagan y consultan), guardias (reciben efectivo y aplican sanciones), representantes de pasaje (voceros, fuera del MVP).

**Propuesta de valor.** El residente sube su comprobante desde el teléfono, la IA lo lee y propone el registro, la tesorera confirma con un clic y el residente recibe al instante un recibo digital verificable. La morosidad se calcula sola a partir de cuotas y pagos.

**Alcance del producto.** Plataforma multi-condominio con módulos activables por condominio. Piloto: el condominio del autor. Principio: diseñar para muchos condominios, construir para uno; solo es configurable lo que ya se sabe que varía.

**Función de IA del MVP.** Asistente dentro de la app web que recibe la foto del comprobante, lo lee y propone monto, fecha, referencia y cuota a la que aplica, y responde consultas del residente sobre su propia cuenta y el condominio. La tesorera siempre confirma los pagos.

## Métricas de éxito (3 meses de piloto)

| Métrica | Hoy | Meta |
| --- | --- | --- |
| Tiempo hasta confirmación del pago | Días, hasta más de 1 semana | Menos de 24 horas |
| Recibos entregados en digital | 0% | 100% |
| Residentes que consultan su estado en el teléfono | 0% | 60% o más |
| Tiempo mensual de registro de la tesorera | Por medir | La mitad |

**Requisito de calidad clave.** El recibo digital es la prueba de pago del residente: número único, no modificable después de emitido y descargable. Un pago confirmado nunca se edita; solo se anula con registro.

**Diseño primero para móvil.** Aplicación web que funcione bien en el celular; no se requiere app nativa.

**No-objetivos del MVP.** App nativa, pagos en línea, facturación electrónica SRI, integración con controles de acceso (el sistema genera la lista de morosos y los guardias aplican el bloqueo), contabilidad completa, asambleas y votaciones.

## Supuestos validados con la directiva (en conversaciones del proyecto de tesis previo)

- [x] La tesorera dedica muchas horas al registro mensual.
- [x] La tesorera aceptaría confirmar pagos en una plataforma.
- [x] La directiva quiere dar más transparencia a los residentes.

**Riesgo abierto.** No hay comparación con otro condominio, así que no se sabe qué varía entre conjuntos. Mitigación: configurar solo lo que ya varía en el piloto y generalizar cuando llegue un segundo condominio.

## Anexo: proceso actual de cobranza (AS-IS)

1. Pago por transferencia de Banco Pichincha a la cuenta personal de la tesorera, con comprobante enviado por WhatsApp.
2. Pago en efectivo a los guardias, que lo anotan en papel y lo entregan a tesorería.
3. Registro en Excel: un libro por año, una hoja por mes.
4. Morosidad en un Excel aparte, cruzado con los libros de pagos.
5. Sanciones a morosos: notificación, bloqueo de tarjeta o control de acceso y corte del servicio de jardinería; no se puede impedir el paso.
6. Recibos físicos que se retiran en la garita.

## Anexo: lecciones de la versión anterior (tesis)

1. **Operaciones masivas:** los recibos se enviaban uno por uno; la directiva pidió hacerlo en lote para todos los residentes.
2. **Interfaz sobria:** la versión anterior tenía demasiados colores. Requisito: diseño simple, móvil primero, legible para personas mayores, con colores que tengan significado.
3. **Recordatorios personalizados:** el aviso genérico de fin de mes no sirve; cada residente debe recibir su situación concreta (deuda, meses vencidos, multas).
4. **Multas que nadie conoce:** las multas se avisan en el grupo y se pierden; cada multa debe notificarse a la persona afectada.

## Decisiones de producto

| # | Decisión | Razón |
| --- | --- | --- |
| D-01 | El foco del MVP es la cobranza | El dinero es el tema que más conflicto genera en el condominio |
| D-02 | Plataforma multi-condominio, con el condominio del autor como piloto | Se quiere un producto para otros conjuntos, con módulos que se activan o desactivan |
| D-03 | Toda comunicación de deudas, pagos y multas es individual | Exponer a los morosos en el grupo es tóxico y son datos personales |
| D-04 | (Reemplazada por D-07) Notificaciones por WhatsApp como canal principal, con correo y aviso en la app como respaldo | WhatsApp es lo que más revisan los residentes, pero la API tiene límites de envío |
| D-05 | (Reemplazada por D-08) El asistente conversacional por WhatsApp entra en el MVP | La gente ya envía sus comprobantes por WhatsApp; el sistema se adapta a esa costumbre |
| D-06 | El asistente nunca confirma pagos; solo los deja pendientes y la tesorera los verifica | El dinero llega a la cuenta de la tesorera; ella es la única que puede confirmar que llegó |
| D-07 | Notificaciones personales por correo y aviso dentro de la app; WhatsApp queda para la versión 2 | Reducir el alcance del MVP y evitar los límites, plantillas y costos de la API de WhatsApp |
| D-08 | El asistente con IA vive dentro de la app web, no en WhatsApp | Mantiene la IA en el MVP con menos complejidad: la identidad la resuelve el inicio de sesión |

## Límites del asistente (mínimo privilegio)

- **Puede:** responder sobre la cuenta del residente verificado, recibir comprobantes y dejarlos en estado "pendiente", y responder dudas generales del condominio.
- **No puede:** confirmar, editar ni anular pagos; ver o revelar datos de otra unidad; crear o quitar multas.
- **Antes de dar datos de deuda:** responder solo sobre las unidades del usuario con sesión iniciada; nunca aceptar del chat un número de unidad distinto.
