const url = "https://jsonplaceholder.typicode.com/users";
const listadoProvedores = document.querySelector("#listadoProvedores");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((usuario) => {
      const div = document.createElement("div");
      div.innerHTML = `
               <div class="card text-center mb-4 mt-4">
                <div class="card-body" style="background-color: #c5dff8 !important;">
                     <strong>Nombre</strong>: ${usuario.name}
                    <strong>Telefono</strong>: ${usuario.phone}
                      <strong>E-mail</strong>: ${usuario.email}
                      
                  </div>
              </div>
             `;

      listadoProvedores.append(div);
    });
  });
