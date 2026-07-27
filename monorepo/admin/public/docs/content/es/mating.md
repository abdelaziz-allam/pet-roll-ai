# Mercado de Cria

El modulo del Mercado de Cria proporciona a los administradores supervision del sistema de emparejamiento de cria de mascotas de la plataforma. Monitoree solicitudes de emparejamiento, rastree parejas exitosas y vea clasificaciones de rendimiento de criadores.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Pestanas de Navegacion

La pagina del Mercado de Cria esta organizada en dos pestanas principales:

| Pestana | Descripcion |
|---------|-------------|
| Emparejamientos y Solicitudes | Ver y gestionar todos los emparejamientos y solicitudes pendientes |
| Clasificaciones de Criadores | Tablas de posiciones mostrando los criadores con mejor rendimiento |

Cambie entre pestanas haciendo clic en el encabezado de la pestana en la parte superior de la pagina.

---

## Pestana de Emparejamientos y Solicitudes

Esta pestana muestra todos los emparejamientos como tarjetas visuales, proporcionando una vista general intuitiva de la actividad de cria en la plataforma.

### Tarjetas de Emparejamiento

Cada emparejamiento se representa como una tarjeta mostrando dos mascotas conectadas por un conector visual de corazon.

#### Diseno de la Tarjeta

```
+------------------------------------------+
|  [Foto Mascota A]  <3  [Foto Mascota B]  |
|  Nombre Mascota A      Nombre Mascota B  |
|  Raza                  Raza              |
|  Propietario           Propietario       |
|                                          |
|  Estado: [Insignia]   Listado: [Fecha]  |
|  Especie: [Etiqueta]  Ubicacion: [Ciudad]|
+------------------------------------------+
```

#### Informacion de la Tarjeta

| Elemento | Descripcion |
|----------|-------------|
| Fotos de Mascotas | Fotos de perfil de ambas mascotas en el emparejamiento |
| Conector de Corazon | Enlace visual entre las dos mascotas (animado para emparejamientos activos) |
| Nombres de Mascotas | Nombres de ambas mascotas |
| Razas | Informacion de raza de cada mascota |
| Propietarios | Nombres de propietarios (clicables para ver perfiles) |
| Insignia de Estado | Estado actual del emparejamiento |
| Fecha de Listado | Cuando se creo la solicitud de emparejamiento |
| Etiqueta de Especie | Especie de las mascotas |
| Ubicacion | Ciudad/pais del listado |

### Estados de Emparejamiento

| Estado | Color de Insignia | Descripcion |
|--------|-------------------|-------------|
| Pendiente | Naranja | Solicitud de emparejamiento enviada, esperando respuesta |
| Aceptado | Verde | Ambas partes aceptaron el emparejamiento |
| Rechazado | Rojo | Una parte rechazo el emparejamiento |
| Completado | Azul | Cria confirmada como completada |
| Cancelado | Gris | Emparejamiento cancelado por cualquiera de las partes |
| Expirado | Gris Claro | Solicitud expirada sin respuesta |

---

## Filtros

La barra de filtros le permite limitar los emparejamientos mostrados.

### Filtro de Estado

Seleccione uno o mas estados para mostrar:

1. Haga clic en el desplegable de **Estado**.
2. Marque los estados que quiere ver.
3. La cuadricula de tarjetas se actualiza inmediatamente.

### Filtro de Especie

Filtre emparejamientos por especie de mascota:

- Todas las Especies (predeterminado)
- Perro
- Gato
- Ave
- Conejo
- Otro

### Filtro de Pais

Seleccione uno o mas paises para filtrar por ubicacion del emparejamiento.

### Filtro de Ciudad

Limite aun mas seleccionando ciudades especificas.

> **Consejo:** Use Estado: Aceptado + su pais para ver emparejamientos exitosos en su region que podrian necesitar la accion "Enviar Tarjeta de Boda".

---

## Panel de Detalle

Haga clic en cualquier tarjeta de emparejamiento para abrir el panel de detalle en el lado derecho de la pantalla.

### Seccion de Fotos de Mascotas

En la parte superior del panel, versiones mas grandes de ambas fotos de mascotas se muestran lado a lado con el conector de corazon entre ellas.

- Haga clic en cualquier foto para verla a tamano completo.
- Deslice a traves de fotos adicionales si la mascota tiene una galeria.

### Informacion del Listado

| Campo | Descripcion |
|-------|-------------|
| ID del Listado | Identificador unico para el listado de emparejamiento |
| Creado Por | Que propietario inicio el listado |
| Fecha de Creacion | Fecha en que el listado fue publicado por primera vez |
| Fecha de Emparejamiento | Fecha en que se propuso el emparejamiento |
| Fecha de Respuesta | Fecha en que el emparejamiento fue aceptado/rechazado (si aplica) |
| Especie | Especie de ambas mascotas |
| Razas | Informacion detallada de raza |
| Ubicacion | Detalles completos de ubicacion |
| Notas | Cualquier nota del propietario del listado |

### Linea de Tiempo del Emparejamiento

El panel incluye una linea de tiempo cronologica de eventos:

1. **Listado Creado** -- El propietario publico el listado de cria de su mascota
2. **Emparejamiento Propuesto** -- El algoritmo de emparejamiento o solicitud manual inicio el emparejamiento
3. **Emparejamiento Visto** -- La otra parte vio la propuesta de emparejamiento
4. **Respuesta Dada** -- Aceptacion/rechazo con marca de tiempo
5. **Completado Registrado** -- Si la cria fue confirmada como completa
6. **Tarjeta de Boda Enviada** -- Si el admin envio una notificacion de celebracion

Cada evento de la linea de tiempo muestra:

- Fecha y hora
- Actor (sistema, propietario A, propietario B o admin)
- Descripcion del evento
- Notas adicionales (si las hay)

> **Consejo:** La linea de tiempo le ayuda a comprender el contexto completo de un emparejamiento al investigar disputas o problemas reportados por usuarios.

---

## Enviar Tarjeta de Boda

La accion "Enviar Tarjeta de Boda" permite a los administradores enviar una notificacion de celebracion a ambos propietarios de mascotas cuando un emparejamiento es aceptado o completado.

### Como Enviar una Tarjeta de Boda

1. Abra el panel de detalle para un emparejamiento **Aceptado** o **Completado**.
2. Haga clic en el boton **Enviar Tarjeta de Boda** en la parte inferior del panel.
3. En el dialogo:
   - Previsualice el mensaje de notificacion (auto-generado con ambos nombres de mascotas).
   - Opcionalmente agregue un mensaje de felicitacion personalizado.
   - Revise los destinatarios (ambos propietarios de mascotas).
4. Haga clic en **Enviar**.

### Que Incluye la Tarjeta de Boda

- Encabezado de felicitacion con ambos nombres de mascotas
- Fotos de mascotas arregladas con elementos decorativos
- Fecha y ubicacion del emparejamiento
- Mensaje personalizado del admin (si se proporciono)
- Enlace a la pagina de detalles del emparejamiento

### Cuando Enviar

- Despues de que un emparejamiento es aceptado y ambas partes confirman que procederan.
- Despues de que un emparejamiento se marca como completado.
- Solo una vez por emparejamiento (el boton se deshabilita despues de enviar).

> **Consejo:** Las tarjetas de boda son una herramienta de compromiso comunitario. Enviarlas para emparejamientos aceptados fomenta la participacion en la plataforma y crea una experiencia positiva para los criadores.

---

## Pestana de Clasificaciones de Criadores

La pestana de Clasificaciones de Criadores muestra los criadores mas activos y exitosos en la plataforma.

### Podio General Top 10

En la parte superior de la pestana de Clasificaciones, una visualizacion de podio destaca los 10 mejores criadores en todas las especies.

#### Diseno del Podio

```
              [1ro]
        [2do]       [3ro]
   [4to]  [5to]  [6to]  [7mo]
      [8vo]   [9no]   [10mo]
```

Cada posicion del podio muestra:

- Nombre del criador
- Nombre del criadero
- Foto de perfil
- Conteo total de emparejamientos
- Porcentaje de tasa de exito

#### Puntuacion del Podio

Los criadores se clasifican por una puntuacion compuesta basada en:

| Factor | Peso | Descripcion |
|--------|------|-------------|
| Total de Emparejamientos | 30% | Numero de emparejamientos iniciados o recibidos |
| Tasa de Exito | 40% | Porcentaje de emparejamientos que alcanzaron Aceptado/Completado |
| Listados Activos | 15% | Numero de listados de cria actualmente activos |
| Tiempo de Respuesta | 15% | Tiempo promedio para responder a propuestas de emparejamiento |

### Cuadricula Top 10 por Especie

Debajo del podio general, una cuadricula muestra los 10 mejores criadores para cada especie por separado.

#### Diseno de la Cuadricula

Cada especie tiene su propia tarjeta:

```
+-------------------+  +-------------------+  +-------------------+
|  Perros Top 10    |  |   Gatos Top 10    |  |   Aves Top 10    |
| 1. Nombre Criador |  | 1. Nombre Criador |  | 1. Nombre Criador |
| 2. Nombre Criador |  | 2. Nombre Criador |  | 2. Nombre Criador |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Cada entrada en la cuadricula por especie muestra:

- Numero de posicion
- Nombre del criador
- Nombre del criadero
- Conteo de emparejamientos para esa especie
- Tasa de exito para esa especie

> **Consejo:** Las clasificaciones por especie ayudan a identificar criadores especialistas que pueden ser excelentes candidatos para asociaciones de plataforma o listados destacados.

---

## Tabla de Clasificaciones Ordenable

Debajo de las clasificaciones visuales, una tabla de datos completa proporciona estadisticas detalladas de criadores.

### Columnas de la Tabla

| Columna | Ordenable | Descripcion |
|---------|-----------|-------------|
| Posicion | Si | Posicion actual basada en puntuacion predeterminada |
| Nombre del Criador | Si | Nombre completo del criador |
| Criadero | Si | Nombre del criadero |
| Emparejamientos | Si | Numero total de emparejamientos (iniciados + recibidos) |
| Listados | Si | Numero de listados de cria creados |
| Tasa de Exito | Si | Porcentaje de emparejamientos que alcanzan estado Aceptado/Completado |
| Vistas | Si | Total de vistas en sus listados de cria |
| Especie | No | Especie principal que crian |
| Ubicacion | No | Pais y ciudad |

### Ordenar la Tabla

1. Haga clic en cualquier encabezado de columna ordenable para ordenar ascendente.
2. Haga clic de nuevo para ordenar descendente.
3. Un tercer clic elimina el orden en esa columna.
4. Puede ordenar por multiples columnas (mantenga Shift y haga clic).

### Interacciones con la Tabla

- Haga clic en una fila de criador para ver su perfil completo e historial de emparejamientos.
- Use la barra de busqueda encima de la tabla para encontrar un criador especifico.
- Exporte los datos de la tabla usando el boton **Exportar CSV**.

> **Consejo:** Ordene por Tasa de Exito descendente para identificar criadores que consistentemente producen emparejamientos exitosos. Estos criadores pueden beneficiarse de funciones premium o seguimiento rapido de verificacion.

---

## Comprender las Metricas de Emparejamiento

### Calculo de la Tasa de Exito

```
Tasa de Exito = (Emparejamientos Aceptados + Completados) / Total de emparejamientos x 100
```

- Solo los emparejamientos donde el criador fue el propietario del listado cuentan para su tasa de exito.
- Los emparejamientos rechazados y expirados reducen la tasa de exito.
- Los emparejamientos cancelados se excluyen del calculo.

### Metrica de Vistas

El conteo de Vistas representa:

- Total de vistas unicas en todos los listados de cria activos de un criador.
- No cuenta las propias vistas del criador.
- Se reinicia por listado (no es acumulativo entre listados eliminados).

### Puntuacion de Actividad

La clasificacion general considera la recencia:

- Los emparejamientos de los ultimos 90 dias tienen peso 2x.
- Los emparejamientos de 90-180 dias tienen peso 1x.
- Los emparejamientos de mas de 180 dias tienen peso 0.5x.

> **Consejo:** Un criador con muchas vistas pero baja tasa de exito puede tener listados atractivos pero ser demasiado selectivo o lento para responder. Considere contactarlo para entender su experiencia.

---

## Preguntas Frecuentes

**P: Puedo crear manualmente un emparejamiento entre dos mascotas?**
R: No. Los emparejamientos son creados por los propietarios de mascotas a traves de la app. Los administradores solo pueden monitorear y tomar acciones sobre emparejamientos existentes.

**P: Que pasa con los datos de emparejamiento cuando una mascota es eliminada?**
R: El registro de emparejamiento se retiene para propositos historicos pero se marca con un indicador de "Mascota Eliminada". El emparejamiento no puede progresar mas.

**P: Puedo eliminar a un criador de las clasificaciones?**
R: Las clasificaciones se calculan automaticamente. Para eliminar a un criador, su cuenta debe ser suspendida o su verificacion revocada, lo que los excluye de las clasificaciones.

**P: Con que frecuencia se actualizan las clasificaciones?**
R: Las clasificaciones se recalculan cada 24 horas. La marca de tiempo de la ultima actualizacion se muestra en la parte superior de la pestana de Clasificaciones.

**P: Puedo enviar una Tarjeta de Boda para un emparejamiento rechazado?**
R: No. El boton de Enviar Tarjeta de Boda solo esta disponible para emparejamientos con estado Aceptado o Completado.

**P: Que pasa si ambas mascotas en un emparejamiento son del mismo propietario?**
R: El sistema previene emparejamientos del mismo propietario. Si ve uno, indica un problema de integridad de datos que debe reportarse al equipo de desarrollo.
