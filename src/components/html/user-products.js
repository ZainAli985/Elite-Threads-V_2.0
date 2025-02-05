

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
                        <img class = 'cart-logo'src="cart-logo.svg" alt="">
                    </div>
                    <div class="product-title">
                    <h3>${productname}</h3>
                    </div>
                    </div>
                    `;

            productcontainer.appendChild(productbox);
            const cartlogo = productbox.querySelector('.cart-logo');
            cartlogo.addEventListener('click', async () => {
                let username = 'zainali';
                try {
                    const response = await fetch('http://localhost:3000/createcartproducts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: productname,
                            username: username
                        }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log(data.message);
                        console.log(data.cart);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

getproducts();