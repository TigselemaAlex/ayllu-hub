# ADR-005: Almacenamiento de comprobantes

*Estado: aceptado.*

**Contexto.** Cada pago por transferencia trae una foto del comprobante: unas 300 al mes por condominio de 300 casas. Son documentos que respaldan dinero y no pueden perderse (RNF-03, RNF-09). El presupuesto es bajo y el autor ya no tiene acceso a la capa gratuita de AWS.

**Opciones consideradas.**

1. Disco del VPS: gratis, pero ocupa el servidor y obliga a copiar los archivos a un respaldo externo.
2. Almacenamiento de objetos externo compatible con S3 (Cloudflare R2).

**Decisión.** Cloudflare R2.

**Razones.**

- Comprimidas a unos 300 KB, las fotos suman cerca de 1 GB al año por condominio, dentro de la capa gratuita de R2 (10 GB al mes) por mucho tiempo.
- Los comprobantes quedan fuera del VPS desde que se suben: si el servidor falla, no se pierden. Esto cubre la parte de archivos del respaldo externo (ADR-003).
- Es compatible con S3, así que el código no queda atado a un proveedor.

**Reglas de implementación.**

- Comprimir la imagen al subirla.
- Bucket privado: ningún comprobante es accesible con un enlace público.
- Para ver un comprobante, la API genera un enlace temporal de pocos minutos, solo para quien tiene permiso sobre esa unidad.
- Usar el SDK estándar de S3.

**Consecuencias.** Requiere una cuenta de Cloudflare con tarjeta registrada. Hay que vigilar el uso para no pasar la capa gratuita sin darse cuenta.
