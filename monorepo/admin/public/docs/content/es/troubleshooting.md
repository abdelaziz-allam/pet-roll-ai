# Solucion de Problemas

Soluciones a problemas comunes que puedes encontrar al usar el Portal de Administracion de Petfolioo.

---

## Problemas de Inicio de Sesion

### No puedo iniciar sesion

**Problema:** Ingresas tus credenciales pero el inicio de sesion falla o ves un mensaje de error.

**Posibles causas:**
- Direccion de correo electronico o contrasena incorrectos
- Tu cuenta ha sido desactivada por un Super Admin
- El servicio de autenticacion no esta disponible temporalmente
- Tu cuenta aun no ha sido creada en el Portal de Administracion

**Solucion:**
1. Verifica que estas usando la direccion de correo electronico asociada con tu cuenta de administrador (no tu correo personal o de usuario de la app).
2. Asegurate de que Bloq Mayus este desactivado y no haya espacios al final de tu contrasena.
3. Intenta restablecer tu contrasena usando el enlace "Olvide mi contrasena".
4. Si el problema persiste, contacta a un Super Admin para confirmar que tu cuenta existe y esta activa.
5. Si el servicio parece estar caido, espera unos minutos e intenta de nuevo.

---

### Olvide mi contrasena

**Problema:** No puedes recordar tu contrasena del Portal de Administracion.

**Posibles causas:**
- La contrasena fue cambiada y no se guardo
- Estas usando credenciales de un sistema diferente

**Solucion:**
1. En la pagina de inicio de sesion, haz clic en "Olvide mi contrasena".
2. Ingresa la direccion de correo electronico asociada con tu cuenta de administrador.
3. Revisa tu bandeja de entrada (y la carpeta de spam) en busca del correo de restablecimiento de contrasena.
4. Haz clic en el enlace de restablecimiento y crea una nueva contrasena.
5. Si no recibes el correo dentro de 5 minutos, contacta a un Super Admin para restablecer tu cuenta manualmente.

---

### Mi sesion expiro

**Problema:** Estabas conectado pero de repente fuiste redirigido a la pagina de inicio de sesion.

**Posibles causas:**
- Tu sesion excedio el periodo de tiempo limite automatico (tipicamente 30 minutos de inactividad)
- Un Super Admin cambio la configuracion de tu cuenta o rol
- El servidor fue reiniciado durante un despliegue

**Solucion:**
1. Inicia sesion nuevamente con tus credenciales. Tu trabajo no guardado puede haberse perdido.
2. Si las sesiones expiran con mucha frecuencia, asegurate de que tu navegador no este bloqueando cookies para el dominio del Portal de Administracion.
3. Guarda tu trabajo regularmente para evitar perdida de datos por tiempos de espera de sesion.

---

## Problemas de Permisos

### No puedo ver una pagina a la que deberia tener acceso

**Problema:** Un enlace de navegacion o pagina que esperas tener acceso no es visible o devuelve una pantalla en blanco.

**Posibles causas:**
- Tu rol no incluye permiso para ver esa pagina
- Tu rol fue cambiado recientemente y el cambio aun no ha tomado efecto
- Un problema de cache del navegador esta sirviendo una version obsoleta de la navegacion

**Solucion:**
1. Verifica tu rol actual mirando tu perfil o preguntando a un Super Admin. Consulta la guia de Roles y Permisos para ver que paginas puede acceder tu rol.
2. Si tu rol fue cambiado recientemente, cierra sesion y vuelve a iniciar sesion para actualizar tus permisos.
3. Limpia la cache de tu navegador o intenta abrir el portal en una ventana privada/incognito.
4. Si crees que tu rol deberia otorgar acceso a la pagina, contacta a un Super Admin para revisar tus permisos.

---

### Faltan botones en una pagina

**Problema:** Puedes ver una pagina pero ciertos botones de accion (Edit, Delete, Approve, etc.) no se muestran.

**Posibles causas:**
- Tu rol tiene acceso de solo lectura a esa pagina (ej., rol Viewer)
- El elemento esta en un estado donde esas acciones no estan disponibles (ej., ya aprobado)
- Un problema de renderizado de UI

**Solucion:**
1. Consulta la documentacion de Roles y Permisos para confirmar si tu rol tiene acceso de escritura a esa funcionalidad.
2. Verifica que el estado actual del elemento permite la accion que esperas (ej., no puedes aprobar una verificacion ya aprobada).
3. Actualiza la pagina. Si los botones aun no aparecen, intenta con un navegador diferente.
4. Si tu rol deberia tener esos botones, contacta a un Super Admin.

---

### Recibo un error 403

**Problema:** El portal muestra un error "403 Forbidden" cuando intentas acceder a una pagina o realizar una accion.

**Posibles causas:**
- Estas intentando una accion que tu rol explicitamente no permite
- Tu token de sesion se ha invalidado
- Tu rol fue degradado mientras estabas conectado

**Solucion:**
1. Anota que pagina o accion genero el error.
2. Cierra sesion y vuelve a iniciar sesion para actualizar tu sesion y permisos.
3. Si el error persiste, tu rol no tiene acceso a ese recurso. Contacta a un Super Admin si necesitas permisos elevados.

---

## Problemas de Datos

### Los cambios que hice no se muestran

**Problema:** Editaste un registro (mascota, usuario, publicacion del blog, etc.) pero los cambios no se reflejan en el portal.

**Posibles causas:**
- La operacion de guardado fallo silenciosamente debido a un problema de red
- Tu navegador esta mostrando una version en cache de la pagina
- Otro administrador sobrescribio tus cambios simultaneamente

**Solucion:**
1. Actualiza la pagina usando Ctrl+Shift+R (o Cmd+Shift+R en Mac) para omitir la cache.
2. Verifica si el registro muestra tus cambios. Si no, vuelve a aplicar la edicion y observa si hay mensajes de error al guardar.
3. Asegurate de tener una conexion a internet estable.
4. Si trabajas en registros compartidos, coordinarte con otros administradores para evitar ediciones conflictivas.

---

### Export no funciona

**Problema:** Al hacer clic en el boton Export no pasa nada, o el archivo descargado esta vacio o corrupto.

**Posibles causas:**
- Tu navegador esta bloqueando la descarga (bloqueador de pop-ups o restricciones de descarga)
- El conjunto de datos es demasiado grande y la exportacion agoto el tiempo
- Tu rol no tiene permisos de Export

**Solucion:**
1. Verifica si tu navegador bloqueo una descarga o pop-up. Busca una notificacion en la barra de direcciones.
2. Desactiva cualquier bloqueador de pop-ups para el dominio del Portal de Administracion.
3. Si el conjunto de datos es muy grande, intenta aplicar filtros para reducir el numero de registros antes de exportar.
4. Intenta un formato de exportacion diferente (ej., CSV en lugar de PDF) ya que puede procesarse mas rapido.
5. Si el problema persiste, contacta a un Super Admin para verificar que tu rol incluye permisos de Export.

---

### La busqueda no devuelve resultados

**Problema:** Buscas un registro que sabes que existe pero obtienes un conjunto de resultados vacio.

**Posibles causas:**
- Un error tipografico o espacio extra en la consulta de busqueda
- El campo de busqueda esta filtrando por una columna especifica (ej., buscando por nombre cuando ingresaste un ID)
- El registro fue eliminado o esta en un estado diferente al esperado

**Solucion:**
1. Elimina cualquier espacio extra de tu consulta de busqueda.
2. Intenta buscar con menos caracteres o una coincidencia parcial.
3. Verifica en que campo esta filtrando la busqueda y asegurate de que tu consulta coincida con ese tipo de campo.
4. Elimina cualquier filtro activo que pueda estar excluyendo el registro.
5. Si buscas una mascota por Microchip ID, asegurate de ingresar el ID numerico completo sin guiones.

---

## Problemas de Notificaciones

### La notificacion push no se entrego

**Problema:** Enviaste una notificacion push pero los usuarios objetivo reportan que no la recibieron.

**Posibles causas:**
- El usuario ha desactivado las notificaciones push en su dispositivo
- El token del dispositivo del usuario ha expirado (la app fue desinstalada y reinstalada)
- La notificacion fue enviada al segmento de usuarios incorrecto
- Hay un retraso en el servicio de entrega de notificaciones push

**Solucion:**
1. Revisa el registro de entrega de notificaciones en la pagina de Notifications para ver el estado de envio.
2. Verifica que seleccionaste la audiencia objetivo correcta (usuario especifico, segmento o todos los usuarios).
3. Ten en cuenta que las notificaciones push pueden tardar unos minutos en entregarse dependiendo del dispositivo y las condiciones de red.
4. Si un usuario especifico no recibe notificaciones consistentemente, su token de dispositivo puede ser invalido. Deben abrir la app y reactivar las notificaciones en la configuracion de su dispositivo.
5. Para notificaciones masivas, permite hasta 15 minutos para que la entrega se complete a todos los usuarios.

---

### No puedo enviar notificaciones

**Problema:** El boton "Send Notification" esta deshabilitado o recibes un error al intentar enviar.

**Posibles causas:**
- Tu rol no tiene permisos de envio de notificaciones (Viewers y algunos Moderators)
- Los campos requeridos (titulo, cuerpo, audiencia objetivo) no estan completados
- El servicio de notificaciones no esta disponible temporalmente

**Solucion:**
1. Asegurate de que todos los campos requeridos esten completados: titulo, cuerpo del mensaje y al menos una seleccion de audiencia objetivo.
2. Verifica que tu rol tiene permiso para enviar notificaciones (se requiere rol Admin o Super Admin).
3. Si todos los campos estan completados y tienes el rol correcto, intenta actualizar la pagina e intentar nuevamente.
4. Si el error menciona un problema de servicio, espera unos minutos y reintenta. Si el problema persiste por mas de 30 minutos, reportalo al equipo tecnico.

---

## Problemas del Navegador

### La pagina no carga

**Problema:** El Portal de Administracion muestra una pagina en blanco, un spinner de carga que nunca termina o un error de conexion.

**Posibles causas:**
- Problema de conectividad a internet
- El servicio del Portal de Administracion esta caido o reiniciandose
- Extensiones del navegador interfiriendo con la carga de la pagina
- DNS o firewall bloqueando el dominio del portal

**Solucion:**
1. Verifica tu conexion a internet visitando otro sitio web.
2. Intenta actualizar la pagina con Ctrl+Shift+R (o Cmd+Shift+R en Mac).
3. Intenta abrir el portal en una ventana privada/incognito para descartar conflictos con extensiones.
4. Limpia la cache y cookies de tu navegador para el dominio del portal.
5. Si usas una red corporativa, verifica si un firewall o proxy esta bloqueando el acceso.
6. Si el portal esta caido para todos, puede estar en progreso un despliegue. Espera 5-10 minutos e intenta de nuevo.

---

### Las imagenes/capturas estan rotas

**Problema:** Las imagenes en el portal (fotos de mascotas, imagenes del blog, capturas en la documentacion) aparecen como iconos rotos o no cargan.

**Posibles causas:**
- El servicio de almacenamiento de imagenes no esta disponible temporalmente
- La imagen fue eliminada del almacenamiento pero la referencia permanece
- Una politica de seguridad de contenido esta bloqueando la carga de imagenes
- Conexion de red lenta causando tiempos de espera en la carga de imagenes

**Solucion:**
1. Actualiza la pagina para reintentar la carga de imagenes.
2. Verifica si el problema afecta a todas las imagenes o solo a algunas especificas. Si solo imagenes especificas estan rotas, pueden haber sido eliminadas del almacenamiento.
3. Haz clic derecho en una imagen rota y selecciona "Abrir imagen en nueva pestana". Si carga por separado, una extension del navegador puede estar bloqueando imagenes en linea.
4. Desactiva bloqueadores de anuncios o extensiones de seguridad temporalmente para probar.
5. Si el problema afecta a todas las imagenes del portal, reportalo al equipo tecnico ya que el servicio de almacenamiento puede necesitar atencion.

---

### El portal esta lento

**Problema:** Las paginas tardan mucho en cargar, las acciones se sienten lentas o el portal deja de responder.

**Posibles causas:**
- Conexion a internet lenta
- El navegador tiene demasiadas pestanas abiertas consumiendo memoria
- Conjuntos de datos grandes siendo cargados sin paginacion
- El servidor esta bajo carga pesada

**Solucion:**
1. Prueba tu velocidad de internet para descartar un problema de conectividad.
2. Cierra pestanas innecesarias del navegador para liberar memoria.
3. Si una pagina especifica es lenta (ej., Pet Registry con miles de registros), aplica filtros para reducir el tamano del conjunto de datos.
4. Limpia la cache de tu navegador, que puede haber crecido mucho con el tiempo.
5. Intenta con un navegador diferente para ver si el problema es especifico del navegador.
6. Si la lentitud es consistente entre multiples administradores, puede ser un problema del lado del servidor. Reportalo al equipo tecnico con las paginas especificas afectadas y tiempos de respuesta aproximados.
