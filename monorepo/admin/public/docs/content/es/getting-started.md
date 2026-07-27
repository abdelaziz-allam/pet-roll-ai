# Primeros Pasos

Bienvenido al Portal de Administracion de Petfolioo. Esta guia le acompana en su primer inicio de sesion, explica el diseno de la interfaz y le ayuda a comprender como los controles de acceso basados en roles determinan lo que puede ver y hacer dentro de la plataforma.

El portal de administracion es una consola de gestion basada en web para la plataforma de salud y cria de mascotas Petfolioo. Desde aqui, los administradores pueden gestionar usuarios, mascotas, categorias, registros de salud, programas de cria y configuraciones de la plataforma.

![Login Page](/docs/screenshots/login.png)

---

## Iniciar Sesion

El portal de administracion utiliza autenticacion por correo electronico y contrasena. Solo las cuentas con un rol de administrador asignado pueden acceder al portal.

### Pasos para Iniciar Sesion

1. Abra su navegador y navegue a la URL del portal de administracion.
2. Se le presentara la pagina de **Inicio de Sesion** en la ruta `/login`.
3. Introduzca su **Correo Electronico** en el primer campo.
4. Introduzca su **Contrasena** en el segundo campo.
5. Haga clic en el boton **Iniciar Sesion**.
6. Si sus credenciales son validas y su cuenta tiene acceso de administrador, sera redirigido al **Panel de Control**.

> **Nota:** Si ve un error "No autorizado" despues de introducir credenciales validas, es posible que su cuenta no tenga un rol de administrador asignado. Contacte a un super administrador para que actualice su rol.

### Restablecer su Contrasena

Si ha olvidado su contrasena:

1. En la pagina de Inicio de Sesion, haga clic en el enlace **Olvidaste tu contrasena?** debajo del campo de contrasena.
2. Introduzca el correo electronico asociado a su cuenta de administrador.
3. Haga clic en **Enviar Enlace de Restablecimiento**.
4. Revise su bandeja de entrada en busca de un mensaje de restablecimiento de contrasena de Petfolioo.
5. Haga clic en el enlace del correo electronico para abrir el formulario de restablecimiento de contrasena.
6. Introduzca y confirme su nueva contrasena.
7. Regrese a la pagina de inicio de sesion e inicie sesion con sus nuevas credenciales.

> **Consejo:** Los enlaces de restablecimiento de contrasena expiran despues de 1 hora. Si su enlace ha expirado, solicite uno nuevo desde la pagina de inicio de sesion.

---

## Comprender el Diseno del Panel de Control

Una vez que haya iniciado sesion, el portal de administracion presenta un diseno consistente en todas las paginas.

### Navegacion Lateral

La barra lateral izquierda contiene el menu de navegacion principal. Incluye enlaces a todos los modulos principales:

| Elemento del Menu | Descripcion |
|-------------------|-------------|
| Panel de Control | Vista general de la plataforma con KPIs y analiticas |
| Usuarios | Gestionar usuarios de la app, roles y cuentas |
| Mascotas | Explorar y gestionar el registro de mascotas |
| Categorias | Definir y gestionar categorias de mascotas |
| Registros de Salud | Revisar certificaciones de salud de mascotas |
| Cria | Gestionar programas de cria y linaje |
| Vacunaciones | Seguimiento de registros de vacunacion |
| Embarazo | Monitorear entradas de seguimiento de embarazo |
| Verificaciones | Revisar solicitudes de verificacion pendientes |
| Configuracion | Configuracion de la plataforma |

La barra lateral se puede colapsar haciendo clic en el icono de alternancia en la parte superior para dar mas espacio de pantalla a las areas de contenido.

### Barra Superior

La barra superior contiene:

| Elemento | Ubicacion | Proposito |
|----------|-----------|-----------|
| Busqueda | Centro | Busqueda global entre usuarios, mascotas y registros |
| Campana de Notificaciones | Derecha | Alertas de acciones pendientes y eventos del sistema |
| Avatar de Perfil | Extremo Derecho | Menu de cuenta con configuracion de perfil y cierre de sesion |

### Area de Contenido

El area de contenido principal ocupa el espacio restante a la derecha de la barra lateral y debajo de la barra superior. Aqui es donde se muestran las tablas, formularios, paneles de detalle y analiticas.

---

## Acceso Basado en Roles

El portal de administracion aplica control de acceso basado en roles (RBAC). A cada cuenta de administrador se le asigna uno de los siguientes roles, que determina que acciones estan disponibles.

### Definiciones de Roles

| Rol | Nivel de Acceso | Descripcion |
|-----|----------------|-------------|
| `super_admin` | Completo | Acceso total a todos los modulos, configuraciones y gestion de usuarios. Puede asignar y revocar roles de administrador. |
| `admin` | Alto | Acceso a todos los modulos operativos. Puede gestionar usuarios, mascotas y registros. No puede modificar configuraciones de la plataforma ni asignar roles super_admin. |
| `moderator` | Medio | Puede revisar y moderar contenido, aprobar verificaciones y gestionar listados de mascotas. No puede crear ni eliminar cuentas de administrador. |
| `viewer` | Solo Lectura | Puede ver todos los datos en todos los modulos pero no puede crear, editar ni eliminar registros. Util para auditorias e informes. |

### Matriz de Permisos

| Accion | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Ver panel de control | Si | Si | Si | Si |
| Gestionar usuarios | Si | Si | No | No |
| Crear cuentas de administrador | Si | No | No | No |
| Suspender/Reactivar usuarios | Si | Si | Si | No |
| Gestionar mascotas | Si | Si | Si | No |
| Aprobar verificaciones | Si | Si | Si | No |
| Gestionar categorias | Si | Si | No | No |
| Editar configuracion de plataforma | Si | No | No | No |
| Ver informes | Si | Si | Si | Si |

> **Nota:** Si un elemento de navegacion no es visible en su barra lateral, su rol no tiene acceso a ese modulo.

---

## Resumen de Navegacion

A continuacion se muestra una lista completa de los modulos disponibles en el portal de administracion, organizados por area funcional.

### Modulos Principales

1. **Panel de Control** - Vista general de la salud de la plataforma, KPIs y graficos analiticos.
2. **Usuarios** - Gestion de usuarios de la app incluyendo perfiles, roles y estado de cuenta.
3. **Mascotas** - El registro de mascotas con vistas detalladas completas y herramientas de moderacion.
4. **Categorias** - Sistema de categorizacion de especies/tipos de mascotas.

### Salud y Registros

5. **Registros de Salud** - Documentos de certificacion de salud y su estado de verificacion.
6. **Vacunaciones** - Calendarios de vacunacion y registros de completado.
7. **Embarazo** - Seguimiento de embarazo para animales de cria.

### Operaciones de la Plataforma

8. **Verificaciones** - Cola de solicitudes pendientes de verificacion de usuarios y mascotas.
9. **Cria** - Gestion de programas de cria y seguimiento de linaje.
10. **Configuracion** - Configuracion general de la plataforma y feature flags.

---

## Consejos para la Primera Configuracion

Cuando acceda por primera vez al portal de administracion, siga estas recomendaciones para orientarse.

### Primeros Pasos Recomendados

1. **Revise su perfil** - Haga clic en su avatar en la esquina superior derecha y seleccione "Perfil" para verificar que los datos de su cuenta son correctos.
2. **Explore el panel de control** - Familiaricese con las tarjetas KPI y las analiticas para comprender las metricas actuales de la plataforma.
3. **Verifique las verificaciones pendientes** - Navegue al modulo de Verificaciones para ver si hay elementos esperando revision.
4. **Explore los usuarios activos** - Visite el modulo de Usuarios y ordene por "Fecha de Registro" descendente para ver los registros mas recientes.
5. **Revise las categorias** - Asegurese de que las categorias de mascotas estan configuradas correctamente para su region.

### Recomendaciones de Navegador

El portal de administracion funciona mejor en navegadores modernos:

| Navegador | Version Minima |
|-----------|---------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Consejo:** Habilite las notificaciones del navegador cuando se le solicite para recibir alertas en tiempo real sobre verificaciones pendientes y eventos importantes del sistema.

### Atajos de Teclado

| Atajo | Accion |
|-------|--------|
| `/` | Enfocar la barra de busqueda global |
| `Esc` | Cerrar paneles y modales abiertos |

---

## Solucion de Problemas de Inicio de Sesion

| Problema | Solucion |
|----------|----------|
| Error "Credenciales invalidas" | Verifique su correo electronico y contrasena. Use el flujo de Olvidaste tu Contrasena si es necesario. |
| Mensaje "Cuenta deshabilitada" | Su cuenta ha sido desactivada. Contacte a un super administrador. |
| La pagina carga pero el formulario de inicio de sesion esta en blanco | Limpie la cache y las cookies de su navegador, luego recargue. |
| Redirigido de vuelta al inicio de sesion despues de iniciar sesion | Su sesion puede haber expirado. Intente iniciar sesion de nuevo. Si persiste, verifique que las cookies estan habilitadas. |

---

## Obtener Ayuda

Si encuentra problemas no cubiertos en esta guia:

1. Consulte las otras secciones de este manual de usuario para ayuda especifica por modulo.
2. Contacte al super administrador de su organizacion para problemas de roles y acceso.
3. Para problemas tecnicos, comuniquese con el equipo de soporte de la plataforma.

---

*Siguiente: [Panel de Control](./dashboard.md) - Conozca la vista general de analiticas y KPIs.*
