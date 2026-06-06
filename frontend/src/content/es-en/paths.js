// paths.js — Milo Speaks Spanish
// 12 Paths × 5 Stops × 5 words = 300 words
// Research basis: SUBTLEX-ESP frequency corpus + CEFR A1/A2 word lists
// Sequencing: yo forms → tú forms → él forms | high-frequency words frontloaded
// Beginner tier (A1): Paths 1–6 | Advanced Beginner tier (A2): Paths 7–12
// nosotros/ellos conjugation forms: Advanced Beginner tier only
// videoUrl: null on all Stops — feature flag. Add YouTube URL when video ready. Button activates automatically.
// All es values match exactly with MASTER array in words.js

export const PATHS = [

  // ─────────────────────────────────────────────
  // PATH 1 — El Primer Encuentro
  // Theme: Greetings, polite phrases, articles, core pronouns
  // Sub-level: Beginner I
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
        words: ['hola', 'adiós', 'buenos días', 'buenas noches', 'buenas tardes'],
      },
      {
        id: 'p1s2',
        title: 'Por Favor y Gracias',
        titleEn: 'Please and Thank You',
        videoUrl: null,
        words: ['gracias', 'de nada', 'por favor', 'perdón', 'lo siento'],
      },
      {
        id: 'p1s3',
        title: 'Mucho Gusto',
        titleEn: 'Nice to Meet You',
        videoUrl: null,
        words: ['mucho gusto', 'encantado', 'hasta luego', 'salud', 'suerte'],
      },
      {
        id: 'p1s4',
        title: 'Sí y No',
        titleEn: 'Yes and No',
        videoUrl: null,
        words: ['sí', 'no', 'el', 'la', 'hay'],
      },
      {
        id: 'p1s5',
        title: 'Yo y Tú',
        titleEn: 'I and You',
        videoUrl: null,
        words: ['un', 'una', 'yo', 'tú', 'mi'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 2 — Yo Soy
  // Theme: ser, estar, pronouns, core identity
  // Sub-level: Beginner I
  // ─────────────────────────────────────────────
  {
    id: 'path2',
    title: 'Yo Soy',
    titleEn: 'I Am',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p2s1',
        title: 'Él y Ella',
        titleEn: 'He and She',
        videoUrl: null,
        words: ['él', 'ella', 'me', 'se', 'su'],
      },
      {
        id: 'p2s2',
        title: 'Ser — Yo',
        titleEn: 'To Be — I',
        videoUrl: null,
        words: ['ser', 'soy', 'eres', 'es', 'hombre'],
      },
      {
        id: 'p2s3',
        title: 'La Gente',
        titleEn: 'People',
        videoUrl: null,
        words: ['mujer', 'niño', 'niña', 'español', 'inglés'],
      },
      {
        id: 'p2s4',
        title: 'Estar — Yo',
        titleEn: 'To Be Here — I',
        videoUrl: null,
        words: ['estar', 'estoy', 'estás', 'está', 'aquí'],
      },
      {
        id: 'p2s5',
        title: 'Las Palabras Clave',
        titleEn: 'Key Words',
        videoUrl: null,
        words: ['en', 'con', 'y', 'o', 'dónde'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 3 — Necesito y Tengo
  // Theme: necesitar, tener, querer, poder, hacer
  // Sub-level: Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path3',
    title: 'Necesito y Tengo',
    titleEn: 'I Need and I Have',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p3s1',
        title: 'Necesitar',
        titleEn: 'To Need',
        videoUrl: null,
        words: ['necesitar', 'necesito', 'necesitas', 'necesita', 'disculpe'],
      },
      {
        id: 'p3s2',
        title: 'Tener',
        titleEn: 'To Have',
        videoUrl: null,
        words: ['tener', 'tengo', 'tienes', 'tiene', 'nombre'],
      },
      {
        id: 'p3s3',
        title: 'Querer',
        titleEn: 'To Want',
        videoUrl: null,
        words: ['querer', 'quiero', 'quieres', 'quiere', 'amigo'],
      },
      {
        id: 'p3s4',
        title: 'Poder',
        titleEn: 'To Be Able',
        videoUrl: null,
        words: ['poder', 'puedo', 'puedes', 'puede', 'amiga'],
      },
      {
        id: 'p3s5',
        title: 'Hacer y Saber',
        titleEn: 'To Do and To Know',
        videoUrl: null,
        words: ['hacer', 'hago', 'haces', 'hace', 'saber'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 4 — Voy y Hablo
  // Theme: ir, hablar, ver, decir + core connectors
  // Sub-level: Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path4',
    title: 'Voy y Hablo',
    titleEn: 'I Go and I Speak',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p4s1',
        title: 'Ir — Yo',
        titleEn: 'To Go — I',
        videoUrl: null,
        words: ['ir', 'voy', 'vas', 'va', 'sé'],
      },
      {
        id: 'p4s2',
        title: 'Hablar',
        titleEn: 'To Speak',
        videoUrl: null,
        words: ['hablar', 'hablo', 'hablas', 'habla', 'más'],
      },
      {
        id: 'p4s3',
        title: 'Ver',
        titleEn: 'To See',
        videoUrl: null,
        words: ['ver', 'veo', 'ves', 've', 'muy'],
      },
      {
        id: 'p4s4',
        title: 'Decir',
        titleEn: 'To Say',
        videoUrl: null,
        words: ['decir', 'digo', 'dices', 'dice', 'pero'],
      },
      {
        id: 'p4s5',
        title: 'Los Conectores',
        titleEn: 'Connectors',
        videoUrl: null,
        words: ['también', 'porque', 'cuando', 'si', 'por qué'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 5 — Mi Familia
  // Theme: family, vivir, trabajar, día/noche
  // Sub-level: Beginner III
  // ─────────────────────────────────────────────
  {
    id: 'path5',
    title: 'Mi Familia',
    titleEn: 'My Family',
    subLevel: 'Beginner III',
    videoUrl: null,
    stops: [
      {
        id: 'p5s1',
        title: 'Padres e Hijos',
        titleEn: 'Parents and Children',
        videoUrl: null,
        words: ['madre', 'padre', 'hijo', 'hija', 'hermano'],
      },
      {
        id: 'p5s2',
        title: 'Abuelos y Esposos',
        titleEn: 'Grandparents and Spouses',
        videoUrl: null,
        words: ['hermana', 'abuelo', 'abuela', 'esposo', 'esposa'],
      },
      {
        id: 'p5s3',
        title: 'Tíos y Primos',
        titleEn: 'Aunts, Uncles and Cousins',
        videoUrl: null,
        words: ['tío', 'tía', 'primo', 'prima', 'día'],
      },
      {
        id: 'p5s4',
        title: 'Vivir',
        titleEn: 'To Live',
        videoUrl: null,
        words: ['noche', 'vivir', 'vivo', 'vives', 'vive'],
      },
      {
        id: 'p5s5',
        title: 'Trabajar',
        titleEn: 'To Work',
        videoUrl: null,
        words: ['trabajar', 'trabajo', 'trabajas', 'trabaja', 'año'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 6 — En el Restaurante
  // Theme: food, drink, comer/beber yo/tú/él
  // Sub-level: Beginner III
  // ─────────────────────────────────────────────
  {
    id: 'path6',
    title: 'En el Restaurante',
    titleEn: 'At the Restaurant',
    subLevel: 'Beginner III',
    videoUrl: null,
    stops: [
      {
        id: 'p6s1',
        title: 'Comer y Beber',
        titleEn: 'To Eat and Drink',
        videoUrl: null,
        words: ['comer', 'como', 'comes', 'come', 'beber'],
      },
      {
        id: 'p6s2',
        title: 'Las Bebidas',
        titleEn: 'The Drinks',
        videoUrl: null,
        words: ['bebo', 'bebes', 'bebe', 'agua', 'leche'],
      },
      {
        id: 'p6s3',
        title: 'El Pan y el Café',
        titleEn: 'Bread and Coffee',
        videoUrl: null,
        words: ['pan', 'café', 'jugo', 'arroz', 'sopa'],
      },
      {
        id: 'p6s4',
        title: 'La Carne',
        titleEn: 'Meat and Vegetables',
        videoUrl: null,
        words: ['pollo', 'carne', 'pescado', 'fruta', 'verdura'],
      },
      {
        id: 'p6s5',
        title: 'Más Comida',
        titleEn: 'More Food',
        videoUrl: null,
        words: ['manzana', 'tomate', 'huevo', 'ensalada', 'qué'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 7 — Los Números
  // Theme: numbers, shopping, city places, comprar
  // Sub-level: Advanced Beginner I
  // ─────────────────────────────────────────────
  {
    id: 'path7',
    title: 'Los Números',
    titleEn: 'The Numbers',
    subLevel: 'Advanced Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p7s1',
        title: 'Uno a Cinco',
        titleEn: 'One to Five',
        videoUrl: null,
        words: ['uno', 'dos', 'tres', 'cuatro', 'cinco'],
      },
      {
        id: 'p7s2',
        title: 'Seis a Diez',
        titleEn: 'Six to Ten',
        videoUrl: null,
        words: ['seis', 'siete', 'ocho', 'nueve', 'diez'],
      },
      {
        id: 'p7s3',
        title: 'Veinte y Más',
        titleEn: 'Twenty and More',
        videoUrl: null,
        words: ['veinte', 'cien', 'cero', 'cuánto', 'menos'],
      },
      {
        id: 'p7s4',
        title: 'De Compras',
        titleEn: 'Shopping',
        videoUrl: null,
        words: ['comprar', 'compro', 'compras', 'compra', 'tienda'],
      },
      {
        id: 'p7s5',
        title: 'La Ciudad',
        titleEn: 'The City',
        videoUrl: null,
        words: ['carro', 'teléfono', 'calle', 'ciudad', 'país'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 8 — De Viaje
  // Theme: travel vocabulary, llegar/llevar, key places
  // Sub-level: Advanced Beginner I
  // ─────────────────────────────────────────────
  {
    id: 'path8',
    title: 'De Viaje',
    titleEn: 'Travelling',
    subLevel: 'Advanced Beginner I',
    videoUrl: null,
    stops: [
      {
        id: 'p8s1',
        title: 'El Aeropuerto',
        titleEn: 'The Airport',
        videoUrl: null,
        words: ['aeropuerto', 'vuelo', 'pasaporte', 'maleta', 'equipaje'],
      },
      {
        id: 'p8s2',
        title: 'El Hotel',
        titleEn: 'The Hotel',
        videoUrl: null,
        words: ['hotel', 'reserva', 'taxi', 'mapa', 'boleto'],
      },
      {
        id: 'p8s3',
        title: 'El Transporte',
        titleEn: 'Transport',
        videoUrl: null,
        words: ['tren', 'autobús', 'llegar', 'llego', 'llegas'],
      },
      {
        id: 'p8s4',
        title: 'Llevar',
        titleEn: 'To Carry',
        videoUrl: null,
        words: ['llega', 'llevar', 'llevo', 'llevas', 'lleva'],
      },
      {
        id: 'p8s5',
        title: 'Los Lugares',
        titleEn: 'The Places',
        videoUrl: null,
        words: ['casa', 'escuela', 'restaurante', 'hospital', 'banco'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 9 — El Mundo Natural
  // Theme: weather, colours, animals, nature
  // Sub-level: Advanced Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path9',
    title: 'El Mundo Natural',
    titleEn: 'The Natural World',
    subLevel: 'Advanced Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p9s1',
        title: 'El Tiempo',
        titleEn: 'The Weather',
        videoUrl: null,
        words: ['tiempo', 'sol', 'lluvia', 'nieve', 'viento'],
      },
      {
        id: 'p9s2',
        title: 'Los Colores Cálidos',
        titleEn: 'Warm Colours',
        videoUrl: null,
        words: ['calor', 'rojo', 'azul', 'verde', 'amarillo'],
      },
      {
        id: 'p9s3',
        title: 'Los Colores Fríos',
        titleEn: 'Cool Colours',
        videoUrl: null,
        words: ['blanco', 'negro', 'naranja', 'gris', 'morado'],
      },
      {
        id: 'p9s4',
        title: 'Los Animales',
        titleEn: 'The Animals',
        videoUrl: null,
        words: ['perro', 'gato', 'pájaro', 'caballo', 'vaca'],
      },
      {
        id: 'p9s5',
        title: 'La Naturaleza',
        titleEn: 'Nature',
        videoUrl: null,
        words: ['parque', 'playa', 'semana', 'hora', 'minuto'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 10 — El Cuerpo
  // Theme: body parts, feelings, dormir, venir
  // Sub-level: Advanced Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path10',
    title: 'El Cuerpo',
    titleEn: 'The Body',
    subLevel: 'Advanced Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p10s1',
        title: 'La Cabeza',
        titleEn: 'The Head',
        videoUrl: null,
        words: ['cabeza', 'ojo', 'nariz', 'boca', 'oreja'],
      },
      {
        id: 'p10s2',
        title: 'El Cuerpo',
        titleEn: 'The Body',
        videoUrl: null,
        words: ['mano', 'brazo', 'pierna', 'pie', 'dedo'],
      },
      {
        id: 'p10s3',
        title: 'Cómo Te Sientes',
        titleEn: 'How You Feel',
        videoUrl: null,
        words: ['bueno', 'malo', 'caliente', 'frío', 'importante'],
      },
      {
        id: 'p10s4',
        title: 'Dormir',
        titleEn: 'To Sleep',
        videoUrl: null,
        words: ['dormir', 'duermo', 'duermes', 'duerme', 'cansado'],
      },
      {
        id: 'p10s5',
        title: 'Venir',
        titleEn: 'To Come',
        videoUrl: null,
        words: ['venir', 'vengo', 'vienes', 'viene', 'hoy'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 11 — Cómo Es
  // Theme: adjectives, descriptions, salir, escuchar
  // Sub-level: Advanced Beginner III
  // ─────────────────────────────────────────────
  {
    id: 'path11',
    title: 'Cómo Es',
    titleEn: 'What It Is Like',
    subLevel: 'Advanced Beginner III',
    videoUrl: null,
    stops: [
      {
        id: 'p11s1',
        title: 'Grande y Pequeño',
        titleEn: 'Big and Small',
        videoUrl: null,
        words: ['grande', 'pequeño', 'nuevo', 'viejo', 'bonito'],
      },
      {
        id: 'p11s2',
        title: 'Fácil y Difícil',
        titleEn: 'Easy and Difficult',
        videoUrl: null,
        words: ['fácil', 'difícil', 'rápido', 'lento', 'caro'],
      },
      {
        id: 'p11s3',
        title: 'Abierto y Cerrado',
        titleEn: 'Open and Closed',
        videoUrl: null,
        words: ['barato', 'abierto', 'cerrado', 'alto', 'bajo'],
      },
      {
        id: 'p11s4',
        title: 'Salir',
        titleEn: 'To Go Out',
        videoUrl: null,
        words: ['salir', 'salgo', 'sales', 'sale', 'ahora'],
      },
      {
        id: 'p11s5',
        title: 'Escuchar',
        titleEn: 'To Listen',
        videoUrl: null,
        words: ['escuchar', 'escucho', 'escuchas', 'escucha', 'después'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 12 — Conectar y Preguntar
  // Theme: question words, connectors, leer/escribir/caminar, time adverbs
  // Sub-level: Advanced Beginner III
  // ─────────────────────────────────────────────
  {
    id: 'path12',
    title: 'Conectar y Preguntar',
    titleEn: 'Connecting and Asking',
    subLevel: 'Advanced Beginner III',
    videoUrl: null,
    stops: [
      {
        id: 'p12s1',
        title: 'Las Preguntas',
        titleEn: 'The Questions',
        videoUrl: null,
        words: ['quién', 'cómo', 'cuándo', 'poco', 'mucho'],
      },
      {
        id: 'p12s2',
        title: 'Más Conectores',
        titleEn: 'More Connectors',
        videoUrl: null,
        words: ['todavía', 'nada', 'todo', 'cerca', 'lejos'],
      },
      {
        id: 'p12s3',
        title: 'Leer y Escribir',
        titleEn: 'To Read and Write',
        videoUrl: null,
        words: ['leer', 'leo', 'lees', 'lee', 'escribir'],
      },
      {
        id: 'p12s4',
        title: 'Escribir y Caminar',
        titleEn: 'To Write and To Walk',
        videoUrl: null,
        words: ['escribo', 'escribes', 'escribe', 'caminar', 'camino'],
      },
      {
        id: 'p12s5',
        title: 'El Tiempo',
        titleEn: 'Time Words',
        videoUrl: null,
        words: ['mañana', 'ayer', 'antes', 'pronto', 'tarde'],
      },
    ],
  },

];

// ─────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────

// Get all word es values for a given stopId
export function getStopWords(stopId) {
  for (const path of PATHS) {
    for (const stop of path.stops) {
      if (stop.id === stopId) return stop.words;
    }
  }
  return [];
}

// Get path object by pathId
export function getPath(pathId) {
  return PATHS.find(p => p.id === pathId) || null;
}

// Get stop object by stopId
export function getStop(stopId) {
  for (const path of PATHS) {
    for (const stop of path.stops) {
      if (stop.id === stopId) return stop;
    }
  }
  return null;
}

// Get pathId for a given stopId
export function getPathIdForStop(stopId) {
  for (const path of PATHS) {
    for (const stop of path.stops) {
      if (stop.id === stopId) return path.id;
    }
  }
  return null;
}

// Check if all stops in a path are complete
export function isPathComplete(pathId, completedStops) {
  const path = getPath(pathId);
  if (!path) return false;
  return path.stops.every(stop => completedStops.includes(stop.id));
}
