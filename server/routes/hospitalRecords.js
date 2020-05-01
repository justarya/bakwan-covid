const router = require('express').Router({ mergeParams: true });
const hospitalRecordsController = require('../controllers/hospitalRecords');

const authentication = require('../middleware/authentication');

router.use(authentication);
router.get('/', hospitalRecordsController.getAllHospitalRecords);

module.exports = router;
