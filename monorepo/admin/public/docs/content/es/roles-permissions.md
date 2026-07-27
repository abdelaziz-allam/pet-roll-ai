# Roles & Permissions

El portal de administracion de Petfolioo utiliza un sistema de control de acceso basado en roles (RBAC) para gestionar lo que cada administrador puede ver y hacer. A cada usuario administrador se le asigna un rol, y cada rol define un conjunto de permisos de acceso a nivel de pagina y de acciones.

---

## Vista general de roles

La plataforma admite cuatro roles de administracion, cada uno con un conjunto de capacidades progresivamente mas amplio:

| Role | Descripcion | Caso de uso tipico |
|------|-------------|-----------------|
| **Super Admin** | Acceso completo e ilimitado a todas las paginas y acciones | Propietario de la plataforma, CTO, administrador principal |
| **Admin** | Amplio acceso a paginas operativas; sin acceso a configuracion del sistema ni gestion de usuarios admin | Gestor de plataforma, responsable de operaciones |
| **Moderator** | Acceso enfocado en tareas de moderacion de contenido (verificacion, apareamiento, mascotas) | Gestor de comunidad, revisor de contenido |
| **Viewer** | Acceso de solo lectura a la mayoria de las paginas; no puede crear, editar ni eliminar nada | Agente de soporte, parte interesada, auditor |

---

## Estructura de permisos

Los permisos se definen en dos niveles:

### 1. Acceso a paginas

A cada rol se le concede o deniega el acceso a paginas especificas. Si un rol no tiene acceso a una pagina, esta no aparece en la navegacion de la barra lateral y el acceso directo por URL queda bloqueado.

### 2. Permisos de accion

Dentro de una pagina a la que un rol puede acceder, acciones especificas pueden estar habilitadas o deshabilitadas. Por ejemplo, un Moderator puede **ver** mascotas pero no **eliminarlas**.

---

## Matriz de permisos

La siguiente matriz muestra exactamente lo que cada rol puede hacer en cada pagina.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Visibilidad de paginas por rol

Esta tabla resume que paginas aparecen en la navegacion de la barra lateral para cada rol:

| Pagina | Super Admin | Admin | Moderator | Viewer |
|------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Como los permisos afectan la UI

Cuando un usuario carece de permiso para una accion especifica, el portal de administracion adapta la interfaz en consecuencia:

| Escenario | Comportamiento de la UI |
|----------|-------------|
| Sin acceso a la pagina | Pagina eliminada de la barra lateral; la URL devuelve 403 |
| Solo visualizacion (sin Edit/Delete) | Botones de accion ocultos; filas de tabla no seleccionables para edicion |
| Sin permiso de Create | Boton "Create" / "Add" oculto |
| Sin permiso de Delete | Opcion Delete eliminada de los menus de accion |
| Sin permiso de Export | Boton Export oculto |
| Sin Approve/Reject | Botones de accion de verificacion ocultos; estado mostrado como solo lectura |

> **Nota:** La UI oculta las acciones no disponibles en lugar de mostrar botones deshabilitados. Esto mantiene la interfaz limpia y evita confusiones sobre lo que esta y no esta permitido.

---

## Gestion de permisos

Solo los usuarios **Super Admin** pueden crear, editar o eliminar cuentas de administrador y modificar sus permisos.

### Asignar un rol

1. Navegue a **Admin Users** en la barra lateral.
2. Haga clic en **Create Admin User** o edite un usuario existente.
3. Seleccione el rol deseado del menu desplegable de roles.
4. Si selecciona **Super Admin**, todos los permisos se otorgan automaticamente y no se pueden personalizar.
5. Para otros roles, personalice el acceso a paginas y acciones utilizando el editor de permisos.

### Permisos personalizados

Aunque cada rol tiene permisos tipicos, el sistema admite personalizacion por usuario:

- A un **Admin** se le puede otorgar acceso a Settings si es necesario.
- A un **Moderator** se le puede dar acceso de visualizacion a Analytics.
- Un **Viewer** puede ser restringido a menos paginas que la configuracion predeterminada.

Los permisos personalizados anulan los valores predeterminados del rol. La etiqueta del rol permanece igual, pero lo que importa es el acceso real.

### Editor de permisos

El editor de permisos muestra una interfaz de lista de verificacion:

1. Cada pagina aparece como una seccion con un interruptor para el acceso a la pagina.
2. Cuando el acceso a la pagina esta habilitado, las acciones disponibles para esa pagina aparecen como casillas de verificacion.
3. Marque o desmarque acciones individuales para ajustar las capacidades del usuario.
4. Haga clic en **Save** para aplicar los cambios inmediatamente.

> **Importante:** Los cambios en los permisos entran en vigor en la siguiente carga de pagina del usuario. Si el usuario esta conectado actualmente, vera los permisos actualizados despues de actualizar su navegador.

---

## Referencia rapida de comparacion de roles

### Super Admin
- Puede hacer todo
- Unico rol que puede gestionar usuarios admin y configuracion del sistema
- Unico rol que puede eliminar usuarios de la aplicacion y notificaciones
- Unico rol que puede exportar datos de usuario
- No puede ser eliminado si es la ultima cuenta Super Admin

### Admin
- Acceso operativo completo a la gestion de contenido y usuarios
- Puede aprobar/rechazar verificaciones
- Puede gestionar el Mating Marketplace
- Puede enviar notificaciones
- No puede acceder a las paginas Settings o Admin Users
- No puede eliminar usuarios de la aplicacion (solo banear)

### Moderator
- Enfocado en la calidad del contenido y la seguridad de la comunidad
- Puede aprobar/rechazar verificaciones de criadores
- Puede moderar listados de apareamiento
- Puede editar mascotas (corregir informacion incorrecta)
- Puede banear usuarios problematicos
- No puede acceder a Analytics, Settings o Admin Users
- No puede crear ni eliminar contenido

### Viewer
- Acceso de solo lectura para fines de supervision
- Puede ver paneles, usuarios, mascotas, analytics
- No puede modificar ningun dato
- No puede enviar notificaciones ni aprobar verificaciones
- Util para partes interesadas que necesitan visibilidad sin riesgo

---

## Consideraciones de seguridad

| Practica | Descripcion |
|----------|-------------|
| Minimo privilegio | Asigne el rol minimo necesario para las responsabilidades del usuario |
| Auditoria regular | Revise la lista de usuarios admin trimestralmente; desactive las cuentas no utilizadas |
| Cuentas separadas | Cada administrador debe tener su propia cuenta (sin inicios de sesion compartidos) |
| Limite de Super Admin | Mantenga el numero de Super Admins en un maximo de 2-3 |
| Suspender en lugar de eliminar | Cuando un admin se va, suspenda su cuenta en lugar de eliminarla (preserva el rastro de auditoria) |

---

## Preguntas frecuentes

**P: Puedo crear un rol personalizado?**
R: El sistema tiene cuatro roles fijos (Super Admin, Admin, Moderator, Viewer). Sin embargo, puede personalizar los permisos de cualquier usuario individual independientemente de la etiqueta de su rol.

**P: Que sucede si elimino el acceso a una pagina para un usuario que actualmente esta viendo esa pagina?**
R: El usuario vera un error 403 en su proxima navegacion o actualizacion de pagina. Su sesion no se interrumpe.

**P: Puede un Super Admin degradarse a si mismo?**
R: Un Super Admin puede cambiar su propio rol, pero el sistema impide eliminar por completo la ultima cuenta Super Admin.

**P: Los permisos afectan el manual de usuario?**
R: No. Todos los usuarios admin pueden acceder al manual de usuario independientemente de su rol o permisos. La documentacion siempre esta disponible.

**P: Puedo ver un registro de auditoria de los cambios de permisos?**
R: Los cambios de permisos se registran con una marca de tiempo y el ID del administrador que realizo el cambio. Estos se almacenan en los campos `updatedBy` y `updatedAt` de cada registro de usuario admin.
