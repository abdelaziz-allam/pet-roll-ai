# Certificaciones de Salud

El modulo de Certificaciones de Salud permite a los administradores gestionar y verificar certificados de salud de mascotas enviados por veterinarios o propietarios de mascotas. Esto asegura que las mascotas listadas en la plataforma tengan documentacion de salud valida y actualizada.

![Health Records](/docs/screenshots/health-certifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabla de Certificaciones

La vista principal muestra todos los envios de certificaciones de salud en una tabla de datos.

| Columna | Descripcion |
|---------|-------------|
| Nombre de Mascota | Nombre de la mascota a la que pertenece la certificacion |
| Info del Veterinario | Nombre del veterinario y clinica |
| Ubicacion | Pais y ciudad donde se emitio la certificacion |
| Fecha del Certificado | Fecha en que la certificacion fue emitida por el veterinario |
| Documentos | Numero de documentos de certificacion adjuntos |
| Estado | Insignia de estado actual de la certificacion |

### Acciones de la Tabla

- Haga clic en cualquier fila para abrir el **Panel de Detalle** en el lado derecho.
- Use los botones de accion en la ultima columna para aprobacion/rechazo rapido.
- Ordene por cualquier columna haciendo clic en el encabezado de columna.

---

## Filtros

La barra de filtros encima de la tabla proporciona cuatro opciones de filtrado:

### Filtro de Estado

Filtre certificaciones por su estado actual:

| Estado | Color de Insignia | Descripcion |
|--------|-------------------|-------------|
| Pendiente | Naranja | Esperando revision del administrador |
| Aprobado | Verde | Certificacion verificada y activa |
| Rechazado | Rojo | La certificacion no paso la revision |
| Revocado | Rojo Oscuro | Certificacion previamente aprobada invalidada |
| Expirado | Gris | El periodo de validez de la certificacion ha terminado |

### Filtro de Especie

Filtre por especie de mascota:

- Perro
- Gato
- Ave
- Conejo
- Otro

### Filtro de Pais

Seleccione uno o mas paises para filtrar por la ubicacion donde se emitio la certificacion.

### Filtro de Ciudad

Limite aun mas seleccionando ciudades especificas dentro del pais elegido.

> **Consejo:** Los filtros son combinables. Por ejemplo, filtre por Estado: Pendiente + Especie: Perro + Pais: Alemania para ver todas las certificaciones pendientes de perros de Alemania.

---

## Panel de Detalle

Al hacer clic en una fila de certificacion se abre un panel de detalle en el lado derecho de la pantalla. El panel contiene informacion completa organizada en secciones.

### Banner de Estado

En la parte superior del panel, un banner de color muestra:

- Estado actual con icono de insignia
- Fecha del ultimo cambio de estado
- Nombre del administrador que realizo la ultima accion en la certificacion (si aplica)
- Razon de rechazo o revocacion (si aplica, mostrada en una alerta de advertencia)

### Seccion de Informacion de la Mascota

| Campo | Descripcion |
|-------|-------------|
| Nombre de Mascota | Nombre registrado de la mascota |
| Especie | Especie de la mascota |
| Raza | Raza de la mascota |
| Fecha de Nacimiento | Fecha de nacimiento de la mascota |
| ID de Microchip | Identificador unico de microchip (si esta disponible) |
| Propietario | Nombre del propietario de la mascota con enlace a su perfil |

### Seccion de Detalles Veterinarios

| Campo | Descripcion |
|-------|-------------|
| Nombre del Veterinario | Nombre completo del veterinario que emitio |
| Nombre de la Clinica | Nombre de la clinica veterinaria |
| Direccion de la Clinica | Direccion completa de la clinica |
| Numero de Licencia | Numero de licencia profesional del veterinario |
| Telefono | Numero de telefono de contacto de la clinica |
| Correo Electronico | Correo de contacto de la clinica (si se proporciono) |

> **Consejo:** Verifique el numero de licencia contra la base de datos de licencias veterinarias de su pais al revisar certificaciones de clinicas desconocidas.

### Barra de Progreso de Validez

Debajo de los detalles veterinarios, una barra de progreso visualiza el periodo de validez de la certificacion:

1. La barra abarca desde la **Fecha del Certificado** (inicio) hasta la **Fecha de Expiracion** (fin).
2. La fecha actual se indica con un marcador en la barra.
3. Codificacion de colores:
   - **Verde:** Mas de 30 dias restantes
   - **Amarillo:** 30 dias o menos restantes
   - **Rojo:** Expirado
4. El porcentaje de validez consumido se muestra como texto.

### Cuadricula de Documentos

La seccion de documentos muestra los archivos de certificacion subidos en un diseno de cuadricula.

1. Cada documento se muestra como una tarjeta de miniatura con el nombre del archivo debajo.
2. Haga clic en cualquier miniatura para abrir la **Superposicion de Vista Previa de Imagen**.
3. En la superposicion de vista previa:
   - Use los controles de acercar/alejar para inspeccionar detalles.
   - Navegue entre documentos con las flechas izquierda/derecha.
   - Descargue el archivo original usando el boton de descarga.
   - Presione **Escape** para cerrar la vista previa.
4. Formatos soportados: JPEG, PNG, PDF.

> **Consejo:** Busque sellos veterinarios oficiales, firmas y numeros de licencia en los documentos de certificacion. Los documentos genericos o plantillas sin estos elementos deben ser marcados para rechazo.

---

## Aprobar una Certificacion

Para aprobar una certificacion de salud:

1. Abra el panel de detalle de la certificacion haciendo clic en la fila.
2. Revise los detalles veterinarios para completitud y plausibilidad.
3. Inspeccione todos los documentos subidos en la cuadricula de documentos.
4. Haga clic en el boton **Aprobar** en la parte inferior del panel.
5. En el dialogo de confirmacion:
   - Revise el resumen de lo que esta aprobando.
   - La fecha de expiracion se calcula automaticamente basada en el tipo de certificacion.
   - Haga clic en **Confirmar**.

### Lista de Verificacion de Aprobacion

Antes de aprobar, verifique:

- [ ] El nombre del veterinario y numero de licencia estan presentes
- [ ] Los detalles de la clinica estan completos y son verificables
- [ ] Los documentos son legibles y contienen sellos/firmas oficiales
- [ ] La fecha de certificacion es reciente (dentro de los ultimos 12 meses)
- [ ] La informacion de la mascota en el documento coincide con el registro de la plataforma
- [ ] No hay signos de manipulacion o falsificacion de documentos

### Que Sucede Despues de la Aprobacion

- El estado de la certificacion cambia a **Aprobado**.
- Se establece un periodo de validez basado en el tipo de certificacion.
- El perfil de la mascota muestra una insignia de certificacion de salud.
- El propietario recibe una notificacion confirmando la aprobacion.
- La barra de progreso de validez se activa en el panel de detalle.

---

## Rechazar una Certificacion

Para rechazar una certificacion de salud:

1. Abra el panel de detalle de la certificacion.
2. Identifique el/los problema(s) con el envio.
3. Haga clic en el boton **Rechazar** en la parte inferior del panel.
4. En el dialogo de rechazo:
   - Introduzca una **Razon de Rechazo** en el area de texto. Este campo es obligatorio.
   - Sea especifico sobre lo que necesita ser corregido.
5. Haga clic en **Confirmar Rechazo**.

### Razones Comunes de Rechazo

| Razon | Mensaje de Ejemplo |
|-------|-------------------|
| Documentos ilegibles | "El documento subido es demasiado borroso para leer. Por favor suba un escaneo o foto mas clara." |
| Faltan detalles del veterinario | "El certificado no incluye el numero de licencia del veterinario. Por favor reenvie con credenciales veterinarias completas." |
| Certificacion expirada | "Esta certificacion fue emitida hace mas de 12 meses. Por favor obtenga y suba un certificado actual." |
| Info de mascota no coincide | "El nombre de la mascota en el certificado no coincide con el nombre registrado de la mascota. Por favor verifique y reenvie." |
| Documentos incompletos | "Solo se subio la pagina 1 de 3. Por favor suba todas las paginas de la certificacion." |

### Que Sucede Despues del Rechazo

- El estado de la certificacion cambia a **Rechazado**.
- La razon de rechazo se muestra al propietario de la mascota.
- El propietario recibe una notificacion con la razon.
- El propietario puede enviar una nueva certificacion para reemplazar la rechazada.

> **Consejo:** Siempre proporcione retroalimentacion accionable. Diga al propietario exactamente que corregir para que puedan solucionar el problema en un solo reenvio.

---

## Revocar una Certificacion

La revocacion se usa cuando una certificacion previamente aprobada se encuentra invalida, fraudulenta o ya no es aplicable.

1. Navegue a la certificacion (filtre por Estado: Aprobado si es necesario).
2. Abra el panel de detalle.
3. Haga clic en el boton **Revocar** (solo visible para certificaciones Aprobadas).
4. En el dialogo de revocacion:
   - Introduzca la **Razon de Revocacion**. Este campo es obligatorio.
   - Reconozca que esta accion es inmediata y no puede deshacerse.
5. Haga clic en **Confirmar Revocacion**.

### Cuando Revocar

- Documentacion fraudulenta descubierta despues de la aprobacion
- Licencia veterinaria encontrada invalida o revocada
- El propietario de la mascota reporta que la certificacion fue enviada por error
- La autoridad reguladora marca la certificacion

### Que Sucede Despues de la Revocacion

- La insignia de certificacion de salud se elimina inmediatamente del perfil de la mascota.
- El estado de la certificacion cambia a **Revocado**.
- La razon de revocacion se almacena y es visible en el panel de detalle.
- El propietario es notificado por correo electronico y notificacion en la app.
- El propietario debe enviar una nueva certificacion si desea restaurar la insignia.

> **Consejo:** La revocacion es una accion seria que afecta las senales de confianza de la mascota en la plataforma. Asegurese de tener evidencia suficiente antes de proceder.

---

## Comprender la Validez y Expiracion

Las certificaciones de salud tienen un periodo de validez definido que determina cuanto tiempo la certificacion permanece activa despues de la aprobacion.

### Como Funciona la Validez

1. Cuando una certificacion es aprobada, el sistema calcula una fecha de expiracion.
2. El periodo de validez depende del tipo de certificacion:
   - Certificado de salud general: 12 meses
   - Certificado de vacunacion: Varia segun el calendario de vacunas
   - Certificado de aptitud reproductiva: 6 meses
3. La **Barra de Progreso de Validez** en el panel de detalle muestra visualmente el tiempo restante.

### Notificaciones de Expiracion

El sistema envia notificaciones automaticas a medida que se acerca la expiracion:

| Dias Antes de la Expiracion | Notificacion |
|----------------------------|--------------|
| 30 dias | Primer recordatorio al propietario para renovar |
| 14 dias | Segundo recordatorio con urgencia |
| 7 dias | Advertencia final |
| 0 dias | Notificacion de certificacion expirada |

### Despues de la Expiracion

- El estado de la certificacion cambia automaticamente a **Expirado**.
- La insignia de salud se elimina del perfil de la mascota.
- La certificacion expirada permanece en el historial como referencia.
- El propietario puede enviar una nueva certificacion en cualquier momento.

> **Consejo:** Monitoree la tabla de certificaciones filtrada por "Aprobado" y ordenada por fecha de expiracion para identificar proactivamente certificaciones que se acercan a la expiracion en su region.

---

## Acciones Masivas

Para procesamiento eficiente de multiples certificaciones:

1. Use las casillas de verificacion en el lado izquierdo de la tabla para seleccionar multiples filas.
2. La barra de acciones masivas aparece en la parte superior de la tabla.
3. Acciones masivas disponibles:
   - **Aprobar Todas** -- Aprueba todas las certificaciones pendientes seleccionadas con expiracion predeterminada.
   - **Exportar** -- Descarga las certificaciones seleccionadas como un informe CSV.

> **Consejo:** La aprobacion masiva solo debe usarse cuando haya verificado individualmente los documentos de cada certificacion seleccionada. Nunca apruebe masivamente sin revisar documentos.

---

## Preguntas Frecuentes

**P: Puedo editar la fecha de expiracion de una certificacion aprobada?**
R: No. Para cambiar la expiracion, debe revocar la certificacion actual y pedir al propietario que reenvie.

**P: Que pasa si un documento de certificacion esta en un idioma que no puedo leer?**
R: Escale a un administrador que lea ese idioma, o solicite al propietario que proporcione una traduccion certificada.

**P: Puede una mascota tener multiples certificaciones activas?**
R: Si. Una mascota puede tener tanto un certificado de salud general como certificados de vacunacion especificos activos simultaneamente.

**P: Quien recibe las notificaciones de rechazo/revocacion?**
R: El propietario registrado de la mascota recibe todas las notificaciones por correo electronico y mensajeria en la app.
