state = {
  products: [],
  maxVotes: 6,
  votesCast: 0,
}

// let allProducts = []
// let allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dogDuck', 'dragon', 'pen', 'petSweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'waterCan', 'wineGlass']

let productImage1 = document.querySelector('.product1 img');
let productImage2 = document.querySelector('.product2 img');
let productImage3 = document.querySelector('.product3 img');
let productContainer = document.querySelector('.products');
let resultsContainer = document.querySelector('.results');

// Constructor function to create Product objects.
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.views = 0;
  this.votes = 0;
  state.products.push(this);
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.products.length);
}

function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  while (product1 === product2 || product1 === product3 || product2 === product3);

  //Showing product on screen.
  productImage1.src = state.products[product1].imagePath;
  productImage1.alt = state.products[product1].name;

  productImage2.src = state.products[product2].imagePath;
  productImage2.alt = state.products[product2].name;

  productImage3.src = state.products[product3].imagePath;
  productImage3.alt = state.products[product3].name;

  // Add 1 to the number of views for each product.
  state.products[product1].views++;
  state.products[product2].views++;
  state.products[product3].views++;

  console.log(state.products);

}

function showTotals() {
  for (let i = 0; i < state.products.length; i++) {
    let productData = document.createElement('div');
    productData.textContent = `${state.products[i].name} had ${state.products[i].votes} votes and was shown ${state.products[i].views} times`;
    resultsContainer.appendChild(productData)
  }
}




productContainer.addEventListener('click', (event) => {

  let name = event.target.alt;
  for (let i = 0; i < state.products.length; i++) {
    if (state.products[i].name === name) {
      state.products[i].votes++;
      break;
    }
  }

  state.votesCast++;


  if (state.votesCast >= state.maxVotes) {

    showTotals();
  } else {
    renderProducts();
  }

});


// Array that holds all Product objects.

let bag = new Product("bag", "./assets/bag.jpg");
let banana = new Product("banana", "./assets/banana.jpg");
let bathroom = new Product("bathroom", "./assets/bathroom.jpg");
let boots = new Product("boots", "./assets/boots.jpg");
let breakfast = new Product("breakfast", "./assets/breakfast.jpg");
let bubblegum = new Product("bubblegum", "./assets/bubblegum.jpg");
let chair = new Product("chair", "./assets/chair.jpg");
let cthulhu = new Product("cthulhu", "./assets/cthulhu.jpg");
let dogDuck = new Product("dog-duck", "./assets/dog-duck.jpg");
let dragon = new Product("dragon", "./assets/dragon.jpg");
let pen = new Product("pen", "./assets/pen.jpg");
let petSweep = new Product("pet-sweep", "./assets/pet-sweep.jpg");
let scissors = new Product("scissors", "./assets/scissors.jpg");
let shark = new Product("shark", "./assets/shark.jpg");
let sweep = new Product("sweep", "./assets/sweep.png");
let tauntaun = new Product("tauntaun", "./assets/tauntaun.jpg");
let unicorn = new Product("unicorn", "./assets/unicorn.jpg");
let waterCan = new Product("water-can", "./assets/water-can.jpg");
let wineGlass = new Product("wine-glass", "./assets/wine-glass.jpg");

// allProducts.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

// for (let i = 0; i <= allProducts.length; i++) {
//   let constructedProduct = new Product(allProductNames[i], `./assets/${allProductNames[i]}.jpg`);
//   allProductNames.push(constructedProduct);
// }


// console.log(state.products);

renderProducts()