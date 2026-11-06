# ADR-007: Asistente con IA

*Estado: aceptado.*

**Contexto.** El asistente responde dos tipos de preguntas (RF-13): sobre la cuenta del residente, que salen de la base de datos, y sobre el reglamento interno, un documento de unas 5 páginas.

**Opciones consideradas para el reglamento.**

1. RAG: dividir el reglamento en fragmentos, buscarlos con embeddings y enviar solo los relevantes.
2. Enviar el reglamento completo en cada consulta, con prompt caching.

**Decisión.** Reglamento completo con prompt caching, y herramientas de solo lectura para las preguntas sobre la cuenta.

**Razones.** Cinco páginas caben de sobra en lo que el modelo puede leer de una vez. RAG agregaría una base vectorial y una búsqueda que pueden fallar, sin resolver ningún problema real. El caching reduce el costo de enviar la misma parte fija en cada consulta.

**Reglas de implementación.**

- **El modelo pide, el código decide:** las herramientas (por ejemplo, consultar estado de cuenta o listar pagos) solo devuelven datos de las unidades vinculadas al usuario con sesión iniciada, sin importar qué unidad pida el modelo.
- Todas las herramientas son de solo lectura; el asistente no puede confirmar, editar ni anular nada.
- El reglamento se guarda como texto con sus artículos numerados, y el asistente cita el artículo en cada respuesta. Si la respuesta no está en el reglamento, lo dice.
- Las preguntas del usuario y el contenido del reglamento se tratan como datos, nunca como instrucciones que cambien sus reglas (RNF-08).
- Límite de consultas por usuario al día, para controlar el costo (RNF-10).

**Cómo se mide.** Un conjunto de preguntas de prueba con la respuesta esperada: preguntas que sí están en el reglamento (debe citar el artículo correcto), preguntas que no están (debe decir que no lo sabe), preguntas sobre la cuenta, intentos de ver datos de otra unidad e intentos de manipular sus instrucciones.

**Consecuencias.** Si un condominio futuro tuviera un reglamento mucho más largo, se reevaluaría RAG con un ADR nuevo.
