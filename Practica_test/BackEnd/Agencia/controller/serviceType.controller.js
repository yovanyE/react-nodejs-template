const serviceTypeCtrl={};
const mysql=require('../database');

serviceTypeCtrl.addService=function(req,res,next){
    var {descripcion}=req.body;
    const sql=`CALL crearttipoServicio('${descripcion}');`;
    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"success":"Servicio registrado"});
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
serviceTypeCtrl.updateService=function(req,res,next){
    var {descripcion,idtiposervicio}=req.body;
    const sql=`CALL updatettipoServicio('${descripcion}',${idtiposervicio});`;
    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"success":"Servicio actualizado"});
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
serviceTypeCtrl.getAllServiceType=function(req,res,next){
    const sql=`CALL consultarttipoServicio();`;
    mysql.query(sql,function(err,result){
        if(!err){
            if(result[0].length>0){
                return res.status(200).json(result[0]);
            }else{
                return res.status(404).json({"warning":"no data found"});
            }
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
module.exports=serviceTypeCtrl;