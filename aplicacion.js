//Array de Objetos-Productos//

let stock = [];

function agregarProducto(nombre, precio, cantidad) {
  const productoExistente = stock.find(
    (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (productoExistente) {
    productoExistente.cantidad += parseInt(cantidad);
  } else {
    const nuevoProducto = {
      nombre: nombre,
      precio: precio,
      cantidad: parseInt(cantidad),
    };

    stock.push(nuevoProducto);
  }
}

//Clase para ejecutar metodos//

class Metodos {
  agregarProductoPantalla(nuevoProducto) {
    const listaProductos = document.querySelector("#listaProductos");
    const elemento = document.createElement("div");
    elemento.innerHTML = ` 
    <div class="card text-center mb-4">
        <div class="card-body" style="background-color: #c5dff8 !important;">
            <strong>Nombre Producto</strong>: ${nuevoProducto.nombre}
            <strong>Precio Producto</strong>: ${nuevoProducto.precio}
            <strong>Cantidad Producto</strong>: ${nuevoProducto.cantidad}
            <a href="#" class="btn" id="quitar"><i class="fa-solid fa-trash"></i></a>
        </div>
    </div>
    `;
    listaProductos.appendChild(elemento);
    this.resetFormulario();
  }

  agregarProductoPantallaBusqueda(productos) {
    const listaBuscados = document.querySelector("#listaBuscados");
    const elemento = document.createElement("div");
    elemento.innerHTML = ` 
    <div class="card text-center mb-4">
        <div class="card-body" style="background-color: #c5dff8 !important;">
            <strong>Nombre Producto</strong>: ${productos.nombre}
            <strong>Precio Producto</strong>: ${productos.precio}
            <strong>Cantidad Producto</strong>: ${productos.cantidad}
            <a href="#" class="btn" id="quitar"><i class="fa-solid fa-trash"></i></a>
        </div>
    </div>
    `;
    listaBuscados.appendChild(elemento);
    this.resetFormularioBusqueda();
  }

  resetFormulario() {
    document.querySelector("#formularioProductos").reset();
  }

  resetFormularioBusqueda() {
    document.querySelector("#formularioBusqueda").reset();
  }

  quitarProducto(elemento) {
    if (elemento.id === "quitar") {
      Swal.fire({
        title: `${usuarioIngresado.nombre}, esta por eliminar un producto`,
        text: "Esta seguro que quiere eliminarlo?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          elemento.parentElement.parentElement.parentElement.remove();
          Swal.fire({
            title: "Aceptado",
            text: "El producto ha sido eliminado",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "El producto no ha sido eliminado",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
      });
    }
  }

  buscarProducto(nombreBuscado) {
    return stock.find(
      (producto) =>
        producto.nombre.toLowerCase() === nombreBuscado.toLowerCase()
    );
  }
}
//DOM para mostrar productos agregados en pantalla
document
  .querySelector("#formularioProductos")
  .addEventListener("submit", function (event) {
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const cantidad = document.querySelector("#cantidad").value;

    agregarProducto(nombre, precio, cantidad);
    const metodo = new Metodos();
    metodo.agregarProductoPantalla(stock[stock.length - 1]);

    event.preventDefault();
  });

//Boton para ejecutar el metodo quitar
document
  .querySelector("#listaProductos")
  .addEventListener("click", function (e) {
    const metodo = new Metodos();
    metodo.quitarProducto(e.target);
  });

//DOM para mostrar productos buscados en pantalla
document
  .querySelector("#formularioBusqueda")
  .addEventListener("submit", function (event) {
    const nombreBuscado = document.querySelector("#nombreBuscado").value;

    const metodo = new Metodos();
    const productoBuscado = metodo.buscarProducto(nombreBuscado);

    if (productoBuscado) {
      metodo.agregarProductoPantallaBusqueda(productoBuscado);
    } else {
      Toastify({
        text: "Producto no encontrado",
        style: {
          background: "red",
        },

        duration: 3000,
      }).showToast();
    }

    event.preventDefault();
  });
//Accion-Boton para ejecutar el metodo quitar
document
  .querySelector("#listaBuscados")
  .addEventListener("click", function (e) {
    const metodo = new Metodos();
    metodo.quitarProducto(e.target);
  });

//localStorage
let usuario = prompt("Ingrese nombre de usuario");
let documento = prompt("Ingrese su DNI");

const usuarioIngresado = {
  nombre: usuario,
  dni: documento,
};
const usuarioJSON = JSON.stringify(usuarioIngresado);

localStorage.setItem("usuario", usuarioJSON);

if (usuario != "") {
  Swal.fire({
    title: "Hola " + usuario + ", bienvenido!",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
} else {
  alert("Ingrese un nombre de usuario válido");
}

"Hola " + usuario + ", bienvenido!";
