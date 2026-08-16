const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');


router.route('/').get(userControllers.getAllUsers).post(userControllers.postUser);

router
  .route('/:id')
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
