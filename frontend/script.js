document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('AddProducts');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

       
        const payload = {
            prod_name: document.getElementById('product_name').value,
            category_id: parseInt(document.getElementById('category_id').value),
            prod_description: document.getElementById('product_description').value,
            prod_color: document.getElementById('product_color').value,
            prod_price: parseFloat(document.getElementById('product_price').value),
            available_stock: parseInt(document.getElementById('available_stocks').value)
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Product added successfully! ID: ${result.id}`);
                form.reset();
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData.detail)}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to connect to backend server. Make sure Uvicorn is running!');
        }
    });
});