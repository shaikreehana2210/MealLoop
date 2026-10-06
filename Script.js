// -------------------------
// SAMPLE FOOD DATA
// -------------------------

let meals = [
    {
        id: 1,
        name: "Veg Biryani",
        restaurant: "Campus Canteen",
        category: "Meals",
        originalPrice: 120,
        price: 70,
        quantity: 8,
        pickup: "7 PM - 8 PM",
        image: "🍛"
    },
    {
        id: 2,
        name: "Paneer Wrap",
        restaurant: "Food Corner",
        category: "Meals",
        originalPrice: 100,
        price: 60,
        quantity: 5,
        pickup: "6 PM - 7 PM",
        image: "🌯"
    },
    {
        id: 3,
        name: "Samosa",
        restaurant: "College Cafe",
        category: "Snacks",
        originalPrice: 30,
        price: 15,
        quantity: 15,
        pickup: "5 PM - 6 PM",
        image: "🥟"
    },
    {
        id: 4,
        name: "Fresh Juice",
        restaurant: "Juice Point",
        category: "Drinks",
        originalPrice: 60,
        price: 35,
        quantity: 10,
        pickup: "6 PM - 8 PM",
        image: "🧃"
    }
];

let cart = [];
let selectedCategory = "All";

let impact = {
    meals: 0,
    waste: 0,
    money: 0
};


// -------------------------
// SPLASH SCREEN
// -------------------------

setTimeout(function () {
    showScreen("login");
}, 2500);


// -------------------------
// SCREEN NAVIGATION
// -------------------------

function showScreen(screenName) {

    let screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.add("hidden");
    });

    document.getElementById(screenName).classList.remove("hidden");

    if (screenName === "home") {
        displayMeals();
    }

    if (screenName === "cart") {
        displayCart();
    }

    if (screenName === "impact") {
        updateImpact();
    }
}


// -------------------------
// LOGIN
// -------------------------

function loginUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please enter all details.");
        return;
    }

    document.getElementById("userName").innerText = name;

    showScreen("home");
}


// -------------------------
// DISPLAY MEALS
// -------------------------

function displayMeals() {

    let list = document.getElementById("foodList");

    let searchText =
        document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    meals.forEach(function(meal) {

        let matchesSearch =
            meal.name.toLowerCase().includes(searchText);

        let matchesCategory =
            selectedCategory === "All" ||
            meal.category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            let discount =
                Math.round(
                    ((meal.originalPrice - meal.price) /
                    meal.originalPrice) * 100
                );

            list.innerHTML += `
                <div class="food-card">

                    <div class="food-image">
                        ${meal.image}
                    </div>

                    <h3>${meal.name}</h3>

                    <p class="restaurant">
                        ${meal.restaurant}
                    </p>

                    <div class="price">
                        <span class="original">
                            ₹${meal.originalPrice}
                        </span>

                        <span class="sale-price">
                            ₹${meal.price}
                        </span>
                    </div>

                    <span class="discount">
                        ${discount}% OFF
                    </span>

                    <p>
                        Available: ${meal.quantity}
                    </p>

                    <button onclick="showDetails(${meal.id})">
                        View Details
                    </button>

                </div>
            `;
        }
    });

    if (list.innerHTML === "") {
        list.innerHTML = "<p>No meals found.</p>";
    }
}


// -------------------------
// CATEGORY FILTER
// -------------------------

function filterCategory(category) {

    selectedCategory = category;

    displayMeals();
}


// -------------------------
// FOOD DETAILS
// -------------------------

function showDetails(id) {

    let meal = meals.find(function(item) {
        return item.id === id;
    });

    let discount =
        Math.round(
            ((meal.originalPrice - meal.price) /
            meal.originalPrice) * 100
        );

    document.getElementById("foodDetails").innerHTML = `

        <div class="details-image">
            ${meal.image}
        </div>

        <div class="detail-info">

            <h2>${meal.name}</h2>

            <p>
                <strong>Restaurant:</strong>
                ${meal.restaurant}
            </p>

            <p>
                <strong>Original Price:</strong>
                ₹${meal.originalPrice}
            </p>

            <p>
                <strong>MealLoop Price:</strong>
                <span class="sale-price">
                    ₹${meal.price}
                </span>
            </p>

            <p>
                <strong>Discount:</strong>
                ${discount}% OFF
            </p>

            <p>
                <strong>Quantity Available:</strong>
                ${meal.quantity}
            </p>

            <p>
                <strong>Pickup Time:</strong>
                ${meal.pickup}
            </p>

            <button onclick="addToCart(${meal.id})">
                Order Now
            </button>

        </div>
    `;

    showScreen("details");
}


// -------------------------
// ADD TO CART
// -------------------------

function addToCart(id) {

    let meal = meals.find(function(item) {
        return item.id === id;
    });

    let existing = cart.find(function(item) {
        return item.id === id;
    });

    if (existing) {

        if (existing.cartQuantity < meal.quantity) {
            existing.cartQuantity++;
        } else {
            alert("Maximum available quantity reached.");
        }

    } else {

        cart.push({
            ...meal,
            cartQuantity: 1
        });
    }

    alert("Meal added to cart!");

    showCart();
}


// -------------------------
// SHOW CART
// -------------------------

function showCart() {

    showScreen("cart");
    displayCart();
}


function displayCart() {

    let container = document.getElementById("cartItems");

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        container.innerHTML = "<p>Your cart is empty.</p>";

        document.getElementById("cartTotal").innerText = "0";

        return;
    }

    cart.forEach(function(item) {

        let itemTotal =
            item.price * item.cartQuantity;

        total += itemTotal;

        container.innerHTML += `

            <div class="cart-item">

                <h3>${item.image} ${item.name}</h3>

                <p>${item.restaurant}</p>

                <p>
                    ₹${item.price} ×
                    ${item.cartQuantity}
                </p>

                <div class="quantity-control">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <strong>${item.cartQuantity}</strong>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total;
}


// -------------------------
// CHANGE QUANTITY
// -------------------------

function changeQuantity(id, change) {

    let item = cart.find(function(item) {
        return item.id === id;
    });

    let meal = meals.find(function(item) {
        return item.id === id;
    });

    item.cartQuantity += change;

    if (item.cartQuantity <= 0) {

        cart = cart.filter(function(item) {
            return item.id !== id;
        });

    }

    if (item && item.cartQuantity > meal.quantity) {
        item.cartQuantity = meal.quantity;
    }

    displayCart();
}


// -------------------------
// CHECKOUT
// -------------------------

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let totalMeals = 0;
    let moneySaved = 0;

    cart.forEach(function(item) {

        totalMeals += item.cartQuantity;

        moneySaved +=
            (item.originalPrice - item.price) *
            item.cartQuantity;

        let meal = meals.find(function(m) {
            return m.id === item.id;
        });

        meal.quantity -= item.cartQuantity;
    });

    impact.meals += totalMeals;

    impact.waste += totalMeals * 0.25;

    impact.money += moneySaved;

    let orderNumber =
        "ML" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("orderId").innerText =
        orderNumber;

    document.getElementById("pickupInfo").innerText =
        cart[0].pickup;

    cart = [];

    showScreen("confirmation");
}


// -------------------------
// PROVIDER - POST MEAL
// -------------------------

function postMeal() {

    let name =
        document.getElementById("providerFood").value;

    let category =
        document.getElementById("providerCategory").value;

    let quantity =
        Number(document.getElementById("providerQuantity").value);

    let price =
        Number(document.getElementById("providerPrice").value);

    let originalPrice =
        Number(document.getElementById("providerOriginalPrice").value);

    let pickup =
        document.getElementById("providerPickup").value;

    let restaurant =
        document.getElementById("providerRestaurant").value;


    if (
        name === "" ||
        quantity <= 0 ||
        price <= 0 ||
        originalPrice <= 0 ||
        pickup === "" ||
        restaurant === ""
    ) {
        alert("Please fill all details.");
        return;
    }


    let newMeal = {

        id: Date.now(),

        name: name,

        restaurant: restaurant,

        category: category,

        originalPrice: originalPrice,

        price: price,

        quantity: quantity,

        pickup: pickup,

        image: "🍱"
    };


    meals.push(newMeal);


    alert("Surplus meal posted successfully! 🎉");


    document.getElementById("providerFood").value = "";
    document.getElementById("providerQuantity").value = "";
    document.getElementById("providerPrice").value = "";
    document.getElementById("providerOriginalPrice").value = "";
    document.getElementById("providerPickup").value = "";
    document.getElementById("providerRestaurant").value = "";


    showScreen("home");
}


// -------------------------
// IMPACT
// -------------------------

function updateImpact() {

    document.getElementById("mealsRescued").innerText =
        impact.meals;

    document.getElementById("foodWaste").innerText =
        impact.waste.toFixed(1) + " kg";

    document.getElementById("moneySaved").innerText =
        "₹" + impact.money;
}