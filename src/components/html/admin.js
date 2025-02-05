const form = document.getElementById('panelform');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Inputs
    const imageURL = document.querySelector('.imgurl').value;
    const productTitle = document.querySelector('.producttitle').value;
    const price = document.querySelector('.price').value;
    const desc = document.querySelector('#paneldesc').value;

    const categoryElement = document.querySelector('.panelcategories .selected');
    const category = categoryElement ? categoryElement.textContent : "";

    if (!imageURL || !productTitle || !price || !desc || !category) {
        alert('All Fields Are Required. Please Fill All');
        return;
    }

    const product = {
        image: imageURL,
        name: productTitle,
        price: parseFloat(price),
        desc,
        category
    };

    try {
        const response = await fetch('http://localhost:3000/createproduct', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        const data = await response.json().catch(() => ({ message: 'Invalid server response' }));

        if (response.ok) {
            alert('PRODUCT CREATED SUCCESSFULLY');
            form.reset();
            document.querySelectorAll('.panelcategories .paneloption').forEach((opt) => {
                opt.classList.remove('selected');
            });
        } else {
            alert(`ERROR: ${data.message}`);
        }
    } catch (err) {
        console.error('Error Submitting Form', err);
        alert('An error occurred. Please try again later.');
    }
});

// Add event listeners to category options
const categoryOptions = document.querySelectorAll('.panelcategories .paneloption');
categoryOptions.forEach((option) => {
    option.addEventListener('click', () => {
        categoryOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});
