# Panel de Control

El Panel de Control es la primera pantalla que ve despues de iniciar sesion en el Portal de Administracion de Petfolioo. Proporciona una vista general en tiempo real de la salud de la plataforma a traves de indicadores clave de rendimiento (KPIs), graficos interactivos y feeds de actividad reciente. Use el panel de control para monitorear tendencias de crecimiento, identificar areas que necesitan atencion y rastrear el compromiso de la plataforma de un vistazo.

![Dashboard](/docs/screenshots/dashboard.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View |
> | Admin | View |
> | Moderator | View |
> | Viewer | View |

---

## Tarjetas KPI

En la parte superior del panel de control, cuatro tarjetas de resumen muestran las metricas mas importantes de la plataforma. Cada tarjeta muestra el total actual y un indicador de cambio porcentual comparado con el periodo anterior.

### Definiciones de Tarjetas

| Tarjeta | Metrica | Descripcion |
|---------|---------|-------------|
| Total de Usuarios | Cantidad de usuarios registrados en la app | Todos los usuarios que han creado una cuenta en la plataforma |
| Total de Mascotas | Cantidad de mascotas registradas | Todas las mascotas agregadas al registro independientemente del estado |
| Verificaciones Pendientes | Elementos esperando revision | Solicitudes de verificacion que aun no han sido aprobadas o rechazadas |
| Listados Activos | Listados actualmente visibles | Mascotas marcadas como disponibles para cria o adopcion |

### Porcentaje de Crecimiento

Cada tarjeta KPI incluye un indicador de crecimiento:

- Una **flecha verde hacia arriba** con un porcentaje indica crecimiento comparado con el periodo anterior.
- Una **flecha roja hacia abajo** con un porcentaje indica una disminucion comparada con el periodo anterior.
- El periodo de comparacion coincide con el rango de tiempo seleccionado (ver Selector de Rango de Tiempo abajo).

> **Consejo:** Pase el cursor sobre una tarjeta KPI para ver los numeros exactos del periodo actual y anterior en un tooltip.

### Lectura de las Tarjetas

1. El **numero grande** es el conteo total actual.
2. La **insignia de porcentaje** debajo muestra el cambio periodo a periodo.
3. La **etiqueta** en la parte superior identifica que metrica se muestra.
4. Haga clic en cualquier tarjeta para navegar directamente al modulo correspondiente (por ejemplo, hacer clic en "Total de Usuarios" abre la lista de Usuarios).

---

## Selector de Rango de Tiempo

El selector de rango de tiempo controla la ventana de datos para todas las analiticas del panel de control y las comparaciones de KPIs.

### Rangos Disponibles

| Opcion | Periodo | Comparacion Contra |
|--------|---------|-------------------|
| 7d | Ultimos 7 dias | 7 dias anteriores |
| 30d | Ultimos 30 dias | 30 dias anteriores |
| 90d | Ultimos 90 dias | 90 dias anteriores |
| Todo el Tiempo | Desde el lanzamiento de la plataforma | Sin comparacion (porcentaje de crecimiento oculto) |

### Como Cambiar el Rango de Tiempo

1. Localice el **selector de rango de tiempo** en el area superior derecha del panel de control, encima de las tarjetas KPI.
2. Haga clic en uno de los botones de periodo: **7d**, **30d**, **90d** o **Todo el Tiempo**.
3. Todo el panel de control se actualizara para reflejar el periodo seleccionado.
4. Los porcentajes de crecimiento de los KPIs se recalcularan basandose en la nueva ventana de comparacion.

> **Nota:** La opcion "Todo el Tiempo" oculta los porcentajes de crecimiento ya que no hay un periodo anterior con el cual comparar.

---

## Seccion de Analiticas de Mascotas

Debajo de las tarjetas KPI, la seccion de Analiticas de Mascotas presenta desgloses visuales de los datos del registro de mascotas. Tres tipos de graficos proporcionan diferentes perspectivas sobre la poblacion de mascotas.

### Distribucion por Especie (Grafico Circular)

El grafico circular muestra el desglose proporcional de mascotas por especie.

| Elemento | Descripcion |
|----------|-------------|
| Tipo de grafico | Grafico de dona/circular |
| Fuente de datos | Todas las mascotas registradas agrupadas por especie |
| Segmentos | Un segmento por especie (ej., Perro, Gato, Ave, Conejo, Reptil) |
| Etiquetas | Nombre de especie y cantidad mostrados al pasar el cursor |
| Leyenda | Leyenda codificada por colores debajo o al lado del grafico |

**Interaccion con el Grafico Circular:**

1. Pase el cursor sobre cualquier segmento para ver la cantidad exacta y el porcentaje de esa especie.
2. Haga clic en un segmento para filtrar otros graficos del panel de control a solo esa especie.
3. Los elementos de la leyenda son clicables - haga clic en un nombre de especie para alternar su visibilidad en el grafico.

### Distribucion por Genero (Grafico de Barras)

El grafico de barras verticales muestra la distribucion de mascotas por genero.

| Elemento | Descripcion |
|----------|-------------|
| Tipo de grafico | Grafico de barras verticales |
| Eje X | Categorias de genero (Macho, Hembra, Desconocido) |
| Eje Y | Cantidad de mascotas |
| Barras | Una barra por genero, codificada por colores |
| Etiquetas | Cantidad mostrada encima de cada barra |

**Lectura del Grafico de Genero:**

1. Cada barra representa una categoria de genero.
2. La altura de la barra corresponde al numero total de mascotas de ese genero.
3. La cantidad exacta se muestra como etiqueta encima de cada barra.
4. Pase el cursor para obtener detalles adicionales incluyendo porcentaje del total.

### Distribucion por Pais (Grafico de Barras Horizontales)

El grafico de barras horizontales clasifica los paises por la cantidad de mascotas registradas.

| Elemento | Descripcion |
|----------|-------------|
| Tipo de grafico | Grafico de barras horizontales |
| Eje Y | Nombres de paises (ordenados por cantidad, descendente) |
| Eje X | Cantidad de mascotas |
| Barras | Una barra horizontal por pais |
| Visualizacion | Top 10 paises mostrados por defecto |

**Lectura del Grafico de Paises:**

1. Los paises se ordenan de mas mascotas (arriba) a menos (abajo).
2. Por defecto, solo se muestran los 10 paises principales.
3. Pase el cursor sobre una barra para ver la cantidad exacta y el porcentaje del total.
4. La longitud de la barra es proporcional a la cantidad relativa a otros paises.

---

## Filtros Geograficos y de Especie

Encima de los graficos analiticos, los controles de filtro le permiten limitar los datos mostrados.

### Filtros Disponibles

| Filtro | Tipo | Opciones |
|--------|------|----------|
| Especie | Selector desplegable | Todas las especies disponibles en la plataforma (ej., Perro, Gato, Ave, etc.) |
| Pais | Selector desplegable | Todos los paises con mascotas registradas |

### Aplicar Filtros

1. Haga clic en el desplegable de **Especie** para seleccionar una especie de mascota especifica.
2. Haga clic en el desplegable de **Pais** para seleccionar un pais especifico.
3. Los graficos y tablas a continuacion se actualizaran inmediatamente para reflejar el filtro.
4. Los filtros se pueden combinar - seleccione tanto una especie como un pais para limitar mas los resultados.
5. Para restablecer, seleccione "Todos" de cada desplegable o haga clic en el boton **Restablecer Filtros**.

> **Consejo:** Use el filtro de especie en la vista de grafico circular para profundizar en las distribuciones de raza dentro de una sola especie.

### Comportamiento del Filtro

| Escenario | Efecto |
|-----------|--------|
| Sin filtros seleccionados | Todos los datos mostrados globalmente |
| Solo especie seleccionada | Los graficos muestran datos para esa especie en todos los paises |
| Solo pais seleccionado | Los graficos muestran datos para todas las especies en ese pais |
| Ambos seleccionados | Los graficos muestran datos para la especie seleccionada en el pais seleccionado |

---

## Tabla de Registros de Usuarios Recientes

Debajo de los graficos analiticos, una tabla muestra los registros de usuarios mas recientes en la plataforma.

### Columnas de la Tabla

| Columna | Descripcion |
|---------|-------------|
| Avatar | Miniatura de la foto de perfil del usuario |
| Nombre | Nombre para mostrar del usuario |
| Correo Electronico | Direccion de correo electronico registrada del usuario |
| Fecha de Registro | Fecha y hora en que se creo la cuenta |
| Estado | Estado de la cuenta (Activo, Pendiente, Suspendido) |
| Mascotas | Numero de mascotas registradas por este usuario |

### Funcionalidades de la Tabla

1. **Ordenamiento** - Haga clic en cualquier encabezado de columna para ordenar por esa columna. Haga clic de nuevo para invertir el orden.
2. **Paginacion** - La tabla muestra 10 entradas por pagina por defecto. Use los controles de paginacion en la parte inferior para navegar.
3. **Acciones Rapidas** - Pase el cursor sobre una fila para revelar un boton "Ver" que abre el panel de detalle del usuario.

### Comprension de los Indicadores de Estado

| Estado | Color de Insignia | Significado |
|--------|-------------------|-------------|
| Activo | Verde | La cuenta esta en buen estado y es completamente funcional |
| Pendiente | Naranja | Cuenta creada pero correo electronico aun no verificado |
| Suspendido | Rojo | La cuenta ha sido suspendida por un administrador |

> **Nota:** La tabla de registros recientes siempre muestra los usuarios mas nuevos primero, independientemente de la configuracion del selector de rango de tiempo. Muestra registros de los ultimos 30 dias.

---

## Mejores Practicas del Panel de Control

### Lista de Verificacion de Monitoreo Diario

1. Verifique la tarjeta KPI de **Verificaciones Pendientes** - un numero alto puede indicar un retraso acumulado.
2. Revise los **porcentajes de crecimiento** en las cuatro tarjetas en busca de caidas inesperadas.
3. Escanee la tabla de **Registros de Usuarios Recientes** en busca de cuentas sospechosas.
4. Note cualquier cambio significativo en el grafico de **Distribucion por Pais**.

### Interpretacion de Tendencias

| Tendencia | Posible Significado | Accion Recomendada |
|-----------|---------------------|-------------------|
| Pico repentino en registros | Exito de campana de marketing o actividad de bots | Verificar usuarios recientes en busca de patrones sospechosos |
| Caida en listados activos | Cambio estacional o problema de politica | Revisar acciones de suspension recientes y expiraciones de listados |
| Altas verificaciones pendientes | Moderacion con poco personal | Asignar moderadores adicionales |
| Cambio en balance de especies | Tendencia regional o mala configuracion de categorias | Revisar configuracion de categorias |

---

## Rendimiento del Panel de Control

El panel de control carga datos de forma asincrona. Cada seccion se carga independientemente:

1. Las **tarjetas KPI** se cargan primero (consulta mas rapida).
2. Los **graficos** se cargan despues con un breve indicador de carga.
3. La **tabla de registros recientes** se carga al final.

Si alguna seccion muestra un error de carga:

1. Verifique su conexion a internet.
2. Intente actualizar la pagina.
3. Si el error persiste, el servicio backend puede estar experimentando problemas.

> **Consejo:** El panel de control se actualiza automaticamente cada 5 minutos. Puede actualizar manualmente haciendo clic en el icono de actualizacion en la barra superior o presionando `F5`.

---

*Anterior: [Primeros Pasos](./getting-started.md) | Siguiente: [Registro de Mascotas](./pets.md)*
