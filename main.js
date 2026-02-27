window.onload = () => {
    // 1. Cargamos el nombre y la profesión desde el CONFIG
    document.getElementById('txt-nombre').innerText = CONFIG_VCARD.nombre;
    document.getElementById('txt-profesion').innerText = CONFIG_VCARD.profesion;
    document.getElementById('img-perfil').src = CONFIG_VCARD.foto;
    document.getElementById('btn-guardar').onclick = () => generarVCard();
    
    // 2. Configuramos el botón de WhatsApp
    const btnWpp = document.getElementById('btn-whatsapp');
    btnWpp.onclick = () => {
        const url = `https://wa.me/${CONFIG_VCARD.redes.whatsapp}?text=${encodeURIComponent(CONFIG_VCARD.mensajeWpp)}`;
        window.open(url, '_blank');
    };

    // 3. Configuramos el botón de Instagram
    document.getElementById('btn-instagram').onclick = () => {
        window.open(CONFIG_VCARD.redes.instagram, '_blank');
    };
    
    // 4. Aplicamos el fondo desde el JS (Opcional, pero muy dinámico)
    document.body.style.background = CONFIG_VCARD.temaColor;
};

// como descargar mi contacto en el celular?
function generarVCard() {
    // 1. Definimos el contenido del archivo siguiendo el estándar VCF
    // FN es el nombre completo, TEL es el teléfono.
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${CONFIG_VCARD.nombre}
ORG:${CONFIG_VCARD.profesion}
TEL;TYPE=CELL:${CONFIG_VCARD.redes.whatsapp}
END:VCARD`;

    // 2. Convertimos ese texto en un "Blob" (un objeto de datos binarios)
    // Es como decirle al navegador: "Este texto tratalo como un archivo real".
    const blob = new Blob([vcard], { type: 'text/vcard; charset=utf-8' });
    
    // 3. Creamos una URL temporal que apunta a ese archivo en la memoria del navegador
    const url = window.URL.createObjectURL(blob);
    
    // 4. Creamos un link <a> "fantasma" que no se ve en el HTML
    const linkDescarga = document.createElement('a');
    linkDescarga.href = url;
    
    // 5. Le ponemos nombre al archivo que se va a descargar
    linkDescarga.download = `${CONFIG_VCARD.nombre}.vcf`;
    
    // 6. Simulamos que el usuario le hizo clic al link invisible
    linkDescarga.click();
    
    // 7. Limpiamos la memoria borrando la URL temporal
    window.URL.revokeObjectURL(url);
}