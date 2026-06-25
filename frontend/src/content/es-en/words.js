// words.js — Milo Speaks Spanish
// Revised: 2026-06-24
//
// CHANGES FROM PREVIOUS VERSION:
// — 206 entries removed (no longer drill targets in any Path)
// — 23 tap-to-define entries kept and flagged tapToDefine: true
//   (particles, articles, subject pronouns — learned via sentence exposure)
// — contextSentence changed from string to array of strings
//   Existing entries: single-item array temporarily — expand path by path
//   New entries: empty array [] — populate during path-by-path expansion
// — 39 new entries added as stubs (contextSentence: [])
//
// contextSentence array rules:
// — Minimum 5 sentences per word (populated path by path)
// — Each sentence must vary in structure, speaker, situation
// — App picks one randomly per drill session
// — Never repeat the target word in a way that gives away the answer

export const TOGGLEABLE_CATEGORIES = [
  'Food & Drink', 'Family', 'Travel', 'Places', 'Numbers',
  'Days', 'Colours', 'Body', 'Adjectives', 'Time', 'Questions', 'Connectors',
  'Weather', 'Animals', 'Clothing'
];

export const PRESET_PACKS = [
  { id: 'all', name: 'Everything', emoji: '🌎', desc: 'All packs enabled', cats: ['*'] },
  { id: 'travel', name: 'Travel Trip', emoji: '🧳', desc: 'Just what you need on the road', cats: ['Travel', 'Places', 'Numbers', 'Time', 'Questions'] },
  { id: 'restaurant', name: 'Restaurant', emoji: '🍽️', desc: 'Order, eat, pay, repeat', cats: ['Food & Drink', 'Numbers', 'Adjectives'] },
  { id: 'survival', name: 'Survival 101', emoji: '🆘', desc: 'Bare essentials only', cats: ['Numbers', 'Days', 'Questions'] },
  { id: 'beginner', name: 'Beginner', emoji: '🌱', desc: 'Light load to ease in', cats: ['Family', 'Numbers', 'Colours', 'Days'] },
];

export const DEFAULT_CATEGORIES = Object.fromEntries(TOGGLEABLE_CATEGORIES.map(c => [c, true]));

export const MASTER = [

  // ─────────────────────────────────────────────
  // PATH 1 — El Primer Encuentro
  // ─────────────────────────────────────────────
  { es: 'hola', en: 'hello', type: 'phrase', group: 'Core', contextSentence: ["Hola, ¿cómo estás?"], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fhola.jpg?alt=media", theme: "greetings" },
  { es: 'adiós', en: 'goodbye', type: 'phrase', group: 'Core', contextSentence: ["Adiós, amigo, hasta mañana."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fadios.jpg?alt=media", theme: "greetings" },
  { es: 'buenos días', en: 'good morning', type: 'phrase', group: 'Core', contextSentence: ["Buenos días, ¿cómo estás?"], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fbuenos%20d%C3%ADas.jpg?alt=media", theme: "greetings" },
  { es: 'buenas tardes', en: 'good afternoon', type: 'phrase', group: 'Core', contextSentence: ["Buenas tardes, ¿cómo estás?"], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fbuenas%20tardes.jpg?alt=media", theme: "greetings" },
  { es: 'buenas noches', en: 'good night', type: 'phrase', group: 'Core', contextSentence: ["Buenas noches, familia."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fbuenas%20noches.jpg?alt=media", theme: "greetings" },
  { es: '¿cómo estás?', en: 'how are you?', type: 'phrase', group: 'Core', contextSentence: ["Hola, ¿cómo estás tú?"], imageUrl: "https://picsum.photos/seed/como-estas/400/400", theme: "greetings" },
  { es: 'gracias', en: 'thank you', type: 'phrase', group: 'Core', contextSentence: ["Gracias, eres muy bueno."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fgracias.jpg?alt=media", theme: "greetings" },
  { es: 'de nada', en: "you're welcome", type: 'phrase', group: 'Core', contextSentence: ["De nada, amigo."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fde%20nada.jpg?alt=media", theme: "greetings" },
  { es: 'por favor', en: 'please', type: 'phrase', group: 'Core', contextSentence: ["Disculpe, el menú, por favor."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fpor%20favor.jpg?alt=media", theme: "restaurant" },
  { es: 'perdón', en: 'pardon / sorry', type: 'phrase', group: 'Core', contextSentence: ["Perdón, ¿dónde está el hotel?"], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fperd%C3%B3n.jpg?alt=media", theme: "greetings" },
  { es: 'lo siento', en: "i'm sorry", type: 'phrase', group: 'Core', contextSentence: ["Lo siento, pero no estoy bien."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Flo%20siento.jpg?alt=media", theme: "greetings" },
  { es: 'disculpe', en: 'excuse me', type: 'phrase', group: 'Core', contextSentence: ["Disculpe, ¿dónde está el hospital?"], imageUrl: "https://picsum.photos/seed/excuse+me/400/400", theme: "travel" },
  { es: 'mucho gusto', en: 'nice to meet you', type: 'phrase', group: 'Core', contextSentence: ["Hola, mucho gusto, soy mexicano."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fmucho%20gusto.jpg?alt=media", theme: "greetings" },
  { es: 'encantado', en: 'pleased to meet you', type: 'phrase', group: 'Core', contextSentence: ["Hola, encantado, mucho gusto."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fencantado.jpg?alt=media", theme: "greetings" },
  { es: 'hasta luego', en: 'see you later', type: 'phrase', group: 'Core', contextSentence: ["Hasta luego, amigo, y buenas noches."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fhasta%20luego.jpg?alt=media", theme: "greetings" },
  { es: 'hasta mañana', en: 'see you tomorrow', type: 'phrase', group: 'Core', contextSentence: ["Hasta mañana, amigo."], imageUrl: "https://picsum.photos/seed/hasta-manana/400/400", theme: "greetings" },
  // NEW — p1s3
  { es: 'me llamo', en: 'my name is', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/mellamo/400/400", theme: "greetings" },
  { es: '¿cómo te llamas?', en: 'what is your name?', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/comollamas/400/400", theme: "greetings" },
  // NEW — p1s4
  { es: 'no entiendo', en: "i don't understand", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/noentiendo/400/400", theme: "greetings" },
  { es: 'más despacio', en: 'slower / more slowly', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/masdespacio/400/400", theme: "greetings" },
  { es: '¿puedes repetir?', en: 'can you repeat?', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/puedesrepetir/400/400", theme: "greetings" },
  { es: '¿cómo se dice?', en: 'how do you say?', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/comodice/400/400", theme: "greetings" },
  { es: 'un momento', en: 'one moment', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/unmomento/400/400", theme: "greetings" },
  { es: 'no sé', en: "i don't know", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/nose/400/400", theme: "greetings" },
  // p1s5
  { es: 'sí', en: 'yes', type: 'adv', group: 'Core', contextSentence: ["Sí, yo soy colombiano."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fs%C3%AD.jpg?alt=media", theme: "greetings" },
  { es: 'no', en: 'no', type: 'adv', group: 'Core', contextSentence: ["No estoy bien hoy."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fno.jpg?alt=media", theme: "greetings" },
  { es: 'bien', en: 'well / good', type: 'adv', group: 'Core', contextSentence: ["Yo estoy muy bien, gracias."], imageUrl: "https://picsum.photos/seed/bien/400/400", theme: "greetings" },
  { es: 'mal', en: 'bad / badly', type: 'adv', group: 'Core', contextSentence: ["Estoy mal hoy."], imageUrl: "https://picsum.photos/seed/mal/400/400", theme: "descriptions" },
  // NEW — p1s5
  { es: 'muy bien', en: 'very well', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/muybien/400/400", theme: "greetings" },
  { es: 'más o menos', en: 'more or less / so-so', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/masorenos/400/400", theme: "greetings" },

  // ─────────────────────────────────────────────
  // PATH 2 — Ser
  // ─────────────────────────────────────────────
  { es: 'hombre', en: 'man', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El hombre es muy bueno."], imageUrl: "https://picsum.photos/seed/man/400/400", theme: "descriptions" },
  { es: 'mujer', en: 'woman', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La mujer es muy buena."], imageUrl: "https://picsum.photos/seed/woman/400/400", theme: "health" },
  { es: 'niño', en: 'boy', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El niño está en la escuela."], imageUrl: "https://picsum.photos/seed/boy/400/400", theme: "family" },
  { es: 'niña', en: 'girl', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La niña está en la escuela."], imageUrl: "https://picsum.photos/seed/girl/400/400", theme: "family" },
  { es: 'nombre', en: 'name', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi nombre es María."], imageUrl: "https://picsum.photos/seed/name/400/400", theme: "greetings" },
  { es: 'persona', en: 'person', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una persona en el hotel."], imageUrl: "https://picsum.photos/seed/persona/400/400", theme: "descriptions" },
  { es: 'soy', en: 'i am', type: 'verb', group: 'Core', contextSentence: ["Soy mexicano y ella es colombiana."], imageUrl: "https://picsum.photos/seed/am/400/400", theme: "descriptions" },
  { es: 'eres', en: 'you are', type: 'verb', group: 'Core', contextSentence: ["Tú eres mi amigo."], imageUrl: "https://picsum.photos/seed/are/400/400", theme: "descriptions" },
  { es: 'español', en: 'spanish', type: 'adj', group: 'Core', contextSentence: ["El español es muy difícil pero bueno."], imageUrl: "https://picsum.photos/seed/spanish/400/400", theme: "descriptions" },
  { es: 'inglés', en: 'english', type: 'adj', group: 'Core', contextSentence: ["El inglés es muy difícil pero también es bueno."], imageUrl: "https://picsum.photos/seed/english/400/400", theme: "descriptions" },
  { es: 'americano', en: 'American', type: 'adj', group: 'Core', contextSentence: ["Mi vecino americano habla español."], imageUrl: "https://picsum.photos/seed/americano/400/400", theme: "descriptions" },
  { es: 'canadiense', en: 'Canadian', type: 'adj', group: 'Core', contextSentence: ["Él es canadiense y muy bueno."], imageUrl: "https://picsum.photos/seed/canadiense/400/400", theme: "descriptions" },
  { es: 'es', en: 'he/she/it is', type: 'verb', group: 'Core', contextSentence: ["El hotel es muy grande."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "family" },
  // NEW
  { es: 'son', en: 'they are', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/son/400/400", theme: "descriptions" },
  { es: 'mexicano', en: 'Mexican', type: 'adj', group: 'Core', contextSentence: ["El restaurante mexicano es muy bueno."], imageUrl: "https://picsum.photos/seed/mexicano/400/400", theme: "descriptions" },
  { es: 'colombiano', en: 'Colombian', type: 'adj', group: 'Core', contextSentence: ["Él es colombiano y muy bueno."], imageUrl: "https://picsum.photos/seed/colombiano/400/400", theme: "descriptions" },
  { es: 'muy', en: 'very', type: 'adv', group: 'Connectors', contextSentence: ["El hotel es muy grande."], imageUrl: "https://picsum.photos/seed/very/400/400", theme: "descriptions" },
  { es: 'hoy', en: 'today', type: 'adv', group: 'Time', contextSentence: ["Hoy es un buen día."], imageUrl: "https://picsum.photos/seed/today/400/400", theme: "time" },
  { es: 'quién', en: 'who', type: 'adv', group: 'Questions', contextSentence: ["¿Quién es la mujer con él?"], imageUrl: "https://picsum.photos/seed/who/400/400", theme: "descriptions" },
  { es: 'cómo', en: 'how', type: 'adv', group: 'Questions', contextSentence: ["¿Cómo estás?"], imageUrl: "https://picsum.photos/seed/how/400/400", theme: "greetings" },
  { es: 'cuándo', en: 'when', type: 'adv', group: 'Questions', contextSentence: ["¿Cuándo llega el tren?"], imageUrl: "https://picsum.photos/seed/when/400/400", theme: "travel" },
  { es: 'también', en: 'also / too', type: 'adv', group: 'Connectors', contextSentence: ["Yo también soy colombiano."], imageUrl: "https://picsum.photos/seed/also/400/400", theme: "descriptions" },
  { es: 'su', en: 'his / her / their', type: 'adj', group: 'Core', contextSentence: ["Su familia es muy grande."], imageUrl: "https://picsum.photos/seed/his/400/400", theme: "home" },
  { es: 'aquí', en: 'here', type: 'adv', group: 'Core', contextSentence: ["El hospital está aquí."], imageUrl: "https://picsum.photos/seed/here/400/400", theme: "descriptions" },
  { es: 'uno', en: 'one', type: 'other', group: 'Numbers', contextSentence: ["Hay uno, dos, tres niños aquí."], imageUrl: "https://picsum.photos/seed/one/400/400", theme: "shopping" },
  { es: 'dos', en: 'two', type: 'other', group: 'Numbers', contextSentence: ["Hay dos personas en la casa."], imageUrl: "https://picsum.photos/seed/two/400/400", theme: "shopping" },
  { es: 'tres', en: 'three', type: 'other', group: 'Numbers', contextSentence: ["Hay tres personas en la familia."], imageUrl: "https://picsum.photos/seed/three/400/400", theme: "shopping" },
  { es: 'cuatro', en: 'four', type: 'other', group: 'Numbers', contextSentence: ["La familia tiene cuatro hijos."], imageUrl: "https://picsum.photos/seed/four/400/400", theme: "shopping" },
  { es: 'cinco', en: 'five', type: 'other', group: 'Numbers', contextSentence: ["Hay cinco personas en la familia."], imageUrl: "https://picsum.photos/seed/five/400/400", theme: "shopping" },
  { es: 'seis', en: 'six', type: 'other', group: 'Numbers', contextSentence: ["Hay seis personas en la casa."], imageUrl: "https://picsum.photos/seed/six/400/400", theme: "time" },

  // ─────────────────────────────────────────────
  // PATH 3 — Estar
  // ─────────────────────────────────────────────
  { es: 'casa', en: 'house / home', type: 'noun', group: 'Places', gender: 'f', contextSentence: ["Mi casa es grande."], imageUrl: "https://picsum.photos/seed/house/400/400", theme: "home" },
  { es: 'hotel', en: 'hotel', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["El hotel es muy grande."], imageUrl: "https://picsum.photos/seed/hotel/400/400", theme: "travel" },
  { es: 'escuela', en: 'school', type: 'noun', group: 'Places', gender: 'f', contextSentence: ["La escuela es grande y nueva."], imageUrl: "https://picsum.photos/seed/school/400/400", theme: "descriptions" },
  { es: 'restaurante', en: 'restaurant', type: 'noun', group: 'Places', gender: 'm', contextSentence: ["El restaurante está aquí."], imageUrl: "https://picsum.photos/seed/restaurant/400/400", theme: "restaurant" },
  { es: 'hospital', en: 'hospital', type: 'noun', group: 'Places', gender: 'm', contextSentence: ["El hospital está aquí."], imageUrl: "https://picsum.photos/seed/hospital/400/400", theme: "health" },
  { es: 'banco', en: 'bank', type: 'noun', group: 'Places', gender: 'm', contextSentence: ["El banco está aquí."], imageUrl: "https://picsum.photos/seed/bank/400/400", theme: "shopping" },
  { es: 'estoy', en: 'i am (location)', type: 'verb', group: 'Core', contextSentence: ["Yo estoy en el hospital."], imageUrl: "https://picsum.photos/seed/am/400/400", theme: "travel" },
  { es: 'estás', en: 'you are (location)', type: 'verb', group: 'Core', contextSentence: ["¿Dónde estás tú?"], imageUrl: "https://picsum.photos/seed/are/400/400", theme: "home" },
  { es: 'grande', en: 'big / large', type: 'adj', group: 'Adjectives', contextSentence: ["La ciudad es muy grande."], imageUrl: "https://picsum.photos/seed/big/400/400", theme: "descriptions" },
  { es: 'pequeño', en: 'small', type: 'adj', group: 'Adjectives', contextSentence: ["El niño es muy pequeño."], imageUrl: "https://picsum.photos/seed/small/400/400", theme: "home" },
  { es: 'bueno', en: 'good', type: 'adj', group: 'Adjectives', contextSentence: ["El restaurante es bueno."], imageUrl: "https://picsum.photos/seed/good/400/400", theme: "restaurant" },
  { es: 'abierto', en: 'open', type: 'adj', group: 'Adjectives', contextSentence: ["El restaurante está abierto hoy."], imageUrl: "https://picsum.photos/seed/open/400/400", theme: "shopping" },
  { es: 'está', en: 'he/she/it is (location)', type: 'verb', group: 'Core', contextSentence: ["El hospital está aquí."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "travel" },
  // NEW
  { es: 'están', en: 'they are (location)', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/estan/400/400", theme: "descriptions" },
  { es: 'malo', en: 'bad', type: 'adj', group: 'Adjectives', contextSentence: ["El hotel nuevo es malo."], imageUrl: "https://picsum.photos/seed/bad/400/400", theme: "nature" },
  { es: 'nuevo', en: 'new', type: 'adj', group: 'Adjectives', contextSentence: ["El hotel nuevo es muy grande."], imageUrl: "https://picsum.photos/seed/new/400/400", theme: "shopping" },
  { es: 'viejo', en: 'old', type: 'adj', group: 'Adjectives', contextSentence: ["El hotel es viejo pero grande."], imageUrl: "https://picsum.photos/seed/old/400/400", theme: "descriptions" },
  { es: 'cerrado', en: 'closed', type: 'adj', group: 'Adjectives', contextSentence: ["El restaurante está cerrado hoy."], imageUrl: "https://picsum.photos/seed/closed/400/400", theme: "shopping" },
  { es: 'aeropuerto', en: 'airport', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["El aeropuerto es muy grande."], imageUrl: "https://picsum.photos/seed/airport/400/400", theme: "travel" },
  { es: 'tienda', en: 'store / shop', type: 'noun', group: 'Places', gender: 'f', contextSentence: ["La tienda está aquí."], imageUrl: "https://picsum.photos/seed/store/400/400", theme: "shopping" },
  { es: 'parque', en: 'park', type: 'noun', group: 'Places', gender: 'm', contextSentence: ["Hay un parque grande en la ciudad."], imageUrl: "https://picsum.photos/seed/park/400/400", theme: "nature" },
  { es: 'playa', en: 'beach', type: 'noun', group: 'Places', gender: 'f', contextSentence: ["La playa está aquí."], imageUrl: "https://picsum.photos/seed/beach/400/400", theme: "nature" },
  { es: 'ciudad', en: 'city', type: 'noun', group: 'Places', gender: 'f', contextSentence: ["La casa es muy grande."], imageUrl: "https://picsum.photos/seed/city/400/400", theme: "descriptions" },
  { es: 'país', en: 'country', type: 'noun', group: 'Places', gender: 'm', contextSentence: ["Mi país es grande y bonito."], imageUrl: "https://picsum.photos/seed/country/400/400", theme: "descriptions" },
  { es: 'siete', en: 'seven', type: 'other', group: 'Numbers', contextSentence: ["Hay siete personas en la familia."], imageUrl: "https://picsum.photos/seed/seven/400/400", theme: "time" },
  { es: 'ocho', en: 'eight', type: 'other', group: 'Numbers', contextSentence: ["Hay ocho personas en el restaurante."], imageUrl: "https://picsum.photos/seed/eight/400/400", theme: "time" },
  { es: 'nueve', en: 'nine', type: 'other', group: 'Numbers', contextSentence: ["Hay nueve personas en el restaurante."], imageUrl: "https://picsum.photos/seed/nine/400/400", theme: "time" },
  { es: 'diez', en: 'ten', type: 'other', group: 'Numbers', contextSentence: ["Hay diez personas en el restaurante."], imageUrl: "https://picsum.photos/seed/ten/400/400", theme: "shopping" },
  { es: 'veinte', en: 'twenty', type: 'other', group: 'Numbers', contextSentence: ["Hay veinte personas en el restaurante."], imageUrl: "https://picsum.photos/seed/twenty/400/400", theme: "time" },
  { es: 'cuánto', en: 'how much', type: 'adv', group: 'Questions', contextSentence: ["¿Cuánto cuesta el menú?"], imageUrl: "https://picsum.photos/seed/how+much/400/400", theme: "shopping" },

  // ─────────────────────────────────────────────
  // PATH 4 — Tener y El Tiempo
  // ─────────────────────────────────────────────
  { es: 'pasaporte', en: 'passport', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["Necesito mi pasaporte para el hotel."], imageUrl: "https://picsum.photos/seed/passport/400/400", theme: "travel" },
  { es: 'dinero', en: 'money', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Necesito dinero para el hotel."], imageUrl: "https://picsum.photos/seed/dinero/400/400", theme: "travel" },
  { es: 'teléfono', en: 'telephone', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["Mi teléfono es nuevo."], imageUrl: "https://picsum.photos/seed/telephone/400/400", theme: "shopping" },
  { es: 'taxi', en: 'taxi', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["Hay un taxi en el aeropuerto."], imageUrl: "https://picsum.photos/seed/taxi/400/400", theme: "travel" },
  { es: 'reserva', en: 'reservation', type: 'noun', group: 'Travel', gender: 'f', contextSentence: ["Tengo una reserva en el hotel."], imageUrl: "https://picsum.photos/seed/reservation/400/400", theme: "travel" },
  { es: 'ayuda', en: 'help', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Necesito ayuda con mi pasaporte."], imageUrl: "https://picsum.photos/seed/help/400/400", theme: "greetings" },
  { es: 'tengo', en: 'i have', type: 'verb', group: 'Core', contextSentence: ["Yo tengo un problema con mi pasaporte."], imageUrl: "https://picsum.photos/seed/have/400/400", theme: "travel" },
  { es: 'tienes', en: 'you have', type: 'verb', group: 'Core', contextSentence: ["¿Tienes el pasaporte?"], imageUrl: "https://picsum.photos/seed/have/400/400", theme: "travel" },
  { es: 'problema', en: 'problem', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo tengo un problema con mi pasaporte."], imageUrl: "https://picsum.photos/seed/problema/400/400", theme: "descriptions" },
  { es: 'idea', en: 'idea', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo tengo una idea para el plan."], imageUrl: "https://picsum.photos/seed/idea/400/400", theme: "descriptions" },
  { es: 'plan', en: 'plan', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Tengo un plan para la reserva."], imageUrl: "https://picsum.photos/seed/plan/400/400", theme: "descriptions" },
  { es: 'llave', en: 'key', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo tengo la llave de la casa."], imageUrl: "https://picsum.photos/seed/llave/400/400", theme: "travel" },
  { es: 'tiene', en: 'he/she has', type: 'verb', group: 'Core', contextSentence: ["Ella tiene un problema con su pasaporte."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "travel" },
  // NEW
  { es: 'tienen', en: 'they have', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/tienen/400/400", theme: "descriptions" },
  { es: 'carta', en: 'letter / menu', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo tengo la carta del restaurante."], imageUrl: "https://picsum.photos/seed/carta/400/400", theme: "restaurant" },
  { es: 'cuenta', en: 'bill / check', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Disculpe, necesito la cuenta por favor."], imageUrl: "https://picsum.photos/seed/cuenta/400/400", theme: "restaurant" },
  { es: 'tiempo', en: 'weather / time', type: 'noun', group: 'Time', gender: 'm', contextSentence: ["No tengo tiempo."], imageUrl: "https://picsum.photos/seed/weather/400/400", theme: "nature" },
  { es: 'hora', en: 'hour', type: 'noun', group: 'Time', gender: 'f', contextSentence: ["Tengo una cita en una hora."], imageUrl: "https://picsum.photos/seed/hour/400/400", theme: "time" },
  { es: 'necesito', en: 'i need', type: 'verb', group: 'Core', contextSentence: ["Necesito ayuda con mi pasaporte, por favor."], imageUrl: "https://picsum.photos/seed/need/400/400", theme: "travel" },
  { es: 'necesitas', en: 'you need', type: 'verb', group: 'Core', contextSentence: ["¿Necesitas ayuda con el formulario?"], imageUrl: "https://picsum.photos/seed/need/400/400", theme: "greetings" },
  { es: 'cita', en: 'appointment / date', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo tengo una cita en el hospital."], imageUrl: "https://picsum.photos/seed/cita/400/400", theme: "health" },
  { es: 'documento', en: 'document', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Necesito el documento por favor."], imageUrl: "https://picsum.photos/seed/documento/400/400", theme: "travel" },
  { es: 'agua', en: 'water', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["Yo quiero agua, por favor."], imageUrl: "https://picsum.photos/seed/water/400/400", theme: "restaurant" },
  { es: 'comida', en: 'food', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La comida está muy rica."], imageUrl: "https://picsum.photos/seed/comida/400/400", theme: "restaurant" },
  { es: 'semana', en: 'week', type: 'noun', group: 'Time', gender: 'f', contextSentence: ["Tengo una cita esta semana."], imageUrl: "https://picsum.photos/seed/week/400/400", theme: "time" },
  { es: 'mes', en: 'month', type: 'noun', group: 'Time', gender: 'm', contextSentence: ["Tengo una cita este mes."], imageUrl: "https://picsum.photos/seed/mes/400/400", theme: "descriptions" },
  { es: 'año', en: 'year', type: 'noun', group: 'Time', gender: 'm', contextSentence: ["Tengo una cita en un mes o un año."], imageUrl: "https://picsum.photos/seed/year/400/400", theme: "time" },
  { es: 'minuto', en: 'minute', type: 'noun', group: 'Time', gender: 'm', contextSentence: ["Tengo un minuto para la cita."], imageUrl: "https://picsum.photos/seed/minute/400/400", theme: "time" },
  { es: 'mañana', en: 'tomorrow / morning', type: 'adv', group: 'Time', contextSentence: ["Mañana tengo una cita importante."], imageUrl: "https://picsum.photos/seed/tomorrow/400/400", theme: "time" },
  { es: 'ayer', en: 'yesterday', type: 'adv', group: 'Time', contextSentence: ["Ayer habló mi madre con el abuelo."], imageUrl: "https://picsum.photos/seed/yesterday/400/400", theme: "time" },

  // ─────────────────────────────────────────────
  // PATH 5 — Querer y Poder
  // ─────────────────────────────────────────────
  // NEW
  { es: 'bebida', en: 'drink (general)', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: [], imageUrl: "https://picsum.photos/seed/bebida/400/400", theme: "restaurant" },
  { es: 'café', en: 'coffee', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["Yo quiero un café, por favor."], imageUrl: "https://picsum.photos/seed/coffee/400/400", theme: "restaurant" },
  { es: 'pan', en: 'bread', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["Yo quiero pan con leche."], imageUrl: "https://picsum.photos/seed/bread/400/400", theme: "restaurant" },
  { es: 'fruta', en: 'fruit', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["La fruta es muy rica."], imageUrl: "https://picsum.photos/seed/fruit/400/400", theme: "nature" },
  // NEW
  { es: 'hambre', en: 'hunger', type: 'noun', group: 'Core', gender: 'f', contextSentence: [], imageUrl: "https://picsum.photos/seed/hambre/400/400", theme: "restaurant" },
  { es: 'leche', en: 'milk', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["Yo quiero leche con café."], imageUrl: "https://picsum.photos/seed/milk/400/400", theme: "restaurant" },
  { es: 'quiero', en: 'i want', type: 'verb', group: 'Core', contextSentence: ["Yo quiero agua y pan, por favor."], imageUrl: "https://picsum.photos/seed/want/400/400", theme: "travel" },
  { es: 'quieres', en: 'you want', type: 'verb', group: 'Core', contextSentence: ["¿Quieres agua o jugo?"], imageUrl: "https://picsum.photos/seed/want/400/400", theme: "restaurant" },
  { es: 'jugo', en: 'juice', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["Yo quiero un jugo por favor."], imageUrl: "https://picsum.photos/seed/juice/400/400", theme: "restaurant" },
  { es: 'té', en: 'tea', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo quiero té con leche."], imageUrl: "https://picsum.photos/seed/te/400/400", theme: "restaurant" },
  { es: 'arroz', en: 'rice', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["Yo quiero arroz con pollo, por favor."], imageUrl: "https://picsum.photos/seed/rice/400/400", theme: "restaurant" },
  { es: 'sopa', en: 'soup', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["La sopa está deliciosa."], imageUrl: "https://picsum.photos/seed/soup/400/400", theme: "restaurant" },
  { es: 'quiere', en: 'he/she wants', type: 'verb', group: 'Core', contextSentence: ["Ella quiere agua y pan."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "restaurant" },
  // NEW
  { es: 'quieren', en: 'they want', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/quieren/400/400", theme: "restaurant" },
  { es: 'ensalada', en: 'salad', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["La ensalada es muy rica."], imageUrl: "https://picsum.photos/seed/salad/400/400", theme: "restaurant" },
  { es: 'postre', en: 'dessert', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["El postre es muy rico."], imageUrl: "https://picsum.photos/seed/dessert/400/400", theme: "restaurant" },
  { es: 'rico', en: 'delicious / rich', type: 'adj', group: 'Core', contextSentence: ["El pollo es muy rico."], imageUrl: "https://picsum.photos/seed/rico/400/400", theme: "restaurant" },
  { es: 'delicioso', en: 'delicious', type: 'adj', group: 'Core', contextSentence: ["El pollo es delicioso."], imageUrl: "https://picsum.photos/seed/delicioso/400/400", theme: "restaurant" },
  { es: 'puedo', en: 'i can', type: 'verb', group: 'Core', contextSentence: ["Yo puedo pagar la cuenta por favor."], imageUrl: "https://picsum.photos/seed/can/400/400", theme: "descriptions" },
  { es: 'puedes', en: 'you can', type: 'verb', group: 'Core', contextSentence: ["¿Puedes ver el menú, por favor?"], imageUrl: "https://picsum.photos/seed/can/400/400", theme: "greetings" },
  { es: 'menú', en: 'menu', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["¿Me puede dar el menú, por favor?"], imageUrl: "https://picsum.photos/seed/menu/400/400", theme: "restaurant" },
  { es: 'mesa', en: 'table', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una mesa en el restaurante."], imageUrl: "https://picsum.photos/seed/mesa/400/400", theme: "restaurant" },
  { es: 'orden', en: 'order', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo quiero hacer una orden, por favor."], imageUrl: "https://picsum.photos/seed/orden/400/400", theme: "restaurant" },
  { es: 'propina', en: 'tip', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La propina para el camarero, por favor."], imageUrl: "https://picsum.photos/seed/propina/400/400", theme: "restaurant" },
  { es: 'pollo', en: 'chicken', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["El pollo está muy rico."], imageUrl: "https://picsum.photos/seed/chicken/400/400", theme: "restaurant" },
  { es: 'carne', en: 'meat', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["Yo quiero carne con arroz."], imageUrl: "https://picsum.photos/seed/meat/400/400", theme: "restaurant" },
  { es: 'pescado', en: 'fish', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["El pescado está delicioso."], imageUrl: "https://picsum.photos/seed/fish/400/400", theme: "restaurant" },
  { es: 'verdura', en: 'vegetable', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["La ensalada tiene verdura fresca."], imageUrl: "https://picsum.photos/seed/vegetable/400/400", theme: "nature" },
  { es: 'huevo', en: 'egg', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["Yo quiero un huevo."], imageUrl: "https://picsum.photos/seed/egg/400/400", theme: "restaurant" },
  { es: 'queso', en: 'cheese', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["El queso es muy rico."], imageUrl: "https://picsum.photos/seed/cheese/400/400", theme: "restaurant" },

  // ─────────────────────────────────────────────
  // PATH 6 — Ir y Viajar
  // ─────────────────────────────────────────────
  { es: 'tren', en: 'train', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["El tren va a la ciudad."], imageUrl: "https://picsum.photos/seed/train/400/400", theme: "travel" },
  { es: 'autobús', en: 'bus', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["El autobús va a la ciudad."], imageUrl: "https://picsum.photos/seed/bus/400/400", theme: "travel" },
  { es: 'carro', en: 'car', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["Yo tengo un carro nuevo."], imageUrl: "https://picsum.photos/seed/car/400/400", theme: "shopping" },
  { es: 'vuelo', en: 'flight', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["El vuelo a México es mañana."], imageUrl: "https://picsum.photos/seed/flight/400/400", theme: "travel" },
  { es: 'boleto', en: 'ticket', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["Yo tengo un boleto para el tren."], imageUrl: "https://picsum.photos/seed/ticket/400/400", theme: "travel" },
  { es: 'maleta', en: 'suitcase', type: 'noun', group: 'Travel', gender: 'f', contextSentence: ["Yo llevo mi maleta al aeropuerto."], imageUrl: "https://picsum.photos/seed/suitcase/400/400", theme: "travel" },
  { es: 'voy', en: 'i go', type: 'verb', group: 'Core', contextSentence: ["Yo voy al restaurante con mi amiga."], imageUrl: "https://picsum.photos/seed/go/400/400", theme: "restaurant" },
  { es: 'vas', en: 'you go', type: 'verb', group: 'Core', contextSentence: ["¿Vas a la escuela ahora?"], imageUrl: "https://picsum.photos/seed/go/400/400", theme: "travel" },
  // NEW
  { es: 'llego', en: 'i arrive', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/llego/400/400", theme: "travel" },
  { es: 'llegas', en: 'you arrive', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/llegas/400/400", theme: "travel" },
  { es: 'mapa', en: 'map', type: 'noun', group: 'Travel', gender: 'm', contextSentence: ["Tengo un mapa de la ciudad."], imageUrl: "https://picsum.photos/seed/map/400/400", theme: "travel" },
  { es: 'dirección', en: 'address / direction', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["¿Tienes la dirección del hotel?"], imageUrl: "https://picsum.photos/seed/direccion/400/400", theme: "travel" },
  { es: 'va', en: 'he/she goes', type: 'verb', group: 'Core', contextSentence: ["Ella va al restaurante con su amiga."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "shopping" },
  // NEW
  { es: 'van', en: 'they go', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/van/400/400", theme: "travel" },
  { es: 'ahora', en: 'now', type: 'adv', group: 'Time', contextSentence: ["Ahora voy al restaurante con mi amiga."], imageUrl: "https://picsum.photos/seed/now/400/400", theme: "time" },
  { es: 'después', en: 'after / later', type: 'adv', group: 'Time', contextSentence: ["Después, vamos a la casa."], imageUrl: "https://picsum.photos/seed/after/400/400", theme: "time" },
  { es: 'antes', en: 'before', type: 'adv', group: 'Time', contextSentence: ["Yo como antes, pero ahora no."], imageUrl: "https://picsum.photos/seed/before/400/400", theme: "time" },
  { es: 'tarde', en: 'afternoon / late', type: 'adv', group: 'Time', contextSentence: ["Es tarde para comer."], imageUrl: "https://picsum.photos/seed/afternoon/400/400", theme: "time" },
  // NEW
  { es: 'a la derecha', en: 'to the right', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/derecha/400/400", theme: "travel" },
  { es: 'a la izquierda', en: 'to the left', type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/izquierda/400/400", theme: "travel" },
  { es: 'recto', en: 'straight ahead', type: 'adv', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/recto/400/400", theme: "travel" },
  { es: 'cerca', en: 'near', type: 'adv', group: 'Connectors', contextSentence: ["El parque está cerca de la escuela."], imageUrl: "https://picsum.photos/seed/near/400/400", theme: "travel" },
  { es: 'lejos', en: 'far', type: 'adv', group: 'Connectors', contextSentence: ["El hospital está lejos de aquí."], imageUrl: "https://picsum.photos/seed/far/400/400", theme: "health" },
  { es: 'estoy perdido', en: "i'm lost", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/perdido/400/400", theme: "travel" },
  { es: 'sol', en: 'sun', type: 'noun', group: 'Weather', gender: 'm', contextSentence: ["Hay sol en la playa hoy."], imageUrl: "https://picsum.photos/seed/sun/400/400", theme: "nature" },
  { es: 'lluvia', en: 'rain', type: 'noun', group: 'Weather', gender: 'f', contextSentence: ["Hay lluvia en la ciudad."], imageUrl: "https://picsum.photos/seed/rain/400/400", theme: "nature" },
  { es: 'nieve', en: 'snow', type: 'noun', group: 'Weather', gender: 'f', contextSentence: ["Hay nieve en la ciudad."], imageUrl: "https://picsum.photos/seed/snow/400/400", theme: "nature" },
  { es: 'viento', en: 'wind', type: 'noun', group: 'Weather', gender: 'm', contextSentence: ["Hay mucho viento hoy."], imageUrl: "https://picsum.photos/seed/wind/400/400", theme: "nature" },
  { es: 'calor', en: 'heat', type: 'noun', group: 'Weather', gender: 'm', contextSentence: ["Hay mucho calor en la ciudad."], imageUrl: "https://picsum.photos/seed/heat/400/400", theme: "nature" },
  { es: 'frío', en: 'cold', type: 'adj', group: 'Adjectives', contextSentence: ["El agua está muy fría."], imageUrl: "https://picsum.photos/seed/cold/400/400", theme: "nature" },

  // ─────────────────────────────────────────────
  // PATH 7 — Hablar y Saber
  // ─────────────────────────────────────────────
  { es: 'mensaje', en: 'message', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo tengo un mensaje para ti."], imageUrl: "https://picsum.photos/seed/mensaje/400/400", theme: "communication" },
  { es: 'llamada', en: 'phone call', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Tengo una llamada importante."], imageUrl: "https://picsum.photos/seed/llamada/400/400", theme: "communication" },
  { es: 'correo', en: 'mail / email', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Tengo un correo nuevo."], imageUrl: "https://picsum.photos/seed/correo/400/400", theme: "communication" },
  { es: 'pregunta', en: 'question', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La pregunta es muy difícil."], imageUrl: "https://picsum.photos/seed/pregunta/400/400", theme: "communication" },
  { es: 'respuesta', en: 'answer', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["No tengo la respuesta."], imageUrl: "https://picsum.photos/seed/respuesta/400/400", theme: "communication" },
  { es: 'conversación', en: 'conversation', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La conversación es muy fácil."], imageUrl: "https://picsum.photos/seed/conversacion/400/400", theme: "communication" },
  { es: 'hablo', en: 'i speak', type: 'verb', group: 'Core', contextSentence: ["Yo hablo español con mi amiga."], imageUrl: "https://picsum.photos/seed/speak/400/400", theme: "descriptions" },
  { es: 'hablas', en: 'you speak', type: 'verb', group: 'Core', contextSentence: ["Tú hablas español muy bien."], imageUrl: "https://picsum.photos/seed/speak/400/400", theme: "descriptions" },
  { es: 'idioma', en: 'language', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El español es un idioma muy rico."], imageUrl: "https://picsum.photos/seed/idioma/400/400", theme: "communication" },
  { es: 'palabra', en: 'word', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["No entiendo esa palabra."], imageUrl: "https://picsum.photos/seed/palabra/400/400", theme: "communication" },
  { es: 'frase', en: 'phrase', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Esta frase es muy fácil."], imageUrl: "https://picsum.photos/seed/frase/400/400", theme: "communication" },
  { es: 'acento', en: 'accent', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi acento en español es muy malo."], imageUrl: "https://picsum.photos/seed/acento/400/400", theme: "communication" },
  { es: 'habla', en: 'he/she speaks', type: 'verb', group: 'Core', contextSentence: ["Ella habla español muy bien."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "descriptions" },
  // NEW
  { es: 'hablan', en: 'they speak', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/hablan/400/400", theme: "descriptions" },
  { es: 'significado', en: 'meaning', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["¿Sabes el significado de esta palabra?"], imageUrl: "https://picsum.photos/seed/significado/400/400", theme: "communication" },
  { es: 'verdad', en: 'truth', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo sé la verdad."], imageUrl: "https://picsum.photos/seed/verdad/400/400", theme: "communication" },
  { es: 'razón', en: 'reason / right', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo sé que tú tienes razón."], imageUrl: "https://picsum.photos/seed/razon/400/400", theme: "communication" },
  { es: 'sé', en: 'i know', type: 'verb', group: 'Core', contextSentence: ["Yo sé la verdad."], imageUrl: "https://picsum.photos/seed/know/400/400", theme: "descriptions" },
  { es: 'veo', en: 'i see / watch', type: 'verb', group: 'Core', contextSentence: ["Yo veo una película en casa."], imageUrl: "https://picsum.photos/seed/see/400/400", theme: "descriptions" },
  { es: 'ves', en: 'you see / watch', type: 'verb', group: 'Core', contextSentence: ["¿Ves la película en la televisión?"], imageUrl: "https://picsum.photos/seed/see/400/400", theme: "descriptions" },
  { es: 'escucho', en: 'i listen', type: 'verb', group: 'Core', contextSentence: ["Yo escucho música con mi amiga."], imageUrl: "https://picsum.photos/seed/listen/400/400", theme: "descriptions" },
  { es: 'escuchas', en: 'you listen', type: 'verb', group: 'Core', contextSentence: ["¿Escuchas la música con tu amiga?"], imageUrl: "https://picsum.photos/seed/listen/400/400", theme: "descriptions" },
  { es: 'televisión', en: 'television', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo veo la televisión con mi familia."], imageUrl: "https://picsum.photos/seed/television/400/400", theme: "communication" },
  { es: 'música', en: 'music', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Me gusta la música y el baile."], imageUrl: "https://picsum.photos/seed/musica/400/400", theme: "descriptions" },
  { es: 'película', en: 'movie', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo veo una película en casa."], imageUrl: "https://picsum.photos/seed/pelicula/400/400", theme: "communication" },
  { es: 'foto', en: 'photo', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo tengo una foto de mi familia."], imageUrl: "https://picsum.photos/seed/foto/400/400", theme: "communication" },
  { es: 'video', en: 'video', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Veo un video en la televisión."], imageUrl: "https://picsum.photos/seed/video/400/400", theme: "communication" },
  { es: 'imagen', en: 'image', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo veo una imagen en la televisión."], imageUrl: "https://picsum.photos/seed/imagen/400/400", theme: "communication" },
  { es: 'noticias', en: 'news', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Veo las noticias en la televisión."], imageUrl: "https://picsum.photos/seed/noticias/400/400", theme: "communication" },
  { es: 'canción', en: 'song', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Me gusta esta canción."], imageUrl: "https://picsum.photos/seed/cancion/400/400", theme: "descriptions" },

  // ─────────────────────────────────────────────
  // PATH 8 — Decir, Familia y Los Días
  // ─────────────────────────────────────────────
  { es: 'madre', en: 'mother', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi madre es muy buena."], imageUrl: "https://picsum.photos/seed/mother/400/400", theme: "family" },
  { es: 'padre', en: 'father', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi padre es muy bueno."], imageUrl: "https://picsum.photos/seed/father/400/400", theme: "family" },
  { es: 'hijo', en: 'son', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi hijo es muy bueno."], imageUrl: "https://picsum.photos/seed/son/400/400", theme: "family" },
  { es: 'hija', en: 'daughter', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi hija es muy buena."], imageUrl: "https://picsum.photos/seed/daughter/400/400", theme: "family" },
  { es: 'hermano', en: 'brother', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi hermano es muy grande."], imageUrl: "https://picsum.photos/seed/brother/400/400", theme: "family" },
  { es: 'hermana', en: 'sister', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi hermana es muy buena."], imageUrl: "https://picsum.photos/seed/sister/400/400", theme: "family" },
  { es: 'digo', en: 'i say', type: 'verb', group: 'Core', contextSentence: ["Yo digo hola a mi amigo."], imageUrl: "https://picsum.photos/seed/say/400/400", theme: "descriptions" },
  { es: 'dices', en: 'you say', type: 'verb', group: 'Core', contextSentence: ["Tú dices hola y ella dice adiós."], imageUrl: "https://picsum.photos/seed/say/400/400", theme: "descriptions" },
  { es: 'abuelo', en: 'grandfather', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi abuelo es muy bueno."], imageUrl: "https://picsum.photos/seed/grandfather/400/400", theme: "family" },
  { es: 'abuela', en: 'grandmother', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi abuela es muy buena."], imageUrl: "https://picsum.photos/seed/grandmother/400/400", theme: "family" },
  { es: 'esposo', en: 'husband', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi esposo es muy bueno."], imageUrl: "https://picsum.photos/seed/husband/400/400", theme: "family" },
  { es: 'esposa', en: 'wife', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi esposa es muy buena."], imageUrl: "https://picsum.photos/seed/wife/400/400", theme: "family" },
  { es: 'dice', en: 'he/she says', type: 'verb', group: 'Core', contextSentence: ["Ella dice que la comida es deliciosa."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "family" },
  // NEW
  { es: 'dicen', en: 'they say', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/dicen/400/400", theme: "descriptions" },
  { es: 'primo', en: 'cousin (m)', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi primo es muy grande."], imageUrl: "https://picsum.photos/seed/cousin/400/400", theme: "family" },
  { es: 'prima', en: 'cousin (f)', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi prima es mi amiga también."], imageUrl: "https://picsum.photos/seed/cousin/400/400", theme: "family" },
  { es: 'tío', en: 'uncle', type: 'noun', group: 'Family', gender: 'm', contextSentence: ["Mi tío es de México."], imageUrl: "https://picsum.photos/seed/uncle/400/400", theme: "family" },
  { es: 'tía', en: 'aunt', type: 'noun', group: 'Family', gender: 'f', contextSentence: ["Mi tía es muy buena."], imageUrl: "https://picsum.photos/seed/aunt/400/400", theme: "family" },
  { es: 'lunes', en: 'monday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es lunes y hay escuela."], imageUrl: "https://picsum.photos/seed/monday/400/400", theme: "time" },
  { es: 'martes', en: 'tuesday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es martes y hay una fiesta."], imageUrl: "https://picsum.photos/seed/tuesday/400/400", theme: "time" },
  { es: 'miércoles', en: 'wednesday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es miércoles y hay una fiesta."], imageUrl: "https://picsum.photos/seed/wednesday/400/400", theme: "time" },
  { es: 'jueves', en: 'thursday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es jueves y hay una fiesta."], imageUrl: "https://picsum.photos/seed/thursday/400/400", theme: "time" },
  { es: 'viernes', en: 'friday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es viernes y hay fiesta."], imageUrl: "https://picsum.photos/seed/friday/400/400", theme: "time" },
  { es: 'sábado', en: 'saturday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es sábado y hay una fiesta."], imageUrl: "https://picsum.photos/seed/saturday/400/400", theme: "time" },
  { es: 'domingo', en: 'sunday', type: 'noun', group: 'Days', gender: 'm', contextSentence: ["Hoy es domingo y hay fiesta."], imageUrl: "https://picsum.photos/seed/sunday/400/400", theme: "time" },
  { es: 'novio', en: 'boyfriend', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi novio es muy bueno."], imageUrl: "https://picsum.photos/seed/novio/400/400", theme: "family" },
  { es: 'novia', en: 'girlfriend', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Mi novia es muy buena."], imageUrl: "https://picsum.photos/seed/novia/400/400", theme: "family" },
  { es: 'pareja', en: 'couple / partner', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Mi pareja y yo somos mexicanos."], imageUrl: "https://picsum.photos/seed/pareja/400/400", theme: "family" },
  { es: 'vecino', en: 'neighbor (m)', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi vecino es muy bueno."], imageUrl: "https://picsum.photos/seed/vecino/400/400", theme: "home" },
  { es: 'compañero', en: 'companion / coworker', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi compañero y yo somos amigos."], imageUrl: "https://picsum.photos/seed/companero/400/400", theme: "descriptions" },

  // ─────────────────────────────────────────────
  // PATH 9 — Comer y Beber
  // ─────────────────────────────────────────────
  { es: 'tomate', en: 'tomato', type: 'noun', group: 'Food & Drink', gender: 'm', contextSentence: ["El tomate es muy rico."], imageUrl: "https://picsum.photos/seed/tomato/400/400", theme: "restaurant" },
  { es: 'cebolla', en: 'onion', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La sopa tiene cebolla y zanahoria."], imageUrl: "https://picsum.photos/seed/cebolla/400/400", theme: "restaurant" },
  { es: 'papa', en: 'potato', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo como la papa con queso."], imageUrl: "https://picsum.photos/seed/papa/400/400", theme: "restaurant" },
  { es: 'lechuga', en: 'lettuce', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La ensalada tiene lechuga y tomate."], imageUrl: "https://picsum.photos/seed/lechuga/400/400", theme: "restaurant" },
  { es: 'zanahoria', en: 'carrot', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una zanahoria en la ensalada."], imageUrl: "https://picsum.photos/seed/zanahoria/400/400", theme: "restaurant" },
  { es: 'manzana', en: 'apple', type: 'noun', group: 'Food & Drink', gender: 'f', contextSentence: ["Yo quiero una manzana."], imageUrl: "https://picsum.photos/seed/apple/400/400", theme: "restaurant" },
  { es: 'como', en: 'i eat', type: 'verb', group: 'Core', contextSentence: ["Yo como pollo con arroz."], imageUrl: "https://picsum.photos/seed/eat/400/400", theme: "restaurant" },
  { es: 'comes', en: 'you eat', type: 'verb', group: 'Core', contextSentence: ["Tú comes la ensalada con pollo."], imageUrl: "https://picsum.photos/seed/eat/400/400", theme: "restaurant" },
  { es: 'desayuno', en: 'breakfast', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo como huevo en el desayuno."], imageUrl: "https://picsum.photos/seed/desayuno/400/400", theme: "restaurant" },
  { es: 'almuerzo', en: 'lunch', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El almuerzo es muy rico."], imageUrl: "https://picsum.photos/seed/almuerzo/400/400", theme: "restaurant" },
  { es: 'cena', en: 'dinner', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La cena es muy rica."], imageUrl: "https://picsum.photos/seed/cena/400/400", theme: "restaurant" },
  { es: 'merienda', en: 'afternoon snack', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La merienda es buena."], imageUrl: "https://picsum.photos/seed/merienda/400/400", theme: "restaurant" },
  { es: 'come', en: 'he/she eats', type: 'verb', group: 'Core', contextSentence: ["Ella come pollo con arroz."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "restaurant" },
  // NEW
  { es: 'comen', en: 'they eat', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/comen/400/400", theme: "restaurant" },
  { es: 'bocadillo', en: 'sandwich / snack', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo como un bocadillo con queso y tomate."], imageUrl: "https://picsum.photos/seed/bocadillo/400/400", theme: "restaurant" },
  { es: 'galleta', en: 'cookie', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo como una galleta con leche."], imageUrl: "https://picsum.photos/seed/galleta/400/400", theme: "restaurant" },
  { es: 'plato', en: 'plate / dish', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El plato de sopa es muy rico."], imageUrl: "https://picsum.photos/seed/plato/400/400", theme: "restaurant" },
  { es: 'taza', en: 'cup', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo quiero una taza de café."], imageUrl: "https://picsum.photos/seed/taza/400/400", theme: "restaurant" },
  { es: 'bebo', en: 'i drink', type: 'verb', group: 'Core', contextSentence: ["Yo bebo agua con mi familia."], imageUrl: "https://picsum.photos/seed/drink/400/400", theme: "restaurant" },
  { es: 'bebes', en: 'you drink', type: 'verb', group: 'Core', contextSentence: ["Tú bebes café con leche."], imageUrl: "https://picsum.photos/seed/drink/400/400", theme: "restaurant" },
  { es: 'refresco', en: 'soft drink', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo quiero un refresco, por favor."], imageUrl: "https://picsum.photos/seed/refresco/400/400", theme: "restaurant" },
  { es: 'vino', en: 'wine', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo quiero una copa de vino."], imageUrl: "https://picsum.photos/seed/vino/400/400", theme: "restaurant" },
  { es: 'cerveza', en: 'beer', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo quiero una cerveza, por favor."], imageUrl: "https://picsum.photos/seed/cerveza/400/400", theme: "restaurant" },
  { es: 'botella', en: 'bottle', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una botella de agua aquí."], imageUrl: "https://picsum.photos/seed/botella/400/400", theme: "restaurant" },
  // NEW — tener expressions
  { es: 'tengo hambre', en: "i'm hungry", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/hambre/400/400", theme: "restaurant" },
  { es: 'tengo sed', en: "i'm thirsty", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/sed/400/400", theme: "restaurant" },
  { es: 'tengo frío', en: "i'm cold", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/frio/400/400", theme: "nature" },
  { es: 'tengo calor', en: "i'm hot", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/calor/400/400", theme: "nature" },
  { es: 'tengo sueño', en: "i'm sleepy", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/sueno/400/400", theme: "health" },
  { es: 'tengo miedo', en: "i'm scared", type: 'phrase', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/miedo/400/400", theme: "health" },

  // ─────────────────────────────────────────────
  // PATH 10 — Comprar, Vivir y Trabajar
  // ─────────────────────────────────────────────
  { es: 'producto', en: 'product', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Este producto es muy barato."], imageUrl: "https://picsum.photos/seed/producto/400/400", theme: "travel" },
  { es: 'ropa', en: 'clothing', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo tengo ropa nueva en mi casa."], imageUrl: "https://picsum.photos/seed/ropa/400/400", theme: "travel" },
  { es: 'zapato', en: 'shoe', type: 'noun', group: 'Clothing', gender: 'm', contextSentence: ["El zapato nuevo es muy caro."], imageUrl: "https://picsum.photos/seed/shoe/400/400", theme: "clothing" },
  { es: 'talla', en: 'size', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["¿Qué talla de ropa necesitas?"], imageUrl: "https://picsum.photos/seed/talla/400/400", theme: "travel" },
  { es: 'efectivo', en: 'cash', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["No tengo efectivo, solo tarjeta."], imageUrl: "https://picsum.photos/seed/efectivo/400/400", theme: "travel" },
  { es: 'tarjeta', en: 'card (credit/debit)', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo pago con tarjeta, por favor."], imageUrl: "https://picsum.photos/seed/tarjeta/400/400", theme: "travel" },
  { es: 'compro', en: 'i buy', type: 'verb', group: 'Core', contextSentence: ["Yo compro fruta en la tienda."], imageUrl: "https://picsum.photos/seed/buy/400/400", theme: "shopping" },
  { es: 'compras', en: 'you buy', type: 'verb', group: 'Core', contextSentence: ["¿Qué compras en la tienda?"], imageUrl: "https://picsum.photos/seed/buy/400/400", theme: "shopping" },
  { es: 'descuento', en: 'discount', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Hay un descuento en la tienda."], imageUrl: "https://picsum.photos/seed/descuento/400/400", theme: "travel" },
  { es: 'oferta', en: 'offer / sale', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una oferta en la tienda."], imageUrl: "https://picsum.photos/seed/oferta/400/400", theme: "travel" },
  { es: 'regalo', en: 'gift', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El regalo es para mi familia."], imageUrl: "https://picsum.photos/seed/regalo/400/400", theme: "family" },
  { es: 'bolsa', en: 'bag', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La bolsa es muy grande."], imageUrl: "https://picsum.photos/seed/bolsa/400/400", theme: "travel" },
  { es: 'cien', en: 'one hundred', type: 'other', group: 'Numbers', contextSentence: ["El precio es cien."], imageUrl: "https://picsum.photos/seed/one+hundred/400/400", theme: "shopping" },
  // NEW
  { es: 'mil', en: 'thousand', type: 'other', group: 'Numbers', contextSentence: [], imageUrl: "https://picsum.photos/seed/mil/400/400", theme: "shopping" },
  { es: 'precio', en: 'price', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El precio es muy caro."], imageUrl: "https://picsum.photos/seed/precio/400/400", theme: "travel" },
  { es: 'cambio', en: 'change (money)', type: 'noun', group: 'Core', gender: 'm', contextSentence: [], imageUrl: "https://picsum.photos/seed/cambio/400/400", theme: "shopping" },
  { es: 'billete', en: 'banknote / bill', type: 'noun', group: 'Core', gender: 'm', contextSentence: [], imageUrl: "https://picsum.photos/seed/billete/400/400", theme: "shopping" },
  { es: 'moneda', en: 'coin / currency', type: 'noun', group: 'Core', gender: 'f', contextSentence: [], imageUrl: "https://picsum.photos/seed/moneda/400/400", theme: "shopping" },
  { es: 'vivo', en: 'i live', type: 'verb', group: 'Core', contextSentence: ["Yo vivo en un apartamento grande."], imageUrl: "https://picsum.photos/seed/live/400/400", theme: "home" },
  { es: 'vives', en: 'you live', type: 'verb', group: 'Core', contextSentence: ["¿Dónde vives tú?"], imageUrl: "https://picsum.photos/seed/live/400/400", theme: "home" },
  { es: 'apartamento', en: 'apartment', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Yo vivo en un apartamento grande."], imageUrl: "https://picsum.photos/seed/apartamento/400/400", theme: "home" },
  { es: 'vecindario', en: 'neighborhood', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Vivo en un vecindario grande."], imageUrl: "https://picsum.photos/seed/vecindario/400/400", theme: "home" },
  { es: 'barrio', en: 'neighborhood', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Hay un parque en mi barrio."], imageUrl: "https://picsum.photos/seed/barrio/400/400", theme: "home" },
  { es: 'edificio', en: 'building', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El edificio es muy grande."], imageUrl: "https://picsum.photos/seed/edificio/400/400", theme: "city" },
  { es: 'trabajo', en: 'i work', type: 'verb', group: 'Core', contextSentence: ["Yo trabajo en la oficina."], imageUrl: "https://picsum.photos/seed/work/400/400", theme: "shopping" },
  { es: 'trabajas', en: 'you work', type: 'verb', group: 'Core', contextSentence: ["Tú trabajas en la empresa."], imageUrl: "https://picsum.photos/seed/work/400/400", theme: "descriptions" },
  { es: 'jefe', en: 'boss', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi jefe trabaja en la oficina."], imageUrl: "https://picsum.photos/seed/jefe/400/400", theme: "descriptions" },
  { es: 'empresa', en: 'company', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo trabajo en una empresa grande."], imageUrl: "https://picsum.photos/seed/empresa/400/400", theme: "descriptions" },
  { es: 'horario', en: 'schedule', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi horario de trabajo es muy difícil."], imageUrl: "https://picsum.photos/seed/horario/400/400", theme: "descriptions" },
  { es: 'sueldo', en: 'salary', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Mi sueldo es bueno."], imageUrl: "https://picsum.photos/seed/sueldo/400/400", theme: "descriptions" },

  // ─────────────────────────────────────────────
  // PATH 11 — El Cuerpo y La Salud
  // ─────────────────────────────────────────────
  { es: 'cabeza', en: 'head', type: 'noun', group: 'Body', gender: 'f', contextSentence: ["Me duele la cabeza."], imageUrl: "https://picsum.photos/seed/head/400/400", theme: "health" },
  { es: 'ojo', en: 'eye', type: 'noun', group: 'Body', gender: 'm', contextSentence: ["Ella tiene dolor en el ojo."], imageUrl: "https://picsum.photos/seed/eye/400/400", theme: "descriptions" },
  { es: 'nariz', en: 'nose', type: 'noun', group: 'Body', gender: 'f', contextSentence: ["Mi nariz es grande."], imageUrl: "https://picsum.photos/seed/nose/400/400", theme: "health" },
  { es: 'boca', en: 'mouth', type: 'noun', group: 'Body', gender: 'f', contextSentence: ["Tengo dolor en la boca."], imageUrl: "https://picsum.photos/seed/mouth/400/400", theme: "health" },
  { es: 'mano', en: 'hand', type: 'noun', group: 'Body', gender: 'f', contextSentence: ["Yo tengo dolor en la mano."], imageUrl: "https://picsum.photos/seed/hand/400/400", theme: "health" },
  { es: 'brazo', en: 'arm', type: 'noun', group: 'Body', gender: 'm', contextSentence: ["Me duele el brazo."], imageUrl: "https://picsum.photos/seed/arm/400/400", theme: "health" },
  { es: 'pierna', en: 'leg', type: 'noun', group: 'Body', gender: 'f', contextSentence: ["Me duele la pierna."], imageUrl: "https://picsum.photos/seed/leg/400/400", theme: "health" },
  { es: 'pie', en: 'foot', type: 'noun', group: 'Body', gender: 'm', contextSentence: ["Me duele el pie."], imageUrl: "https://picsum.photos/seed/foot/400/400", theme: "health" },
  { es: 'espalda', en: 'back (body)', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Me duele la espalda."], imageUrl: "https://picsum.photos/seed/espalda/400/400", theme: "health" },
  { es: 'corazón', en: 'heart', type: 'noun', group: 'Body', gender: 'm', contextSentence: ["Mi corazón está bien hoy."], imageUrl: "https://picsum.photos/seed/heart/400/400", theme: "health" },
  { es: 'dedo', en: 'finger / toe', type: 'noun', group: 'Body', gender: 'm', contextSentence: ["Me duele el dedo."], imageUrl: "https://picsum.photos/seed/finger/400/400", theme: "health" },
  { es: 'oreja', en: 'ear', type: 'noun', group: 'Body', gender: 'f', contextSentence: ["Me duele la oreja."], imageUrl: "https://picsum.photos/seed/ear/400/400", theme: "health" },
  { es: 'médico', en: 'doctor', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El médico está en el hospital."], imageUrl: "https://picsum.photos/seed/medico/400/400", theme: "health" },
  { es: 'medicina', en: 'medicine', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo necesito la medicina para el dolor."], imageUrl: "https://picsum.photos/seed/medicina/400/400", theme: "health" },
  { es: 'dolor', en: 'pain', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Tengo dolor de cabeza."], imageUrl: "https://picsum.photos/seed/dolor/400/400", theme: "health" },
  { es: 'fiebre', en: 'fever', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Él tiene fiebre y está muy mal."], imageUrl: "https://picsum.photos/seed/fiebre/400/400", theme: "health" },
  { es: 'alergia', en: 'allergy', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Tengo una alergia muy mala."], imageUrl: "https://picsum.photos/seed/alergia/400/400", theme: "health" },
  { es: 'emergencia', en: 'emergency', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una emergencia en el hospital."], imageUrl: "https://picsum.photos/seed/emergencia/400/400", theme: "health" },
  { es: 'duermo', en: 'i sleep', type: 'verb', group: 'Core', contextSentence: ["Yo duermo en mi cama."], imageUrl: "https://picsum.photos/seed/sleep/400/400", theme: "health" },
  { es: 'duermes', en: 'you sleep', type: 'verb', group: 'Core', contextSentence: ["¿Duermes bien o mal?"], imageUrl: "https://picsum.photos/seed/sleep/400/400", theme: "health" },
  { es: 'cansado', en: 'tired', type: 'adj', group: 'Adjectives', contextSentence: ["Yo estoy muy cansado hoy."], imageUrl: "https://picsum.photos/seed/tired/400/400", theme: "health" },
  { es: 'sueño', en: 'sleep / dream', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Tengo sueño pero no duermo."], imageUrl: "https://picsum.photos/seed/sueno/400/400", theme: "health" },
  { es: 'cama', en: 'bed', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Yo duermo en la cama."], imageUrl: "https://picsum.photos/seed/cama/400/400", theme: "home" },
  { es: 'noche', en: 'night', type: 'noun', group: 'Time', gender: 'f', contextSentence: ["Buenas noches, ¿cómo estás?"], imageUrl: "https://picsum.photos/seed/night/400/400", theme: "time" },
  { es: 'vengo', en: 'i come', type: 'verb', group: 'Core', contextSentence: ["Yo vengo con mi familia hoy."], imageUrl: "https://picsum.photos/seed/come/400/400", theme: "travel" },
  { es: 'vienes', en: 'you come', type: 'verb', group: 'Core', contextSentence: ["¿Vienes a la escuela hoy?"], imageUrl: "https://picsum.photos/seed/come/400/400", theme: "descriptions" },
  { es: 'enfermo', en: 'sick', type: 'adj', group: 'Core', contextSentence: ["El niño está enfermo hoy."], imageUrl: "https://picsum.photos/seed/enfermo/400/400", theme: "health" },
  { es: 'feliz', en: 'happy', type: 'adj', group: 'Core', contextSentence: ["Ella está feliz con su familia."], imageUrl: "https://picsum.photos/seed/feliz/400/400", theme: "feelings" },
  { es: 'triste', en: 'sad', type: 'adj', group: 'Core', contextSentence: ["Ella está triste hoy."], imageUrl: "https://picsum.photos/seed/triste/400/400", theme: "feelings" },
  { es: 'mejor', en: 'better', type: 'adj', group: 'Core', contextSentence: ["Me siento mejor hoy."], imageUrl: "https://picsum.photos/seed/mejor/400/400", theme: "health" },

  // ─────────────────────────────────────────────
  // PATH 12 — El Mundo
  // ─────────────────────────────────────────────
  { es: 'rojo', en: 'red', type: 'adj', group: 'Colours', contextSentence: ["El carro es rojo."], imageUrl: "https://picsum.photos/seed/red/400/400", theme: "descriptions" },
  { es: 'azul', en: 'blue', type: 'adj', group: 'Colours', contextSentence: ["El cielo es muy azul hoy."], imageUrl: "https://picsum.photos/seed/blue/400/400", theme: "nature" },
  { es: 'verde', en: 'green', type: 'adj', group: 'Colours', contextSentence: ["La manzana es verde."], imageUrl: "https://picsum.photos/seed/green/400/400", theme: "nature" },
  { es: 'amarillo', en: 'yellow', type: 'adj', group: 'Colours', contextSentence: ["El carro amarillo es muy grande."], imageUrl: "https://picsum.photos/seed/yellow/400/400", theme: "nature" },
  { es: 'blanco', en: 'white', type: 'adj', group: 'Colours', contextSentence: ["El carro es blanco."], imageUrl: "https://picsum.photos/seed/white/400/400", theme: "nature" },
  { es: 'negro', en: 'black', type: 'adj', group: 'Colours', contextSentence: ["El gato es negro."], imageUrl: "https://picsum.photos/seed/black/400/400", theme: "restaurant" },
  { es: 'naranja', en: 'orange', type: 'adj', group: 'Colours', contextSentence: ["La fruta naranja es muy rica."], imageUrl: "https://picsum.photos/seed/orange/400/400", theme: "nature" },
  { es: 'gris', en: 'grey', type: 'adj', group: 'Colours', contextSentence: ["El carro es gris."], imageUrl: "https://picsum.photos/seed/grey/400/400", theme: "nature" },
  { es: 'morado', en: 'purple', type: 'adj', group: 'Colours', contextSentence: ["Mi carro nuevo es morado."], imageUrl: "https://picsum.photos/seed/purple/400/400", theme: "nature" },
  { es: 'rosado', en: 'pink', type: 'adj', group: 'Core', contextSentence: ["La casa es rosada y grande."], imageUrl: "https://picsum.photos/seed/rosado/400/400", theme: "descriptions" },
  { es: 'dorado', en: 'golden', type: 'adj', group: 'Core', contextSentence: ["El sol es dorado y grande."], imageUrl: "https://picsum.photos/seed/dorado/400/400", theme: "descriptions" },
  { es: 'plateado', en: 'silver', type: 'adj', group: 'Core', contextSentence: ["El carro es plateado y nuevo."], imageUrl: "https://picsum.photos/seed/plateado/400/400", theme: "descriptions" },
  { es: 'tormenta', en: 'storm', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una tormenta en la ciudad."], imageUrl: "https://picsum.photos/seed/tormenta/400/400", theme: "nature" },
  { es: 'nube', en: 'cloud', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una nube en el cielo."], imageUrl: "https://picsum.photos/seed/nube/400/400", theme: "nature" },
  { es: 'estrella', en: 'star', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La estrella es muy grande."], imageUrl: "https://picsum.photos/seed/estrella/400/400", theme: "nature" },
  { es: 'luna', en: 'moon', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La luna está en el cielo."], imageUrl: "https://picsum.photos/seed/luna/400/400", theme: "nature" },
  { es: 'cielo', en: 'sky', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["El cielo es azul."], imageUrl: "https://picsum.photos/seed/cielo/400/400", theme: "nature" },
  { es: 'arcoíris', en: 'rainbow', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Hay un arcoíris en el cielo."], imageUrl: "https://picsum.photos/seed/arcoiris/400/400", theme: "nature" },
  { es: 'perro', en: 'dog', type: 'noun', group: 'Animals', gender: 'm', contextSentence: ["Mi perro es muy grande."], imageUrl: "https://picsum.photos/seed/dog/400/400", theme: "animals" },
  { es: 'gato', en: 'cat', type: 'noun', group: 'Animals', gender: 'm', contextSentence: ["Mi gato es muy pequeño."], imageUrl: "https://picsum.photos/seed/cat/400/400", theme: "animals" },
  { es: 'pájaro', en: 'bird', type: 'noun', group: 'Animals', gender: 'm', contextSentence: ["Hay un pájaro en el parque."], imageUrl: "https://picsum.photos/seed/bird/400/400", theme: "animals" },
  { es: 'caballo', en: 'horse', type: 'noun', group: 'Animals', gender: 'm', contextSentence: ["El caballo es grande y rápido."], imageUrl: "https://picsum.photos/seed/horse/400/400", theme: "animals" },
  { es: 'vaca', en: 'cow', type: 'noun', group: 'Animals', gender: 'f', contextSentence: ["La vaca es grande."], imageUrl: "https://picsum.photos/seed/cow/400/400", theme: "animals" },
  { es: 'pez', en: 'fish (alive)', type: 'noun', group: 'Animals', gender: 'm', contextSentence: ["Hay un pez en el agua."], imageUrl: "https://picsum.photos/seed/fish/400/400", theme: "animals" },
  { es: 'emocionado', en: 'excited', type: 'adj', group: 'Core', contextSentence: ["Estoy emocionado porque tengo un plan."], imageUrl: "https://picsum.photos/seed/emocionado/400/400", theme: "feelings" },
  { es: 'nervioso', en: 'nervous', type: 'adj', group: 'Core', contextSentence: ["El niño está nervioso hoy."], imageUrl: "https://picsum.photos/seed/nervioso/400/400", theme: "feelings" },
  { es: 'sorprendido', en: 'surprised', type: 'adj', group: 'Core', contextSentence: ["Él está sorprendido por la noticia."], imageUrl: "https://picsum.photos/seed/sorprendido/400/400", theme: "feelings" },
  { es: 'aburrido', en: 'bored', type: 'adj', group: 'Core', contextSentence: ["Yo estoy aburrido en casa hoy."], imageUrl: "https://picsum.photos/seed/aburrido/400/400", theme: "feelings" },
  { es: 'tranquilo', en: 'calm', type: 'adj', group: 'Core', contextSentence: ["El bebé está tranquilo."], imageUrl: "https://picsum.photos/seed/tranquilo/400/400", theme: "feelings" },
  { es: 'ocupado', en: 'busy', type: 'adj', group: 'Core', contextSentence: ["Ella está muy ocupada en la oficina."], imageUrl: "https://picsum.photos/seed/ocupado/400/400", theme: "feelings" },

  // ─────────────────────────────────────────────
  // PATH 13 — Verbos y Matices
  // ─────────────────────────────────────────────
  { es: 'salgo', en: 'i leave', type: 'verb', group: 'Core', contextSentence: ["Yo salgo de la casa ahora."], imageUrl: "https://picsum.photos/seed/leave/400/400", theme: "descriptions" },
  { es: 'sales', en: 'you leave', type: 'verb', group: 'Core', contextSentence: ["¿Por qué sales de la fiesta?"], imageUrl: "https://picsum.photos/seed/leave/400/400", theme: "descriptions" },
  { es: 'fiesta', en: 'party', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["Hay una fiesta en mi casa."], imageUrl: "https://picsum.photos/seed/fiesta/400/400", theme: "family" },
  { es: 'cumpleaños', en: 'birthday', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Hoy es mi cumpleaños y estoy feliz."], imageUrl: "https://picsum.photos/seed/cumpleanos/400/400", theme: "family" },
  { es: 'boda', en: 'wedding', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La boda es mañana."], imageUrl: "https://picsum.photos/seed/boda/400/400", theme: "family" },
  { es: 'celebración', en: 'celebration', type: 'noun', group: 'Core', gender: 'f', contextSentence: ["La celebración es muy grande y bonita."], imageUrl: "https://picsum.photos/seed/celebracion/400/400", theme: "family" },
  { es: 'siempre', en: 'always', type: 'adv', group: 'Time', contextSentence: ["Yo siempre hablo español con mi familia."], imageUrl: "https://picsum.photos/seed/always/400/400", theme: "time" },
  { es: 'nunca', en: 'never', type: 'adv', group: 'Time', contextSentence: ["Yo nunca como sopa sin pan."], imageUrl: "https://picsum.photos/seed/never/400/400", theme: "health" },
  { es: 'todavía', en: 'still / yet', type: 'adv', group: 'Time', contextSentence: ["Todavía tengo tu pasaporte aquí."], imageUrl: "https://picsum.photos/seed/still/400/400", theme: "descriptions" },
  // NEW
  { es: 'ya', en: 'already / now', type: 'adv', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/ya/400/400", theme: "time" },
  { es: 'a veces', en: 'sometimes', type: 'adv', group: 'Time', contextSentence: ["A veces como pollo con arroz."], imageUrl: "https://picsum.photos/seed/sometimes/400/400", theme: "time" },
  { es: 'pronto', en: 'soon', type: 'adv', group: 'Time', contextSentence: ["Mañana llego pronto a la escuela."], imageUrl: "https://picsum.photos/seed/soon/400/400", theme: "time" },
  { es: 'leo', en: 'i read', type: 'verb', group: 'Core', contextSentence: ["Yo leo un libro en casa."], imageUrl: "https://picsum.photos/seed/read/400/400", theme: "descriptions" },
  { es: 'lees', en: 'you read', type: 'verb', group: 'Core', contextSentence: ["Tú lees el menú del restaurante."], imageUrl: "https://picsum.photos/seed/read/400/400", theme: "descriptions" },
  { es: 'escribo', en: 'i write', type: 'verb', group: 'Core', contextSentence: ["Yo escribo una carta en español."], imageUrl: "https://picsum.photos/seed/write/400/400", theme: "descriptions" },
  { es: 'escribes', en: 'you write', type: 'verb', group: 'Core', contextSentence: ["Tú escribes una carta en español."], imageUrl: "https://picsum.photos/seed/write/400/400", theme: "descriptions" },
  // NEW
  { es: 'libro', en: 'book', type: 'noun', group: 'Core', gender: 'm', contextSentence: [], imageUrl: "https://picsum.photos/seed/libro/400/400", theme: "descriptions" },
  { es: 'periódico', en: 'newspaper', type: 'noun', group: 'Core', gender: 'm', contextSentence: [], imageUrl: "https://picsum.photos/seed/periodico/400/400", theme: "communication" },
  { es: 'escucha', en: 'he/she listens', type: 'verb', group: 'Core', contextSentence: ["Ella escucha música con su amiga."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "travel" },
  // NEW
  { es: 'escuchan', en: 'they listen', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/escuchan/400/400", theme: "descriptions" },
  { es: 've', en: 'he/she sees / watches', type: 'verb', group: 'Core', contextSentence: ["Ella ve una película en casa."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "descriptions" },
  // NEW
  { es: 'ven', en: 'they see / watch', type: 'verb', group: 'Core', contextSentence: [], imageUrl: "https://picsum.photos/seed/ven/400/400", theme: "descriptions" },
  { es: 'sonido', en: 'sound', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Escucho un sonido de música aquí."], imageUrl: "https://picsum.photos/seed/sonido/400/400", theme: "communication" },
  { es: 'silencio', en: 'silence', type: 'noun', group: 'Core', gender: 'm', contextSentence: ["Me gusta el silencio de la noche."], imageUrl: "https://picsum.photos/seed/silencio/400/400", theme: "communication" },
  { es: 'caminar', en: 'to walk', type: 'verb', group: 'Core', contextSentence: ["Me gusta caminar en el parque."], imageUrl: "https://picsum.photos/seed/walk/400/400", theme: "nature" },
  { es: 'correr', en: 'to run', type: 'verb', group: 'Core', contextSentence: ["Me gusta correr en el parque."], imageUrl: "https://picsum.photos/seed/correr/400/400", theme: "descriptions" },
  { es: 'nadar', en: 'to swim', type: 'verb', group: 'Core', contextSentence: ["Me gusta nadar en la playa."], imageUrl: "https://picsum.photos/seed/nadar/400/400", theme: "descriptions" },
  { es: 'bailar', en: 'to dance', type: 'verb', group: 'Core', contextSentence: ["Me gusta bailar con mi amiga."], imageUrl: "https://picsum.photos/seed/bailar/400/400", theme: "descriptions" },
  { es: 'cantar', en: 'to sing', type: 'verb', group: 'Core', contextSentence: ["Me gusta cantar y bailar."], imageUrl: "https://picsum.photos/seed/cantar/400/400", theme: "descriptions" },
  { es: 'jugar', en: 'to play', type: 'verb', group: 'Core', contextSentence: ["Los niños quieren jugar en el parque."], imageUrl: "https://picsum.photos/seed/jugar/400/400", theme: "descriptions" },

  // ─────────────────────────────────────────────
  // TAP-TO-DEFINE ONLY
  // These are never drill targets — exposure via sentence context only
  // tapToDefine: true marks them for the tap-to-define feature
  // ─────────────────────────────────────────────
  { es: 'el', en: 'the (m)', type: 'article', group: 'Core', tapToDefine: true, contextSentence: ["El hotel es muy grande."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fel.jpg?alt=media", theme: "descriptions" },
  { es: 'la', en: 'the (f)', type: 'article', group: 'Core', tapToDefine: true, contextSentence: ["La casa es muy grande."], imageUrl: "https://firebasestorage.googleapis.com/v0/b/my-spanish-hub.firebasestorage.app/o/images%2Fwords%2Fla.jpg?alt=media", theme: "descriptions" },
  { es: 'un', en: 'a (m)', type: 'article', group: 'Core', tapToDefine: true, contextSentence: ["Hay un hotel grande aquí."], imageUrl: "https://picsum.photos/seed/a/400/400", theme: "travel" },
  { es: 'una', en: 'a (f)', type: 'article', group: 'Core', tapToDefine: true, contextSentence: ["Hay una casa grande aquí."], imageUrl: "https://picsum.photos/seed/a/400/400", theme: "travel" },
  { es: 'yo', en: 'i', type: 'pronoun', group: 'Core', tapToDefine: true, contextSentence: ["Yo soy español y estoy bien."], imageUrl: "https://picsum.photos/seed/i/400/400", theme: "descriptions" },
  { es: 'tú', en: 'you', type: 'pronoun', group: 'Core', tapToDefine: true, contextSentence: ["Tú eres muy bueno."], imageUrl: "https://picsum.photos/seed/you/400/400", theme: "descriptions" },
  { es: 'él', en: 'he', type: 'pronoun', group: 'Core', tapToDefine: true, contextSentence: ["Él es un hombre muy bueno."], imageUrl: "https://picsum.photos/seed/he/400/400", theme: "descriptions" },
  { es: 'ella', en: 'she', type: 'pronoun', group: 'Core', tapToDefine: true, contextSentence: ["Ella es mi amiga."], imageUrl: "https://picsum.photos/seed/she/400/400", theme: "descriptions" },
  { es: 'me', en: 'me / myself', type: 'pronoun', group: 'Core', tapToDefine: true, contextSentence: ["Él me habla en español."], imageUrl: "https://picsum.photos/seed/me/400/400", theme: "greetings" },
  { es: 'se', en: 'himself / herself', type: 'pronoun', group: 'Core', tapToDefine: true, contextSentence: ["Él se llama Juan."], imageUrl: "https://picsum.photos/seed/himself/400/400", theme: "greetings" },
  { es: 'y', en: 'and', type: 'conj', group: 'Core', tapToDefine: true, contextSentence: ["Yo soy canadiense y tú eres colombiano."], imageUrl: "https://picsum.photos/seed/and/400/400", theme: "restaurant" },
  { es: 'o', en: 'or', type: 'conj', group: 'Core', tapToDefine: true, contextSentence: ["¿Es un hotel o un restaurante?"], imageUrl: "https://picsum.photos/seed/or/400/400", theme: "restaurant" },
  { es: 'pero', en: 'but', type: 'conj', group: 'Core', tapToDefine: true, contextSentence: ["El restaurante es grande pero malo."], imageUrl: "https://picsum.photos/seed/but/400/400", theme: "descriptions" },
  { es: 'porque', en: 'because', type: 'conj', group: 'Core', tapToDefine: true, contextSentence: ["Estoy aquí porque hay un hotel."], imageUrl: "https://picsum.photos/seed/because/400/400", theme: "descriptions" },
  { es: 'con', en: 'with', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["Yo estoy con mi amiga en el parque."], imageUrl: "https://picsum.photos/seed/with/400/400", theme: "restaurant" },
  { es: 'en', en: 'in / at / on', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["El hotel está en la ciudad."], imageUrl: "https://picsum.photos/seed/in/400/400", theme: "travel" },
  { es: 'de', en: 'of / from', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["Ella es de México."], imageUrl: "https://picsum.photos/seed/de/400/400", theme: "descriptions" },
  { es: 'a', en: 'to / at', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["Voy a la tienda."], imageUrl: "https://picsum.photos/seed/a/400/400", theme: "descriptions" },
  { es: 'por', en: 'for / by / through', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["Gracias por favor, eres muy bueno."], imageUrl: "https://picsum.photos/seed/por/400/400", theme: "descriptions" },
  { es: 'para', en: 'for / in order to', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["El restaurante es para la familia."], imageUrl: "https://picsum.photos/seed/para/400/400", theme: "descriptions" },
  { es: 'sin', en: 'without', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["Café sin leche."], imageUrl: "https://picsum.photos/seed/sin/400/400", theme: "descriptions" },
  { es: 'sobre', en: 'about / on top of', type: 'prep', group: 'Core', tapToDefine: true, contextSentence: ["El café está sobre la mesa."], imageUrl: "https://picsum.photos/seed/sobre/400/400", theme: "descriptions" },
  { es: 'si', en: 'if', type: 'conj', group: 'Core', tapToDefine: true, contextSentence: ["Si tienes problema, yo puedo ayudar."], imageUrl: "https://picsum.photos/seed/if/400/400", theme: "nature" },

];

// VERB_TABLE and NOUN_GROUPS preserved unchanged from original
export const VERB_TABLE = [
  { inf: 'hablar', en: 'to speak', conj: [{ subj: 'Yo', es: 'hablo', en: 'I speak' }, { subj: 'Tú', es: 'hablas', en: 'You speak' }, { subj: 'Él/Ella', es: 'habla', en: 'He/She speaks' }, { subj: 'Nosotros', es: 'hablamos', en: 'We speak' }, { subj: 'Ustedes/Ellos', es: 'hablan', en: 'You all/They speak' }] },
  { inf: 'beber', en: 'to drink', conj: [{ subj: 'Yo', es: 'bebo', en: 'I drink' }, { subj: 'Tú', es: 'bebes', en: 'You drink' }, { subj: 'Él/Ella', es: 'bebe', en: 'He/She drinks' }, { subj: 'Nosotros', es: 'bebemos', en: 'We drink' }, { subj: 'Ustedes/Ellos', es: 'beben', en: 'You all/They drink' }] },
  { inf: 'comer', en: 'to eat', conj: [{ subj: 'Yo', es: 'como', en: 'I eat' }, { subj: 'Tú', es: 'comes', en: 'You eat' }, { subj: 'Él/Ella', es: 'come', en: 'He/She eats' }, { subj: 'Nosotros', es: 'comemos', en: 'We eat' }, { subj: 'Ustedes/Ellos', es: 'comen', en: 'You all/They eat' }] },
  { inf: 'ser', en: 'to be (permanent)', conj: [{ subj: 'Yo', es: 'soy', en: 'I am' }, { subj: 'Tú', es: 'eres', en: 'You are' }, { subj: 'Él/Ella', es: 'es', en: 'He/She/It is' }, { subj: 'Nosotros', es: 'somos', en: 'We are' }, { subj: 'Ustedes/Ellos', es: 'son', en: 'You all/They are' }] },
  { inf: 'estar', en: 'to be (location)', conj: [{ subj: 'Yo', es: 'estoy', en: 'I am' }, { subj: 'Tú', es: 'estás', en: 'You are' }, { subj: 'Él/Ella', es: 'está', en: 'He/She/It is' }, { subj: 'Nosotros', es: 'estamos', en: 'We are' }, { subj: 'Ustedes/Ellos', es: 'están', en: 'You all/They are' }] },
  { inf: 'tener', en: 'to have', conj: [{ subj: 'Yo', es: 'tengo', en: 'I have' }, { subj: 'Tú', es: 'tienes', en: 'You have' }, { subj: 'Él/Ella', es: 'tiene', en: 'He/She has' }, { subj: 'Nosotros', es: 'tenemos', en: 'We have' }, { subj: 'Ustedes/Ellos', es: 'tienen', en: 'You all/They have' }] },
  { inf: 'ir', en: 'to go', conj: [{ subj: 'Yo', es: 'voy', en: 'I go' }, { subj: 'Tú', es: 'vas', en: 'You go' }, { subj: 'Él/Ella', es: 'va', en: 'He/She goes' }, { subj: 'Nosotros', es: 'vamos', en: 'We go' }, { subj: 'Ustedes/Ellos', es: 'van', en: 'You all/They go' }] },
  { inf: 'querer', en: 'to want', conj: [{ subj: 'Yo', es: 'quiero', en: 'I want' }, { subj: 'Tú', es: 'quieres', en: 'You want' }, { subj: 'Él/Ella', es: 'quiere', en: 'He/She wants' }, { subj: 'Nosotros', es: 'queremos', en: 'We want' }, { subj: 'Ustedes/Ellos', es: 'quieren', en: 'You all/They want' }] },
  { inf: 'poder', en: 'can / to be able', conj: [{ subj: 'Yo', es: 'puedo', en: 'I can' }, { subj: 'Tú', es: 'puedes', en: 'You can' }, { subj: 'Él/Ella', es: 'puede', en: 'He/She can' }, { subj: 'Nosotros', es: 'podemos', en: 'We can' }, { subj: 'Ustedes/Ellos', es: 'pueden', en: 'You all/They can' }] },
  { inf: 'saber', en: 'to know (a fact)', conj: [{ subj: 'Yo', es: 'sé', en: 'I know' }, { subj: 'Tú', es: 'sabes', en: 'You know' }, { subj: 'Él/Ella', es: 'sabe', en: 'He/She knows' }, { subj: 'Nosotros', es: 'sabemos', en: 'We know' }, { subj: 'Ustedes/Ellos', es: 'saben', en: 'You all/They know' }] },
  { inf: 'decir', en: 'to say', conj: [{ subj: 'Yo', es: 'digo', en: 'I say' }, { subj: 'Tú', es: 'dices', en: 'You say' }, { subj: 'Él/Ella', es: 'dice', en: 'He/She says' }, { subj: 'Nosotros', es: 'decimos', en: 'We say' }, { subj: 'Ustedes/Ellos', es: 'dicen', en: 'You all/They say' }] },
  { inf: 'dormir', en: 'to sleep', conj: [{ subj: 'Yo', es: 'duermo', en: 'I sleep' }, { subj: 'Tú', es: 'duermes', en: 'You sleep' }, { subj: 'Él/Ella', es: 'duerme', en: 'He/She sleeps' }, { subj: 'Nosotros', es: 'dormimos', en: 'We sleep' }, { subj: 'Ustedes/Ellos', es: 'duermen', en: 'You all/They sleep' }] },
  { inf: 'venir', en: 'to come', conj: [{ subj: 'Yo', es: 'vengo', en: 'I come' }, { subj: 'Tú', es: 'vienes', en: 'You come' }, { subj: 'Él/Ella', es: 'viene', en: 'He/She comes' }, { subj: 'Nosotros', es: 'venimos', en: 'We come' }, { subj: 'Ustedes/Ellos', es: 'vienen', en: 'You all/They come' }] },
  { inf: 'vivir', en: 'to live', conj: [{ subj: 'Yo', es: 'vivo', en: 'I live' }, { subj: 'Tú', es: 'vives', en: 'You live' }, { subj: 'Él/Ella', es: 'vive', en: 'He/She lives' }, { subj: 'Nosotros', es: 'vivimos', en: 'We live' }, { subj: 'Ustedes/Ellos', es: 'viven', en: 'You all/They live' }] },
  { inf: 'llegar', en: 'to arrive', conj: [{ subj: 'Yo', es: 'llego', en: 'I arrive' }, { subj: 'Tú', es: 'llegas', en: 'You arrive' }, { subj: 'Él/Ella', es: 'llega', en: 'He/She arrives' }, { subj: 'Nosotros', es: 'llegamos', en: 'We arrive' }, { subj: 'Ustedes/Ellos', es: 'llegan', en: 'You all/They arrive' }] },
  { inf: 'escuchar', en: 'to listen', conj: [{ subj: 'Yo', es: 'escucho', en: 'I listen' }, { subj: 'Tú', es: 'escuchas', en: 'You listen' }, { subj: 'Él/Ella', es: 'escucha', en: 'He/She listens' }, { subj: 'Nosotros', es: 'escuchamos', en: 'We listen' }, { subj: 'Ustedes/Ellos', es: 'escuchan', en: 'You all/They listen' }] },
  { inf: 'ver', en: 'to see / watch', conj: [{ subj: 'Yo', es: 'veo', en: 'I see/watch' }, { subj: 'Tú', es: 'ves', en: 'You see/watch' }, { subj: 'Él/Ella', es: 've', en: 'He/She sees/watches' }, { subj: 'Nosotros', es: 'vemos', en: 'We see/watch' }, { subj: 'Ustedes/Ellos', es: 'ven', en: 'You all/They see/watch' }] },
  { inf: 'salir', en: 'to leave / go out', conj: [{ subj: 'Yo', es: 'salgo', en: 'I leave' }, { subj: 'Tú', es: 'sales', en: 'You leave' }, { subj: 'Él/Ella', es: 'sale', en: 'He/She leaves' }, { subj: 'Nosotros', es: 'salimos', en: 'We leave' }, { subj: 'Ustedes/Ellos', es: 'salen', en: 'You all/They leave' }] },
  { inf: 'leer', en: 'to read', conj: [{ subj: 'Yo', es: 'leo', en: 'I read' }, { subj: 'Tú', es: 'lees', en: 'You read' }, { subj: 'Él/Ella', es: 'lee', en: 'He/She reads' }, { subj: 'Nosotros', es: 'leemos', en: 'We read' }, { subj: 'Ustedes/Ellos', es: 'leen', en: 'You all/They read' }] },
  { inf: 'escribir', en: 'to write', conj: [{ subj: 'Yo', es: 'escribo', en: 'I write' }, { subj: 'Tú', es: 'escribes', en: 'You write' }, { subj: 'Él/Ella', es: 'escribe', en: 'He/She writes' }, { subj: 'Nosotros', es: 'escribimos', en: 'We write' }, { subj: 'Ustedes/Ellos', es: 'escriben', en: 'You all/They write' }] },
  { inf: 'comprar', en: 'to buy', conj: [{ subj: 'Yo', es: 'compro', en: 'I buy' }, { subj: 'Tú', es: 'compras', en: 'You buy' }, { subj: 'Él/Ella', es: 'compra', en: 'He/She buys' }, { subj: 'Nosotros', es: 'compramos', en: 'We buy' }, { subj: 'Ustedes/Ellos', es: 'compran', en: 'You all/They buy' }] },
  { inf: 'trabajar', en: 'to work', conj: [{ subj: 'Yo', es: 'trabajo', en: 'I work' }, { subj: 'Tú', es: 'trabajas', en: 'You work' }, { subj: 'Él/Ella', es: 'trabaja', en: 'He/She works' }, { subj: 'Nosotros', es: 'trabajamos', en: 'We work' }, { subj: 'Ustedes/Ellos', es: 'trabajan', en: 'You all/They work' }] },
  { inf: 'caminar', en: 'to walk', conj: [{ subj: 'Yo', es: 'camino', en: 'I walk' }, { subj: 'Tú', es: 'caminas', en: 'You walk' }, { subj: 'Él/Ella', es: 'camina', en: 'He/She walks' }, { subj: 'Nosotros', es: 'caminamos', en: 'We walk' }, { subj: 'Ustedes/Ellos', es: 'caminan', en: 'You all/They walk' }] },
];
