const router = require('express').Router();
const productController = require('../controllers/product');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.get('/', productController.getAll);

router.use(authentication);
router.use(authorization.adminOnly);

router.post('/', productController.create);
router.put('/:productId', productController.edit);
router.delete('/:productId', productController.delete);

module.exports = router;
