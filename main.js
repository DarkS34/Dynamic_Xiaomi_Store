import { products } from "./products.js";
import { getProductTemplate } from "./templates/templates.js";

const productsContainer = document.querySelector(".products-container");
const priceInput = document.querySelector("#price-filter");
const formElement = document.querySelector(".form");
const minPriceInput = document.querySelector("#price-filter-min");
const maxPriceInput = document.querySelector("#price-filter-max");
const resetFormButton = document.querySelector(".reset-form-btn");

const renderAllProducts = () => {
  products.forEach((product) => {
    const productTemplate = getProductTemplate(product);
    productsContainer.innerHTML += productTemplate;
  });
};

const checkEmptyForm = (target) => {
  for (let i = 0; i < target.length - 3; i++) {
    if (target[i].checked) {
      return false;
    }
  }
  for (let i = 4; i < target.length - 1; i++) {
    if (target[i].valueAsNumber) {
      return false;
    }
  }
  return true;
};

const renderFilteredProducts = (checkedSellers, minPrice, maxPrice) => {
  productsContainer.innerHTML = "";

  const productsInRangeOfPrice = products.filter((product) => {
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      return product.price >= minPrice && product.price <= maxPrice;
    } else if (isNaN(minPrice) && !isNaN(maxPrice)) {
      return product.price <= maxPrice;
    } else if (!isNaN(minPrice) && isNaN(maxPrice)) {
      return product.price >= minPrice;
    } else {
      return true;
    }
  });

  const filteredProducts = products.filter((product) => {
    if (checkedSellers.length) {
      return (
        checkedSellers.includes(product.seller) &&
        productsInRangeOfPrice.includes(product)
      );
    } else {
      return productsInRangeOfPrice.includes(product);
    }
  });

  filteredProducts.forEach((fProduct) => {
    const fProductTemplate = getProductTemplate(fProduct);
    productsContainer.innerHTML += fProductTemplate;
  });
};

const handleSubmitFilter = (event) => {
  event.preventDefault();

  let checkedSellers = [];
  let minPrice = 0;
  let maxPrice = 0;

  if (!checkEmptyForm(event.target)) {
    for (let i = 0; i < event.target.length - 3; i++) {
      if (event.target[i].checked) {
        checkedSellers.push(event.target[i].value);
      }
    }

    minPrice = event.target[4].valueAsNumber;
    maxPrice = event.target[5].valueAsNumber;

    renderFilteredProducts(checkedSellers, minPrice, maxPrice);
  } else {
    productsContainer.innerHTML = "";
    renderAllProducts();
  }
};

const handlePriceInput = () => {
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);

  if (!isNaN(minPrice) && !isNaN(maxPrice) && maxPrice < minPrice) {
    minPriceInput.value = maxPrice;
  }

  if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice > maxPrice) {
    maxPriceInput.value = minPrice;
  }
};

resetFormButton.addEventListener("click", () => {
  productsContainer.innerHTML = "";
  renderAllProducts();
});
minPriceInput.addEventListener("input", handlePriceInput);
maxPriceInput.addEventListener("input", handlePriceInput);
formElement.addEventListener("submit", handleSubmitFilter);

renderAllProducts();
