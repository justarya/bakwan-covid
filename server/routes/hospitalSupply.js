const router = require('express').Router({ mergeParams: true });
const hospitalSupplyController = require('../controllers/hospitalSupply');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.get('/', hospitalSupplyController.getAll);
router.use(authentication);
router.use(authorization.userWithHospitalAccess);

router.post('/', hospitalSupplyController.create);
router.put('/:hospitalSupplyId', hospitalSupplyController.edit);
router.delete('/:hospitalSupplyId', hospitalSupplyController.delete);

module.exports = router;
