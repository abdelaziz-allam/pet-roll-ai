# Usuarios Administradores

La pagina de Usuarios Administradores le permite gestionar las cuentas de administrador que tienen acceso al portal de administracion de Petfolioo. Aqui puede crear nuevos admins, asignar roles, configurar permisos granulares y controlar el estado de las cuentas.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Vista General

El control de acceso es critico para mantener la seguridad y la integridad operativa. El sistema de Usuarios Administradores soporta acceso basado en roles con granularidad adicional de permisos por pagina, asegurando que cada miembro del equipo tenga exactamente el acceso que necesita.

---

## Tabla de Usuarios Administradores

La vista principal muestra una tabla de todas las cuentas de administrador en el sistema.

### Columnas de la Tabla

| Columna | Descripcion |
|---------|-------------|
| **Nombre** | El nombre para mostrar del admin que aparece en todo el portal |
| **Correo Electronico** | La direccion de correo de inicio de sesion para la cuenta de admin |
| **Rol** | El rol asignado que determina el nivel base de permisos |
| **Estado** | Estado actual de la cuenta: Activo o Suspendido |
| **Acciones** | Botones de accion Editar y Eliminar |

### Funcionalidades de la Tabla

1. La tabla es ordenable haciendo clic en los encabezados de columna.
2. Un cuadro de busqueda encima de la tabla permite filtrar por nombre o correo.
3. Los controles de paginacion aparecen en la parte inferior para equipos de admin grandes.
4. Las cuentas activas muestran una insignia de estado verde; las cuentas suspendidas muestran una insignia roja.

---

## Roles

A cada cuenta de admin se le asigna uno de cuatro roles. Los roles definen el nivel base de acceso antes de que se apliquen anulaciones de permisos granulares.

### Definiciones de Roles

| Rol | Nivel de Acceso | Descripcion |
|-----|----------------|-------------|
| **super_admin** | Completo sin restricciones | Acceso total a todas las paginas, funciones y configuraciones del sistema. No puede ser eliminado ni tener permisos restringidos. |
| **admin** | Todo el contenido y usuarios | Acceso completo a gestion de contenido, gestion de usuarios, retroalimentacion, notificaciones y analiticas. No puede acceder a configuraciones a nivel de sistema. |
| **moderator** | Revision y moderacion | Puede revisar y moderar contenido como retroalimentacion, perfiles reportados y entradas marcadas. No puede crear ni eliminar recursos. |
| **viewer** | Solo lectura | Puede ver todas las paginas a las que tiene acceso pero no puede crear, editar ni eliminar registros. Ideal para interesados que necesitan visibilidad. |

### Jerarquia de Roles

La jerarquia de roles determina que roles pueden gestionar otros roles:

1. **super_admin** puede gestionar todos los demas roles (admin, moderator, viewer).
2. **admin** puede gestionar cuentas de moderator y viewer.
3. **moderator** no puede gestionar ninguna cuenta de admin.
4. **viewer** no puede gestionar ninguna cuenta de admin.

> **Importante:** No puede asignar un rol superior al suyo. Solo un super_admin puede crear otro super_admin.

---

## Crear un Admin

Para agregar una nueva cuenta de administrador al portal:

### Pasos

1. Haga clic en el boton **Agregar Admin** en la esquina superior derecha de la pagina de Usuarios Administradores.
2. Aparece un dialogo de formulario de creacion con los siguientes campos:

| Campo | Descripcion | Requisitos |
|-------|-------------|------------|
| **Correo Electronico** | El correo de inicio de sesion para el nuevo admin | Requerido. Debe ser una direccion de correo valida y unica. |
| **Nombre para Mostrar** | El nombre mostrado en la interfaz del portal | Requerido. 2-50 caracteres. |
| **Contrasena** | La contrasena inicial de inicio de sesion | Requerido. Minimo 8 caracteres, debe incluir mayusculas, minusculas y un numero. |
| **Rol** | El rol de acceso para este admin | Requerido. Seleccione del desplegable. |

3. Complete el campo de **Correo Electronico** con la direccion de correo del nuevo admin.
4. Introduzca un **Nombre para Mostrar** que identificara a este admin en el portal.
5. Establezca una **Contrasena** inicial que cumpla los requisitos de complejidad.
6. Seleccione el **Rol** apropiado del desplegable.
7. Haga clic en **Crear** para agregar la cuenta de admin.
8. Un mensaje de exito confirma que la cuenta fue creada.
9. El nuevo admin aparece en la tabla y ahora puede iniciar sesion.

> **Consejo:** Despues de crear una cuenta, informe al nuevo admin de sus credenciales a traves de un canal seguro. Recomiende que cambien su contrasena en el primer inicio de sesion.

---

## Editar un Admin

Puede modificar el nombre para mostrar, rol y estado de un admin existente.

### Pasos

1. Localice al admin en la tabla de Usuarios Administradores.
2. Haga clic en el boton **Editar** (icono de lapiz) en la columna de Acciones.
3. Aparece un dialogo de formulario de edicion con los valores actuales pre-completados.

### Campos Editables

| Campo | Descripcion | Notas |
|-------|-------------|-------|
| **Nombre para Mostrar** | Actualizar el nombre visible del admin | 2-50 caracteres |
| **Rol** | Cambiar el nivel de acceso del admin | No puede asignar un rol superior al suyo |
| **Estado** | Establecer como Activo o Suspendido | Los admins suspendidos no pueden iniciar sesion |

4. Modifique los campos segun sea necesario.
5. Haga clic en **Guardar Cambios** para aplicar las actualizaciones.
6. Un mensaje de exito confirma que los cambios fueron guardados.

### Cambiar Estado

- **Activo** -- El admin puede iniciar sesion y usar el portal normalmente.
- **Suspendido** -- El admin no puede iniciar sesion. Las sesiones existentes se terminan inmediatamente.

> **Nota:** Suspender a un admin es reversible. Uselo cuando necesite revocar acceso temporalmente sin eliminar la cuenta.

### Restricciones

- No puede editar su propio rol (para prevenir auto-degradacion accidental).
- No puede cambiar el rol de un super_admin a menos que usted tambien sea super_admin.
- El correo electronico no puede cambiarse despues de la creacion de la cuenta.

---

## Configuracion Granular de Permisos por Pagina

Mas alla de los roles, el portal de administracion soporta control de permisos detallado por pagina. Esto le permite personalizar exactamente a que paginas y acciones puede acceder cada admin.

### Acceder a la Configuracion de Permisos

1. Haga clic en el boton **Editar** del admin que quiere configurar.
2. En el dialogo de edicion, navegue a la seccion de **Permisos** (o pestana).
3. Se muestra una matriz de permisos mostrando todas las paginas del portal.

### Estructura de la Matriz de Permisos

La matriz de permisos muestra cada pagina del portal como una fila con los siguientes controles:

| Control | Descripcion |
|---------|-------------|
| **Alternancia de Acceso** | Un interruptor que habilita o deshabilita el acceso a la pagina completa |
| **Multi-Seleccion de Acciones** | Un desplegable que permite seleccionar que acciones especificas estan permitidas en esa pagina |

### Paginas Disponibles en la Matriz

| Pagina | Acciones Posibles |
|--------|-------------------|
| Panel de Control | Ver |
| Usuarios | Ver, Crear, Editar, Eliminar, Suspender |
| Mascotas | Ver, Crear, Editar, Eliminar |
| Registros de Salud | Ver, Crear, Editar, Eliminar |
| Vacunaciones | Ver, Crear, Editar, Eliminar |
| Cria | Ver, Crear, Editar, Eliminar |
| Retroalimentacion | Ver, Responder, Cerrar, Fijar |
| Notificaciones | Ver, Enviar |
| Analiticas | Ver, Exportar |
| Configuracion | Ver, Editar |
| Usuarios Administradores | Ver, Crear, Editar, Eliminar |

### Configurar Permisos

1. Para cada fila de pagina, active la alternancia de **Acceso**:
   - **ACTIVADO** -- El admin puede acceder a esta pagina (acciones especificas controladas abajo).
   - **DESACTIVADO** -- El admin no puede ver ni navegar a esta pagina en absoluto.
2. Para paginas con acceso habilitado, haga clic en el desplegable multi-seleccion de **Acciones**.
3. Seleccione las acciones especificas que este admin tiene permitido realizar:
   - Marque cada accion que quiere otorgar.
   - Desmarque las acciones que quiere restringir.
4. Repita para cada pagina segun sea necesario.
5. Haga clic en **Guardar Cambios** para aplicar la configuracion de permisos.

### Como Interactuan los Permisos con los Roles

- Los permisos de rol sirven como la **linea base**.
- Los permisos por pagina pueden **restringir** el acceso por debajo de la linea base del rol.
- Los permisos por pagina **no pueden otorgar** acceso mas alla de lo que el rol permite.
- Por ejemplo: Un usuario con rol admin tiene acceso a todas las paginas de contenido por defecto. Puede restringir su acceso a la pagina de Cria desactivandola, pero no puede otorgarle acceso a Configuracion (reservado para super_admin).

> **Consejo:** Use permisos granulares cuando tenga miembros del equipo que necesiten un subconjunto especifico de capacidades de admin. Por ejemplo, un agente de soporte al cliente podria tener rol "admin" pero restringido solo a las paginas de Retroalimentacion y Usuarios.

---

## Eliminar un Admin

Eliminar una cuenta de admin la borra permanentemente del sistema.

### Pasos

1. Localice al admin en la tabla de Usuarios Administradores.
2. Haga clic en el boton **Eliminar** (icono de papelera) en la columna de Acciones.
3. Aparece un dialogo de confirmacion con el nombre y correo del admin.
4. Escriba la direccion de correo del admin para confirmar la eliminacion (medida de seguridad).
5. Haga clic en **Confirmar Eliminacion** para eliminar permanentemente la cuenta.
6. Un mensaje de exito confirma la eliminacion.
7. El admin se elimina de la tabla y ya no puede iniciar sesion.

### Restricciones de Eliminacion

| Restriccion | Razon |
|-------------|-------|
| No se puede eliminar un super_admin | Previene el bloqueo accidental del sistema |
| No se puede eliminar su propia cuenta | Previene la auto-eliminacion |
| No se puede eliminar si carece de rol suficiente | Se aplican las reglas de jerarquia de roles |

> **Advertencia:** La eliminacion es permanente y no puede deshacerse. Si necesita eliminar acceso temporalmente, use el estado Suspendido en su lugar.

---

## Explicacion de la Matriz de Permisos

El sistema de permisos en Petfolioo usa un enfoque por capas:

### Capa 1: Control de Acceso Basado en Roles (RBAC)

Cada rol tiene un conjunto predefinido de permisos que sirven como punto de partida:

```
super_admin  -->  Todas las paginas, todas las acciones, sin restricciones
admin        -->  Todas las paginas de contenido/usuarios, todas las acciones (excepto Configuracion)
moderator    -->  Paginas de revision de contenido, acciones limitadas (ver, responder, cerrar)
viewer       -->  Todas las paginas accesibles, solo visualizacion
```

### Capa 2: Anulaciones por Pagina

Los permisos granulares agregan una segunda capa encima del RBAC:

```
Permisos del rol  (linea base)
    |
    v
Alternancias por pagina  (pueden restringir, no pueden expandir mas alla del rol)
    |
    v
Permisos efectivos finales  (lo que el admin realmente ve)
```

### Escenarios de Ejemplo

**Escenario 1: Agente de Soporte al Cliente**
- Rol: admin
- Anulacion: Deshabilitar acceso a Mascotas, Registros de Salud, Cria, Analiticas, Usuarios Administradores
- Resultado: Solo puede acceder a Panel de Control, Usuarios, Retroalimentacion y Notificaciones

**Escenario 2: Revisor de Contenido**
- Rol: moderator
- Anulacion: Habilitar Retroalimentacion (Ver, Responder, Cerrar), Usuarios (Solo ver)
- Resultado: Puede revisar retroalimentacion y consultar perfiles de usuario pero no puede modificar usuarios

**Escenario 3: Observador de Analiticas**
- Rol: viewer
- Anulacion: Habilitar solo Panel de Control y Analiticas
- Resultado: Puede ver graficos y metricas pero nada mas

### Ver Permisos Efectivos

1. Abra el dialogo de edicion para cualquier admin.
2. La seccion de Permisos muestra el estado efectivo actual.
3. Las alternancias y selecciones de acciones reflejan lo que actualmente esta otorgado.
4. Las acciones deshabilitadas (en gris) indican aquellas mas alla de lo que el rol permite.

---

## Mejores Practicas de Seguridad

1. **Principio de minimo privilegio** -- Asigne el rol y permisos minimos necesarios para la funcion laboral de cada admin.
2. **Auditorias regulares** -- Revise las cuentas de admin trimestralmente. Elimine cuentas que ya no son necesarias.
3. **Suspender antes de eliminar** -- Al dar de baja, suspenda primero para asegurar que no haya interrupcion, luego elimine despues de un periodo de gracia.
4. **Limite los super_admins** -- Mantenga el numero de cuentas super_admin al minimo (idealmente 1-2).
5. **Contrasenas fuertes** -- Exija contrasenas complejas y recomiende gestores de contrasenas.
6. **Monitorear actividad** -- Verifique quien esta iniciando sesion y cuando a traves de los registros del sistema.

---

## Solucion de Problemas

| Problema | Solucion |
|----------|----------|
| No puedo crear un admin | Verifique que tiene privilegios de rol suficientes. Compruebe que el correo no este ya en uso. |
| No puedo ver los botones Editar/Eliminar | Su rol no tiene permiso para gestionar admins al nivel o por encima del nivel de rol del objetivo. |
| El admin no puede iniciar sesion despues de la creacion | Verifique que el estado de la cuenta es Activo. Confirme que la contrasena fue introducida correctamente. |
| Los cambios de permisos no surten efecto | El admin puede necesitar cerrar sesion y volver a iniciar sesion para que los cambios de permisos se apliquen. |
| No puedo eliminar un super_admin | Esto es por diseno. Las cuentas super_admin no pueden eliminarse a traves de la interfaz. |

---

## Paginas Relacionadas

- [Configuracion](./settings.md) -- Configurar ajustes de seguridad del sistema
- [Retroalimentacion](./feedback.md) -- Gestionar retroalimentacion de usuarios (requiere acceso a pagina de Retroalimentacion)
- [Analiticas](./analytics.md) -- Ver metricas de la plataforma (requiere acceso a pagina de Analiticas)
