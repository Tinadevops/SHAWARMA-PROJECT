
document.addEventListener("DOMContentLoaded", function () {
    fetchMenu();
    document.getElementById("place-order").addEventListener("click", placeOrder);
});

function fetchMenu() {
    fetch(" https://cokgpy19o9.execute-api.us-east-2.amazonaws.com/prod/menu")
        .then(response => response.json())
        .then(menu => {
            const menuDiv = document.getElementById("menu");
            menuDiv.innerHTML = "<h2>Menu</h2>";
            menu.forEach(item => {
                menuDiv.innerHTML += `<p>${item.name} - $${item.price}</p>`;
            });
        });
}

function placeOrder() {
    const shawarmaType = document.getElementById("shawarma-type").value;
    const quantity = document.getElementById("quantity").value;
    const customerName = document.getElementById("customer-name").value;

    const orderData = {
        shawarma_type: shawarmaType,
        quantity: parseInt(quantity),
        customer_name: customerName
    };

    fetch("https://cokgpy19o9.execute-api.us-east-2.amazonaws.com/prod/order", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const orderResponseDiv = document.getElementById("order-response");
            orderResponseDiv.innerText = `Order placed successfully! Order ID: ${data.order_id}`;
        })
        .catch(error => {
            console.error("Error placing order:", error);
            const orderResponseDiv = document.getElementById("order-response");
            orderResponseDiv.innerText = "Error placing order. Please try again.";
        });
}
