# ADR-008: Autenticación y sesiones

*Estado: aceptado.*

**Contexto.** Propietarios, inquilinos, directiva y guardias entran desde el celular. Una persona inicia sesión una sola vez y ve todas sus unidades (RN-29). Cuando un inquilino sale, debe perder el acceso de inmediato (RN-03).

**Opciones consideradas.**

1. Correo y contraseña.
2. Enlace mágico por correo, sin contraseña.

**Decisión.** Correo y contraseña, con la autenticación en NestJS y sesiones guardadas en el servidor.

**Flujo de acceso.**

1. Quien registra a una persona (RF-12) no le asigna contraseña: el sistema le envía una invitación por correo.
2. La invitación trae un enlace de un solo uso, que vence en pocos días, para que la persona cree su propia contraseña.
3. Después entra con su correo y contraseña; la sesión dura varias semanas en su celular.
4. Si olvida la contraseña, recibe un enlace de recuperación con las mismas reglas: un solo uso y vencimiento corto.

**Reglas de implementación.**

- Las contraseñas se guardan con un algoritmo de hash diseñado para contraseñas (Argon2id o bcrypt), nunca en texto ni con hashes rápidos.
- Límite de intentos fallidos por cuenta y por dirección IP.
- La sesión viaja en una cookie segura que JavaScript no puede leer.
- Las sesiones se guardan en el servidor y se pueden revocar: al registrar la salida de un inquilino o al quitar un cargo, sus sesiones se cierran al instante (RN-03).
- Los enlaces de invitación y recuperación se guardan como hash y se invalidan al usarse.

**Consecuencias.** Hay que construir invitación, recuperación y bloqueo por intentos. Se descartan los tokens de larga duración sin revocación, porque un inquilino seguiría entrando hasta que su token venciera.
