const router = require('express').Router();
const activityRecords = require('../controllers/activityRecords');

const authentication = require('../middleware/authentication');

router.get('/hospitalsupply', activityRecords.getAllRecordsHospitalSupplies);
router.get('/hospitalsupply/:hospitalSupplyId', activityRecords.getRecordsHospitalSupplies);
router.get('/hospital/:hospitalId/supplies', activityRecords.getRecordsHospitalSuppliesByHospitalId);
router.use(authentication);
router.get('/hospital', activityRecords.getAllRecordsHospital);
router.get('/product', activityRecords.getAllRecordsProducts);
router.get('/user', activityRecords.getAllRecordsUsers);


module.exports = router;
