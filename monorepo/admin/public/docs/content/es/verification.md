# Verificacion de Criadores

El modulo de Verificacion de Criadores permite a los administradores revisar, aprobar, rechazar y revocar solicitudes de verificacion de criadores. Los criadores verificados reciben una insignia de confianza visible para los compradores, senalando que su criadero cumple con los estandares de la plataforma.

![Verification](/docs/screenshots/verification.png)

---

## Tabla de Solicitudes de Verificacion

La vista principal muestra todas las solicitudes de verificacion en una tabla buscable y ordenable.

| Columna | Descripcion |
|---------|-------------|
| Nombre del Criador | Nombre completo del criador que envio la solicitud |
| Criadero | Nombre del criadero registrado asociado al criador |
| N de Envio | Numero de envio auto-incrementado (los reenvios obtienen un nuevo numero) |
| Cantidad de Documentos | Numero de documentos subidos adjuntos al envio |
| Estado | Insignia de estado de verificacion actual |
| Expiracion | Fecha de expiracion de la verificacion (solo se muestra para envios aprobados) |

### Filtrar la Tabla

1. Use el desplegable de **Estado** para filtrar por: Pendiente, Aprobado, Rechazado, Revocado o Expirado.
2. Use el campo de **Busqueda** para encontrar un criador por nombre o criadero.
3. Haga clic en cualquier encabezado de columna para ordenar ascendente o descendente.

> **Consejo:** La vista predeterminada muestra los envios Pendientes primero para que pueda priorizar las nuevas solicitudes.

---

## Flujo de Estados

Las solicitudes de verificacion siguen un ciclo de vida definido:

```
Pendiente --> Aprobado --> Expirado (automatico, despues de fecha de expiracion)
   |              |
   |              +--> Revocado (accion manual del admin)
   |
   +--> Rechazado (el criador puede reenviar)
```

### Definiciones de Estado

| Estado | Color de Insignia | Significado |
|--------|-------------------|-------------|
| Pendiente | Naranja | Esperando revision del administrador |
| Aprobado | Verde | El criador esta verificado y la insignia esta activa |
| Rechazado | Rojo | El envio no cumplio los requisitos |
| Revocado | Rojo Oscuro | El administrador elimino manualmente el estado verificado |
| Expirado | Gris | El periodo de verificacion termino; el criador debe reenviar |

### Transiciones

- **Pendiente** puede transicionar a **Aprobado** o **Rechazado**.
- **Aprobado** puede transicionar a **Revocado** (manual) o **Expirado** (automatico).
- **Rechazado** y **Expirado** permiten al criador crear un nuevo envio (nueva entrada Pendiente).
- **Revocado** es un estado terminal para ese envio.

---

## Revisar un Envio

Para revisar una solicitud de verificacion de criador:

1. Localice el envio en la tabla de Solicitudes de Verificacion.
2. Haga clic en la fila o en el boton de accion **Revisar** en el lado derecho.
3. Se abre el **Modal de Detalle del Envio** con dos pestanas:
   - **Envio Actual** -- Muestra los documentos activos y detalles del criador.
   - **Historial de Envios** -- Muestra todos los envios anteriores de este criador.

### Pestana de Envio Actual

Esta pestana muestra:

- Informacion del perfil del criador (nombre, correo, telefono, numero de registro del criadero)
- Documentos subidos en un diseno de cuadricula
- Fecha y hora del envio
- Cualquier nota que el criador incluyo con el envio

### Pestana de Historial de Envios

Esta pestana muestra una lista cronologica de todos los envios del mismo criador, incluyendo:

- Numero de envio
- Fecha de envio
- Estado final
- Nombre del revisor
- Razon de rechazo (si aplica)

> **Consejo:** Use la pestana de Historial de Envios para verificar si un criador ha abordado las razones de rechazo anteriores antes de aprobar un reenvio.

---

## Vista Previa de Documentos

Cada documento subido aparece como una miniatura en la cuadricula de documentos.

1. Haga clic en cualquier miniatura de documento para abrir una vista previa de imagen a tamano completo.
2. Use los controles de zoom para inspeccionar los detalles del documento.
3. Navegue entre documentos usando las flechas izquierda/derecha en la superposicion de vista previa.
4. Presione **Escape** o haga clic en el boton de cerrar para regresar al modal de detalle.

Los formatos de documento soportados incluyen:

- Imagenes JPEG y PNG
- Documentos PDF (renderizados como imagenes de pagina)

> **Consejo:** Busque claridad, autenticidad y completitud al revisar documentos subidos. Los documentos borrosos o parciales deben ser rechazados con instrucciones claras para el reenvio.

---

## Aprobar un Envio

Para aprobar una solicitud de verificacion de criador:

1. Abra el modal de detalle del envio haciendo clic en la fila de la tabla.
2. Revise todos los documentos subidos cuidadosamente.
3. Haga clic en el boton **Aprobar** en la parte inferior del modal.
4. En el dialogo de confirmacion:
   - Establezca la **Fecha de Expiracion** para la verificacion. El valor predeterminado es 1 ano desde hoy.
   - Opcionalmente ajuste la fecha si un periodo mas corto o mas largo es apropiado.
5. Haga clic en **Confirmar Aprobacion**.

### Que Sucede Despues de la Aprobacion

- El perfil del criador recibe la insignia de verificado inmediatamente.
- El criador es notificado por correo electronico y notificacion en la app.
- El estado del envio cambia a **Aprobado** en la tabla.
- La fecha de expiracion aparece en la columna de Expiracion.
- Cuando la fecha de expiracion pasa, el estado transiciona automaticamente a **Expirado**.

> **Consejo:** Para nuevos criadores con documentacion limitada, considere establecer una expiracion mas corta (6 meses) para provocar una re-verificacion mas temprana.

---

## Rechazar un Envio

Para rechazar una solicitud de verificacion de criador:

1. Abra el modal de detalle del envio.
2. Revise los documentos e identifique el/los problema(s).
3. Haga clic en el boton **Rechazar** en la parte inferior del modal.
4. En el dialogo de rechazo:
   - Introduzca una **Razon de Rechazo** en el area de texto. Este campo es obligatorio.
   - Sea especifico sobre lo que falta o es inadecuado.
5. Haga clic en **Confirmar Rechazo**.

### Que Sucede Despues del Rechazo

- El estado del envio cambia a **Rechazado**.
- La razon de rechazo es visible para el criador en su panel de control.
- El criador recibe una notificacion explicando el rechazo.
- El criador puede crear un nuevo envio para abordar los problemas.

### Escribir Buenas Razones de Rechazo

| Hacer | No Hacer |
|-------|----------|
| "El documento de registro del criadero esta expirado (2019). Por favor suba un registro actual." | "Documentos no suficientemente buenos." |
| "La foto de la instalacion es demasiado borrosa para verificar las condiciones. Por favor reenvie con imagenes mas claras." | "Malas fotos." |
| "Faltan registros de vacunacion para los animales de cria." | "Incompleto." |

> **Consejo:** Razones de rechazo claras reducen el ida y vuelta y ayudan a los criadores a enviar solicitudes completas en su proximo intento.

---

## Revocar Verificacion

La revocacion elimina inmediatamente el estado de verificado de un criador. Use esto para violaciones de politica o documentacion fraudulenta descubierta despues de la aprobacion.

1. Navegue a la tabla de Solicitudes de Verificacion.
2. Filtre por **Estado: Aprobado** para encontrar verificaciones activas.
3. Haga clic en la fila para abrir el detalle del envio.
4. Haga clic en el boton **Revocar** (aparece solo para envios Aprobados).
5. En el dialogo de revocacion:
   - Introduzca la **Razon de Revocacion**. Este campo es obligatorio.
   - Confirme que entiende que la accion es inmediata.
6. Haga clic en **Confirmar Revocacion**.

### Que Sucede Despues de la Revocacion

- La insignia de verificado se elimina del perfil del criador inmediatamente.
- El criador es notificado por correo electronico con la razon de revocacion.
- Todos los listados activos del criador muestran un indicador de advertencia.
- El estado del envio cambia a **Revocado** (estado terminal).
- El criador no puede reenviar contra el mismo envio; debe comenzar de nuevo.

> **Consejo:** La revocacion es una accion seria. Documente la razon exhaustivamente en caso de disputas. Considere contactar al criador antes de revocar si el problema es menor.

---

## Vista de Linea de Tiempo

La Vista de Linea de Tiempo proporciona un historial visual del recorrido de verificacion de un criador.

1. Abra cualquier modal de detalle de envio.
2. Cambie a la pestana de **Historial de Envios**.
3. La linea de tiempo muestra eventos en orden cronologico:
   - Envio creado
   - Documentos subidos
   - Revision del administrador iniciada
   - Estado cambiado (con nombre del revisor)
   - Advertencias de expiracion enviadas
   - Reenvios vinculados

### Lectura de la Linea de Tiempo

Cada entrada de la linea de tiempo muestra:

- **Fecha y hora** del evento
- **Icono de tipo de evento** (documento, cambio de estado, notificacion)
- **Actor** (nombre del criador o nombre del administrador)
- **Detalles** (texto de razon, nombres de documentos, fecha de expiracion establecida)

### Casos de Uso de la Linea de Tiempo

- **Resolucion de disputas:** Ver el historial completo cuando un criador contesta un rechazo.
- **Pista de auditoria:** Rastrear que administrador reviso y aprobo/rechazo cada envio.
- **Deteccion de patrones:** Identificar criadores que envian repetidamente documentacion inadecuada.

> **Consejo:** La linea de tiempo es de solo lectura. Todas las acciones (aprobar, rechazar, revocar) deben realizarse desde la pestana de Envio Actual.

---

## Atajos de Teclado

| Atajo | Accion |
|-------|--------|
| Enter | Abrir envio seleccionado |
| Escape | Cerrar modal |
| Tab | Cambiar entre pestanas del modal |
| Teclas de flecha | Navegar entre documentos en vista previa |

---

## Preguntas Frecuentes

**P: Puedo aprobar un envio con condiciones?**
R: No. Las aprobaciones son incondicionales. Si los documentos son parcialmente aceptables, rechace con instrucciones especificas de que corregir, luego apruebe el reenvio.

**P: Que pasa con los listados de un criador cuando su verificacion expira?**
R: Los listados permanecen activos pero la insignia de verificado se elimina. El criador es notificado 30 dias antes de la expiracion para animar el reenvio.

**P: Puede un criador revocado volver a aplicar?**
R: Si, pero debe crear un envio completamente nuevo. El envio revocado anterior permanece en el historial para propositos de auditoria.

**P: Quien puede realizar acciones de verificacion?**
R: Solo los administradores con el rol de Gestor de Verificacion pueden aprobar, rechazar o revocar envios.
