-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-07-2021 a las 23:23:22
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portfolio`
--
CREATE DATABASE IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `portfolio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `idCita` bigint(20) UNSIGNED NOT NULL,
  `usuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `motivo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `idNoticia` bigint(20) UNSIGNED NOT NULL,
  `titular` varchar(200) NOT NULL,
  `noticia` text NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`idNoticia`, `titular`, `noticia`, `fecha`) VALUES
(11, '¿Qué es Git Hub Copilot?', 'Todo el mundo habla de GitHub Copilot, el asistente de pair programming basado en inteligencia artificial (así lo denominan desde GitHub) Pero, ¿realmente merece tanto revuelo? Bueno, la respuesta corta es sí. Hace poco estuvimos hablando sobre esto (y probándolo) en una conversación en directo entre Bruno Capuano (Microsoft MVP en Inteligencia Artificial) y Jose Manuel Alarcón (nuestro fundador y Microsoft MVP en tecnologías de desarrollo)  y aquí te dejamos las principales reflexiones de esta charla.\r\n\r\nQué es Copilot\r\nCopilot es un asistente para escribir código basado en inteligencia artificial, o como les gusta llamarlo en GitHub, un asistente de pair programming basado en IA. Para entendernos (y salvando las distancias) es algo así como Intellisense, pero mucho más potente y que va aprendiendo con el tiempo.\r\n\r\nVa mucho más allá que Intellisense. No solo te hace pequeñas sugerencias, es una herramienta generativa que intenta predecir qué quieres hacer y te sugiere funciones completas con múltiples variantes. Incluso, puede llegar a escribir código a partir de comentarios que sean definiciones escritas en lenguaje natural de qué necesitas.\r\n\r\n\r\nProbando ejemplos reales con Copilot\r\nGracias a que Bruno Capuano disponía de acceso a Copilot, pudimos verlo en acción con ejemplos de Python (aunque podría haber sido con C# u otro lenguaje). En el vídeo podemos ver cómo Copilot nos sugiere en nuestro contexto el código a escribir y con diferentes opciones que van variando en tiempo real según escribes, porque va aprendiendo del contexto y tus decisiones anteriores. Por ejemplo, a partir de que definimos una clase \"libro\" nos sugiere para esa clase los campos \"nombre\", \"autor\" y \"precio\", para, a continuación, sugerirnos crear una clase \"biblioteca\".', '2021-07-19'),
(12, '¿Qué es Angular? Para qué sirve y por qué aprenderlo', 'Angular es un framework open source de desarrollo web front end basado en JavaScript que sirve para crear aplicaciones del tipo SPA (Single Page Application). Una SPA es una aplicación web que se carga completamente en una sola página y que va modificando los contenidos que muestra cuando es necesario sin tener que refrescar la página y a través del enrutado local del navegador.\r\n\r\n\r\nDentro del amplio surtido de bibliotecas disponibles para el desarrollo Front End, nuestro tutor David considera que, a Angular le podemos llamar framework porque es la más completa, compleja y dogmática. Esto es, te marca de una forma muy clara cómo tienes que desarrollar con ella y te provee de muchas herramientas para trabajar.\r\n\r\nEntre otras herramientas, Angular te ofrece: gestión de componentes, gestión de módulos, de directivas y tuberías, un wrapper sobre las APIs del navegador para gestionar enrutados, gestión de servicios (llamadas al backend, inyección de dependencias...) y sobre todo (y donde brilla especialmente) la gestión de formularios.\r\n\r\nY por si esto no fuese suficiente, Angular además te da acceso a otras herramientas muy potentes para extenderlo, como por ejemplo Ionic para el desarrollo móvil.\r\n\r\nWeb Components vs Componentes de Angular (o React)\r\nCuidado con este detalle, cuando hablamos de componentes de Angular (o React, o Vue.js) no son exactamente lo mismo que los web components y en ese aspecto aún tienen que mejorar los tres frameworks. Aun así, en este caso Angular también va por delante a la hora de llevar a cabo la exportación desde un componente propio a un componente web.', '2021-07-19'),
(13, '¿Qué diferencia existe entre usar 1fr y auto en una rejilla con CSS Grid?', 'Las unidades fr y auto de las rejillas, a simple vista pueden parecer prácticamente idénticas, pero no lo son. Aunque ambas gestionan automáticamente el espacio tienen algunas diferencias:\r\n\r\nfr significa que se toma una fracción del espacio disponible para las columnas o filas. Todas tienen el mismo tamaño.\r\n\r\nauto significa que se toma el espacio necesario para sus contenidos, aunque se podría reducir en caso de que haya otras columnas interfiriendo y no se quepa, y se podría adaptar en caso de que sobre espacio. Si sobra espacio se reparte por igual entre las filas o columnas, pero a partir del tamaño calculado en función de sus contenidos que ya tengan.\r\n\r\nEs decir, cuando tenemos una rejilla y el navegador la va a renderizar, en primer lugar calcula el espacio que necesita darle a cada celda que tenga el tamaño en auto, para que entren dentro sus contenidos. Se queda con el mínimo espacio necesario para ello. Ahora, reparte el resto del espacio dividiéndolo en las fracciones que queden si es que están indicadas, y serán todas iguales ya que lo reparte de la misma manera en cada fracción.', '2021-07-19'),
(15, 'El insospechado éxito de \"Málaga Valley\": así le está levantando la inversión tecnológica a capitales europeas', 'En la era de información no hay pueblo o ciudad que no se interese por atraer a las empresas tecnológicas. Tanto la industria del software como las empresas que gestionan la parte física de Internet (centros de datos, cables submarinos, satélites) ofrecen empleo estable de alta cualificación y provocan un efecto gravitatorio: tienden a concentrarse para aprovechar las sinergias entre ellas y ahorrar costes con economías de escala, por lo que captar a una facilita hacerlo con las siguientes. No hay capital europea a la que le amargue un Google. En esa carrera con París, Londres , Berlín, o dentro de España con Madrid, Barcelona y Sevilla, Málaga ha conseguido poner un pie con la suma varios éxitos consecutivos.\r\nVodafone ha elegido a la ciudad para instalar su centro europeo de desarrollo de nuevas tecnologías tras un examen de tres meses en el que han participado siete ciudades de cinco países. Creará 600 nuevos empleos de alta cualificación. La multinacional no ha desvelado qué otras ciudades optaban a recibir esa inversión \"para evitar agravios\", pero entre ellas hay \"primeras capitales europeas\".\r\nLa multinacional de las telecomunicaciones es la segunda gran compañía que se decanta por Málaga en este 2021. En febrero fue Google la que comunicó que había escogido a la ciudad para albergar su centro de excelencia en ciberseguridad. El gigante tecnológico adelantó que además de desarrollar nuevas soluciones para la protección de sistemas informáticos, el centro funcionará como aceleradora de startups a nivel europeo. La sede de Málaga forma parte de una inversión total de 530 millones de euros que Google hará en España en los próximos años.', '2021-07-19'),
(16, 'Una tecnología convierte los pensamientos en palabras escritas', ' Investigadores de la Oregon Health & Science University han desarrollado un implante neuronal que puede leer los pensamientos de una persona y convertirlos en palabras escritas.\r\n\r\nEstá pensado especialmente para personas que por cualquier motivo han perdido la capacidad de comunicarse: basta con que intente hablar en voz alta para que el mecanismo funcione.\r\n\r\nEl sistema capta la intención de la persona, decodifica sus pensamientos en palabras específicas y las refleja en una pantalla que otra persona puede leer.\r\n\r\nLa tecnología todavía no es perfecta, ya que el algoritmo que realiza esta proeza lo consigue en alrededor del 50 por ciento de las veces.\r\n\r\nSin embargo, el nivel de comunicación aumenta cuando la persona piensa en frases que repetimos con frecuencia y que han sido escritas previamente en una pantalla.\r\n\r\nAdemás, el sistema dispone de una función parecida a la de autocorrección que aumenta la precisión, tanto de las palabras individuales, como de oraciones completas.\r\n\r\nLa tecnología ha sido testada en un paciente humano que llevaba paralítico desde hacía 20 años y representa toda una innovación: es la primera vez que se consigue descifrar el lenguaje a partir de las señales eléctricas que se generan en el área del habla del cerebro.\r\nTema relacionado: Ya es posible escribir pensamientos solo con la menteTema relacionado: Ya es posible escribir pensamientos solo con la mente\r\n\r\nHistoria humana\r\nHistoria humana La historia de esta experiencia la relata The New York Times: cuenta que, hace tres años, este paciente, en la actualidad con 38 años, aceptó trabajar con investigadores en neurociencia.\r\n\r\nSu vida había cambiado en 2003 debido a un accidente automovilístico que requirió una intervención quirúrgica. Después de pasar por el quirófano sufrió un derrame cerebral y quedó en coma y sin poder hablar.\r\n\r\nDurante años, utilizó otras tecnologías para comunicarse con enormes dificultades, hasta que los científicos le implantaron una lámina rectangular de 128 electrodos, diseñada para detectar señales de procesos sensoriales y motores relacionados con el habla y con la boca, los labios, la mandíbula, la lengua y la laringe.\r\n\r\nA través de 50 sesiones desarrolladas durante más de año y medio, todo lo que quería decir el paciente era trasladado a un ordenador mediante un cable conectado a su cabeza.\r\n\r\nEl sistema traduce la actividad cerebral que normalmente habría controlado su tracto vocal directamente en palabras y oraciones. Puede comunicarse a razón de entre 15 y 18 palabras por minuto, aunque los investigadores piensan que la tecnología se puede perfeccionar hasta alcanzar el ritmo de una conversación típica, que es de 150 palabras por minuto.\r\n\r\nLos investigadores destacan también que el sistema mejora con la experiencia: al principio confunde palabras y expresa erróneamente algunos pensamientos, pero con el tiempo va perfeccionando la traslación de las palabras porque el cerebro del paciente se acostumbra a expresarse de esa manera.\r\n\r\nNo lee la mente\r\nNo lee la mente Los investigadores aclaran que los electrodos no leen la mente del paciente, sino que detectan las señales cerebrales correspondientes a cada palabra que intenta decir.\r\n\r\nEl sistema no capta pensamientos aleatorios, sino los pensamientos asociados a cada palabra.\r\n\r\nLos investigadores destacan que esta tecnología está orientada a ayudar a las personas que carecen de la capacidad de hablar y que conservan las vías neuronales relacionadas con el lenguaje oral.\r\n\r\nEsta tecnología sería de gran ayuda por tanto para personas con lesiones cerebrales o afecciones como esclerosis lateral amiotrófica (ELA) o parálisis cerebral, que tienen un control muscular insuficiente para hablar, señala NYT.\r\n\r\nEn un artículo publicado en The New England Journal of Medicine, los artífices de este desarrollo tecnológico escriben: «la tecnología para restaurar la capacidad de comunicarse en personas paralizadas que no pueden hablar tiene el potencial de mejorar la autonomía y la calidad de vida. Un enfoque que decodifica palabras y oraciones directamente de la actividad cortical cerebral de estos pacientes puede representar un avance sobre los métodos existentes para la comunicación asistida.»', '2021-07-19'),
(17, 'Forman a personas con discapacidad intelectual en el uso de las nuevas tecnologías', 'La Diputación de Málaga, a través de su convocatoria anual de subvenciones a entidades del tercer sector, ha financiado un proyecto para formar en nuevas tecnologías y redes sociales a personas con discapacidad intelectual de la Axarquía.\r\n\r\nSe trata de una iniciativa de la Asociación para la Ayuda a Personas con Necesidades Especiales ANNE Axarquía puesta en marcha durante la pandemia para permitir que personas con discapacidad intelectual de los diferentes municipios de la comarca se mantuvieran en contacto de manera telemática.\r\n\r\nAsí lo ha dado a conocer la vicepresidenta cuarta de la Diputación y diputada de Ciudadanía, Natacha Rivas, junto a la diputada de Igualdad, Lourdes Piña, durante su visita a la sede de esta asociación en Vélez-Málaga.\r\n\r\nEn ella se desarrollan desde octubre del año pasado talleres de informática y nuevas tecnologías en los que participan 70 personas con discapacidad intelectual procedentes de Vélez-Málaga, La Viñuela, Algarrobo, Sayalonga, Benamocarra, Canillas de Aceituno y Canillas de Albaida.\r\n\r\nRivas ha destacado la labor de la Asociación ANNE y la idoneidad de esta iniciativa que no solo ha logrado su objetivo inicial de poner en contacto, sin riesgo de contagio, a personas con discapacidad y a sus familiares y allegados durante la pandemia, \"sino que ha logrado mucho más, ya que también ha dotado a personas en riesgo de exclusión de habilidades y capacidades que facilitarán su inclusión social y laboral\".\r\n\r\nSubvenciones al tercer sector\r\nEl pasado lunes se presentó en Diputación la nueva convocatoria de ayudas al tercer sector, y este miércoles, durante su visita a Vélez-Málaga, Rivas ha vuelto a dar los detalles de la convocatoria y ha recordado la finalidad de las ayudas y el plazo de solicitudes para las asociaciones de esta comarca.\r\n\r\n\r\nEn concreto, la Diputación de Málaga ha abierto líneas de ayudas valoradas en 1,2 millones de euros de los que 846.600 euros se destinan a proyectos de asociaciones del tercer sector, mientras que otros 400.000 euros serán para ayudas a familias con menores a su cargo, siempre en municipios de menos de 20.000 habitantes.\r\nEn el caso de las asociaciones, la convocatoria cuenta con dos líneas de actuación: la primera, para el desarrollo de proyectos de intervención o acción social y participación social, financiará con un máximo de 20.000 euros los proyectos seleccionados; y la segunda concederá un máximo de 30.000 para la adquisición de equipamientos necesarios para el desarrollo de un proyecto. La convocatoria se publicó en el BOP el 25 de junio, y el plazo de solicitudes está abierto hasta el 16 de julio.', '2021-07-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `idProyecto` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `tecnologia` varchar(150) NOT NULL,
  `duracion` int(11) NOT NULL,
  `foto` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='utf8mb4_general_ci';

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`idProyecto`, `nombre`, `descripcion`, `tecnologia`, `duracion`, `foto`) VALUES
(32, 'Peluquería y estética Isabel', 'Mi primer trabajo \"profesional\", diseño completo movil-first, sentando las bases para el posicionamiento SEO, uso de las APIs de GoogleMaps para el mapa de donde estamos.', 'HTML5 Y CSS3', 2, 'imgProyectos/peluqueria-home-1024.PNG'),
(33, 'OffBeat Fotovisuales', 'Mi segundo trabajo \"profesional\", deuda pendiente por fin resuelta, diseño pensado para desktop, ya que es en una pantalla grande donde podemos apreciar el trabajo realizado por los fotógrafos. En este trabajo nace la idea de usar un slider para ver imágenes sin usar Javascript. También aquí se tienen muy en cuenta la base para el posicionamiento SEO.', 'HTML5 Y CSS3', 2, 'imgProyectos/offbeat-home.PNG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` bigint(20) UNSIGNED NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellidos` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `usuario`, `password`, `role`, `nombre`, `apellidos`, `email`, `telefono`) VALUES
(1, 'admin', '$2y$10$bMyzm07QVsPc27DPeKAgUu2imzZwngIYvak9HebBPirVLIMmhvvam', 'admin', 'Manuel', 'Fernández Esteban', 'lolo3f@gmail.com', '677230977');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`idCita`),
  ADD UNIQUE KEY `idCita` (`idCita`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`idNoticia`),
  ADD UNIQUE KEY `idNoticias` (`idNoticia`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD UNIQUE KEY `idProyecto` (`idProyecto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `idCita` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `idNoticia` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `idProyecto` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
