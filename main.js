let nombreUsuario = prompt("Ingrese su nombre");
if (nombreUsuario == ""){
    alert("No ingresaste tu nombre de usuario");
}
else {
    alert("Bienvenido/a " + nombreUsuario + " a Melere");
}

let carrito = [];

class Articulo {
    constructor(id, nombreProducto, precioProducto, talleProducto, imagenUrl) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.talleProducto = talleProducto;
        this.imagenUrl = imagenUrl;
    }
}

const articulos = [
    new Articulo(1, 'Remera Basic', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-basic.webp'),
    new Articulo(2, 'Remera Double', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-double.webp'),
    new Articulo(3, 'Remera Dragon', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-dragon.webp'),
    new Articulo(4, 'Remera Good Luck', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-good-luck.webp'),
    new Articulo(5, 'Remera Some Luck', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-some-luck.webp'),
    new Articulo(6, 'Remera Some Love', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-some-love.webp'),
    new Articulo(7, 'Remera Oval', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-oval.webp'),
    new Articulo(8, 'Remera Fire', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/reme-fire.webp'),
    new Articulo(9, 'Buzo Incoherent', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-incoherent.webp'),
    new Articulo(10, 'Buzo Some Love', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-some-love.webp'),
    new Articulo(11, 'Buzo Some Luck', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-some-luck.webp'),
    new Articulo(12, 'Buzo Star', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-star.webp'),
    new Articulo(13, 'Balaclava Rayden', 15000, ['Único'], './assets/bala-rayden.webp'),
    new Articulo(14, 'Balaclava Spider', 15000, ['Único'], './assets/bala-spider.webp'),
    new Articulo(15, 'Medias Puas', 8000, ['Único'], './assets/medias-puas.webp'),
    new Articulo(16, 'Medias Shine', 8000, ['Único'], './assets/medias-shine.webp'),
];

function mostrarArticulos() {
    const contenedor = document.getElementById('contenedor-articulos');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos artículos
    
    articulos.forEach(articulo => {
        const articuloDiv = document.createElement('div');
        articuloDiv.classList.add('articulo');
        
        // Crear botones para las tallas
        const tallasDiv = document.createElement('div');
        tallasDiv.classList.add('tallas');
        articulo.talleProducto.forEach(talla => {
            const tallaBtn = document.createElement('button');
            tallaBtn.textContent = talla;
            tallaBtn.classList.add('talla-btn');
            tallaBtn.onclick = () => {
                seleccionarTalla(talla, articulo.id);
            };
            tallasDiv.appendChild(tallaBtn);
        });
        
        articuloDiv.innerHTML = `
            <img src="${articulo.imagenUrl}" alt="${articulo.nombreProducto}">
            <h3>${articulo.nombreProducto}</h3>
            <p>Precio: $${articulo.precioProducto}</p>
        `;
        
        articuloDiv.appendChild(tallasDiv);
        
        contenedor.appendChild(articuloDiv);
    });
}
function buscarArticulos() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const articulosFiltrados = articulos.filter(articulo => 
        articulo.nombre.toLowerCase().includes(input)
    );
    mostrarArticulos(articulosFiltrados);
}

window.onload = function() {
    mostrarArticulos(articulos);
}

function seleccionarTalla(talla, articuloId) {
    const articulo = articulos.find(a => a.id === articuloId);
    if (articulo) {
        let cantidad = parseInt(prompt(`¿Cuántas unidades deseas de ${articulo.nombreProducto}?`), 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Cantidad no válida. Debes ingresar un número positivo.");
        } else {
            let itemEnCarrito = carrito.find(item => item.articulo.id === articulo.id && item.talla === talla);
            if (itemEnCarrito) {
                itemEnCarrito.cantidad += cantidad;
            } else {
                carrito.push({ articulo, cantidad, talla });
            }
            alert(`Has añadido ${cantidad} unidad(es) de ${articulo.nombreProducto} (${talla}) al carrito.`);
        }
    } else {
        alert("Artículo no encontrado.");
    }
}

function verCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let resumenCarrito = "Contenido del carrito:\n";
    let total = 0;
    carrito.forEach(item => {
        resumenCarrito += `${item.articulo.nombreProducto} (${item.talla}) - ${item.cantidad} x $${item.articulo.precioProducto} = $${item.cantidad * item.articulo.precioProducto}\n`;
        total += item.cantidad * item.articulo.precioProducto;
    });
    resumenCarrito += `Total: $${total}\n`;
    resumenCarrito += "1. Finalizar compra\n2. Volver al menú principal";

    let opcion = prompt(resumenCarrito);
    if (opcion === '1') {
        finalizarCompra();
    } else if (opcion === '2') {
        alert("Volviendo al menú principal.");
    } else {
        alert("Opción no válida. Volviendo al menú principal.");
    }
}

function finalizarCompra() {
    alert("Compra finalizada. Gracias por tu compra.");
    carrito = [];
}

function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(
            "Elige una opción:\n" +
            "1. Comprar remeras\n" +
            "2. Comprar buzos\n" +
            "3. Comprar accesorios\n" +
            "4. Ver carrito\n" +
            "5. Medios de pago\n" +
            "6. Salir"
        );

        if (opcion === '1') {
            submenuRemeras();
        } else if (opcion === '2') {
            submenuBuzos();
        } else if (opcion === '3') {
            submenuAccesorios();
        } else if (opcion === '4') {
            verCarrito();
        } else if (opcion === '5') {
            submenuMediosDePago();
        } else if (opcion === '6') {
            alert("Saliendo. ¡Hasta luego!");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 1 y 6.");
        }
    } while (opcion !== '6');
}

function submenuRemeras() {
    let opcion;
    do {
        opcion = prompt(
            "Acá tenemos estas opciones para vos:\n" +
            "1. Remera Basic\n" +
            "2. Remera Double\n" +
            "3. Remera Dragon\n" +
            "4. Remera Good Luck\n" +
            "5. Remera Some Luck\n" +
            "6. Remera Some Love\n" +
            "7. Remera Oval\n" +
            "8. Remera Fire\n" +
            "9. Volver al menú principal"
        );

        if (opcion >= '1' && opcion <= '8') {
            // Ya no es necesario, manejarse en `seleccionarTalla`
        } else if (opcion === '9') {
            alert("Volviendo al menú principal.");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 1 y 9.");
        }
    } while (opcion !== '9');
}

function submenuBuzos() {
    let opcion;
    do {
        opcion = prompt(
            "Acá tenemos estas opciones para vos:\n" +
            "9. Buzo Incoherent\n" +
            "10. Buzo Some Love\n" +
            "11. Buzo Some Luck\n" +
            "12. Buzo Star\n" +
            "13. Volver al menú principal"
        );

        if (opcion >= '9' && opcion <= '12') {
            // Ya no es necesario, manejarse en `seleccionarTalla`
        } else if (opcion === '13') {
            alert("Volviendo al menú principal.");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 9 y 13.");
        }
    } while (opcion !== '13');
}

function submenuAccesorios() {
    let opcion;
    do {
        opcion = prompt(
            "Acá tenemos estas opciones para vos:\n" +
            "13. Balaclava Rayden\n" +
            "14. Balaclava Spider\n" +
            "15. Medias Puas\n" +
            "16. Medias Shine\n" +
            "17. Volver al menú principal"
        );

        if (opcion >= '13' && opcion <= '16') {
            // Ya no es necesario, manejarse en `seleccionarTalla`
        } else if (opcion === '17') {
            alert("Volviendo al menú principal.");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 13 y 17.");
        }
    } while (opcion !== '17');
}

function submenuMediosDePago() {
    let opcion;
    do {
        opcion = prompt(
            "Elegiste medios de pago. Elige una opción:\n" +
            "1. Tarjeta de crédito\n" +
            "2. MercadoPago\n" +
            "3. Transferencia bancaria\n" +
            "4. Volver al menú principal"
        );

        if (opcion >= '1' && opcion <= '3') {
            alert(`Has elegido el medio de pago número ${opcion}.`);
        } else if (opcion === '4') {
            alert("Volviendo al menú principal.");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 1 y 4.");
        }
    } while (opcion !== '4');
}

window.onload = function() {
    mostrarArticulos();
    mostrarMenu(); 
};
