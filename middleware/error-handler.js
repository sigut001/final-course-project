function errorHandling(error, req, res, next) {
    
    console.log(error);
    res.status(500).render("../views/base/500.ejs", { page: { title: "500" } })
    next();
}

module.exports = errorHandling;