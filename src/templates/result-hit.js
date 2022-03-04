const resultHit = (hit, bindEvent) => `<div class="result-hit">
  <div class="result-hit__image-container">
    <img class="result-hit__image" src="${hit.image}" />
  </div>
  <div class="result-hit__details">
    <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
    <p class="result-hit__price">$${hit.price}</p>
    <p class="result-hit__popularity">Popularity ${hit.popularity}</p>
    <p class="result-hit__rating">Rating ${hit.rating}</p>
  </div>
  <div class="result-hit__controls">
    <button ${bindEvent(
      'click',
      hit,
      'View Item'
    )} id="view-item" class="result-hit__view">View</button>
    <button ${bindEvent(
      'conversion',
      hit,
      'Add to Cart'
    )} id="add-to-cart" class="result-hit__cart">Add To Cart</button>
  </div>
</div>`;

export default resultHit;
