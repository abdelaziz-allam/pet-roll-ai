# Configuracion

La pagina de Configuracion proporciona opciones de configuracion a nivel de sistema para la plataforma Petfolioo. Las configuraciones estan organizadas en tres pestanas: General, Notificaciones y Seguridad. Los cambios realizados aqui afectan el comportamiento tanto del portal de administracion como de la aplicacion movil.

![Settings](/docs/screenshots/settings.png)

---

## Vista General

Solo los administradores con rol super_admin o admin (con acceso a la pagina de Configuracion) pueden ver y modificar las configuraciones. Todos los cambios requieren un guardado explicito y surten efecto inmediatamente al guardar.

---

## Acceder a la Configuracion

1. Haga clic en **Configuracion** en el menu de navegacion lateral.
2. La pagina de Configuracion se carga con tres pestanas en la parte superior.
3. La pestana **General** esta seleccionada por defecto.

---

## Pestana General

La pestana General contiene opciones de configuracion central de la aplicacion que definen como la plataforma se presenta y opera.

### Campos

| Campo | Descripcion | Predeterminado |
|-------|-------------|----------------|
| **Nombre de la App** | El nombre para mostrar de la aplicacion que aparece en notificaciones y correos | Petfolioo |
| **Correo de Soporte** | La direccion de correo de contacto mostrada a los usuarios para consultas de soporte | -- |
| **Idioma Predeterminado** | El idioma predeterminado para nuevos usuarios y comunicaciones del sistema | Ingles |
| **Modo Mantenimiento** | Alternancia para habilitar o deshabilitar el modo de mantenimiento | Desactivado |

### Configurar Ajustes Generales

#### Nombre de la App

1. Localice el campo **Nombre de la App**.
2. Borre el valor existente y escriba el nombre de aplicacion deseado.
3. Este nombre aparece en notificaciones push, encabezados de correo y la seccion "acerca de" de la app movil.

#### Correo de Soporte

1. Localice el campo **Correo de Soporte**.
2. Introduzca la direccion de correo electronico donde los usuarios deben dirigir consultas de soporte.
3. Este correo se muestra en la pantalla de ayuda/contacto de la app movil.

> **Consejo:** Use un correo de equipo compartido (ej., support@petfolioo.com) en lugar de una direccion personal para que multiples miembros del equipo puedan responder.

#### Idioma Predeterminado

1. Haga clic en el desplegable de **Idioma Predeterminado**.
2. Seleccione el idioma que se usara como predeterminado para:
   - Creacion de nuevas cuentas de usuario
   - Notificaciones generadas por el sistema
   - Plantillas de correo electronico
3. Los usuarios pueden anular esto en la configuracion individual de su app movil.

#### Modo Mantenimiento

El modo de mantenimiento es una funcion critica que senala a los usuarios que la plataforma esta temporalmente no disponible.

1. Localice la alternancia de **Modo Mantenimiento**.
2. Haga clic en la alternancia para habilitar el modo de mantenimiento.
3. Aparece un dialogo de advertencia confirmando la accion.

**Cuando el Modo Mantenimiento esta habilitado:**

| Efecto | Descripcion |
|--------|-------------|
| Advertencia en Portal Admin | Un banner prominente aparece en la parte superior del portal de administracion indicando que el modo de mantenimiento esta activo |
| Impacto en App Movil | La aplicacion movil muestra una pantalla de mantenimiento a los usuarios, impidiendo el uso normal |
| Comportamiento de API | Los endpoints de API devuelven respuestas de estado de mantenimiento |
| Acceso Admin | Los administradores aun pueden acceder al portal de administracion normalmente |

4. Para deshabilitar el modo de mantenimiento, haga clic en la alternancia de nuevo.
5. Confirme la accion en el dialogo.
6. La plataforma regresa a operacion normal inmediatamente.

> **Advertencia:** Habilitar el modo de mantenimiento afecta inmediatamente a todos los usuarios de la app movil. Solo habilitelo durante ventanas de mantenimiento planificadas y comunique el horario con anticipacion via notificacion push.

---

## Pestana de Notificaciones

La pestana de Notificaciones controla los comportamientos de notificacion automatizada -- las alertas generadas por el sistema enviadas a los usuarios basadas en los datos de sus mascotas.

### Campos

| Campo | Descripcion | Tipo | Predeterminado |
|-------|-------------|------|----------------|
| **Recordatorios de Vacunacion** | Enviar recordatorios automaticos cuando la vacunacion de una mascota se acerca a la fecha de vencimiento | Alternancia | Activado |
| **Alertas de Embarazo** | Enviar alertas para fechas de hitos de embarazo y parto esperado | Alternancia | Activado |
| **Actualizaciones de Cria** | Enviar actualizaciones sobre eventos de calendario de cria y confirmaciones | Alternancia | Activado |
| **Dias de Recordatorio Antes del Vencimiento** | Numero de dias antes de una fecha de vencimiento para enviar la notificacion de recordatorio | Entrada numerica | 7 |

### Configurar Ajustes de Notificaciones

#### Recordatorios de Vacunacion

1. Localice la alternancia de **Recordatorios de Vacunacion**.
2. Cuando esta **habilitada** (predeterminado):
   - Los usuarios reciben notificaciones push antes de las fechas de vencimiento de vacunacion de sus mascotas.
   - La notificacion se envia basandose en el ajuste "Dias de Recordatorio Antes del Vencimiento".
   - Ejemplo: Si se establece en 7 dias, los usuarios reciben un recordatorio una semana antes de que la vacunacion venza.
3. Cuando esta **deshabilitada**:
   - No se envian recordatorios automaticos de vacunacion.
   - Los usuarios deben verificar manualmente el calendario de vacunacion de su mascota.

#### Alertas de Embarazo

1. Localice la alternancia de **Alertas de Embarazo**.
2. Cuando esta **habilitada** (predeterminado):
   - Los usuarios que rastrean un embarazo reciben notificaciones de hitos.
   - Las alertas incluyen recordatorios de fecha de parto esperada y transiciones de etapa.
   - Los criadores reciben notificaciones adicionales de seguimiento profesional.
3. Cuando esta **deshabilitada**:
   - No se envian alertas automaticas relacionadas con embarazo.

#### Actualizaciones de Cria

1. Localice la alternancia de **Actualizaciones de Cria**.
2. Cuando esta **habilitada** (predeterminado):
   - Los usuarios reciben notificaciones sobre eventos programados de cria.
   - Se envian notificaciones de confirmacion cuando se registran registros de cria.
   - Los criadores reciben sugerencias de emparejamiento y recordatorios de calendario.
3. Cuando esta **deshabilitada**:
   - No se envian notificaciones automaticas relacionadas con cria.

#### Dias de Recordatorio Antes del Vencimiento

1. Localice la entrada numerica de **Dias de Recordatorio Antes del Vencimiento**.
2. Introduzca el numero de dias antes de una fecha de vencimiento en que deben enviarse los recordatorios.
3. Este valor se aplica a todos los recordatorios basados en fechas (vacunaciones, citas).
4. Rango valido: 1 a 30 dias.

> **Consejo:** Un valor de 7 dias funciona bien para la mayoria de los usuarios. Para criadores que gestionan multiples mascotas, considere establecerlo en 14 dias para dar mas tiempo de preparacion.

### Tabla de Interaccion de Notificaciones

| Ajuste | Afecta | Impacto al Usuario |
|--------|--------|-------------------|
| Recordatorios de Vacunacion ACTIVADOS + 7 dias | Usuarios con mascotas con vacunaciones proximas | "La vacunacion de rabia de Rex vence en 7 dias" |
| Alertas de Embarazo ACTIVADAS | Usuarios con registros de embarazo activos | "El embarazo de Luna ha entrado en la semana 6" |
| Actualizaciones de Cria ACTIVADAS | Usuarios con crias programadas | "Cita de cria con Max confirmada para el viernes" |
| Todas las alternancias DESACTIVADAS | Todos los usuarios | Sin notificaciones automatizadas; solo notificaciones manuales del admin |

---

## Pestana de Seguridad

La pestana de Seguridad contiene ajustes que controlan la limitacion de tasa de API, tiempos de vida de tokens de autenticacion y restricciones de subida de archivos.

### Campos

| Campo | Descripcion | Tipo | Predeterminado |
|-------|-------------|------|----------------|
| **Limite de Tasa Por Minuto** | Maximo de solicitudes API permitidas por usuario por minuto | Numero | 60 |
| **Expiracion de Token de Acceso (Horas)** | Cuanto tiempo un token de acceso permanece valido | Numero | 24 |
| **Expiracion de Token de Actualizacion (Dias)** | Cuanto tiempo un token de actualizacion permanece valido | Numero | 30 |
| **Tamano Maximo de Foto (MB)** | Tamano maximo de archivo permitido para fotos de mascotas | Numero | 5 |
| **Tamano Maximo de Avatar (MB)** | Tamano maximo de archivo permitido para avatares de usuario | Numero | 2 |
| **Tipos de Archivo Permitidos** | Lista separada por comas de tipos MIME aceptados para subidas | Texto | image/jpeg,image/png,image/webp |

### Configurar Ajustes de Seguridad

#### Limite de Tasa Por Minuto

1. Localice el campo **Limite de Tasa Por Minuto**.
2. Introduzca el numero maximo de solicitudes API que un solo usuario puede hacer por minuto.
3. Las solicitudes que excedan este limite reciben una respuesta 429 (Demasiadas Solicitudes).
4. Rango recomendado: 30-120 dependiendo de los patrones de uso esperados.

> **Importante:** Establecer esto demasiado bajo puede causar que la app movil funcione mal para usuarios activos. Establecerlo demasiado alto puede dejar el sistema vulnerable a abuso. El predeterminado de 60 es adecuado para la mayoria de las implementaciones.

#### Expiracion de Token de Acceso (Horas)

1. Localice el campo de **Expiracion de Token de Acceso**.
2. Introduzca el numero de horas que un token de acceso permanece valido despues de su emision.
3. Cuando un token expira, la app usa el token de actualizacion para obtener uno nuevo.
4. Valores mas cortos son mas seguros; valores mas largos reducen la friccion de inicio de sesion.

| Valor | Seguridad | Experiencia de Usuario |
|-------|-----------|----------------------|
| 1 hora | Alta | Re-autenticacion frecuente |
| 24 horas | Media | Buen balance (recomendado) |
| 72 horas | Menor | Interrupcion minima |

#### Expiracion de Token de Actualizacion (Dias)

1. Localice el campo de **Expiracion de Token de Actualizacion**.
2. Introduzca el numero de dias que un token de actualizacion permanece valido.
3. Cuando el token de actualizacion expira, el usuario debe iniciar sesion de nuevo con sus credenciales.
4. Rango recomendado: 7-90 dias.

> **Consejo:** Para una app de consumo como Petfolioo, 30 dias es un buen balance. Los usuarios que abren la app al menos mensualmente nunca necesitaran volver a iniciar sesion. Para implementaciones de mayor seguridad, considere 7 dias.

#### Tamano Maximo de Foto (MB)

1. Localice el campo **Tamano Maximo de Foto**.
2. Introduzca el tamano maximo de archivo en megabytes para subidas de fotos de mascotas.
3. Las fotos que excedan este tamano se rechazan con un mensaje de error.
4. Considere los costos de almacenamiento y tiempos de subida para usuarios con conexiones lentas.

| Valor | Adecuado Para |
|-------|--------------|
| 2 MB | Bajo almacenamiento, subidas rapidas, menor calidad |
| 5 MB | Equilibrado (recomendado) |
| 10 MB | Fotos de alta calidad, mas uso de almacenamiento |

#### Tamano Maximo de Avatar (MB)

1. Localice el campo **Tamano Maximo de Avatar**.
2. Introduzca el tamano maximo de archivo en megabytes para subidas de avatar de perfil de usuario.
3. Los avatares son tipicamente mas pequenos que las fotos de mascotas ya que se muestran a resolucion reducida.
4. Recomendado: 1-3 MB.

#### Tipos de Archivo Permitidos

1. Localice el campo **Tipos de Archivo Permitidos**.
2. Introduzca una lista separada por comas de tipos MIME que el sistema acepta para subidas.
3. Cada tipo MIME debe estar en el formato `tipo/subtipo`.
4. No agregue espacios entre entradas a menos que intencionalmente quiera que esten en la cadena del tipo MIME.

**Tipos MIME comunes para subidas de imagenes:**

| Tipo MIME | Formato | Notas |
|-----------|---------|-------|
| `image/jpeg` | JPEG | Formato de foto mas comun, buena compresion |
| `image/png` | PNG | Sin perdida, soporta transparencia |
| `image/webp` | WebP | Formato moderno, excelente compresion |
| `image/heic` | HEIC | Formato de Apple, usado por camaras de iPhone |
| `image/gif` | GIF | Imagenes animadas, tamanos de archivo mas grandes |

**Configuraciones de ejemplo:**

```
Estandar:     image/jpeg,image/png,image/webp
Extendido:    image/jpeg,image/png,image/webp,image/heic,image/gif
Minimo:       image/jpeg,image/png
```

> **Advertencia:** Agregar tipos MIME no soportados puede permitir subidas que el sistema no puede procesar. Solo agregue tipos que su pipeline de procesamiento de imagenes soporte.

---

## Guardar Configuracion

Todos los cambios de configuracion requieren una accion explicita de guardado.

### Pasos para Guardar

1. Realice los cambios deseados en cualquiera de las tres pestanas.
2. Haga clic en el boton **Guardar Configuracion** en la parte inferior de la pagina.
3. Un indicador de carga aparece mientras se aplican los cambios.
4. Una notificacion de exito confirma que la configuracion fue guardada.
5. Los cambios surten efecto inmediatamente en toda la plataforma.

### Notas Importantes Sobre el Guardado

- Los cambios **no** se guardan automaticamente. Si navega fuera sin guardar, los cambios se pierden.
- Puede modificar configuraciones en multiples pestanas antes de guardar -- todos los cambios se guardan juntos.
- Si ocurre un error de validacion, el campo especifico se resalta con un mensaje de error.
- Solo los campos que han cambiado se envian al servidor (actualizacion parcial optimista).

> **Consejo:** Despues de guardar cambios relacionados con seguridad (limites de tasa, expiracion de tokens), monitoree el sistema por un periodo corto para asegurar que no ocurra comportamiento inesperado.

---

## Auditoria de Cambios de Configuracion

Todas las modificaciones de configuracion se registran para seguridad y rendicion de cuentas:

| Informacion Registrada | Descripcion |
|------------------------|-------------|
| Nombre del admin | Quien realizo el cambio |
| Marca de tiempo | Cuando se realizo el cambio |
| Campo cambiado | Que configuracion fue modificada |
| Valor anterior | El valor antes del cambio |
| Valor nuevo | El valor despues del cambio |

---

## Solucion de Problemas

| Problema | Solucion |
|----------|----------|
| No puedo acceder a la pagina de Configuracion | Verifique que su rol es super_admin o admin con permiso de Configuracion otorgado. |
| Boton de guardar deshabilitado | No se han realizado cambios. Modifique al menos un campo para habilitar el guardado. |
| Error de validacion al guardar | Verifique el campo resaltado para el mensaje de error especifico y corrija el valor. |
| El modo de mantenimiento no afecta la app | Permita 1-2 minutos para que el cambio se propague a todas las instancias de la app movil. |
| Limite de tasa demasiado restrictivo | Aumente el valor y guarde. Los usuarios afectados seran desbloqueados dentro de un minuto. |
| Errores de subida de archivos despues del cambio de tipo | Asegurese de que los tipos MIME estan correctamente formateados sin comas ni espacios finales. |

---

## Paginas Relacionadas

- [Usuarios Administradores](./admin-users.md) -- Gestionar quien puede acceder y modificar la configuracion
- [Notificaciones](./notifications.md) -- Enviar notificaciones manuales a usuarios
- [Analiticas](./analytics.md) -- Monitorear la salud y uso de la plataforma
