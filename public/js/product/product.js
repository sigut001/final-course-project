const productCardPrice = document.querySelectorAll(".productCardPrice");
const productCardSalePrice = document.querySelectorAll(".productCardSalePrice");

document.addEventListener("DOMContentLoaded", function (event) {
  productCardPrice.forEach((element) => {
    console.log(element.innerText);
    const price = +element.innerText;
      const deziPrice = price.toFixed(2);
    element.innerText = deziPrice;
  });

  productCardSalePrice.forEach((element) => {
    const salePrice = +element.innerText;
    const deziSalePrice = salePrice.toFixed(2);
    element.innerText = deziSalePrice;
  });
});
