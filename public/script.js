document.getElementById("product-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the form data
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const desc = document.getElementById("desc").value;

    const productData = {
        image,
        name,
        price,
        desc
    };

    try {
        const response = await fetch("http://localhost:3000/createproduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById("response-message").innerText = "Product created successfully!";
            document.getElementById("response-message").style.color = "green";
            loadProducts(); // Reload the products list
        } else {
            document.getElementById("response-message").innerText = "Error creating product.";
            document.getElementById("response-message").style.color = "red";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response-message").innerText = "Error creating product.";
        document.getElementById("response-message").style.color = "red";
    }
});

// Function to load products and display them as cards
async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");  // Make sure your API route is set to return the products
        const data = await response.json();
        
        if (response.ok) {
            const productsContainer = document.getElementById("product-cards");
            productsContainer.innerHTML = "";  // Clear existing products
            data.products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.desc}</p>
                    <div class="price">$${product.price}</div>
                `;

                productsContainer.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Initial load of products when the page loads
window.onload = loadProducts;
