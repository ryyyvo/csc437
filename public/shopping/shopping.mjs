const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;
    article.appendChild(img);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';

    const nameHeading = document.createElement('h3');
    nameHeading.textContent = product.name;
    detailsDiv.appendChild(nameHeading);

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = product.description;
    detailsDiv.appendChild(descriptionPara);

    const pricePara = document.createElement('p');
    pricePara.className = 'price';
    pricePara.textContent = `$${product.price}`;
    detailsDiv.appendChild(pricePara);

    const buttonContainer = document.createElement('div');

    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Add to cart';
    buttonContainer.appendChild(buyButton);

    if (product.numInCart > 0) {
        const cartCountSpan = document.createElement('span');
        cartCountSpan.className = 'num-in-cart';
        cartCountSpan.textContent = `${product.numInCart} in cart`;
        buttonContainer.appendChild(cartCountSpan);
    }

    detailsDiv.appendChild(buttonContainer);
    article.appendChild(detailsDiv);
    
    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {

}


// Test for renderProductCard(product)

// document.addEventListener('DOMContentLoaded', () => {
//     const productListSection = document.querySelector('.product-list');
    
//     // Clear placeholder products
//     const existingArticles = document.querySelectorAll('.product-list article');
//     existingArticles.forEach(article => article.remove());
    
//     // Add our products from the data model
//     PRODUCTS.forEach(product => {
//         const productCard = renderProductCard(product);
//         productListSection.appendChild(productCard);
//     });
// });