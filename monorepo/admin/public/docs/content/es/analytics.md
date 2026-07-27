# Analiticas

La pagina de Analiticas proporciona informacion visual sobre el uso de la plataforma, crecimiento de usuarios, demografia de mascotas y actividad de salud. Use estos graficos para comprender tendencias, medir el compromiso y tomar decisiones basadas en datos sobre la plataforma Petfolioo.

![Analytics](/docs/screenshots/analytics.png)

---

## Vista General

El panel de Analiticas presenta cuatro visualizaciones principales junto con un selector de rango de tiempo que controla la ventana de datos para todos los graficos. Cada grafico se actualiza dinamicamente cuando cambia el rango de tiempo seleccionado.

---

## Acceder a las Analiticas

1. Haga clic en **Analiticas** en el menu de navegacion lateral.
2. El panel se carga con todos los graficos mostrados en una sola pagina desplazable.
3. El rango de tiempo predeterminado es **30 dias**.

---

## Selector de Rango de Tiempo

En la parte superior de la pagina de Analiticas, un selector de rango de tiempo le permite controlar el periodo de datos mostrado en todos los graficos.

### Rangos Disponibles

| Opcion | Periodo | Mejor Para |
|--------|---------|------------|
| **7d** | Ultimos 7 dias | Monitorear actividad reciente y tendencias a corto plazo |
| **30d** | Ultimos 30 dias | Informes mensuales y analisis de tendencias general (predeterminado) |
| **90d** | Ultimos 90 dias | Revisiones trimestrales e identificacion de patrones a mediano plazo |
| **1 Ano** | Ultimos 365 dias | Revisiones anuales, patrones estacionales y crecimiento a largo plazo |

### Cambiar el Rango de Tiempo

1. Localice el selector de rango de tiempo en la parte superior de la pagina.
2. Haga clic en uno de los botones de rango: **7d**, **30d**, **90d** o **1 Ano**.
3. El boton seleccionado se resalta para indicar el rango activo.
4. Todos los graficos en la pagina se actualizan para mostrar datos del periodo elegido.
5. Los ejes y etiquetas de los graficos se ajustan automaticamente para adaptarse a la nueva ventana de tiempo.

> **Consejo:** Comience con 30d para una vista general, luego estreche a 7d para investigar anomalias recientes o expanda a 1 Ano para informes a nivel directivo.

---

## Grafico de Crecimiento de Usuarios

### Tipo de Grafico

Grafico de lineas mostrando tendencias de registro de usuarios a lo largo del tiempo.

### Que Muestra

El grafico de Crecimiento de Usuarios visualiza el numero de nuevos registros de usuarios trazados en el periodo de tiempo seleccionado. Cada punto de datos representa el conteo acumulativo o diario de nuevos usuarios.

### Lectura del Grafico

| Elemento | Descripcion |
|----------|-------------|
| **Eje X** | Tiempo (fechas o semanas dependiendo del rango seleccionado) |
| **Eje Y** | Numero de nuevos registros de usuarios |
| **Linea** | Una linea continua conectando puntos de datos mostrando la trayectoria de crecimiento |
| **Puntos de Datos** | Marcadores sobre los que puede pasar el cursor en la linea mostrando valores exactos |
| **Tooltip** | Aparece al pasar el cursor mostrando la fecha y conteo exacto de registros |

### Interpretar los Datos

1. **Tendencia ascendente** -- Crecimiento consistente en adquisicion de usuarios. La plataforma esta atrayendo nuevos usuarios de forma estable.
2. **Linea plana** -- La adquisicion de usuarios se ha estancado. Considere esfuerzos de marketing o lanzamientos de funciones para reactivar el crecimiento.
3. **Picos** -- Aumentos repentinos pueden correlacionarse con campanas de marketing, cobertura de prensa o funciones en la tienda de aplicaciones.
4. **Caidas** -- Disminuciones en registros diarios pueden indicar patrones estacionales o problemas tecnicos.

### Comportamiento del Rango de Tiempo

| Rango | Granularidad Eje X | Notas |
|-------|-------------------|-------|
| 7d | Diario | Cada dia mostrado individualmente |
| 30d | Diario | Cada dia mostrado, bueno para identificar patrones semanales |
| 90d | Semanal | Datos agregados por semana para legibilidad |
| 1 Ano | Mensual | Datos agregados por mes para mostrar trayectoria anual |

> **Consejo:** Compare la vista de 7d con la vista de 30d. Si la tendencia de los ultimos 7 dias esta por encima del promedio de 30 dias, el crecimiento se esta acelerando.

---

## Grafico de Distribucion por Especie

### Tipo de Grafico

Grafico circular (o de dona) mostrando la proporcion de mascotas por especie.

### Que Muestra

El grafico de Distribucion por Especie desglosa todas las mascotas registradas por su categoria de especie, mostrando la proporcion relativa de cada una.

### Lectura del Grafico

| Elemento | Descripcion |
|----------|-------------|
| **Segmentos** | Cada segmento representa una especie (ej., Perro, Gato, Ave, Conejo) |
| **Colores** | A cada especie se le asigna un color distinto para identificacion |
| **Etiquetas** | Nombre de especie y porcentaje mostrados en o cerca de cada segmento |
| **Leyenda** | Una leyenda mapea colores a nombres de especie |
| **Tooltip** | Pase el cursor sobre un segmento para ver conteo exacto y porcentaje |

### Interpretar los Datos

1. **Especie dominante** -- El segmento mas grande indica el tipo de mascota de su base de usuarios principal. Use esto para priorizar funciones.
2. **Segmentos pequenos** -- Especies con porcentajes muy pequenos pueden indicar oportunidad de crecimiento en segmentos desatendidos.
3. **Equilibrio** -- Una distribucion aproximadamente equilibrada sugiere amplio atractivo entre tipos de propietarios de mascotas.

### Casos de Uso

- **Priorizacion de funciones** -- Si el 70% de las mascotas son perros, priorice funciones especificas para perros.
- **Planificacion de contenido** -- Cree contenido educativo proporcional a la distribucion de especies.
- **Segmentacion de marketing** -- Comprenda que segmentos de audiencia son mas grandes para campanas publicitarias.
- **Segmentacion de notificaciones** -- Los segmentos de audiencia en Notificaciones (Duenos de Perros, Duenos de Gatos) se correlacionan directamente con este grafico.

> **Consejo:** Si nota una especie creciendo mas rapido que otras con el tiempo (compare 30d vs 1 Ano), considere invertir en funciones especificas de especie para capitalizar la tendencia.

---

## Grafico de Razas Populares

### Tipo de Grafico

Grafico de barras horizontales clasificando las razas mas populares.

### Que Muestra

El grafico de Razas Populares muestra las principales razas registradas en la plataforma, clasificadas por conteo. Las barras se extienden horizontalmente, facilitando comparar popularidad entre razas.

### Lectura del Grafico

| Elemento | Descripcion |
|----------|-------------|
| **Eje Y** | Nombres de razas, ordenados de mas popular (arriba) a menos popular (abajo) |
| **Eje X** | Conteo de mascotas registradas de esa raza |
| **Barras** | Barras horizontales cuya longitud representa el numero de mascotas |
| **Etiquetas** | Valor de conteo mostrado al final de cada barra |
| **Tooltip** | Pase el cursor para conteo exacto y porcentaje del total |

### Interpretar los Datos

1. **Razas principales** -- Las barras mas largas representan las razas mas comunes en la plataforma. Estos usuarios son su audiencia principal.
2. **Cola larga** -- Muchas razas con conteos pequenos indican intereses diversos de usuarios.
3. **Concentracion de razas** -- Si unas pocas razas dominan (ej., las 3 principales representan 50%+), su plataforma tiene una base de usuarios concentrada.

### Insights Tipicos

| Patron | Insight | Accion |
|--------|---------|--------|
| Golden Retriever domina | Gran audiencia de perros familiares | Priorizar funciones para razas medianas/grandes de perros |
| Gato Persa en el top 5 | Fuerte segmento de duenos de gatos | Invertir en seguimiento de salud especifico para gatos |
| Aparecen razas exoticas | Criadores de nicho uniendose | Considerar funciones premium especificas para criadores |
| Distribucion equilibrada | Base de usuarios diversa | Construir funciones generales en lugar de especificas de raza |

### Limites del Grafico

- El grafico muestra las **10-15 principales razas** por defecto.
- Las razas restantes se agrupan bajo "Otro" si aplica.
- El numero de razas visibles puede variar segun el rango de tiempo.

> **Consejo:** Cruce las razas populares con datos de actividad de salud. Si una raza popular tiene baja actividad de registros de salud, esos usuarios pueden necesitar estimulos de compromiso.

---

## Grafico de Actividad de Salud

### Tipo de Grafico

Grafico de barras agrupadas mostrando actividades relacionadas con salud categorizadas por tipo.

### Que Muestra

El grafico de Actividad de Salud muestra el volumen de acciones relacionadas con la salud realizadas en la plataforma, agrupadas por tipo de actividad. Esto le ayuda a comprender que tan activamente los usuarios estan interactuando con las funciones de salud.

### Lectura del Grafico

| Elemento | Descripcion |
|----------|-------------|
| **Eje X** | Periodos de tiempo (dias, semanas o meses dependiendo del rango) |
| **Eje Y** | Conteo de actividades de salud |
| **Grupos de Barras** | Multiples barras por periodo de tiempo, una por cada tipo de actividad |
| **Colores** | Cada tipo de actividad tiene un color distinto |
| **Leyenda** | Mapea colores a tipos de actividad (Vacunaciones, Revisiones, Medicamentos, etc.) |
| **Tooltip** | Pase el cursor para conteo exacto por tipo de actividad por periodo |

### Tipos de Actividad

| Actividad | Descripcion | Color (tipico) |
|-----------|-------------|----------------|
| **Vacunaciones** | Registros de vacunacion creados o actualizados | Azul |
| **Registros de Salud** | Registros generales de salud registrados | Verde |
| **Seguimiento de Peso** | Mediciones de peso registradas | Naranja |
| **Medicamentos** | Entradas de medicamentos agregadas | Morado |

### Interpretar los Datos

1. **Barras de vacunacion altas** -- Los usuarios estan rastreando activamente vacunaciones. El sistema de recordatorios probablemente esta impulsando el compromiso.
2. **Barras de registros de salud bajas** -- Los usuarios pueden no estar al tanto de la funcion de registros de salud. Considere prompts en la app.
3. **Patrones estacionales** -- Algunas actividades de salud tienen picos estacionales (ej., tratamientos contra pulgas en primavera).
4. **Barras creciendo con el tiempo** -- La adopcion de funciones de salud esta aumentando, indicando buen compromiso de usuarios.
5. **Barras en declive** -- Los usuarios pueden estar perdiendo interes o encontrando friccion al registrar datos de salud.

### Comparar Tipos de Actividad

El formato agrupado le permite comparar visualmente:

- Que funciones de salud son mas usadas vs. subutilizadas.
- Si un tipo de actividad esta creciendo mientras otros declinan.
- Como diferentes rangos de tiempo revelan diferentes patrones.

> **Consejo:** Si la actividad de vacunacion es alta pero otro seguimiento de salud es bajo, considere agregar prompts entre funciones: "Registraste una vacunacion -- tambien te gustaria registrar el peso de Rex?"

---

## Diseno del Panel

Los cuatro graficos estan dispuestos en la pagina de Analiticas en un diseno de cuadricula:

```
+---------------------------+---------------------------+
|                           |                           |
|    Crecimiento de         |    Distribucion por       |
|    Usuarios               |    Especie                |
|    (Grafico de Linea)     |    (Grafico Circular)     |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Razas Populares        |    Actividad de Salud     |
|    (Barra Horizontal)     |    (Barras Agrupadas)     |
|                           |                           |
+---------------------------+---------------------------+
```

Cada grafico ocupa una tarjeta con:
- Un encabezado de titulo
- La visualizacion del grafico
- Tooltips interactivos al pasar el cursor
- Tamano responsivo que se adapta al ancho de pantalla

---

## Interactuar con los Graficos

### Tooltips al Pasar el Cursor

1. Mueva su cursor sobre cualquier punto de datos, barra o segmento del grafico.
2. Aparece un tooltip mostrando:
   - El valor exacto
   - La etiqueta (fecha, nombre de raza, especie, etc.)
   - Porcentaje donde sea aplicable

### Comportamiento Responsivo

1. En pantallas mas grandes, los graficos se muestran en una cuadricula 2x2.
2. En pantallas mas pequenas, los graficos se apilan verticalmente para legibilidad.
3. Los elementos del grafico se redimensionan proporcionalmente.

### Actualizacion de Datos

1. Los datos analiticos se actualizan cuando la pagina carga.
2. Cambiar el rango de tiempo activa una nueva solicitud de datos.
3. No hay auto-actualizacion -- recargue la pagina manualmente para los datos mas recientes.

---

## Flujos de Trabajo Comunes de Analiticas

### Informe Mensual

1. Seleccione el rango de tiempo **30d**.
2. Note la tendencia de Crecimiento de Usuarios (ascendente, plana o descendente).
3. Verifique la Distribucion por Especie para cualquier cambio.
4. Revise Razas Populares para tendencias emergentes.
5. Examine la Actividad de Salud para niveles de compromiso.
6. Capture pantalla o exporte datos para informes.

### Investigar una Caida

1. Comience con **30d** para identificar cuando ocurrio la caida.
2. Cambie a **7d** para examinar el periodo mas reciente en detalle.
3. Verifique si la caida se correlaciona con:
   - Un problema del sistema (revise Configuracion > historial de Modo Mantenimiento)
   - Una notificacion enviada (revise el historial de Notificaciones)
   - Un patron estacional (compare con la vista de 1 Ano)

### Revision Trimestral

1. Seleccione el rango de tiempo **90d**.
2. Compare la trayectoria de crecimiento contra trimestres anteriores.
3. Identifique que actividades de salud crecieron mas.
4. Note cualquier nueva raza apareciendo en el grafico de Razas Populares.
5. Use la Distribucion por Especie para validar la alineacion de la estrategia de marketing.

### Planificacion Anual

1. Seleccione el rango de tiempo **1 Ano**.
2. Identifique patrones estacionales en Crecimiento de Usuarios (ej., picos en vacaciones).
3. Rastree cambios de popularidad de razas ano a ano.
4. Mida la adopcion de funciones de salud durante todo el ano.
5. Use los insights para informar la hoja de ruta del producto.

---

## Comprender la Frescura de Datos

| Aspecto | Detalle |
|---------|---------|
| Fuente de datos | Base de datos de la plataforma (agregada) |
| Frecuencia de actualizacion | En tiempo real al cargar la pagina |
| Precision historica | Completa hasta el lanzamiento de la plataforma |
| Zona horaria | Hora del servidor (UTC) |
| Datos faltantes | Los vacios se muestran como valores cero, no interpolados |

---

## Solucion de Problemas

| Problema | Solucion |
|----------|----------|
| Los graficos no cargan | Verifique su conexion de red. Actualice la pagina. |
| Los datos parecen obsoletos | Las analiticas cargan al visitar la pagina. Navegue fuera y regrese, o actualice. |
| Valores cero para todas las metricas | Verifique que el rango de tiempo seleccionado tiene datos. Intente expandir a 1 Ano. |
| Los tooltips del grafico no aparecen | Intente un navegador diferente. Asegurese de que JavaScript esta habilitado. |
| El rango de tiempo no cambia | Haga clic directamente en el boton de rango. Si no responde, actualice la pagina. |
| No puedo acceder a Analiticas | Verifique que su rol y permisos incluyen acceso a la pagina de Analiticas. |

---

## Paginas Relacionadas

- [Configuracion](./settings.md) -- Configurar ajustes de plataforma que afectan el comportamiento del usuario
- [Notificaciones](./notifications.md) -- Enviar notificaciones que pueden impactar metricas de compromiso
- [Retroalimentacion](./feedback.md) -- Correlacionar retroalimentacion de usuarios con tendencias analiticas
- [Usuarios Administradores](./admin-users.md) -- Otorgar acceso de analiticas a miembros del equipo
