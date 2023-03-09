const setupStars = (score) => {
    if (!score) {
      return `<p class="no-rating">(No rating)</p>`;
    }
  
    let starContainer = [];
  
    for (let i = 1; i <= score; i++) {
      starContainer.push(`<span class="star">★</span>`);
    }
    
    for (let i = 1; i<=5-Math.floor(score); i++){
      starContainer.push(`<span class="empty star">☆</span>`);
    }
    return starContainer.join("");
  };

export const getProductTemplate = (e) => {
    return `
    <li class="product-card">
        <a href="" class="product-link">
            <div class="product-wrapper">
                <div class="product-info">
                    <div class="product-info-upper">
                        <div class="product-title">${e.name}</div>
                        <div class="product-ratings">
                            <div class="product-ratings-stars">${setupStars(e.stars)}</div>
                            <div class="product-ratings-reviews">Reviews: ${e.reviews}</div>
                        </div>
                    </div>
                    <div class="product-info-lower">
                        <div class="product-price">
                            <span>Desde</span>
                            <span class="price">${e.price.toFixed(2)} €</span>
                        </div>
                        <span class="seller">Vendido por <b>${e.seller}</b></span>
                    </div>
                </div>
                <div class="product-image-container">
                    <img src="${e.image}" class="product-image" alt="${e.name}">
                </div>
            </div>
        </a>
    </li>
    `
}