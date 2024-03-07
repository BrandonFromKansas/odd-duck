// Declare a single "state" variable (object) to store application variables.
let state = {
  products: [],
  maxVotes: 25,
  votesCast: 0,
  previousImages: []
};

// let allProducts = an array []
let allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
for (let i = 0; i < allProductNames.length; i++) {
  new Product(allProductNames[i], `./assets/${allProductNames[i]}.jpg`);
  //"./assets/" + allProductNames[i] + ".jpg"  <--this is exactly what is inside the backtics above.
}

//These are the HTML elements in the markup where the product images and product results will be inserted in to.
let productImage1 = document.querySelector('.product1 img');
let productImage2 = document.querySelector('.product2 img');
let productImage3 = document.querySelector('.product3 img');
let productContainer = document.querySelector('.products');
let resultsContainer = document.querySelector('.results');

//Constructor function to create Product objects. The product constructor.
function Product(name, imagePath, views = 0, votes = 0) {
  this.name = name;
  this.imagePath = imagePath;
  this.views = views;
  this.votes = votes;
  state.products.push(this);
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.products.length);
}


//Local Storage function
function loadProducts(){
  let savedProducts = localStorage.getItem('products');
  if( savedProducts){
    let parsedProducts = JSON.parse(savedProducts);
    console.log(parsedProducts);
    state.products = parsedProducts.map(productData => new Product(productData.name, productData.imagePath, productData.views, productData.votes));
  } else{
    renderProducts();
  }
}

function savedProducts() {
  let stringifiedProducts = JSON.stringify(state.products);
  localStorage.setItem('products', stringifiedProducts);
}



function renderProducts() {
  let product1, product2, product3;
  do {
    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  } while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3 ||
    state.previousImages.includes(product1) ||
    state.previousImages.includes(product2) ||
    state.previousImages.includes(product3)
  );
  // Update the previous set of images
  state.previousImages = [product1, product2, product3];
  // Showing product on screen.
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


// This will display at the very end of the voting, when the amount of max votes are reached.
// Iterate the products array and display the name, votes, and views of each product.
function showTotals() {


  let chartVotes = [];
  let chartViews = [];
  for (let i = 0; i < state.products.length; i++) {
    chartVotes.push(state.products[i].votes);
    chartViews.push(state.products[i].views);
  }





  // Chart.js options
  let options = {
    type: 'bar',
    data: {
      labels: allProductNames,
      datasets: [
        {
          label: '# of Votes',
          data: chartVotes,
          backgroundColor: [
            'rgba(211, 188, 141)',

          ],
          borderColor: [
            'rgba(16, 24, 31)',

          ],
          borderWidth: 3
        },

        {
          label: '# of Views',
          data: chartViews,
          backgroundColor: [
            'rgba(0, 53, 148)',
          ],
          borderColor: [
            'rgba(134, 147, 151)',
          ],
          borderWidth: 3
        }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Creating a canvas context
  const ctx = document.getElementById('myChart').getContext('2d');

  // Make a new chart with the canvas context and some options
  const myChart = new Chart(ctx, options);


}



// When user clicks on a product, find it in the array and add 1 to its vote count.
// This will also note the number of total votes cast and stop if it is exceeded.
// This was originally written as all one function. Then, John showed that by declaring the variable voteForTheProduct, and using that in the addEventListener function, we can then reference voteForTheProduct towards the bottom in our removeEventListener function at the end of the code block.
productContainer.addEventListener('click', voteForTheProduct);
function voteForTheProduct(event) {

  let name = event.target.alt;
  for (let i = 0; i < state.products.length; i++) {
    if (state.products[i].name === name) {
      state.products[i].votes++;
      break;
    }
  }
  state.votesCast++;
  console.log(state);

  if (state.votesCast >= state.maxVotes) {
    showTotals();

    //NEW
    savedProducts();
    productContainer.removeEventListener('click', voteForTheProduct);
  } else {
    renderProducts();
  }

}
renderProducts();

loadProducts();
