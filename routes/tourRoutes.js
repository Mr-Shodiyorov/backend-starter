const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourControllers');

// router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTours).post(tourController.postTour);
router.route('/top-5-cheap').get(tourController.getTopFiveCheap, tourController.getAllTours);
router.route('/status').get(tourController.getStatus)
router
  .route('/:id')
  .get(tourController.getTour)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
