// ── BASE DE CONOCIMIENTO ──────────────────
// Array de objetos. Cada objeto representa
// un tema que el bot sabe responder.
// ─────────────────────────────────────────
const knowledge = [
  {
    keywords: ["hola", "buenas", "hey", "saludos"],
    response: "¡Hola! 👋 Soy el asistente de Daniel. ¿En qué puedo ayudarte?"
  },
  {
    keywords: ["servicio", "servicios", "ofrecés", "hacés", "trabajo"],
    response: "Daniel ofrece dos servicios principales:\n🌐 Desarrollo Web — sitios, landing pages y tarjetas digitales.\n🎨 Diseño Gráfico — identidad visual, logos y contenido para redes."
  },
  {
    keywords: ["web", "sitio", "pagina", "página", "landing"],
    response: "Desarrollamos sitios web y landing pages a medida, optimizados para móvil y con diseño profesional. ¿Querés saber el precio o tenés un proyecto en mente?"
  },
  {
    keywords: ["diseño", "logo", "identidad", "marca", "branding"],
    response: "Creamos identidad visual completa: logo, paleta de colores, tipografías y material para redes sociales. 🎨"
  },
  {
    keywords: ["precio", "costo", "cuanto", "cuánto", "tarifa", "presupuesto"],
    response: "Los precios varían según el proyecto. ¡Escribinos por WhatsApp y armamos un presupuesto personalizado sin compromiso! 💬"
  },
  {
    keywords: ["contacto", "contactar", "escribir", "whatsapp", "mensaje"],
    response: "Podés contactar a Daniel por:\n💬 WhatsApp — botón arriba en la tarjeta\n📧 Email — también en la sección de contacto"
  },
  {
    keywords: ["instagram", "behance", "redes", "portfolio", "trabajos"],
    response: "Podés ver el trabajo de Daniel en Instagram y Behance. Los links están en la sección de contacto 👆"
  },
  {
    keywords: ["gracias", "genial", "perfecto", "buenísimo", "excelente"],
    response: "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?"
  },
  {
    keywords: ["chau", "adios", "hasta luego", "bye"],
    response: "¡Hasta luego! Fue un placer. No dudes en escribirnos cuando quieras. 👋"
  },
  {
    keywords: ["invitaciones", "eventos","cumpleaños", "bodas", "casamiento", "quince años",],
    response: "realizamos invitaciones digitales personalizadas para cualquier evento, para mas detalles podes enviarnos un whatsapp al numero que se encuentra en la seccion contactos!"
  }
];

// ── SUGERENCIAS ───────────────────────────
// Estos son los botones de pregunta rápida
// que aparecen arriba del input.
// ─────────────────────────────────────────
const suggestions = [
  "👋 Hola",
  "🌐 Sitio web",
  "🎨 Diseño gráfico",
  "💰 Precios",
  "📧 Contacto"
];


// ── REFERENCIAS AL DOM ────────────────────
// Guardamos los elementos en variables
// para no buscarlos cada vez que los necesitamos.
// ─────────────────────────────────────────
const chatBox       = document.getElementById("chatBox");
const userInput     = document.getElementById("userInput");
const sendBtn       = document.getElementById("sendBtn");
const suggestionsEl = document.getElementById("suggestions");


// ── FUNCIÓN: addBubble ────────────────────
// Crea una burbuja de mensaje en el chat.
// Recibe el texto y quién lo envía.
// ─────────────────────────────────────────
function addBubble(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble", sender);

  // Convertimos \n en <br> para los saltos de línea
  bubble.innerHTML = text.replace(/\n/g, "<br>");

  chatBox.appendChild(bubble);

  // Scroll automático al último mensaje
  chatBox.scrollTop = chatBox.scrollHeight;
}


// ── FUNCIÓN: getResponse ──────────────────
// Busca en knowledge si alguna keyword
// coincide con lo que escribió el usuario.
// ─────────────────────────────────────────
function getResponse(userText) {
  const lower = userText.toLowerCase();

  const match = knowledge.find(item =>
    item.keywords.some(keyword => lower.includes(keyword))
  );

  return match
    ? match.response
    : "Hmm, no estoy seguro de cómo responder eso. 🤔 Probá preguntarme sobre mis servicios, precios o contacto.";
}


// ── FUNCIÓN: handleSend ───────────────────
// Une todo: toma el input, muestra la
// burbuja del usuario y la respuesta del bot.
// ─────────────────────────────────────────
function handleSend() {
  const text = userInput.value.trim();

  if (!text) return;

  addBubble(text, "user");
  userInput.value = "";

  // El bot "piensa" 600ms antes de responder
  setTimeout(() => {
    const response = getResponse(text);
    addBubble(response, "bot");
  }, 600);
}


// ── EVENTOS ───────────────────────────────
// Conectamos las acciones del usuario
// con nuestras funciones.
// ─────────────────────────────────────────

// Click en el botón enviar
sendBtn.addEventListener("click", handleSend);

// Presionar Enter en el input
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleSend();
});


// ── BOTONES DE SUGERENCIA ─────────────────
// Recorremos el array suggestions y
// creamos un botón por cada elemento.
// ─────────────────────────────────────────
suggestions.forEach(text => {
  const btn = document.createElement("button");
  btn.classList.add("suggestion-btn");
  btn.textContent = text;

  btn.addEventListener("click", () => {
    userInput.value = text;
    handleSend();
  });

  suggestionsEl.appendChild(btn);
});


// ── MENSAJE INICIAL ───────────────────────
// Cuando carga la página el bot saluda.
// El delay de 400ms hace que se sienta
// más natural, no instantáneo.
// ─────────────────────────────────────────
setTimeout(() => {
  addBubble("¡Hola! 👋 Soy el asistente de Daniel. Preguntame sobre servicios, precios o cómo contactarnos.", "bot");
}, 400);


// ── GUARDAR CONTACTO ──────────────────────
// Genera un archivo .vcf con tus datos
// y lo descarga en el dispositivo del usuario.
// ─────────────────────────────────────────

// Tus datos de contacto
const contactData = {
  nombre:     "Daniel Barrios",
  telefono:   "+5491137878083",
  email:      "85hbdaniel@gmail.com",
  sitio:      "https://tudominio.com",
  instagram:  "https://instagram.com/visiondesign_ok",
  behance:    "https://behance.net/daniel2023",
  titulo:     "Desarrollo de soluciones digitales"
};

// Función que genera y descarga el .vcf
function saveContact() {
  // Armamos el contenido del archivo .vcf
  // VCF es un formato estándar que entienden
  // todos los celulares y gestores de contactos
  const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.nombre}
TEL:${contactData.telefono}
EMAIL:${contactData.email}
URL:${contactData.sitio}
TITLE:${contactData.titulo}
NOTE:Instagram: ${contactData.instagram} | Behance: ${contactData.behance}
END:VCARD`;

  // Creamos un Blob con el contenido
  // Un Blob es un archivo en memoria
  const blob = new Blob([vcf], { type: "text/vcard" });

  // Creamos una URL temporal que apunta al Blob
  const url = URL.createObjectURL(blob);

  // Creamos un <a> invisible, lo "clickeamos"
  // y lo eliminamos — así forzamos la descarga
  const link = document.createElement("a");
  link.href = url;
  link.download = "daniel-barrios.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Liberamos la URL temporal de la memoria
  URL.revokeObjectURL(url);
}

// Conectamos el botón con la función
document.getElementById("saveContact").addEventListener("click", (event) => {
  event.preventDefault(); // Evita que el href="#" haga scroll arriba
  saveContact();
});





