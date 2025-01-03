// module.exports = {
//   homePageUrl: 'https://demoblaze.com/',
//   phonesCategory: 'a[href="/prod.html?idcat=2"]', // CSS selector for Phones category link
//   phonesTitle: '.title' // CSS selector for the title of the phones page
// };


module.exports = {
  homePageUrl: 'https://demoblaze.com/',
  phonesCategory: 'a#itemc.list-group-item[onclick="byCat(\'phone\')"]',
  phonesTitle: '.title',
  productLink: '.hrefch',
  addToCartButton: 'a.btn.btn-success.btn-lg',
  cartTab: 'a#cartur', // Cart tab
  cartPageUrl: 'https://demoblaze.com/cart.html',
  deleteButton: 'a[onclick^="deleteItem"]', // Delete button for cart items
  cartItems: 'tbody#tbodyid tr.success' // Corrected selector for cart items

};
