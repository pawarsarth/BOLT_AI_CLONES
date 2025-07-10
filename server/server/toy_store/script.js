document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".toy-item button");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
        });
    });
});