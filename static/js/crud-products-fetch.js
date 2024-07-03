const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de productos
 * por medio del uso de template string de JS.
 */
async function showProducts(){
    let products =  await fetchData(BASEURL+'/api/products/', 'GET');
    const tableProducts = document.querySelector('#list-table-products tbody');
    tableProducts.innerHTML='';
    products.forEach((product, index) => {
      let tr = `<tr>
                    <td>${product.product}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                    <td>
                        <img src="${product.banner}" width="30%">
                    </td>
                    <td>
                        <button class="btn-urban" onclick='updateProduct(${product.id_product})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-urban" onclick='deleteProduct(${product.id_product})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableProducts.insertAdjacentHTML("beforeend",tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de un producto
 * @returns 
 */
async function saveProduct(){
    const idProduct = document.querySelector('#id-product').value;
    const product = document.querySelector('#product').value;
    const category = document.querySelector('#category').value;
    const price = document.querySelector('#price').value;
    const banner = document.querySelector('#banner-form').value;
    //VALIDACION DE FORMULARIO
    if (!product || !category || !price || !banner) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del producto
    const productData = {
        product: product,
        category: category,
        price: price,
        banner: banner,
    };
  let result = null;
  // Si hay un idProduct, realiza una petición PUT para actualizar el producto existente
  if(idProduct!==""){
    result = await fetchData(`${BASEURL}/api/products/${idProduct}`, 'PUT', productData);
  }else{
    // Si no hay idProduct, realiza una petición POST para crear un nuevo producto
    result = await fetchData(`${BASEURL}/api/products/`, 'POST', productData);
  }
  
  const formProduct = document.querySelector('#form-product');
  formProduct.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProducts();
}


/**
 * Function que permite eliminar un producto 
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteProduct(id){
    Swal.fire({
        title: "Esta seguro de eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/products/${id}`, 'DELETE');
          showProducts();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos del producto
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateProduct(id){
    //Buscamos en el servidor el producto de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/products/${id}`, 'GET');
    const idProduct = document.querySelector('#id-product');
    const product = document.querySelector('#product');
    const category = document.querySelector('#category');
    const price = document.querySelector('#price');
    const banner = document.querySelector('#banner-form');
    
    idProduct.value = response.id_product;
    product.value = response.product;
    category.value = response.category;
    price.value = response.price;
    banner.value = response.banner;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProduct = document.querySelector('#btn-save-product');
    // //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProduct.addEventListener('click',saveProduct);
    showProducts();
});