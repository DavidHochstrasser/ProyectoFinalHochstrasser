const formularioProductos = document.querySelector("#formularioProductos");
const listaProductos = document.querySelector("#listaProductos");
const vaciarStock = document.querySelector("#vaciarStock");

let stock = [];

function cargarDesdeLocalStorage() {
  const productosGuardadoLS = localStorage.getItem("productos");
  if (productosGuardadoLS) {
    stock = JSON.parse(productosGuardadoLS);
    agregarProductoPantalla();
  }
}
cargarDesdeLocalStorage();

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

function resetFormulario() {
  document.querySelector("#formularioProductos").reset();
}

function agregarProductoPantalla() {
  listaProductos.innerHTML = "";
  stock.forEach((producto) => {
    const elemento = document.createElement("div");
    elemento.innerHTML = `
          <div class="card text-center mb-4">
              <div class="card-body" style="background-color: #c5dff8 !important;">
                  <strong>Nombre Producto</strong>: ${producto.nombre}
                  <strong>Precio Producto</strong>: ${producto.precio}
                  <strong>Cantidad Producto</strong>: ${producto.cantidad}
                  <a href="#" class="btn eliminarProducto" id="${producto.nombre}"><i class="fa-solid fa-trash"></i></a>
              </div>
          </div>
          `;

    listaProductos.append(elemento);

    // console.log(elemento);
  });
}

function actualizarLocalStorage() {
  const listaArrayJSON = JSON.stringify(stock);
  localStorage.setItem("productos", listaArrayJSON);
}

formularioProductos.addEventListener("submit", function (event) {
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const cantidad = document.querySelector("#cantidad").value;

  agregarProducto(nombre, precio, cantidad);
  agregarProductoPantalla();
  resetFormulario();
  actualizarLocalStorage();

  // console.log(stock);

  event.preventDefault();
});

function vaciarPantalla() {
  listaProductos.innerHTML = "";
  stock = [];
  actualizarLocalStorage();

  // console.log(stock);
}
vaciarStock.addEventListener("click", function (event) {
  if (event) {
    Swal.fire({
      title: `Esta por eliminar todos los productos del Stock`,
      text: "Esta seguro que quiere eliminarlos?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarPantalla();
        event.preventDefault();

        Swal.fire({
          title: "Aceptado",
          text: "El Stock ha sido eliminado",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "El Stock no ha sido eliminado",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  }
});

function quitarProductoStock() {
  listaProductos.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminarProducto")) {
      const nombreProducto = event.target.getAttribute("id");

      stock = stock.filter((producto) => producto.nombre !== nombreProducto);

      agregarProductoPantalla();
      actualizarLocalStorage();
    }
  });
}
quitarProductoStock();

/////Busqueda Productos
const formularioBusqueda = document.querySelector("#formularioBusqueda");
const listaBuscados = document.querySelector("#listaBuscados");
const vaciarBusqueda = document.querySelector("#vaciarBusqueda");

function buscarProducto(nombreBuscado) {
  return stock.find(
    (producto) => producto.nombre.toLowerCase() === nombreBuscado.toLowerCase()
  );
}

function agregarProductoPantallaBusqueda() {
  listaBuscados.innerHTML = "";
  const nombreBuscado = document.querySelector("#nombreBuscado").value;
  const productoEncontrado = buscarProducto(nombreBuscado);

  if (productoEncontrado) {
    const elemento = document.createElement("div");
    elemento.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body" style="background-color: #c5dff8 !important;">
          <strong>Nombre Producto</strong>: ${productoEncontrado.nombre}
          <strong>Precio Producto</strong>: ${productoEncontrado.precio}
          <strong>Cantidad Producto</strong>: ${productoEncontrado.cantidad}
        </div>
      </div>
    `;

    listaBuscados.append(elemento);
  } else {
    Toastify({
      text: "Producto no encontrado",
      style: {
        background: "red",
      },

      duration: 3000,
    }).showToast();
    listaBuscados.innerHTML = "";
  }
}

function vaciarPantallaBusqueda() {
  listaBuscados.innerHTML = "";
}

function resetformularioBusqueda() {
  document.querySelector("#formularioBusqueda").reset();
}

formularioBusqueda.addEventListener("submit", function (e) {
  e.preventDefault();
  agregarProductoPantallaBusqueda();
  resetformularioBusqueda();
});

vaciarBusqueda.addEventListener("click", function (event) {
  event.preventDefault();
  vaciarPantallaBusqueda();
});
