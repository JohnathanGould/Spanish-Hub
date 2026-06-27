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
    lessonText: `You're about to have your first conversation in Spanish. Before anything else — greetings. Every interaction in the Spanish-speaking world begins and ends the same way: a greeting, a farewell, and the small courtesies in between. These aren't just polite formalities — they're the social glue that opens doors, builds trust, and signals respect. Miss them and you'll seem cold. Nail them and you'll immediately feel like someone worth talking to. This Path gives you the phrases every Spanish speaker uses within the first thirty seconds of meeting someone. Master these and you can open and close any conversation with confidence. Hola, ¿cómo estás? — four words that will take you further than you think.`,
    furtherStudy: `Spanish has two ways to ask "how are you" — ¿cómo estás? (informal, one person you know) and ¿cómo está usted? (formal, someone older or a stranger). In most of Latin America, ¿cómo estás? works in almost every casual situation. In Spain, you'll also hear ¿qué tal? as a quick, friendly alternative. Greetings in Spanish are time-sensitive — buenos días is morning, buenas tardes is afternoon, and buenas noches covers both evening and night. Switching at the wrong time isn't a serious mistake, but getting it right marks you immediately as someone paying attention. One shortcut native speakers use: drop the full phrase and just say ¡buenas! at any time of day — universally understood and completely natural.`,
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
    lessonText: `Spanish has two verbs that both mean "to be" — and this Path is about the first one: ser. Think of ser as the verb for permanent identity — who you are, what you are, where you're from. "I am a teacher." "She is Spanish." "They are friends." These are facts that don't change moment to moment. Ser is one of the most used verbs in the language, and its present tense forms are the backbone of almost every introduction you'll ever give. This Path builds that backbone — starting with the people around you, then the forms of ser that describe them, and finishing with the numbers you need to give your age, your address, your phone number. Soy John. ¿Y tú?`,
    furtherStudy: `Ser is irregular — its forms don't follow the standard pattern, which is why it needs dedicated attention. Present tense: soy (I am), eres (you are, informal), es (he/she/it is), somos (we are), son (they/you all are). The key distinction to lock in early: ser is for identity, origin, and permanent characteristics. "Soy de Canadá." "Ella es médica." "Son simpáticos." The confusion with estar (Path 3) trips up English speakers constantly — English uses one verb where Spanish uses two. The rule of thumb: if the sentence describes what something fundamentally is, use ser. If it describes a state or location that could change, use estar. Don't worry about mastering the distinction now — Path 3 will make it click naturally.`,
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
    lessonText: `You already know ser — the "to be" of identity. Now meet its partner: estar, the "to be" of location and state. Where are you? How are you feeling right now? Where is the restaurant? These questions all need estar, not ser. The difference sounds complicated but becomes instinctive quickly: ser is what you are, estar is where you are and how you are. This Path grounds you in the places you'll actually need — the hospital, the hotel, the store, the street — and the verb forms that put you and everyone around you in those places. By the end, you'll be able to say where things are, ask where things are, and understand the answer. ¿Dónde está el baño? might be the most useful sentence in this entire app.`,
    furtherStudy: `Estar present tense: estoy (I am), estás (you are), está (he/she/it is), estamos (we are), están (they are). Uses: location (el café está cerca), temporary states (estoy cansado), emotions (ella está feliz), and progressive tenses (estamos comiendo). The ser vs estar distinction has a classic test: if you can imagine the condition changing, use estar. "Estoy enfermo" — I'm sick right now, but I'll recover. "Soy enfermizo" — I'm a sickly person by nature. Numbers 7–20 in this Path are essential for addresses, prices, times, and ages beyond the basics. Note that 16–19 can be written as one word (dieciséis, diecisiete) or two (diez y seis) — both are correct, one word is more modern.`,
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
    lessonText: `Tener — to have — is the verb that makes you sound fluent fast. Not because it's complicated, but because Spanish uses it where English uses "to be." You don't feel hungry in Spanish — you have hunger. You don't feel cold — you have cold. You don't feel afraid — you have fear. Once you understand this, a whole layer of the language suddenly makes sense. This Path pairs tener with the language of time — hours, days, deadlines — because knowing what you have and when you have it covers an enormous range of real conversation. "Tengo una reservación para las ocho." I have a reservation for eight o'clock. That's one sentence that will serve you in restaurants, hotels, and airports across the entire Spanish-speaking world.`,
    furtherStudy: `Tener present tense: tengo (I have), tienes (you have), tiene (he/she has), tenemos (we have), tienen (they have). Key tener expressions that replace English "to be": tener hambre (to be hungry), tener sed (to be thirsty), tener frío (to be cold), tener calor (to be hot), tener miedo (to be afraid), tener razón (to be right), tener prisa (to be in a hurry). For time: Spanish uses a 12-hour clock in conversation. "¿Qué hora es?" — What time is it? "Es la una" for 1:00, "Son las dos" for 2:00 onward. Note the verb changes: singular es for one o'clock, plural son for all others. Necesitar (to need) follows regular -ar verb patterns and is one of the most practical verbs for travel situations.`,
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
    lessonText: `Two verbs. Infinite usefulness. Querer means to want, and poder means to be able to — can. Together they unlock the ability to express desire and capability, which covers a surprisingly large portion of everyday conversation. "I want a coffee." "Can you help me?" "She wants to leave." "We can't find it." These aren't advanced sentences — they're the sentences real people say dozens of times a day. This Path builds both verbs around food and drink, which is intentional: ordering in a café or restaurant is one of the first real-world tests every language learner faces, and quiero and puedo are the two verbs you'll reach for most. Quiero un café con leche, por favor. Say that once in a real café and this Path will have paid for itself.`,
    furtherStudy: `Both querer and poder are stem-changing verbs — the vowel in the stem changes in most present tense forms. Querer: quiero, quieres, quiere, queremos, quieren (e→ie change, except queremos). Poder: puedo, puedes, puede, podemos, pueden (o→ue change, except podemos). These stem changes are called "boot verbs" because if you underline the changed forms, they form a boot shape around the unchanged nosotros form. Both verbs are followed by an infinitive: quiero comer (I want to eat), puedo ayudar (I can help). In Latin America, querer is perfectly natural for ordering food. In some formal contexts you might prefer quisiera (I would like) — the conditional form, softer and more polite.`,
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
    lessonText: `Ir — to go — is the verb that puts you in motion. Where are you going? How are you getting there? How long will it take? These are the questions that define travel, and this Path gives you everything you need to answer them. Ir is also the key to talking about the future in Spanish — the construction ir + a + infinitive ("I'm going to eat," "she's going to call") is how native speakers express plans and intentions in everyday speech. Combined with transport vocabulary and directions, this Path is the difference between being a lost tourist and someone who can actually navigate. Voy a la izquierda, luego a la derecha, y el hotel está enfrente. Left, right, straight ahead — you'll need these within hours of arriving anywhere new.`,
    furtherStudy: `Ir is one of the most irregular verbs in Spanish: voy, vas, va, vamos, van. No resemblance to the infinitive — must be memorised. The near future construction: ir + a + infinitive. "Voy a comer" (I'm going to eat). "Vamos a salir" (We're going to leave). This is used far more commonly than the formal future tense (comeré, saldré) in everyday conversation. Directions vocabulary: a la derecha (to the right), a la izquierda (to the left), recto/derecho (straight ahead), en la esquina (on the corner), enfrente de (in front of), al lado de (next to). Weather in Spanish uses hacer for most conditions: hace calor, hace frío, hace viento. But rain and snow use their own verbs: llueve (it rains), nieva (it snows).`,
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
    lessonText: `This Path is about communication itself — the meta-layer of language learning. Hablar means to speak, and it's the model for all regular -ar verbs in Spanish. Learn its pattern and you've unlocked hundreds of verbs at once. Saber means to know — specifically, to know facts or how to do things. "Do you speak Spanish?" "I know how to cook." "She knows the answer." This Path also brings in the verbs for seeing and listening, because real communication isn't just speaking — it's paying attention. By the end you'll be able to talk about language itself, about media, about what you know and don't know. ¿Hablas español? Un poco. Estoy aprendiendo. That sentence alone — I speak a little, I'm learning — will earn you more goodwill from native speakers than almost anything else you can say.`,
    furtherStudy: `Hablar is the model regular -ar verb: hablo, hablas, habla, hablamos, hablan. All regular -ar verbs follow this exact pattern — caminar, trabajar, escuchar, necesitar and hundreds more. Saber vs conocer: Spanish has two verbs for "to know." Saber is for facts and skills (sé la respuesta, sé cocinar). Conocer is for people and places (conozco a María, conozco Madrid). This distinction doesn't exist in English and trips up learners constantly. Saber present tense: sé, sabes, sabe, sabemos, saben — note the irregular sé (I know). Ver (to see): veo, ves, ve, vemos, ven — irregular veo first person. Escuchar is regular -ar. Media vocabulary in this Path reflects modern usage — las noticias (the news), el podcast, las redes sociales (social media).`,
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
    lessonText: `Three things define the rhythm of daily life: what people say, who they say it to, and when. This Path covers all three. Decir — to say, to tell — is one of the most important verbs in the language because it introduces reported speech. She says she's coming. They say the restaurant is good. What did he say? You'll use decir every time you relay information, give instructions, or quote someone. The family vocabulary in this Path isn't just sentimental — family members are among the most common conversation topics in Spanish-speaking cultures, where family ties are central to social identity. And the days of the week complete the basic time framework you started in Path 4. Dice que llega el jueves. She says she arrives Thursday.`,
    furtherStudy: `Decir is irregular: digo, dices, dice, decimos, dicen — note the irregular digo (I say). Decir is often followed by que: 'Dice que sí' (She says yes), 'Dicen que es bueno' (They say it's good). Days of the week in Spanish are not capitalised. They're all masculine: el lunes, el martes etc. 'On Monday' is el lunes (no preposition needed). 'On Mondays' (recurring) is los lunes. The week starts on Monday in most Spanish-speaking countries — calendars reflect this. Family vocabulary note: Spanish distinguishes grandparents by gender (abuelo/abuela) and uses los abuelos to mean grandparents — the masculine plural covers mixed groups. The same applies to padres (parents), hermanos (siblings), hijos (children).`,
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
    lessonText: `Food is culture. In Spanish-speaking countries, meals are events — long, social, central to daily life. Knowing how to navigate a meal in Spanish isn't just practical, it's a way into the culture itself. This Path focuses on the verbs comer (to eat) and beber (to drink) — two regular -er verbs that model an entire verb class — alongside the expanded food and drink vocabulary you need for real restaurant situations. You already met food words in Path 5. Here the scene deepens: describing physical states, talking about what you eat and drink regularly, understanding a menu, and handling the social choreography of a Spanish meal. Como ensalada todos los días. ¿Y tú, qué comes? What you eat every day is one of the most natural conversation starters in any language.`,
    furtherStudy: `Comer models all regular -er verbs: como, comes, come, comemos, comen. Compare to -ar verbs (hablo, hablas) — the vowels flip. Beber follows the same -er pattern: bebo, bebes, bebe, bebemos, beben. Other common -er verbs: leer (to read), correr (to run), vender (to sell), comprender (to understand). Physical states use estar + adjective: estoy lleno/a (I'm full), estoy cansado/a (I'm tired). Gender agreement: adjectives must match the gender of the subject — lleno (masculine), llena (feminine). Meal culture note: in Spain, lunch (la comida) is the main meal, typically 2–4pm. Dinner (la cena) is light and late, often 9–10pm. In Latin America, patterns vary more by country and region.`,
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
    lessonText: `Three verbs that cover the practical architecture of adult life: buying things, living somewhere, working at something. Comprar (to buy) is the verb of every market, shop, and transaction. Vivir (to live) is how you explain where you are in the world and how long you've been there. Trabajar (to work) opens up the enormous range of conversation around jobs, schedules, and daily routine. Together these three verbs — one -ar, one -ir, one -ar — complete the three regular verb families in Spanish. By this point you have hablar (-ar), comer (-er), and now vivir (-ir). The patterns are in place. Money vocabulary completes the picture: you can't buy anything without knowing how to talk about price. ¿Cuánto cuesta? Vivo aquí hace dos años. Trabajo los lunes. These sentences place you in the world.`,
    furtherStudy: `Vivir models all regular -ir verbs: vivo, vives, vive, vivimos, viven. Compare -ar (hablo), -er (como), -ir (vivo) — the nosotros form is the key difference: -amos, -emos, -imos. Other -ir verbs: escribir (to write), abrir (to open), subir (to go up), recibir (to receive). Money expressions: ¿Cuánto cuesta? (singular), ¿Cuánto cuestan? (plural). Cuesta comes from costar, a stem-changing verb (o→ue). Bargaining (regatear) is common in markets across Latin America and Spain — ¿Me hace un descuento? (Can you give me a discount?) is worth knowing. Trabajar is regular -ar. 'I work as a teacher' = trabajo de maestro/a — use de, not como, in this construction.`,
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
    lessonText: `Knowing the words for your body and your health isn't optional — it's urgent. The moment something goes wrong, or someone asks if you're okay, or you need to explain a symptom to a doctor or pharmacist, this vocabulary moves from useful to essential. This Path builds the body vocabulary you need and pairs it with dormir (to sleep) and venir (to come) — two verbs that round out your ability to talk about daily routine and movement. Health in Spanish-speaking countries often involves the farmacia as a first stop before a doctor — pharmacists are trusted and often give direct advice. Knowing how to say where it hurts and what's wrong will take you a long way. Me duele la cabeza. Necesito algo para el dolor. I have a headache. I need something for the pain.`,
    furtherStudy: `Doler (to hurt) works like gustar — used with indirect object pronouns. Me duele la cabeza (my head hurts — literally 'the head hurts me'). Me duelen los pies (my feet hurt — plural verb for plural noun). The subject is the body part, not the person. Dormir is a stem-changing -ir verb (o→ue): duermo, duermes, duerme, dormimos, duermen. Venir is irregular: vengo, vienes, viene, venimos, vienen — note the irregular vengo. Health vocabulary: el médico/la médica (doctor), la enfermera/el enfermero (nurse), la farmacia (pharmacy), la clínica (clinic). In an emergency: ¡Llame a una ambulancia! (Call an ambulance!) and ¡Necesito ayuda! (I need help!) are the two phrases to know before anything else.`,
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
    lessonText: `Language isn't just words — it's the world those words describe. This Path steps back from verbs and transactions to give you the vocabulary for describing what you see: colours, weather, nature, animals, and feelings. These aren't decorative extras. Colours let you describe and identify things precisely. Weather vocabulary comes up in every casual conversation. Animals matter more than you'd expect — from markets to farms to pets to idioms. And feelings are the vocabulary of human connection. Being able to say how you feel, or understand how someone else feels, is what moves a conversation from functional to real. El cielo está azul y me siento bien. The sky is blue and I feel good. Simple sentences. Real language.`,
    furtherStudy: `Colour adjectives agree in gender and number with the noun they modify: el coche rojo, la casa roja, los coches rojos, las casas rojas. Exception: some colours are invariable — el coche naranja, la casa naranja. These include naranja, rosa, violeta, marrón. Weather: hacer for general conditions (hace sol, hace calor), estar for sky conditions (está nublado, está despejado), specific verbs for rain and snow (llueve, nieva). Feelings use estar + adjective (estoy triste, estoy emocionado/a) for temporary emotional states, or sentirse + adjective (me siento bien). Animal vocabulary varies regionally across Latin America — el loro is the safest word for parrot as a default.`,
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
    lessonText: `You've come a long way. This final Path isn't about survival basics — it's about nuance. The difference between getting by and actually sounding like yourself in Spanish. Salir (to leave, to go out), leer (to read), escribir (to write), escuchar (to listen), ver (to see) — these are the verbs of a richer life. Reading a menu, writing a message, going out with friends, listening to music, watching a film. The frequency words in this Path — siempre, nunca, a veces, casi — let you describe your habits and routines with precision. And the activities vocabulary gives you the language for leisure, culture, and the conversations that happen when the urgent stuff is handled and you can just talk. A veces salgo con amigos. Casi nunca leo las noticias. That's not survival Spanish. That's you.`,
    furtherStudy: `Salir is irregular in the first person only: salgo, sales, sale, salimos, salen. This pattern — irregular yo form, regular elsewhere — is common: salgo, tengo, vengo, digo, hago, pongo, traigo are all irregular in the first person only. Leer is regular -er but has a spelling change: the past tense third person is leyó/leyeron, not leió. Escribir is regular -ir. Frequency adverbs: siempre (always), nunca (never), a veces (sometimes), casi nunca (almost never), casi siempre (almost always), normalmente (normally). Nunca can go before or after the verb — nunca como carne or no como carne nunca — both are correct. The double negative is standard in Spanish, not an error.`,
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
