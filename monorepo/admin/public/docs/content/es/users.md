# Usuarios de la App

El modulo de Usuarios de la App proporciona gestion completa de todas las cuentas de usuario en la plataforma Petfolioo. Los administradores pueden ver perfiles de usuario, crear nuevas cuentas, editar detalles, asignar roles y tomar acciones de moderacion. Este modulo es accesible para usuarios con roles `super_admin` o `admin`.

![App Users](/docs/screenshots/users.png)

---

## Tabla de Listado de Usuarios

La tabla de listado de usuarios muestra todos los usuarios registrados de la plataforma con informacion clave visible de un vistazo.

### Columnas de la Tabla

| Columna | Descripcion | Ordenable |
|---------|-------------|:---------:|
| Avatar | Foto de perfil del usuario (miniatura circular) | No |
| Nombre | Nombre para mostrar | Si |
| Correo Electronico | Direccion de correo electronico registrada | Si |
| Rol | Rol asignado en la plataforma (usuario, moderador, admin) | Si |
| Estado | Estado de la cuenta (Activo, Pendiente, Suspendido) | Si |
| Criador Verificado | Insignia indicando estado de criador verificado | Si |
| Cantidad de Mascotas | Numero de mascotas registradas por este usuario | Si |
| Fecha de Registro | Fecha de creacion de la cuenta | Si |

### Indicadores de Estado

| Estado | Color de Insignia | Significado |
|--------|-------------------|-------------|
| Activo | Verde | La cuenta es completamente funcional |
| Pendiente | Naranja | Verificacion de correo electronico no completada |
| Suspendido | Rojo | Cuenta suspendida por un administrador |

### Insignia de Criador Verificado

| Indicador | Significado |
|-----------|-------------|
| Insignia de marca azul | El usuario ha completado la verificacion de criador y esta confirmado |
| Sin insignia | El usuario no ha solicitado ni recibido verificacion de criador |
| Icono de reloj | La solicitud de verificacion de criador esta pendiente de revision |

### Navegacion de la Tabla

1. **Ordenar** haciendo clic en cualquier encabezado de columna ordenable. Haga clic de nuevo para invertir el orden.
2. **Buscar** usando la barra de busqueda encima de la tabla para encontrar usuarios por nombre o correo electronico.
3. **Filtrar** usando los desplegables de estado y rol para limitar resultados.
4. **Paginar** usando los controles en la parte inferior (10, 20, 50 entradas por pagina).

> **Consejo:** Combine la barra de busqueda con filtros de estado para encontrar rapidamente usuarios especificos. Por ejemplo, buscar "juan" con estado "Suspendido" para encontrar usuarios suspendidos llamados Juan.

---

## Ver Detalles del Usuario

El panel de detalle del usuario proporciona una vista completa del perfil y actividad de un usuario.

### Abrir el Panel de Detalle

1. Haga clic en cualquier fila en la tabla de listado de usuarios.
2. El panel de detalle se desliza desde el lado derecho de la pantalla.
3. El panel contiene multiples secciones organizadas verticalmente.

### Secciones del Panel de Detalle

| Seccion | Contenido |
|---------|-----------|
| Encabezado de Perfil | Avatar grande, nombre para mostrar, correo, insignia de rol, insignia de estado |
| Informacion de Cuenta | Fecha de registro, ultimo inicio de sesion, estado de verificacion de correo, proveedor de autenticacion |
| Datos Personales | Numero de telefono, zona horaria, pais, ciudad |
| Estado de Criador | Estado de verificacion, fecha de solicitud, documentos enviados |
| Resumen de Mascotas | Cantidad de mascotas registradas con enlaces rapidos a cada una |
| Registro de Actividad | Acciones recientes realizadas por este usuario en la plataforma |

### Encabezado de Perfil

La parte superior del panel muestra:

- **Avatar** a tamano completo (o silueta predeterminada si no se subio ninguno)
- **Nombre para Mostrar** en texto grande
- **Correo Electronico** debajo del nombre
- **Insignia de Rol** codificada por colores segun nivel de permisos
- **Insignia de Estado** mostrando el estado actual de la cuenta

### Campos de Informacion de Cuenta

| Campo | Descripcion | Ejemplo |
|-------|-------------|---------|
| ID de Usuario | Identificador unico del sistema | "usr_a1b2c3d4" |
| Fecha de Registro | Cuando se creo la cuenta | "2023-01-15 09:30 UTC" |
| Ultimo Inicio de Sesion | Marca de tiempo del inicio de sesion mas reciente | "2024-07-20 14:22 UTC" |
| Correo Verificado | Si el correo ha sido confirmado | "Si" / "No" |
| Proveedor de Autenticacion | Metodo de autenticacion utilizado | "Email/Password" o "Google" |
| Firebase UID | ID de usuario de Firebase Authentication | "Abc123Def456" |

---

## Crear un Nuevo Usuario

Los administradores pueden crear cuentas de usuario directamente desde el portal de administracion. Dado que la plataforma usa Firebase Authentication, no se establece contrasena durante la creacion - los usuarios recibiran un correo electronico para establecer su propia contrasena.

### Pasos para Crear un Usuario

1. Haga clic en el boton **Crear Usuario** en la esquina superior derecha de la pagina de Usuarios.
2. Aparecera un modal o formulario de creacion.
3. Complete los campos requeridos:

| Campo | Requerido | Descripcion |
|-------|:---------:|-------------|
| Nombre para Mostrar | Si | El nombre completo del usuario o nombre para mostrar elegido |
| Correo Electronico | Si | Una direccion de correo electronico valida (debe ser unica en la plataforma) |

4. Haga clic en **Crear** para enviar el formulario.
5. El sistema:
   - Creara un registro en Firebase Authentication
   - Enviara un correo de bienvenida al usuario con un enlace para establecer su contrasena
   - Creara el perfil del usuario en la base de datos de la plataforma
   - Asignara el rol predeterminado de "usuario"
6. El nuevo usuario aparecera en la tabla de listado con estado "Pendiente" hasta que verifique su correo electronico.

### Reglas de Validacion

| Campo | Regla |
|-------|-------|
| Nombre para Mostrar | 2-100 caracteres, no puede estar en blanco |
| Correo Electronico | Debe ser formato de correo valido, no debe existir ya en el sistema |

> **Nota:** No se necesita campo de contrasena. Firebase Authentication gestiona la configuracion de contrasena mediante el correo de bienvenida enviado al usuario. Esto asegura que el usuario elija su propia contrasena segura.

> **Consejo:** Si necesita crear un usuario que deba tener permisos elevados, primero creelo con la configuracion predeterminada, luego cambie su rol por separado (ver Cambiar Rol abajo).

---

## Editar un Usuario

Los administradores pueden modificar los detalles del perfil de usuario cuando sea necesario. Esto se usa comunmente para corregir informacion o actualizar detalles en nombre de un usuario.

### Pasos para Editar un Usuario

1. Abra el panel de detalle del usuario haciendo clic en su fila en la tabla de listado.
2. Haga clic en el boton **Editar** (icono de lapiz) en el encabezado del panel.
3. El panel cambia al modo de edicion con campos de formulario editables.
4. Modifique cualquiera de los campos disponibles:

| Campo | Editable | Notas |
|-------|:--------:|-------|
| Nombre para Mostrar | Si | El nombre publico del usuario |
| Telefono | Si | Se recomienda formato internacional (ej., +971501234567) |
| Zona Horaria | Si | Desplegable de zonas horarias IANA (ej., Asia/Dubai) |
| Pais | Si | Desplegable de todos los paises |
| Ciudad | Si | Campo de texto, actualiza sugerencias segun el pais |
| Correo Electronico | No | No se puede cambiar (usado como identificador de inicio de sesion) |
| ID de Usuario | No | Generado por el sistema, inmutable |

5. Haga clic en **Guardar Cambios** para aplicar sus ediciones.
6. Una notificacion de exito confirmara la actualizacion.
7. El panel regresa al modo de visualizacion mostrando la informacion actualizada.

### Historial de Ediciones

Todas las ediciones realizadas a traves del portal de administracion se registran:

| Campo del Registro | Descripcion |
|--------------------|-------------|
| Marca de tiempo | Cuando se realizo el cambio |
| Administrador | Que administrador realizo el cambio |
| Campo cambiado | Que campo fue modificado |
| Valor anterior | El valor previo |
| Valor nuevo | El valor actualizado |

> **Importante:** Las ediciones a los perfiles de usuario son visibles para el usuario. Veran la informacion actualizada en su app. Considere notificar al usuario si realiza cambios en su nombre.

---

## Cambiar Rol

Los cambios de rol determinan que nivel de acceso tiene un usuario dentro de la plataforma y sus aplicaciones.

### Roles Disponibles

| Rol | Descripcion | Capacidades |
|-----|-------------|-------------|
| user | Usuario estandar de la plataforma | Puede gestionar sus propias mascotas, participar en programas de cria, ver listados |
| moderator | Moderador de la comunidad | Todas las capacidades de usuario mas la habilidad de revisar y marcar contenido |
| admin | Administrador de la plataforma | Todas las capacidades de moderador mas acceso al portal de administracion |

### Pasos para Cambiar el Rol de un Usuario

1. Abra el panel de detalle del usuario haciendo clic en su fila.
2. Localice la seccion de **Rol** en el panel.
3. Haga clic en el boton **Cambiar Rol** (o la insignia de rol actual).
4. Aparece un modal de seleccion de rol con:
   - Botones de radio para cada rol disponible
   - Texto descriptivo explicando los permisos de cada rol
   - Una casilla de confirmacion reconociendo el cambio
5. Seleccione el nuevo rol.
6. Lea la descripcion del rol para confirmar que es apropiado.
7. Marque la **casilla de confirmacion** ("Entiendo que esto cambiara el nivel de acceso del usuario").
8. Haga clic en **Confirmar Cambio de Rol**.
9. El rol del usuario se actualiza inmediatamente.

### Restricciones de Cambio de Rol

| Su Rol | Puede Asignar |
|--------|--------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | No puede cambiar roles |
| viewer | No puede cambiar roles |

> **Importante:** Promover un usuario a "admin" le otorga acceso al portal de administracion. Solo haga esto para miembros del equipo de confianza que necesiten acceso administrativo.

> **Nota:** Cambiar un usuario de "admin" a "user" revoca inmediatamente su acceso al portal de administracion. Si actualmente estan conectados al portal, su sesion terminara en la proxima navegacion de pagina.

---

## Suspender/Reactivar Usuario

Suspender a un usuario suspende su cuenta, impidiendole iniciar sesion en la app o acceder a cualquier funcion de la plataforma.

### Suspender un Usuario

1. Abra el panel de detalle del usuario.
2. Desplacese hasta la seccion de **Acciones** en la parte inferior del panel.
3. Haga clic en el boton **Suspender Usuario** (mostrado en rojo).
4. Aparece un modal de confirmacion con:
   - El nombre y correo del usuario para confirmacion
   - Un campo de texto de **Razon** (requerido)
   - Un selector de **Duracion** (permanente, 7 dias, 30 dias, 90 dias)
5. Introduzca una razon clara y profesional para la suspension.
6. Seleccione la duracion de la suspension.
7. Haga clic en **Confirmar Suspension**.

### Efectos de la Suspension

| Efecto | Descripcion |
|--------|-------------|
| Inicio de sesion bloqueado | El usuario no puede iniciar sesion en la aplicacion movil |
| Perfil oculto | El perfil del usuario no es visible para otros usuarios |
| Mascotas retiradas | Todas las mascotas de este usuario se ocultan de los listados |
| Notificaciones | El usuario recibe un correo electronico explicando la suspension con la razon proporcionada |
| Sesiones activas | Todas las sesiones actuales se terminan inmediatamente |

### Directrices para la Razon de Suspension

| Directriz | Ejemplo |
|-----------|---------|
| Sea especifico | "Multiples listados de cria fraudulentos reportados y confirmados" |
| Haga referencia a la politica | "Violacion de los Terminos de Servicio seccion 4.2 respecto a listados autenticos" |
| Evite lenguaje vago | NO escriba "mal comportamiento" - sea especifico sobre lo que ocurrio |
| Mantenga profesionalismo | La razon se envia directamente al usuario |

> **Importante:** La razon de suspension se comunica al usuario por correo electronico y notificacion en la app. Debe ser factual, especifica y profesional.

### Reactivar un Usuario

1. Use el filtro de **Estado** para seleccionar "Suspendido" para encontrar usuarios suspendidos.
2. Haga clic en la fila del usuario suspendido para abrir su panel de detalle.
3. El panel muestra una tarjeta de **Informacion de Suspension** con:
   - Fecha de suspension
   - Administrador que suspendio
   - Razon de suspension
   - Duracion / expiracion de la suspension
4. Haga clic en el boton **Reactivar Usuario** (mostrado en verde).
5. Aparece un modal de confirmacion.
6. Opcionalmente introduzca una nota explicando por que se esta levantando la suspension.
7. Haga clic en **Confirmar Reactivacion**.
8. El estado del usuario regresa a "Activo" y recupera acceso completo a la plataforma.
9. El usuario recibe una notificacion de que su cuenta ha sido restaurada.

### Historial de Suspensiones

Cada accion de suspension y reactivacion se registra en el historial del usuario:

| Campo | Descripcion |
|-------|-------------|
| Fecha de Suspension | Cuando se aplico la suspension |
| Fecha de Reactivacion | Cuando se levanto la suspension (si aplica) |
| Administrador | Que administrador tomo la accion |
| Razon | La razon declarada para la suspension |
| Duracion | Cuanto tiempo se configuro la suspension |
| Resolucion | Como termino (reactivacion manual, expiracion, apelacion) |

---

## Buscar y Filtrar Usuarios

### Barra de Busqueda

La barra de busqueda en la parte superior de la pagina de Usuarios soporta:

| Tipo de Busqueda | Ejemplo | Coincidencias |
|------------------|---------|---------------|
| Busqueda por nombre | "Maria" | Todos los usuarios con "Maria" en su nombre para mostrar |
| Busqueda por correo | "gmail.com" | Todos los usuarios con direcciones de Gmail |
| Coincidencia parcial | "pet" | Usuarios llamados "Peter", "Petrov", etc. |

### Desplegables de Filtro

| Filtro | Opciones |
|--------|----------|
| Rol | Todos, Usuario, Moderador, Admin |
| Estado | Todos, Activo, Pendiente, Suspendido |
| Criador Verificado | Todos, Verificado, No Verificado, Pendiente |

### Combinar Busqueda y Filtros

1. Introduzca texto en la barra de busqueda Y seleccione valores de filtro simultaneamente.
2. Los resultados deben coincidir con TODOS los criterios (logica AND).
3. Limpie filtros individuales haciendo clic en su boton X, o limpie todos con el boton **Restablecer**.

---

## Exportar Datos de Usuarios

Para exportar datos de usuario para informes o analisis:

1. Aplique cualquier filtro deseado.
2. Haga clic en el boton **Exportar** en el area superior derecha.
3. Seleccione formato: **CSV** o **Excel**.
4. Elija alcance: **Vista filtrada actual** o **Todos los usuarios**.
5. La descarga comienza automaticamente.

### Campos Exportados

| Campo | Incluido | Notas |
|-------|:--------:|-------|
| Nombre para Mostrar | Si | |
| Correo Electronico | Si | |
| Rol | Si | |
| Estado | Si | |
| Pais | Si | |
| Ciudad | Si | |
| Cantidad de Mascotas | Si | |
| Fecha de Registro | Si | |
| Ultimo Inicio de Sesion | Si | |
| Telefono | No | Excluido por privacidad |

> **Nota:** Los numeros de telefono e informacion personal detallada se excluyen de las exportaciones por defecto para cumplir con los requisitos de proteccion de datos.

---

*Anterior: [Registro de Mascotas](./pets.md) | Siguiente: [Categorias de Mascotas](./categories.md)*
