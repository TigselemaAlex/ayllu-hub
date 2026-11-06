# ADR-006: Lectura de comprobantes con IA

*Estado: aceptado.*

**Contexto.** El residente sube la foto del comprobante y el sistema debe extraer monto, fecha, banco y número (RF-02). Hoy la mayoría paga por Banco Pichincha, pero llegarán comprobantes de otros bancos, cooperativas y capturas de pantalla.

**Opciones consideradas.**

1. OCR tradicional más reglas de extracción por formato de banco: gratis y local, pero frágil ante formatos nuevos.
2. Modelo de IA con visión que devuelve los campos en JSON.

**Decisión.** Modelo de IA con visión.

**Razones.** Maneja formatos distintos sin código nuevo por banco, y permite medir exactitud y costo, que es la habilidad de IA que más valora el mercado.

**Reglas de implementación.**

- **El modelo extrae, el código decide:** el modelo solo lee los campos; qué cobro corresponde y si el número está duplicado lo decide código propio con reglas probadas.
- Corre en el worker, como trabajo de la cola, nunca dentro de la petición del residente.
- Se llama detrás de una interfaz propia (Adapter), para poder cambiar de modelo o proveedor sin tocar el resto.
- La respuesta se valida contra un esquema; si no cumple, el comprobante pasa a ingreso manual.
- El modelo indica si la imagen es legible; si no lo es, se pide ingreso manual en vez de adivinar.
- Se envía solo la imagen, sin nombres ni datos de la unidad (RNF-02).
- El texto dentro de la imagen se trata como dato, nunca como instrucción (RNF-08).
- Nunca confirma pagos: el residente revisa los datos y la tesorera confirma (D-06).

**Cómo se mide.** Conjunto de prueba de 30 a 50 comprobantes reales anonimizados, con los valores correctos escritos a mano. Meta: 90% de campos correctos (RNF-07). Se registra el costo por imagen (RNF-10) y se usa el modelo más barato que cumpla la meta.
