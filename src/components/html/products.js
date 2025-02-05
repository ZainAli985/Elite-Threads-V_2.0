const productcontainer = document.querySelector('.products-container');

async function getproducts() {
    try {
        const response = await fetch('http://localhost:3000/getproducts');
        const data = await response.json();
        let products = data.products;

        products.forEach(product => {
            let imgurl = product.image;
            let productname = product.name;
            let price = product.price;
            let desc = product.desc;
            let category = product.category;

            const productbox = document.createElement('div');
            productbox.classList.add('product-box');
            productbox.innerHTML = `
                <div class="product-img">
                    <img src="${imgurl}" alt="${productname}">
                </div>
                <div class="product-info">
                    <div class="price">
                        <h2>$${price}/-</h2>
                    </div>
                    <div class="product-title">
                        <h3>${productname}</h3>
                    </div>
                </div>
            `;

            productcontainer.appendChild(productbox);

            // Deleting the product
            productbox.addEventListener('click', async () => {
                try {
                    const response = await fetch('http://localhost:3000/deleteproducts', {
                        method: 'POST', // or 'DELETE', depending on your backend setup
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name: productname }), // Sending product name
                    });

                    const result = await response.json();

                    if (response.ok) {
                        console.log(result.message);
                        // Remove product box from the DOM
                        productbox.remove();
                    } else {
                        console.error(result.message);
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            });
        });
    } catch (e) {
        console.error('Error fetching products:', e);
    }
}

getproducts();
