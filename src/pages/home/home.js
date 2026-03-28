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