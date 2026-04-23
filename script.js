// // 1. Game Config - Maps, Costs, and Rewards
// const MAPS = [
//     { id: 0, name: "Desert Island", cost: 0, reward: 20 },
//     { id: 1, name: "Mystic Forest", cost: 50, reward: 50 },
//     { id: 2, name: "Frozen Peak", cost: 150, reward: 120 },
//     { id: 3, name: "Skull Cave", cost: 400, reward: 300 }
// ];

// // 2. State Management (Loading from LocalStorage)
// let coins = parseInt(localStorage.getItem('hunt_coins')) || 0;
// let unlockedLevels = JSON.parse(localStorage.getItem('hunt_unlocked')) || [0];
// let currentMapId = 0;
// let treasureIndex;

// // 3. UI Elements
// const coinDisplay = document.getElementById('coin-count');
// const gridDisplay = document.getElementById('map-grid');
// const shopModal = document.getElementById('shop-modal');
// const levelList = document.getElementById('level-list');
// const mapNameDisplay = document.getElementById('current-map-name');

// // 4. Initialize the Hunt Map
// function initHunt() {
//     // UI Update
//     coinDisplay.innerText = coins;
//     mapNameDisplay.innerText = "Current Map: " + MAPS[currentMapId].name;

//     // Clear Grid
//     gridDisplay.innerHTML = '';

//     // Random Treasure Position (0 to 15)
//     treasureIndex = Math.floor(Math.random() * 16);

//     // Create 16 Cells
//     for (let i = 0; i < 16; i++) {
//         const cell = document.createElement('div');
//         cell.className = 'cell';
//         cell.dataset.id = i;
//         cell.onclick = () => checkTreasure(i, cell);
//         gridDisplay.appendChild(cell);
//     }
// }

// // 5. Check if the clicked cell has treasure
// function checkTreasure(idx, el) {
//     if (el.classList.contains('found') || el.classList.contains('miss')) return;

//     if (idx === treasureIndex) {
//         el.classList.add('found');
//         el.innerText = '💎';

//         // Reward halne
//         let prize = MAPS[currentMapId].reward;
//         coins += prize;

//         saveData(); // Save to LocalStorage
//         coinDisplay.innerText = coins; // Update Screen

//         setTimeout(() => {
//             alert(Sahi ho Captain! Tapai le 💰${prize} coins bhetnu bhayo.);
//             initHunt(); // Reset map for new hunt
//         }, 300);
//     } else {
//         el.classList.add('miss');
//         el.innerText = '❌';
//     }
// }

// // 6. Shop Functions (Unlock & Switch Levels)
// function toggleShop() {
//     shopModal.classList.toggle('hidden');
//     if (!shopModal.classList.contains('hidden')) renderShop();
// }

// function renderShop() {
//     levelList.innerHTML = '';

//     MAPS.forEach(map => {
//         const isUnlocked = unlockedLevels.includes(map.id);
//         const canAfford = coins >= map.cost;

//         const card = document.createElement('div');
//         card.className = 'level-card';

//         // Create Card HTML
//         card.innerHTML = `
//             <div style="text-align:left;">
//                 <strong>${map.name}</strong><br>
//                 <small>${isUnlocked ? 'Unlocked' : 'Cost: 💰' + map.cost}</small>
//             </div>
//             <div>
//                 ${isUnlocked 
//                     ? <button onclick="selectMap(${map.id})">Play Map</button> 
//                     : `<button class="${canAfford ? 'btn-unlock' : 'btn-locked'}" 
//                         onclick="unlockMap(${map.id}, ${map.cost})">
//                         ${canAfford ? 'Unlock (💰' + map.cost + ')' : 'Need More Gold'}
//                        </button>`
//                 }
//             </div>
//         `;
//         levelList.appendChild(card);
//     });
// }

// // THIS IS THE MAIN PART: Deducts coins and saves
// function unlockMap(id, cost) {
//     if (coins >= cost) {
//         // 1. Paisa ghataune
//         coins -= cost; 

//         // 2. Unlocked list ma thapne
//         unlockedLevels.push(id);

//         // 3. Browser memory ma save garne
//         saveData();

//         // 4. UI Update garne
//         coinDisplay.innerText = coins;
//         renderShop();

//         alert("Mubarak cha! Naya map khulyo.");
//     } else {
//         alert("Paisa pugena! Map ma treasure khojera coins kamau.");
//     }
// }

// function selectMap(id) {
//     currentMapId = id;
//     toggleShop();
//     initHunt();
// }

// // 7. Save Data to Browser
// function saveData() {
//     localStorage.setItem('hunt_coins', coins);
//     localStorage.setItem('hunt_unlocked', JSON.stringify(unlockedLevels));
// }

// // Start Game on Load
// initHunt();

// --- FIREBASE CONFIG (Verified from your image) ---
const firebaseConfig = {
    apiKey: "AIzaSyBIY10H_6ibZ-HTJeL5nEJ_as_OgHGr8cM",
    authDomain: "treasurehunt-3ed5b.firebaseapp.com",
    databaseURL: "https://treasurehunt-3ed5b-default-rtdb.firebaseio.com",
    projectId: "treasurehunt-3ed5b",
    storageBucket: "treasurehunt-3ed5b.firebasestorage.app",
    messagingSenderId: "846821530466",
    appId: "1:846821530466:web:2df26093d510cdf1202a3b"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- GAME DATA ---
const MAPS = [
    { id: 0, name: "Desert Island", cost: 0, reward: 20, type: "grid" },
    { id: 1, name: "Mystic Forest", cost: 50, reward: 50, type: "grid" },
    { id: 2, name: "Frozen Peak", cost: 150, reward: 120, type: "grid" },
    { id: 3, name: "Skull Cave", cost: 400, reward: 300, type: "grid" },
    { id: 4, name: "Softwarica College", cost: 600, reward: 500, type: "riddle" }
];

const RANKS = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crown"];

const SOFTWARICA_RIDDLES = [
    {
        clue: "I am a silent ocean full of knowledge but without any waves. Paper here speaks to your soul, but you must stay *Ekdam Maun*. What am I?",
        options: ["Central Library", "Digital Library", "E-Resource Center", "Quiet Study Zone", "Archives Room", "Reference Section"],
        ans: "Central Library"
    },
    {
        clue: "I am a digital lab where virtual worlds are made. I have 40 eyes (monitors) but I cannot see anything. Here, we grow logic without any *Mato*. What am I?",
        options: ["ICR Room 1", "ICR Room 2", "IT Lab 3", "Innovation Hub", "Server Room", "Computing Lab"],
        ans: "ICR Room 1"
    },
    {
        clue: "I am a halfway house for the tired future. Group study happens here, but I am not a classroom. Discussion is hot here even without *Chiya ko Cups*. What am I?",
        options: ["Open Study Area", "Student Lounge", "Discussion Hub", "Innovation Center", "Common Room", "Meeting Hall"],
        ans: "Open Study Area"
    },
    {
        clue: "I am the place where energy is traded. Physics laws don't work here; only the law of *Paisa* works. I refill your health bar, but this is not a game. What am I?",
        options: ["College Canteen", "Cafeteria", "Snack Bar", "Food Court", "Refreshment Zone", "Dining Hall"],
        ans: "College Canteen"
    },
    {
        clue: "I am the gateway of the college but I never read a book. Data flows through me like a *Pahiro*, but I am not a computer. I check your identity. What am I?",
        options: ["Reception Desk", "Admission Desk", "Information Desk", "Main Security", "Admin Office", "Help Desk"],
        ans: "Reception Desk"
    },
    {
        clue: "I am the underworld where metallic horses rest. Here, the *Dhuwa* of the city disappears into concrete. I hold the keys to your exit. What am I?",
        options: ["Basement Parking", "Lower Ground Hall", "Backyard Lounge", "Main Entrance", "Storage Area", "Garage Bay"],
        ans: "Basement Parking"
    }
];

// --- STATE ---
let coins = parseInt(localStorage.getItem('hunt_coins')) || 0;
let unlockedLevels = JSON.parse(localStorage.getItem('hunt_unlocked')) || [0];
let currentMapId = 0;
let myLives = 3;
let currentMode = 'solo';

// --- RANK & UI ---
function updateUI() {
    document.getElementById('coin-count').innerText = coins;
    document.getElementById('lives-display').innerText = "My ❤️: " + "❤️".repeat(myLives);
    document.getElementById('rank-display').innerText = "Rank: " + getRank(coins);
}

function getRank(pts) {
    if (pts < 500) return "Bronze";
    if (pts < 1500) return "Silver";
    if (pts < 3000) return "Gold";
    if (pts < 5000) return "Platinum";
    if (pts < 8000) return "Diamond";
    return "Crown";
}

function switchMode(mode) {
    currentMode = mode;
    myLives = 3;
    document.getElementById('solo-screen').classList.toggle('hidden', mode !== 'solo');
    document.getElementById('multi-screen').classList.toggle('hidden', mode !== 'multi');
    document.getElementById('btn-solo').classList.toggle('active', mode === 'solo');
    document.getElementById('btn-multi').classList.toggle('active', mode === 'multi');
    updateUI();
    if (mode === 'solo') initSoloGame();
}