// paths.js — Milo Speaks Spanish
// 13 Paths, 87 Stops, 522 words
// Research basis: CORPES XXI frequency ranking + CEFR A1/A2 word lists
// Verb sequencing: infinitive+yo+tú Stop → él/ella+nosotros+ustedes/ellos Stop
// Tier 1 (Paths 1-4): Beginner I — 6 Stops each
// Tier 2 (Paths 5-8): Beginner II — 7 Stops each
// Tier 3 (Paths 9-13): Advanced Beginner — 7 Stops each
// videoUrl: null on all Stops — feature flag. Add YouTube URL when video ready.
// All es values match exactly with MASTER array in words.js

export const PATHS = [

  // ─────────────────────────────────────────────
  // PATH 1 — El Primer Encuentro
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
        words: ['mucho gusto', 'encantado', 'hasta luego', 'hasta mañana', 'salud', 'suerte'],
      },
      {
        id: 'p1s4',
        title: 'Sí y No',
        titleEn: 'Yes and No',
        videoUrl: null,
        words: ['sí', 'no', 'el', 'la', 'un', 'una'],
      },
      {
        id: 'p1s5',
        title: 'Yo y Tú',
        titleEn: 'I and You',
        videoUrl: null,
        words: ['yo', 'tú', 'mi', 'tu', 'hay', 'dónde'],
      },
      {
        id: 'p1s6',
        title: 'Él y Ella',
        titleEn: 'He and She',
        videoUrl: null,
        words: ['él', 'ella', 'me', 'se', 'su', 'aquí'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 2 — Ser
  // Sub-level: Beginner I
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
        title: 'Ser',
        titleEn: 'To Be',
        videoUrl: null,
        words: ['ser', 'soy', 'eres', 'español', 'inglés', 'americano'],
      },
      {
        id: 'p2s3',
        title: 'Es, Somos, Son',
        titleEn: 'He/She Is, We Are, They Are',
        videoUrl: null,
        words: ['es', 'somos', 'son', 'canadiense', 'mexicano', 'colombiano'],
      },
      {
        id: 'p2s4',
        title: '¿Quién? y ¿Cómo?',
        titleEn: 'Who? and How?',
        videoUrl: null,
        words: ['quién', 'cómo', 'muy', 'bien', 'mal', 'también'],
      },
      {
        id: 'p2s5',
        title: 'Y, O, Pero',
        titleEn: 'And, Or, But',
        videoUrl: null,
        words: ['y', 'o', 'pero', 'porque', 'con', 'en'],
      },
      {
        id: 'p2s6',
        title: 'Más Personas',
        titleEn: 'More People',
        videoUrl: null,
        words: ['amigo', 'amiga', 'adulto', 'bebé', 'familia', 'gente'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 3 — Estar
  // Sub-level: Beginner I
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
        title: 'Estar',
        titleEn: 'To Be (Location)',
        videoUrl: null,
        words: ['estar', 'estoy', 'estás', 'grande', 'pequeño', 'bueno'],
      },
      {
        id: 'p3s3',
        title: 'Está, Estamos, Están',
        titleEn: 'He/She Is, We Are, They Are (Location)',
        videoUrl: null,
        words: ['está', 'estamos', 'están', 'malo', 'nuevo', 'viejo'],
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
        title: 'Preposiciones',
        titleEn: 'Prepositions',
        videoUrl: null,
        words: ['de', 'a', 'por', 'para', 'sin', 'sobre'],
      },
      {
        id: 'p3s6',
        title: '¿Cómo Es?',
        titleEn: 'What Is It Like?',
        videoUrl: null,
        words: ['fácil', 'difícil', 'rápido', 'lento', 'caro', 'barato'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 4 — Tener y Necesitar
  // Sub-level: Beginner I
  // ─────────────────────────────────────────────
  {
    id: 'path4',
    title: 'Tener y Necesitar',
    titleEn: 'To Have and To Need',
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
        title: 'Tener',
        titleEn: 'To Have',
        videoUrl: null,
        words: ['tener', 'tengo', 'tienes', 'problema', 'idea', 'plan'],
      },
      {
        id: 'p4s3',
        title: 'Tiene, Tenemos, Tienen',
        titleEn: 'He/She Has, We Have, They Have',
        videoUrl: null,
        words: ['tiene', 'tenemos', 'tienen', 'carta', 'llave', 'cuenta'],
      },
      {
        id: 'p4s4',
        title: 'Necesitar',
        titleEn: 'To Need',
        videoUrl: null,
        words: ['necesitar', 'necesito', 'necesitas', 'cita', 'documento', 'firma'],
      },
      {
        id: 'p4s5',
        title: 'Necesita, Necesitamos, Necesitan',
        titleEn: 'He/She Needs, We Need, They Need',
        videoUrl: null,
        words: ['necesita', 'necesitamos', 'necesitan', 'oficina', 'formulario', 'copia'],
      },
      {
        id: 'p4s6',
        title: 'El Tiempo',
        titleEn: 'Time',
        videoUrl: null,
        words: ['tiempo', 'semana', 'mes', 'año', 'hora', 'minuto'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 5 — Querer y Poder
  // Sub-level: Beginner II
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
        words: ['agua', 'leche', 'café', 'pan', 'fruta', 'comida'],
      },
      {
        id: 'p5s2',
        title: 'Querer',
        titleEn: 'To Want',
        videoUrl: null,
        words: ['querer', 'quiero', 'quieres', 'jugo', 'té', 'arroz'],
      },
      {
        id: 'p5s3',
        title: 'Quiere, Queremos, Quieren',
        titleEn: 'He/She Wants, We Want, They Want',
        videoUrl: null,
        words: ['quiere', 'queremos', 'quieren', 'sopa', 'ensalada', 'postre'],
      },
      {
        id: 'p5s4',
        title: 'Poder',
        titleEn: 'To Be Able',
        videoUrl: null,
        words: ['poder', 'puedo', 'puedes', 'menú', 'mesa', 'orden'],
      },
      {
        id: 'p5s5',
        title: 'Puede, Podemos, Pueden',
        titleEn: 'He/She Can, We Can, They Can',
        videoUrl: null,
        words: ['puede', 'podemos', 'pueden', 'propina', 'rico', 'delicioso'],
      },
      {
        id: 'p5s6',
        title: 'En el Restaurante',
        titleEn: 'At the Restaurant',
        videoUrl: null,
        words: ['camarero', 'cocina', 'plato', 'vaso', 'servilleta', 'cuchara'],
      },
      {
        id: 'p5s7',
        title: 'Más Comida',
        titleEn: 'More Food',
        videoUrl: null,
        words: ['pollo', 'carne', 'pescado', 'verdura', 'manzana', 'huevo'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 6 — Hacer e Ir
  // Sub-level: Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path6',
    title: 'Hacer e Ir',
    titleEn: 'To Do and To Go',
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
        title: 'Hacer',
        titleEn: 'To Do',
        videoUrl: null,
        words: ['hacer', 'hago', 'haces', 'equipaje', 'mapa', 'dirección'],
      },
      {
        id: 'p6s3',
        title: 'Hace, Hacemos, Hacen',
        titleEn: 'He/She Does, We Do, They Do',
        videoUrl: null,
        words: ['hace', 'hacemos', 'hacen', 'sol', 'lluvia', 'nieve'],
      },
      {
        id: 'p6s4',
        title: 'Ir',
        titleEn: 'To Go',
        videoUrl: null,
        words: ['ir', 'voy', 'vas', 'viento', 'calor', 'frío'],
      },
      {
        id: 'p6s5',
        title: 'Va, Vamos, Van',
        titleEn: 'He/She Goes, We Go, They Go',
        videoUrl: null,
        words: ['va', 'vamos', 'van', 'llegar', 'llego', 'llegas'],
      },
      {
        id: 'p6s6',
        title: 'Llega, Llegamos, Llegan',
        titleEn: 'He/She Arrives, We Arrive, They Arrive',
        videoUrl: null,
        words: ['llega', 'llegamos', 'llegan', 'llevar', 'llevo', 'llevas'],
      },
      {
        id: 'p6s7',
        title: 'Lleva, Llevamos, Llevan',
        titleEn: 'He/She Carries, We Carry, They Carry',
        videoUrl: null,
        words: ['lleva', 'llevamos', 'llevan', 'ahora', 'después', 'antes'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 7 — Hablar, Ver y Saber
  // Sub-level: Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path7',
    title: 'Hablar, Ver y Saber',
    titleEn: 'To Speak, To See, To Know',
    subLevel: 'Beginner II',
    videoUrl: null,
    stops: [
      {
        id: 'p7s1',
        title: 'Comunicación',
        titleEn: 'Communication',
        videoUrl: null,
        words: ['mensaje', 'llamada', 'correo', 'noticia', 'conversación', 'pregunta'],
      },
      {
        id: 'p7s2',
        title: 'Hablar',
        titleEn: 'To Speak',
        videoUrl: null,
        words: ['hablar', 'hablo', 'hablas', 'idioma', 'palabra', 'frase'],
      },
      {
        id: 'p7s3',
        title: 'Habla, Hablamos, Hablan',
        titleEn: 'He/She Speaks, We Speak, They Speak',
        videoUrl: null,
        words: ['habla', 'hablamos', 'hablan', 'respuesta', 'acento', 'significado'],
      },
      {
        id: 'p7s4',
        title: 'Ver',
        titleEn: 'To See',
        videoUrl: null,
        words: ['ver', 'veo', 'ves', 'televisión', 'película', 'noticias'],
      },
      {
        id: 'p7s5',
        title: 'Ve, Vemos, Ven',
        titleEn: 'He/She Sees, We See, They See',
        videoUrl: null,
        words: ['ve', 'vemos', 'ven', 'foto', 'imagen', 'video'],
      },
      {
        id: 'p7s6',
        title: 'Saber',
        titleEn: 'To Know',
        videoUrl: null,
        words: ['saber', 'sé', 'sabes', 'verdad', 'secreto', 'razón'],
      },
      {
        id: 'p7s7',
        title: 'Sabe, Sabemos, Saben',
        titleEn: 'He/She Knows, We Know, They Know',
        videoUrl: null,
        words: ['sabe', 'sabemos', 'saben', 'información', 'detalle', 'resultado'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 8 — Decir, Dar y Familia
  // Sub-level: Beginner II
  // ─────────────────────────────────────────────
  {
    id: 'path8',
    title: 'Decir, Dar y Familia',
    titleEn: 'To Say, To Give, and Family',
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
        title: 'Decir',
        titleEn: 'To Say',
        videoUrl: null,
        words: ['decir', 'digo', 'dices', 'abuelo', 'abuela', 'esposo'],
      },
      {
        id: 'p8s3',
        title: 'Dice, Decimos, Dicen',
        titleEn: 'He/She Says, We Say, They Say',
        videoUrl: null,
        words: ['dice', 'decimos', 'dicen', 'esposa', 'primo', 'prima'],
      },
      {
        id: 'p8s4',
        title: 'Dar',
        titleEn: 'To Give',
        videoUrl: null,
        words: ['dar', 'doy', 'das', 'tío', 'tía', 'sobrino'],
      },
      {
        id: 'p8s5',
        title: 'Da, Damos, Dan',
        titleEn: 'He/She Gives, We Give, They Give',
        videoUrl: null,
        words: ['da', 'damos', 'dan', 'sobrina', 'nieto', 'nieta'],
      },
      {
        id: 'p8s6',
        title: 'Palabras de Tiempo',
        titleEn: 'Time Words',
        videoUrl: null,
        words: ['hoy', 'mañana', 'ayer', 'siempre', 'nunca', 'todavía'],
      },
      {
        id: 'p8s7',
        title: 'Más Personas',
        titleEn: 'More People',
        videoUrl: null,
        words: ['novio', 'novia', 'pareja', 'vecino', 'vecina', 'compañero'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 9 — Comer y Beber
  // Sub-level: Advanced Beginner
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
        words: ['queso', 'tomate', 'cebolla', 'papa', 'lechuga', 'zanahoria'],
      },
      {
        id: 'p9s2',
        title: 'Comer',
        titleEn: 'To Eat',
        videoUrl: null,
        words: ['comer', 'como', 'comes', 'desayuno', 'almuerzo', 'cena'],
      },
      {
        id: 'p9s3',
        title: 'Come, Comemos, Comen',
        titleEn: 'He/She Eats, We Eat, They Eat',
        videoUrl: null,
        words: ['come', 'comemos', 'comen', 'merienda', 'bocadillo', 'galleta'],
      },
      {
        id: 'p9s4',
        title: 'Beber',
        titleEn: 'To Drink',
        videoUrl: null,
        words: ['beber', 'bebo', 'bebes', 'refresco', 'vino', 'cerveza'],
      },
      {
        id: 'p9s5',
        title: 'Bebe, Bebemos, Beben',
        titleEn: 'He/She Drinks, We Drink, They Drink',
        videoUrl: null,
        words: ['bebe', 'bebemos', 'beben', 'botella', 'taza', 'copa'],
      },
      {
        id: 'p9s6',
        title: 'Números 1-6',
        titleEn: 'Numbers 1-6',
        videoUrl: null,
        words: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'],
      },
      {
        id: 'p9s7',
        title: 'Números 7-20',
        titleEn: 'Numbers 7-20',
        videoUrl: null,
        words: ['siete', 'ocho', 'nueve', 'diez', 'veinte', 'cuánto'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 10 — Comprar, Vivir y Trabajar
  // Sub-level: Advanced Beginner
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
        title: 'Comprar',
        titleEn: 'To Buy',
        videoUrl: null,
        words: ['comprar', 'compro', 'compras', 'descuento', 'oferta', 'marca'],
      },
      {
        id: 'p10s3',
        title: 'Compra, Compramos, Compran',
        titleEn: 'He/She Buys, We Buy, They Buy',
        videoUrl: null,
        words: ['compra', 'compramos', 'compran', 'regalo', 'caja', 'bolsa'],
      },
      {
        id: 'p10s4',
        title: 'Vivir',
        titleEn: 'To Live',
        videoUrl: null,
        words: ['vivir', 'vivo', 'vives', 'apartamento', 'vecindario', 'barrio'],
      },
      {
        id: 'p10s5',
        title: 'Vive, Vivimos, Viven',
        titleEn: 'He/She Lives, We Live, They Live',
        videoUrl: null,
        words: ['vive', 'vivimos', 'viven', 'edificio', 'piso', 'alquiler'],
      },
      {
        id: 'p10s6',
        title: 'Trabajar',
        titleEn: 'To Work',
        videoUrl: null,
        words: ['trabajar', 'trabajo', 'trabajas', 'jefe', 'empleado', 'empresa'],
      },
      {
        id: 'p10s7',
        title: 'Trabaja, Trabajamos, Trabajan',
        titleEn: 'He/She Works, We Work, They Work',
        videoUrl: null,
        words: ['trabaja', 'trabajamos', 'trabajan', 'horario', 'sueldo', 'descanso'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 11 — El Cuerpo y Cómo Te Sientes
  // Sub-level: Advanced Beginner
  // ─────────────────────────────────────────────
  {
    id: 'path11',
    title: 'El Cuerpo y Cómo Te Sientes',
    titleEn: 'The Body and How You Feel',
    subLevel: 'Advanced Beginner',
    videoUrl: null,
    stops: [
      {
        id: 'p11s1',
        title: 'El Cuerpo',
        titleEn: 'The Body',
        videoUrl: null,
        words: ['cabeza', 'ojo', 'nariz', 'boca', 'oreja', 'mano'],
      },
      {
        id: 'p11s2',
        title: 'Más Cuerpo',
        titleEn: 'More Body',
        videoUrl: null,
        words: ['brazo', 'pierna', 'pie', 'dedo', 'espalda', 'corazón'],
      },
      {
        id: 'p11s3',
        title: 'Dormir',
        titleEn: 'To Sleep',
        videoUrl: null,
        words: ['dormir', 'duermo', 'duermes', 'cansado', 'sueño', 'almohada'],
      },
      {
        id: 'p11s4',
        title: 'Duerme, Dormimos, Duermen',
        titleEn: 'He/She Sleeps, We Sleep, They Sleep',
        videoUrl: null,
        words: ['duerme', 'dormimos', 'duermen', 'cama', 'manta', 'noche'],
      },
      {
        id: 'p11s5',
        title: 'Venir',
        titleEn: 'To Come',
        videoUrl: null,
        words: ['venir', 'vengo', 'vienes', 'enfermo', 'feliz', 'triste'],
      },
      {
        id: 'p11s6',
        title: 'Viene, Venimos, Vienen',
        titleEn: 'He/She Comes, We Come, They Come',
        videoUrl: null,
        words: ['viene', 'venimos', 'vienen', 'mejor', 'peor', 'normal'],
      },
      {
        id: 'p11s7',
        title: 'La Salud',
        titleEn: 'Health',
        videoUrl: null,
        words: ['médico', 'medicina', 'dolor', 'fiebre', 'alergia', 'emergencia'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 12 — El Mundo
  // Sub-level: Advanced Beginner
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
        title: 'Más Clima',
        titleEn: 'More Weather',
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
        title: 'Cantidades',
        titleEn: 'Quantities',
        videoUrl: null,
        words: ['cien', 'precio', 'kilo', 'litro', 'poco', 'mucho'],
      },
      {
        id: 'p12s6',
        title: 'La Ciudad',
        titleEn: 'The City',
        videoUrl: null,
        words: ['calle', 'avenida', 'esquina', 'semáforo', 'acera', 'plaza'],
      },
      {
        id: 'p12s7',
        title: 'Sentimientos',
        titleEn: 'Feelings',
        videoUrl: null,
        words: ['emocionado', 'nervioso', 'sorprendido', 'aburrido', 'ocupado', 'tranquilo'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PATH 13 — Verbos Finales
  // Sub-level: Advanced Beginner
  // ─────────────────────────────────────────────
  {
    id: 'path13',
    title: 'Verbos Finales',
    titleEn: 'Final Verbs',
    subLevel: 'Advanced Beginner',
    videoUrl: null,
    stops: [
      {
        id: 'p13s1',
        title: 'Salir',
        titleEn: 'To Leave',
        videoUrl: null,
        words: ['salir', 'salgo', 'sales', 'fiesta', 'invitación', 'evento'],
      },
      {
        id: 'p13s2',
        title: 'Sale, Salimos, Salen',
        titleEn: 'He/She Leaves, We Leave, They Leave',
        videoUrl: null,
        words: ['sale', 'salimos', 'salen', 'celebración', 'cumpleaños', 'boda'],
      },
      {
        id: 'p13s3',
        title: 'Escuchar',
        titleEn: 'To Listen',
        videoUrl: null,
        words: ['escuchar', 'escucho', 'escuchas', 'música', 'canción', 'radio'],
      },
      {
        id: 'p13s4',
        title: 'Escucha, Escuchamos, Escuchan',
        titleEn: 'He/She Listens, We Listen, They Listen',
        videoUrl: null,
        words: ['escucha', 'escuchamos', 'escuchan', 'sonido', 'ruido', 'silencio'],
      },
      {
        id: 'p13s5',
        title: 'Leer y Escribir',
        titleEn: 'To Read and To Write',
        videoUrl: null,
        words: ['leer', 'leo', 'lees', 'escribir', 'escribo', 'escribes'],
      },
      {
        id: 'p13s6',
        title: 'Lee, Leemos, Leen + Escribe, Escribimos, Escriben',
        titleEn: 'He/She Reads, We Read, They Read + Writes, Write, Write',
        videoUrl: null,
        words: ['lee', 'leemos', 'leen', 'escribe', 'escribimos', 'escriben'],
      },
      {
        id: 'p13s7',
        title: 'Más Verbos',
        titleEn: 'More Verbs',
        videoUrl: null,
        words: ['caminar', 'correr', 'nadar', 'bailar', 'cantar', 'jugar'],
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
