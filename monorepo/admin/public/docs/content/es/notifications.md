# Notificaciones

La pagina de Notificaciones permite a los administradores componer y enviar notificaciones push a los usuarios de la aplicacion movil de Petfolioo. Puede dirigirse a segmentos especificos de audiencia, revisar el historial de notificaciones y seguir mejores practicas para comunicacion efectiva.

![Notifications](/docs/screenshots/notifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Send, Delete |
> | Admin | View, Send |
> | Moderator | View |
> | Viewer | View only |

---

## Vista General

Las notificaciones push son un canal directo hacia sus usuarios. Uselas para anunciar nuevas funciones, compartir actualizaciones importantes, enviar recordatorios o involucrar segmentos especificos de usuarios. Esta pagina proporciona tanto las herramientas de composicion como un registro historico de todas las notificaciones enviadas previamente.

---

## Componer Notificacion

El compositor de notificaciones es la herramienta principal para crear y enviar notificaciones push a los usuarios de la app.

### Acceder al Compositor

1. Navegue a la pagina de **Notificaciones** desde el menu lateral.
2. El formulario de composicion se muestra en la parte superior de la pagina.

### Campos del Formulario

| Campo | Descripcion | Requisitos |
|-------|-------------|------------|
| **Titulo** | El titular de la notificacion mostrado prominentemente en el dispositivo del usuario | Requerido. Maximo 65 caracteres recomendados para visibilidad completa. |
| **Cuerpo del Mensaje** | El contenido detallado de la notificacion | Requerido. Maximo 240 caracteres recomendados. |
| **Audiencia** | El grupo objetivo de usuarios que recibiran esta notificacion | Requerido. Seleccione de segmentos predefinidos. |

---

## Componer una Notificacion

Siga estos pasos para crear y enviar una notificacion:

### Paso 1: Introducir el Titulo

1. Haga clic en el campo de entrada del **Titulo**.
2. Escriba un titular conciso y que capture la atencion.
3. Mantengalo por debajo de 65 caracteres para evitar truncamiento en dispositivos mas pequenos.

> **Consejo:** Use lenguaje orientado a la accion en los titulos. "Nuevo: Rastrea las Vacunaciones de tu Mascota" es mas atractivo que "Actualizacion de Funcion de Vacunacion."

### Paso 2: Escribir el Cuerpo del Mensaje

1. Haga clic en el area de texto del **Cuerpo del Mensaje**.
2. Escriba el mensaje detallado que quiere que los usuarios vean.
3. Incluya informacion relevante como que accion debe tomar el usuario.
4. Mantenga el mensaje por debajo de 240 caracteres para una visualizacion optima.

### Paso 3: Seleccionar la Audiencia

1. Haga clic en el selector desplegable de **Audiencia**.
2. Elija uno de los siguientes segmentos de audiencia:

| Audiencia | Descripcion |
|-----------|-------------|
| **Todos los Usuarios** | Envia la notificacion a cada usuario registrado de la app |
| **Duenos de Perros** | Dirigida a usuarios que tienen al menos un perro registrado en su perfil |
| **Duenos de Gatos** | Dirigida a usuarios que tienen al menos un gato registrado en su perfil |
| **Criadores Verificados** | Dirigida a usuarios que han sido verificados como criadores profesionales |

3. La audiencia seleccionada determina quien recibira la notificacion push.

> **Nota:** Un usuario puede pertenecer a multiples segmentos. Por ejemplo, un criador verificado que posee perros recibira notificaciones dirigidas a "Duenos de Perros", "Criadores Verificados" y "Todos los Usuarios".

### Paso 4: Revisar Antes de Enviar

1. Verifique el titulo en busca de errores tipograficos y claridad.
2. Revise el cuerpo del mensaje para precision y tono.
3. Confirme que el segmento de audiencia es correcto.
4. Verifique que esto no es un duplicado de una notificacion enviada recientemente.

---

## Confirmacion de Envio

Cuando este listo para enviar la notificacion, un paso de confirmacion asegura que no envie accidentalmente a la audiencia incorrecta.

### Proceso de Envio

1. Haga clic en el boton **Enviar Notificacion**.
2. Aparece un dialogo de confirmacion mostrando:
   - El titulo de la notificacion
   - El cuerpo del mensaje
   - El segmento de audiencia seleccionado
   - El numero estimado de destinatarios
3. Revise todos los detalles en el dialogo de confirmacion.
4. Haga clic en **Confirmar Envio** para despachar la notificacion.
5. Alternativamente, haga clic en **Cancelar** para regresar al compositor y hacer cambios.
6. Tras la entrega exitosa, aparece un mensaje de exito confirmando que la notificacion fue puesta en cola.

> **Importante:** Una vez confirmada, la notificacion no puede ser retirada. Siempre verifique la audiencia y el contenido antes de confirmar.

---

## Historial de Notificaciones

Debajo del formulario de composicion, la seccion de Historial de Notificaciones muestra una lista cronologica de todas las notificaciones enviadas previamente.

### Columnas de la Lista del Historial

| Columna | Descripcion |
|---------|-------------|
| **Etiqueta de Tipo** | Una etiqueta de color indicando el segmento de audiencia (ej., "Todos los Usuarios" en azul, "Duenos de Perros" en naranja) |
| **Titulo** | El titulo de la notificacion como fue enviado |
| **Mensaje** | Una vista previa del cuerpo del mensaje (truncado si es largo) |
| **Fecha** | La fecha y hora en que se envio la notificacion |
| **Conteo de Destinatarios** | El numero de usuarios que recibieron la notificacion |

### Ver el Historial

1. Desplacese hacia abajo debajo del formulario de composicion para ver la lista del historial.
2. Las notificaciones se listan en orden cronologico inverso (mas reciente primero).
3. Cada fila muestra la etiqueta de tipo, titulo, fecha y conteo de destinatarios de un vistazo.
4. Haga clic en cualquier fila para expandir y ver el cuerpo completo del mensaje.

### Comprender las Etiquetas de Tipo

Las etiquetas de tipo estan codificadas por color para identificacion rapida:

| Color de Etiqueta | Audiencia |
|-------------------|-----------|
| Azul | Todos los Usuarios |
| Naranja | Duenos de Perros |
| Morado | Duenos de Gatos |
| Verde | Criadores Verificados |

---

## Mejores Practicas para Notificaciones Push

Las notificaciones push efectivas impulsan el compromiso sin molestar a los usuarios. Siga estas directrices:

### Frecuencia

1. **Limite la frecuencia** -- No envie mas de 2-3 notificaciones por semana a menos que sea urgente.
2. **Agrupe actualizaciones relacionadas** -- Combine multiples actualizaciones pequenas en una sola notificacion.
3. **Respete las zonas horarias** -- Envie notificaciones durante horas razonables (9 AM - 8 PM hora local).
4. **Evite fines de semana** -- A menos que la notificacion sea sensible al tiempo, prefiera dias laborables.

### Calidad del Contenido

1. **Sea conciso** -- Vaya al punto rapidamente. Los usuarios deciden en segundos si interactuar.
2. **Sea accionable** -- Diga a los usuarios que pueden hacer: "Revisa las proximas vacunaciones de tu mascota."
3. **Sea relevante** -- Use la segmentacion de audiencia para asegurar que el contenido coincida con los intereses del usuario.
4. **Evite clickbait** -- Las notificaciones enganosas erosionan la confianza y aumentan las tasas de desactivacion.
5. **Personalice cuando sea posible** -- Haga referencia al segmento de audiencia: "Atencion Duenos de Perros" se siente mas personal.

### Momento y Contexto

1. **Nuevas funciones** -- Envie cuando la funcion este activa y accesible.
2. **Recordatorios de salud** -- Envie unos dias antes de la cita o vacunacion de una mascota.
3. **Contenido estacional** -- Alinee con las estaciones (ej., recordatorios de pulgas/garrapatas en primavera).
4. **Actualizaciones de emergencia** -- Para problemas urgentes (mantenimiento, seguridad), envie inmediatamente independientemente de las reglas de horario.

### Escribir Titulos Efectivos

| Buen Ejemplo | Por Que Funciona |
|--------------|-----------------|
| "La Vacunacion de tu Mascota Vence Pronto" | Relevante, crea urgencia, accion clara |
| "Nuevo: Seguimiento de Embarazo para Criadores" | Destaca nuevo valor, dirigido a audiencia |
| "Mantenimiento Esta Noche a las 10 PM" | Claro, especifico, sensible al tiempo |

| Mal Ejemplo | Por Que Falla |
|-------------|--------------|
| "Mira esto!" | Vago, sin propuesta de valor |
| "Actualizacion" | Demasiado generico, los usuarios lo ignoraran |
| "Importante!!!" | Uso excesivo de urgencia, se siente spam |

### Medir el Exito

Despues de enviar notificaciones, monitoree:

- **Tasas de apertura** -- Estan los usuarios interactuando con sus notificaciones?
- **Tasas de desactivacion** -- Un pico indica fatiga de notificaciones.
- **Actividad en la app** -- Una notificacion impulsa el comportamiento esperado?
- **Retroalimentacion** -- Revise la pagina de Retroalimentacion para reacciones de usuarios.

---

## Detalles de Segmentos de Audiencia

### Todos los Usuarios

- Incluye cada cuenta registrada en el sistema.
- Use para anuncios de toda la plataforma, avisos de mantenimiento o funciones universales.
- Audiencia mas grande -- use con moderacion para evitar fatiga de notificaciones.

### Duenos de Perros

- Incluye usuarios con al menos un perro en su perfil de mascotas.
- Use para consejos de salud especificos de perros, eventos de raza o actualizaciones de funciones.
- Ejemplo: "Recordatorio: Prevencion anual de gusano del corazon para perros."

### Duenos de Gatos

- Incluye usuarios con al menos un gato en su perfil de mascotas.
- Use para contenido especifico de gatos, consejos de salud para interiores o funciones felinas.
- Ejemplo: "Nuevo: Seguimiento de actividad en interiores para gatos."

### Criadores Verificados

- Incluye usuarios que han completado la verificacion de criador.
- Use para funciones especificas de cria, actualizaciones de cumplimiento o herramientas profesionales.
- Ejemplo: "Mejoras en el rastreador de embarazo ahora disponibles."

---

## Solucion de Problemas

| Problema | Solucion |
|----------|----------|
| La notificacion no se envia | Verifique que todos los campos requeridos estan completados. Compruebe la conectividad de red. |
| El conteo de destinatarios muestra 0 | El segmento de audiencia seleccionado puede estar vacio. Verifique que existan usuarios en ese segmento. |
| Los usuarios reportan no recibir | Los usuarios pueden haber deshabilitado las notificaciones push en su dispositivo. Esto esta fuera del control del admin. |
| Notificacion duplicada enviada | Verifique la lista del historial antes de enviar. No hay forma de deshacer una vez confirmada. |

---

## Paginas Relacionadas

- [Retroalimentacion](./feedback.md) -- Monitorear reacciones de usuarios a las notificaciones
- [Analiticas](./analytics.md) -- Rastrear tendencias de compromiso de usuarios
- [Configuracion](./settings.md) -- Configurar ajustes del sistema relacionados con notificaciones
