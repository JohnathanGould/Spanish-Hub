// paths.js — Milo Speaks Spanish
// 12 Paths × 5 Stops × 5 words = 300 words
// Beginner Tier (A1): Paths 1–4 | Advanced Beginner Tier (A2): Paths 5–8 | Intermediate Tier (B1): Paths 9–12
// videoUrl: null on all Stops — feature flag. Add YouTube URL when video is ready. Button activates automatically.
// Word es values must exactly match MASTER array in words.js

export const PATHS = [

  {
    id: 'path1',
    title: 'El Primer Encuentro',
    titleEn: 'The First Meeting',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      { id: 'p1s1', title: 'Hola y Adiós', titleEn: 'Hello and Goodbye', videoUrl: null, words: ['hola', 'adiós', 'buenos días', 'buenas noches', 'buenas tardes'] },
      { id: 'p1s2', title: 'Por Favor y Gracias', titleEn: 'Please and Thank You', videoUrl: null, words: ['gracias', 'de nada', 'por favor', 'perdón', 'lo siento'] },
      { id: 'p1s3', title: 'Mucho Gusto', titleEn: 'Nice to Meet You', videoUrl: null, words: ['mucho gusto', 'encantado', 'hasta luego', 'salud', 'suerte'] },
      { id: 'p1s4', title: 'Sí y No', titleEn: 'Yes and No', videoUrl: null, words: ['sí', 'no', 'aquí', 'muy', 'también'] },
      { id: 'p1s5', title: 'El y La', titleEn: 'The Articles', videoUrl: null, words: ['el', 'la', 'un', 'una', 'hay'] },
    ],
  },

  {
    id: 'path2',
    title: 'Yo Soy, Tú Eres',
    titleEn: 'I Am, You Are',
    subLevel: 'Beginner I',
    videoUrl: null,
    stops: [
      { id: 'p2s1', title: 'Los Pronombres', titleEn: 'The Pronouns', videoUrl: null, words: ['yo', 'tú', 'él', 'ella', 'mi'] },
      { id: 'p2s2', title: 'Ser — Yo', titleEn: 'To Be — I', videoUrl: null, words: ['soy', 'español', 'inglés', 'hombre', 'mujer'] },
      { id: 'p2s3', title: 'Ser — Tú y Él', titleEn: 'To Be — You and He', videoUrl: null, words: ['eres', 'es', 'niño', 'niña', 'ser'] },
      { id: 'p2s4', title: 'Estar — Yo', titleEn: 'To Be (location) — I', videoUrl: null, words: ['estoy', 'en', 'con', 'estar', 'aquí'] },
      { id: 'p2s5', title: 'Estar — Tú y Él', titleEn: 'To Be (location) — You and He', videoUrl: null, words: ['estás', 'está', 'dónde', 'y', 'o'] },
    ],
  },

  {
    id: 'path3',
    title: 'Quiero y Puedo',
    titleEn: 'I Want and I Can',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      { id: 'p3s1', title: 'Tener — Yo', titleEn: 'To Have — I', videoUrl: null, words: ['tengo', 'necesito', 'quiero', 'puedo', 'hago'] },
      { id: 'p3s2', title: 'Tener — Tú y Él', titleEn: 'To Have — You and He', videoUrl: null, words: ['tienes', 'tiene', 'necesitas', 'necesita', 'tener'] },
      { id: 'p3s3', title: 'Ir — Yo y Tú', titleEn: 'To Go — I and You', videoUrl: null, words: ['voy', 'vas', 'va', 'ir', 'querer'] },
      { id: 'p3s4', title: 'Querer y Poder', titleEn: 'To Want and To Be Able', videoUrl: null, words: ['quieres', 'quiere', 'puedes', 'puede', 'poder'] },
      { id: 'p3s5', title: 'Hacer', titleEn: 'To Do / Make', videoUrl: null, words: ['haces', 'hace', 'hacer', 'saber', 'sé'] },
    ],
  },

  {
    id: 'path4',
    title: 'En el Restaurante',
    titleEn: 'At the Restaurant',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      { id: 'p4s1', title: 'Comer y Beber', titleEn: 'To Eat and Drink', videoUrl: null, words: ['comer', 'beber', 'como', 'bebo', 'comes'] },
      { id: 'p4s2', title: 'Agua y Café', titleEn: 'Water and Coffee', videoUrl: null, words: ['agua', 'leche', 'café', 'jugo', 'pan'] },
      { id: 'p4s3', title: 'Carne y Verduras', titleEn: 'Meat and Vegetables', videoUrl: null, words: ['pollo', 'carne', 'pescado', 'arroz', 'verdura'] },
      { id: 'p4s4', title: 'Más Comida', titleEn: 'More Food', videoUrl: null, words: ['manzana', 'fruta', 'queso', 'sopa', 'ensalada'] },
      { id: 'p4s5', title: 'El Postre', titleEn: 'Dessert', videoUrl: null, words: ['huevo', 'tomate', 'mantequilla', 'postre', 'helado'] },
    ],
  },

  {
    id: 'path5',
    title: 'Mi Familia',
    titleEn: 'My Family',
    subLevel: 'Beginner III',
    videoUrl: null,
    stops: [
      { id: 'p5s1', title: 'Padres e Hijos', titleEn: 'Parents and Children', videoUrl: null, words: ['madre', 'padre', 'hijo', 'hija', 'es'] },
      { id: 'p5s2', title: 'Hermanos y Abuelos', titleEn: 'Siblings and Grandparents', videoUrl: null, words: ['hermano', 'hermana', 'abuelo', 'abuela', 'esposo'] },
      { id: 'p5s3', title: 'Tíos y Primos', titleEn: 'Aunts, Uncles and Cousins', videoUrl: null, words: ['esposa', 'tío', 'tía', 'primo', 'prima'] },
      { id: 'p5s4', title: 'Vivir con la Familia', titleEn: 'Living with Family', videoUrl: null, words: ['vivir', 'vivo', 'vives', 'vive', 'vivimos'] },
      { id: 'p5s5', title: 'La Familia Habla', titleEn: 'The Family Speaks', videoUrl: null, words: ['hablar', 'hablo', 'hablas', 'habla', 'viven'] },
    ],
  },

  {
    id: 'path6',
    title: 'De Viaje',
    titleEn: 'Travelling',
    subLevel: 'Beginner III',
    videoUrl: null,
    stops: [
      { id: 'p6s1', title: 'El Aeropuerto', titleEn: 'The Airport', videoUrl: null, words: ['aeropuerto', 'vuelo', 'boleto', 'equipaje', 'pasaporte'] },
      { id: 'p6s2', title: 'El Hotel', titleEn: 'The Hotel', videoUrl: null, words: ['hotel', 'reserva', 'maleta', 'taxi', 'mapa'] },
      { id: 'p6s3', title: 'El Transporte', titleEn: 'Transport', videoUrl: null, words: ['tren', 'autobús', 'carro', 'llevar', 'llegar'] },
      { id: 'p6s4', title: 'Los Lugares', titleEn: 'The Places', videoUrl: null, words: ['casa', 'ciudad', 'calle', 'país', 'playa'] },
      { id: 'p6s5', title: 'Llegar y Salir', titleEn: 'Arriving and Leaving', videoUrl: null, words: ['llego', 'llegas', 'llega', 'salir', 'salgo'] },
    ],
  },

  {
    id: 'path7',
    title: 'Los Números y el Tiempo',
    titleEn: 'Numbers and Time',
    subLevel: 'Advanced Beginner I',
    videoUrl: null,
    stops: [
      { id: 'p7s1', title: 'Uno a Cinco', titleEn: 'One to Five', videoUrl: null, words: ['uno', 'dos', 'tres', 'cuatro', 'cinco'] },
      { id: 'p7s2', title: 'Seis a Diez', titleEn: 'Six to Ten', videoUrl: null, words: ['seis', 'siete', 'ocho', 'nueve', 'diez'] },
      { id: 'p7s3', title: 'Veinte y Más', titleEn: 'Twenty and More', videoUrl: null, words: ['once', 'doce', 'veinte', 'cien', 'cero'] },
      { id: 'p7s4', title: 'Los Días', titleEn: 'The Days', videoUrl: null, words: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'] },
      { id: 'p7s5', title: 'El Fin de Semana', titleEn: 'The Weekend', videoUrl: null, words: ['sábado', 'domingo', 'hora', 'minuto', 'semana'] },
    ],
  },

  {
    id: 'path8',
    title: 'Cómo Es',
    titleEn: "What It's Like",
    subLevel: 'Advanced Beginner I',
    videoUrl: null,
    stops: [
      { id: 'p8s1', title: 'Grande y Pequeño', titleEn: 'Big and Small', videoUrl: null, words: ['grande', 'pequeño', 'bueno', 'malo', 'nuevo'] },
      { id: 'p8s2', title: 'Rápido y Lento', titleEn: 'Fast and Slow', videoUrl: null, words: ['viejo', 'bonito', 'fácil', 'difícil', 'importante'] },
      { id: 'p8s3', title: 'Caliente y Frío', titleEn: 'Hot and Cold', videoUrl: null, words: ['caliente', 'frío', 'rápido', 'lento', 'alto'] },
      { id: 'p8s4', title: 'Caro y Barato', titleEn: 'Expensive and Cheap', videoUrl: null, words: ['caro', 'barato', 'abierto', 'cerrado', 'bajo'] },
      { id: 'p8s5', title: 'Cómo Estás', titleEn: 'How Are You', videoUrl: null, words: ['joven', 'contento', 'cansado', 'año', 'todavía'] },
    ],
  },

  {
    id: 'path9',
    title: 'Más Verbos',
    titleEn: 'More Verbs',
    subLevel: 'Advanced Beginner II',
    videoUrl: null,
    stops: [
      { id: 'p9s1', title: 'Saber', titleEn: 'To Know', videoUrl: null, words: ['sabes', 'sabe', 'sabemos', 'saben', 'decir'] },
      { id: 'p9s2', title: 'Leer y Escribir', titleEn: 'To Read and Write', videoUrl: null, words: ['leo', 'lees', 'lee', 'escribo', 'escribes'] },
      { id: 'p9s3', title: 'Decir', titleEn: 'To Say', videoUrl: null, words: ['digo', 'dices', 'dice', 'decimos', 'dicen'] },
      { id: 'p9s4', title: 'Ver', titleEn: 'To See', videoUrl: null, words: ['veo', 'ves', 've', 'vemos', 'ven'] },
      { id: 'p9s5', title: 'Dormir y Venir', titleEn: 'To Sleep and To Come', videoUrl: null, words: ['duermo', 'duermes', 'duerme', 'vengo', 'vienes'] },
    ],
  },

  {
    id: 'path10',
    title: 'El Mundo Natural',
    titleEn: 'The Natural World',
    subLevel: 'Advanced Beginner II',
    videoUrl: null,
    stops: [
      { id: 'p10s1', title: 'El Tiempo', titleEn: 'The Weather', videoUrl: null, words: ['tiempo', 'sol', 'lluvia', 'nieve', 'viento'] },
      { id: 'p10s2', title: 'Los Colores', titleEn: 'The Colours', videoUrl: null, words: ['rojo', 'azul', 'verde', 'amarillo', 'blanco'] },
      { id: 'p10s3', title: 'Más Colores', titleEn: 'More Colours', videoUrl: null, words: ['negro', 'naranja', 'gris', 'morado', 'rosa'] },
      { id: 'p10s4', title: 'Los Animales', titleEn: 'The Animals', videoUrl: null, words: ['perro', 'gato', 'pájaro', 'caballo', 'vaca'] },
      { id: 'p10s5', title: 'Calor y Frío', titleEn: 'Heat and Cold', videoUrl: null, words: ['calor', 'marrón', 'pez', 'parque', 'playa'] },
    ],
  },

  {
    id: 'path11',
    title: 'El Cuerpo y la Ropa',
    titleEn: 'The Body and Clothing',
    subLevel: 'Advanced Beginner III',
    videoUrl: null,
    stops: [
      { id: 'p11s1', title: 'La Cabeza', titleEn: 'The Head', videoUrl: null, words: ['cabeza', 'ojo', 'nariz', 'boca', 'oreja'] },
      { id: 'p11s2', title: 'El Cuerpo', titleEn: 'The Body', videoUrl: null, words: ['mano', 'brazo', 'pierna', 'pie', 'dedo'] },
      { id: 'p11s3', title: 'La Salud', titleEn: 'Health', videoUrl: null, words: ['corazón', 'pelo', 'mujer', 'hospital', 'dormir'] },
      { id: 'p11s4', title: 'La Ropa', titleEn: 'Clothing', videoUrl: null, words: ['camisa', 'pantalón', 'zapato', 'vestido', 'sombrero'] },
      { id: 'p11s5', title: 'Más Ropa', titleEn: 'More Clothing', videoUrl: null, words: ['abrigo', 'bolso', 'reloj', 'llevar', 'llevo'] },
    ],
  },

  {
    id: 'path12',
    title: 'Conectar y Preguntar',
    titleEn: 'Connecting and Asking',
    subLevel: 'Advanced Beginner III',
    videoUrl: null,
    stops: [
      { id: 'p12s1', title: 'Las Preguntas', titleEn: 'The Questions', videoUrl: null, words: ['qué', 'quién', 'cómo', 'cuándo', 'cuánto'] },
      { id: 'p12s2', title: 'Los Conectores', titleEn: 'The Connectors', videoUrl: null, words: ['pero', 'porque', 'cuando', 'si', 'por qué'] },
      { id: 'p12s3', title: 'Mucho y Poco', titleEn: 'A Lot and A Little', videoUrl: null, words: ['mucho', 'poco', 'más', 'menos', 'todo'] },
      { id: 'p12s4', title: 'Hoy y Mañana', titleEn: 'Today and Tomorrow', videoUrl: null, words: ['hoy', 'mañana', 'ayer', 'ahora', 'después'] },
      { id: 'p12s5', title: 'Los Meses', titleEn: 'The Months', videoUrl: null, words: ['enero', 'marzo', 'junio', 'septiembre', 'diciembre'] },
    ],
  },

];

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
