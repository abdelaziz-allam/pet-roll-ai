# Inicio Rapido: Super Admin

Bienvenido al Portal de Administracion de Petfolioo. Como Super Admin, tienes acceso sin restricciones a todas las paginas, acciones y opciones de configuracion de la plataforma. Esta guia cubre tu primer dia, flujos de trabajo diarios y responsabilidades.

---

## Paginas Disponibles

| Pagina | Acciones Disponibles |
|--------|---------------------|
| Dashboard | View KPIs y analiticas de la plataforma |
| App Users | View, Create, Edit, Ban, Delete, Export |
| Pets | View, Edit, Delete |
| Pet Categories | View, Create, Edit, Delete |
| Verification | View, Approve, Reject |
| Mating | View, Edit, Delete, Moderate |
| Health Certs | View, Approve, Reject |
| Vax Analytics | View, Export |
| Feedback | View, Respond, Delete |
| Blog | View, Create, Edit, Delete |
| Notifications | View, Send, Delete |
| Analytics | View, Export |
| Admin Users | View, Create, Edit, Delete, Manage Permissions |
| Settings | View, Edit |

Tienes acceso a todo. Ninguna pagina esta oculta en tu barra lateral.

---

## Primeros Pasos Despues del Inicio de Sesion Inicial

1. **Verifica tu perfil** - Haz clic en tu avatar en la esquina superior derecha y confirma que los detalles de tu cuenta son correctos.
2. **Configura los ajustes de la plataforma** - Navega a Settings y revisa la configuracion general de la plataforma (marca, feature flags, valores predeterminados de notificaciones).
3. **Crea cuentas de administrador adicionales** - Ve a Admin Users y crea cuentas para los miembros de tu equipo con los roles apropiados.
4. **Configura las categorias de mascotas** - Visita Pet Categories y asegurate de que la taxonomia de especies y razas esta configurada para tu region.
5. **Revisa el Dashboard** - Familiarizate con las tarjetas de KPI para saber como luce lo "normal".

---

## Lista de Tareas Diarias

- [ ] Revisa el Dashboard para verificar el estado de la plataforma y detectar anomalias
- [ ] Revisa las verificaciones pendientes en la cola de Verification
- [ ] Examina Feedback en busca de quejas urgentes de usuarios o reportes de errores
- [ ] Revisa la lista de Admin Users para solicitudes de acceso o cuentas sospechosas
- [ ] Consulta Analytics para tendencias en crecimiento de usuarios y engagement
- [ ] Monitorea los listados de Mating en busca de banderas de moderacion
- [ ] Revisa las notificaciones enviadas por otros administradores para verificar su pertinencia
- [ ] Audita Settings periodicamente para detectar cambios inesperados

---

## Responsabilidades Clave

### Configuracion del Sistema
Eres el unico rol que puede acceder a la pagina de Settings. Esto incluye la marca de la plataforma, toggles de funcionalidades, claves de API y plantillas de notificaciones. Revisalos trimestralmente o al lanzar nuevas funcionalidades.

### Gestion de Usuarios
Solo tu puedes crear, editar y eliminar cuentas de administrador. Al incorporar nuevos miembros del equipo, asigna el rol minimo necesario (prefiere Moderator o Viewer a menos que genuinamente necesiten acceso de Admin).

### Supervision de Seguridad
- Mantiene el numero de cuentas Super Admin en un maximo de 2-3.
- Revisa la actividad de los usuarios administradores trimestralmente y suspende las cuentas inactivas.
- Eres el unico rol que puede eliminar usuarios de la app y exportar datos de usuarios, asi que gestiona las solicitudes de GDPR y datos personalmente.

### Punto de Escalacion
Otros roles escalaran hacia ti cuando necesiten acciones fuera de sus permisos: eliminar usuarios, exportar datos, cambiar configuraciones o gestionar cuentas de administrador.

---

## Consejos para Delegar Trabajo

| Tarea | Delegar A |
|-------|-----------|
| Revisiones diarias de verificacion | Admin o Moderator |
| Moderacion de Mating | Admin o Moderator |
| Correcciones de datos de mascotas | Admin o Moderator |
| Envio de notificaciones de la plataforma | Admin |
| Monitoreo y reportes de analiticas | Admin o Viewer |
| Bloqueo de usuarios problematicos | Admin o Moderator |
| Gestion de contenido del blog | Admin |

Reserva tu tiempo para tareas que solo tu puedes realizar: cambios en configuracion, gestion de usuarios administradores, exportaciones de datos y auditorias de seguridad. Cuanto mas delegues el trabajo operativo, mas capacidad tendras para la supervision estrategica.

---

## Obtener Ayuda

Como el rol de mayor privilegio, tu camino de soporte es la documentacion tecnica de la plataforma y el equipo de desarrollo. Para preguntas operativas, consulta las otras paginas de este manual de usuario.

---

*Siguiente: [Roles y Permisos](./roles-permissions.md) - Desglose completo de lo que cada rol puede hacer.*
