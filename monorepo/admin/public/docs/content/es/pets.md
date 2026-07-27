# Registro de Mascotas

El Registro de Mascotas es el modulo central para ver y gestionar todas las mascotas registradas en la plataforma Petfolioo. Desde este modulo, los administradores pueden explorar el catalogo completo de mascotas, ver perfiles detallados, revisar estados de certificacion de salud y tomar acciones de moderacion como suspender mascotas que violan las politicas de la plataforma.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabla de Listado de Mascotas

La tabla de listado de mascotas muestra todas las mascotas registradas en un formato paginado, ordenable y filtrable.

### Columnas de la Tabla

| Columna | Descripcion | Ordenable |
|---------|-------------|:---------:|
| Nombre | El nombre registrado de la mascota | Si |
| Especie | Categoria de especie (ej., Perro, Gato, Ave) | Si |
| Raza | Raza especifica dentro de la especie | Si |
| Estado | Estado actual (Activo, Suspendido, Pendiente) | Si |
| Genero | Macho, Hembra o Desconocido | Si |
| Ubicacion | Pais y ciudad de la direccion registrada de la mascota | Si |

### Indicadores de Estado

| Estado | Color de Insignia | Significado |
|--------|-------------------|-------------|
| Activo | Verde | El perfil de la mascota esta activo y visible para otros usuarios |
| Suspendido | Rojo | El perfil de la mascota ha sido ocultado debido a una violacion de politica |
| Pendiente | Naranja | El perfil de la mascota esta esperando revision o verificacion del propietario |

### Interacciones con la Tabla

1. **Haga clic en un encabezado de columna** para ordenar la tabla por esa columna. Una flecha indica la direccion del orden.
2. **Haga clic en una fila** para abrir el panel de detalle de la mascota en el lado derecho de la pantalla.
3. **Controles de paginacion** en la parte inferior permiten navegar entre paginas y cambiar el tamano de pagina (10, 20, 50 entradas por pagina).

> **Consejo:** Mantenga presionado `Shift` y haga clic en un segundo encabezado de columna para aplicar un ordenamiento secundario.

---

## Filtros

La barra de filtros encima de la tabla de listado de mascotas proporciona multiples formas de limitar los resultados mostrados.

### Filtros Disponibles

| Filtro | Tipo | Descripcion |
|--------|------|-------------|
| Especie | Selector desplegable | Filtrar por especie de mascota (Perro, Gato, Ave, Conejo, Reptil, etc.) |
| Estado | Selector desplegable | Filtrar por estado de mascota (Activo, Suspendido, Pendiente) |
| Genero | Selector desplegable | Filtrar por genero (Macho, Hembra, Desconocido) |
| Pais | Selector desplegable | Filtrar por el pais registrado de la mascota |
| Ciudad | Selector desplegable | Filtrar por ciudad (las opciones se actualizan segun la seleccion de pais) |
| Busqueda | Entrada de texto | Busqueda de texto libre por nombre de mascota, raza y numero de microchip |

### Aplicar Filtros

1. Localice la **barra de filtros** encima de la tabla.
2. Haga clic en cualquier **filtro desplegable** para ver las opciones disponibles.
3. Seleccione uno o mas valores de los desplegables.
4. Escriba en el campo de **Busqueda** para realizar una busqueda de texto libre.
5. Los resultados se actualizan automaticamente a medida que se aplican los filtros.
6. Los filtros activos se muestran como etiquetas debajo de la barra de filtros.
7. Haga clic en la **X** de cualquier etiqueta de filtro para eliminarla.
8. Haga clic en **Borrar Todos** para restablecer todos los filtros a la vez.

### Combinaciones de Filtros

Los filtros se combinan con logica AND. Por ejemplo:

| Filtros Seleccionados | Resultado |
|----------------------|-----------|
| Especie: Perro | Todos los perros independientemente del estado, genero o ubicacion |
| Especie: Perro + Genero: Hembra | Todas las perras |
| Especie: Perro + Pais: EAU + Estado: Activo | Todos los perros activos ubicados en los EAU |
| Busqueda: "Rex" | Todas las mascotas cuyo nombre, raza o microchip contiene "Rex" |

> **Nota:** El desplegable de ciudad depende de la seleccion de pais. Seleccione un pais primero para ver las ciudades disponibles.

---

## Panel de Detalle de Mascota

Al hacer clic en cualquier fila de mascota se abre un panel de detalle que se desliza desde el lado derecho de la pantalla. Este panel contiene el perfil completo de la mascota organizado en secciones.

### Cuadricula de Fotos

En la parte superior del panel de detalle, una cuadricula de fotos muestra las imagenes subidas de la mascota.

| Elemento | Descripcion |
|----------|-------------|
| Foto principal | Mostrada mas grande, marcada con un icono de estrella |
| Fotos adicionales | Mostradas en un diseno de cuadricula (hasta 6 miniaturas) |
| Accion de clic | Hacer clic en cualquier foto la abre en un visor a pantalla completa |
| Sin fotos | Se muestra una silueta de marcador de posicion |

### Seccion de Informacion de la Mascota

Debajo de las fotos, los datos principales de la mascota se muestran en un diseno estructurado.

| Campo | Descripcion | Ejemplo |
|-------|-------------|---------|
| Nombre | Nombre registrado de la mascota | "Bella" |
| Especie | Categoria de especie | "Perro" |
| Raza | Raza especifica | "Golden Retriever" |
| Color | Color del pelaje/cuerpo | "Dorado" |
| Peso | Peso con unidad | "28.5 kg" |
| Fecha de Nacimiento | Cumpleanos de la mascota | "2021-03-15" |
| Edad | Calculada desde la fecha de nacimiento | "2 anos, 4 meses" |
| Genero | Macho o Hembra | "Hembra" |
| Numero de Microchip | ID unico de microchip si esta implantado | "900118000123456" |
| Esterilizado/Castrado | Estado de esterilizacion o castracion | "Si" / "No" / "Desconocido" |
| Fecha de Registro | Cuando se agrego la mascota a la plataforma | "2023-07-20" |

### Estado de Certificacion de Salud

La seccion de certificacion de salud muestra si la mascota tiene documentacion de salud valida en archivo.

| Elemento | Descripcion |
|----------|-------------|
| Insignia de certificacion | Marca de verificacion verde (valido), Advertencia amarilla (por expirar), X roja (expirado/faltante) |
| Tipo de certificado | Nombre del certificado de salud |
| Fecha de emision | Cuando se emitio el certificado |
| Fecha de expiracion | Cuando expira el certificado |
| Barra de progreso de validez | Indicador visual del periodo de validez restante |

**Lectura de la Barra de Progreso de Validez:**

1. Una **barra verde completa** indica que el certificado fue emitido recientemente y tiene la mayor parte de su validez restante.
2. Una **barra amarilla parcial** (menos del 30% restante) indica que el certificado se acerca a la expiracion.
3. Una **barra roja vacia** indica que el certificado ha expirado.
4. El porcentaje restante se muestra como texto junto a la barra.

> **Consejo:** Los certificados que expiran dentro de 30 dias se marcan automaticamente en el modulo de Verificaciones Pendientes para que se notifique al propietario de la mascota.

### Informacion del Propietario

La seccion del propietario muestra detalles sobre el propietario registrado de la mascota.

| Campo | Descripcion |
|-------|-------------|
| Nombre del propietario | Nombre para mostrar del propietario de la mascota |
| Correo electronico | Direccion de correo electronico del propietario |
| Telefono | Numero de telefono si fue proporcionado |
| Criador verificado | Si el propietario tiene estatus de criador verificado |
| Total de mascotas | Cuantas mascotas tiene registradas este propietario |
| Miembro desde | Fecha de registro del propietario |

Al hacer clic en el nombre del propietario se navega a su perfil completo en el modulo de Usuarios.

### Seccion de Ubicacion

La seccion de ubicacion muestra donde esta registrada la mascota.

| Campo | Descripcion |
|-------|-------------|
| Pais | Nombre del pais con icono de bandera |
| Ciudad | Nombre de la ciudad |
| Direccion | Direccion si fue proporcionada (puede estar parcialmente oculta por privacidad) |

---

## Accion de Suspender/Reactivar Mascota

Los administradores y moderadores pueden suspender una mascota cuyo perfil viola las politicas de la plataforma. Suspender oculta la mascota de la vista publica y notifica al propietario.

### Suspender una Mascota

1. Abra el panel de detalle de la mascota haciendo clic en su fila en la tabla de listado.
2. Desplacese hasta la parte inferior del panel o localice la seccion de **Acciones**.
3. Haga clic en el boton **Suspender Mascota** (mostrado en rojo).
4. Aparecera un modal de confirmacion.
5. En el campo de texto de **Razon**, introduzca una explicacion clara de por que se esta suspendiendo esta mascota.
6. Seleccione una **categoria de violacion** del desplegable (ej., Listado fraudulento, Contenido inapropiado, Perfil duplicado, Violacion de politica).
7. Haga clic en **Confirmar Suspension**.
8. El estado de la mascota cambiara a "Suspendido" y el propietario recibira una notificacion con la razon proporcionada.

### Requisitos de la Razon de Suspension

| Requisito | Descripcion |
|-----------|-------------|
| Longitud minima | Al menos 20 caracteres |
| Idioma | Debe ser profesional y claro |
| Especificidad | Debe hacer referencia a la violacion especifica |
| Visibilidad | La razon se muestra directamente al propietario de la mascota |

> **Importante:** La razon de suspension que proporcione se mostrara al propietario de la mascota en la notificacion de su app y por correo electronico. Asegurese de que sea profesional, especifica y no contenga jerga interna.

### Reactivar una Mascota

1. Use el filtro de **Estado** para seleccionar "Suspendido" para encontrar mascotas suspendidas.
2. Haga clic en la fila de la mascota suspendida para abrir el panel de detalle.
3. Localice el boton **Reactivar Mascota** (mostrado en verde) en la seccion de Acciones.
4. Aparecera un modal de confirmacion mostrando la razon y fecha de suspension original.
5. Opcionalmente agregue una nota explicando por que se esta levantando la suspension.
6. Haga clic en **Confirmar Reactivacion**.
7. El estado de la mascota volvera a "Activo" y el propietario sera notificado.

### Historial de Suspensiones

El panel de detalle de cada mascota incluye una seccion de **Historial de Suspensiones** si la mascota alguna vez fue suspendida:

| Columna | Descripcion |
|---------|-------------|
| Fecha | Cuando se aplico la suspension |
| Administrador | Que administrador realizo la accion |
| Razon | La razon de suspension proporcionada |
| Duracion | Cuanto tiempo duro la suspension |
| Resolucion | Como se resolvio (reactivada, apelada, etc.) |

---

## Operaciones Masivas

Para tareas de moderacion a gran escala, la tabla de listado de mascotas admite seleccion masiva.

### Uso de la Seleccion Masiva

1. Marque la **casilla de verificacion** en el lado izquierdo de cada fila que desee seleccionar.
2. O haga clic en la **casilla del encabezado** para seleccionar todas las filas visibles en la pagina actual.
3. Una **barra de acciones masivas** aparece en la parte superior de la tabla mostrando la cantidad de elementos seleccionados.
4. Las acciones masivas disponibles incluyen:
   - **Exportar** - Descargar las mascotas seleccionadas como archivo CSV
   - **Cambiar Estado** - Aplicar un cambio de estado a todas las mascotas seleccionadas

> **Nota:** La suspension masiva no esta disponible a traves de esta interfaz. Las suspensiones deben aplicarse individualmente para asegurar que cada una incluya una razon especifica.

---

## Exportar Datos de Mascotas

Para exportar datos del registro de mascotas:

1. Aplique cualquier filtro deseado para limitar el conjunto de datos.
2. Haga clic en el boton **Exportar** en la esquina superior derecha de la tabla.
3. Seleccione el formato de exportacion (CSV o Excel).
4. Elija si exportar **resultados filtrados** o **todos los registros**.
5. El archivo se descargara en la ubicacion de descarga predeterminada de su navegador.

### Campos Exportados

| Campo | Incluido |
|-------|:--------:|
| Nombre de mascota | Si |
| Especie | Si |
| Raza | Si |
| Genero | Si |
| Estado | Si |
| Pais | Si |
| Ciudad | Si |
| Correo del propietario | Si |
| Fecha de registro | Si |
| Numero de microchip | Si |
| Estado de cert. de salud | Si |

> **Nota:** Las fotos y los registros detallados de salud no se incluyen en las exportaciones. Solo se exportan datos de resumen.

---

*Anterior: [Panel de Control](./dashboard.md) | Siguiente: [Usuarios de la App](./users.md)*
