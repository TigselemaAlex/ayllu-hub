# 02 — Requisitos

*Estado: aprobado.*

## Alcance del MVP (confirmado)

1. Cuotas (alícuotas y parqueaderos rentados) y estado de cuenta por unidad
2. Subida de comprobantes desde la app y confirmación de la tesorera
3. Asistente con IA en la app: lee comprobantes y responde consultas del residente
4. Recibos digitales, con envío en lote
5. Morosidad calculada automáticamente
6. Multas con notificación individual (son parte de la economía del conjunto)
7. Recordatorios personalizados por correo y aviso en la app
8. Pagos en efectivo registrados por los guardias desde la app

**Versión 2:** asistente y notificaciones por WhatsApp, representantes de pasaje, asambleas y votaciones, integración con controles de acceso.

## Actores y permisos

| Actor | Puede | No puede |
| --- | --- | --- |
| Administrador de plataforma | Crear condominios, activar módulos y dar de alta a la directiva inicial | Ver o modificar pagos de un condominio |
| Tesorera | Emitir cuotas, confirmar o rechazar pagos, anular pagos con registro, enviar recibos en lote, registrar propietarios e inquilinos | Borrar un pago confirmado |
| Presidente y vicepresidente | Registrar propietarios e inquilinos, ver reportes de ingresos, morosidad y multas; el presidente puede anular cualquier multa | Confirmar pagos |
| Secretario | Ver reportes | Confirmar pagos |
| Guardia | Registrar pagos en efectivo (quedan pendientes hasta que la tesorera los confirme), ver la lista de unidades con sanción activa, registrar multas eligiendo un tipo del reglamento y anular las multas que él mismo registró | Ver montos de deuda o historial de pagos |
| Propietario | Ver el estado de cuenta, subir comprobantes, descargar recibos, usar el asistente, registrar a su inquilino y decidir si puede subir comprobantes | Ver datos de otras unidades |
| Inquilino | Ver el estado de cuenta, recibir recordatorios y avisos de multa, usar el asistente y subir comprobantes si el propietario lo permite | Ver datos de otras unidades; su acceso termina al registrarse su salida |

## Reglas de negocio

- **RN-01.** El propietario es el único responsable de las deudas y multas de su unidad.
- **RN-02.** La deuda pertenece a la unidad, no a la persona que vive en ella.
- **RN-03.** Cuando se registra la salida de un inquilino, pierde el acceso de inmediato.
- **RN-04.** Ningún pago queda confirmado sin la tesorera, incluidos los pagos en efectivo recibidos por los guardias.
- **RN-05.** El propietario decide si su inquilino puede subir comprobantes, según el acuerdo entre ambos.
- **RN-06.** Las multas se registran eligiendo un tipo del catálogo del reglamento del condominio, con su monto fijo; quien registra no puede inventar el tipo ni el monto.
- **RN-07.** Las multas las registran los guardias; las puede anular el mismo guardia que la registró o el presidente.
- **RN-08.** Toda anulación de multa exige un motivo y queda registrada con autor y fecha, visible para la directiva.
- **RN-09.** Cada multa se notifica al propietario y al inquilino de la unidad.
- **RN-10.** Un número de comprobante no puede registrarse dos veces en el mismo condominio mientras exista un pago pendiente o confirmado con ese número. Si el pago fue rechazado, el número queda libre para subir el comprobante corregido.
- **RN-11.** Si un comprobante cubre varios conceptos, el residente reparte el monto al subirlo y la tesorera puede corregir ese reparto antes de confirmar. La suma del reparto siempre es igual al monto del comprobante.
- **RN-12.** Las alícuotas y los parqueaderos rentados se generan solos el día 1 de cada mes para cada unidad activa. Nunca se generan dos veces para el mismo mes.
- **RN-13.** La cuota de un mes vence el último día de ese mes. Desde el día siguiente, esa cuota está en mora.
- **RN-14.** Las cuotas extraordinarias nacen de una decisión de asamblea, que fija el monto por unidad y una fecha límite. Hasta esa fecha, cada propietario abona lo que pueda; el saldo que quede después de la fecha límite entra en mora.
- **RN-15.** El monto de la alícuota se define por tipo de unidad (casa, local comercial). Hoy ambos pagan lo mismo, pero puede diferir.
- **RN-16.** Cualquier cobro vencido con saldo pendiente, sea cual sea su concepto, pone a la unidad en mora y se le aplican las mismas sanciones.
- **RN-17.** Una multa vence 30 días después de registrada; si no se paga, entra en mora. El plazo se configura por condominio, según su reglamento.

Las reglas RN-18 a RN-30 están en [03-dominio.md](03-dominio.md).

## Historias de usuario: flujo de pago

**RF-01. Subir comprobante.** Como residente (propietario, o inquilino si el propietario lo permite), quiero subir mi comprobante e indicar a qué conceptos corresponde, para que mi pago quede registrado sin escribirle a nadie.

- Debe elegir al menos un concepto: alícuota, parqueadero, multa o cuota extraordinaria.
- Si elige varios conceptos, reparte el monto entre ellos y la suma debe ser igual al monto del comprobante.
- El pago queda como "pendiente".
- Si el número de comprobante ya existe en un pago pendiente o confirmado, el sistema lo rechaza y avisa que está duplicado.

**RF-02. Lectura automática.** Como residente, quiero que el sistema lea los datos del comprobante, para no tener que escribirlos.

- Se extraen monto, fecha, banco y número de comprobante.
- El residente revisa y corrige los datos antes de enviar.
- Si la imagen no se puede leer, puede ingresar los datos a mano.

**RF-03. Revisión en lote.** Como tesorera, quiero ver todos los pagos pendientes en una lista con vista previa del comprobante, para revisarlos de una sola vez.

- Cada pago se marca como "confirmar" o "rechazar"; el rechazo exige un motivo.
- Puede corregir el reparto entre conceptos antes de confirmar.
- Nada cambia hasta que presiona "Aplicar cambios".

**RF-04. Aplicar el lote.** Como tesorera, quiero aplicar todas mis revisiones juntas, para que los residentes reciban su confirmación sin trabajo adicional.

- Los pagos confirmados actualizan los saldos y generan un recibo con número único.
- Los avisos se envían a todos en lote.
- Si el envío se interrumpe, nadie recibe el aviso dos veces y nadie se queda sin él.

**RF-05. Aviso de confirmación.** Como propietario o inquilino, quiero recibir por correo y en la app la confirmación de mi pago, para saber cómo queda mi cuenta.

- Incluye el recibo, el saldo pendiente si el pago fue parcial, las multas y las cuotas extraordinarias.
- El estado del pago cambia en la app en cuanto la tesorera aplica el lote.

## Historias de usuario: emisión de cuotas y mora

**RF-06. Generación mensual automática.** Como tesorera, quiero que las alícuotas y parqueaderos rentados se generen solos cada mes, para no emitirlos a mano.

- El día 1 se crea la alícuota de cada unidad activa.
- El cobro de parqueadero se crea solo para las unidades con un parqueadero rentado vigente.
- Si el proceso se interrumpe y se vuelve a ejecutar, no se duplica ningún cobro.
- La tesorera ve un resumen de lo generado.

**RF-07. Registrar cuota extraordinaria.** Como tesorera, quiero registrar una cuota extraordinaria aprobada en asamblea, para cobrarla a todas las unidades.

- Se registra el motivo, el monto por unidad, la fecha de la asamblea y la fecha límite de pago. Se aceptan abonos parciales hasta esa fecha.
- Se avisa a todos los propietarios e inquilinos.

**RF-08. Mora calculada.** Como directiva, quiero que la morosidad se calcule sola a partir de cuotas y pagos, para no llevar una lista aparte.

- Una unidad está en mora si tiene al menos una cuota vencida sin pagar por completo.
- El estado de cuenta muestra los meses y montos vencidos.
- Los guardias ven la lista de unidades con sanción activa, sin montos.

## Historias de usuario: resto del MVP

**RF-09. Registrar multa.** Como guardia, quiero registrar una multa eligiendo la unidad y el tipo del reglamento, para que quede cobrada sin avisar en el grupo.

- El monto sale del catálogo; el guardia no lo escribe.
- Vence a los 30 días.
- Se notifica al propietario y al inquilino.

**RF-10. Anular multa.** Como guardia que registró la multa, o como presidente, quiero anularla cuando no procede.

- El motivo es obligatorio.
- La anulación queda registrada con autor y fecha, visible para la directiva.

**RF-11. Registrar pago en efectivo.** Como guardia, quiero registrar el efectivo que recibo, para no anotarlo en papel.

- Registra unidad, monto y conceptos.
- Queda pendiente y entra en la revisión en lote de la tesorera.
- El residente lo ve como pendiente en la app.

**RF-12. Registrar personas.** Como propietario, presidente, vicepresidente o tesorera, quiero registrar propietarios e inquilinos, para que tengan acceso a su cuenta.

- Se registra nombre, correo y unidad.
- El propietario activa o desactiva el permiso de su inquilino para subir comprobantes (activado por defecto).
- Al registrar la salida de un inquilino, pierde el acceso de inmediato.

**RF-13. Asistente en la app.** Como propietario o inquilino, quiero preguntarle al asistente por mi cuenta y por el reglamento, para no escribirle a la directiva.

- Responde sobre saldo, cobros vencidos, multas y recibos solo de las unidades del usuario.
- Responde dudas del reglamento citando el artículo; si la respuesta no está en el reglamento, lo dice.
- Nunca confirma, edita ni anula pagos o multas.

**RF-14. Recordatorios personalizados.** Como propietario o inquilino, quiero recibir un recordatorio con mi situación concreta, para saber qué debo pagar.

- Incluye saldo, cobros vencidos, multas y cuotas extraordinarias con su fecha límite.
- Llega por correo y como aviso en la app.
- Se envía 5 días antes del vencimiento de cada cobro, solo a las unidades que todavía tienen saldo en ese cobro.

**RF-15. Reportes para la directiva.** Como miembro de la directiva, quiero ver ingresos, morosidad, multas y anulaciones del período, para rendir cuentas sin armar un Excel.

**RF-16. Configurar el condominio.** Como tesorera o presidente, quiero configurar las reglas del condominio, para que el sistema cobre según nuestro reglamento.

- Tipos de unidad y monto de alícuota de cada uno.
- Catálogo de multas con su monto y plazo.
- Carga del reglamento interno para el asistente.
- Módulos activos, por ejemplo parqueaderos rentados.

## Historias agregadas durante el modelo de dominio

**RF-17. Registrar arriendo de parqueadero.** Como tesorera, quiero registrar el arriendo de un parqueadero azul a una unidad, para que se cobre cada mes.

- Se registra la unidad, el parqueadero, quién firmó la carta de compromiso y la fecha de inicio.
- Si lo firmó un inquilino, se avisa al propietario.
- Al terminar (por renuncia o por incumplimiento) se registra la fecha de fin y el motivo; desde el mes siguiente ya no se genera el cobro.

**RF-18. Condonar un cobro.** Como tesorera o presidente, quiero condonar una deuda cuando la directiva lo decide, dejando constancia.

- Uno registra la condonación con motivo; el otro la aprueba o la rechaza.
- Hasta la aprobación, la deuda sigue vigente.
- Queda registrada con autores, fechas y motivo, visible para la directiva.

## Requisitos no funcionales

| ID | Requisito | Cómo se verifica |
| --- | --- | --- |
| RNF-01 | **Aislamiento entre condominios:** ningún usuario accede a datos de un condominio al que no pertenece | Tests automáticos que intentan leer datos cruzados y deben fallar |
| RNF-02 | **Privacidad:** los datos financieros de una unidad solo los ven su propietario, su inquilino y la directiva según permisos; los guardias nunca ven montos; al modelo de IA se le envían solo los datos necesarios. Se cumple la Ley Orgánica de Protección de Datos Personales | Tests de permisos por rol y revisión de qué datos salen hacia la IA |
| RNF-03 | **Integridad y auditoría:** los recibos tienen número único, no se modifican y se descargan en PDF; los pagos confirmados no se editan; toda anulación guarda autor, fecha y motivo | Tests que intentan editar un pago confirmado o un recibo y deben fallar |
| RNF-04 | **Usabilidad:** diseño primero para móvil, legible para personas mayores, pocos colores y cada uno con significado | Prueba con 3 residentes, incluida una persona mayor, que completan el flujo de pago sin ayuda |
| RNF-05 | **Confiabilidad de procesos automáticos:** la generación mensual, los envíos en lote y los recordatorios no duplican ni pierden nada si se interrumpen; los fallos quedan visibles | Prueba de interrumpir el proceso a la mitad y volver a ejecutarlo |
| RNF-06 | **Rendimiento:** las pantallas principales cargan en menos de 2 segundos con datos móviles; un lote de 300 avisos se envía en menos de 15 minutos | Mediciones p95 en producción |
| RNF-07 | **Precisión de la IA:** la lectura de comprobantes acierta al menos 90% de los campos en el conjunto de prueba | Evals con comprobantes reales anonimizados |
| RNF-08 | **Seguridad del asistente:** solo lectura sobre las unidades del usuario; resiste instrucciones maliciosas escondidas en preguntas o comprobantes | Casos de prueba de inyección de instrucciones en las evals |
| RNF-09 | **Respaldo:** copia de seguridad diaria de la base de datos y de los comprobantes; la restauración se prueba al menos una vez | Restauración de prueba documentada |
| RNF-10 | **Costo de la IA:** el gasto en IA no supera el 10% del precio mensual del condominio (unos 12 USD al mes para 300 casas) | Registro de tokens y costo por llamada |

**Supuesto de precio (por validar con la directiva):** 0,40 USD por casa al mes, unos 120 USD para un condominio de 300 casas (cerca del 4% de lo recaudado en alícuotas). El precio debe cubrir la IA, el servidor, el envío de correos y el almacenamiento de comprobantes.
