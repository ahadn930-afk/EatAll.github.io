let projectName = "Eat All Food Website";
let totalItems = 10;
let isWebsiteActive = true;
let foodItems = ["Burger", "Pizza", "Fries", "Sandwich"];
let projectInfo = {
    developer: "Abdul Ahad",
    semester: 6,
    subject: "Web Development"
};


document.getElementById("name").innerHTML = "Project Name: " + projectName;
document.getElementById("items").innerHTML = "Total Items: " + totalItems;
document.getElementById("status").innerHTML = "Website Active: " + isWebsiteActive;
document.getElementById("foods").innerHTML = "Food Items: " + foodItems;
document.getElementById("developer").innerHTML = "Developer: " + projectInfo.developer;


const showSummary = () => {
    return "Welcome to " + projectName + ". Total menu items are " + totalItems;
};


const displaySummary = () => {
    document.getElementById("summary").innerHTML = showSummary();
};

let foodMenu = [
    { 
        id: 1, 
        name: "Beef Burger", 
        price: 550, 
        category: "Fast Food", 
        status: "Available" 
    },
    { 
        id: 2, 
        name: "Chicken Pizza", 
        price: 1200, 
        category: "Italian", 
        status: "Available" 
    },
    { 
        id: 3, 
        name: "Club Sandwich", 
        price: 450, 
        category: "Snacks", 
        status: "Out of Stock" 
    },
    { 
        id: 4, 
        name: "French Fries", 
        price: 250, 
        category: "Sides", 
        status: "Available" 
    }
];

function displayMenu() {
    const container = document.getElementById("menu-container");

    container.innerHTML = foodMenu.map(item => `
        <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
            <p class="text-gray-600 mt-1">Category: ${item.category}</p>
            <p class="text-red-600 font-semibold mt-2">Price: Rs. ${item.price}</p>
            <span class="text-sm px-2 py-1 rounded mt-2 ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                ${item.status}
            </span>
        </div>
    `).join('');
}

// Call the function to display items when the page loads
displayMenu();


document.getElementById('add-food-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('food-name').value;
    const price = document.getElementById('food-price').value;
    const category = document.getElementById('food-category').value;

    const newItem = {
        id: foodMenu.length + 1,
        name: name,
        price: parseInt(price),
        category: category,
        status: "Available"
    };

    foodMenu.push(newItem);

    displayMenu();

    this.reset();
});

function displayMenu() {
    const container = document.getElementById("menu-container");

    container.innerHTML = foodMenu.map(item => `
        <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
            <p class="text-gray-600 mt-1">Category: ${item.category}</p>
            <p class="text-red-600 font-semibold mt-2">Price: Rs. ${item.price}</p>
            <span class="text-sm px-2 py-1 rounded mt-2 ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                ${item.status}
            </span>
            <button onclick="deleteItem(${item.id})" class="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                Delete
            </button>
        </div>
    `).join('');
}

function deleteItem(id) {
    foodMenu = foodMenu.filter(item => item.id !== id);
    displayMenu();
}

function displayMenu() {
    const container = document.getElementById("menu-container");

    container.innerHTML = foodMenu.map(item => `
        <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
            <p class="text-gray-600 mt-1">Category: ${item.category}</p>
            <p class="text-red-600 font-semibold mt-2">Price: Rs. ${item.price}</p>
            <div class="flex space-x-2 mt-4">
                <button onclick="openEditModal(${item.id})" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Edit
                </button>
                <button onclick="deleteItem(${item.id})" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openEditModal(id) {
    const item = foodMenu.find(f => f.id === id);
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-price').value = item.price;
    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

function updateItem() {
    const id = parseInt(document.getElementById('edit-id').value);
    const name = document.getElementById('edit-name').value;
    const price = parseInt(document.getElementById('edit-price').value);

    foodMenu = foodMenu.map(item => 
        item.id === id ? { ...item, name: name, price: price } : item
    );

    displayMenu();
    closeModal();
}

function displayMenu(data = foodMenu) {
    const container = document.getElementById("menu-container");
    container.innerHTML = data.map(item => `
        <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
            <p class="text-gray-600 mt-1">${item.category}</p>
            <p class="text-red-600 font-semibold mt-2">Rs. ${item.price}</p>
            <div class="flex space-x-2 mt-4">
                <button onclick="openEditModal(${item.id})" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                <button onclick="deleteItem(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
        </div>
    `).join('');
}

function applyFilters() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filterValue = document.getElementById('filter-options').value;

    let filtered = foodMenu.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        
        if (filterValue === "low-price") return matchesSearch && item.price < 500;
        if (filterValue === "high-price") return matchesSearch && item.price >= 500;
        if (filterValue === "fast-food") return matchesSearch && item.category === "Fast Food";
        if (filterValue === "italian") return matchesSearch && item.category === "Italian";
        if (filterValue === "available") return matchesSearch && item.status === "Available";
        
        return matchesSearch;
    });

    displayMenu(filtered);
}


function displayMenu(data = foodMenu) {
    const container = document.getElementById("menu-container");
    
    container.innerHTML = data.map(item => {
        let priceTag;
        if (item.price < 500) {
            priceTag = "Budget Friendly";
        } else {
            priceTag = "Premium Choice";
        }

        let statusClass;
        if (item.status === "Available") {
            statusClass = "text-green-600";
        } else {
            statusClass = "text-red-600";
        }

        let discountMsg;
        if (item.price > 1000) {
            discountMsg = "10% Discount Applied!";
        } else {
            discountMsg = "Standard Price";
        }

        let delivery;
        if (item.price > 600) {
            delivery = "Free Delivery";
        } else {
            delivery = "Delivery: Rs. 50";
        }

        let icon;
        if (item.category === "Fast Food") {
            icon = "🍔";
        } else if (item.category === "Italian") {
            icon = "🍕";
        } else {
            icon = "🍽️";
        }

        return `
            <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center">
                <span class="text-3xl mb-2">${icon}</span>
                <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
                <p class="text-xs font-semibold text-blue-500 uppercase tracking-wide">${priceTag}</p>
                <p class="text-gray-500 text-sm">${item.category}</p>
                <p class="font-bold text-red-600 text-lg">Rs. ${item.price}</p>
                <p class="text-xs text-orange-500 font-medium">${discountMsg}</p>
                <p class="text-sm font-bold ${statusClass}">${item.status}</p>
                <p class="text-gray-400 text-xs mt-2 pt-2 border-t w-full">${delivery}</p>
                
                <div class="flex space-x-2 mt-4">
                    <button onclick="openEditModal(${item.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
                    <button onclick="deleteItem(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}


function runMenuAnalysis() {
    let totalStockValue = 0;
    for (let i = 0; i < foodMenu.length; i++) {
        totalStockValue += foodMenu[i].price;
    }
    console.log("Total Menu Value: Rs. " + totalStockValue);

    let premiumItems = [];
    for (let item of foodMenu) {
        if (item.price > 800) {
            premiumItems.push(item.name);
        }
    }
    console.log("Premium Items List: " + premiumItems.join(", "));

    let categoriesSeen = {};
    for (let key in foodMenu) {
        let cat = foodMenu[key].category;
        categoriesSeen[cat] = (categoriesSeen[cat] || 0) + 1;
    }
    console.log("Items per Category:", categoriesSeen);
}

runMenuAnalysis();

function runWhileLoopAnalysis() {
    let index = 0;
    let foundHighPrice = false;
    
    while (index < foodMenu.length && !foundHighPrice) {
        if (foodMenu[index].price > 1000) {
            console.log("First Luxury Item Found: " + foodMenu[index].name);
            foundHighPrice = true;
        }
        index++;
    }

    let stockToVerify = foodMenu.length;
    while (stockToVerify > 0) {
        let currentItem = foodMenu[stockToVerify - 1];
        if (currentItem.status === "Available") {
            console.log("Verified Stock for: " + currentItem.name);
        }
        stockToVerify--;
    }
}

runWhileLoopAnalysis();

function deleteItem(id) {
    // 1. Remove the item from the array
    foodMenu = foodMenu.filter(item => item.id !== id);
    
    // 2. Refresh the UI (Phase 1)
    displayMenu();
    
    // 3. Re-run the Phase 2 Analysis
    console.clear(); // Clears old messages so you only see the new ones
    runWhileLoopAnalysis(); 
}



// FIRST: Define the functions
function calculateDiscount(price, percentage) {
    let discount = (price * percentage) / 100;
    return price - discount;
}

function isEligibleForFreeDelivery(price) {
    return price > 700 ? "Eligible" : "Not Eligible";
}

function countItemsInCategory(categoryName) {
    return foodMenu.filter(item => item.category === categoryName).length;
}

function formatCurrency(amount) {
    return "Rs. " + amount.toLocaleString();
}

function getItemSummary(item) {
    return `${item.name} costs ${formatCurrency(item.price)} and is ${item.status}.`;
}

// SECOND: Run the test calls at the very bottom
console.log("--- Testing Step 4 Functions ---");
console.log("Discount Test:", calculateDiscount(1000, 10)); // Should show 900
console.log("Delivery Test:", isEligibleForFreeDelivery(800)); 
console.log("Italian Count:", countItemsInCategory("Italian")); 
console.log("Currency Test:", formatCurrency(5000)); 
console.log("Summary Test:", getItemSummary(foodMenu[0]));



function safeMenuUpdate(itemIndex) {
    try {
        console.log("--- Step 5: Testing Error Handling ---");
        let item = foodMenu[itemIndex];
        
        if (!item) {
            throw new Error("Item index " + itemIndex + " does not exist!");
        }
        
        console.log("Safe Access: " + item.name);
    } 
    catch (error) {
        console.error("CAUGHT ERROR: " + error.message);
    } 
    finally {
        console.log("Process Finished: Error handling check complete.");
    }
}

// Run these tests
safeMenuUpdate(0);  // Should work (Beef Burger)
safeMenuUpdate(99); // Should trigger the ERROR message

// ============================================
// TASK 5: Object CRUD Methods
// ============================================

// ---- 1. CREATE using Object.assign() ----
// Object.assign() merges properties into a new object

function createMenuItem(id, name, price, category) {
    const defaults = { status: "Available", discount: 0, delivery: "Rs. 50" };
    const newItem = Object.assign({}, defaults, { id, name, price, category });
    foodMenu.push(newItem);
    displayMenu();
    console.log("✅ Created:", newItem);
    return newItem;
}

// Test CREATE
createMenuItem(5, "Chicken Shawarma", 400, "Fast Food");


// ---- 2. READ using Object.keys(), Object.values(), Object.entries() ----

function readMenuItem(id) {
    const item = foodMenu.find(f => f.id === id);
    if (!item) { console.error("❌ Item not found!"); return; }

    console.log("--- READ Item ---");
    console.log("Keys:   ", Object.keys(item));
    console.log("Values: ", Object.values(item));
    console.log("Entries:", Object.entries(item));

    // Show each key-value pair
    Object.entries(item).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
}

// Test READ
readMenuItem(1);


// ---- 3. UPDATE using Object.assign() ----

function updateMenuItem(id, updatedFields) {
    const index = foodMenu.findIndex(f => f.id === id);
    if (index === -1) { console.error("❌ Item not found!"); return; }

    // Object.assign merges updatedFields into the existing item
    Object.assign(foodMenu[index], updatedFields);
    displayMenu();
    console.log("✏️ Updated:", foodMenu[index]);
}

// Test UPDATE
updateMenuItem(1, { price: 600, status: "Out of Stock" });


// ---- 4. DELETE using Object.keys() to confirm before deleting ----

function deleteMenuItem(id) {
    const index = foodMenu.findIndex(f => f.id === id);
    if (index === -1) { console.error("❌ Item not found!"); return; }

    const deleted = foodMenu[index];
    console.log("🗑️ Deleting item with keys:", Object.keys(deleted));

    foodMenu.splice(index, 1);
    displayMenu();
    console.log("🗑️ Deleted:", deleted.name);
}

// Test DELETE
deleteMenuItem(4);

// ============================================
// TASK 5: Object CRUD Methods — Show on Screen
// ============================================

const MENU_CONFIG = Object.freeze({
    maxItems: 50,
    currency: "Rs.",
    taxRate: 0.1,
    restaurantName: "Eat All"
});

function showOutput(title, rows) {
    const box = document.getElementById('crud-output');
    if (!box) return;
    box.innerHTML = `
        <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">${title}</h3>
        <div class="space-y-2">
            ${rows.map(row => `
                <div class="flex justify-between bg-white dark:bg-gray-700 rounded-lg px-4 py-2 shadow-sm">
                    <span class="font-medium text-gray-600 dark:text-gray-300">${row.label}</span>
                    <span class="text-gray-800 dark:text-white font-semibold">${row.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ---- CREATE ----
function showCreate() {
    const defaults = { status: "Available", discount: 0, delivery: "Rs. 50" };
    const newItem = Object.assign({}, defaults, {
        id: foodMenu.length + 1,
        name: "Chicken Shawarma",
        price: 400,
        category: "Fast Food"
    });
    foodMenu.push(newItem);
    displayMenu();

    showOutput("➕ CREATE — Object.assign() merged defaults + new data", [
        { label: "Method Used", value: "Object.assign()" },
        { label: "New Item", value: newItem.name },
        { label: "Price", value: "Rs. " + newItem.price },
        { label: "Category", value: newItem.category },
        { label: "Status", value: newItem.status },
        { label: "Delivery", value: newItem.delivery },
        { label: "Total Items Now", value: foodMenu.length },
    ]);
}

// ---- READ ----
function showRead(id) {
    const item = foodMenu.find(f => f.id === id);
    if (!item) return;

    const keys = Object.keys(item);
    const values = Object.values(item);
    const entries = Object.entries(item);

    showOutput("👁️ READ — Object.keys() / Object.values() / Object.entries()", [
        { label: "Object.keys()", value: keys.join(", ") },
        { label: "Object.values()", value: values.join(", ") },
        ...entries.map(([k, v]) => ({ label: k, value: v }))
    ]);
}

// ---- UPDATE ----
function showUpdate(id) {
    const index = foodMenu.findIndex(f => f.id === id);
    if (index === -1) return;

    const before = { ...foodMenu[index] };
    Object.assign(foodMenu[index], { price: 600, status: "Out of Stock" });
    displayMenu();

    showOutput("✏️ UPDATE — Object.assign() merged new fields into existing item", [
        { label: "Method Used", value: "Object.assign()" },
        { label: "Item Updated", value: foodMenu[index].name },
        { label: "Price Before", value: "Rs. " + before.price },
        { label: "Price After", value: "Rs. " + foodMenu[index].price },
        { label: "Status Before", value: before.status },
        { label: "Status After", value: foodMenu[index].status },
    ]);
}

// ---- DELETE ----
function showDelete(id) {
    const index = foodMenu.findIndex(f => f.id === id);
    if (index === -1) {
        showOutput("🗑️ DELETE", [{ label: "Result", value: "Item not found!" }]);
        return;
    }

    const deleted = { ...foodMenu[index] };
    const keysBefore = Object.keys(deleted);
    foodMenu.splice(index, 1);
    displayMenu();

    showOutput("🗑️ DELETE — Object.keys() used to inspect before deleting", [
        { label: "Method Used", value: "Object.keys()" },
        { label: "Deleted Item", value: deleted.name },
        { label: "Keys Found", value: keysBefore.join(", ") },
        { label: "Items Remaining", value: foodMenu.length },
    ]);
}

// ---- FREEZE ----
function showFreeze() {
    const before = MENU_CONFIG.maxItems;
    MENU_CONFIG.maxItems = 999; // This will silently fail
    const after = MENU_CONFIG.maxItems;

    showOutput("🔒 FREEZE — Object.freeze() prevents any changes", [
        { label: "Method Used", value: "Object.freeze()" },
        { label: "Restaurant", value: MENU_CONFIG.restaurantName },
        { label: "Currency", value: MENU_CONFIG.currency },
        { label: "Tax Rate", value: MENU_CONFIG.taxRate },
        { label: "Max Items (tried to change to 999)", value: before },
        { label: "Max Items After Attempt", value: after + " (unchanged ✅)" },
    ]);
}

// ---- SUMMARY ----
function showSummaryReport() {
    const totalValue = foodMenu.reduce((sum, item) => sum + item.price, 0);
    const categories = [...new Set(foodMenu.map(i => i.category))];

    showOutput("📊 SUMMARY — Object.keys() / Object.values() / Object.entries()", [
        { label: "Total Items", value: foodMenu.length },
        { label: "Total Menu Value", value: "Rs. " + totalValue },
        { label: "Categories", value: categories.join(", ") },
        ...foodMenu.map(item => ({
            label: item.name,
            value: `Rs. ${item.price} — ${Object.keys(item).length} fields`
        }))
    ]);
}

// ============================================
// TASK 6: String Methods Implementation
// ============================================

function displayMenu(data = foodMenu) {
    const container = document.getElementById("menu-container");
    
    container.innerHTML = data.map(item => {
        // --- 1. .toUpperCase() ---
        // Used to make the item name stand out
        const boldName = item.name.toUpperCase();

        // --- 2. .padStart() ---
        // Format the ID to always be 3 digits (e.g., 001, 002)
        const formattedId = item.id.toString().padStart(3, '0');

        // --- 3. .slice() & 4. .concat() ---
        // Shorten long names and add an ellipsis if needed
        const displayName = boldName.length > 15 
            ? boldName.slice(0, 12).concat("...") 
            : boldName;

        // --- 5. .replace() ---
        // Format the currency symbol dynamically
        const priceLabel = "Price: Rs.".replace("Rs.", "PKR");

        return `
            <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-colors dark:bg-gray-800 dark:border-gray-700">
                <p class="text-[10px] text-gray-400">#${formattedId}</p>
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">${displayName}</h3>
                <p class="text-gray-500 text-sm italic">${item.category}</p>
                <p class="font-bold text-red-600">${priceLabel} ${item.price}</p>
                
                <div class="flex space-x-2 mt-4">
                    <button onclick="openEditModal(${item.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                    <button onclick="deleteItem(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
            </div>
        `;
    }).join(''); // --- 6. .join() --- (Technically Array, but results in a String)
}

function applyFilters() {
    // --- 7. .trim() & 8. .toLowerCase() ---
    // Clean user input from the search bar
    const searchTerm = document.getElementById('search-bar').value.trim().toLowerCase();
    const filterValue = document.getElementById('filter-options').value;

    let filtered = foodMenu.filter(item => {
        // --- 9. .includes() ---
        // Check if the food name matches the search query
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        
        // --- 10. .startsWith() ---
        // Additional logic: Priority matching for items starting with the search term
        const startsWithSearch = item.name.toLowerCase().startsWith(searchTerm);

        if (filterValue === "low-price") return (matchesSearch || startsWithSearch) && item.price < 500;
        return matchesSearch || startsWithSearch;
    });

    displayMenu(filtered);
}

// --- BONUS: Data Cleaning Utility ---
function cleanCategoryInput(input) {
    // --- 11. .split() & 12. .charAt() ---
    // Capitalize each word in a category (e.g., "fast food" -> "Fast Food")
    return input.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
}

// ============================================
// TASK 7: Array Methods (.map, .filter, .reduce, .sort)
// ============================================

// 1. .reduce() - Calculate the Total Value of the entire menu
window.calculateTotalMenuValue = () => {
    const total = foodMenu.reduce((accumulator, item) => {
        return accumulator + item.price;
    }, 0);
    
    console.log("Total Menu Value: PKR " + total);
    return total;
};

// 2. .filter() - Get only items that are currently "Available"
window.getAvailableItems = () => {
    const available = foodMenu.filter(item => item.status === "Available");
    console.log("Available Items:", available);
    return available;
};

// 3. .sort() - Sort items from Cheapest to Most Expensive
window.sortByPriceLowToHigh = () => {
    // We use [...] to create a copy so we don't mess up the original order
    const sorted = [...foodMenu].sort((a, b) => a.price - b.price);
    
    // 4. .map() - Transform the sorted data into a simple list of names + prices
    const sortedNames = sorted.map(item => `${item.name} (PKR ${item.price})`);
    
    console.log("Sorted Menu:", sortedNames);
    displayMenu(sorted); // Updates your UI with the sorted list
};

// 5. .find() - Quickly find a specific item by its ID
window.findFoodById = (id) => {
    const item = foodMenu.find(food => food.id === id);
    console.log("Found Item:", item ? item.name : "Not Found");
    return item;
};