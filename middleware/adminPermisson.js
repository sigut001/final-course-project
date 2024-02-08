const { routPath, viewPath } = require("../util/projektPath");


function checkAdmin(req, res, next) {
    if (req.session.isAdmin) {
        next();
    }
    else {
        res.redirect(routPath.basic.get.statusCode400);
    }
}

module.exports = 
    checkAdmin
