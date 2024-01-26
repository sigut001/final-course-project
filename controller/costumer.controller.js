function getCostumerOrders(req, res, next) {
  res.render("../views/costumer/view-costumer-orders.ejs", {
    page: { title: "View Orders", nav: "getCostumerOrders" },
  });
}

module.exports = {
  getCostumerOrders: getCostumerOrders,
};
