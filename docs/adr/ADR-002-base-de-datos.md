# ADR-002: Base de datos y separación entre condominios

*Estado: aceptado.*

**Contexto.** La plataforma es multi-condominio (D-02) y maneja datos financieros y personales. Ningún usuario puede acceder a datos de otro condominio (RNF-01, RNF-02).

**Opciones consideradas.**

1. Una base de datos por condominio: aislamiento máximo, pero un costo y una operación que crecen con cada condominio.
2. Un esquema por condominio dentro de la misma base: aislamiento fuerte, pero migraciones repetidas por esquema, riesgo de mezclar datos al reutilizar conexiones y soporte irregular en los ORM.
3. Una base y un esquema compartidos, con `condominiumId` en cada tabla y Row-Level Security de PostgreSQL como segunda barrera.

**Decisión.** PostgreSQL con base y esquema compartidos (opción 3).

**Razones.** Una sola migración, operación simple para el MVP, reportes de plataforma con una consulta y escala sin problema. El aislamiento se garantiza en dos capas: la aplicación y la base de datos.

**Consecuencias y reglas de implementación.**

- Toda tabla de negocio tiene `condominiumId` obligatorio e indexado.
- El condominio de cada petición se obtiene de la sesión en un solo punto del código, nunca de un parámetro enviado por el cliente.
- Row-Level Security: cada transacción fija el condominio actual y las políticas filtran por él. La aplicación se conecta con un usuario de base de datos que no puede saltarse esas políticas.
- Las restricciones de unicidad incluyen `condominiumId`; por ejemplo, el número de comprobante es único dentro de cada condominio (RN-10).
- Tests de aislamiento desde el primer día (RNF-01).
- Se descartó el esquema por condominio; si un cliente futuro exigiera aislamiento físico, se reevaluaría con un ADR nuevo.
