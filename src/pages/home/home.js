// 1. Imports
import { foodMenu } from '../../database/foodData.js';

// 2. Select the container where the food will go
const container = document.getElementById('food-container');

// 3. The Function to show the menu
const renderMenu = (data) => {
    if (!container) return;
    container.innerHTML = "";
    container.innerHTML = data.map(item => `
        <div class="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover rounded-md mb-4">
            <h3 class="text-lg font-bold text-gray-800">${item.name}</h3>
            <p class="text-gray-500 text-sm mb-2">${item.description}</p>
            <p class="text-orange-600 font-bold">Rs. ${item.price}</p>
            <button class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600">Add to Cart</button>
        </div>
    `).join('');
};

// 4. Initial Load
renderMenu(foodMenu);

// 5. Global Filter Functions
window.filterCategory = (category) => {
    if (category === 'All') {
        renderMenu(foodMenu);
    } else {
        const filtered = foodMenu.filter(item => item.category === category);
        renderMenu(filtered);
    }
};

window.sortPrice = (order) => {
    const sorted = [...foodMenu].sort((a, b) => 
        order === 'low' ? a.price - b.price : b.price - a.price
    );
    renderMenu(sorted);
};

window.filterTopRated = () => {
    const topRated = foodMenu.filter(item => item.rating >= 4.5);
    renderMenu(topRated);
};

window.filterBeverages = () => {
    const drinks = foodMenu.filter(item => item.category === 'Beverages');
    renderMenu(drinks);
};

// ✅ Theme is now handled by src/utils/theme.js — nothing needed here


let foods = [];
let editIndex = null;

const form = document.getElementById("foodForm");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const table = document.getElementById("foodTable");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const food = {
        name: nameInput.value,
        price: priceInput.value
    };

    if (editIndex === null) {
        foods.push(food);
    } else {
        foods[editIndex] = food;
        editIndex = null;
    }

    form.reset();
    displayFoods();
});

function displayFoods() {
    table.innerHTML = "";

    foods.forEach((food, index) => {
        table.innerHTML += `
            <tr class="border-b hover:bg-gray-100">
                <td class="p-2">${food.name}</td>
                <td class="p-2">${food.price}</td>
                <td class="p-2 space-x-2">
                    <button onclick="editFood(${index})"
                        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                    </button>
                    <button onclick="deleteFood(${index})"
                        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function editFood(index) {
    const food = foods[index];
    nameInput.value = food.name;
    priceInput.value = food.price;
    editIndex = index;
}

function deleteFood(index) {
    foods.splice(index, 1);
    displayFoods();
}window.editFood = editFood;
window.deleteFood = deleteFood;