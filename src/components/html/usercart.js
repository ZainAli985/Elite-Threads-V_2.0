const checkout_box_container = document.querySelector('.checkout-box');

const cart_container = document.querySelector('.cart-container');




async function UserCart() {
    try {
        const userName = 'zainali'
        const response = await fetch('http://localhost:3000/getusercart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName
            })
        });
        const data = await response.json();

        let cartProducts = data.products;
        console.log(cartProducts);

        // THINGS 
        cartProducts.forEach(product => {

            let image = product.image;
            let name = product.name;
            let price = product.price;
            let desc = product.desc;
            let category = product.desc;
            let qty = product.qty;

            const cart_item = document.createElement('div');
            cart_item.classList.add('cart-product');

            cart_item.innerHTML =
                `
               <div class="cart-product-img">
                <img src="${image}" alt="">
            </div>
            <div class="product-details">
                <h2>$${price}/-</h2>
                <h2>${name}</h2>
                <span id="qty">
                    QTY:
                    <i class="fa-solid fa-plus" id="increament"></i>
                    ${qty}
                    <i class="fa-solid fa-minus" id="decreament"></i>
                </span>

            </div>
            <div class="select-delete-container">
                <img src="delete-logo.svg" alt="bin">
                <input type="checkbox"  id="product-check">
            </div>

                `
            cart_container.appendChild(cart_item);
        });


        checkout_box_container.innerHTML =
            `
        <div class="subtotal-price">
            <span id="subtotal">SUBTOTAL: $0.00/-</span>
        </div>
        <div class="checkout-btn-container">
            <button type="button" class="checkout-btn">CHECKOUT</button>
        </div>
        `
        const checkboxes = document.querySelectorAll('#product-check');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSubtotal);
        });
        

    }
    catch (err) {
        console.log(err)
    }
}

UserCart();

// Update SubTotal 

function updateSubtotal() {
    let subtotal = 0;

    const selectedProducts = document.querySelectorAll('#product-check:checked');
    selectedProducts.forEach((checkbox) => {
        const productElement = checkbox.closest('.cart-product');
        const price = parseFloat(productElement.querySelector('.product-details h2').textContent.replace('$', '').replace('/-', ''));

        subtotal += price;  
    });

    // Update subtotal on UI
    const subtotalElement = document.getElementById('subtotal');
    subtotalElement.textContent = `SUBTOTAL: $${subtotal}/-`;
}