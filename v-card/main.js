// vcard-main.js

// 1. Nuestros datos (Ingredientes)
const MIS_DATOS = {
    whatsapp: "5491137878083",
    instagram: "https://instagram.com/tu_usuario",
    mensajeWpp: "¡Hola! Vi tu V-Card y me gustaría consultar por una invitación."
};

// 2. Esperamos a que cargue la web
window.onload = () => {
    
    // Configurar botón WhatsApp
    document.getElementById('btn-whatsapp').onclick = () => {
        const url = `https://wa.me/${MIS_DATOS.whatsapp}?text=${encodeURIComponent(MIS_DATOS.mensajeWpp)}`;
        window.open(url, '_blank');
    };

    // Configurar botón Instagram
    document.getElementById('btn-instagram').onclick = () => {
        window.open(MIS_DATOS.instagram, '_blank');
    };

    // Botón Guardar (Aquí es donde aprenderemos cosas nuevas)
    document.getElementById('btn-save').onclick = () => {
        alert("Aquí iniciaremos la descarga del contacto .vcf más adelante");
    };
};