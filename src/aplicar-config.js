// ==========================================
// APLICAR-CONFIG.JS
// Se carga en TODOS los HTML
// Lee el localStorage y aplica la configuración
// ==========================================

(function() {

  // ==========================================
  // LEER CONFIGURACIÓN GUARDADA
  // ==========================================
  function obtenerConfig() {
    try {
      const guardada = localStorage.getItem('appConfig');
      if (guardada) return JSON.parse(guardada);
    } catch(e) {}

    return {
      idioma        : 'es',
      tema          : 'dark',
      animaciones   : true,
      volumen       : 70,
      volumenJuego  : 70,
      sonidoNoti    : true,
      sonidoJuego   : true,
      autoTimer     : true,
      realtimeStats : true,
      dificultad    : 'medium',
      backupInterval: '15',
      cloudSync     : false,
      developerMode : false
    };
  }

  // ==========================================
  // APLICAR TEMA
  // ==========================================
  function aplicarTema(tema) {
    document.body.classList.remove('tema-dark', 'tema-light', 'tema-auto');
    if (tema === 'auto') {
      const esClaro = window.matchMedia('(prefers-color-scheme: light)').matches;
      document.body.classList.add(esClaro ? 'tema-light' : 'tema-dark');
      document.body.classList.add('tema-auto');
    } else {
      document.body.classList.add('tema-' + tema);
    }
  }

  // ==========================================
  // APLICAR ANIMACIONES
  // ==========================================
  function aplicarAnimaciones(activas) {
    if (activas) {
      document.body.classList.remove('sin-animaciones');
    } else {
      document.body.classList.add('sin-animaciones');
    }
  }

  // ==========================================
  // TRADUCCIONES COMPLETAS
  // ==========================================
    const textos = {
    es: {
      bienvenida       : 'Bienvenido a Cearte',
      subtitulo        : 'Tu experiencia comienza aquí',
      iniciar          : 'Pulsa para Entrar',

      etapasTitulo     : 'Etapas',
      preescolar       : 'Preescolar',
      primaria         : 'Primaria',
      secundaria       : 'Secundaria',

      catPreescolar    : 'CATEGORÍAS PREESCOLAR',
      catPrimaria      : 'CATEGORÍAS PRIMARIA',
      catSecundaria    : 'CATEGORÍAS SECUNDARIA',
      catSub           : '¡Elige una categoría y comienza a aprender jugando!',
      lenguaje         : 'Lenguajes',
      saberes          : 'Saberes y pensamiento cientifico',
      etica            : 'Ética,naturaleza y sociedades',
      humano           : 'De lo humano a comunitario',
      explorar         : '▶ EXPLORAR',
      juegosStat       : 'Juegos',
      categoriasStat   : 'Categorías',
      completadosStat  : 'Completados',

      juegosTitulo     : 'JUEGOS',
      juegosSub        : 'Selecciona un juego para jugar',
      buscarJuegos     : 'Buscar juego...',
      juegosDisponibles: 'juegos disponibles',
      facil            : 'Fácil',
      medio            : 'Medio',
      dificil          : 'Difícil',

      lenguajesH1      : 'Lenguajes',
      saberesH1        : 'Saberes y pensamiento cientifico',
      eticaH1          : 'Ética,naturaleza y sociedades',
      humanoH1         : 'De lo humano a comunitario',
      jugar            : 'JUGAR',
      noResultados     : 'No se encontraron juegos',
      anos3_5          : '3-5 años',
      anos4_6          : '4-6 años',
      anos6_8          : '6-8 años',
      anos9_12         : '9-12 años',
      anos13_15        : '13-15 años',
      minTxt           : 'min',

      volver           : ' Volver',
      aciertos         : 'Aciertos:',
      intentos         : 'Intentos:',
      tiempo           : 'Tiempo:',
      siguiente        : 'Siguiente →',
      anterior         : '← Anterior',
      reiniciar        : '🔄 Reiniciar',
      cargando         : '🎮 Cargando juego...',

      configuracion    : 'CONFIGURACIÓN',
      salir            : 'Salir',


      //Configuracion
       confGeneral        : 'General',
      confSonido         : 'Sonido',
      confJuego          : 'Juego',
      confBackup         : 'Backup y Sincronización',
      confAvanzado       : 'Avanzado',
      confIdioma         : 'Idioma',
      confIdiomaDesc     : 'Selecciona el idioma de la interfaz',
      confTema           : 'Tema',
      confTemaDesc       : 'Elige el tema visual de la aplicación',
      confAnimaciones    : 'Animaciones',
      confAnimacionesDesc: 'Activar/desactivar efectos visuales',
      confVolumenJuego     : 'Volumen del juego',
      confVolumenJuegoDesc : 'Controla el volumen de los sonidos dentro de los juegos',
      confVolumen        : 'Volumen principal',
      confVolumenDesc    : 'Controla el volumen de los efectos de sonido',
      confSonidoNoti     : 'Sonido de notificaciones',
      confSonidoNotiDesc : 'Reproducir sonido al recibir notificaciones',
      confSonidoJuego    : 'Sonido al completar juego',
      confSonidoJuegoDesc: 'Reproducir efecto de victoria',
      confTimer          : 'Temporizador automático',
      confTimerDesc      : 'Iniciar temporizador al abrir un juego',
      confPuntuacion     : 'Mostrar puntuación en tiempo real',
      confPuntuacionDesc : 'Actualizar estadísticas mientras juegas',
      confDificultad     : 'Dificultad por defecto',
      confDificultadDesc : 'Nivel de dificultad al iniciar juegos',
      confBackupInterval : 'Auto-backup cada',
      confBackupDesc     : 'Frecuencia de guardado automático',
      confNube           : 'Sincronización en la nube',
      confNubeDesc       : 'Guardar progreso en la nube (requiere cuenta)',
      confDevMode        : 'Modo desarrollador',
      confDevModeDesc    : 'Mostrar información de depuración',
      confLimpiar        : 'Limpiar caché',
      confLimpiarDesc    : 'Eliminar datos temporales',
      confLimpiarBtn     : 'Limpiar',
      confCancelar       : '✕ CANCELAR',
      confGuardar        : '✓ GUARDAR CAMBIOS',
      confRestablecer    : 'Restablecer',
      confTemaOscuro     : 'Oscuro (Predeterminado)',
      confTemaClaro      : 'Claro',
      confTemaAuto       : 'Automático',
      confFacil          : 'Fácil',
      confMedio          : 'Medio',
      confDificil        : 'Difícil',
      conf5min           : '5 minutos',
      conf15min          : '15 minutos',
      conf30min          : '30 minutos',
      conf1hora          : '1 hora',
      confTodas          : 'Todas',

      nombresJuegos    : {},
      descripcionesJuegos: {}
    },

    ca: {
      bienvenida       : 'Benvingut a Ceartee',
      subtitulo        : 'La teva experiència comença aquí',
      iniciar          : 'Pulsa per Entrar',

      etapasTitulo     : 'Etapes',
      preescolar       : 'Preescolar',
      primaria         : 'Primària',
      secundaria       : 'Secundària',

      catPreescolar    : 'CATEGORIES PREESCOLAR',
      catPrimaria      : 'CATEGORIES PRIMÀRIA',
      catSecundaria    : 'CATEGORIES SECUNDÀRIA',
      catSub           : 'Tria una categoria i comença a aprendre jugant!',
      lenguaje         : 'Llenguatges',
      saberes          : 'Sabers i pensament científic',
      etica            : 'Ètica,natura i societats',
      humano           : 'De l\'humà a comunitari',
      explorar         : '▶ EXPLORAR',
      juegosStat       : 'Jocs',
      categoriasStat   : 'Categories',
      completadosStat  : 'Completats',

      lenguajesH1      : 'Llenguatges',
      saberesH1        : 'Sabers i pensament científic',
      eticaH1          : 'Ètica,natura i societats',
      humanoH1         : 'De l\'humà a comunitari',
      jugar            : 'JUGAR',
      noResultados     : 'No s\'han trobat jocs',
      anos3_5          : '3-5 anys',
      anos4_6          : '4-6 anys',
      anos6_8          : '6-8 anys',
      anos9_12         : '9-12 anys',
      anos13_15        : '13-15 anys',
      minTxt           : 'min',

      juegosTitulo     : 'JOCS',
      juegosSub        : 'Selecciona un joc per jugar',
      buscarJuegos     : 'Cerca joc...',
      juegosDisponibles: 'jocs disponibles',
      facil            : 'Fàcil',
      medio            : 'Mitjà',
      dificil          : 'Difícil',

      volver           : ' Tornar',
      aciertos         : 'Encerts:',
      intentos         : 'Intents:',
      tiempo           : 'Temps:',
      siguiente        : 'Següent →',
      anterior         : '← Anterior',
      reiniciar        : '🔄 Reiniciar',
      cargando         : '🎮 Carregant joc...',

      configuracion    : 'CONFIGURACIÓ',
      salir            : 'Sortir',

      //Configuracion
            confGeneral        : 'General',
      confSonido         : 'So',
      confJuego          : 'Joc',
      confBackup         : 'Còpia de seguretat i Sincronització',
      confAvanzado       : 'Avançat',
      confIdioma         : 'Idioma',
      confIdiomaDesc     : 'Selecciona l\'idioma de la interfície',
      confTema           : 'Tema',
      confTemaDesc       : 'Tria el tema visual de l\'aplicació',
      confAnimaciones    : 'Animacions',
      confAnimacionesDesc: 'Activar/desactivar efectes visuals',
      confVolumenJuego     : 'Volum del joc',
      confVolumenJuegoDesc : 'Controla el volum dels sons dins dels jocs',
      confVolumen        : 'Volum principal',
      confVolumenDesc    : 'Controla el volum dels efectes de so',
      confSonidoNoti     : 'So de notificacions',
      confSonidoNotiDesc : 'Reproduir so en rebre notificacions',
      confSonidoJuego    : 'So en completar el joc',
      confSonidoJuegoDesc: 'Reproduir efecte de victòria',
      confTimer          : 'Temporitzador automàtic',
      confTimerDesc      : 'Iniciar temporitzador en obrir un joc',
      confPuntuacion     : 'Mostrar puntuació en temps real',
      confPuntuacionDesc : 'Actualitzar estadístiques mentre jugues',
      confDificultad     : 'Dificultat per defecte',
      confDificultadDesc : 'Nivell de dificultat en iniciar jocs',
      confBackupInterval : 'Auto-backup cada',
      confBackupDesc     : 'Freqüència de desat automàtic',
      confNube           : 'Sincronització al núvol',
      confNubeDesc       : 'Desar progrés al núvol (requereix compte)',
      confDevMode        : 'Mode desenvolupador',
      confDevModeDesc    : 'Mostrar informació de depuració',
      confLimpiar        : 'Netejar caché',
      confLimpiarDesc    : 'Eliminar dades temporals',
      confLimpiarBtn     : 'Netejar',
      confCancelar       : '✕ CANCEL·LAR',
      confGuardar        : '✓ DESAR CANVIS',
      confRestablecer    : 'Restablir',
      confTemaOscuro     : 'Fosc (Predeterminat)',
      confTemaClaro      : 'Clar',
      confTemaAuto       : 'Automàtic',
      confFacil          : 'Fàcil',
      confMedio          : 'Mitjà',
      confDificil        : 'Difícil',
      conf5min           : '5 minuts',
      conf15min          : '15 minuts',
      conf30min          : '30 minuts',
      conf1hora          : '1 hora',
      confTodas          : 'Totes',

      nombresJuegos    : {
        //Preescolar
        //Lenguajes 
        '4 Cuentos'                        : '4 Contes',
        'Actividad 5 años infantil'        : 'Activitat 5 anys infantil',
        'Aprende a leer con l,m,s,p,t,n'   : 'Aprèn a llegir amb l,m,s,p,t,n',
        'Aprendo jugando'                  : 'Aprenent jugant',
        'Caperucita Roja'                  : 'Caputxeta Vermella',
        'Diferentes objetos'               : 'Diferents objectes',
        'El pollito Chiqui'                : 'El pollet Chiqui',
        'El Soldadito de plomo'            : 'El Soldadet de plom',
        'Iniciación a la lectura'          : 'Iniciació a la lectura',
        'Jack y las habichuelas mágicas'   : 'Jack i les mongetes màgiques',
        'La gaviota de la Coviña'          : 'La gavina de la Coviña',
        'Los cuentos del lobo'             : 'Els contes del llop',
        'Nombre de los animales'           : 'Nom dels animals',
        'Números y letras'                 : 'Números i lletres',
        'Las Vocales'                      : 'Les Vocals',


             //Saberes y pensamiento cientifico
        'Actinfantil 3 años'                      : 'Actinfantil 3 anys',
        'Act infantil 4 años'                     : 'Act infantil 4 anys',
        'Actividades de orientacion especial'     : 'Activitats d\'orientació especial',
        'Actividades de lógica 1'                 : 'Activitats de lògica 1',
        'Actividades de lógica 2'                 : 'Activitats de lògica 2',
        'Actividades de lógica 3'                 : 'Activitats de lògica 3',
        'Animales salvajes'                       : 'Animals salvatges',
        'Bloques lógicos'                         : 'Blocs lògics',
        'Cálculo y Números del 1 al 9'           : 'Càlcul i Números del 1 al 9',
        'Clic de las medidas'                     : 'Clic de les mesures',
        'Clic de las posiciones'                  : 'Clic de les posicions',
        'Conceptos básicos'                       : 'Conceptes bàsics',
        'Contar del 1 al 9'                       : 'Comptar del 1 al 9',
        'Descomposición de números 0-10'          : 'Descomposició de números 0-10',
        'Direccionalidad, colores y formas'       : 'Direccionalitat, colors i formes',
        'El cuento de los números 0-9'            : 'El conte dels números 0-9',
        'El verano'                               : 'L\'estiu',
        'Formas y más formas'                     : 'Formes i més formes',
        'Iguales'                                 : 'Iguals',
        'Jugando con números'                     : 'Jugant amb números',
        'Jugando con números 2'                   : 'Jugant amb números 2',
        'Las regletas'                            : 'Les regletes',
        'Lógica, numeración y lateralidad'        : 'Lògica, numeració i lateralitat',
        'Los 3 osos'                              : 'Els 3 ossos',
        'Nina la gallina'                         : 'Nina la gallina',
        'Ordenar tamaños'                         : 'Ordenar mides',
        'Producto cartesiano'                     : 'Producte cartesià',
        'Secuencias'                              : 'Seqüències',
        'Series'                                  : 'Sèries',
        'Sombras'                                 : 'Ombres',
        'Tiempo, espacio y Cantidad'              : 'Temps, espai i Quantitat',
        'Uno, dos, tres o ninguno'                : 'Un, dos, tres o cap',

        //Etica,naturaleza y sociedades
        'Aprendiendo a reciclar'        : 'Aprenent a reciclar',
        'El elefante y otros grandes'   : 'L\'elefant i altres grans',
        'La ratita presumida'           : 'La rateta presumida',
        'Los musicos de bremen'         : 'Els músics de Bremen',
        'Los medios de transporte'      : 'Els mitjans de transport',
        'Observa y relaciona'           : 'Observa i relaciona',
        'Once upon a time'              : 'Once upon a time',
        'Otros niños del mundo'         : 'Altres nens del món',
        'Puzzles de animales'           : 'Puzzles d\'animals',
        'Reconocimientos de sonidos'    : 'Reconeixements de sons',

        //De lo humano a comunitario

        'Cuento para la tolerancia'   : 'Conte per a la tolerància',
        'Los rincones de la clase'    : 'Els racons de la classe'


      },

      descripcionesJuegos: {
        'Arma el rompecabezas de animales salvajes'          : 'Munta el trencaclosques d\'animals salvatges',
        'Actividades educativas para niños de 5 años'       : 'Activitats educatives per a nens de 5 anys',
        'Aprende las letras l, m, s, p, t, n jugando'      : 'Aprèn les lletres l, m, s, p, t, n jugant',
        'Diviértete aprendiendo con actividades interactivas': 'Diverteix-te aprenent amb activitats interactives',
        'Revive el cuento clásico de Caperucita Roja'       : 'Reviu el conte clàssic de Caputxeta Vermella',
        'Identifica y clasifica diferentes objetos'         : 'Identifica i classifica diferents objectes',
        'Acompaña al pollito Chiqui en su aventura'        : 'Acompanya el pollet Chiqui en la seva aventura',
        'Descubre la historia del soldadito de plomo'      : 'Descobreix la història del soldadet de plom',
        'Da tus primeros pasos en el mundo de la lectura'  : 'Dona els teus primers passos en el món de la lectura',
        'Vive la aventura mágica de Jack'                  : 'Viur l\'aventura màgica de Jack',
        'Conoce la historia de la gaviota'                 : 'Coneix la història de la gavina',
        'Descubre los cuentos que cuenta el lobo'          : 'Descobreix els contes que explica el llop',
        'Aprende los nombres de diferentes animales'       : 'Aprèn els noms de diferents animals',
        'Practica con números y letras'                    : 'Practica amb números i lletres',
        'Aprende las vocales de forma divertida'           : 'Aprèn les vocals de forma divertida'
      }
    },

    en: {
      bienvenida       : 'Welcome to Ceartee',
      subtitulo        : 'Your experience starts here',
      iniciar          : 'Click to Enter',

      etapasTitulo     : 'Stages',
      preescolar       : 'Preschool',
      primaria         : 'Primary',
      secundaria       : 'Secondary',

      catPreescolar    : 'PRESCHOOL CATEGORIES',
      catPrimaria      : 'PRIMARY CATEGORIES',
      catSecundaria    : 'SECONDARY CATEGORIES',
      catSub           : 'Choose a category and start learning by playing!',
      lenguaje         : 'Languages',
      saberes          : 'Knowledge & Scientific Thinking',
      etica            : 'Ethics, Nature & Societies',
      humano           : 'From Human to Community',
      explorar         : '▶ EXPLORE',
      juegosStat       : 'Games',
      categoriasStat   : 'Categories',
      completadosStat  : 'Completed',

      lenguajesH1      : 'Languages',
      saberesH1        : 'Knowledge & Scientific Thinking',
      eticaH1          : 'Ethics, Nature & Societies',
      humanoH1         : 'From Human to Community',
      jugar            : 'PLAY',
      noResultados     : 'No games found',
      anos3_5          : '3-5 years',
      anos4_6          : '4-6 years',
      anos6_8          : '6-8 years',
      anos9_12         : '9-12 years',
      anos13_15        : '13-15 years',
      minTxt           : 'min',

      juegosTitulo     : 'GAMES',
      juegosSub        : 'Select a game to play',
      buscarJuegos     : 'Search game...',
      juegosDisponibles: 'games available',
      facil            : 'Easy',
      medio            : 'Medium',
      dificil          : 'Hard',

      volver           : ' Back',
      aciertos         : 'Correct:',
      intentos         : 'Attempts:',
      tiempo           : 'Time:',
      siguiente        : 'Next →',
      anterior         : '← Previous',
      reiniciar        : '🔄 Restart',
      cargando         : '🎮 Loading game...',

      configuracion    : 'SETTINGS',
      salir            : 'Exit',

      //Configuración
      confGeneral        : 'General',
      confSonido         : 'Sound',
      confJuego          : 'Game',
      confBackup         : 'Backup & Sync',
      confAvanzado       : 'Advanced',
      confIdioma         : 'Language',
      confIdiomaDesc     : 'Select the interface language',
      confTema           : 'Theme',
      confTemaDesc       : 'Choose the visual theme of the app',
      confAnimaciones    : 'Animations',
      confAnimacionesDesc: 'Enable/disable visual effects',
       confVolumenJuego     : 'Game volume',
      confVolumenJuegoDesc : 'Controls the volume of sounds inside the games',
      confVolumen        : 'Master volume',
      confVolumenDesc    : 'Control the volume of sound effects',
      confSonidoNoti     : 'Notification sound',
      confSonidoNotiDesc : 'Play sound when receiving notifications',
      confSonidoJuego    : 'Sound on game completion',
      confSonidoJuegoDesc: 'Play victory effect',
      confTimer          : 'Automatic timer',
      confTimerDesc      : 'Start timer when opening a game',
      confPuntuacion     : 'Show score in real time',
      confPuntuacionDesc : 'Update stats while playing',
      confDificultad     : 'Default difficulty',
      confDificultadDesc : 'Difficulty level when starting games',
      confBackupInterval : 'Auto-backup every',
      confBackupDesc     : 'Automatic save frequency',
      confNube           : 'Cloud sync',
      confNubeDesc       : 'Save progress to the cloud (requires account)',
      confDevMode        : 'Developer mode',
      confDevModeDesc    : 'Show debug information',
      confLimpiar        : 'Clear cache',
      confLimpiarDesc    : 'Remove temporary data',
      confLimpiarBtn     : 'Clear',
      confCancelar       : '✕ CANCEL',
      confGuardar        : '✓ SAVE CHANGES',
      confRestablecer    : 'Reset',
      confTemaOscuro     : 'Dark (Default)',
      confTemaClaro      : 'Light',
      confTemaAuto       : 'Automatic',
      confFacil          : 'Easy',
      confMedio          : 'Medium',
      confDificil        : 'Hard',
      conf5min           : '5 minutes',
      conf15min          : '15 minutes',
      conf30min          : '30 minutes',
      conf1hora          : '1 hour',
      confTodas          : 'All',

      nombresJuegos    : {

        //Preescolar
        //Lenguajes

        '4 Cuentos'                        : '4 Stories',
        'Actividad 5 años infantil'        : '5-year-old Kids Activity',
        'Aprende a leer con l,m,s,p,t,n'   : 'Learn to read with l,m,s,p,t,n',
        'Aprendo jugando'                  : 'Learning by playing',
        'Caperucita Roja'                  : 'Little Red Riding Hood',
        'Diferentes objetos'               : 'Different objects',
        'El pollito Chiqui'                : 'Chiqui the little chick',
        'El Soldadito de plomo'            : 'The Tin Soldier',
        'Iniciación a la lectura'          : 'Introduction to reading',
        'Jack y las habichuelas mágicas'   : 'Jack and the Magic Beans',
        'La gaviota de la Coviña'          : 'The Seagull of Coviña',
        'Los cuentos del lobo'             : 'The Wolf\'s Tales',
        'Nombre de los animales'           : 'Names of animals',
        'Números y letras'                 : 'Numbers and letters',
        'Las Vocales'                      : 'The Vowels',

        //Saberes y pensamiento cientifico
        'Actinfantil 3 años'                      : 'Kids Activity 3 years',
        'Act infantil 4 años'                     : 'Kids Activity 4 years',
        'Actividades de orientacion especial'     : 'Special orientation activities',
        'Actividades de lógica 1'                 : 'Logic activities 1',
        'Actividades de lógica 2'                 : 'Logic activities 2',
        'Actividades de lógica 3'                 : 'Logic activities 3',
        'Animales salvajes'                       : 'Wild animals',
        'Bloques lógicos'                         : 'Logic blocks',
        'Cálculo y Números del 1 al 9'           : 'Calculation & Numbers 1-9',
        'Clic de las medidas'                     : 'Click of measurements',
        'Clic de las posiciones'                  : 'Click of positions',
        'Conceptos básicos'                       : 'Basic concepts',
        'Contar del 1 al 9'                       : 'Count from 1 to 9',
        'Descomposición de números 0-10'          : 'Number decomposition 0-10',
        'Direccionalidad, colores y formas'       : 'Directionality, colors & shapes',
        'El cuento de los números 0-9'            : 'The tale of numbers 0-9',
        'El verano'                               : 'Summer',
        'Formas y más formas'                     : 'Shapes and more shapes',
        'Iguales'                                 : 'Equals',
        'Jugando con números'                     : 'Playing with numbers',
        'Jugando con números 2'                   : 'Playing with numbers 2',
        'Las regletas'                            : 'The rods',
        'Lógica, numeración y lateralidad'        : 'Logic, numeration & laterality',
        'Los 3 osos'                              : 'The 3 bears',
        'Nina la gallina'                         : 'Nina the hen',
        'Ordenar tamaños'                         : 'Sort sizes',
        'Producto cartesiano'                     : 'Cartesian product',
        'Secuencias'                              : 'Sequences',
        'Series'                                  : 'Series',
        'Sombras'                                 : 'Shadows',
        'Tiempo, espacio y Cantidad'              : 'Time, space & quantity',
        'Uno, dos, tres o ninguno'                : 'One, two, three or none',

        //Etica, naturaleza y sociedades
        'Aprendiendo a reciclar'        : 'Learning to recycle',
        'El elefante y otros grandes'   : 'The elephant and other big ones',
        'La ratita presumida'           : 'The vain little mouse',
        'Los musicos de bremen'         : 'The musicians of Bremen',
        'Los medios de transporte'      : 'Means of transport',
        'Observa y relaciona'           : 'Observe and relate',
        'Once upon a time'              : 'Once upon a time',
        'Otros niños del mundo'         : 'Other children of the world',
        'Puzzles de animales'           : 'Animal puzzles',
        'Reconocimientos de sonidos'    : 'Sound recognition',

        //De lo humano a comunitario

        'Cuento para la tolerancia'   : 'A tale for tolerance',
        'Los rincones de la clase'    : 'The corners of the classroom'
        

      },
       descripcionesJuegos: {
        'Arma el rompecabezas de animales salvajes'          : 'Put together the wild animals puzzle',
        'Actividades educativas para niños de 5 años'       : 'Educational activities for 5-year-old kids',
        'Aprende las letras l, m, s, p, t, n jugando'      : 'Learn the letters l, m, s, p, t, n by playing',
        'Diviértete aprendiendo con actividades interactivas': 'Have fun learning with interactive activities',
        'Revive el cuento clásico de Caperucita Roja'       : 'Relive the classic tale of Little Red Riding Hood',
        'Identifica y clasifica diferentes objetos'         : 'Identify and classify different objects',
        'Acompaña al pollito Chiqui en su aventura'        : 'Join Chiqui the little chick on his adventure',
        'Descubre la historia del soldadito de plomo'      : 'Discover the story of the Tin Soldier',
        'Da tus primeros pasos en el mundo de la lectura'  : 'Take your first steps into the world of reading',
        'Vive la aventura mágica de Jack'                  : 'Experience Jack\'s magical adventure',
        'Conoce la historia de la gaviota'                 : 'Learn the story of the seagull',
        'Descubre los cuentos que cuenta el lobo'          : 'Discover the tales told by the wolf',
        'Aprende los nombres de diferentes animales'       : 'Learn the names of different animals',
        'Practica con números y letras'                    : 'Practice with numbers and letters',
        'Aprende las vocales de forma divertida'           : 'Learn the vowels in a fun way'
      }
    }
  };

  // ==========================================
  // APLICAR IDIOMA
  // ==========================================
  function aplicarIdioma(idioma) {
    const t = textos[idioma] || textos['es'];

    // 1. data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const clave = el.getAttribute('data-i18n');
      if (t[clave]) el.textContent = t[clave];
    });

   // 2. Botón volver en todas las páginas
    document.querySelectorAll('.btn-back .btn-text').forEach(el => {
      el.textContent = t.volver;
    });
    document.querySelectorAll('.btn-backer').forEach(el => {
      el.textContent = t.volver;
    });

    // 3. Aplicar por página
     aplicarTextoIndex(t);
    aplicarTextoEtapas(t);
    aplicarTextoCategorias(t);
    aplicarTextoJuegos(t);
    aplicarTextoVista(t);
    aplicarTextoConfig(t);

    document.documentElement.lang = idioma;
  }


// === index.html ===
  function aplicarTextoIndex(t) {
    const title = document.querySelector('.title');
    if (title) title.textContent = t.bienvenida;

    const sub = document.querySelector('.subtitle');
    if (sub) sub.textContent = t.subtitulo;

    const btn = document.getElementById('btnEnter') || document.querySelector('.btn-enter');
    if (btn) btn.textContent = t.iniciar;
  }




  // === Etapas.html ===
  function aplicarTextoEtapas(t) {
    const h1 = document.querySelector('.header-title h1');
    if (h1) {
      const txt = h1.textContent.toLowerCase();
      if (txt.includes('etapa') || txt.includes('stage') || txt.includes('etape')) {
        h1.textContent = t.etapasTitulo;
      }
    }

    document.querySelectorAll('.Btn-button').forEach(btn => {
      btn.textContent = t.preescolar;
    });
    document.querySelectorAll('.Btn-button2').forEach(btn => {
      btn.textContent = t.primaria;
    });
    document.querySelectorAll('.Btn-button3').forEach(btn => {
      btn.textContent = t.secundaria;
    });
  }

  // === Categorias.html ===
  function aplicarTextoCategorias(t) {
    const h1 = document.querySelector('.header-title h1');
    if (h1) {
      const txt = h1.textContent.toUpperCase();
      if (txt.includes('PREESCOLAR') || txt.includes('PRESCHOOL')) {
        h1.textContent = t.catPreescolar;
      }
      if (txt.includes('PRIMARIA') || txt.includes('PRIMARY') || txt.includes('PRIMÀRIA')) {
        h1.textContent = t.catPrimaria;
      }
      if (txt.includes('SECUNDARIA') || txt.includes('SECONDARY') || txt.includes('SECUNDÀRIA')) {
        h1.textContent = t.catSecundaria;
      }
    }

    const sub = document.querySelector('.page-subtitle');
    if (sub) sub.textContent = t.catSub;

    document.querySelectorAll('.category-card').forEach(card => {
      const titulo = card.querySelector('.card-title');
      if (!titulo) return;
      const txt = titulo.textContent.trim().toLowerCase();

      if (txt.includes('lenguaj') || txt.includes('llenguat') || txt.includes('language')) {
        titulo.textContent = t.lenguaje;
      }
      if (txt.includes('saber') || txt.includes('knowledge')) {
        titulo.textContent = t.saberes;
      }
      if (txt.includes('étic') || txt.includes('ètic') || txt.includes('ethic')) {
        titulo.textContent = t.etica;
      }
      if (txt.includes('humano') || txt.includes('humà') || txt.includes('human')) {
        titulo.textContent = t.humano;
      }

      const btn = card.querySelector('.card-btn span');
      if (btn) btn.textContent = t.explorar;

      var gameCount = card.querySelector('.game-count');
      if (gameCount) {
        var num = gameCount.textContent.replace(/[^0-9]/g, '');
        if (num) {
          gameCount.textContent = num + ' ' + t.juegosStat.toLowerCase();
        }
      }
    });

    document.querySelectorAll('.footer-stats .stat-label').forEach(el => {
      const txt = el.textContent.trim().toLowerCase();
      if (txt.includes('juego') || txt.includes('joc') || txt.includes('game')) el.textContent = t.juegosStat;
      if (txt.includes('categor') || txt.includes('categorie')) el.textContent = t.categoriasStat;
      if (txt.includes('completad') || txt.includes('completat') || txt.includes('completed')) el.textContent = t.completadosStat;
    });
  }
  
    // === Lenguajes.html / Etica.html / Saberes.html / Humano.html ===
    function aplicarTextoJuegos(t) {
    var h1 = document.querySelector('.header-title h1');
    if (h1) {
      var txt = h1.textContent.trim().toLowerCase();
      if (txt.includes('lenguaj') || txt.includes('llenguat') || txt.includes('language')) {
        h1.textContent = t.lenguajesH1;
      }
      if (txt.includes('saber') || txt.includes('knowledge')) {
        h1.textContent = t.saberesH1;
      }
      if (txt.includes('étic') || txt.includes('ètic') || txt.includes('ethic')) {
        h1.textContent = t.eticaH1;
      }
      if (txt.includes('humano') || txt.includes('humà') || txt.includes('human')) {
        h1.textContent = t.humanoH1;
      }
    }

    if (t.nombresJuegos && Object.keys(t.nombresJuegos).length > 0) {
      document.querySelectorAll('.game-card .game-title').forEach(function(el) {
        var original = el.textContent.trim();
        if (t.nombresJuegos[original]) {
          el.textContent = t.nombresJuegos[original];
        }
      });
    }

    if (t.descripcionesJuegos && Object.keys(t.descripcionesJuegos).length > 0) {
      document.querySelectorAll('.game-card .game-description').forEach(function(el) {
        var original = el.textContent.trim();
        if (t.descripcionesJuegos[original]) {
          el.textContent = t.descripcionesJuegos[original];
        }
      });
    }

    document.querySelectorAll('.play-text').forEach(function(el) {
      el.textContent = t.jugar;
    });

    document.querySelectorAll('.game-meta .meta-item').forEach(function(item) {
      var span = item.querySelector('span:last-child');
      if (!span) return;
      var txt = span.textContent.trim();

      if (txt === 'Fácil' || txt === 'Fàcil' || txt === 'Easy') {
        span.textContent = t.facil;
        return;
      }
      if (txt === 'Medio' || txt === 'Mitjà' || txt === 'Medium') {
        span.textContent = t.medio;
        return;
      }
      if (txt === 'Difícil' || txt === 'Difícil' || txt === 'Hard') {
        span.textContent = t.dificil;
        return;
      }
     if (txt === '3 años' || txt === '3 anys' || txt === '3 years') { span.textContent = t.anos3; return; }
      if (txt === '4 años' || txt === '4 anys' || txt === '4 years') { span.textContent = t.anos4; return; }
      if (txt.includes('3-5')) { span.textContent = t.anos3_5; return; }
      if (txt.includes('4-6')) { span.textContent = t.anos4_6; return; }
      if (txt.includes('6-8')) { span.textContent = t.anos6_8; return; }
      if (txt.includes('9-12')) { span.textContent = t.anos9_12; return; }
      if (txt.includes('13-15')) { span.textContent = t.anos13_15; return; }

      if (txt.includes('min')) {
        var num = txt.replace(/[^0-9]/g, '');
        if (num) span.textContent = num + ' ' + t.minTxt;
        return;
      }
    });

    document.querySelectorAll('.game-count').forEach(function(el) {
      var num = el.textContent.replace(/[^0-9]/g, '');
      if (num) {
        el.textContent = num + ' ' + t.juegosStat.toLowerCase();
      }
    });

    document.querySelectorAll('.count-text').forEach(function(el) {
      el.textContent = t.juegosStat.toLowerCase();
    });


    var noResults = document.querySelector('.no-results p');
    if (noResults) noResults.textContent = t.noResultados;

    var search = document.getElementById('searchInput');
    if (search) {
      var ph = search.getAttribute('placeholder') || '';
      if (ph.includes('Buscar') || ph.includes('Cerca') || ph.includes('Search')) {
        search.setAttribute('placeholder', t.buscarJuegos);
      }
    }
  }

  // === vista.html ===
  function aplicarTextoVista(t) {
    document.querySelectorAll('.stat-label').forEach(el => {
      const txt = el.textContent.trim().toLowerCase();
      if (txt.includes('acierto') || txt.includes('encert') || txt.includes('correct')) el.textContent = t.aciertos;
      if (txt.includes('intento') || txt.includes('intent') || txt.includes('attempt')) el.textContent = t.intentos;
      if (txt.includes('tiempo') || txt.includes('temps') || txt.includes('time')) el.textContent = t.tiempo;
    });

    const btnSig  = document.querySelector('.btn-nav2');
    const btnAnt  = document.querySelector('.btn-nav1');
    const btnRein = document.querySelector('.btn-nav3');
    if (btnSig)  btnSig.textContent  = t.siguiente;
    if (btnAnt)  btnAnt.textContent  = t.anterior;
    if (btnRein) btnRein.textContent = t.reiniciar;
  }

// === Configuracion.html ===
  function aplicarTextoConfig(t) {

     if (!document.querySelector('.settings-container')) return;
    var h1 = document.querySelector('.header-title h1');
    if (h1) h1.textContent = t.configuracion;

    var btnBack = document.querySelector('.btn-back .btn-text');
    if (btnBack) btnBack.textContent = t.confRestablecer ? t.volver : t.volver;

    var btnReset = document.querySelector('.btn-reset .btn-text');
    if (btnReset) btnReset.textContent = t.confRestablecer;

    // Secciones
    var sections = document.querySelectorAll('.section-title');
    var sectionNames = [t.confGeneral, t.confSonido, t.confJuego, t.confBackup, t.confAvanzado];
    sections.forEach(function(el, i) {
      if (sectionNames[i]) {
        var icon = el.querySelector('.section-icon');
        var iconText = icon ? icon.textContent : '';
        el.innerHTML = '<span class="section-icon">' + iconText + '</span> ' + sectionNames[i];
      }
    });

    // Labels y descripciones por ID
    var labels = {
      'language': [t.confIdioma, t.confIdiomaDesc],
      'theme': [t.confTema, t.confTemaDesc],
      'animations': [t.confAnimaciones, t.confAnimacionesDesc],
      'game-volume': [t.confVolumenJuego, t.confVolumenJuegoDesc],
      'volume': [t.confVolumen, t.confVolumenDesc],
      'notification-sound': [t.confSonidoNoti, t.confSonidoNotiDesc],
      'completion-sound': [t.confSonidoJuego, t.confSonidoJuegoDesc],
      'auto-timer': [t.confTimer, t.confTimerDesc],
      'realtime-stats': [t.confPuntuacion, t.confPuntuacionDesc],
      'default-difficulty': [t.confDificultad, t.confDificultadDesc],
      'backup-interval': [t.confBackupInterval, t.confBackupDesc],
      'cloud-sync': [t.confNube, t.confNubeDesc],
      'developer-mode': [t.confDevMode, t.confDevModeDesc]
    };

    Object.keys(labels).forEach(function(id) {
      var input = document.getElementById(id);
      if (!input) return;
      var item = input.closest('.setting-item');
      if (!item) return;
      var labelEl = item.querySelector('.setting-label');
      var descEl = item.querySelector('.setting-description');
      if (labelEl) labelEl.textContent = labels[id][0];
      if (descEl) descEl.textContent = labels[id][1];
    });

    // Limpiar caché (no tiene input, es un button)
    var btnClean = document.querySelector('.btn-clean');
    if (btnClean) btnClean.textContent = t.confLimpiarBtn;

    // Select tema
    var elTema = document.getElementById('theme');
    if (elTema) {
      elTema.options[0].text = t.confTemaOscuro;
      elTema.options[1].text = t.confTemaClaro;
      elTema.options[2].text = t.confTemaAuto;
    }

    // Select dificultad
    var elDif = document.getElementById('default-difficulty');
    if (elDif) {
      elDif.options[0].text = t.confTodas;
      elDif.options[1].text = t.confFacil;
      elDif.options[2].text = t.confMedio;
      elDif.options[3].text = t.confDificil;
    }

    // Select backup
    var elBackup = document.getElementById('backup-interval');
    if (elBackup) {
      elBackup.options[0].text = t.conf5min;
      elBackup.options[1].text = t.conf15min;
      elBackup.options[2].text = t.conf30min;
      elBackup.options[3].text = t.conf1hora;
    }

    // Footer
    var btnCancel = document.querySelector('.btn-cancel');
    if (btnCancel) btnCancel.textContent = t.confCancelar;

    var btnSave = document.querySelector('.btn-save');
    if (btnSave) btnSave.textContent = t.confGuardar;
  }


  // ==========================================
  // CSS DE TEMAS
  // ==========================================
  function inyectarCSSTemas() {
    if (document.getElementById('css-temas-global')) return;
    const style = document.createElement('style');
    style.id = 'css-temas-global';
    style.textContent = `
      body.tema-light {
        background: linear-gradient(135deg, #e0e7ff, #c7d2fe) !important;
        color: #1a1a2e !important;
      }
      body.tema-light .card,
      body.tema-light .game-card,
      body.tema-light .category-card,
      body.tema-light .stage-card,
      body.tema-light .stats-panel,
      body.tema-light .nav-buttons,
      body.tema-light .header,
      body.tema-light .settings-section,
      body.tema-light .main-container {
        background: rgba(255,255,255,0.85) !important;
        color: #1a1a2e !important;
      }
      body.tema-light h1, body.tema-light h2, body.tema-light h3,
      body.tema-light p, body.tema-light label,
      body.tema-light .stat-label, body.tema-light .stat-value,
      body.tema-light .game-title, body.tema-light .game-description,
      body.tema-light .card-title, body.tema-light .page-subtitle {
        color: #1a1a2e !important;
      }
      body.tema-light .btn-back,
      body.tema-light .btn-backer {
        background: rgba(255,255,255,0.8) !important;
        color: #3730a3 !important;
        border-color: #3730a3 !important;
      }
      body.tema-light .setting-description {
        color: #555 !important;
      }
       body.sin-animaciones *,
      body.sin-animaciones *::before,
      body.sin-animaciones *::after {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
      }
      body.sin-animaciones .category-card,
      body.sin-animaciones .game-card,
      body.sin-animaciones .stage-card,
      body.sin-animaciones .card,
      body.sin-animaciones .btn-enter,
      body.sin-animaciones .decoration span,
      body.sin-animaciones .bg-animation span,
      body.sin-animaciones .container,
      body.sin-animaciones .main-container,
      body.sin-animaciones .settings-container {
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
      }
      body.sin-animaciones .bg-animation span {
        display: none !important;
      }

    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // VOLUMEN
  // ==========================================
  (function instalarInterceptorAudio() {
    if (window.__CEARTEE_AUDIO_INSTALADO__) return;
    window.__CEARTEE_AUDIO_INSTALADO__ = true;

    const AudioOriginal = window.Audio;
    window.Audio = function(src) {
      const audio = new AudioOriginal(src);
      try {
        const config = JSON.parse(localStorage.getItem('appConfig') || '{}');
        const vol = (config.volumen != null ? config.volumen : 70) / 100;
        audio.volume = vol;
      } catch(e) {}
      return audio;
    };
  })();

  function aplicarVolumen(volumen) {
    const vol = (volumen != null ? volumen : 70) / 100;
    window.__volumenGlobal = vol;
    document.querySelectorAll('audio, video').forEach(el => { el.volume = vol; });
  }

  // ==========================================
  // MODO DESARROLLADOR
  // ==========================================
  function aplicarModoDesarrollador(activo) {
    if (activo) {
      document.body.classList.add('modo-dev');
    } else {
      document.body.classList.remove('modo-dev');
    }
  }

// Exponer funciones para settings.js
  window.aplicarIdiomaGlobal = aplicarIdioma;
  window.aplicarTemaGlobal = aplicarTema;
  window.aplicarAnimacionesGlobal = aplicarAnimaciones;

  // ==========================================
  // FUNCIÓN PRINCIPAL
  // ==========================================
  function aplicarConfiguracionGlobal() {
    const config = obtenerConfig();
    inyectarCSSTemas();
    aplicarTema(config.tema);
    aplicarAnimaciones(config.animaciones);
    aplicarIdioma(config.idioma);
    aplicarVolumen(config.volumen);
    aplicarModoDesarrollador(config.developerMode);
    window.appConfig = config;
    // Aplicar filtro de dificultad si estamos en una página de juegos
    if (document.querySelector('.game-card')) {
      setTimeout(function() {
        if (window.aplicarFiltroDificultad) window.aplicarFiltroDificultad();
      }, 600);
    }
    // Actualizar footer de estadísticas
    if (document.querySelector('.footer-stats')) {
      setTimeout(function() {
        if (window.actualizarFooterStats) window.actualizarFooterStats();
      }, 300);
    }

  }

  // Ejecutar tema inmediatamente
  try {
    const config = obtenerConfig();
    inyectarCSSTemas();
    aplicarTema(config.tema);
    aplicarAnimaciones(config.animaciones);
  } catch(e) {}

  // Aplicar todo cuando DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarConfiguracionGlobal);
  } else {
    aplicarConfiguracionGlobal();
  }

  

// ==========================================
  // SISTEMA DE SONIDOS
  // ==========================================
    window.sistemaSonido = {
    playNotificacion: function() {
      var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
      if (!config.sonidoNoti) return;
      // ✅ FIX: Usar volumen principal (efectos de UI), no volumenJuego
      var vol = (config.volumen != null ? config.volumen : 70) / 100;
      try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(vol * 0.5, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      } catch(e) {}
    },

    playVictoria: function() {
      var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
      if (!config.sonidoJuego) return;
      // ✅ FIX: Respetar el valor 0 sin convertirlo en 70
      var vol = (config.volumen != null ? config.volumen : 70) / 100;
      try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();

        var notas = [523, 659, 784, 1047];
        var duracion = 0.15;

        notas.forEach(function(freq, i) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          var inicio = ctx.currentTime + (i * duracion);
          gain.gain.setValueAtTime(vol * 0.5, inicio);
          gain.gain.linearRampToValueAtTime(0, inicio + duracion);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(inicio);
          osc.stop(inicio + duracion);
        });
      } catch(e) {}
    },

    playClick: function() {
      var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
      // ✅ FIX: Respetar el valor 0 sin convertirlo en 70
      var vol = (config.volumen != null ? config.volumen : 70) / 100;
      try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 600;
        gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      } catch(e) {}
    }
  };




      window.aplicarFiltroDificultad = function() {
    try {
      var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
      var dificultad = config.dificultad || 'todas';

      // Si es "todas", mostrar todo y asignar data-difficulty
      document.querySelectorAll('.game-card').forEach(function(card) {
        if (!card.getAttribute('data-difficulty')) {
          var metaItems = card.querySelectorAll('.meta-item span:last-child');
          var diff = 'Facil';
          metaItems.forEach(function(span) {
            var txt = span.textContent.trim().toLowerCase().replace(/í/g, 'i').replace(/á/g, 'a').replace(/à/g, 'a');
            if (txt === 'facil' || txt === 'easy') diff = 'Facil';
            if (txt === 'medio' || txt === 'medium' || txt === 'mitja') diff = 'Medio';
            if (txt === 'dificil' || txt === 'hard') diff = 'Dificil';
          });
          card.setAttribute('data-difficulty', diff);
        }
      });

      if (dificultad === 'todas') {
        document.querySelectorAll('.game-card').forEach(function(card) {
          card.style.display = '';
        });
        console.log('🎯 Mostrando todos los juegos');
        return;
      }

      var mapaDificultad = {
        'easy': 'Facil',
        'medium': 'Medio',
        'hard': 'Dificil'
      };

      var objetivo = mapaDificultad[dificultad] || 'Facil';

      var count = 0;
      document.querySelectorAll('.game-card').forEach(function(card) {
        var cardDiff = card.getAttribute('data-difficulty') || 'Facil';
        if (cardDiff === objetivo) {
          card.style.display = '';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      var gameCount = document.getElementById('gameCount');
      if (gameCount) gameCount.textContent = count;

      var noResults = document.getElementById('noResults');
      if (noResults) noResults.style.display = count === 0 ? '' : 'none';

      console.log('🎯 Filtro dificultad:', objetivo, '- Mostrando:', count, 'juegos');
    } catch(e) {
      console.warn('Error filtro dificultad:', e);
    }
  };


  // ==========================================
  // ACTUALIZAR FOOTER DE ESTADÍSTICAS
  // ==========================================
    window.actualizarFooterStats = function() {
    try {
      var completados = 0; // Por defecto 0

      // ✅ Solo leer del perfil activo si existe PerfilesManager
      if (window.PerfilesManager) {
        var perfil = window.PerfilesManager.obtenerPerfilActivo();
        if (perfil) {
          var stats = window.PerfilesManager.obtenerDatos(perfil.id, 'stats', {});
          completados = stats.juegosCompletados || 0;
          console.log('📊 Footer desde perfil:', perfil.nombre, '- Completados:', completados);
        } else {
          console.log('📊 Footer: Sin perfil activo, mostrando 0');
        }
      } else {
        // Si no existe PerfilesManager en esta página, mostrar 0
        console.log('📊 Footer: PerfilesManager no disponible, mostrando 0');
      }

      // Actualizar el DOM
      var footerItems = document.querySelectorAll('.footer-stats .stat-item');
      footerItems.forEach(function(item) {
        var label = item.querySelector('.stat-label');
        if (label) {
          var txt = label.textContent.trim().toLowerCase();
          if (txt === 'completados' || txt === 'completats' || txt === 'completed') {
            var value = item.querySelector('.stat-value');
            if (value) value.textContent = completados;
          }
        }
      });

    } catch(e) {
      console.warn('Error actualizando footer:', e);
    }
  };

    // ==========================================
  // 🐛 PANEL DE DEPURACIÓN EN TIEMPO REAL
  // ==========================================
  window.initDebugPanel = function() {
    if (document.getElementById('debug-panel')) return;

    var panel = document.createElement('div');
    panel.id = 'debug-panel';
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.9);
      color: #0f0;
      font-family: 'Courier New', monospace;
      font-size: 11px;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid #0f0;
      z-index: 2147483647;
      pointer-events: none;
      max-width: 260px;
      line-height: 1.6;
      display: none;
      box-shadow: 0 0 20px rgba(0,255,0,0.2);
    `;
    document.body.appendChild(panel);

    // Calcular FPS
    var fps = 0;
    var lastTime = performance.now();
    var frames = 0;
    function updateFPS() {
      frames++;
      var now = performance.now();
      if (now - lastTime >= 1000) {
        fps = frames;
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    }
    updateFPS();

    // Actualizar panel cada 500ms
    setInterval(function() {
      try {
        var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
        if (!config.developerMode) {
          panel.style.display = 'none';
          return;
        }
        panel.style.display = 'block';

        var pagina = window.location.pathname.split('/').pop() || 'index.html';
        var jclic = window.juegoListo ? '✅ Listo' : (document.getElementById('jclic-container') ? '⏳ Cargando' : '❌');
        var titulo = document.getElementById('gameTitle')?.textContent || '-';
        var aciertos = document.getElementById('aciertos')?.textContent || '-';
        var intentos = document.getElementById('intentos')?.textContent || '-';
        var tiempo = document.getElementById('tiempo')?.textContent || '-';
        var firebase = window.FirebaseSync?.usuario ? '✅ ' + (window.FirebaseSync.usuario.email || '') : '❌';
        var lsCount = localStorage.length;
        var memoria = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB' : 'N/A';
        var gameVol = window.__gameVolume != null ? Math.round(window.__gameVolume * 100) + '%' : (config.volumenJuego || '-') + '%';

        panel.innerHTML = 
          '<div style="border-bottom:1px solid #0f0;margin-bottom:6px;font-weight:bold;font-size:13px;">🐛 DEBUG MODE</div>' +
          '<div>📋 FPS: <b>' + fps + '</b></div>' +
          '<div>📄 Página: ' + pagina + '</div>' +
          '<div>🎮 JClic: ' + jclic + '</div>' +
          '<div>🕹️ Juego: ' + titulo + '</div>' +
          '<div>✅ Aciertos: ' + aciertos + ' | 🎯 Intentos: ' + intentos + '</div>' +
          '<div>⏱️ Tiempo: ' + tiempo + '</div>' +
          '<div style="border-top:1px solid #333;margin:6px 0;"></div>' +
          '<div>🌐 Idioma: ' + (config.idioma || '-') + ' | 🎨 Tema: ' + (config.tema || '-') + '</div>' +
          '<div>🔊 Vol App: ' + (config.volumen || '-') + '% | Vol Juego: ' + gameVol + '</div>' +
          '<div>🎯 Dificultad: ' + (config.dificultad || '-') + '</div>' +
          '<div>⏱️ Timer: ' + (config.autoTimer ? 'ON' : 'OFF') + ' | 📊 Stats: ' + (config.realtimeStats ? 'ON' : 'OFF') + '</div>' +
          '<div style="border-top:1px solid #333;margin:6px 0;"></div>' +
          '<div>☁️ Firebase: ' + firebase + '</div>' +
          '<div>💾 localStorage: ' + lsCount + ' items</div>' +
          '<div>🧠 Memoria: ' + memoria + '</div>';
      } catch(e) {}
    }, 500);
  };

  // Iniciar panel al cargar
  window.initDebugPanel();

})();