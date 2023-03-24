const { Router } = require('express');

const authenticator = require("../middleware/authenticator");

const diaryController = require('../controllers/diaryController');

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/top", diaryController.getMostRecent);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;