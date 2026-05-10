export const TOGGLEABLE_CATEGORIES = [
  'Food & Drink', 'Family', 'Travel', 'Places', 'Numbers',
  'Days', 'Months', 'Colours', 'Body', 'Adjectives', 'Time', 'Questions', 'Connectors',
  'Weather', 'Animals', 'Clothing'
];

export const PRESET_PACKS = [
  { id: 'all', name: 'Everything', emoji: '🌎', desc: 'All packs enabled', cats: ['*'] },
  { id: 'travel', name: 'Travel Trip', emoji: '🧳', desc: 'Just what you need on the road', cats: ['Travel', 'Places', 'Numbers', 'Time', 'Questions'] },
  { id: 'restaurant', name: 'Restaurant', emoji: '🍽️', desc: 'Order, eat, pay, repeat', cats: ['Food & Drink', 'Numbers', 'Adjectives', 'Connectors'] },
  { id: 'survival', name: 'Survival 101', emoji: '🆘', desc: 'Bare essentials only', cats: ['Numbers', 'Days', 'Questions', 'Connectors'] },
  { id: 'beginner', name: 'Beginner', emoji: '🌱', desc: 'Light load to ease in', cats: ['Family', 'Numbers', 'Colours', 'Days'] },
];

export const DEFAULT_CATEGORIES = Object.fromEntries(TOGGLEABLE_CATEGORIES.map(c => [c, true]));

export const MASTER = [
  // === CORE: PHRASES ===
  { es: 'hola', en: 'hello', type: 'phrase', group: 'Core', sentence: { es: '¡Hola! ¿Cómo estás?', en: 'Hello! How are you?' } },
  { es: 'adiós', en: 'goodbye', type: 'phrase', group: 'Core', sentence: { es: 'Adiós, hasta mañana.', en: 'Goodbye, see you tomorrow.' } },
  { es: 'gracias', en: 'thank you', type: 'phrase', group: 'Core', sentence: { es: 'Muchas gracias por tu ayuda.', en: 'Thank you very much for your help.' } },
  { es: 'de nada', en: "you're welcome", type: 'phrase', group: 'Core', sentence: { es: 'De nada, fue un placer.', en: "You're welcome, it was a pleasure." } },
  { es: 'por favor', en: 'please', type: 'phrase', group: 'Core', sentence: { es: 'Un café, por favor.', en: 'A coffee, please.' } },
  { es: 'disculpe', en: 'excuse me', type: 'phrase', group: 'Core', sentence: { es: 'Disculpe, ¿dónde está el hotel?', en: 'Excuse me, where is the hotel?' } },
  { es: 'perdón', en: 'pardon / sorry', type: 'phrase', group: 'Core', sentence: { es: 'Perdón, no entiendo.', en: "Pardon, I don't understand." } },
  { es: 'lo siento', en: "i'm sorry", type: 'phrase', group: 'Core', sentence: { es: 'Lo siento mucho.', en: "I'm very sorry." } },
  { es: 'mucho gusto', en: 'nice to meet you', type: 'phrase', group: 'Core', sentence: { es: 'Mucho gusto, me llamo Juan.', en: 'Nice to meet you, my name is Juan.' } },
  { es: 'buenos días', en: 'good morning', type: 'phrase', group: 'Core', sentence: { es: 'Buenos días, ¿cómo amaneciste?', en: 'Good morning, how did you wake up?' } },
  { es: 'buenas noches', en: 'good night', type: 'phrase', group: 'Core', sentence: { es: 'Buenas noches, hasta mañana.', en: 'Good night, see you tomorrow.' } },

  // === CORE: BASIC WORDS ===
  { es: 'sí', en: 'yes', type: 'adv', group: 'Core', sentence: { es: 'Sí, quiero café.', en: 'Yes, I want coffee.' } },
  { es: 'no', en: 'no', type: 'adv', group: 'Core', sentence: { es: 'No, gracias.', en: 'No, thank you.' } },
  { es: 'y', en: 'and', type: 'adv', group: 'Core', sentence: { es: 'Pan y agua, por favor.', en: 'Bread and water, please.' } },
  { es: 'aquí', en: 'here', type: 'adv', group: 'Core', sentence: { es: 'Estoy aquí.', en: 'I am here.' } },
  { es: 'dónde', en: 'where', type: 'adv', group: 'Core', sentence: { es: '¿Dónde está el baño?', en: 'Where is the bathroom?' } },
  { es: 'con', en: 'with', type: 'other', group: 'Core', sentence: { es: 'Café con leche.', en: 'Coffee with milk.' } },
  { es: 'en', en: 'in / at / on', type: 'other', group: 'Core', sentence: { es: 'Estoy en el hotel.', en: 'I am at the hotel.' } },
  { es: 'español', en: 'spanish', type: 'adj', group: 'Core', sentence: { es: 'Hablo español todos los días.', en: 'I speak Spanish every day.' } },
  { es: 'inglés', en: 'english', type: 'adj', group: 'Core', sentence: { es: '¿Hablas inglés?', en: 'Do you speak English?' } },
  { es: 'mi', en: 'my', type: 'adj', group: 'Core', sentence: { es: 'Necesito mi pasaporte.', en: 'I need my passport.' } },

  // === CORE: ARTICLES ===
  { es: 'el', en: 'the (m)', type: 'article', group: 'Core', sentence: { es: 'El hombre habla español.', en: 'The man speaks Spanish.' } },
  { es: 'la', en: 'the (f)', type: 'article', group: 'Core', sentence: { es: 'La mujer come pan.', en: 'The woman eats bread.' } },
  { es: 'un', en: 'a (m)', type: 'article', group: 'Core', sentence: { es: 'Necesito un taxi.', en: 'I need a taxi.' } },
  { es: 'una', en: 'a (f)', type: 'article', group: 'Core', sentence: { es: 'Quiero una reserva.', en: 'I want a reservation.' } },

  // === CORE: PRONOUNS ===
  { es: 'yo', en: 'i', type: 'pronoun', group: 'Core', sentence: { es: 'Yo hablo español.', en: 'I speak Spanish.' } },
  { es: 'tú', en: 'you', type: 'pronoun', group: 'Core', sentence: { es: 'Tú hablas muy bien.', en: 'You speak very well.' } },
  { es: 'él', en: 'he', type: 'pronoun', group: 'Core', sentence: { es: 'Él come mucho.', en: 'He eats a lot.' } },
  { es: 'ella', en: 'she', type: 'pronoun', group: 'Core', sentence: { es: 'Ella bebe agua.', en: 'She drinks water.' } },

  // === CORE: VERBS (INFINITIVES) ===
  { es: 'hablar', en: 'to speak', type: 'verb', group: 'Core', sentence: { es: 'Me gusta hablar español.', en: 'I like to speak Spanish.' } },
  { es: 'beber', en: 'to drink', type: 'verb', group: 'Core', sentence: { es: 'Necesito beber agua.', en: 'I need to drink water.' } },
  { es: 'comer', en: 'to eat', type: 'verb', group: 'Core', sentence: { es: 'Quiero comer tacos.', en: 'I want to eat tacos.' } },
  { es: 'ser', en: 'to be', type: 'verb', group: 'Core', sentence: { es: 'Quiero ser médico.', en: 'I want to be a doctor.' } },
  { es: 'estar', en: 'to be (location)', type: 'verb', group: 'Core', sentence: { es: 'Voy a estar en el hotel.', en: 'I am going to be at the hotel.' } },
  { es: 'necesitar', en: 'to need', type: 'verb', group: 'Core', sentence: { es: 'Necesito ayuda.', en: 'I need help.' } },
  { es: 'tener', en: 'to have', type: 'verb', group: 'Core', sentence: { es: 'Tengo que ir.', en: 'I have to go.' } },
  { es: 'ir', en: 'to go', type: 'verb', group: 'Core', sentence: { es: 'Voy a ir al restaurante.', en: 'I am going to the restaurant.' } },
  { es: 'querer', en: 'to want', type: 'verb', group: 'Core', sentence: { es: 'Quiero aprender español.', en: 'I want to learn Spanish.' } },
  { es: 'poder', en: 'can / to be able', type: 'verb', group: 'Core', sentence: { es: '¿Puedes ayudarme?', en: 'Can you help me?' } },
  { es: 'saber', en: 'to know', type: 'verb', group: 'Core', sentence: { es: 'No sé dónde está.', en: "I don't know where it is." } },
  { es: 'hacer', en: 'to do / make', type: 'verb', group: 'Core', sentence: { es: '¿Qué haces hoy?', en: 'What are you doing today?' } },
  { es: 'decir', en: 'to say', type: 'verb', group: 'Core', sentence: { es: '¿Qué quieres decir?', en: 'What do you mean?' } },
  { es: 'ver', en: 'to see', type: 'verb', group: 'Core', sentence: { es: 'Quiero ver la ciudad.', en: 'I want to see the city.' } },
  { es: 'venir', en: 'to come', type: 'verb', group: 'Core', sentence: { es: '¿Puedes venir mañana?', en: 'Can you come tomorrow?' } },
  { es: 'comprar', en: 'to buy', type: 'verb', group: 'Core', sentence: { es: 'Quiero comprar pan.', en: 'I want to buy bread.' } },
  { es: 'trabajar', en: 'to work', type: 'verb', group: 'Core', sentence: { es: 'Trabajo en un banco.', en: 'I work at a bank.' } },
  { es: 'vivir', en: 'to live', type: 'verb', group: 'Core', sentence: { es: 'Vivo en la ciudad.', en: 'I live in the city.' } },
  { es: 'dormir', en: 'to sleep', type: 'verb', group: 'Core', sentence: { es: 'Necesito dormir.', en: 'I need to sleep.' } },
  { es: 'caminar', en: 'to walk', type: 'verb', group: 'Core', sentence: { es: 'Me gusta caminar por la calle.', en: 'I like to walk through the street.' } },
  { es: 'llevar', en: 'to carry / wear', type: 'verb', group: 'Core', sentence: { es: 'Llevo mi maleta.', en: 'I carry my suitcase.' } },

  // === CORE: PRESENT CONJUGATIONS ===
  { es: 'hablo', en: 'i speak', type: 'verb', group: 'Core', sentence: { es: 'Hablo español e inglés.', en: 'I speak Spanish and English.' } },
  { es: 'hablas', en: 'you speak', type: 'verb', group: 'Core', sentence: { es: 'Hablas muy bien el español.', en: 'You speak Spanish very well.' } },
  { es: 'habla', en: 'he/she speaks', type: 'verb', group: 'Core', sentence: { es: 'Ella habla tres idiomas.', en: 'She speaks three languages.' } },
  { es: 'bebo', en: 'i drink', type: 'verb', group: 'Core', sentence: { es: 'Bebo café por la mañana.', en: 'I drink coffee in the morning.' } },
  { es: 'bebes', en: 'you drink', type: 'verb', group: 'Core', sentence: { es: '¿Bebes agua con las comidas?', en: 'Do you drink water with meals?' } },
  { es: 'bebe', en: 'he/she drinks', type: 'verb', group: 'Core', sentence: { es: 'Él bebe leche todos los días.', en: 'He drinks milk every day.' } },
  { es: 'como', en: 'i eat', type: 'verb', group: 'Core', sentence: { es: 'Como pan con mantequilla.', en: 'I eat bread with butter.' } },
  { es: 'comes', en: 'you eat', type: 'verb', group: 'Core', sentence: { es: '¿Comes mucho?', en: 'Do you eat a lot?' } },
  { es: 'come', en: 'he/she eats', type: 'verb', group: 'Core', sentence: { es: 'Él come pollo cada día.', en: 'He eats chicken every day.' } },
  { es: 'soy', en: 'i am', type: 'verb', group: 'Core', sentence: { es: 'Soy estudiante de español.', en: 'I am a student of Spanish.' } },
  { es: 'eres', en: 'you are', type: 'verb', group: 'Core', sentence: { es: 'Eres muy amable.', en: 'You are very kind.' } },
  { es: 'es', en: 'he/she/it is', type: 'verb', group: 'Core', sentence: { es: 'Ella es mi madre.', en: 'She is my mother.' } },
  { es: 'estoy', en: 'i am (location)', type: 'verb', group: 'Core', sentence: { es: 'Estoy en el aeropuerto.', en: 'I am at the airport.' } },
  { es: 'estás', en: 'you are (location)', type: 'verb', group: 'Core', sentence: { es: '¿Estás en casa?', en: 'Are you at home?' } },
  { es: 'está', en: 'he/she/it is (location)', type: 'verb', group: 'Core', sentence: { es: 'El hotel está aquí.', en: 'The hotel is here.' } },
  { es: 'necesito', en: 'i need', type: 'verb', group: 'Core', sentence: { es: 'Necesito mi pasaporte.', en: 'I need my passport.' } },
  { es: 'necesitas', en: 'you need', type: 'verb', group: 'Core', sentence: { es: '¿Necesitas ayuda?', en: 'Do you need help?' } },
  { es: 'necesita', en: 'he/she needs', type: 'verb', group: 'Core', sentence: { es: 'Ella necesita un taxi.', en: 'She needs a taxi.' } },
  { es: 'tengo', en: 'i have', type: 'verb', group: 'Core', sentence: { es: 'Tengo una reserva.', en: 'I have a reservation.' } },
  { es: 'tienes', en: 'you have', type: 'verb', group: 'Core', sentence: { es: '¿Tienes mi pasaporte?', en: 'Do you have my passport?' } },
  { es: 'tiene', en: 'he/she has', type: 'verb', group: 'Core', sentence: { es: 'Él tiene una maleta grande.', en: 'He has a large suitcase.' } },
  { es: 'voy', en: 'i go', type: 'verb', group: 'Core', sentence: { es: 'Voy al restaurante.', en: 'I go to the restaurant.' } },
  { es: 'vas', en: 'you go', type: 'verb', group: 'Core', sentence: { es: '¿Adónde vas?', en: 'Where are you going?' } },
  { es: 'va', en: 'he/she goes', type: 'verb', group: 'Core', sentence: { es: 'Ella va al banco.', en: 'She goes to the bank.' } },
  { es: 'quiero', en: 'i want', type: 'verb', group: 'Core', sentence: { es: 'Quiero una habitación, por favor.', en: 'I want a room, please.' } },
  { es: 'quieres', en: 'you want', type: 'verb', group: 'Core', sentence: { es: '¿Qué quieres comer?', en: 'What do you want to eat?' } },
  { es: 'quiere', en: 'he/she wants', type: 'verb', group: 'Core', sentence: { es: 'Él quiere un café.', en: 'He wants a coffee.' } },
  { es: 'puedo', en: 'i can', type: 'verb', group: 'Core', sentence: { es: 'Puedo hablar español.', en: 'I can speak Spanish.' } },
  { es: 'puedes', en: 'you can', type: 'verb', group: 'Core', sentence: { es: '¿Puedes repetir, por favor?', en: 'Can you repeat, please?' } },
  { es: 'puede', en: 'he/she can', type: 'verb', group: 'Core', sentence: { es: 'Ella puede ayudarte.', en: 'She can help you.' } },
  { es: 'hago', en: 'i do / make', type: 'verb', group: 'Core', sentence: { es: 'Hago café todas las mañanas.', en: 'I make coffee every morning.' } },
  { es: 'haces', en: 'you do / make', type: 'verb', group: 'Core', sentence: { es: '¿Qué haces?', en: 'What are you doing?' } },
  { es: 'hace', en: 'he/she does / makes', type: 'verb', group: 'Core', sentence: { es: 'Ella hace ejercicio cada día.', en: 'She exercises every day.' } },

  // === CORE: People ===
  { es: 'hombre', en: 'man', type: 'noun', group: 'Core', gender: 'm', sentence: { es: 'El hombre habla español.', en: 'The man speaks Spanish.' } },
  { es: 'mujer', en: 'woman', type: 'noun', group: 'Core', gender: 'f', sentence: { es: 'La mujer trabaja en el hospital.', en: 'The woman works at the hospital.' } },
  { es: 'niño', en: 'boy', type: 'noun', group: 'Core', gender: 'm', sentence: { es: 'El niño come una manzana.', en: 'The boy eats an apple.' } },
  { es: 'niña', en: 'girl', type: 'noun', group: 'Core', gender: 'f', sentence: { es: 'La niña bebe leche.', en: 'The girl drinks milk.' } },

  // === FOOD & DRINK ===
  { es: 'agua', en: 'water', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Necesito un vaso de agua.', en: 'I need a glass of water.' } },
  { es: 'leche', en: 'milk', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'El niño bebe leche.', en: 'The boy drinks milk.' } },
  { es: 'pan', en: 'bread', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'Quiero pan con mantequilla.', en: 'I want bread with butter.' } },
  { es: 'manzana', en: 'apple', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Como una manzana cada día.', en: 'I eat an apple every day.' } },
  { es: 'pollo', en: 'chicken', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El pollo está muy rico.', en: 'The chicken is very delicious.' } },
  { es: 'carne', en: 'meat', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Como carne los domingos.', en: 'I eat meat on Sundays.' } },
  { es: 'pescado', en: 'fish', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El pescado fresco es muy bueno.', en: 'Fresh fish is very good.' } },
  { es: 'arroz', en: 'rice', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El arroz con pollo es delicioso.', en: 'Rice with chicken is delicious.' } },
  { es: 'café', en: 'coffee', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'Tomo un café por la mañana.', en: 'I have a coffee in the morning.' } },
  { es: 'jugo', en: 'juice', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'Quiero jugo de naranja, por favor.', en: 'I want orange juice, please.' } },
  { es: 'sopa', en: 'soup', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'La sopa está caliente.', en: 'The soup is hot.' } },
  { es: 'fruta', en: 'fruit', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Como fruta todos los días.', en: 'I eat fruit every day.' } },
  { es: 'verdura', en: 'vegetable', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Las verduras son muy sanas.', en: 'Vegetables are very healthy.' } },
  { es: 'queso', en: 'cheese', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El queso mexicano es muy bueno.', en: 'Mexican cheese is very good.' } },

  // === FAMILY ===
  { es: 'madre', en: 'mother', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi madre habla español muy bien.', en: 'My mother speaks Spanish very well.' } },
  { es: 'padre', en: 'father', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi padre trabaja en un banco.', en: 'My father works at a bank.' } },
  { es: 'hermano', en: 'brother', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi hermano vive en la Ciudad de México.', en: 'My brother lives in Mexico City.' } },
  { es: 'hermana', en: 'sister', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi hermana es médica.', en: 'My sister is a doctor.' } },
  { es: 'hijo', en: 'son', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi hijo estudia español.', en: 'My son studies Spanish.' } },
  { es: 'hija', en: 'daughter', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi hija tiene cinco años.', en: 'My daughter is five years old.' } },
  { es: 'abuelo', en: 'grandfather', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi abuelo es muy sabio.', en: 'My grandfather is very wise.' } },
  { es: 'abuela', en: 'grandmother', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi abuela hace una sopa deliciosa.', en: 'My grandmother makes a delicious soup.' } },
  { es: 'esposo', en: 'husband', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi esposo habla español.', en: 'My husband speaks Spanish.' } },
  { es: 'esposa', en: 'wife', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi esposa trabaja en el hospital.', en: 'My wife works at the hospital.' } },

  // === TRAVEL ===
  { es: 'teléfono', en: 'telephone', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'Necesito mi teléfono.', en: 'I need my telephone.' } },
  { es: 'maleta', en: 'suitcase', type: 'noun', group: 'Travel', gender: 'f', sentence: { es: 'Mi maleta es muy pesada.', en: 'My suitcase is very heavy.' } },
  { es: 'taxi', en: 'taxi', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'Necesito un taxi al aeropuerto.', en: 'I need a taxi to the airport.' } },
  { es: 'pasaporte', en: 'passport', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'No tengo mi pasaporte.', en: "I don't have my passport." } },
  { es: 'hotel', en: 'hotel', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'El hotel está en el centro.', en: 'The hotel is in the center.' } },
  { es: 'reserva', en: 'reservation', type: 'noun', group: 'Travel', gender: 'f', sentence: { es: 'Tengo una reserva para dos personas.', en: 'I have a reservation for two people.' } },

  // === PLACES ===
  { es: 'casa', en: 'house / home', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'Mi casa está cerca del banco.', en: 'My house is near the bank.' } },
  { es: 'escuela', en: 'school', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'Mi hijo va a la escuela.', en: 'My son goes to school.' } },
  { es: 'tienda', en: 'store / shop', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'La tienda está abierta.', en: 'The store is open.' } },
  { es: 'restaurante', en: 'restaurant', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'El restaurante tiene muy buena comida.', en: 'The restaurant has very good food.' } },
  { es: 'hospital', en: 'hospital', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'El hospital está lejos.', en: 'The hospital is far.' } },
  { es: 'banco', en: 'bank', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'El banco está cerca del hotel.', en: 'The bank is near the hotel.' } },
  { es: 'ciudad', en: 'city', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'Ciudad de México es una ciudad grande.', en: 'Mexico City is a big city.' } },
  { es: 'calle', en: 'street', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'La calle está muy ocupada.', en: 'The street is very busy.' } },
  { es: 'país', en: 'country', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'México es un país hermoso.', en: 'Mexico is a beautiful country.' } },
  { es: 'playa', en: 'beach', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'La playa de Cancún es famosa.', en: 'The beach of Cancún is famous.' } },

  // === NUMBERS ===
  { es: 'uno', en: 'one', type: 'other', group: 'Numbers', sentence: { es: 'Tengo un hijo.', en: 'I have one son.' } },
  { es: 'dos', en: 'two', type: 'other', group: 'Numbers', sentence: { es: 'Quiero dos cafés.', en: 'I want two coffees.' } },
  { es: 'tres', en: 'three', type: 'other', group: 'Numbers', sentence: { es: 'Tengo tres maletas.', en: 'I have three suitcases.' } },
  { es: 'cuatro', en: 'four', type: 'other', group: 'Numbers', sentence: { es: 'La reserva es para cuatro personas.', en: 'The reservation is for four people.' } },
  { es: 'cinco', en: 'five', type: 'other', group: 'Numbers', sentence: { es: 'El hotel tiene cinco estrellas.', en: 'The hotel has five stars.' } },
  { es: 'seis', en: 'six', type: 'other', group: 'Numbers', sentence: { es: 'Son las seis de la tarde.', en: 'It is six in the afternoon.' } },
  { es: 'siete', en: 'seven', type: 'other', group: 'Numbers', sentence: { es: 'La semana tiene siete días.', en: 'The week has seven days.' } },
  { es: 'ocho', en: 'eight', type: 'other', group: 'Numbers', sentence: { es: 'Trabajo ocho horas al día.', en: 'I work eight hours a day.' } },
  { es: 'nueve', en: 'nine', type: 'other', group: 'Numbers', sentence: { es: 'Son las nueve de la mañana.', en: 'It is nine in the morning.' } },
  { es: 'diez', en: 'ten', type: 'other', group: 'Numbers', sentence: { es: 'Tengo diez pesos.', en: 'I have ten pesos.' } },
  { es: 'veinte', en: 'twenty', type: 'other', group: 'Numbers', sentence: { es: 'Necesito veinte minutos.', en: 'I need twenty minutes.' } },
  { es: 'cien', en: 'one hundred', type: 'other', group: 'Numbers', sentence: { es: 'Cuesta cien pesos.', en: 'It costs one hundred pesos.' } },

  // === DAYS ===
  { es: 'lunes', en: 'monday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El lunes tengo clase de español.', en: 'On Monday I have a Spanish class.' } },
  { es: 'martes', en: 'tuesday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El martes trabajo todo el día.', en: 'On Tuesday I work all day.' } },
  { es: 'miércoles', en: 'wednesday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El miércoles voy al restaurante.', en: 'On Wednesday I go to the restaurant.' } },
  { es: 'jueves', en: 'thursday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El jueves visito a mi familia.', en: 'On Thursday I visit my family.' } },
  { es: 'viernes', en: 'friday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El viernes salgo con amigos.', en: 'On Friday I go out with friends.' } },
  { es: 'sábado', en: 'saturday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El sábado voy a la playa.', en: 'On Saturday I go to the beach.' } },
  { es: 'domingo', en: 'sunday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El domingo descanso en casa.', en: 'On Sunday I rest at home.' } },

  // === MONTHS ===
  { es: 'enero', en: 'january', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'febrero', en: 'february', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'marzo', en: 'march', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'abril', en: 'april', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'mayo', en: 'may', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'junio', en: 'june', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'julio', en: 'july', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'agosto', en: 'august', type: 'noun', group: 'Months', gender: 'm', sentence: { es: 'En agosto voy a México.', en: 'In August I go to Mexico.' } },
  { es: 'septiembre', en: 'september', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'octubre', en: 'october', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'noviembre', en: 'november', type: 'noun', group: 'Months', gender: 'm', sentence: null },
  { es: 'diciembre', en: 'december', type: 'noun', group: 'Months', gender: 'm', sentence: { es: 'En diciembre hace frío.', en: 'In December it is cold.' } },

  // === COLOURS ===
  { es: 'rojo', en: 'red', type: 'adj', group: 'Colours', sentence: { es: 'El tomate es rojo.', en: 'The tomato is red.' } },
  { es: 'azul', en: 'blue', type: 'adj', group: 'Colours', sentence: { es: 'El cielo es azul.', en: 'The sky is blue.' } },
  { es: 'verde', en: 'green', type: 'adj', group: 'Colours', sentence: { es: 'La hierba es verde.', en: 'The grass is green.' } },
  { es: 'amarillo', en: 'yellow', type: 'adj', group: 'Colours', sentence: { es: 'El sol es amarillo.', en: 'The sun is yellow.' } },
  { es: 'blanco', en: 'white', type: 'adj', group: 'Colours', sentence: { es: 'La nieve es blanca.', en: 'The snow is white.' } },
  { es: 'negro', en: 'black', type: 'adj', group: 'Colours', sentence: { es: 'El café es negro.', en: 'The coffee is black.' } },
  { es: 'naranja', en: 'orange', type: 'adj', group: 'Colours', sentence: { es: 'La naranja es naranja.', en: 'The orange is orange.' } },
  { es: 'gris', en: 'grey', type: 'adj', group: 'Colours', sentence: { es: 'El cielo está gris hoy.', en: 'The sky is grey today.' } },
  { es: 'morado', en: 'purple', type: 'adj', group: 'Colours', sentence: { es: 'Las uvas son moradas.', en: 'The grapes are purple.' } },

  // === BODY ===
  { es: 'cabeza', en: 'head', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Me duele la cabeza.', en: 'My head hurts.' } },
  { es: 'mano', en: 'hand', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Me lavé las manos.', en: 'I washed my hands.' } },
  { es: 'pie', en: 'foot', type: 'noun', group: 'Body', gender: 'm', sentence: { es: 'Me duele el pie.', en: 'My foot hurts.' } },
  { es: 'ojo', en: 'eye', type: 'noun', group: 'Body', gender: 'm', sentence: { es: 'Ella tiene ojos azules.', en: 'She has blue eyes.' } },
  { es: 'boca', en: 'mouth', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Abre la boca, por favor.', en: 'Open your mouth, please.' } },
  { es: 'nariz', en: 'nose', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Me duele la nariz.', en: 'My nose hurts.' } },
  { es: 'oreja', en: 'ear', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Tengo dolor de oreja.', en: 'I have an earache.' } },
  { es: 'brazo', en: 'arm', type: 'noun', group: 'Body', gender: 'm', sentence: { es: 'Me rompí el brazo.', en: 'I broke my arm.' } },

  // === ADJECTIVES ===
  { es: 'grande', en: 'big / large', type: 'adj', group: 'Adjectives', sentence: { es: 'Ciudad de México es una ciudad muy grande.', en: 'Mexico City is a very big city.' } },
  { es: 'pequeño', en: 'small', type: 'adj', group: 'Adjectives', sentence: { es: 'Mi casa es pequeña pero bonita.', en: 'My house is small but nice.' } },
  { es: 'bueno', en: 'good', type: 'adj', group: 'Adjectives', sentence: { es: 'La comida es muy buena.', en: 'The food is very good.' } },
  { es: 'malo', en: 'bad', type: 'adj', group: 'Adjectives', sentence: { es: 'El tiempo está malo hoy.', en: 'The weather is bad today.' } },
  { es: 'nuevo', en: 'new', type: 'adj', group: 'Adjectives', sentence: { es: 'Tengo un celular nuevo.', en: 'I have a new phone.' } },
  { es: 'viejo', en: 'old', type: 'adj', group: 'Adjectives', sentence: { es: 'Este es un edificio muy viejo.', en: 'This is a very old building.' } },
  { es: 'bonito', en: 'pretty / nice', type: 'adj', group: 'Adjectives', sentence: { es: 'México es un país muy bonito.', en: 'Mexico is a very nice country.' } },
  { es: 'fácil', en: 'easy', type: 'adj', group: 'Adjectives', sentence: { es: 'El español es fácil y divertido.', en: 'Spanish is easy and fun.' } },
  { es: 'difícil', en: 'difficult', type: 'adj', group: 'Adjectives', sentence: { es: 'La gramática puede ser difícil.', en: 'Grammar can be difficult.' } },
  { es: 'caliente', en: 'hot', type: 'adj', group: 'Adjectives', sentence: { es: 'El café está muy caliente.', en: 'The coffee is very hot.' } },
  { es: 'frío', en: 'cold', type: 'adj', group: 'Adjectives', sentence: { es: 'El agua está fría.', en: 'The water is cold.' } },
  { es: 'rápido', en: 'fast', type: 'adj', group: 'Adjectives', sentence: { es: 'El taxi es muy rápido.', en: 'The taxi is very fast.' } },
  { es: 'lento', en: 'slow', type: 'adj', group: 'Adjectives', sentence: { es: 'El camión es muy lento.', en: 'The bus is very slow.' } },
  { es: 'caro', en: 'expensive', type: 'adj', group: 'Adjectives', sentence: { es: 'El hotel es muy caro.', en: 'The hotel is very expensive.' } },
  { es: 'barato', en: 'cheap', type: 'adj', group: 'Adjectives', sentence: { es: 'El restaurante es barato.', en: 'The restaurant is cheap.' } },
  { es: 'abierto', en: 'open', type: 'adj', group: 'Adjectives', sentence: { es: 'La tienda está abierta.', en: 'The store is open.' } },
  { es: 'cerrado', en: 'closed', type: 'adj', group: 'Adjectives', sentence: { es: 'El banco está cerrado hoy.', en: 'The bank is closed today.' } },
  { es: 'importante', en: 'important', type: 'adj', group: 'Adjectives', sentence: { es: 'El pasaporte es muy importante.', en: 'The passport is very important.' } },

  // === TIME ===
  { es: 'hoy', en: 'today', type: 'adv', group: 'Time', sentence: { es: 'Hoy voy al restaurante.', en: 'Today I go to the restaurant.' } },
  { es: 'mañana', en: 'tomorrow / morning', type: 'adv', group: 'Time', sentence: { es: 'Mañana tengo una reserva.', en: 'Tomorrow I have a reservation.' } },
  { es: 'ayer', en: 'yesterday', type: 'adv', group: 'Time', sentence: { es: 'Ayer fui al banco.', en: 'Yesterday I went to the bank.' } },
  { es: 'ahora', en: 'now', type: 'adv', group: 'Time', sentence: { es: 'Necesito ayuda ahora.', en: 'I need help now.' } },
  { es: 'tarde', en: 'afternoon / late', type: 'adv', group: 'Time', sentence: { es: 'Llegas tarde.', en: 'You are late.' } },
  { es: 'siempre', en: 'always', type: 'adv', group: 'Time', sentence: { es: 'Siempre como a las dos.', en: 'I always eat at two.' } },
  { es: 'nunca', en: 'never', type: 'adv', group: 'Time', sentence: { es: 'Nunca bebo alcohol.', en: 'I never drink alcohol.' } },
  { es: 'a veces', en: 'sometimes', type: 'adv', group: 'Time', sentence: { es: 'A veces como en un restaurante.', en: 'Sometimes I eat at a restaurant.' } },
  { es: 'pronto', en: 'soon', type: 'adv', group: 'Time', sentence: { es: 'El taxi llega pronto.', en: 'The taxi arrives soon.' } },
  { es: 'después', en: 'after / later', type: 'adv', group: 'Time', sentence: { es: 'Después voy al hotel.', en: 'Later I go to the hotel.' } },
  { es: 'antes', en: 'before', type: 'adv', group: 'Time', sentence: { es: 'Antes de comer, bebo agua.', en: 'Before eating, I drink water.' } },
  { es: 'todavía', en: 'still / yet', type: 'adv', group: 'Time', sentence: { es: 'Todavía no hablo bien.', en: "I still don't speak well." } },

  // === QUESTIONS ===
  { es: 'qué', en: 'what', type: 'adv', group: 'Questions', sentence: { es: '¿Qué quieres comer?', en: 'What do you want to eat?' } },
  { es: 'quién', en: 'who', type: 'adv', group: 'Questions', sentence: { es: '¿Quién es esa persona?', en: 'Who is that person?' } },
  { es: 'cuándo', en: 'when', type: 'adv', group: 'Questions', sentence: { es: '¿Cuándo llega el taxi?', en: 'When does the taxi arrive?' } },
  { es: 'cómo', en: 'how', type: 'adv', group: 'Questions', sentence: { es: '¿Cómo estás hoy?', en: 'How are you today?' } },
  { es: 'cuánto', en: 'how much', type: 'adv', group: 'Questions', sentence: { es: '¿Cuánto cuesta el hotel?', en: 'How much does the hotel cost?' } },
  { es: 'por qué', en: 'why', type: 'adv', group: 'Questions', sentence: { es: '¿Por qué aprendes español?', en: 'Why are you learning Spanish?' } },

  // === CONNECTORS ===
  { es: 'muy', en: 'very', type: 'adv', group: 'Connectors', sentence: { es: 'El español es muy interesante.', en: 'Spanish is very interesting.' } },
  { es: 'también', en: 'also / too', type: 'adv', group: 'Connectors', sentence: { es: 'Yo también hablo francés.', en: 'I also speak French.' } },
  { es: 'pero', en: 'but', type: 'adv', group: 'Connectors', sentence: { es: 'Quiero ir, pero estoy cansado.', en: 'I want to go, but I am tired.' } },
  { es: 'porque', en: 'because', type: 'adv', group: 'Connectors', sentence: { es: 'Estudio español porque me gusta.', en: 'I study Spanish because I like it.' } },
  { es: 'cuando', en: 'when', type: 'adv', group: 'Connectors', sentence: { es: 'Cuando llego, te llamo.', en: 'When I arrive, I will call you.' } },
  { es: 'cerca', en: 'near', type: 'adv', group: 'Connectors', sentence: { es: 'El hotel está cerca.', en: 'The hotel is near.' } },
  { es: 'lejos', en: 'far', type: 'adv', group: 'Connectors', sentence: { es: 'El hospital está lejos.', en: 'The hospital is far.' } },
  { es: 'mucho', en: 'a lot / much', type: 'adv', group: 'Connectors', sentence: { es: 'Gracias mucho.', en: 'Thank you very much.' } },
  { es: 'poco', en: 'a little / few', type: 'adv', group: 'Connectors', sentence: { es: 'Hablo un poco de español.', en: 'I speak a little Spanish.' } },
  { es: 'más', en: 'more', type: 'adv', group: 'Connectors', sentence: { es: '¿Puedes hablar más despacio?', en: 'Can you speak more slowly?' } },
  { es: 'menos', en: 'less', type: 'adv', group: 'Connectors', sentence: { es: 'Necesito menos azúcar.', en: 'I need less sugar.' } },
  { es: 'todo', en: 'all / everything', type: 'adv', group: 'Connectors', sentence: { es: 'Todo está bien.', en: 'Everything is fine.' } },
  { es: 'nada', en: 'nothing', type: 'adv', group: 'Connectors', sentence: { es: 'No hay nada que hacer.', en: 'There is nothing to do.' } },
  { es: 'hay', en: 'there is / there are', type: 'adv', group: 'Connectors', sentence: { es: '¿Hay un taxi cerca?', en: 'Is there a taxi nearby?' } },
  { es: 'o', en: 'or', type: 'adv', group: 'Connectors', sentence: { es: '¿Té o café?', en: 'Tea or coffee?' } },
  { es: 'si', en: 'if', type: 'adv', group: 'Connectors', sentence: { es: 'Si llueve, no salgo.', en: "If it rains, I won't go out." } },

  // === FOOD & DRINK (extra) ===
  { es: 'huevo', en: 'egg', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'Como un huevo en el desayuno.', en: 'I eat an egg for breakfast.' } },
  { es: 'mantequilla', en: 'butter', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Pan con mantequilla, por favor.', en: 'Bread with butter, please.' } },
  { es: 'tomate', en: 'tomato', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El tomate es rojo.', en: 'The tomato is red.' } },
  { es: 'ensalada', en: 'salad', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Una ensalada mixta, por favor.', en: 'A mixed salad, please.' } },
  { es: 'postre', en: 'dessert', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'De postre, helado.', en: 'For dessert, ice cream.' } },
  { es: 'helado', en: 'ice cream', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El niño quiere helado.', en: 'The boy wants ice cream.' } },

  // === FAMILY (extra) ===
  { es: 'tío', en: 'uncle', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi tío vive en Guadalajara.', en: 'My uncle lives in Guadalajara.' } },
  { es: 'tía', en: 'aunt', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi tía hace una sopa increíble.', en: 'My aunt makes incredible soup.' } },
  { es: 'primo', en: 'cousin (m)', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi primo estudia inglés.', en: 'My cousin studies English.' } },
  { es: 'prima', en: 'cousin (f)', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi prima toca la guitarra.', en: 'My cousin plays guitar.' } },

  // === TRAVEL (extra) ===
  { es: 'aeropuerto', en: 'airport', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'El aeropuerto está lejos.', en: 'The airport is far.' } },
  { es: 'vuelo', en: 'flight', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'Mi vuelo sale a las ocho.', en: 'My flight leaves at eight.' } },
  { es: 'boleto', en: 'ticket', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'Necesito un boleto para la Ciudad de México.', en: 'I need a ticket to Mexico City.' } },
  { es: 'equipaje', en: 'luggage', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: '¿Dónde está mi equipaje?', en: 'Where is my luggage?' } },
  { es: 'tren', en: 'train', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'El tren llega a las dos.', en: 'The train arrives at two.' } },
  { es: 'autobús', en: 'bus', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'Tomo el autobús al trabajo.', en: 'I take the bus to work.' } },
  { es: 'carro', en: 'car', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'El carro es nuevo.', en: 'The car is new.' } },
  { es: 'mapa', en: 'map', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: 'Necesito un mapa de la ciudad.', en: 'I need a map of the city.' } },

  // === PLACES (extra) ===
  { es: 'parque', en: 'park', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'El parque es muy bonito.', en: 'The park is very beautiful.' } },
  { es: 'mercado', en: 'market', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'Compro fruta en el mercado.', en: 'I buy fruit at the market.' } },
  { es: 'iglesia', en: 'church', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'La iglesia es muy antigua.', en: 'The church is very old.' } },
  { es: 'museo', en: 'museum', type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'El museo abre a las diez.', en: 'The museum opens at ten.' } },

  // === NUMBERS (extra) ===
  { es: 'cero', en: 'zero', type: 'other', group: 'Numbers', sentence: { es: 'Cero grados — qué frío.', en: 'Zero degrees — so cold.' } },
  { es: 'once', en: 'eleven', type: 'other', group: 'Numbers', sentence: { es: 'Son las once de la noche.', en: 'It is eleven at night.' } },
  { es: 'doce', en: 'twelve', type: 'other', group: 'Numbers', sentence: { es: 'Hay doce meses en un año.', en: 'There are twelve months in a year.' } },

  // === COLOURS (extra) ===
  { es: 'rosa', en: 'pink', type: 'adj', group: 'Colours', sentence: { es: 'La flor es rosa.', en: 'The flower is pink.' } },
  { es: 'marrón', en: 'brown', type: 'adj', group: 'Colours', sentence: { es: 'El café es marrón.', en: 'The coffee is brown.' } },

  // === BODY (extra) ===
  { es: 'corazón', en: 'heart', type: 'noun', group: 'Body', gender: 'm', sentence: { es: 'Mi corazón late rápido.', en: 'My heart beats fast.' } },
  { es: 'dedo', en: 'finger / toe', type: 'noun', group: 'Body', gender: 'm', sentence: { es: 'Me corté el dedo.', en: 'I cut my finger.' } },
  { es: 'pelo', en: 'hair', type: 'noun', group: 'Body', gender: 'm', sentence: { es: 'Tiene el pelo largo.', en: 'She has long hair.' } },
  { es: 'pierna', en: 'leg', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Me duele la pierna.', en: 'My leg hurts.' } },

  // === ADJECTIVES (extra) ===
  { es: 'alto', en: 'tall', type: 'adj', group: 'Adjectives', sentence: { es: 'Mi padre es muy alto.', en: 'My father is very tall.' } },
  { es: 'bajo', en: 'short / low', type: 'adj', group: 'Adjectives', sentence: { es: 'Mi hermana es bajita.', en: 'My sister is short.' } },
  { es: 'joven', en: 'young', type: 'adj', group: 'Adjectives', sentence: { es: 'Es muy joven todavía.', en: 'He is still very young.' } },
  { es: 'contento', en: 'happy', type: 'adj', group: 'Adjectives', sentence: { es: 'Estoy muy contento hoy.', en: 'I am very happy today.' } },
  { es: 'cansado', en: 'tired', type: 'adj', group: 'Adjectives', sentence: { es: 'Estoy cansado, voy a dormir.', en: 'I am tired, I am going to sleep.' } },

  // === TIME (extra) ===
  { es: 'minuto', en: 'minute', type: 'noun', group: 'Time', gender: 'm', sentence: { es: 'Espera un minuto, por favor.', en: 'Wait a minute, please.' } },
  { es: 'hora', en: 'hour', type: 'noun', group: 'Time', gender: 'f', sentence: { es: '¿Qué hora es?', en: 'What time is it?' } },
  { es: 'semana', en: 'week', type: 'noun', group: 'Time', gender: 'f', sentence: { es: 'La semana tiene siete días.', en: 'The week has seven days.' } },
  { es: 'año', en: 'year', type: 'noun', group: 'Time', gender: 'm', sentence: { es: 'Tengo treinta años.', en: 'I am thirty years old.' } },

  // === CORE PHRASES (extra) ===
  { es: 'hasta luego', en: 'see you later', type: 'phrase', group: 'Core', sentence: { es: 'Hasta luego, amigo.', en: 'See you later, friend.' } },
  { es: 'salud', en: 'cheers / bless you', type: 'phrase', group: 'Core', sentence: { es: '¡Salud y suerte!', en: 'Cheers and good luck!' } },
  { es: 'suerte', en: 'good luck', type: 'phrase', group: 'Core', sentence: { es: 'Mucha suerte mañana.', en: 'Lots of luck tomorrow.' } },
  { es: 'buenas tardes', en: 'good afternoon', type: 'phrase', group: 'Core', sentence: { es: 'Buenas tardes, señor.', en: 'Good afternoon, sir.' } },
  { es: 'encantado', en: 'pleased to meet you', type: 'phrase', group: 'Core', sentence: { es: 'Encantado de conocerte.', en: 'Pleased to meet you.' } },

  // === VERBS (extra) ===
  { es: 'ayudar', en: 'to help', type: 'verb', group: 'Core', sentence: { es: '¿Puedes ayudarme?', en: 'Can you help me?' } },
  { es: 'esperar', en: 'to wait / hope', type: 'verb', group: 'Core', sentence: { es: 'Esperamos el tren.', en: 'We wait for the train.' } },
  { es: 'salir', en: 'to leave / go out', type: 'verb', group: 'Core', sentence: { es: 'Voy a salir esta noche.', en: 'I am going out tonight.' } },
  { es: 'llegar', en: 'to arrive', type: 'verb', group: 'Core', sentence: { es: 'El vuelo llega tarde.', en: 'The flight arrives late.' } },
  { es: 'leer', en: 'to read', type: 'verb', group: 'Core', sentence: { es: 'Me gusta leer libros.', en: 'I like to read books.' } },
  { es: 'escribir', en: 'to write', type: 'verb', group: 'Core', sentence: { es: 'Tengo que escribir un email.', en: 'I have to write an email.' } },
  { es: 'escuchar', en: 'to listen', type: 'verb', group: 'Core', sentence: { es: 'Me gusta escuchar música.', en: 'I like to listen to music.' } },
  { es: 'mirar', en: 'to watch / look', type: 'verb', group: 'Core', sentence: { es: 'Vamos a mirar la película.', en: 'We are going to watch the movie.' } },

  // === WEATHER ===
  { es: 'tiempo', en: 'weather / time', type: 'noun', group: 'Weather', gender: 'm', sentence: { es: '¿Qué tiempo hace?', en: 'What is the weather like?' } },
  { es: 'sol', en: 'sun', type: 'noun', group: 'Weather', gender: 'm', sentence: { es: 'Hace mucho sol hoy.', en: 'It is very sunny today.' } },
  { es: 'lluvia', en: 'rain', type: 'noun', group: 'Weather', gender: 'f', sentence: { es: 'La lluvia es buena para las plantas.', en: 'Rain is good for the plants.' } },
  { es: 'nieve', en: 'snow', type: 'noun', group: 'Weather', gender: 'f', sentence: { es: 'La nieve cubre las montañas.', en: 'Snow covers the mountains.' } },
  { es: 'viento', en: 'wind', type: 'noun', group: 'Weather', gender: 'm', sentence: { es: 'Hace mucho viento.', en: 'It is very windy.' } },
  { es: 'calor', en: 'heat', type: 'noun', group: 'Weather', gender: 'm', sentence: { es: 'En agosto hace mucho calor.', en: 'In August it is very hot.' } },

  // === ANIMALS ===
  { es: 'perro', en: 'dog', type: 'noun', group: 'Animals', gender: 'm', sentence: { es: 'Mi perro se llama Max.', en: 'My dog is called Max.' } },
  { es: 'gato', en: 'cat', type: 'noun', group: 'Animals', gender: 'm', sentence: { es: 'El gato duerme en el sofá.', en: 'The cat sleeps on the sofa.' } },
  { es: 'pájaro', en: 'bird', type: 'noun', group: 'Animals', gender: 'm', sentence: { es: 'El pájaro canta por la mañana.', en: 'The bird sings in the morning.' } },
  { es: 'caballo', en: 'horse', type: 'noun', group: 'Animals', gender: 'm', sentence: { es: 'Voy a montar a caballo.', en: 'I am going to ride a horse.' } },
  { es: 'vaca', en: 'cow', type: 'noun', group: 'Animals', gender: 'f', sentence: { es: 'La vaca da leche.', en: 'The cow gives milk.' } },
  { es: 'pez', en: 'fish (alive)', type: 'noun', group: 'Animals', gender: 'm', sentence: { es: 'El pez nada en el río.', en: 'The fish swims in the river.' } },

  // === CLOTHING ===
  { es: 'camisa', en: 'shirt', type: 'noun', group: 'Clothing', gender: 'f', sentence: { es: 'Llevo una camisa blanca.', en: 'I am wearing a white shirt.' } },
  { es: 'pantalón', en: 'pants / trousers', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Mis pantalones son nuevos.', en: 'My pants are new.' } },
  { es: 'zapato', en: 'shoe', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Mis zapatos son cómodos.', en: 'My shoes are comfortable.' } },
  { es: 'vestido', en: 'dress', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Compré un vestido nuevo.', en: 'I bought a new dress.' } },
  { es: 'sombrero', en: 'hat', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Lleva un sombrero negro.', en: 'He wears a black hat.' } },
  { es: 'abrigo', en: 'coat', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Necesitas un abrigo, hace frío.', en: "You need a coat, it's cold." } },
  { es: 'bolso', en: 'bag / purse', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Mi bolso es grande.', en: 'My bag is big.' } },
  { es: 'reloj', en: 'watch / clock', type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Mi reloj es de oro.', en: 'My watch is gold.' } },
];

// === VERB TABLE — Full 5-form Latin American conjugation (no vosotros) ===
export const VERB_TABLE = [
  {
    inf: 'hablar', en: 'to speak',
    conj: [
      { subj: 'Yo', es: 'hablo', en: 'I speak' },
      { subj: 'Tú', es: 'hablas', en: 'You speak' },
      { subj: 'Él/Ella', es: 'habla', en: 'He/She speaks' },
      { subj: 'Nosotros', es: 'hablamos', en: 'We speak' },
      { subj: 'Ustedes/Ellos', es: 'hablan', en: 'You all/They speak' },
    ]
  },
  {
    inf: 'beber', en: 'to drink',
    conj: [
      { subj: 'Yo', es: 'bebo', en: 'I drink' },
      { subj: 'Tú', es: 'bebes', en: 'You drink' },
      { subj: 'Él/Ella', es: 'bebe', en: 'He/She drinks' },
      { subj: 'Nosotros', es: 'bebemos', en: 'We drink' },
      { subj: 'Ustedes/Ellos', es: 'beben', en: 'You all/They drink' },
    ]
  },
  {
    inf: 'comer', en: 'to eat',
    conj: [
      { subj: 'Yo', es: 'como', en: 'I eat' },
      { subj: 'Tú', es: 'comes', en: 'You eat' },
      { subj: 'Él/Ella', es: 'come', en: 'He/She eats' },
      { subj: 'Nosotros', es: 'comemos', en: 'We eat' },
      { subj: 'Ustedes/Ellos', es: 'comen', en: 'You all/They eat' },
    ]
  },
  {
    inf: 'ser', en: 'to be (permanent)',
    conj: [
      { subj: 'Yo', es: 'soy', en: 'I am' },
      { subj: 'Tú', es: 'eres', en: 'You are' },
      { subj: 'Él/Ella', es: 'es', en: 'He/She/It is' },
      { subj: 'Nosotros', es: 'somos', en: 'We are' },
      { subj: 'Ustedes/Ellos', es: 'son', en: 'You all/They are' },
    ]
  },
  {
    inf: 'estar', en: 'to be (location)',
    conj: [
      { subj: 'Yo', es: 'estoy', en: 'I am' },
      { subj: 'Tú', es: 'estás', en: 'You are' },
      { subj: 'Él/Ella', es: 'está', en: 'He/She/It is' },
      { subj: 'Nosotros', es: 'estamos', en: 'We are' },
      { subj: 'Ustedes/Ellos', es: 'están', en: 'You all/They are' },
    ]
  },
  {
    inf: 'necesitar', en: 'to need',
    conj: [
      { subj: 'Yo', es: 'necesito', en: 'I need' },
      { subj: 'Tú', es: 'necesitas', en: 'You need' },
      { subj: 'Él/Ella', es: 'necesita', en: 'He/She needs' },
      { subj: 'Nosotros', es: 'necesitamos', en: 'We need' },
      { subj: 'Ustedes/Ellos', es: 'necesitan', en: 'You all/They need' },
    ]
  },
  {
    inf: 'tener', en: 'to have',
    conj: [
      { subj: 'Yo', es: 'tengo', en: 'I have' },
      { subj: 'Tú', es: 'tienes', en: 'You have' },
      { subj: 'Él/Ella', es: 'tiene', en: 'He/She has' },
      { subj: 'Nosotros', es: 'tenemos', en: 'We have' },
      { subj: 'Ustedes/Ellos', es: 'tienen', en: 'You all/They have' },
    ]
  },
  {
    inf: 'ir', en: 'to go',
    conj: [
      { subj: 'Yo', es: 'voy', en: 'I go' },
      { subj: 'Tú', es: 'vas', en: 'You go' },
      { subj: 'Él/Ella', es: 'va', en: 'He/She goes' },
      { subj: 'Nosotros', es: 'vamos', en: 'We go' },
      { subj: 'Ustedes/Ellos', es: 'van', en: 'You all/They go' },
    ]
  },
  {
    inf: 'querer', en: 'to want',
    conj: [
      { subj: 'Yo', es: 'quiero', en: 'I want' },
      { subj: 'Tú', es: 'quieres', en: 'You want' },
      { subj: 'Él/Ella', es: 'quiere', en: 'He/She wants' },
      { subj: 'Nosotros', es: 'queremos', en: 'We want' },
      { subj: 'Ustedes/Ellos', es: 'quieren', en: 'You all/They want' },
    ]
  },
  {
    inf: 'poder', en: 'can / to be able',
    conj: [
      { subj: 'Yo', es: 'puedo', en: 'I can' },
      { subj: 'Tú', es: 'puedes', en: 'You can' },
      { subj: 'Él/Ella', es: 'puede', en: 'He/She can' },
      { subj: 'Nosotros', es: 'podemos', en: 'We can' },
      { subj: 'Ustedes/Ellos', es: 'pueden', en: 'You all/They can' },
    ]
  },
  {
    inf: 'hacer', en: 'to do / make',
    conj: [
      { subj: 'Yo', es: 'hago', en: 'I do/make' },
      { subj: 'Tú', es: 'haces', en: 'You do/make' },
      { subj: 'Él/Ella', es: 'hace', en: 'He/She does/makes' },
      { subj: 'Nosotros', es: 'hacemos', en: 'We do/make' },
      { subj: 'Ustedes/Ellos', es: 'hacen', en: 'You all/They do/make' },
    ]
  },
];

export const NOUN_GROUPS = [
  { title: 'Food & Drink', words: [{ es: 'agua', g: 'f', en: 'water' }, { es: 'leche', g: 'f', en: 'milk' }, { es: 'pan', g: 'm', en: 'bread' }, { es: 'manzana', g: 'f', en: 'apple' }, { es: 'pollo', g: 'm', en: 'chicken' }, { es: 'carne', g: 'f', en: 'meat' }, { es: 'pescado', g: 'm', en: 'fish' }, { es: 'arroz', g: 'm', en: 'rice' }, { es: 'sopa', g: 'f', en: 'soup' }, { es: 'fruta', g: 'f', en: 'fruit' }, { es: 'verdura', g: 'f', en: 'vegetable' }, { es: 'café', g: 'm', en: 'coffee' }, { es: 'jugo', g: 'm', en: 'juice' }, { es: 'queso', g: 'm', en: 'cheese' }, { es: 'huevo', g: 'm', en: 'egg' }, { es: 'mantequilla', g: 'f', en: 'butter' }, { es: 'tomate', g: 'm', en: 'tomato' }, { es: 'ensalada', g: 'f', en: 'salad' }, { es: 'postre', g: 'm', en: 'dessert' }, { es: 'helado', g: 'm', en: 'ice cream' }] },
  { title: 'Family', words: [{ es: 'madre', g: 'f', en: 'mother' }, { es: 'padre', g: 'm', en: 'father' }, { es: 'hermano', g: 'm', en: 'brother' }, { es: 'hermana', g: 'f', en: 'sister' }, { es: 'hijo', g: 'm', en: 'son' }, { es: 'hija', g: 'f', en: 'daughter' }, { es: 'abuelo', g: 'm', en: 'grandfather' }, { es: 'abuela', g: 'f', en: 'grandmother' }, { es: 'esposo', g: 'm', en: 'husband' }, { es: 'esposa', g: 'f', en: 'wife' }, { es: 'tío', g: 'm', en: 'uncle' }, { es: 'tía', g: 'f', en: 'aunt' }, { es: 'primo', g: 'm', en: 'cousin (m)' }, { es: 'prima', g: 'f', en: 'cousin (f)' }] },
  { title: 'People', words: [{ es: 'hombre', g: 'm', en: 'man' }, { es: 'mujer', g: 'f', en: 'woman' }, { es: 'niño', g: 'm', en: 'boy' }, { es: 'niña', g: 'f', en: 'girl' }] },
  { title: 'Travel', words: [{ es: 'taxi', g: 'm', en: 'taxi' }, { es: 'hotel', g: 'm', en: 'hotel' }, { es: 'maleta', g: 'f', en: 'suitcase' }, { es: 'pasaporte', g: 'm', en: 'passport' }, { es: 'teléfono', g: 'm', en: 'telephone' }, { es: 'reserva', g: 'f', en: 'reservation' }, { es: 'aeropuerto', g: 'm', en: 'airport' }, { es: 'vuelo', g: 'm', en: 'flight' }, { es: 'boleto', g: 'm', en: 'ticket' }, { es: 'equipaje', g: 'm', en: 'luggage' }, { es: 'tren', g: 'm', en: 'train' }, { es: 'autobús', g: 'm', en: 'bus' }, { es: 'carro', g: 'm', en: 'car' }, { es: 'mapa', g: 'm', en: 'map' }] },
  { title: 'Places', words: [{ es: 'casa', g: 'f', en: 'house/home' }, { es: 'escuela', g: 'f', en: 'school' }, { es: 'tienda', g: 'f', en: 'store' }, { es: 'restaurante', g: 'm', en: 'restaurant' }, { es: 'hospital', g: 'm', en: 'hospital' }, { es: 'banco', g: 'm', en: 'bank' }, { es: 'ciudad', g: 'f', en: 'city' }, { es: 'calle', g: 'f', en: 'street' }, { es: 'playa', g: 'f', en: 'beach' }, { es: 'país', g: 'm', en: 'country' }, { es: 'parque', g: 'm', en: 'park' }, { es: 'mercado', g: 'm', en: 'market' }, { es: 'iglesia', g: 'f', en: 'church' }, { es: 'museo', g: 'm', en: 'museum' }] },
  { title: 'Body', words: [{ es: 'cabeza', g: 'f', en: 'head' }, { es: 'mano', g: 'f', en: 'hand' }, { es: 'pie', g: 'm', en: 'foot' }, { es: 'ojo', g: 'm', en: 'eye' }, { es: 'boca', g: 'f', en: 'mouth' }, { es: 'nariz', g: 'f', en: 'nose' }, { es: 'oreja', g: 'f', en: 'ear' }, { es: 'brazo', g: 'm', en: 'arm' }, { es: 'corazón', g: 'm', en: 'heart' }, { es: 'dedo', g: 'm', en: 'finger' }, { es: 'pelo', g: 'm', en: 'hair' }, { es: 'pierna', g: 'f', en: 'leg' }] },
  { title: 'Animals', words: [{ es: 'perro', g: 'm', en: 'dog' }, { es: 'gato', g: 'm', en: 'cat' }, { es: 'pájaro', g: 'm', en: 'bird' }, { es: 'caballo', g: 'm', en: 'horse' }, { es: 'vaca', g: 'f', en: 'cow' }, { es: 'pez', g: 'm', en: 'fish' }] },
  { title: 'Clothing', words: [{ es: 'camisa', g: 'f', en: 'shirt' }, { es: 'pantalón', g: 'm', en: 'pants' }, { es: 'zapato', g: 'm', en: 'shoe' }, { es: 'vestido', g: 'm', en: 'dress' }, { es: 'sombrero', g: 'm', en: 'hat' }, { es: 'abrigo', g: 'm', en: 'coat' }, { es: 'bolso', g: 'm', en: 'bag' }, { es: 'reloj', g: 'm', en: 'watch' }] },
  { title: 'Weather', words: [{ es: 'tiempo', g: 'm', en: 'weather' }, { es: 'sol', g: 'm', en: 'sun' }, { es: 'lluvia', g: 'f', en: 'rain' }, { es: 'nieve', g: 'f', en: 'snow' }, { es: 'viento', g: 'm', en: 'wind' }, { es: 'calor', g: 'm', en: 'heat' }] },
  { title: 'Colours', words: [{ es: 'rojo', g: null, en: 'red' }, { es: 'azul', g: null, en: 'blue' }, { es: 'verde', g: null, en: 'green' }, { es: 'amarillo', g: null, en: 'yellow' }, { es: 'blanco', g: null, en: 'white' }, { es: 'negro', g: null, en: 'black' }, { es: 'naranja', g: null, en: 'orange' }, { es: 'gris', g: null, en: 'grey' }, { es: 'morado', g: null, en: 'purple' }, { es: 'rosa', g: null, en: 'pink' }, { es: 'marrón', g: null, en: 'brown' }] },
  { title: 'Days', words: [{ es: 'lunes', g: 'm', en: 'monday' }, { es: 'martes', g: 'm', en: 'tuesday' }, { es: 'miércoles', g: 'm', en: 'wednesday' }, { es: 'jueves', g: 'm', en: 'thursday' }, { es: 'viernes', g: 'm', en: 'friday' }, { es: 'sábado', g: 'm', en: 'saturday' }, { es: 'domingo', g: 'm', en: 'sunday' }] },
];
