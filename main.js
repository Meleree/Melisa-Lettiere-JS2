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
    new Articulo(10, 'Buzo Incoherent', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-incoherent.webp'),
    new Articulo(11, 'Buzo Some Love', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-some-love.webp'),
    new Articulo(12, 'Buzo Some Luck', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-some-luck.webp'),
    new Articulo(13, 'Buzo Star', 45000, ['S', 'M', 'L', 'XL', 'XXL'], './assets/buzo-star.webp'),
    new Articulo(15, 'Balaclava Rayden', 15000, ['Único'], './assets/bala-rayden.webp'),
    new Articulo(16, 'Balaclava Spider', 15000, ['Único'], './assets/bala-spider.webp'),
    new Articulo(17, 'Medias Puas', 8000, ['Único'], './assets/medias-puas.webp'),
    new Articulo(18, 'Medias Shine', 8000, ['Único'], './assets/medias-shine.webp'),
];

function mostrarArticulos() {
    const contenedor = document.getElementById('contenedor-articulos');
    contenedor.innerHTML = ''; 
    
    articulos.forEach(articulo => {
        const articuloDiv = document.createElement('div');
        articuloDiv.classList.add('articulo');
        
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
        articulo.nombreProducto.toLowerCase().includes(input)
    );
    mostrarArticulosFiltrados(articulosFiltrados);
}

function mostrarArticulosFiltrados(articulosFiltrados) {
    const contenedor = document.getElementById('contenedor-articulos');
    contenedor.innerHTML = ''; 
    
    articulosFiltrados.forEach(articulo => {
        const articuloDiv = document.createElement('div');
        articuloDiv.classList.add('articulo');
        
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

function seleccionarTalla(talla, articuloId) {
    const articulo = articulos.find(a => a.id === articuloId);
    if (articulo) {
        let cantidad = parseInt(prompt(`¿Cuántas unidades deseas de ${articulo.nombreProducto} (${talla})?`), 10);
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

        const articulo = articulos.find(a => a.id === parseInt(opcion));
        if (articulo) {
            const talla = prompt("Selecciona la talla: " + articulo.talleProducto.join(', '));
            if (articulo.talleProducto.includes(talla)) {
                const cantidad = parseInt(prompt("¿Cuántas unidades deseas agregar al carrito?"), 10);
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Cantidad no válida. Debe ser un número mayor que 0.");
                } else {
                    seleccionarTalla(talla, articulo.id);
                }
            } else {
                alert("Talla no válida. Por favor, elige una talla disponible.");
            }
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
            "10'. Buzo Incoherent\n" +
            "11. Buzo Some Love\n" +
            "12. Buzo Some Luck\n" +
            "13. Buzo Star\n" +
            "14. Volver al menú principal"
        );

        const articulo = articulos.find(a => a.id === parseInt(opcion));
        if (articulo) {
            const talla = prompt("Selecciona la talla: " + articulo.talleProducto.join(', '));
            if (articulo.talleProducto.includes(talla)) {
                const cantidad = parseInt(prompt("¿Cuántas unidades deseas agregar al carrito?"), 10);
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Cantidad no válida. Debe ser un número mayor que 0.");
                } else {
                    seleccionarTalla(talla, articulo.id);
                }
            } else {
                alert("Talla no válida. Por favor, elige una talla disponible.");
            }
        } else if (opcion === '14') {
            alert("Volviendo al menú principal.");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 10 y 14.");
        }
    } while (opcion !== '14');
}

function submenuAccesorios() {
    let opcion;
    do {
        opcion = prompt(
            "Acá tenemos estas opciones para vos:\n" +
            "15. Balaclava Rayden\n" +
            "16. Balaclava Spider\n" +
            "17. Medias Puas\n" +
            "18. Medias Shine\n" +
            "19. Volver al menú principal"
        );

        const articulo = articulos.find(a => a.id === parseInt(opcion));
        if (articulo) {
            const cantidad = parseInt(prompt("¿Cuántas unidades deseas agregar al carrito?"), 10);
            if (isNaN(cantidad) || cantidad <= 0) {
                alert("Cantidad no válida. Debe ser un número mayor que 0.");
            } else {
                seleccionarTalla(articulo.talleProducto[0], articulo.id);
            }
        } else if (opcion === '19') {
            alert("Volviendo al menú principal.");
        } else {
            alert("Opción no válida. Por favor, elige una opción entre 15 y 19.");
        }
    } while (opcion !== '19');
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
