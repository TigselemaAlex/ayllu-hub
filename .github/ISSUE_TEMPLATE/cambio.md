---
name: Cambio
about: Registrar un cambio de requisito, requisito nuevo o descubrimiento técnico
labels: ''
---

## Qué cambia

<!-- Describe el cambio en una o dos frases. -->

**Quién lo pidió:**
**Qué problema resuelve:**

## Tipo

- [ ] Requisito nuevo (`requisito-nuevo`)
- [ ] Cambio a un requisito existente (`cambio-requisito`)
- [ ] Descubrimiento técnico (`tecnico`)
- [ ] Bug (`bug`)

## Análisis de impacto

- [ ] ¿Qué historias toca? (RF)
- [ ] ¿Qué reglas de negocio cambian o chocan? (RN)
- [ ] ¿Qué entidades o estados cambian?
- [ ] ¿Hay que migrar datos existentes?
- [ ] ¿Qué tests cambian?
- [ ] ¿Contradice algún ADR?

## Decisión

- [ ] Entra en la próxima semana (bloquea una métrica o una historia del MVP)
- [ ] Va a la versión 2
- [ ] Bug crítico: se atiende de inmediato

## Al cerrar

- [ ] Documentos actualizados (historia o regla con nueva versión)
- [ ] Entrada agregada al registro de cambios en docs/06-cambios.md
- [ ] ADR nuevo, si cambió una decisión técnica
