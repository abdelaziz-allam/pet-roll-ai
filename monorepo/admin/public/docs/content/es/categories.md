# Categorias de Mascotas

El modulo de Categorias de Mascotas permite a los administradores definir y gestionar el sistema de clasificacion usado para organizar mascotas en la plataforma Petfolioo. Las categorias representan especies o tipos de mascotas y se usan en toda la aplicacion para filtrado, busqueda y organizacion. Cada categoria incluye un nombre, etiqueta, icono emoji, descripcion y estado activo.

![Pet Categories](/docs/screenshots/categories.png)

---

## Listado de Categorias

La pagina de categorias muestra todas las categorias definidas de mascotas en formato de tabla con controles de gestion.

### Columnas de la Tabla

| Columna | Descripcion | Ordenable |
|---------|-------------|:---------:|
| Slug de Nombre | Identificador legible por maquina (ej., `dog`, `cat`, `bird`) | Si |
| Etiqueta | Nombre para mostrar legible por humanos (ej., "Perro", "Gato", "Ave") | Si |
| Icono Emoji | Icono visual representando la categoria | No |
| Descripcion | Breve descripcion de lo que incluye esta categoria | No |
| Activo | Interruptor de alternancia mostrando si la categoria esta activa | Si |
| Acciones | Botones de Editar y Eliminar | No |

### Indicadores de Estado

| Estado Activo | Visualizacion | Significado |
|---------------|---------------|-------------|
| Activo | Alternancia verde (posicion encendida) | La categoria esta disponible para registro de mascotas y visible en filtros |
| Inactivo | Alternancia gris (posicion apagada) | La categoria esta oculta para usuarios pero las mascotas existentes retienen su categoria |

### Funcionalidades de la Tabla

1. **Ordenar** haciendo clic en los encabezados de columna Slug de Nombre, Etiqueta o Activo.
2. **Alternancia rapida** haciendo clic en el interruptor Activo directamente en la fila de la tabla.
3. **Acciones en linea** a traves de botones Editar (icono de lapiz) y Eliminar (icono de papelera) en cada fila.
4. **Paginacion** en la parte inferior para navegar cuando existen muchas categorias.

> **Consejo:** Las categorias inactivas se muestran con un estilo de fila ligeramente desvanecido para distinguirlas visualmente de las activas.

---

## Crear una Categoria

Se pueden crear nuevas categorias para soportar especies o tipos de mascotas adicionales en la plataforma.

### Pasos para Crear una Categoria

1. Haga clic en el boton **Agregar Categoria** en la esquina superior derecha de la pagina de Categorias.
2. Aparece un formulario de creacion (ya sea como modal o formulario en linea).
3. Complete los campos requeridos:

| Campo | Requerido | Descripcion | Ejemplo |
|-------|:---------:|-------------|---------|
| Slug de Nombre | Si | Identificador legible por maquina | `golden_fish` |
| Etiqueta | Si | Nombre para mostrar a usuarios | "Pez Dorado" |
| Icono Emoji | Si | Icono visual para la categoria | "fish" |
| Descripcion | No | Breve explicacion de la categoria | "Especies de peces de agua dulce y salada" |
| Activo | No | Si activar inmediatamente (predeterminado activo) | Activado |

4. Seleccione un icono emoji del **Selector de Emoji** (ver abajo).
5. Revise sus entradas.
6. Haga clic en **Crear Categoria** para guardar.
7. La nueva categoria aparece en la tabla de listado.

### Convencion del Slug de Nombre

El slug de nombre debe seguir estas reglas:

| Regla | Descripcion | Ejemplo |
|-------|-------------|---------|
| Solo minusculas | No se permiten caracteres en mayusculas | `dog` no `Dog` |
| Guiones bajos para espacios | Usar guiones bajos para separar palabras | `guinea_pig` no `guinea pig` |
| Alfanumerico + guion bajo | Solo letras, numeros y guiones bajos | `cat_1` es valido, `cat-1` no |
| Unico | No debe duplicar un slug de categoria existente | El sistema rechazara duplicados |
| Sin guiones bajos al inicio/final | No puede comenzar ni terminar con guion bajo | `_dog_` es invalido |
| Maximo 50 caracteres | Mantenga los slugs concisos | Identificadores cortos y descriptivos |

> **Importante:** El slug de nombre no puede cambiarse despues de la creacion. Se usa como el identificador permanente en la base de datos y API. Elijalo cuidadosamente.

### Selector de Emoji

El selector de emoji proporciona mas de 100 iconos de animales y naturaleza para identificacion de categorias.

| Funcion | Descripcion |
|---------|-------------|
| Busqueda | Escriba para filtrar emojis disponibles por palabra clave |
| Categorias | Emojis organizados por grupo (Animales, Naturaleza, Objetos) |
| Vista previa | Emoji seleccionado mostrado en vista previa grande antes de confirmar |
| Recientes | Emojis usados previamente mostrados en la parte superior para acceso rapido |

**Usar el Selector de Emoji:**

1. Haga clic en el **campo de icono emoji** para abrir el selector.
2. Explore categorias o escriba una palabra clave en la busqueda (ej., "perro", "pez", "ave").
3. Haga clic en el emoji deseado para seleccionarlo.
4. El emoji seleccionado aparece en el campo del formulario como vista previa.
5. Para cambiar su seleccion, haga clic en el campo de nuevo para reabrir el selector.

Categorias de emoji disponibles incluyen:

| Grupo | Ejemplos de Emojis |
|-------|-------------------|
| Animales Domesticos | Perro, Gato, Hamster, Conejo, Raton |
| Animales de Granja | Caballo, Vaca, Cerdo, Oveja, Cabra, Gallina |
| Aves | Loro, Aguila, Buho, Pato, Flamenco, Pavo Real |
| Reptiles | Lagartija, Serpiente, Tortuga, Cocodrilo, Dinosaurio |
| Acuaticos | Pez, Pez Tropical, Ballena, Delfin, Pulpo, Tiburon |
| Insectos | Mariposa, Abeja, Escarabajo, Hormiga, Grillo |
| Vida Silvestre | Leon, Tigre, Oso, Mono, Elefante, Jirafa |
| Huella/Generico | Huellas de pata, Hueso, Corazon, Estrella |

---

## Editar Categorias

Las categorias existentes pueden modificarse para actualizar su etiqueta, icono, descripcion o estado activo.

### Pasos para Editar una Categoria

1. Localice la categoria que quiere editar en la tabla de listado.
2. Haga clic en el boton **Editar** (icono de lapiz) en la columna de Acciones de la fila.
3. Aparece un formulario de edicion pre-completado con los valores actuales.
4. Modifique cualquiera de los campos editables:

| Campo | Editable | Notas |
|-------|:--------:|-------|
| Slug de Nombre | No | No puede cambiarse despues de la creacion |
| Etiqueta | Si | Actualizar el nombre para mostrar |
| Icono Emoji | Si | Seleccionar un nuevo emoji del selector |
| Descripcion | Si | Actualizar o agregar una descripcion |
| Activo | Si | Alternar estado activo/inactivo |

5. Realice sus cambios.
6. Haga clic en **Guardar Cambios** para aplicar.
7. Una notificacion de exito confirma la actualizacion.
8. La tabla de listado refleja los cambios inmediatamente.

### Consideraciones de Edicion

| Consideracion | Detalle |
|---------------|---------|
| Cambios de etiqueta | Se reflejan inmediatamente en toda la app para todos los usuarios |
| Cambios de emoji | Se actualizan en todas las ubicaciones de la interfaz donde aparece la categoria |
| Cambios de descripcion | Visibles en las pantallas de seleccion de categoria dentro de la app |
| Mascotas existentes | Las mascotas ya asignadas a esta categoria no se ven afectadas por las ediciones |

> **Nota:** Cambiar la etiqueta de una categoria no cambia su slug. El slug permanece como el identificador permanente. Los usuarios y mascotas referencian categorias por slug internamente.

---

## Activar y Desactivar Categorias

Las categorias pueden alternarse entre estados activo e inactivo sin eliminacion.

### Activar una Categoria

1. Encuentre la categoria inactiva en el listado (mostrada con alternancia gris).
2. Haga clic en el **interruptor de alternancia** en la columna Activo para moverlo a la posicion encendida.
3. Alternativamente, haga clic en Editar y alterne el campo Activo en el formulario de edicion.
4. Confirme la accion si se le solicita.
5. La categoria se vuelve disponible para registro de mascotas inmediatamente.

### Desactivar una Categoria

1. Encuentre la categoria activa en el listado (mostrada con alternancia verde).
2. Haga clic en el **interruptor de alternancia** para moverlo a la posicion apagada.
3. Aparece un dialogo de confirmacion explicando el impacto.
4. Haga clic en **Confirmar Desactivacion**.
5. La categoria se oculta de nuevos registros de mascotas.

### Impacto de la Desactivacion

| Area de Impacto | Efecto |
|-----------------|--------|
| Nuevos registros | La categoria ya no aparece en los desplegables de seleccion de especie |
| Mascotas existentes | Las mascotas ya asignadas a esta categoria retienen su asignacion |
| Filtros | La categoria ya no aparece en los desplegables de filtro para usuarios publicos |
| Portal de admin | La categoria sigue visible en admin con estilo de inactiva |
| Respuestas de API | La categoria se excluye de las listas de categorias activas |
| Reactivacion | Puede re-habilitarse en cualquier momento, restaurando funcionalidad completa |

> **Consejo:** La desactivacion es preferible a la eliminacion cuando quiere ocultar temporalmente una categoria o cuando mascotas existentes aun la usan. Preserva la integridad de datos mientras limita nuevo uso.

---

## Boton de Valores Predeterminados

La funcion de Valores Predeterminados rellena la tabla de categorias con un conjunto predefinido de categorias comunes de mascotas. Esto es util para la configuracion inicial de la plataforma o restaurar categorias estandar.

### Usar Valores Predeterminados

1. Haga clic en el boton **Valores Predeterminados** ubicado encima o debajo de la tabla de categorias.
2. Aparece un modal de confirmacion listando las categorias que se crearan.
3. Revise la lista de categorias predeterminadas.
4. Haga clic en **Confirmar** para proceder.
5. Las categorias predeterminadas se crean y aparecen en el listado.

### Conjunto de Categorias Predeterminadas

La semilla crea las siguientes categorias estandar (si aun no existen):

| Slug de Nombre | Etiqueta | Emoji | Descripcion |
|----------------|----------|:-----:|-------------|
| `dog` | Dog | Cara de perro | Perros domesticos de todas las razas |
| `cat` | Cat | Cara de gato | Gatos domesticos de todas las razas |
| `bird` | Bird | Ave | Aves de compania incluyendo loros, canarios y pinzones |
| `rabbit` | Rabbit | Cara de conejo | Conejos domesticos |
| `hamster` | Hamster | Cara de hamster | Hamsters, jerbos y pequenos roedores similares |
| `fish` | Fish | Pez | Peces de acuario de agua dulce y salada |
| `turtle` | Turtle | Tortuga | Tortugas acuaticas y terrestres |
| `snake` | Snake | Serpiente | Serpientes no venenosas de compania |
| `lizard` | Lizard | Lagartija | Geckos, iguanas y otros lagartos de compania |
| `horse` | Horse | Cara de caballo | Caballos y ponies |
| `guinea_pig` | Guinea Pig | Cobaya | Cobayas y cavias |
| `ferret` | Ferret | Huron | Hurones domesticos |

### Comportamiento de los Valores Predeterminados

| Escenario | Comportamiento |
|-----------|---------------|
| Tabla vacia | Todos los predeterminados se crean |
| Algunos predeterminados existen | Solo los predeterminados faltantes se crean (sin duplicados) |
| Todos los predeterminados existen | No se hacen cambios, se muestra mensaje de confirmacion |
| Existen categorias personalizadas | Las categorias personalizadas no se ven afectadas |

> **Nota:** El boton de Valores Predeterminados no elimina ni modifica categorias existentes. Solo agrega entradas predeterminadas faltantes. Sus categorias personalizadas estan seguras.

---

## Eliminar una Categoria

Las categorias pueden eliminarse permanentemente cuando ya no son necesarias. Esta accion requiere consideracion cuidadosa debido a su impacto en datos existentes.

### Pasos para Eliminar una Categoria

1. Localice la categoria en la tabla de listado.
2. Haga clic en el boton **Eliminar** (icono de papelera) en la columna de Acciones de la fila.
3. Aparece un modal de advertencia con:
   - El nombre de la categoria y la cantidad actual de mascotas usando esta categoria
   - Una advertencia sobre el impacto en mascotas existentes
   - Un campo de confirmacion de texto (escriba el slug de la categoria para confirmar)
4. Lea la advertencia cuidadosamente.
5. Escriba el **slug de nombre** de la categoria en el campo de confirmacion.
6. Haga clic en **Eliminar Categoria** para eliminarla permanentemente.

### Impacto de la Eliminacion

| Area de Impacto | Efecto |
|-----------------|--------|
| Registro de categoria | Eliminado permanentemente de la base de datos |
| Mascotas existentes | Las mascotas previamente en esta categoria quedan **sin categoria** |
| Perfiles de mascotas | El campo de especie muestra "Sin categoria" o vacio |
| Filtros | La categoria se elimina de todos los desplegables de filtro |
| Analiticas | Los datos historicos pueden mostrar "Categoria Desconocida" para registros pasados |
| Reversibilidad | No puede deshacerse (debe recrearse manualmente si es necesario) |

### Las Mascotas Quedan Sin Categoria

Cuando una categoria se elimina:

1. Todas las mascotas asignadas a esa categoria pierden su asignacion de categoria.
2. Estas mascotas aparecen con una etiqueta "Sin categoria" en el Registro de Mascotas.
3. Los propietarios de mascotas **no** son notificados automaticamente.
4. Los administradores pueden reasignar mascotas sin categoria a una categoria diferente mediante edicion masiva.
5. El conteo de mascotas para la categoria eliminada se muestra en el modal de confirmacion de eliminacion.

> **Importante:** Eliminar una categoria con mascotas activas asignadas dejara esas mascotas sin categoria. Considere desactivar la categoria en su lugar, o reasignar mascotas antes de la eliminacion.

### Restricciones de Eliminacion

| Restriccion | Descripcion |
|-------------|-------------|
| Categorias predeterminadas | Las categorias predeterminadas semilla pueden eliminarse (pueden re-sembrarse) |
| Mascotas activas | Las categorias con mascotas pueden eliminarse (las mascotas quedan sin categoria) |
| Confirmacion requerida | El slug debe escribirse para confirmar la eliminacion |
| Requisito de rol | Solo los roles `super_admin` y `admin` pueden eliminar categorias |

---

## Mejores Practicas

### Directrices de Gestion de Categorias

1. **Use etiquetas claras y simples** - Las etiquetas de categoria deben ser inmediatamente comprensibles para todos los usuarios independientemente de su nivel de idioma.
2. **Elija emojis representativos** - Seleccione emojis que representen claramente el tipo de animal para ayudar al reconocimiento visual rapido.
3. **Escriba descripciones utiles** - Las descripciones ayudan a los usuarios a elegir la categoria correcta al registrar su mascota.
4. **Desactive antes de eliminar** - Si no esta seguro de si una categoria es necesaria, desactivela primero. Elimine solo cuando este seguro.
5. **Mantenga slugs descriptivos** - Como los slugs no pueden cambiarse, elijalos cuidadosamente durante la creacion.
6. **Monitoree mascotas sin categoria** - Verifique regularmente mascotas sin categorias y asignelas apropiadamente.

### Ejemplos de Nombres de Categorias

| Bueno | Malo | Por Que |
|-------|------|---------|
| `guinea_pig` | `gp` | Descriptivo y legible |
| `tropical_fish` | `tropicalFish` | Sigue la convencion de guion bajo |
| `parrot` | `Parrot_1` | Minusculas, no se necesitan numeros |
| `persian_cat` | `cat_breed_persian` | Conciso, nivel de raza cuando es necesario |

---

## Preguntas Frecuentes

**P: Puedo fusionar dos categorias?**
R: No hay una funcion de fusion incorporada. Para consolidar categorias, reasigne mascotas de una categoria a otra, luego elimine la categoria vacia.

**P: Que pasa con los filtros cuando desactivo una categoria?**
R: La categoria se elimina de los desplegables de filtro de cara al usuario pero permanece accesible en los filtros del portal de administracion para propositos de gestion.

**P: Puedo reordenar las categorias?**
R: Las categorias se muestran alfabeticamente por etiqueta en las interfaces de cara al usuario. La tabla de admin puede ordenarse por cualquier encabezado de columna.

**P: Hay un limite de cuantas categorias puedo crear?**
R: No hay un limite tecnico estricto, pero por usabilidad, mantenga el numero total manejable (menos de 30 es recomendado) para que los usuarios puedan encontrar facilmente la categoria correcta.

---

*Anterior: [Usuarios de la App](./users.md)*
