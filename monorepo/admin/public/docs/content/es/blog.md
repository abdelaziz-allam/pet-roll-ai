# Blog CMS

El modulo de Blog CMS permite a los administradores crear, editar, publicar y gestionar publicaciones de blog mostradas en el sitio web publico de Petfolioo. Use esta herramienta para compartir consejos de cuidado de mascotas, noticias de la plataforma, perfiles de criadores y contenido educativo con su comunidad.

![Blog CMS](/docs/screenshots/blog.png)

---

## Tabla de Publicaciones del Blog

La vista principal muestra todas las publicaciones del blog en una tabla buscable y ordenable.

| Columna | Descripcion |
|---------|-------------|
| Titulo | Titulo de la publicacion con enlace clicable para editar |
| Estado | Insignia de estado de publicacion |
| Autor | Nombre del administrador que creo la publicacion |
| Vistas | Total de vistas de pagina desde la publicacion |
| Fecha | Fecha de creacion (o fecha de publicacion si esta publicada) |

### Insignias de Estado

| Estado | Color de Insignia | Descripcion |
|--------|-------------------|-------------|
| Borrador | Gris | La publicacion esta guardada pero no es visible al publico |
| Publicado | Verde | La publicacion esta activa y visible en el sitio web |
| Destacado | Dorado | La publicacion esta publicada y fijada en la parte superior |

### Acciones de la Tabla

- Haga clic en el titulo de una publicacion para abrirla para edicion.
- Use el menu de acciones (tres puntos) en cada fila para acciones rapidas: Publicar, Despublicar, Fijar, Desfijar, Eliminar.
- Ordene por cualquier columna haciendo clic en el encabezado de columna.
- Use la barra de busqueda para filtrar publicaciones por titulo o palabras clave del contenido.

> **Consejo:** Ordene por Vistas descendente para identificar su contenido mas popular. Use estos insights para planificar futuras publicaciones sobre temas similares.

---

## Crear una Publicacion

Para crear una nueva publicacion de blog:

1. Haga clic en el boton **Crear Publicacion** en la esquina superior derecha de la tabla de Publicaciones del Blog.
2. Se abre el editor de publicaciones con los siguientes campos.

### Titulo

- Introduzca el titulo de la publicacion en el campo de titulo en la parte superior.
- Maximo 200 caracteres.
- El titulo aparece como el encabezado principal en la pagina publicada.
- Elija titulos descriptivos y atractivos que incluyan palabras clave relevantes.

### Slug

- El slug de URL se genera automaticamente desde el titulo.
- Formato: minusculas, guiones reemplazan espacios, caracteres especiales eliminados.
- Ejemplo: "10 Consejos para Nuevos Duenos de Cachorros" se convierte en `10-consejos-para-nuevos-duenos-de-cachorros`.
- Puede editar manualmente el slug si la version auto-generada es demasiado larga o poco clara.
- El slug debe ser unico entre todas las publicaciones.

> **Consejo:** Mantenga los slugs cortos y ricos en palabras clave para mejor SEO. Acorte manualmente los slugs auto-generados que excedan 5-6 palabras.

### Contenido HTML

- El area de contenido principal acepta HTML para formato enriquecido.
- Use la barra de herramientas del editor de texto enriquecido para formato comun:
  - Negrita, italica, subrayado
  - Encabezados (H2, H3, H4)
  - Listas ordenadas y no ordenadas
  - Enlaces
  - Imagenes (en linea)
  - Citas en bloque
  - Bloques de codigo
- Cambie a **Modo Fuente** para editar HTML sin procesar directamente.
- El contenido soporta todas las etiquetas HTML estandar.

#### Mejores Practicas de Contenido

| Hacer | No Hacer |
|-------|----------|
| Usar H2 para secciones principales, H3 para subsecciones | Usar H1 (reservado para el titulo) |
| Incluir imagenes para dividir texto largo | Publicar muros de texto sin formato |
| Mantener parrafos cortos (3-4 oraciones) | Escribir parrafos de mas de 5 oraciones |
| Usar listas para multiples elementos relacionados | Incrustar scripts externos o iframes |
| Agregar texto alternativo a todas las imagenes | Usar estilos en linea para colores |

### Extracto

- Escriba un breve resumen de la publicacion (maximo 500 caracteres).
- El extracto aparece en las paginas de listado del blog, resultados de busqueda y previsualizaciones de redes sociales.
- Si se deja vacio, los primeros 500 caracteres del contenido se usan automaticamente.
- El contador de caracteres muestra los caracteres restantes mientras escribe.

> **Consejo:** Escriba el extracto como un teaser convincente que haga que los lectores quieran hacer clic. Debe funcionar como un pensamiento completo por si solo, no terminar a media oracion.

### Subida de Imagen de Portada

1. Haga clic en el area de **Subir Imagen de Portada** o arrastre y suelte un archivo de imagen.
2. Formatos soportados: JPEG, PNG, WebP.
3. Dimensiones recomendadas: 1200 x 630 pixeles (optimizado para compartir en redes sociales).
4. Tamano maximo de archivo: 5 MB.
5. Despues de la subida, aparece una vista previa de la imagen.
6. Haga clic en **Eliminar** para borrar la imagen de portada actual y subir una diferente.

#### Directrices de Imagen de Portada

- Use imagenes de alta calidad y relevantes que representen el contenido de la publicacion.
- Evite superposiciones de texto en imagenes de portada (pueden recortarse en diferentes dispositivos).
- Asegurese de tener derechos para usar la imagen (fotos originales o stock con licencia apropiada).
- Las imagenes se optimizan automaticamente para entrega web despues de la subida.

### Etiquetas

- Introduzca etiquetas como valores separados por comas en el campo de etiquetas.
- Ejemplo: `cuidado de cachorros, entrenamiento, nutricion, nuevos duenos`
- Las etiquetas ayudan a categorizar publicaciones y mejorar la descubribilidad.
- Las etiquetas existentes se auto-sugieren mientras escribe.
- No hay limite en el numero de etiquetas, pero se recomiendan 3-7 etiquetas por publicacion.

> **Consejo:** Use nombres de etiquetas consistentes entre publicaciones. Verifique las etiquetas existentes antes de crear nuevas variaciones (ej., use "cuidado de cachorros" consistentemente en lugar de alternar con "cuidado-de-cachorros" o "Cuidado de Cachorros").

### Configuracion SEO

La seccion SEO le permite optimizar como aparece la publicacion en los motores de busqueda.

#### Meta Title

- Maximo 60 caracteres.
- Aparece como el titular clicable en los resultados de busqueda.
- Si se deja vacio, se usa el titulo de la publicacion.
- El contador de caracteres se vuelve rojo al acercarse o exceder 60 caracteres.
- Mejor practica: Incluir la palabra clave principal cerca del inicio.

#### Meta Description

- Maximo 160 caracteres.
- Aparece como el fragmento de descripcion debajo del titulo en los resultados de busqueda.
- Si se deja vacio, se usa el extracto.
- El contador de caracteres se vuelve rojo al acercarse o exceder 160 caracteres.
- Mejor practica: Incluir una llamada a la accion y la palabra clave principal.

#### Vista Previa SEO

Debajo de los campos meta, una vista previa muestra como aparecera la publicacion en los resultados de busqueda de Google:

```
+--------------------------------------------------+
| Meta Title (o Titulo de Publicacion si vacio)    |
| https://petfolioo.com/blog/su-slug-aqui          |
| Meta Description (o Extracto si vacio) aparece   |
| aqui como se veria en resultados de busqueda...  |
+--------------------------------------------------+
```

> **Consejo:** Siempre complete tanto el meta title como la meta description manualmente. Los valores auto-generados del titulo y extracto pueden no estar optimizados para la intencion de busqueda.

### Guardar como Borrador

1. Despues de completar los campos deseados, haga clic en **Guardar Borrador**.
2. La publicacion se guarda con estado de Borrador.
3. Puede regresar a editarla en cualquier momento desde la tabla de Publicaciones del Blog.
4. Los borradores no son visibles al publico.

---

## Publicar una Publicacion

Para publicar una publicacion en borrador y hacerla visible en el sitio web:

1. Abra la publicacion desde la tabla de Publicaciones del Blog.
2. Revise todo el contenido, imagenes y configuracion SEO.
3. Haga clic en el boton **Publicar** en la esquina superior derecha.
4. En el dialogo de confirmacion:
   - Revise el titulo y slug de la publicacion.
   - Confirme la publicacion.
5. Haga clic en **Confirmar Publicacion**.

### Que Sucede Despues de Publicar

- El estado de la publicacion cambia a **Publicado**.
- La publicacion se vuelve inmediatamente visible en la pagina publica del blog.
- La fecha de publicacion se registra (usada para ordenar en el blog).
- La URL de la publicacion se activa: `https://petfolioo.com/blog/[slug]`.
- Los motores de busqueda ahora pueden indexar la publicacion.

### Lista de Verificacion de Publicacion

Antes de publicar, verifique:

- [ ] El titulo es claro, atractivo y libre de errores tipograficos
- [ ] El contenido esta completo y correctamente formateado
- [ ] Todas las imagenes cargan correctamente
- [ ] Los enlaces funcionan y abren en pestanas apropiadas
- [ ] La imagen de portada esta subida y se ve bien
- [ ] El extracto esta escrito y tiene menos de 500 caracteres
- [ ] Las etiquetas estan agregadas y correctamente formateadas
- [ ] El meta title tiene menos de 60 caracteres
- [ ] La meta description tiene menos de 160 caracteres
- [ ] El slug esta limpio y rico en palabras clave

---

## Despublicar una Publicacion

Para eliminar una publicacion publicada del sitio web publico:

1. Encuentre la publicacion en la tabla de Publicaciones del Blog.
2. Haga clic en el menu de acciones (tres puntos) en la fila.
3. Seleccione **Despublicar**.
4. Confirme la accion en el dialogo.

### Que Sucede Despues de Despublicar

- El estado de la publicacion regresa a **Borrador**.
- La publicacion se elimina inmediatamente de la pagina publica del blog.
- La URL devuelve una pagina 404.
- El conteo de vistas se conserva.
- Puede republicar la publicacion en cualquier momento.

> **Consejo:** Despublique en lugar de eliminar si quiere eliminar contenido temporalmente. Las publicaciones despublicadas retienen todos sus datos y pueden restaurarse instantaneamente.

---

## Fijar/Desfijar como Destacado

Las publicaciones destacadas aparecen prominentemente en la parte superior de la pagina del blog, encima de los listados cronologicos.

### Fijar una Publicacion

1. Encuentre una publicacion publicada en la tabla de Publicaciones del Blog.
2. Haga clic en el menu de acciones (tres puntos).
3. Seleccione **Fijar como Destacado**.
4. La insignia de estado cambia a **Destacado** (dorado).

### Desfijar una Publicacion

1. Encuentre la publicacion destacada en la tabla.
2. Haga clic en el menu de acciones (tres puntos).
3. Seleccione **Desfijar**.
4. El estado regresa a **Publicado** (verde).

### Reglas de Publicaciones Destacadas

- Solo las publicaciones publicadas pueden ser fijadas.
- Multiples publicaciones pueden estar destacadas simultaneamente.
- Las publicaciones destacadas se muestran en el orden en que fueron fijadas (fijado mas reciente primero).
- Desfijar una publicacion no la despublica; permanece publicada.

> **Consejo:** Limite las publicaciones destacadas a 2-3 a la vez. Demasiadas publicaciones destacadas diluyen el enfasis y empujan el contenido regular debajo del pliegue.

---

## Ver en el Sitio

Para previsualizar como se ve una publicacion publicada en el sitio web publico:

1. Abra la publicacion desde la tabla de Publicaciones del Blog.
2. Haga clic en el enlace **Ver en el Sitio** en el area superior derecha (junto al boton Publicar).
3. Se abre una nueva pestana del navegador mostrando la publicacion en el sitio web en vivo.

### Notas

- El enlace Ver en el Sitio solo esta disponible para publicaciones Publicadas y Destacadas.
- Las publicaciones en borrador no pueden previsualizarse en el sitio en vivo.
- El enlace abre la version en vivo actual; los cambios no guardados en el editor no se reflejan.

> **Consejo:** Siempre vea en el sitio despues de publicar para verificar que el formato, imagenes y diseno aparecen correctamente en el tema publico.

---

## Eliminar una Publicacion

Para eliminar permanentemente una publicacion de blog:

1. Encuentre la publicacion en la tabla de Publicaciones del Blog.
2. Haga clic en el menu de acciones (tres puntos).
3. Seleccione **Eliminar**.
4. Aparece un dialogo de confirmacion:
   - Muestra el titulo de la publicacion.
   - Advierte que la eliminacion es permanente.
   - Le pide escribir el titulo de la publicacion para confirmar (para publicaciones publicadas).
5. Haga clic en **Confirmar Eliminacion**.

### Que Sucede Despues de la Eliminacion

- La publicacion se elimina permanentemente del sistema.
- La URL devuelve una pagina 404.
- La publicacion no puede recuperarse despues de la eliminacion.
- Las estadisticas de vistas se pierden.
- El slug queda disponible para reutilizacion.

### Cuando Eliminar vs. Despublicar

| Escenario | Accion |
|-----------|--------|
| Eliminacion temporal de contenido | Despublicar |
| Contenido desactualizado que puede actualizarse despues | Despublicar |
| Publicaciones de prueba o duplicados accidentales | Eliminar |
| Contenido que nunca debio haberse creado | Eliminar |
| Contenido legalmente problematico | Eliminar |

> **Consejo:** La eliminacion es irreversible. Cuando tenga dudas, despublique en su lugar. Siempre puede eliminar una publicacion despublicada despues, pero no puede recuperar una publicacion eliminada.

---

## Subida de Imagenes para Fotos de Portada

El componente de subida de imagen de portada soporta el siguiente flujo de trabajo:

### Metodos de Subida

1. **Clic para Subir:** Haga clic en el area de subida para abrir su explorador de archivos.
2. **Arrastrar y Soltar:** Arrastre un archivo de imagen desde su escritorio directamente al area de subida.

### Proceso de Subida

1. Seleccione o suelte su archivo de imagen.
2. Aparece la barra de progreso de subida.
3. Una vez completa, la vista previa de la imagen se muestra en el area de subida.
4. La URL de la imagen se guarda automaticamente con la publicacion.

### Requisitos de Imagen

| Requisito | Valor |
|-----------|-------|
| Formatos | JPEG, PNG, WebP |
| Dimensiones minimas | 600 x 315 pixeles |
| Dimensiones recomendadas | 1200 x 630 pixeles |
| Tamano maximo de archivo | 5 MB |
| Relacion de aspecto | 1.91:1 recomendada (optimizada para redes sociales) |

### Gestion de Imagenes Subidas

- **Reemplazar:** Haga clic en el boton **Eliminar** debajo de la vista previa, luego suba una nueva imagen.
- **Vista previa:** Haga clic en la vista previa de la imagen para verla a tamano completo.
- **Texto alternativo:** Introduzca texto alternativo descriptivo en el campo debajo de la imagen (importante para accesibilidad y SEO).

### Optimizacion de Imagenes

Las imagenes subidas se optimizan automaticamente:

- Comprimidas para entrega web (preservando calidad).
- Servidas via CDN para carga rapida.
- Convertidas a formato WebP para navegadores que lo soporten.
- Redimensionadas a multiples dimensiones para visualizacion responsiva.

> **Consejo:** Prepare sus imagenes de portada a 1200 x 630 pixeles antes de subirlas. Este es el tamano optimo tanto para la visualizacion del blog como para compartir en redes sociales (Open Graph).

---

## Preguntas Frecuentes

**P: Pueden multiples admins editar la misma publicacion?**
R: Si, pero no hay colaboracion en tiempo real. La ultima persona en guardar sobrescribe los cambios anteriores. Coordine con su equipo para evitar conflictos.

**P: Hay un historial de revisiones?**
R: No. Cada guardado sobrescribe la version anterior. Copie contenido importante en otro lugar antes de hacer cambios importantes.

**P: Puedo programar una publicacion para publicarse en una fecha futura?**
R: No actualmente. Las publicaciones son borradores o se publican inmediatamente. Guarde como borrador y publique manualmente en el momento deseado.

**P: Que pasa con el SEO si cambio el slug de una publicacion publicada?**
R: La URL antigua devolvera 404. Los motores de busqueda eventualmente desindexaran la URL antigua e indexaran la nueva. Evite cambiar slugs en publicaciones establecidas.

**P: Puedo incrustar videos en publicaciones del blog?**
R: Si, use el modo de fuente HTML para incrustar iframes de video de YouTube o Vimeo dentro del area de contenido.

**P: Hay un limite de palabras o caracteres para el contenido de la publicacion?**
R: No hay un limite estricto en la longitud del contenido. Sin embargo, publicaciones entre 800-2000 palabras tienden a funcionar mejor para SEO y engagement del lector.
