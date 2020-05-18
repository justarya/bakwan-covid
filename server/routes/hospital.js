const router = require('express').Router();
const hospitalSupplyRouter = require('./hospitalSupply');
const hospitalController = require('../controllers/hospital');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.use('/:hospitalId/supplies', hospitalSupplyRouter);

router.get('/', hospitalController.getAllHospital);
router.get('/:hospitalId', hospitalController.getHospital);

router.use(authentication);
router.post('/', hospitalController.createHospital);
router.put('/:hospitalId', authorization.userWithHospitalAccess, hospitalController.editHospital);
router.delete('/:hospitalId', authorization.adminOnly, hospitalController.deleteHospital);

module.exports = router;
