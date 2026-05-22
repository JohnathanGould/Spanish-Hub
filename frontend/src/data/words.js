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

export const MASTER = [ { es: 'hola', en: 'hello', type: 'phrase', group:
'Core', sentence: { es: '¡Hola! ¿Cómo estás?', en: 'Hello! How are you?' } ,
contextSentence: "¡Hola! ¿Cómo estás?", imageUrl: "", theme: "greetings" }, {
es: 'adiós', en: 'goodbye', type: 'phrase', group: 'Core', sentence: { es:
'Adiós, hasta mañana.', en: 'Goodbye, see you tomorrow.' } , contextSentence:
"Adiós, hasta mañana.", imageUrl: "", theme: "greetings" }, { es: 'gracias', en:
'thank you', type: 'phrase', group: 'Core', sentence: { es: 'Muchas gracias por
tu ayuda.', en: 'Thank you very much for your help.' } , contextSentence:
"Muchas gracias por tu ayuda.", imageUrl: "", theme: "greetings" }, { es: 'de
nada', en: "you're welcome", type: 'phrase', group: 'Core', sentence: { es: 'De
nada, fue un placer.', en: "You're welcome, it was a pleasure." } ,
contextSentence: "De nada, fue un placer.", imageUrl: "", theme: "greetings" },
{ es: 'por favor', en: 'please', type: 'phrase', group: 'Core', sentence: { es:
'Un café, por favor.', en: 'A coffee, please.' } , contextSentence: "Un café,
por favor.", imageUrl: "", theme: "restaurant" }, { es: 'disculpe', en: 'excuse
me', type: 'phrase', group: 'Core', sentence: { es: 'Disculpe, ¿dónde está el
hotel?', en: 'Excuse me, where is the hotel?' } , contextSentence: "Disculpe,
¿dónde está el hotel?", imageUrl: "", theme: "travel" }, { es: 'perdón', en:
'pardon / sorry', type: 'phrase', group: 'Core', sentence: { es: 'Perdón, no
entiendo.', en: "Pardon, I don't understand." } , contextSentence: "Perdón, no
entiendo.", imageUrl: "", theme: "greetings" }, { es: 'lo siento', en: "i'm
sorry", type: 'phrase', group: 'Core', sentence: { es: 'Lo siento mucho.', en:
"I'm very sorry." } , contextSentence: "Lo siento mucho.", imageUrl: "", theme:
"greetings" }, { es: 'mucho gusto', en: 'nice to meet you', type: 'phrase',
group: 'Core', sentence: { es: 'Mucho gusto, me llamo Juan.', en: 'Nice to meet
you, my name is Juan.' } , contextSentence: "Mucho gusto, me llamo Juan.",
imageUrl: "", theme: "greetings" }, { es: 'buenos días', en: 'good morning',
type: 'phrase', group: 'Core', sentence: { es: 'Buenos días, ¿cómo amaneciste?',
en: 'Good morning, how did you wake up?' } , contextSentence: "Buenos días,
¿cómo amaneciste?", imageUrl: "", theme: "greetings" }, { es: 'buenas noches',
en: 'good night', type: 'phrase', group: 'Core', sentence: { es: 'Buenas noches,
hasta mañana.', en: 'Good night, see you tomorrow.' } , contextSentence: "Buenas
noches, hasta mañana.", imageUrl: "", theme: "greetings" }, { es: 'sí', en:
'yes', type: 'adv', group: 'Core', sentence: { es: 'Sí, quiero café.', en: 'Yes,
I want coffee.' } , contextSentence: "Sí, quiero café.", imageUrl: "", theme:
"restaurant" }, { es: 'no', en: 'no', type: 'adv', group: 'Core', sentence: {
es: 'No, gracias.', en: 'No, thank you.' } , contextSentence: "No, gracias.",
imageUrl: "", theme: "greetings" }, { es: 'y', en: 'and', type: 'adv', group:
'Core', sentence: { es: 'Pan y agua, por favor.', en: 'Bread and water, please.'
} , contextSentence: "Pan y agua, por favor.", imageUrl: "", theme: "restaurant"
}, { es: 'aquí', en: 'here', type: 'adv', group: 'Core', sentence: { es: 'Estoy
aquí.', en: 'I am here.' } , contextSentence: "Estoy aquí.", imageUrl: "",
theme: "descriptions" }, { es: 'dónde', en: 'where', type: 'adv', group: 'Core',
sentence: { es: '¿Dónde está el baño?', en: 'Where is the bathroom?' } ,
contextSentence: "¿Dónde está el baño?", imageUrl: "", theme: "home" }, { es:
'con', en: 'with', type: 'other', group: 'Core', sentence: { es: 'Café con
leche.', en: 'Coffee with milk.' } , contextSentence: "Café con leche.",
imageUrl: "", theme: "restaurant" }, { es: 'en', en: 'in / at / on', type:
'other', group: 'Core', sentence: { es: 'Estoy en el hotel.', en: 'I am at the
hotel.' } , contextSentence: "Estoy en el hotel.", imageUrl: "", theme: "travel"
}, { es: 'español', en: 'spanish', type: 'adj', group: 'Core', sentence: { es:
'Hablo español todos los días.', en: 'I speak Spanish every day.' } ,
contextSentence: "Hablo español todos los días.", imageUrl: "", theme:
"descriptions" }, { es: 'inglés', en: 'english', type: 'adj', group: 'Core',
sentence: { es: '¿Hablas inglés?', en: 'Do you speak English?' } ,
contextSentence: "¿Hablas inglés?", imageUrl: "", theme: "descriptions" }, { es:
'mi', en: 'my', type: 'adj', group: 'Core', sentence: { es: 'Necesito mi
pasaporte.', en: 'I need my passport.' } , contextSentence: "Necesito mi
pasaporte.", imageUrl: "", theme: "travel" }, { es: 'el', en: 'the (m)', type:
'article', group: 'Core', sentence: { es: 'El hombre habla español.', en: 'The
man speaks Spanish.' } , contextSentence: "El hombre habla español.", imageUrl:
"", theme: "descriptions" }, { es: 'la', en: 'the (f)', type: 'article', group:
'Core', sentence: { es: 'La mujer come pan.', en: 'The woman eats bread.' } ,
contextSentence: "La mujer come pan.", imageUrl: "", theme: "descriptions" }, {
es: 'un', en: 'a (m)', type: 'article', group: 'Core', sentence: { es: 'Necesito
un taxi.', en: 'I need a taxi.' } , contextSentence: "Necesito un taxi.",
imageUrl: "", theme: "travel" }, { es: 'una', en: 'a (f)', type: 'article',
group: 'Core', sentence: { es: 'Quiero una reserva.', en: 'I want a
reservation.' } , contextSentence: "Quiero una reserva.", imageUrl: "", theme:
"travel" }, { es: 'yo', en: 'i', type: 'pronoun', group: 'Core', sentence: { es:
'Yo hablo español.', en: 'I speak Spanish.' } , contextSentence: "Yo hablo
español.", imageUrl: "", theme: "descriptions" }, { es: 'tú', en: 'you', type:
'pronoun', group: 'Core', sentence: { es: 'Tú hablas muy bien.', en: 'You speak
very well.' } , contextSentence: "Tú hablas muy bien.", imageUrl: "", theme:
"descriptions" }, { es: 'él', en: 'he', type: 'pronoun', group: 'Core',
sentence: { es: 'Él come mucho.', en: 'He eats a lot.' } , contextSentence: "Él
come mucho.", imageUrl: "", theme: "descriptions" }, { es: 'ella', en: 'she',
type: 'pronoun', group: 'Core', sentence: { es: 'Ella bebe agua.', en: 'She
drinks water.' } , contextSentence: "Ella bebe agua.", imageUrl: "", theme:
"descriptions" }, { es: 'hablar', en: 'to speak', type: 'verb', group: 'Core',
sentence: { es: 'Me gusta hablar español.', en: 'I like to speak Spanish.' } ,
contextSentence: "Me gusta hablar español.", imageUrl: "", theme: "descriptions"
}, { es: 'beber', en: 'to drink', type: 'verb', group: 'Core', sentence: { es:
'Necesito beber agua.', en: 'I need to drink water.' } , contextSentence:
"Necesito beber agua.", imageUrl: "", theme: "restaurant" }, { es: 'comer', en:
'to eat', type: 'verb', group: 'Core', sentence: { es: 'Quiero comer tacos.',
en: 'I want to eat tacos.' } , contextSentence: "Quiero comer tacos.", imageUrl:
"", theme: "restaurant" }, { es: 'ser', en: 'to be', type: 'verb', group:
'Core', sentence: { es: 'Quiero ser médico.', en: 'I want to be a doctor.' } ,
contextSentence: "Quiero ser médico.", imageUrl: "", theme: "health" }, { es:
'estar', en: 'to be (location)', type: 'verb', group: 'Core', sentence: { es:
'Voy a estar en el hotel.', en: 'I am going to be at the hotel.' } ,
contextSentence: "Voy a estar en el hotel.", imageUrl: "", theme: "travel" }, {
es: 'necesitar', en: 'to need', type: 'verb', group: 'Core', sentence: { es:
'Necesito ayuda.', en: 'I need help.' } , contextSentence: "Necesito ayuda.",
imageUrl: "", theme: "greetings" }, { es: 'tener', en: 'to have', type: 'verb',
group: 'Core', sentence: { es: 'Tengo que ir.', en: 'I have to go.' } ,
contextSentence: "Tengo que ir.", imageUrl: "", theme: "descriptions" }, { es:
'ir', en: 'to go', type: 'verb', group: 'Core', sentence: { es: 'Voy a ir al
restaurante.', en: 'I am going to the restaurant.' } , contextSentence: "Voy a
ir al restaurante.", imageUrl: "", theme: "travel" }, { es: 'querer', en: 'to
want', type: 'verb', group: 'Core', sentence: { es: 'Quiero aprender español.',
en: 'I want to learn Spanish.' } , contextSentence: "Quiero aprender español.",
imageUrl: "", theme: "descriptions" }, { es: 'poder', en: 'can / to be able',
type: 'verb', group: 'Core', sentence: { es: '¿Puedes ayudarme?', en: 'Can you
help me?' } , contextSentence: "¿Puedes ayudarme?", imageUrl: "", theme:
"greetings" }, { es: 'saber', en: 'to know', type: 'verb', group: 'Core',
sentence: { es: 'No sé dónde está.', en: "I don't know where it is." } ,
contextSentence: "No sé dónde está.", imageUrl: "", theme: "descriptions" }, {
es: 'hacer', en: 'to do / make', type: 'verb', group: 'Core', sentence: { es:
'¿Qué haces hoy?', en: 'What are you doing today?' } , contextSentence: "¿Qué
haces hoy?", imageUrl: "", theme: "descriptions" }, { es: 'decir', en: 'to say',
type: 'verb', group: 'Core', sentence: { es: '¿Qué quieres decir?', en: 'What do
you mean?' } , contextSentence: "¿Qué quieres decir?", imageUrl: "", theme:
"descriptions" }, { es: 'ver', en: 'to see', type: 'verb', group: 'Core',
sentence: { es: 'Quiero ver la ciudad.', en: 'I want to see the city.' } ,
contextSentence: "Quiero ver la ciudad.", imageUrl: "", theme: "travel" }, { es:
'venir', en: 'to come', type: 'verb', group: 'Core', sentence: { es: '¿Puedes
venir mañana?', en: 'Can you come tomorrow?' } , contextSentence: "¿Puedes venir
mañana?", imageUrl: "", theme: "descriptions" }, { es: 'comprar', en: 'to buy',
type: 'verb', group: 'Core', sentence: { es: 'Quiero comprar pan.', en: 'I want
to buy bread.' } , contextSentence: "Quiero comprar pan.", imageUrl: "", theme:
"shopping" }, { es: 'trabajar', en: 'to work', type: 'verb', group: 'Core',
sentence: { es: 'Trabajo en un banco.', en: 'I work at a bank.' } ,
contextSentence: "Trabajo en un banco.", imageUrl: "", theme: "shopping" }, {
es: 'vivir', en: 'to live', type: 'verb', group: 'Core', sentence: { es: 'Vivo
en la ciudad.', en: 'I live in the city.' } , contextSentence: "Vivo en la
ciudad.", imageUrl: "", theme: "home" }, { es: 'dormir', en: 'to sleep', type:
'verb', group: 'Core', sentence: { es: 'Necesito dormir.', en: 'I need to
sleep.' } , contextSentence: "Necesito dormir.", imageUrl: "", theme: "health"
}, { es: 'caminar', en: 'to walk', type: 'verb', group: 'Core', sentence: { es:
'Me gusta caminar por la calle.', en: 'I like to walk through the street.' } ,
contextSentence: "Me gusta caminar por la calle.", imageUrl: "", theme: "nature"
}, { es: 'llevar', en: 'to carry / wear', type: 'verb', group: 'Core', sentence:
{ es: 'Llevo mi maleta.', en: 'I carry my suitcase.' } , contextSentence: "Llevo
mi maleta.", imageUrl: "", theme: "travel" }, { es: 'hablo', en: 'i speak',
type: 'verb', group: 'Core', sentence: { es: 'Hablo español e inglés.', en: 'I
speak Spanish and English.' } , contextSentence: "Hablo español e inglés.",
imageUrl: "", theme: "descriptions" }, { es: 'hablas', en: 'you speak', type:
'verb', group: 'Core', sentence: { es: 'Hablas muy bien el español.', en: 'You
speak Spanish very well.' } , contextSentence: "Hablas muy bien el español.",
imageUrl: "", theme: "descriptions" }, { es: 'habla', en: 'he/she speaks', type:
'verb', group: 'Core', sentence: { es: 'Ella habla tres idiomas.', en: 'She
speaks three languages.' } , contextSentence: "Ella habla tres idiomas.",
imageUrl: "", theme: "descriptions" }, { es: 'bebo', en: 'i drink', type:
'verb', group: 'Core', sentence: { es: 'Bebo café por la mañana.', en: 'I drink
coffee in the morning.' } , contextSentence: "Bebo café por la mañana.",
imageUrl: "", theme: "restaurant" }, { es: 'bebes', en: 'you drink', type:
'verb', group: 'Core', sentence: { es: '¿Bebes agua con las comidas?', en: 'Do
you drink water with meals?' } , contextSentence: "¿Bebes agua con las
comidas?", imageUrl: "", theme: "restaurant" }, { es: 'bebe', en: 'he/she
drinks', type: 'verb', group: 'Core', sentence: { es: 'Él bebe leche todos los
días.', en: 'He drinks milk every day.' } , contextSentence: "Él bebe leche
todos los días.", imageUrl: "", theme: "restaurant" }, { es: 'como', en: 'i
eat', type: 'verb', group: 'Core', sentence: { es: 'Como pan con mantequilla.',
en: 'I eat bread with butter.' } , contextSentence: "Como pan con mantequilla.",
imageUrl: "", theme: "restaurant" }, { es: 'comes', en: 'you eat', type: 'verb',
group: 'Core', sentence: { es: '¿Comes mucho?', en: 'Do you eat a lot?' } ,
contextSentence: "¿Comes mucho?", imageUrl: "", theme: "restaurant" }, { es:
'come', en: 'he/she eats', type: 'verb', group: 'Core', sentence: { es: 'Él come
pollo cada día.', en: 'He eats chicken every day.' } , contextSentence: "Él come
pollo cada día.", imageUrl: "", theme: "restaurant" }, { es: 'soy', en: 'i am',
type: 'verb', group: 'Core', sentence: { es: 'Soy estudiante de español.', en:
'I am a student of Spanish.' } , contextSentence: "Soy estudiante de español.",
imageUrl: "", theme: "descriptions" }, { es: 'eres', en: 'you are', type:
'verb', group: 'Core', sentence: { es: 'Eres muy amable.', en: 'You are very
kind.' } , contextSentence: "Eres muy amable.", imageUrl: "", theme:
"descriptions" }, { es: 'es', en: 'he/she/it is', type: 'verb', group: 'Core',
sentence: { es: 'Ella es mi madre.', en: 'She is my mother.' } ,
contextSentence: "Ella es mi madre.", imageUrl: "", theme: "family" }, { es:
'estoy', en: 'i am (location)', type: 'verb', group: 'Core', sentence: { es:
'Estoy en el aeropuerto.', en: 'I am at the airport.' } , contextSentence:
"Estoy en el aeropuerto.", imageUrl: "", theme: "travel" }, { es: 'estás', en:
'you are (location)', type: 'verb', group: 'Core', sentence: { es: '¿Estás en
casa?', en: 'Are you at home?' } , contextSentence: "¿Estás en casa?", imageUrl:
"", theme: "home" }, { es: 'está', en: 'he/she/it is (location)', type: 'verb',
group: 'Core', sentence: { es: 'El hotel está aquí.', en: 'The hotel is here.' }
, contextSentence: "El hotel está aquí.", imageUrl: "", theme: "travel" }, { es:
'necesito', en: 'i need', type: 'verb', group: 'Core', sentence: { es: 'Necesito
mi pasaporte.', en: 'I need my passport.' } , contextSentence: "Necesito mi
pasaporte.", imageUrl: "", theme: "travel" }, { es: 'necesitas', en: 'you need',
type: 'verb', group: 'Core', sentence: { es: '¿Necesitas ayuda?', en: 'Do you
need help?' } , contextSentence: "¿Necesitas ayuda?", imageUrl: "", theme:
"greetings" }, { es: 'necesita', en: 'he/she needs', type: 'verb', group:
'Core', sentence: { es: 'Ella necesita un taxi.', en: 'She needs a taxi.' } ,
contextSentence: "Ella necesita un taxi.", imageUrl: "", theme: "travel" }, {
es: 'tengo', en: 'i have', type: 'verb', group: 'Core', sentence: { es: 'Tengo
una reserva.', en: 'I have a reservation.' } , contextSentence: "Tengo una
reserva.", imageUrl: "", theme: "travel" }, { es: 'tienes', en: 'you have',
type: 'verb', group: 'Core', sentence: { es: '¿Tienes mi pasaporte?', en: 'Do
you have my passport?' } , contextSentence: "¿Tienes mi pasaporte?", imageUrl:
"", theme: "travel" }, { es: 'tiene', en: 'he/she has', type: 'verb', group:
'Core', sentence: { es: 'Él tiene una maleta grande.', en: 'He has a large
suitcase.' } , contextSentence: "Él tiene una maleta grande.", imageUrl: "",
theme: "travel" }, { es: 'voy', en: 'i go', type: 'verb', group: 'Core',
sentence: { es: 'Voy al restaurante.', en: 'I go to the restaurant.' } ,
contextSentence: "Voy al restaurante.", imageUrl: "", theme: "restaurant" }, {
es: 'vas', en: 'you go', type: 'verb', group: 'Core', sentence: { es: '¿Adónde
vas?', en: 'Where are you going?' } , contextSentence: "¿Adónde vas?", imageUrl:
"", theme: "travel" }, { es: 'va', en: 'he/she goes', type: 'verb', group:
'Core', sentence: { es: 'Ella va al banco.', en: 'She goes to the bank.' } ,
contextSentence: "Ella va al banco.", imageUrl: "", theme: "shopping" }, { es:
'quiero', en: 'i want', type: 'verb', group: 'Core', sentence: { es: 'Quiero una
habitación, por favor.', en: 'I want a room, please.' } , contextSentence:
"Quiero una habitación, por favor.", imageUrl: "", theme: "travel" }, { es:
'quieres', en: 'you want', type: 'verb', group: 'Core', sentence: { es: '¿Qué
quieres comer?', en: 'What do you want to eat?' } , contextSentence: "¿Qué
quieres comer?", imageUrl: "", theme: "restaurant" }, { es: 'quiere', en:
'he/she wants', type: 'verb', group: 'Core', sentence: { es: 'Él quiere un
café.', en: 'He wants a coffee.' } , contextSentence: "Él quiere un café.",
imageUrl: "", theme: "restaurant" }, { es: 'puedo', en: 'i can', type: 'verb',
group: 'Core', sentence: { es: 'Puedo hablar español.', en: 'I can speak
Spanish.' } , contextSentence: "Puedo hablar español.", imageUrl: "", theme:
"descriptions" }, { es: 'puedes', en: 'you can', type: 'verb', group: 'Core',
sentence: { es: '¿Puedes repetir, por favor?', en: 'Can you repeat, please?' } ,
contextSentence: "¿Puedes repetir, por favor?", imageUrl: "", theme: "greetings"
}, { es: 'puede', en: 'he/she can', type: 'verb', group: 'Core', sentence: { es:
'Ella puede ayudarte.', en: 'She can help you.' } , contextSentence: "Ella puede
ayudarte.", imageUrl: "", theme: "greetings" }, { es: 'hago', en: 'i do / make',
type: 'verb', group: 'Core', sentence: { es: 'Hago café todas las mañanas.', en:
'I make coffee every morning.' } , contextSentence: "Hago café todas las
mañanas.", imageUrl: "", theme: "restaurant" }, { es: 'haces', en: 'you do /
make', type: 'verb', group: 'Core', sentence: { es: '¿Qué haces?', en: 'What are
you doing?' } , contextSentence: "¿Qué haces?", imageUrl: "", theme:
"descriptions" }, { es: 'hace', en: 'he/she does / makes', type: 'verb', group:
'Core', sentence: { es: 'Ella hace ejercicio cada día.', en: 'She exercises
every day.' } , contextSentence: "Ella hace ejercicio cada día.", imageUrl: "",
theme: "health" }, { es: 'hombre', en: 'man', type: 'noun', group: 'Core',
gender: 'm', sentence: { es: 'El hombre habla español.', en: 'The man speaks
Spanish.' } , contextSentence: "El hombre habla español.", imageUrl: "", theme:
"descriptions" }, { es: 'mujer', en: 'woman', type: 'noun', group: 'Core',
gender: 'f', sentence: { es: 'La mujer trabaja en el hospital.', en: 'The woman
works at the hospital.' } , contextSentence: "La mujer trabaja en el hospital.",
imageUrl: "", theme: "health" }, { es: 'niño', en: 'boy', type: 'noun', group:
'Core', gender: 'm', sentence: { es: 'El niño come una manzana.', en: 'The boy
eats an apple.' } , contextSentence: "El niño come una manzana.", imageUrl: "",
theme: "family" }, { es: 'niña', en: 'girl', type: 'noun', group: 'Core',
gender: 'f', sentence: { es: 'La niña bebe leche.', en: 'The girl drinks milk.'
} , contextSentence: "La niña bebe leche.", imageUrl: "", theme: "family" }, {
es: 'agua', en: 'water', type: 'noun', group: 'Food & Drink', gender: 'f',
sentence: { es: 'Necesito un vaso de agua.', en: 'I need a glass of water.' } ,
contextSentence: "Necesito un vaso de agua.", imageUrl: "", theme: "restaurant"
}, { es: 'leche', en: 'milk', type: 'noun', group: 'Food & Drink', gender: 'f',
sentence: { es: 'El niño bebe leche.', en: 'The boy drinks milk.' } ,
contextSentence: "El niño bebe leche.", imageUrl: "", theme: "restaurant" }, {
es: 'pan', en: 'bread', type: 'noun', group: 'Food & Drink', gender: 'm',
sentence: { es: 'Quiero pan con mantequilla.', en: 'I want bread with butter.' }
, contextSentence: "Quiero pan con mantequilla.", imageUrl: "", theme:
"restaurant" }, { es: 'manzana', en: 'apple', type: 'noun', group: 'Food &
Drink', gender: 'f', sentence: { es: 'Como una manzana cada día.', en: 'I eat an
apple every day.' } , contextSentence: "Como una manzana cada día.", imageUrl:
"", theme: "restaurant" }, { es: 'pollo', en: 'chicken', type: 'noun', group:
'Food & Drink', gender: 'm', sentence: { es: 'El pollo está muy rico.', en: 'The
chicken is very delicious.' } , contextSentence: "El pollo está muy rico.",
imageUrl: "", theme: "restaurant" }, { es: 'carne', en: 'meat', type: 'noun',
group: 'Food & Drink', gender: 'f', sentence: { es: 'Como carne los domingos.',
en: 'I eat meat on Sundays.' } , contextSentence: "Como carne los domingos.",
imageUrl: "", theme: "restaurant" }, { es: 'pescado', en: 'fish', type: 'noun',
group: 'Food & Drink', gender: 'm', sentence: { es: 'El pescado fresco es muy
bueno.', en: 'Fresh fish is very good.' } , contextSentence: "El pescado fresco
es muy bueno.", imageUrl: "", theme: "restaurant" }, { es: 'arroz', en: 'rice',
type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es: 'El arroz con
pollo es delicioso.', en: 'Rice with chicken is delicious.' } , contextSentence:
"El arroz con pollo es delicioso.", imageUrl: "", theme: "restaurant" }, { es:
'café', en: 'coffee', type: 'noun', group: 'Food & Drink', gender: 'm',
sentence: { es: 'Tomo un café por la mañana.', en: 'I have a coffee in the
morning.' } , contextSentence: "Tomo un café por la mañana.", imageUrl: "",
theme: "restaurant" }, { es: 'jugo', en: 'juice', type: 'noun', group: 'Food &
Drink', gender: 'm', sentence: { es: 'Quiero jugo de naranja, por favor.', en:
'I want orange juice, please.' } , contextSentence: "Quiero jugo de naranja, por
favor.", imageUrl: "", theme: "restaurant" }, { es: 'sopa', en: 'soup', type:
'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'La sopa está
caliente.', en: 'The soup is hot.' } , contextSentence: "La sopa está
caliente.", imageUrl: "", theme: "restaurant" }, { es: 'fruta', en: 'fruit',
type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Como fruta
todos los días.', en: 'I eat fruit every day.' } , contextSentence: "Como fruta
todos los días.", imageUrl: "", theme: "nature" }, { es: 'verdura', en:
'vegetable', type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es:
'Las verduras son muy sanas.', en: 'Vegetables are very healthy.' } ,
contextSentence: "Las verduras son muy sanas.", imageUrl: "", theme: "nature" },
{ es: 'queso', en: 'cheese', type: 'noun', group: 'Food & Drink', gender: 'm',
sentence: { es: 'El queso mexicano es muy bueno.', en: 'Mexican cheese is very
good.' } , contextSentence: "El queso mexicano es muy bueno.", imageUrl: "",
theme: "restaurant" }, { es: 'madre', en: 'mother', type: 'noun', group:
'Family', gender: 'f', sentence: { es: 'Mi madre habla español muy bien.', en:
'My mother speaks Spanish very well.' } , contextSentence: "Mi madre habla
español muy bien.", imageUrl: "", theme: "family" }, { es: 'padre', en:
'father', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi padre
trabaja en un banco.', en: 'My father works at a bank.' } , contextSentence: "Mi
padre trabaja en un banco.", imageUrl: "", theme: "family" }, { es: 'hermano',
en: 'brother', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi
hermano vive en la Ciudad de México.', en: 'My brother lives in Mexico City.' }
, contextSentence: "Mi hermano vive en la Ciudad de México.", imageUrl: "",
theme: "family" }, { es: 'hermana', en: 'sister', type: 'noun', group: 'Family',
gender: 'f', sentence: { es: 'Mi hermana es médica.', en: 'My sister is a
doctor.' } , contextSentence: "Mi hermana es médica.", imageUrl: "", theme:
"family" }, { es: 'hijo', en: 'son', type: 'noun', group: 'Family', gender: 'm',
sentence: { es: 'Mi hijo estudia español.', en: 'My son studies Spanish.' } ,
contextSentence: "Mi hijo estudia español.", imageUrl: "", theme: "family" }, {
es: 'hija', en: 'daughter', type: 'noun', group: 'Family', gender: 'f',
sentence: { es: 'Mi hija tiene cinco años.', en: 'My daughter is five years
old.' } , contextSentence: "Mi hija tiene cinco años.", imageUrl: "", theme:
"family" }, { es: 'abuelo', en: 'grandfather', type: 'noun', group: 'Family',
gender: 'm', sentence: { es: 'Mi abuelo es muy sabio.', en: 'My grandfather is
very wise.' } , contextSentence: "Mi abuelo es muy sabio.", imageUrl: "", theme:
"family" }, { es: 'abuela', en: 'grandmother', type: 'noun', group: 'Family',
gender: 'f', sentence: { es: 'Mi abuela hace una sopa deliciosa.', en: 'My
grandmother makes a delicious soup.' } , contextSentence: "Mi abuela hace una
sopa deliciosa.", imageUrl: "", theme: "family" }, { es: 'esposo', en:
'husband', type: 'noun', group: 'Family', gender: 'm', sentence: { es: 'Mi
esposo habla español.', en: 'My husband speaks Spanish.' } , contextSentence:
"Mi esposo habla español.", imageUrl: "", theme: "family" }, { es: 'esposa', en:
'wife', type: 'noun', group: 'Family', gender: 'f', sentence: { es: 'Mi esposa
trabaja en el hospital.', en: 'My wife works at the hospital.' } ,
contextSentence: "Mi esposa trabaja en el hospital.", imageUrl: "", theme:
"family" }, { es: 'teléfono', en: 'telephone', type: 'noun', group: 'Travel',
gender: 'm', sentence: { es: 'Necesito mi teléfono.', en: 'I need my telephone.'
} , contextSentence: "Necesito mi teléfono.", imageUrl: "", theme: "shopping" },
{ es: 'maleta', en: 'suitcase', type: 'noun', group: 'Travel', gender: 'f',
sentence: { es: 'Mi maleta es muy pesada.', en: 'My suitcase is very heavy.' } ,
contextSentence: "Mi maleta es muy pesada.", imageUrl: "", theme: "travel" }, {
es: 'taxi', en: 'taxi', type: 'noun', group: 'Travel', gender: 'm', sentence: {
es: 'Necesito un taxi al aeropuerto.', en: 'I need a taxi to the airport.' } ,
contextSentence: "Necesito un taxi al aeropuerto.", imageUrl: "", theme:
"travel" }, { es: 'pasaporte', en: 'passport', type: 'noun', group: 'Travel',
gender: 'm', sentence: { es: 'No tengo mi pasaporte.', en: "I don't have my
passport." } , contextSentence: "No tengo mi pasaporte.", imageUrl: "", theme:
"travel" }, { es: 'hotel', en: 'hotel', type: 'noun', group: 'Travel', gender:
'm', sentence: { es: 'El hotel está en el centro.', en: 'The hotel is in the
center.' } , contextSentence: "El hotel está en el centro.", imageUrl: "",
theme: "travel" }, { es: 'reserva', en: 'reservation', type: 'noun', group:
'Travel', gender: 'f', sentence: { es: 'Tengo una reserva para dos personas.',
en: 'I have a reservation for two people.' } , contextSentence: "Tengo una
reserva para dos personas.", imageUrl: "", theme: "travel" }, { es: 'casa', en:
'house / home', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'Mi
casa está cerca del banco.', en: 'My house is near the bank.' } ,
contextSentence: "Mi casa está cerca del banco.", imageUrl: "", theme: "home" },
{ es: 'escuela', en: 'school', type: 'noun', group: 'Places', gender: 'f',
sentence: { es: 'Mi hijo va a la escuela.', en: 'My son goes to school.' } ,
contextSentence: "Mi hijo va a la escuela.", imageUrl: "", theme: "descriptions"
}, { es: 'tienda', en: 'store / shop', type: 'noun', group: 'Places', gender:
'f', sentence: { es: 'La tienda está abierta.', en: 'The store is open.' } ,
contextSentence: "La tienda está abierta.", imageUrl: "", theme: "shopping" }, {
es: 'restaurante', en: 'restaurant', type: 'noun', group: 'Places', gender: 'm',
sentence: { es: 'El restaurante tiene muy buena comida.', en: 'The restaurant
has very good food.' } , contextSentence: "El restaurante tiene muy buena
comida.", imageUrl: "", theme: "restaurant" }, { es: 'hospital', en: 'hospital',
type: 'noun', group: 'Places', gender: 'm', sentence: { es: 'El hospital está
lejos.', en: 'The hospital is far.' } , contextSentence: "El hospital está
lejos.", imageUrl: "", theme: "health" }, { es: 'banco', en: 'bank', type:
'noun', group: 'Places', gender: 'm', sentence: { es: 'El banco está cerca del
hotel.', en: 'The bank is near the hotel.' } , contextSentence: "El banco está
cerca del hotel.", imageUrl: "", theme: "shopping" }, { es: 'ciudad', en:
'city', type: 'noun', group: 'Places', gender: 'f', sentence: { es: 'Ciudad de
México es una ciudad grande.', en: 'Mexico City is a big city.' } ,
contextSentence: "Ciudad de México es una ciudad grande.", imageUrl: "", theme:
"descriptions" }, { es: 'calle', en: 'street', type: 'noun', group: 'Places',
gender: 'f', sentence: { es: 'La calle está muy ocupada.', en: 'The street is
very busy.' } , contextSentence: "La calle está muy ocupada.", imageUrl: "",
theme: "descriptions" }, { es: 'país', en: 'country', type: 'noun', group:
'Places', gender: 'm', sentence: { es: 'México es un país hermoso.', en: 'Mexico
is a beautiful country.' } , contextSentence: "México es un país hermoso.",
imageUrl: "", theme: "descriptions" }, { es: 'playa', en: 'beach', type: 'noun',
group: 'Places', gender: 'f', sentence: { es: 'La playa de Cancún es famosa.',
en: 'The beach of Cancún is famous.' } , contextSentence: "La playa de Cancún es
famosa.", imageUrl: "", theme: "nature" }, { es: 'uno', en: 'one', type:
'other', group: 'Numbers', sentence: { es: 'Tengo un hijo.', en: 'I have one
son.' } , contextSentence: "Tengo un hijo.", imageUrl: "", theme: "shopping" },
{ es: 'dos', en: 'two', type: 'other', group: 'Numbers', sentence: { es: 'Quiero
dos cafés.', en: 'I want two coffees.' } , contextSentence: "Quiero dos cafés.",
imageUrl: "", theme: "shopping" }, { es: 'tres', en: 'three', type: 'other',
group: 'Numbers', sentence: { es: 'Tengo tres maletas.', en: 'I have three
suitcases.' } , contextSentence: "Tengo tres maletas.", imageUrl: "", theme:
"shopping" }, { es: 'cuatro', en: 'four', type: 'other', group: 'Numbers',
sentence: { es: 'La reserva es para cuatro personas.', en: 'The reservation is
for four people.' } , contextSentence: "La reserva es para cuatro personas.",
imageUrl: "", theme: "shopping" }, { es: 'cinco', en: 'five', type: 'other',
group: 'Numbers', sentence: { es: 'El hotel tiene cinco estrellas.', en: 'The
hotel has five stars.' } , contextSentence: "El hotel tiene cinco estrellas.",
imageUrl: "", theme: "shopping" }, { es: 'seis', en: 'six', type: 'other',
group: 'Numbers', sentence: { es: 'Son las seis de la tarde.', en: 'It is six in
the afternoon.' } , contextSentence: "Son las seis de la tarde.", imageUrl: "",
theme: "time" }, { es: 'siete', en: 'seven', type: 'other', group: 'Numbers',
sentence: { es: 'La semana tiene siete días.', en: 'The week has seven days.' }
, contextSentence: "La semana tiene siete días.", imageUrl: "", theme: "time" },
{ es: 'ocho', en: 'eight', type: 'other', group: 'Numbers', sentence: { es:
'Trabajo ocho horas al día.', en: 'I work eight hours a day.' } ,
contextSentence: "Trabajo ocho horas al día.", imageUrl: "", theme: "time" }, {
es: 'nueve', en: 'nine', type: 'other', group: 'Numbers', sentence: { es: 'Son
las nueve de la mañana.', en: 'It is nine in the morning.' } , contextSentence:
"Son las nueve de la mañana.", imageUrl: "", theme: "time" }, { es: 'diez', en:
'ten', type: 'other', group: 'Numbers', sentence: { es: 'Tengo diez pesos.', en:
'I have ten pesos.' } , contextSentence: "Tengo diez pesos.", imageUrl: "",
theme: "shopping" }, { es: 'veinte', en: 'twenty', type: 'other', group:
'Numbers', sentence: { es: 'Necesito veinte minutos.', en: 'I need twenty
minutes.' } , contextSentence: "Necesito veinte minutos.", imageUrl: "", theme:
"time" }, { es: 'cien', en: 'one hundred', type: 'other', group: 'Numbers',
sentence: { es: 'Cuesta cien pesos.', en: 'It costs one hundred pesos.' } ,
contextSentence: "Cuesta cien pesos.", imageUrl: "", theme: "shopping" }, { es:
'lunes', en: 'monday', type: 'noun', group: 'Days', gender: 'm', sentence: { es:
'El lunes tengo clase de español.', en: 'On Monday I have a Spanish class.' } ,
contextSentence: "El lunes tengo clase de español.", imageUrl: "", theme: "time"
}, { es: 'martes', en: 'tuesday', type: 'noun', group: 'Days', gender: 'm',
sentence: { es: 'El martes trabajo todo el día.', en: 'On Tuesday I work all
day.' } , contextSentence: "El martes trabajo todo el día.", imageUrl: "",
theme: "time" }, { es: 'miércoles', en: 'wednesday', type: 'noun', group:
'Days', gender: 'm', sentence: { es: 'El miércoles voy al restaurante.', en: 'On
Wednesday I go to the restaurant.' } , contextSentence: "El miércoles voy al
restaurante.", imageUrl: "", theme: "time" }, { es: 'jueves', en: 'thursday',
type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El jueves visito a mi
familia.', en: 'On Thursday I visit my family.' } , contextSentence: "El jueves
visito a mi familia.", imageUrl: "", theme: "time" }, { es: 'viernes', en:
'friday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El viernes
salgo con amigos.', en: 'On Friday I go out with friends.' } , contextSentence:
"El viernes salgo con amigos.", imageUrl: "", theme: "time" }, { es: 'sábado',
en: 'saturday', type: 'noun', group: 'Days', gender: 'm', sentence: { es: 'El
sábado voy a la playa.', en: 'On Saturday I go to the beach.' } ,
contextSentence: "El sábado voy a la playa.", imageUrl: "", theme: "time" }, {
es: 'domingo', en: 'sunday', type: 'noun', group: 'Days', gender: 'm', sentence:
{ es: 'El domingo descanso en casa.', en: 'On Sunday I rest at home.' } ,
contextSentence: "El domingo descanso en casa.", imageUrl: "", theme: "time" },
{ es: 'enero', en: 'january', type: 'noun', group: 'Months', gender: 'm',
sentence: { es: 'En enero hace mucho frío.', en: 'In January it is very cold.' }
, contextSentence: "En enero hace mucho frío.", imageUrl: "", theme: "time" }, {
es: 'febrero', en: 'february', type: 'noun', group: 'Months', gender: 'm',
sentence: { es: 'Mi cumpleaños es en febrero.', en: 'My birthday is in
February.' } , contextSentence: "Mi cumpleaños es en febrero.", imageUrl: "",
theme: "time" }, { es: 'marzo', en: 'march', type: 'noun', group: 'Months',
gender: 'm', sentence: { es: 'En marzo empieza la primavera.', en: 'In March
spring begins.' } , contextSentence: "En marzo empieza la primavera.", imageUrl:
"", theme: "time" }, { es: 'abril', en: 'april', type: 'noun', group: 'Months',
gender: 'm', sentence: { es: 'Las flores crecen en abril.', en: 'Flowers grow in
April.' } , contextSentence: "Las flores crecen en abril.", imageUrl: "", theme:
"time" }, { es: 'mayo', en: 'may', type: 'noun', group: 'Months', gender: 'm',
sentence: { es: 'Mayo es un mes muy bonito.', en: 'May is a very beautiful
month.' } , contextSentence: "Mayo es un mes muy bonito.", imageUrl: "", theme:
"time" }, { es: 'junio', en: 'june', type: 'noun', group: 'Months', gender: 'm',
sentence: { es: 'En junio voy a la playa.', en: 'In June I go to the beach.' } ,
contextSentence: "En junio voy a la playa.", imageUrl: "", theme: "time" }, {
es: 'julio', en: 'july', type: 'noun', group: 'Months', gender: 'm', sentence: {
es: 'Hace mucho calor en julio.', en: 'It is very hot in July.' } ,
contextSentence: "Hace mucho calor en julio.", imageUrl: "", theme: "time" }, {
es: 'agosto', en: 'august', type: 'noun', group: 'Months', gender: 'm',
sentence: { es: 'En agosto voy a México.', en: 'In August I go to Mexico.' } ,
contextSentence: "En agosto voy a México.", imageUrl: "", theme: "time" }, { es:
'septiembre', en: 'september', type: 'noun', group: 'Months', gender: 'm',
sentence: { es: 'Las clases empiezan en septiembre.', en: 'Classes start in
September.' } , contextSentence: "Las clases empiezan en septiembre.", imageUrl:
"", theme: "time" }, { es: 'octubre', en: 'october', type: 'noun', group:
'Months', gender: 'm', sentence: { es: 'Octubre tiene días grises.', en:
'October has grey days.' } , contextSentence: "Octubre tiene días grises.",
imageUrl: "", theme: "time" }, { es: 'noviembre', en: 'november', type: 'noun',
group: 'Months', gender: 'm', sentence: { es: 'En noviembre llueve a veces.',
en: 'In November it rains sometimes.' } , contextSentence: "En noviembre llueve
a veces.", imageUrl: "", theme: "time" }, { es: 'diciembre', en: 'december',
type: 'noun', group: 'Months', gender: 'm', sentence: { es: 'En diciembre hace
frío.', en: 'In December it is cold.' } , contextSentence: "En diciembre hace
frío.", imageUrl: "", theme: "time" }, { es: 'rojo', en: 'red', type: 'adj',
group: 'Colours', sentence: { es: 'El tomate es rojo.', en: 'The tomato is red.'
} , contextSentence: "El tomate es rojo.", imageUrl: "", theme: "descriptions"
}, { es: 'azul', en: 'blue', type: 'adj', group: 'Colours', sentence: { es: 'El
cielo es azul.', en: 'The sky is blue.' } , contextSentence: "El cielo es
azul.", imageUrl: "", theme: "nature" }, { es: 'verde', en: 'green', type:
'adj', group: 'Colours', sentence: { es: 'La hierba es verde.', en: 'The grass
is green.' } , contextSentence: "La hierba es verde.", imageUrl: "", theme:
"nature" }, { es: 'amarillo', en: 'yellow', type: 'adj', group: 'Colours',
sentence: { es: 'El sol es amarillo.', en: 'The sun is yellow.' } ,
contextSentence: "El sol es amarillo.", imageUrl: "", theme: "nature" }, { es:
'blanco', en: 'white', type: 'adj', group: 'Colours', sentence: { es: 'La nieve
es blanca.', en: 'The snow is white.' } , contextSentence: "La nieve es
blanca.", imageUrl: "", theme: "nature" }, { es: 'negro', en: 'black', type:
'adj', group: 'Colours', sentence: { es: 'El café es negro.', en: 'The coffee is
black.' } , contextSentence: "El café es negro.", imageUrl: "", theme:
"restaurant" }, { es: 'naranja', en: 'orange', type: 'adj', group: 'Colours',
sentence: { es: 'La naranja es naranja.', en: 'The orange is orange.' } ,
contextSentence: "La naranja es naranja.", imageUrl: "", theme: "nature" }, {
es: 'gris', en: 'grey', type: 'adj', group: 'Colours', sentence: { es: 'El cielo
está gris hoy.', en: 'The sky is grey today.' } , contextSentence: "El cielo
está gris hoy.", imageUrl: "", theme: "nature" }, { es: 'morado', en: 'purple',
type: 'adj', group: 'Colours', sentence: { es: 'Las uvas son moradas.', en: 'The
grapes are purple.' } , contextSentence: "Las uvas son moradas.", imageUrl: "",
theme: "nature" }, { es: 'cabeza', en: 'head', type: 'noun', group: 'Body',
gender: 'f', sentence: { es: 'Me duele la cabeza.', en: 'My head hurts.' } ,
contextSentence: "Me duele la cabeza.", imageUrl: "", theme: "health" }, { es:
'mano', en: 'hand', type: 'noun', group: 'Body', gender: 'f', sentence: { es:
'Me lavé las manos.', en: 'I washed my hands.' } , contextSentence: "Me lavé las
manos.", imageUrl: "", theme: "health" }, { es: 'pie', en: 'foot', type: 'noun',
group: 'Body', gender: 'm', sentence: { es: 'Me duele el pie.', en: 'My foot
hurts.' } , contextSentence: "Me duele el pie.", imageUrl: "", theme: "health"
}, { es: 'ojo', en: 'eye', type: 'noun', group: 'Body', gender: 'm', sentence: {
es: 'Ella tiene ojos azules.', en: 'She has blue eyes.' } , contextSentence:
"Ella tiene ojos azules.", imageUrl: "", theme: "descriptions" }, { es: 'boca',
en: 'mouth', type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Abre la
boca, por favor.', en: 'Open your mouth, please.' } , contextSentence: "Abre la
boca, por favor.", imageUrl: "", theme: "health" }, { es: 'nariz', en: 'nose',
type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Me duele la nariz.',
en: 'My nose hurts.' } , contextSentence: "Me duele la nariz.", imageUrl: "",
theme: "health" }, { es: 'oreja', en: 'ear', type: 'noun', group: 'Body',
gender: 'f', sentence: { es: 'Tengo dolor de oreja.', en: 'I have an earache.' }
, contextSentence: "Tengo dolor de oreja.", imageUrl: "", theme: "health" }, {
es: 'brazo', en: 'arm', type: 'noun', group: 'Body', gender: 'm', sentence: {
es: 'Me rompí el brazo.', en: 'I broke my arm.' } , contextSentence: "Me rompí
el brazo.", imageUrl: "", theme: "health" }, { es: 'grande', en: 'big / large',
type: 'adj', group: 'Adjectives', sentence: { es: 'Ciudad de México es una
ciudad muy grande.', en: 'Mexico City is a very big city.' } , contextSentence:
"Ciudad de México es una ciudad muy grande.", imageUrl: "", theme:
"descriptions" }, { es: 'pequeño', en: 'small', type: 'adj', group:
'Adjectives', sentence: { es: 'Mi casa es pequeña pero bonita.', en: 'My house
is small but nice.' } , contextSentence: "Mi casa es pequeña pero bonita.",
imageUrl: "", theme: "home" }, { es: 'bueno', en: 'good', type: 'adj', group:
'Adjectives', sentence: { es: 'La comida es muy buena.', en: 'The food is very
good.' } , contextSentence: "La comida es muy buena.", imageUrl: "", theme:
"restaurant" }, { es: 'malo', en: 'bad', type: 'adj', group: 'Adjectives',
sentence: { es: 'El tiempo está malo hoy.', en: 'The weather is bad today.' } ,
contextSentence: "El tiempo está malo hoy.", imageUrl: "", theme: "nature" }, {
es: 'nuevo', en: 'new', type: 'adj', group: 'Adjectives', sentence: { es: 'Tengo
un celular nuevo.', en: 'I have a new phone.' } , contextSentence: "Tengo un
celular nuevo.", imageUrl: "", theme: "shopping" }, { es: 'viejo', en: 'old',
type: 'adj', group: 'Adjectives', sentence: { es: 'Este es un edificio muy
viejo.', en: 'This is a very old building.' } , contextSentence: "Este es un
edificio muy viejo.", imageUrl: "", theme: "descriptions" }, { es: 'bonito', en:
'pretty / nice', type: 'adj', group: 'Adjectives', sentence: { es: 'México es un
país muy bonito.', en: 'Mexico is a very nice country.' } , contextSentence:
"México es un país muy bonito.", imageUrl: "", theme: "descriptions" }, { es:
'fácil', en: 'easy', type: 'adj', group: 'Adjectives', sentence: { es: 'El
español es fácil y divertido.', en: 'Spanish is easy and fun.' } ,
contextSentence: "El español es fácil y divertido.", imageUrl: "", theme:
"descriptions" }, { es: 'difícil', en: 'difficult', type: 'adj', group:
'Adjectives', sentence: { es: 'La gramática puede ser difícil.', en: 'Grammar
can be difficult.' } , contextSentence: "La gramática puede ser difícil.",
imageUrl: "", theme: "descriptions" }, { es: 'caliente', en: 'hot', type: 'adj',
group: 'Adjectives', sentence: { es: 'El café está muy caliente.', en: 'The
coffee is very hot.' } , contextSentence: "El café está muy caliente.",
imageUrl: "", theme: "restaurant" }, { es: 'frío', en: 'cold', type: 'adj',
group: 'Adjectives', sentence: { es: 'El agua está fría.', en: 'The water is
cold.' } , contextSentence: "El agua está fría.", imageUrl: "", theme: "nature"
}, { es: 'rápido', en: 'fast', type: 'adj', group: 'Adjectives', sentence: { es:
'El taxi es muy rápido.', en: 'The taxi is very fast.' } , contextSentence: "El
taxi es muy rápido.", imageUrl: "", theme: "travel" }, { es: 'lento', en:
'slow', type: 'adj', group: 'Adjectives', sentence: { es: 'El camión es muy
lento.', en: 'The bus is very slow.' } , contextSentence: "El camión es muy
lento.", imageUrl: "", theme: "travel" }, { es: 'caro', en: 'expensive', type:
'adj', group: 'Adjectives', sentence: { es: 'El hotel es muy caro.', en: 'The
hotel is very expensive.' } , contextSentence: "El hotel es muy caro.",
imageUrl: "", theme: "shopping" }, { es: 'barato', en: 'cheap', type: 'adj',
group: 'Adjectives', sentence: { es: 'El restaurante es barato.', en: 'The
restaurant is cheap.' } , contextSentence: "El restaurante es barato.",
imageUrl: "", theme: "shopping" }, { es: 'abierto', en: 'open', type: 'adj',
group: 'Adjectives', sentence: { es: 'La tienda está abierta.', en: 'The store
is open.' } , contextSentence: "La tienda está abierta.", imageUrl: "", theme:
"shopping" }, { es: 'cerrado', en: 'closed', type: 'adj', group: 'Adjectives',
sentence: { es: 'El banco está cerrado hoy.', en: 'The bank is closed today.' }
, contextSentence: "El banco está cerrado hoy.", imageUrl: "", theme: "shopping"
}, { es: 'importante', en: 'important', type: 'adj', group: 'Adjectives',
sentence: { es: 'El pasaporte es muy importante.', en: 'The passport is very
important.' } , contextSentence: "El pasaporte es muy importante.", imageUrl:
"", theme: "travel" }, { es: 'hoy', en: 'today', type: 'adv', group: 'Time',
sentence: { es: 'Hoy voy al restaurante.', en: 'Today I go to the restaurant.' }
, contextSentence: "Hoy voy al restaurante.", imageUrl: "", theme: "time" }, {
es: 'mañana', en: 'tomorrow / morning', type: 'adv', group: 'Time', sentence: {
es: 'Mañana tengo una reserva.', en: 'Tomorrow I have a reservation.' } ,
contextSentence: "Mañana tengo una reserva.", imageUrl: "", theme: "time" }, {
es: 'ayer', en: 'yesterday', type: 'adv', group: 'Time', sentence: { es: 'Ayer
fui al banco.', en: 'Yesterday I went to the bank.' } , contextSentence: "Ayer
fui al banco.", imageUrl: "", theme: "time" }, { es: 'ahora', en: 'now', type:
'adv', group: 'Time', sentence: { es: 'Necesito ayuda ahora.', en: 'I need help
now.' } , contextSentence: "Necesito ayuda ahora.", imageUrl: "", theme: "time"
}, { es: 'tarde', en: 'afternoon / late', type: 'adv', group: 'Time', sentence:
{ es: 'Llegas tarde.', en: 'You are late.' } , contextSentence: "Llegas tarde.",
imageUrl: "", theme: "time" }, { es: 'siempre', en: 'always', type: 'adv',
group: 'Time', sentence: { es: 'Siempre como a las dos.', en: 'I always eat at
two.' } , contextSentence: "Siempre como a las dos.", imageUrl: "", theme:
"time" }, { es: 'nunca', en: 'never', type: 'adv', group: 'Time', sentence: {
es: 'Nunca bebo alcohol.', en: 'I never drink alcohol.' } , contextSentence:
"Nunca bebo alcohol.", imageUrl: "", theme: "health" }, { es: 'a veces', en:
'sometimes', type: 'adv', group: 'Time', sentence: { es: 'A veces como en un
restaurante.', en: 'Sometimes I eat at a restaurant.' } , contextSentence: "A
veces como en un restaurante.", imageUrl: "", theme: "time" }, { es: 'pronto',
en: 'soon', type: 'adv', group: 'Time', sentence: { es: 'El taxi llega pronto.',
en: 'The taxi arrives soon.' } , contextSentence: "El taxi llega pronto.",
imageUrl: "", theme: "time" }, { es: 'después', en: 'after / later', type:
'adv', group: 'Time', sentence: { es: 'Después voy al hotel.', en: 'Later I go
to the hotel.' } , contextSentence: "Después voy al hotel.", imageUrl: "",
theme: "time" }, { es: 'antes', en: 'before', type: 'adv', group: 'Time',
sentence: { es: 'Antes de comer, bebo agua.', en: 'Before eating, I drink
water.' } , contextSentence: "Antes de comer, bebo agua.", imageUrl: "", theme:
"time" }, { es: 'todavía', en: 'still / yet', type: 'adv', group: 'Time',
sentence: { es: 'Todavía no hablo bien.', en: "I still don't speak well." } ,
contextSentence: "Todavía no hablo bien.", imageUrl: "", theme: "descriptions"
}, { es: 'qué', en: 'what', type: 'adv', group: 'Questions', sentence: { es:
'¿Qué quieres comer?', en: 'What do you want to eat?' } , contextSentence:
"¿Qué quieres comer?", imageUrl: "", theme: "restaurant" }, { es: 'quién', en:
'who', type: 'adv', group: 'Questions', sentence: { es: '¿Quién es esa
persona?', en: 'Who is that person?' } , contextSentence: "¿Quién es esa
persona?", imageUrl: "", theme: "descriptions" }, { es: 'cuándo', en: 'when',
type: 'adv', group: 'Questions', sentence: { es: '¿Cuándo llega el taxi?', en:
'When does the taxi arrive?' } , contextSentence: "¿Cuándo llega el taxi?",
imageUrl: "", theme: "travel" }, { es: 'cómo', en: 'how', type: 'adv', group:
'Questions', sentence: { es: '¿Cómo estás hoy?', en: 'How are you today?' } ,
contextSentence: "¿Cómo estás hoy?", imageUrl: "", theme: "greetings" }, { es:
'cuánto', en: 'how much', type: 'adv', group: 'Questions', sentence: { es:
'¿Cuánto cuesta el hotel?', en: 'How much does the hotel cost?' } ,
contextSentence: "¿Cuánto cuesta el hotel?", imageUrl: "", theme: "shopping" },
{ es: 'por qué', en: 'why', type: 'adv', group: 'Questions', sentence: { es:
'¿Por qué aprendes español?', en: 'Why are you learning Spanish?' } ,
contextSentence: "¿Por qué aprendes español?", imageUrl: "", theme:
"descriptions" }, { es: 'muy', en: 'very', type: 'adv', group: 'Connectors',
sentence: { es: 'El español es muy interesante.', en: 'Spanish is very
interesting.' } , contextSentence: "El español es muy interesante.", imageUrl:
"", theme: "descriptions" }, { es: 'también', en: 'also / too', type: 'adv',
group: 'Connectors', sentence: { es: 'Yo también hablo francés.', en: 'I also
speak French.' } , contextSentence: "Yo también hablo francés.", imageUrl: "",
theme: "descriptions" }, { es: 'pero', en: 'but', type: 'adv', group:
'Connectors', sentence: { es: 'Quiero ir, pero estoy cansado.', en: 'I want to
go, but I am tired.' } , contextSentence: "Quiero ir, pero estoy cansado.",
imageUrl: "", theme: "descriptions" }, { es: 'porque', en: 'because', type:
'adv', group: 'Connectors', sentence: { es: 'Estudio español porque me gusta.',
en: 'I study Spanish because I like it.' } , contextSentence: "Estudio español
porque me gusta.", imageUrl: "", theme: "descriptions" }, { es: 'cuando', en:
'when', type: 'adv', group: 'Connectors', sentence: { es: 'Cuando llego, te
llamo.', en: 'When I arrive, I will call you.' } , contextSentence: "Cuando
llego, te llamo.", imageUrl: "", theme: "time" }, { es: 'cerca', en: 'near',
type: 'adv', group: 'Connectors', sentence: { es: 'El hotel está cerca.', en:
'The hotel is near.' } , contextSentence: "El hotel está cerca.", imageUrl: "",
theme: "travel" }, { es: 'lejos', en: 'far', type: 'adv', group: 'Connectors',
sentence: { es: 'El hospital está lejos.', en: 'The hospital is far.' } ,
contextSentence: "El hospital está lejos.", imageUrl: "", theme: "health" }, {
es: 'mucho', en: 'a lot / much', type: 'adv', group: 'Connectors', sentence: {
es: 'Gracias mucho.', en: 'Thank you very much.' } , contextSentence: "Gracias
mucho.", imageUrl: "", theme: "greetings" }, { es: 'poco', en: 'a little / few',
type: 'adv', group: 'Connectors', sentence: { es: 'Hablo un poco de español.',
en: 'I speak a little Spanish.' } , contextSentence: "Hablo un poco de
español.", imageUrl: "", theme: "descriptions" }, { es: 'más', en: 'more',
type: 'adv', group: 'Connectors', sentence: { es: '¿Puedes hablar más
despacio?', en: 'Can you speak more slowly?' } , contextSentence: "¿Puedes
hablar más despacio?", imageUrl: "", theme: "descriptions" }, { es: 'menos', en:
'less', type: 'adv', group: 'Connectors', sentence: { es: 'Necesito menos
azúcar.', en: 'I need less sugar.' } , contextSentence: "Necesito menos
azúcar.", imageUrl: "", theme: "restaurant" }, { es: 'todo', en: 'all /
everything', type: 'adv', group: 'Connectors', sentence: { es: 'Todo está
bien.', en: 'Everything is fine.' } , contextSentence: "Todo está bien.",
imageUrl: "", theme: "descriptions" }, { es: 'nada', en: 'nothing', type: 'adv',
group: 'Connectors', sentence: { es: 'No hay nada que hacer.', en: 'There is
nothing to do.' } , contextSentence: "No hay nada que hacer.", imageUrl: "",
theme: "descriptions" }, { es: 'hay', en: 'there is / there are', type: 'adv',
group: 'Connectors', sentence: { es: '¿Hay un taxi cerca?', en: 'Is there a taxi
nearby?' } , contextSentence: "¿Hay un taxi cerca?", imageUrl: "", theme:
"travel" }, { es: 'o', en: 'or', type: 'adv', group: 'Connectors', sentence: {
es: '¿Té o café?', en: 'Tea or coffee?' } , contextSentence: "¿Té o café?",
imageUrl: "", theme: "restaurant" }, { es: 'si', en: 'if', type: 'adv', group:
'Connectors', sentence: { es: 'Si llueve, no salgo.', en: "If it rains, I won't
go out." } , contextSentence: "Si llueve, no salgo.", imageUrl: "", theme:
"nature" }, { es: 'huevo', en: 'egg', type: 'noun', group: 'Food & Drink',
gender: 'm', sentence: { es: 'Como un huevo en el desayuno.', en: 'I eat an egg
for breakfast.' } , contextSentence: "Como un huevo en el desayuno.", imageUrl:
"", theme: "restaurant" }, { es: 'mantequilla', en: 'butter', type: 'noun',
group: 'Food & Drink', gender: 'f', sentence: { es: 'Pan con mantequilla, por
favor.', en: 'Bread with butter, please.' } , contextSentence: "Pan con
mantequilla, por favor.", imageUrl: "", theme: "restaurant" }, { es: 'tomate',
en: 'tomato', type: 'noun', group: 'Food & Drink', gender: 'm', sentence: { es:
'El tomate es rojo.', en: 'The tomato is red.' } , contextSentence: "El tomate
es rojo.", imageUrl: "", theme: "restaurant" }, { es: 'ensalada', en: 'salad',
type: 'noun', group: 'Food & Drink', gender: 'f', sentence: { es: 'Una ensalada
mixta, por favor.', en: 'A mixed salad, please.' } , contextSentence: "Una
ensalada mixta, por favor.", imageUrl: "", theme: "restaurant" }, { es:
'postre', en: 'dessert', type: 'noun', group: 'Food & Drink', gender: 'm',
sentence: { es: 'De postre, helado.', en: 'For dessert, ice cream.' } ,
contextSentence: "De postre, helado.", imageUrl: "", theme: "restaurant" }, {
es: 'helado', en: 'ice cream', type: 'noun', group: 'Food & Drink', gender: 'm',
sentence: { es: 'El niño quiere helado.', en: 'The boy wants ice cream.' } ,
contextSentence: "El niño quiere helado.", imageUrl: "", theme: "restaurant" },
{ es: 'tío', en: 'uncle', type: 'noun', group: 'Family', gender: 'm', sentence:
{ es: 'Mi tío vive en Guadalajara.', en: 'My uncle lives in Guadalajara.' } ,
contextSentence: "Mi tío vive en Guadalajara.", imageUrl: "", theme: "family" },
{ es: 'tía', en: 'aunt', type: 'noun', group: 'Family', gender: 'f', sentence: {
es: 'Mi tía hace una sopa increíble.', en: 'My aunt makes incredible soup.' } ,
contextSentence: "Mi tía hace una sopa increíble.", imageUrl: "", theme:
"family" }, { es: 'primo', en: 'cousin (m)', type: 'noun', group: 'Family',
gender: 'm', sentence: { es: 'Mi primo estudia inglés.', en: 'My cousin studies
English.' } , contextSentence: "Mi primo estudia inglés.", imageUrl: "", theme:
"family" }, { es: 'prima', en: 'cousin (f)', type: 'noun', group: 'Family',
gender: 'f', sentence: { es: 'Mi prima toca la guitarra.', en: 'My cousin plays
guitar.' } , contextSentence: "Mi prima toca la guitarra.", imageUrl: "", theme:
"family" }, { es: 'aeropuerto', en: 'airport', type: 'noun', group: 'Travel',
gender: 'm', sentence: { es: 'El aeropuerto está lejos.', en: 'The airport is
far.' } , contextSentence: "El aeropuerto está lejos.", imageUrl: "", theme:
"travel" }, { es: 'vuelo', en: 'flight', type: 'noun', group: 'Travel', gender:
'm', sentence: { es: 'Mi vuelo sale a las ocho.', en: 'My flight leaves at
eight.' } , contextSentence: "Mi vuelo sale a las ocho.", imageUrl: "", theme:
"travel" }, { es: 'boleto', en: 'ticket', type: 'noun', group: 'Travel', gender:
'm', sentence: { es: 'Necesito un boleto para la Ciudad de México.', en: 'I need
a ticket to Mexico City.' } , contextSentence: "Necesito un boleto para la
Ciudad de México.", imageUrl: "", theme: "travel" }, { es: 'equipaje', en:
'luggage', type: 'noun', group: 'Travel', gender: 'm', sentence: { es: '¿Dónde
está mi equipaje?', en: 'Where is my luggage?' } , contextSentence: "¿Dónde está
mi equipaje?", imageUrl: "", theme: "travel" }, { es: 'tren', en: 'train', type:
'noun', group: 'Travel', gender: 'm', sentence: { es: 'El tren llega a las
dos.', en: 'The train arrives at two.' } , contextSentence: "El tren llega a las
dos.", imageUrl: "", theme: "travel" }, { es: 'autobús', en: 'bus', type:
'noun', group: 'Travel', gender: 'm', sentence: { es: 'Tomo el autobús al
trabajo.', en: 'I take the bus to work.' } , contextSentence: "Tomo el autobús
al trabajo.", imageUrl: "", theme: "travel" }, { es: 'carro', en: 'car', type:
'noun', group: 'Travel', gender: 'm', sentence: { es: 'El carro es nuevo.', en:
'The car is new.' } , contextSentence: "El carro es nuevo.", imageUrl: "",
theme: "shopping" }, { es: 'mapa', en: 'map', type: 'noun', group: 'Travel',
gender: 'm', sentence: { es: 'Necesito un mapa de la ciudad.', en: 'I need a map
of the city.' } , contextSentence: "Necesito un mapa de la ciudad.", imageUrl:
"", theme: "travel" }, { es: 'parque', en: 'parque', type: 'noun', group:
'Places', gender: 'm', sentence: { es: 'El parque es muy bonito.', en: 'The park
is very beautiful.' } , contextSentence: "El parque es muy bonito.", imageUrl:
"", theme: "nature" }, { es: 'mercado', en: 'market', type: 'noun', group:
'Places', gender: 'm', sentence: { es: 'Compro fruta en el mercado.', en: 'I buy
fruit at the market.' } , contextSentence: "Compro fruta en el mercado.",
imageUrl: "", theme: "shopping" }, { es: 'iglesia', en: 'church', type: 'noun',
group: 'Places', gender: 'f', sentence: { es: 'La iglesia es muy antigua.', en:
'The church is very old.' } , contextSentence: "La iglesia es muy antigua.",
imageUrl: "", theme: "descriptions" }, { es: 'museo', en: 'museum', type:
'noun', group: 'Places', gender: 'm', sentence: { es: 'El museo abre a las
diez.', en: 'The museum opens at ten.' } , contextSentence: "El museo abre a las
diez.", imageUrl: "", theme: "travel" }, { es: 'cero', en: 'zero', type:
'other', group: 'Numbers', sentence: { es: 'Cero grados — qué frío.', en: 'Zero
degrees — so cold.' } , contextSentence: "Cero grados — qué frío.", imageUrl:
"", theme: "nature" }, { es: 'once', en: 'eleven', type: 'other', group:
'Numbers', sentence: { es: 'Son las once de la noche.', en: 'It is eleven at
night.' } , contextSentence: "Son las once de la noche.", imageUrl: "", theme:
"time" }, { es: 'doce', en: 'twelve', type: 'other', group: 'Numbers', sentence:
{ es: 'Hay doce meses en un año.', en: 'There are twelve months in a year.' } ,
contextSentence: "Hay doce meses en un año.", imageUrl: "", theme: "time" }, {
es: 'rosa', en: 'pink', type: 'adj', group: 'Colours', sentence: { es: 'La flor
es rosa.', en: 'The flower is pink.' } , contextSentence: "La flor es rosa.",
imageUrl: "", theme: "nature" }, { es: 'marrón', en: 'brown', type: 'adj',
group: 'Colours', sentence: { es: 'El café es marrón.', en: 'The coffee is
brown.' } , contextSentence: "El café es marrón.", imageUrl: "", theme:
"restaurant" }, { es: 'corazón', en: 'heart', type: 'noun', group: 'Body',
gender: 'm', sentence: { es: 'Mi corazón late rápido.', en: 'My heart beats
fast.' } , contextSentence: "Mi corazón late rápido.", imageUrl: "", theme:
"health" }, { es: 'dedo', en: 'finger / toe', type: 'noun', group: 'Body',
gender: 'm', sentence: { es: 'Me corté el dedo.', en: 'I cut my finger.' } ,
contextSentence: "Me corté el dedo.", imageUrl: "", theme: "health" }, { es:
'pelo', en: 'hair', type: 'noun', group: 'Body', gender: 'm', sentence: { es:
'Tiene el pelo largo.', en: 'She has long hair.' } , contextSentence: "Tiene el
pelo largo.", imageUrl: "", theme: "descriptions" }, { es: 'pierna', en: 'leg',
type: 'noun', group: 'Body', gender: 'f', sentence: { es: 'Me duele la pierna.',
en: 'My leg hurts.' } , contextSentence: "Me duele la pierna.", imageUrl: "",
theme: "health" }, { es: 'alto', en: 'tall', type: 'adj', group: 'Adjectives',
sentence: { es: 'Mi padre es muy alto.', en: 'My father is very tall.' } ,
contextSentence: "Mi padre es muy alto.", imageUrl: "", theme: "descriptions" },
{ es: 'bajo', en: 'short / low', type: 'adj', group: 'Adjectives', sentence: {
es: 'Mi hermana es bajita.', en: 'My sister is short.' } , contextSentence: "Mi
hermana es bajita.", imageUrl: "", theme: "descriptions" }, { es: 'joven', en:
'young', type: 'adj', group: 'Adjectives', sentence: { es: 'Es muy joven
todavía.', en: 'He is still very young.' } , contextSentence: "Es muy joven
todavía.", imageUrl: "", theme: "descriptions" }, { es: 'contento', en: 'happy',
type: 'adj', group: 'Adjectives', sentence: { es: 'Estoy muy contento hoy.', en:
'I am very happy today.' } , contextSentence: "Estoy muy contento hoy.",
imageUrl: "", theme: "descriptions" }, { es: 'cansado', en: 'tired', type:
'adj', group: 'Adjectives', sentence: { es: 'Estoy cansado, voy a dormir.', en:
'I am tired, I am going to sleep.' } , contextSentence: "Estoy cansado, voy a
dormir.", imageUrl: "", theme: "health" }, { es: 'minuto', en: 'minute', type:
'noun', group: 'Time', gender: 'm', sentence: { es: 'Espera un minuto, por
favor.', en: 'Wait a minute, please.' } , contextSentence: "Espera un minuto,
por favor.", imageUrl: "", theme: "time" }, { es: 'hora', en: 'hour', type:
'noun', group: 'Time', gender: 'f', sentence: { es: '¿Qué hora es?', en: 'What
time is it?' } , contextSentence: "¿Qué hora es?", imageUrl: "", theme: "time"
}, { es: 'semana', en: 'week', type: 'noun', group: 'Time', gender: 'f',
sentence: { es: 'La semana tiene siete días.', en: 'The week has seven days.' }
, contextSentence: "La semana tiene siete días.", imageUrl: "", theme: "time" },
{ es: 'año', en: 'year', type: 'noun', group: 'Time', gender: 'm', sentence: {
es: 'Tengo treinta años.', en: 'I am thirty years old.' } , contextSentence:
"Tengo treinta años.", imageUrl: "", theme: "time" }, { es: 'hasta luego', en:
'see you later', type: 'phrase', group: 'Core', sentence: { es: 'Hasta luego,
amigo.', en: 'See you later, friend.' } , contextSentence: "Hasta luego,
amigo.", imageUrl: "", theme: "greetings" }, { es: 'salud', en: 'cheers / bless
you', type: 'phrase', group: 'Core', sentence: { es: '¡Salud y suerte!', en:
'Cheers and good luck!' } , contextSentence: "¡Salud y suerte!", imageUrl: "",
theme: "greetings" }, { es: 'suerte', en: 'good luck', type: 'phrase', group:
'Core', sentence: { es: 'Mucha suerte mañana.', en: 'Lots of luck tomorrow.' } ,
contextSentence: "Mucha suerte mañana.", imageUrl: "", theme: "greetings" }, {
es: 'buenas tardes', en: 'good afternoon', type: 'phrase', group: 'Core',
sentence: { es: 'Buenas tardes, señor.', en: 'Good afternoon, sir.' } ,
contextSentence: "Buenas tardes, señor.", imageUrl: "", theme: "greetings" }, {
es: 'encantado', en: 'pleased to meet you', type: 'phrase', group: 'Core',
sentence: { es: 'Encantado de conocerte.', en: 'Pleased to meet you.' } ,
contextSentence: "Encantado de conocerte.", imageUrl: "", theme: "greetings" },
{ es: 'ayudar', en: 'to help', type: 'verb', group: 'Core', sentence: { es:
'¿Puedes ayudarme?', en: 'Can you help me?' } , contextSentence: "¿Puedes
ayudarme?", imageUrl: "", theme: "greetings" }, { es: 'esperar', en: 'to wait /
hope', type: 'verb', group: 'Core', sentence: { es: 'Esperamos el tren.', en:
'We wait for the train.' } , contextSentence: "Esperamos el tren.", imageUrl:
"", theme: "travel" }, { es: 'salir', en: 'to leave / go out', type: 'verb',
group: 'Core', sentence: { es: 'Voy a salir esta noche.', en: 'I am going out
tonight.' } , contextSentence: "Voy a salir esta noche.", imageUrl: "", theme:
"travel" }, { es: 'llegar', en: 'to arrive', type: 'verb', group: 'Core',
sentence: { es: 'El vuelo llega tarde.', en: 'The flight arrives late.' } ,
contextSentence: "El vuelo llega tarde.", imageUrl: "", theme: "travel" }, { es:
'leer', en: 'to read', type: 'verb', group: 'Core', sentence: { es: 'Me gusta
leer libros.', en: 'I like to read books.' } , contextSentence: "Me gusta leer
libros.", imageUrl: "", theme: "descriptions" }, { es: 'escribir', en: 'to
write', type: 'verb', group: 'Core', sentence: { es: 'Tengo que escribir un
email.', en: 'I have to write an email.' } , contextSentence: "Tengo que
escribir un email.", imageUrl: "", theme: "descriptions" }, { es: 'escuchar',
en: 'to listen', type: 'verb', group: 'Core', sentence: { es: 'Me gusta escuchar
música.', en: 'I like to listen to music.' } , contextSentence: "Me gusta
escuchar música.", imageUrl: "", theme: "descriptions" }, { es: 'mirar', en: 'to
watch / look', type: 'verb', group: 'Core', sentence: { es: 'Vamos a mirar la
película.', en: 'We are going to watch the movie.' } , contextSentence: "Vamos a
mirar la película.", imageUrl: "", theme: "descriptions" }, { es: 'tiempo', en:
'weather / time', type: 'noun', group: 'Weather', gender: 'm', sentence: { es:
'¿Qué tiempo hace?', en: 'What is the weather like?' } , contextSentence: "¿Qué
tiempo hace?", imageUrl: "", theme: "nature" }, { es: 'sol', en: 'sun', type:
'noun', group: 'Weather', gender: 'm', sentence: { es: 'Hace mucho sol hoy.',
en: 'It is very sunny today.' } , contextSentence: "Hace mucho sol hoy.",
imageUrl: "", theme: "nature" }, { es: 'lluvia', en: 'rain', type: 'noun',
group: 'Weather', gender: 'f', sentence: { es: 'La lluvia es buena para las
plantas.', en: 'Rain is good for the plants.' } , contextSentence: "La lluvia es
buena para las plantas.", imageUrl: "", theme: "nature" }, { es: 'nieve', en:
'snow', type: 'noun', group: 'Weather', gender: 'f', sentence: { es: 'La nieve
cubre las montañas.', en: 'Snow covers the mountains.' } , contextSentence: "La
nieve cubre las montañas.", imageUrl: "", theme: "nature" }, { es: 'viento', en:
'wind', type: 'noun', group: 'Weather', gender: 'm', sentence: { es: 'Hace mucho
viento.', en: 'It is very windy.' } , contextSentence: "Hace mucho viento.",
imageUrl: "", theme: "nature" }, { es: 'calor', en: 'heat', type: 'noun', group:
'Weather', gender: 'm', sentence: { es: 'En agosto hace mucho calor.', en: 'In
August it is very hot.' } , contextSentence: "En agosto hace mucho calor.",
imageUrl: "", theme: "nature" }, { es: 'perro', en: 'dog', type: 'noun', group:
'Animals', gender: 'm', sentence: { es: 'Mi perro se llama Max.', en: 'My dog is
called Max.' } , contextSentence: "Mi perro se llama Max.", imageUrl: "", theme:
"animals" }, { es: 'gato', en: 'cat', type: 'noun', group: 'Animals', gender:
'm', sentence: { es: 'El gato duerme en el sofá.', en: 'The cat sleeps on the
sofa.' } , contextSentence: "El gato duerme en el sofá.", imageUrl: "", theme:
"animals" }, { es: 'pájaro', en: 'bird', type: 'noun', group: 'Animals', gender:
'm', sentence: { es: 'El pájaro canta por la mañana.', en: 'The bird sings in
the morning.' } , contextSentence: "El pájaro canta por la mañana.", imageUrl:
"", theme: "animals" }, { es: 'caballo', en: 'horse', type: 'noun', group:
'Animals', gender: 'm', sentence: { es: 'Voy a montar a caballo.', en: 'I am
going to ride a horse.' } , contextSentence: "Voy a montar a caballo.",
imageUrl: "", theme: "animals" }, { es: 'vaca', en: 'cow', type: 'noun', group:
'Animals', gender: 'f', sentence: { es: 'La vaca da leche.', en: 'The cow gives
milk.' } , contextSentence: "La vaca da leche.", imageUrl: "", theme: "animals"
}, { es: 'pez', en: 'fish (alive)', type: 'noun', group: 'Animals', gender: 'm',
sentence: { es: 'El pez nada en el río.', en: 'The fish swims in the river.' } ,
contextSentence: "El pez nada en el río.", imageUrl: "", theme: "animals" }, {
es: 'camisa', en: 'shirt', type: 'noun', group: 'Clothing', gender: 'f',
sentence: { es: 'Llevo una camisa blanca.', en: 'I am wearing a white shirt.' }
, contextSentence: "Llevo una camisa blanca.", imageUrl: "", theme: "clothing"
}, { es: 'pantalón', en: 'pants / trousers', type: 'noun', group: 'Clothing',
gender: 'm', sentence: { es: 'Mis pantalones son nuevos.', en: 'My pants are
new.' } , contextSentence: "Mis pantalones son nuevos.", imageUrl: "", theme:
"clothing" }, { es: 'zapato', en: 'shoe', type: 'noun', group: 'Clothing',
gender: 'm', sentence: { es: 'Mis zapatos son cómodos.', en: 'My shoes are
comfortable.' } , contextSentence: "Mis zapatos son cómodos.", imageUrl: "",
theme: "clothing" }, { es: 'vestido', en: 'dress', type: 'noun', group:
'Clothing', gender: 'm', sentence: { es: 'Compré un vestido nuevo.', en: 'I
bought a new dress.' } , contextSentence: "Compré un vestido nuevo.", imageUrl:
"", theme: "clothing" }, { es: 'sombrero', en: 'hat', type: 'noun', group:
'Clothing', gender: 'm', sentence: { es: 'Lleva un sombrero negro.', en: 'He
wears a black hat.' } , contextSentence: "Lleva un sombrero negro.", imageUrl:
"", theme: "clothing" }, { es: 'abrigo', en: 'coat', type: 'noun', group:
'Clothing', gender: 'm', sentence: { es: 'Necesitas un abrigo, hace frío.', en:
"You need a coat, it's cold." } , contextSentence: "Necesitas un abrigo, hace
frío.", imageUrl: "", theme: "clothing" }, { es: 'bolso', en: 'bag / purse',
type: 'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Mi bolso es
grande.', en: 'My bag is big.' } , contextSentence: "Mi bolso es grande.",
imageUrl: "", theme: "clothing" }, { es: 'reloj', en: 'watch / clock', type:
'noun', group: 'Clothing', gender: 'm', sentence: { es: 'Mi reloj es de oro.',
en: 'My watch is gold.' } , contextSentence: "Mi reloj es de oro.", imageUrl:
"", theme: "clothing" }, ];


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