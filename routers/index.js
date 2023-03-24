const { Router } = require("express");
const authenticator = require("../middleware/authenticator");

const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get('/', indexController.index);

module.exports = indexRouter;