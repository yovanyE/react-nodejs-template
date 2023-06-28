var express=require('express');
var router=express.Router();
const upload=require('../lib/multer');

var controllerAgencia=require('../controller/agencia.controller');
var validationAgency=require('../validation/agencia.validation');


router.post('/',upload.single('foto'),validationAgency.validate,controllerAgencia.addAgencia);
router.put('/',validationAgency.validate,controllerAgencia.updateAgencia);
router.put('/imagen',upload.single('foto'),controllerAgencia.updateAgenciaWithPhoto);
router.delete('/:idagencia',controllerAgencia.eliminarAgencia);
router.get('/',controllerAgencia.getAllAgencia);
router.get('/:idagencia',controllerAgencia.getAgenciaById);

module.exports=router;