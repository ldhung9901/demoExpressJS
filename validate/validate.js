
var bodyParser = require('body-parser')
module.exports.validate = function (req, res,next) {
    var errors = [];
    if (!req.body.name) {
        errors.push("Enter name.");
    }
    if (!req.body.password) {
        errors.push("Enter password.");
    }
    if (errors.length > 0) {
        return res.render("./login", {
            error: errors,
            value: req.body.name
        })}
    else {next()};
    

} 