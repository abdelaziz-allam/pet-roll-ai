# Gestion de Retroalimentacion

La pagina de Gestion de Retroalimentacion permite a los administradores ver, responder y organizar la retroalimentacion de usuarios enviada a traves de la aplicacion movil de Petfolioo. Este es su centro para comprender las necesidades de los usuarios, rastrear errores y gestionar sugerencias de funciones.

![Feedback](/docs/screenshots/feedback.png)

---

## Vista General

Cuando navega a la pagina de Retroalimentacion, vera una fila de estadisticas en la parte superior resumiendo el estado actual de toda la retroalimentacion, seguida de areas de contenido con pestanas y controles de filtrado.

---

## Fila de Estadisticas

En la parte superior de la pagina, cuatro tarjetas de metricas muestran conteos en tiempo real:

| Metrica | Descripcion |
|---------|-------------|
| **Total** | El numero total de entradas de retroalimentacion recibidas en todos los estados |
| **Abiertas** | Entradas de retroalimentacion que aun no han sido respondidas o cerradas |
| **Respondidas** | Entradas de retroalimentacion donde un admin ha publicado al menos una respuesta |
| **TODO** | Entradas de retroalimentacion fijadas por un admin para seguimiento |

> **Consejo:** Use el conteo de TODO como un indicador rapido de elementos pendientes que necesitan atencion. Si este numero crece, considere hacer triaje con su equipo.

---

## Pestanas

La pagina de Retroalimentacion esta organizada en dos pestanas:

### Toda la Retroalimentacion

1. Haga clic en la pestana **Toda la Retroalimentacion** (seleccionada por defecto).
2. Esta vista muestra cada entrada de retroalimentacion en el sistema independientemente del estado.
3. Las entradas se ordenan por fecha, con las mas recientes apareciendo primero.
4. Use los filtros (descritos abajo) para limitar los resultados.

### Lista TODO

1. Haga clic en la pestana **Lista TODO**.
2. Esta vista muestra solo las entradas de retroalimentacion que han sido fijadas como TODO por un admin.
3. Use esta pestana durante reuniones de triaje del equipo o revisiones diarias.
4. Los elementos permanecen aqui hasta que se desfijan.

---

## Filtros

Debajo de las pestanas, una barra de filtros proporciona varios controles para limitar las entradas de retroalimentacion mostradas.

### Filtro de Estado

1. Localice el desplegable de **Estado** en la barra de filtros.
2. Haga clic para expandir y seleccione uno de los siguientes:
   - **Todos** -- Muestra retroalimentacion en cualquier estado
   - **Abiertas** -- Muestra solo retroalimentacion no resuelta
   - **Respondidas** -- Muestra retroalimentacion con al menos una respuesta del admin
   - **Cerradas** -- Muestra retroalimentacion marcada como resuelta
3. La lista se actualiza inmediatamente tras la seleccion.

### Filtro de Tipo

1. Localice el desplegable de **Tipo** en la barra de filtros.
2. Seleccione la categoria de retroalimentacion que quiere ver:
   - **Todos los Tipos** -- Sin filtro de tipo aplicado
   - **Error** -- Problemas o defectos reportados por usuarios
   - **Sugerencia** -- Solicitudes de funciones e ideas de mejora
   - **General** -- Comentarios o preguntas generales
3. Cada entrada de retroalimentacion esta etiquetada con su insignia de tipo para identificacion visual rapida.

### Filtro de Rango de Fechas

1. Haga clic en el selector de **Rango de Fechas** en la barra de filtros.
2. Seleccione una fecha de inicio y una fecha de fin del widget de calendario.
3. Solo se mostrara la retroalimentacion enviada dentro del rango seleccionado.
4. Para limpiar el filtro de fecha, haga clic en el icono de limpiar en el selector de fecha.

### Alternancia Solo TODOs

1. Localice el interruptor de alternancia **Solo TODOs** en la barra de filtros.
2. Activelo para mostrar solo entradas de retroalimentacion fijadas como TODO.
3. Esto proporciona una alternativa rapida a cambiar a la pestana Lista TODO mientras permanece en la vista de Toda la Retroalimentacion con otros filtros aplicados.

> **Consejo:** Combine filtros para consultas poderosas. Por ejemplo, configure Tipo en "Error" y Estado en "Abiertas" para ver todos los reportes de errores no resueltos.

---

## Entradas de Retroalimentacion

Cada entrada de retroalimentacion en la lista muestra la siguiente informacion:

| Campo | Descripcion |
|-------|-------------|
| **Info del Usuario** | Nombre para mostrar, correo electronico y avatar del usuario que envio |
| **Mensaje** | El texto completo de la retroalimentacion enviada por el usuario |
| **Insignia de Tipo** | Una insignia de color indicando Error (rojo), Sugerencia (azul) o General (gris) |
| **Fecha** | La fecha y hora en que se envio la retroalimentacion |
| **Estado** | Indicador de estado actual (Abierta, Respondida o Cerrada) |
| **Pin TODO** | Un icono de pin indicando si esta entrada esta marcada para seguimiento |

### Ver una Entrada de Retroalimentacion

1. Localice la entrada de retroalimentacion en la lista.
2. Haga clic en la fila de la entrada o el icono de expansion para abrir la vista de detalle.
3. La vista de detalle muestra el mensaje completo, informacion del usuario y cualquier respuesta anterior del admin.

---

## Responder a la Retroalimentacion

Los administradores pueden responder a la retroalimentacion de los usuarios. Las respuestas son visibles para el usuario dentro de la aplicacion movil.

### Pasos para Responder

1. Abra la entrada de retroalimentacion a la que quiere responder.
2. Localice el area de texto de **Respuesta** en la parte inferior de la vista de detalle.
3. Escriba su mensaje de respuesta en el area de texto.
4. Revise su mensaje para claridad y profesionalismo.
5. Haga clic en el boton **Enviar Respuesta**.
6. Aparecera un mensaje de confirmacion indicando que la respuesta fue enviada exitosamente.
7. El estado de la retroalimentacion cambia automaticamente a **Respondida**.

> **Importante:** Su respuesta sera visible para el usuario en la app movil de Petfolioo. Asegurese de que su respuesta sea util, profesional y aborde la preocupacion del usuario directamente.

### Mejores Practicas para Respuestas

- Reconozca la retroalimentacion del usuario antes de proporcionar una solucion.
- Si el problema es un error conocido, deje saber al usuario que se esta trabajando en ello.
- Para sugerencias, agradezca al usuario y explique si la funcion esta siendo considerada.
- Evite jerga tecnica que los usuarios finales puedan no entender.
- Mantenga las respuestas concisas pero completas.

---

## Respuestas Anteriores del Admin

Al ver una entrada de retroalimentacion que ha recibido respuestas, todas las respuestas anteriores del admin se muestran en linea en orden cronologico.

1. Abra la vista de detalle de la entrada de retroalimentacion.
2. Desplacese hacia abajo para ver el hilo de conversacion.
3. Cada respuesta muestra:
   - El nombre del admin que publico la respuesta
   - La fecha y hora de la respuesta
   - El texto completo de la respuesta
4. Las nuevas respuestas aparecen en la parte inferior del hilo.

> **Consejo:** Revise las respuestas anteriores antes de publicar una nueva para evitar respuestas duplicadas o contradictorias.

---

## Cerrar Retroalimentacion

Cuando un elemento de retroalimentacion ha sido completamente abordado, puede cerrarlo para indicar que no se requiere mas accion.

### Pasos para Cerrar

1. Abra la entrada de retroalimentacion que quiere cerrar.
2. Haga clic en el boton **Cerrar** (o seleccione "Cerrar" del menu de acciones).
3. Aparecera un dialogo de confirmacion pidiendole que confirme.
4. Haga clic en **Confirmar** para cerrar la retroalimentacion.
5. El estado de la entrada cambia a **Cerrada**.
6. Las entradas cerradas permanecen en el sistema y se pueden ver configurando el filtro de estado a "Cerradas".

> **Nota:** Cerrar la retroalimentacion no la elimina. Aun puede ver entradas cerradas y reabrirlas si es necesario.

---

## Fijar / Desfijar como TODO

La funcion de pin TODO permite a los admins marcar entradas de retroalimentacion especificas para seguimiento. Los elementos fijados aparecen en la pestana Lista TODO y contribuyen al conteo TODO en la fila de estadisticas.

### Fijar Retroalimentacion como TODO

1. Localice la entrada de retroalimentacion que quiere marcar para seguimiento.
2. Haga clic en el icono de **Pin** (chincheta) en la fila de la entrada, o abra la vista de detalle y haga clic en **Fijar como TODO**.
3. La entrada se agrega inmediatamente a la Lista TODO.
4. El contador TODO en la fila de estadisticas se incrementa en uno.
5. Un icono de pin aparece en la entrada indicando su estado TODO.

### Desfijar Retroalimentacion

1. Localice la entrada de retroalimentacion fijada (use la pestana Lista TODO o el filtro Solo TODOs).
2. Haga clic en el icono de **Desfijar** en la fila de la entrada, o abra la vista de detalle y haga clic en **Quitar de TODO**.
3. La entrada se elimina de la Lista TODO.
4. El contador TODO en la fila de estadisticas se decrementa en uno.

### Cuando Usar Pins TODO

- Un elemento de retroalimentacion requiere investigacion antes de responder.
- Necesita opinion de otro miembro del equipo antes de responder.
- El problema esta relacionado con un proximo lanzamiento y debe rastrearse.
- Una sugerencia necesita discutirse en la proxima reunion de planificacion.

---

## Resumen del Flujo de Trabajo

El flujo de trabajo recomendado para manejar retroalimentacion es:

1. **Revisar** -- Verifique la fila de estadisticas diariamente para nueva retroalimentacion abierta.
2. **Triaje** -- Use filtros para priorizar errores sobre sugerencias.
3. **Fijar** -- Marque elementos complejos como TODO para seguimiento posterior.
4. **Responder** -- Responda elementos sencillos inmediatamente.
5. **Colaborar** -- Use la pestana Lista TODO en revisiones de equipo.
6. **Cerrar** -- Marque elementos resueltos como cerrados despues de confirmar que el problema del usuario esta abordado.

---

## Atajos de Teclado

| Atajo | Accion |
|-------|--------|
| `Enter` | Abrir entrada de retroalimentacion seleccionada |
| `R` | Enfocar el area de texto de respuesta (cuando la entrada esta abierta) |
| `T` | Alternar pin TODO en la entrada seleccionada |
| `Esc` | Cerrar la vista de detalle |

---

## Solucion de Problemas

| Problema | Solucion |
|----------|----------|
| La respuesta no se envia | Verifique su conexion de red e intente de nuevo. Asegurese de que el mensaje no este vacio. |
| Los filtros no se actualizan | Actualice la pagina. Si el problema persiste, limpie la cache del navegador. |
| Conteo TODO incorrecto | El conteo se actualiza al cargar la pagina. Navegue fuera y regrese para actualizar. |
| No puedo ver retroalimentacion cerrada | Configure el filtro de Estado a "Cerradas" o "Todos" para ver entradas cerradas. |

---

## Paginas Relacionadas

- [Notificaciones](./notifications.md) -- Enviar anuncios a usuarios
- [Usuarios Administradores](./admin-users.md) -- Gestionar quien puede responder retroalimentacion
- [Configuracion](./settings.md) -- Configurar preferencias del sistema
