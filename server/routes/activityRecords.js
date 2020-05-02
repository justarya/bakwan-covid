const router = require('express').Router();
const activityRecords = require('../controllers/activityRecords');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.use(authentication);

router.get('/hospital', activityRecords.getAllRecordsHospital);
router.get('/product', activityRecords.getAllRecordsProducts);
router.get('/user', activityRecords.getAllRecordsUsers);
router.get('/hospitalsupply', activityRecords.getAllRecordsHospitalSupplies);
router.get('/hospitalsupply/:hospitalSupplyId', activityRecords.getRecordsHospitalSuppliesByProduct);


module.exports = router;
