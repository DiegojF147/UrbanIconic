class Product {
    constructor(id, nombre, tipo, rating, price, banner) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.rating = rating;
        this.price = price;
        this.banner = banner;
    }
} 

 const product1 = new Product(1, 'Nikon', 'camara', 4, 300000, 'https://images.unsplash.com/photo-1599664223846-7b8632bd5aa0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbm9uJTIwZW9zJTIwcjZ8ZW58MHx8MHx8fDA%3D');

 const product2 = new Product(2, 'Sofa Rojo', 'sofa', 3, 1000000, 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

 const product3 = new Product(3, 'zapa', 'zapatilla', 5, 55000, 'https://images.unsplash.com/photo-1712168332222-c1996322f935?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

let product = [product1, product2, product3];

 console.log(product);

 const numero = [1, 2, 3, 4];

 localStorage.setItem('product', JSON.stringify(product));

function showProduct() {
    let product = JSON.parse(localStorage.getItem('product'));
    const tbodyProduct = document.querySelector("#tbody-table-product");
    tbodyProduct.innerHTML = ''; 
    product.forEach(product => {
        //TEMPLATE STRING - TEMPLATE LITERAL
        /* QUIERO GENERAR ESTA ESTRUCTURA HTML DENTRO DEL STRING */
        const tr = `
                    <tr>
                        <td>${product.nombre}</td>
                        <td>${product.tipo}</td>
                        <td>${product.rating}</td> 
                        <td>${product.price}</td> 
                        <td>
                            <img src="${product.banner}" alt="${product.nombre}" width="50%" >
                        </td>
                        <td>
                            <button class="btn-cac"><i class="fa fa-trash"></i></button> 
                        </td>
                    </tr>
                    `;

        // Funcion que permite introducir un string con formato HTML en una posicion especifica de ese elemento al cual yo estoy accediendo. /// beforeend --> al final de su ultimo hijo que tenga este elemento. Que inserte la cadena que es el tr 
        tbodyProduct.insertAdjacentHTML('beforeend', tr);

    });
}
    function saveProduct() {

        alert("Guardando...");
        const inputNombre = document.querySelector('#nombre');
        const inputTipo = document.querySelector('#tipo');
        const inputRating = document.querySelector('#rating');
        const inputPrice = document.querySelector('#price');
        const inputBanner = document.querySelector('#banner-form');

        if (inputNombre.value.trim() !== '') {
             let product1 = JSON.parse(localStorage.getItem('product')) || [];

             const newProduct = new Product(
                 product1.length + 1,
                 inputNombre.value,
                 inputTipo.value,
                 inputRating.value,
                 inputPrice.value,
                 inputBanner.value,
             );
             product1.push(newProduct);
             localStorage.setItem('product', JSON.stringify(producto1));
            showProduct();
         } else {
             alert('Error, por favor completar')
         };

    };

    document.addEventListener('DOMContentLoaded', function() {

        const btnSaveProduct = document.querySelector('#btn-save-product');

        //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
        btnSaveProduct.addEventListener('click', saveProduct());
        showProduct();
    }); 
    showProduct();







