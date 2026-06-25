// paths.js — Milo Speaks Spanish
// 13 Paths, 65 Stops, 390 words
// Revised: 2026-06-24
//
// PHILOSOPHY: Survival-first, communicative usability model
// Every Stop is a scene — a situation the learner can function in immediately
// Structure: 5 Stops per Path, 6 words per Stop, uniform across all Tiers
//
// WHAT CHANGED FROM PREVIOUS VERSION:
// - Isolated grammar particles removed as drill targets (articles, conjunctions, prepositions)
//   → These are acquired via tap-to-define in sentence context (tap-to-define feature prerequisite)
// - Subject pronouns (yo, tú, él, ella) removed as drill targets → exposure only via sentences
// - Object pronouns (me, se) replaced by fixed expressions (me llamo, me gusta, se llama)
// - Verb infinitives removed as standalone Stop words → forms appear in sentence context
// - Conjugation paradigm completions (nosotros/ellos forms) moved to Advanced Beginner
//   where paradigm work belongs — Beginner focuses on yo/tú/él/ellos (highest frequency)
// - Numbers moved from Path 9 → Paths 2-3 (survival day one)
// - Survival learner phrases added to Path 1 (no entiendo, más despacio, etc.)
// - Days of week added to Path 8
// - Tener expressions (tengo hambre, etc.) added to Path 9
// - siempre/nunca/todavía/ya/a veces/pronto given proper home in Path 13
// - abierto/cerrado added (high survival — is the store open/closed?)
// - Navigation/directions Stop added to Path 6
// - Weather consolidated into clean standalone Stop
//
// PROGRESSIVE IMMERSION MODEL (locked 2026-06-24):
// Beginner (Paths 1-4): English shown freely
// Advanced Beginner (Paths 5-8... wait, tiers):
//   Tier 1 Beginner I (Paths 1-4): English shown freely
//   Tier 2 Beginner II (Paths 5-8): English de-emphasized, tap to reveal
//   Tier 3 Advanced Beginner (Paths 9-12): English hidden by default
//   Tier 4 Intermediate (Path 13): English removed from drill prompts
//
// FETCH WEIGHTING (locked 2026-06-24):
// Failure-rate weighted. Sentence-level drills unlock at Strong mastery level.
//
// XP (locked 2026-06-24):
// Output drills: +2 XP. Input drills: +1 XP. Mastery crossing bonus: +11 XP.
//
// All es values must match exactly with MASTER array in words.js
// videoUrl: null on all Stops — feature flag. Add YouTube URL when video ready.

export const PATHS = [

  // ─────────────────────────────────────────────
  // TIER 1 — BEGINNER I
  // Paths 1-4 | English shown freely
  // Focus: survival interaction, core verb forms in context, essential vocabulary
  // ─────────────────────────────────────────────

  {
    id: 'path1',
    title: 'El Primer Encuentro',
    titleEn: 'The First Meeting',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p1s1',
        title: 'Hola y Adiós',
        titleEn: 'Hello and Goodbye',
        videoUrl: null,
        words: ['hola', 'adiós', 'buenos días', 'buenas tardes', 'buenas noches', '¿cómo estás?'],
      },
      {
        id: 'p1s2',
        title: 'Por Favor y Gracias',
        titleEn: 'Please and Thank You',
        videoUrl: null,
        words: ['gracias', 'de nada', 'por favor', 'perdón', 'lo siento', 'disculpe'],
      },
      {
        id: 'p1s3',
        title: 'Mucho Gusto',
        titleEn: 'Nice to Meet You',
        videoUrl: null,
        words: ['mucho gusto', 'encantado', 'hasta luego', 'hasta mañana', 'me llamo', '¿cómo te llamas?'],
      },
      {
        id: 'p1s4',
        title: 'No Entiendo',
        titleEn: 'I Don\'t Understand',
        videoUrl: null,
        words: ['no entiendo', 'más despacio', '¿puedes repetir?', '¿cómo se dice?', 'un momento', 'no sé'],
      },
      {
        id: 'p1s5',
        title: 'Sí y No',
        titleEn: 'Yes and No',
        videoUrl: null,
        words: ['sí', 'no', 'bien', 'mal', 'muy bien', 'más o menos'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 2 — Ser
  // ─────────────────────────────────────────────
  {
    id: 'path2',
    title: 'Ser',
    titleEn: 'To Be',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p2s1',
        title: 'Personas',
        titleEn: 'People',
        videoUrl: null,
        words: ['hombre', 'mujer', 'niño', 'niña', 'nombre', 'persona'],
      },
      {
        id: 'p2s2',
        title: 'Soy y Eres',
        titleEn: 'I Am and You Are',
        videoUrl: null,
        words: ['soy', 'eres', 'español', 'inglés', 'americano', 'canadiense'],
      },
      {
        id: 'p2s3',
        title: 'Es y Son',
        titleEn: 'He/She Is and They Are',
        videoUrl: null,
        words: ['es', 'son', 'mexicano', 'colombiano', 'muy', 'hoy'],
      },
      {
        id: 'p2s4',
        title: '¿Quién? y ¿Cómo?',
        titleEn: 'Who? and How?',
        videoUrl: null,
        words: ['quién', 'cómo', 'cuándo', 'también', 'su', 'aquí'],
      },
      {
        id: 'p2s5',
        title: 'Números 1-6',
        titleEn: 'Numbers 1-6',
        videoUrl: null,
        words: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 3 — Estar
  // ─────────────────────────────────────────────
  {
    id: 'path3',
    title: 'Estar',
    titleEn: 'To Be (Location)',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p3s1',
        title: 'Lugares',
        titleEn: 'Places',
        videoUrl: null,
        words: ['casa', 'hotel', 'escuela', 'restaurante', 'hospital', 'banco'],
      },
      {
        id: 'p3s2',
        title: 'Estoy y Estás',
        titleEn: 'I Am and You Are (Location)',
        videoUrl: null,
        words: ['estoy', 'estás', 'grande', 'pequeño', 'bueno', 'abierto'],
      },
      {
        id: 'p3s3',
        title: 'Está y Están',
        titleEn: 'He/She Is and They Are (Location)',
        videoUrl: null,
        words: ['está', 'están', 'malo', 'nuevo', 'viejo', 'cerrado'],
      },
      {
        id: 'p3s4',
        title: 'Más Lugares',
        titleEn: 'More Places',
        videoUrl: null,
        words: ['aeropuerto', 'tienda', 'parque', 'playa', 'ciudad', 'país'],
      },
      {
        id: 'p3s5',
        title: 'Números 7-20',
        titleEn: 'Numbers 7-20',
        videoUrl: null,
        words: ['siete', 'ocho', 'nueve', 'diez', 'veinte', 'cuánto'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 4 — Tener y El Tiempo
  // ─────────────────────────────────────────────
  {
    id: 'path4',
    title: 'Tener y El Tiempo',
    titleEn: 'To Have and Time',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p4s1',
        title: 'Cosas Esenciales',
        titleEn: 'Essential Things',
        videoUrl: null,
        words: ['pasaporte', 'dinero', 'teléfono', 'taxi', 'reserva', 'ayuda'],
      },
      {
        id: 'p4s2',
        title: 'Tengo y Tienes',
        titleEn: 'I Have and You Have',
        videoUrl: null,
        words: ['tengo', 'tienes', 'problema', 'idea', 'plan', 'llave'],
      },
      {
        id: 'p4s3',
        title: 'Tiene y Tienen',
        titleEn: 'He/She Has and They Have',
        videoUrl: null,
        words: ['tiene', 'tienen', 'carta', 'cuenta', 'tiempo', 'hora'],
      },
      {
        id: 'p4s4',
        title: 'Necesito y Necesitas',
        titleEn: 'I Need and You Need',
        videoUrl: null,
        words: ['necesito', 'necesitas', 'cita', 'documento', 'agua', 'comida'],
      },
      {
        id: 'p4s5',
        title: 'El Tiempo',
        titleEn: 'Time',
        videoUrl: null,
        words: ['semana', 'mes', 'año', 'minuto', 'mañana', 'ayer'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // TIER 2 — BEGINNER II
  // Paths 5-8 | English de-emphasized, tap to reveal
  // Focus: food, travel, communication, family, daily life
  // ─────────────────────────────────────────────

  {
    id: 'path5',
    title: 'Querer y Poder',
    titleEn: 'To Want and To Be Able',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p5s1',
        title: 'Comida y Bebida',
        titleEn: 'Food and Drink',
        videoUrl: null,
        words: ['bebida', 'café', 'pan', 'fruta', 'hambre', 'leche'],
      },
      {
        id: 'p5s2',
        title: 'Quiero y Quieres',
        titleEn: 'I Want and You Want',
        videoUrl: null,
        words: ['quiero', 'quieres', 'jugo', 'té', 'arroz', 'sopa'],
      },
      {
        id: 'p5s3',
        title: 'Quiere y Quieren',
        titleEn: 'He/She Wants and They Want',
        videoUrl: null,
        words: ['quiere', 'quieren', 'ensalada', 'postre', 'rico', 'delicioso'],
      },
      {
        id: 'p5s4',
        title: 'Puedo y Puedes',
        titleEn: 'I Can and You Can',
        videoUrl: null,
        words: ['puedo', 'puedes', 'menú', 'mesa', 'orden', 'propina'],
      },
      {
        id: 'p5s5',
        title: 'Más Comida',
        titleEn: 'More Food',
        videoUrl: null,
        words: ['pollo', 'carne', 'pescado', 'verdura', 'huevo', 'queso'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 6 — Ir y Viajar
  // ─────────────────────────────────────────────
  {
    id: 'path6',
    title: 'Ir y Viajar',
    titleEn: 'To Go and To Travel',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p6s1',
        title: 'Transporte',
        titleEn: 'Transport',
        videoUrl: null,
        words: ['tren', 'autobús', 'carro', 'vuelo', 'boleto', 'maleta'],
      },
      {
        id: 'p6s2',
        title: 'Voy y Vas',
        titleEn: 'I Go and You Go',
        videoUrl: null,
        words: ['voy', 'vas', 'llego', 'llegas', 'mapa', 'dirección'],
      },
      {
        id: 'p6s3',
        title: 'Va y Van',
        titleEn: 'He/She Goes and They Go',
        videoUrl: null,
        words: ['va', 'van', 'ahora', 'después', 'antes', 'tarde'],
      },
      {
        id: 'p6s4',
        title: 'Direcciones',
        titleEn: 'Directions',
        videoUrl: null,
        words: ['a la derecha', 'a la izquierda', 'recto', 'cerca', 'lejos', 'estoy perdido'],
      },
      {
        id: 'p6s5',
        title: 'El Clima',
        titleEn: 'The Weather',
        videoUrl: null,
        words: ['sol', 'lluvia', 'nieve', 'viento', 'calor', 'frío'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 7 — Hablar y Saber
  // ─────────────────────────────────────────────
  {
    id: 'path7',
    title: 'Hablar y Saber',
    titleEn: 'To Speak and To Know',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p7s1',
        title: 'Comunicación',
        titleEn: 'Communication',
        videoUrl: null,
        words: ['mensaje', 'llamada', 'correo', 'pregunta', 'respuesta', 'conversación'],
      },
      {
        id: 'p7s2',
        title: 'Hablo y Hablas',
        titleEn: 'I Speak and You Speak',
        videoUrl: null,
        words: ['hablo', 'hablas', 'idioma', 'palabra', 'frase', 'acento'],
      },
      {
        id: 'p7s3',
        title: 'Habla y Hablan',
        titleEn: 'He/She Speaks and They Speak',
        videoUrl: null,
        words: ['habla', 'hablan', 'significado', 'verdad', 'razón', 'sé'],
      },
      {
        id: 'p7s4',
        title: 'Ver y Escuchar',
        titleEn: 'To See and To Listen',
        videoUrl: null,
        words: ['veo', 'ves', 'escucho', 'escuchas', 'televisión', 'música'],
      },
      {
        id: 'p7s5',
        title: 'Medios y Noticias',
        titleEn: 'Media and News',
        videoUrl: null,
        words: ['película', 'foto', 'video', 'imagen', 'noticias', 'canción'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 8 — Decir, Familia y Los Días
  // ─────────────────────────────────────────────
  {
    id: 'path8',
    title: 'Decir, Familia y Los Días',
    titleEn: 'To Say, Family and the Days',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p8s1',
        title: 'La Familia',
        titleEn: 'The Family',
        videoUrl: null,
        words: ['madre', 'padre', 'hijo', 'hija', 'hermano', 'hermana'],
      },
      {
        id: 'p8s2',
        title: 'Digo y Dices',
        titleEn: 'I Say and You Say',
        videoUrl: null,
        words: ['digo', 'dices', 'abuelo', 'abuela', 'esposo', 'esposa'],
      },
      {
        id: 'p8s3',
        title: 'Dice y Dicen',
        titleEn: 'He/She Says and They Say',
        videoUrl: null,
        words: ['dice', 'dicen', 'primo', 'prima', 'tío', 'tía'],
      },
      {
        id: 'p8s4',
        title: 'Los Días de la Semana',
        titleEn: 'Days of the Week',
        videoUrl: null,
        words: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      },
      {
        id: 'p8s5',
        title: 'Más Personas',
        titleEn: 'More People',
        videoUrl: null,
        words: ['domingo', 'novio', 'novia', 'pareja', 'vecino', 'compañero'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // TIER 3 — ADVANCED BEGINNER
  // Paths 9-12 | English hidden by default, tap to reveal
  // Focus: paradigm completion, nuanced vocabulary, expanded situations
  // ─────────────────────────────────────────────

  {
    id: 'path9',
    title: 'Comer y Beber',
    titleEn: 'To Eat and To Drink',
    subLevel: 'Advanced Beginner',
    videoUrl: null,
    stops: [
      {
        id: 'p9s1',
        title: 'Más Comida',
        titleEn: 'More Food',
        videoUrl: null,
        words: ['tomate', 'cebolla', 'papa', 'lechuga', 'zanahoria', 'manzana'],
      },
      {
        id: 'p9s2',
        title: 'Como y Comes',
        titleEn: 'I Eat and You Eat',
        videoUrl: null,
        words: ['como', 'comes', 'desayuno', 'almuerzo', 'cena', 'merienda'],
      },
      {
        id: 'p9s3',
        title: 'Come y Comen',
        titleEn: 'He/She Eats and They Eat',
        videoUrl: null,
        words: ['come', 'comen', 'bocadillo', 'galleta', 'plato', 'taza'],
      },
      {
        id: 'p9s4',
        title: 'Bebo y Bebes',
        titleEn: 'I Drink and You Drink',
        videoUrl: null,
        words: ['bebo', 'bebes', 'refresco', 'vino', 'cerveza', 'botella'],
      },
      {
        id: 'p9s5',
        title: 'Estados Físicos',
        titleEn: 'Physical States',
        videoUrl: null,
        words: ['tengo hambre', 'tengo sed', 'tengo frío', 'tengo calor', 'tengo sueño', 'tengo miedo'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 10 — Comprar, Vivir y Trabajar
  // ─────────────────────────────────────────────
  {
    id: 'path10',
    title: 'Comprar, Vivir y Trabajar',
    titleEn: 'To Buy, To Live, To Work',
    subLevel: 'Advanced Beginner',
    videoUrl: null,
    stops: [
      {
        id: 'p10s1',
        title: 'La Tienda',
        titleEn: 'The Store',
        videoUrl: null,
        words: ['producto', 'ropa', 'zapato', 'talla', 'efectivo', 'tarjeta'],
      },
      {
        id: 'p10s2',
        title: 'Compro y Compras',
        titleEn: 'I Buy and You Buy',
        videoUrl: null,
        words: ['compro', 'compras', 'descuento', 'oferta', 'regalo', 'bolsa'],
      },
      {
        id: 'p10s3',
        title: 'El Dinero',
        titleEn: 'Money',
        videoUrl: null,
        words: ['cien', 'mil', 'precio', 'cambio', 'billete', 'moneda'],
      },
      {
        id: 'p10s4',
        title: 'Vivo y Vives',
        titleEn: 'I Live and You Live',
        videoUrl: null,
        words: ['vivo', 'vives', 'apartamento', 'vecindario', 'barrio', 'edificio'],
      },
      {
        id: 'p10s5',
        title: 'Trabajo y Trabajas',
        titleEn: 'I Work and You Work',
        videoUrl: null,
        words: ['trabajo', 'trabajas', 'jefe', 'empresa', 'horario', 'sueldo'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 11 — El Cuerpo y La Salud
  // ─────────────────────────────────────────────
  {
    id: 'path11',
    title: 'El Cuerpo y La Salud',
    titleEn: 'The Body and Health',
    subLevel: 'Advanced Beginner',
    videoUrl: null,
    stops: [
      {
        id: 'p11s1',
        title: 'El Cuerpo',
        titleEn: 'The Body',
        videoUrl: null,
        words: ['cabeza', 'ojo', 'nariz', 'boca', 'mano', 'brazo'],
      },
      {
        id: 'p11s2',
        title: 'Más Cuerpo',
        titleEn: 'More Body',
        videoUrl: null,
        words: ['pierna', 'pie', 'espalda', 'corazón', 'dedo', 'oreja'],
      },
      {
        id: 'p11s3',
        title: 'La Salud',
        titleEn: 'Health',
        videoUrl: null,
        words: ['médico', 'medicina', 'dolor', 'fiebre', 'alergia', 'emergencia'],
      },
      {
        id: 'p11s4',
        title: 'Duermo y Duermes',
        titleEn: 'I Sleep and You Sleep',
        videoUrl: null,
        words: ['duermo', 'duermes', 'cansado', 'sueño', 'cama', 'noche'],
      },
      {
        id: 'p11s5',
        title: 'Vengo y Vienes',
        titleEn: 'I Come and You Come',
        videoUrl: null,
        words: ['vengo', 'vienes', 'enfermo', 'feliz', 'triste', 'mejor'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 12 — El Mundo
  // ─────────────────────────────────────────────
  {
    id: 'path12',
    title: 'El Mundo',
    titleEn: 'The World',
    subLevel: 'Advanced Beginner',
    videoUrl: null,
    stops: [
      {
        id: 'p12s1',
        title: 'Los Colores',
        titleEn: 'Colors',
        videoUrl: null,
        words: ['rojo', 'azul', 'verde', 'amarillo', 'blanco', 'negro'],
      },
      {
        id: 'p12s2',
        title: 'Más Colores',
        titleEn: 'More Colors',
        videoUrl: null,
        words: ['naranja', 'gris', 'morado', 'rosado', 'dorado', 'plateado'],
      },
      {
        id: 'p12s3',
        title: 'El Clima y La Naturaleza',
        titleEn: 'Weather and Nature',
        videoUrl: null,
        words: ['tormenta', 'nube', 'estrella', 'luna', 'cielo', 'arcoíris'],
      },
      {
        id: 'p12s4',
        title: 'Los Animales',
        titleEn: 'Animals',
        videoUrl: null,
        words: ['perro', 'gato', 'pájaro', 'caballo', 'vaca', 'pez'],
      },
      {
        id: 'p12s5',
        title: 'Sentimientos',
        titleEn: 'Feelings',
        videoUrl: null,
        words: ['emocionado', 'nervioso', 'sorprendido', 'aburrido', 'tranquilo', 'ocupado'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // TIER 4 — INTERMEDIATE
  // Path 13 | English removed from drill prompts
  // Focus: frequency adverbs, paradigm completion, activity verbs
  // ─────────────────────────────────────────────

  {
    id: 'path13',
    title: 'Verbos y Matices',
    titleEn: 'Verbs and Nuance',
    subLevel: 'Intermediate',
    videoUrl: null,
    stops: [
      {
        id: 'p13s1',
        title: 'Salir y Celebrar',
        titleEn: 'To Leave and Celebrate',
        videoUrl: null,
        words: ['salgo', 'sales', 'fiesta', 'cumpleaños', 'boda', 'celebración'],
      },
      {
        id: 'p13s2',
        title: 'Frecuencia',
        titleEn: 'Frequency',
        videoUrl: null,
        words: ['siempre', 'nunca', 'todavía', 'ya', 'a veces', 'pronto'],
      },
      {
        id: 'p13s3',
        title: 'Leer y Escribir',
        titleEn: 'To Read and To Write',
        videoUrl: null,
        words: ['leo', 'lees', 'escribo', 'escribes', 'libro', 'periódico'],
      },
      {
        id: 'p13s4',
        title: 'Escuchar y Ver',
        titleEn: 'To Listen and To See',
        videoUrl: null,
        words: ['escucha', 'escuchan', 've', 'ven', 'sonido', 'silencio'],
      },
      {
        id: 'p13s5',
        title: 'Actividades',
        titleEn: 'Activities',
        videoUrl: null,
        words: ['caminar', 'correr', 'nadar', 'bailar', 'cantar', 'jugar'],
      },
    ],
  },

];

// ─────────────────────────────────────────────
// Helper functions — unchanged
// ─────────────────────────────────────────────

export function getStopWords(stopId) {
  for (const path of PATHS) {
    for (const stop of path.stops) {
      if (stop.id === stopId) return stop.words;
    }
  }
  return [];
}

export function getPath(pathId) {
  return PATHS.find(p => p.id === pathId) || null;
}

export function getStop(stopId) {
  for (const path of PATHS) {
    for (const stop of path.stops) {
      if (stop.id === stopId) return stop;
    }
  }
  return null;
}

export function getPathIdForStop(stopId) {
  for (const path of PATHS) {
    for (const stop of path.stops) {
      if (stop.id === stopId) return path.id;
    }
  }
  return null;
}

export function isPathComplete(pathId, completedStops) {
  const path = getPath(pathId);
  if (!path) return false;
  return path.stops.every(stop => completedStops.includes(stop.id));
}
