# ADR-009: Envío de correos

*Estado: aceptado.*

**Contexto.** Cada condominio de 300 casas genera entre 1.000 y 1.500 correos al mes (confirmaciones, recordatorios, multas, invitaciones), y llegan en picos: un lote aplicado o los recordatorios del mes pueden enviar cientos el mismo día (RF-04, RF-14).

**Opciones consideradas.** Resend, Amazon SES y Postmark.

**Decisión.** Resend: plan gratuito durante el desarrollo y plan Pro (unos 20 USD al mes por 50.000 correos) desde el inicio del piloto.

**Razones.** Buena integración con TypeScript y un plan pagado que cubre varios condominios a la vez. El plan gratuito tiene un tope de 100 correos por día, que un solo lote de confirmaciones superaría, por eso no sirve para el piloto. Amazon SES sería más barato, pero requiere una cuenta de AWS.

**Reglas de implementación.**

- El envío va detrás de una interfaz propia (Adapter), para poder cambiar de proveedor sin tocar el resto.
- Se envía desde un dominio propio, configurado con SPF, DKIM y DMARC, para que los avisos no caigan en spam.
- La cola limita el ritmo de envío para respetar los límites del proveedor.
- Cada correo enviado queda registrado como Notificación, para no reenviarlo si un trabajo se repite (RNF-05).
