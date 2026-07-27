# Analiticas de Vacunacion

El modulo de Analiticas de Vacunacion proporciona a los administradores informacion sobre las tendencias de vacunacion en toda la plataforma. Use este panel para comprender cuales vacunas se administran con mas frecuencia, identificar patrones regionales y rastrear la cobertura general de vacunacion.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

---

## Vista General del Panel

La pagina de Analiticas de Vacunacion esta organizada en las siguientes secciones:

1. **Estadisticas Resumidas** -- Metricas clave en la parte superior de la pagina
2. **Tabla de Posiciones de las 20 Principales Vacunas** -- Lista clasificada de las vacunas mas usadas
3. **Visualizacion de Podio** -- Destacado de las 3 principales vacunas
4. **Desglose por Vacuna** -- Distribucion por especie para cada vacuna
5. **Principales Ubicaciones** -- Distribucion geografica por vacuna

---

## Estadisticas Resumidas

En la parte superior de la pagina de analiticas, tres tarjetas de estadisticas muestran metricas agregadas:

| Tarjeta de Estadistica | Descripcion | Icono |
|------------------------|-------------|-------|
| Total de Vacunaciones | Numero total de registros de vacunacion en todas las mascotas | Jeringa |
| Vacunas Unicas | Numero de tipos de vacunas distintos administrados | Frasco |
| Mascotas Vacunadas | Numero de mascotas unicas con al menos una vacunacion | Huella |

### Lectura de las Estadisticas

- **Total de Vacunaciones** cuenta eventos individuales de vacunacion (una mascota recibiendo una vacuna = 1 conteo).
- **Vacunas Unicas** muestra la variedad de vacunas en el sistema (ej., Rabia, DHPP, FVRCP cada una cuenta como 1).
- **Mascotas Vacunadas** esta deduplicado -- una mascota con 5 vacunaciones aun cuenta como 1 mascota.

> **Consejo:** Compare Total de Vacunaciones con Mascotas Vacunadas para entender el numero promedio de vacunaciones por mascota en la plataforma.

---

## Filtros

La barra de filtros se aplica a todas las secciones de la pagina de analiticas simultaneamente.

### Filtro de Periodo de Tiempo

Seleccione un rango de tiempo para los datos:

| Opcion | Descripcion |
|--------|-------------|
| Ultimos 7 dias | Semana pasada |
| Ultimos 30 dias | Mes pasado |
| Ultimos 90 dias | Trimestre pasado |
| Ultimos 12 meses | Ano pasado |
| Todo el tiempo | Sin restriccion de tiempo |
| Rango personalizado | Selector de fechas para fecha de inicio y fin |

### Filtro de Especie

Filtre datos de vacunacion por especie de mascota:

- Todas las Especies (predeterminado)
- Perro
- Gato
- Ave
- Conejo
- Otro

### Filtro de Pais

Seleccione uno o mas paises para ver datos de vacunacion solo de esas regiones.

### Filtro de Ciudad

Limite aun mas los resultados seleccionando ciudades especificas dentro del pais elegido.

> **Consejo:** Combine filtros para responder preguntas especificas. Por ejemplo: "Cuales son las principales vacunas para perros en el Reino Unido en los ultimos 12 meses?"

### Aplicar Filtros

1. Establezca los valores de filtro deseados usando los desplegables.
2. Haga clic en **Aplicar Filtros** o los filtros se aplican automaticamente al cambiar.
3. Todas las secciones del panel se actualizan para reflejar los datos filtrados.
4. Los filtros activos se muestran como etiquetas debajo de la barra de filtros.
5. Haga clic en la **X** de cualquier etiqueta de filtro para eliminarla, o haga clic en **Borrar Todos** para restablecer.

---

## Tabla de Posiciones de las 20 Principales Vacunas

La tabla de posiciones muestra las 20 vacunas administradas con mas frecuencia basandose en la seleccion de filtros actual.

### Columnas de la Tabla

| Columna | Descripcion |
|---------|-------------|
| Posicion | Posicion del 1 al 20 |
| Nombre de Vacuna | Nombre de la vacuna |
| Conteo | Numero de veces administrada |
| Porcentaje | Participacion del total de vacunaciones |
| Tendencia | Sparkline mostrando tendencia de uso en el periodo seleccionado |

### Lectura de la Tabla de Posiciones

1. Las vacunas se ordenan por conteo en orden descendente.
2. La columna de **Porcentaje** muestra que porcion de todas las vacunaciones representa esta vacuna.
3. El **sparkline de Tendencia** da una visualizacion rapida de si el uso esta aumentando, estable o disminuyendo.
4. Pase el cursor sobre el sparkline para ver los valores de puntos de datos.

### Interactuar con la Tabla de Posiciones

- Haga clic en cualquier fila de vacuna para desplazarse hacia abajo a su seccion de desglose detallado.
- Use los encabezados de columna para reordenar (aunque el orden de posicion predeterminado es mas util).
- La tabla esta paginada si los filtros producen mas de 20 resultados en configuraciones raras.

> **Consejo:** Una vacuna con tendencia ascendente podria indicar una respuesta a un brote regional o una nueva recomendacion de asociaciones veterinarias.

---

## Visualizacion de Podio

El podio destaca las 3 principales vacunas en una visualizacion estilo premio.

### Diseno

```
        [1ro]
   [2do]     [3ro]
```

- **1er Lugar (centro, mas alto):** Tarjeta color dorado con la vacuna mas administrada.
- **2do Lugar (izquierda):** Tarjeta color plateado con la segunda vacuna mas administrada.
- **3er Lugar (derecha):** Tarjeta color bronce con la tercera vacuna mas administrada.

### Contenido de las Tarjetas

Cada tarjeta del podio muestra:

- Icono de medalla de posicion (oro, plata, bronce)
- Nombre de la vacuna
- Conteo total de administraciones
- Porcentaje de todas las vacunaciones
- Especie principal (especie mas comun que recibe esta vacuna)

### Lectura del Podio

El podio proporciona un resumen rapido de los patrones de vacunacion de la plataforma. Resultados comunes incluyen:

- **Perros:** Rabia, DHPP (Moquillo/Parvo), Bordetella frecuentemente dominan.
- **Gatos:** FVRCP, Rabia, FeLV son vacunas tipicas principales.
- **Plataformas mixtas:** Rabia a menudo lidera en todas las especies.

> **Consejo:** Si el podio muestra resultados inesperados despues de aplicar filtros, verifique si el periodo de tiempo o el filtro de ubicacion esta produciendo un tamano de muestra pequeno que puede sesgar las clasificaciones.

---

## Desglose por Especie por Vacuna

Debajo de la tabla de posiciones, cada vacuna en el top 20 tiene una seccion expandible mostrando la distribucion por especie.

### Ver el Desglose

1. Haga clic en la flecha de expansion junto a cualquier vacuna en la tabla de posiciones.
2. Aparece un grafico de barras apiladas horizontales mostrando la distribucion por especie.
3. Cada segmento esta codificado por color segun la especie:
   - Perros: Azul
   - Gatos: Naranja
   - Aves: Verde
   - Conejos: Morado
   - Otro: Gris

### Tabla de Desglose

Junto al grafico de barras, una pequena tabla muestra:

| Especie | Conteo | Porcentaje |
|---------|--------|------------|
| Perro | 1,234 | 62% |
| Gato | 456 | 23% |
| Ave | 200 | 10% |
| Conejo | 80 | 4% |
| Otro | 20 | 1% |

### Casos de Uso

- Identificar vacunas que son especificas de especie vs. multi-especie.
- Detectar patrones inusuales (ej., una vacuna especifica de perros apareciendo en registros de gatos puede indicar errores de entrada de datos).
- Comprender la composicion de especies de su plataforma a traves de datos de vacunacion.

> **Consejo:** Vacunas especificas de especie que aparecen bajo la especie incorrecta frecuentemente indican problemas de calidad de datos que deben investigarse.

---

## Principales Ubicaciones por Vacuna

Cada vacuna tambien muestra un desglose geografico de donde se administra con mas frecuencia.

### Ver Datos de Ubicacion

1. Haga clic en la flecha de expansion junto a cualquier vacuna en la tabla de posiciones.
2. Cambie a la pestana de **Ubicaciones** dentro de la seccion expandida.
3. Aparece una lista clasificada de las 10 principales ubicaciones.

### Tabla de Ubicaciones

| Posicion | Pais | Ciudad | Conteo | Porcentaje |
|----------|------|--------|--------|------------|
| 1 | Alemania | Berlin | 543 | 18% |
| 2 | Reino Unido | Londres | 421 | 14% |
| 3 | Francia | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Vista de Mapa

Si esta disponible, un mini mapa de calor muestra la concentracion de vacunaciones geograficamente:

- Las regiones mas oscuras indican conteos de vacunacion mas altos.
- Pase el cursor sobre una region para ver el conteo exacto.
- Haga clic en una region para aplicarla como filtro de ubicacion.

### Casos de Uso

- Identificar preferencias o requisitos regionales de vacunacion.
- Detectar clusters que pueden corresponder a recomendaciones veterinarias locales.
- Planificar campanas de alcance o asociacion regionales.

> **Consejo:** Algunas vacunas son legalmente obligatorias en paises especificos (ej., rabia en Alemania). Las altas concentraciones en ciertas regiones son esperadas para vacunas obligatorias.

---

## Exportar Datos

Para exportar datos de analiticas de vacunacion:

1. Haga clic en el boton **Exportar** en la esquina superior derecha de la pagina.
2. Elija el formato de exportacion:
   - **CSV** -- Datos crudos para analisis en hoja de calculo
   - **PDF** -- Informe formateado con graficos
3. La exportacion respeta todos los filtros actualmente activos.
4. El archivo se descarga en la ubicacion de descarga predeterminada de su navegador.

### Contenido de la Exportacion

La exportacion CSV incluye:

- Nombre de vacuna
- Conteo total
- Conteos de desglose por especie
- Principales paises y ciudades
- Puntos de datos de tendencia
- Parametros de filtro utilizados

> **Consejo:** Use las exportaciones CSV para crear visualizaciones personalizadas en herramientas como Excel o Google Sheets, o para compartir datos con socios de asesoria veterinaria.

---

## Actualizacion del Panel

Los datos analiticos se calculan a partir de registros de vacunacion y se almacenan en cache para rendimiento.

- Los datos se actualizan automaticamente cada 24 horas.
- La marca de tiempo de la ultima actualizacion se muestra en la parte inferior de la pagina.
- Haga clic en el icono de **Actualizar** junto a la marca de tiempo para activar una actualizacion manual.
- La actualizacion manual puede tomar 10-30 segundos dependiendo del volumen de datos.

> **Consejo:** Si nota discrepancias entre el panel de analiticas y los registros individuales de mascotas, intente una actualizacion manual. Las vacunaciones agregadas recientemente pueden no aparecer hasta la proxima actualizacion de cache.

---

## Preguntas Frecuentes

**P: Por que el total en la tabla de posiciones no coincide con el total de Estadisticas Resumidas?**
R: La tabla de posiciones muestra las 20 principales vacunas. Si hay mas de 20 vacunas unicas, las restantes no se listan pero aun cuentan para el total.

**P: Puedo ver datos de un criador o propietario especifico?**
R: No. La pagina de analiticas muestra datos agregados de la plataforma. Los registros individuales de vacunacion estan disponibles en el perfil de cada mascota.

**P: Por que algunas vacunas muestran cero datos de tendencia?**
R: Las vacunas nuevas que solo se han registrado una vez pueden no tener suficientes puntos de datos para generar una linea de tendencia significativa.

**P: Que tan atras van los datos historicos?**
R: El filtro "Todo el tiempo" incluye cada registro de vacunacion desde que se lanzo la plataforma. No hay limite de retencion de datos para analiticas.

**P: Puedo comparar dos periodos de tiempo?**
R: No directamente en el panel. Exporte datos para dos periodos de tiempo diferentes y comparelos en una hoja de calculo.
