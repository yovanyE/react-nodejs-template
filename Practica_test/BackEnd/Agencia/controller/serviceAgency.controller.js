const serviceAgencyCtrl={};
const mysql=require('../database');

serviceAgencyCtrl.addAgencyService=function(req,res,next){
    var {idagencia,descripcion,idtiposervicio}=req.body;
    const sql=`CALL addservicio_agencia(${idagencia},'${descripcion}',${idtiposervicio});`;

    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"success":"registro correctamente"});
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
serviceAgencyCtrl.getAllAgencyService=function(req,res,next){
    const sql=`CALL consultservicio_agencia();`;
    mysql.query(sql,function(err,result){
        if(!err){
            if(result[0].length>0){
                return res.status(200).json(result[0]);
            }else{
                return res.status(404).json({"Warning":"No data found"});
            }
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });
}
//consultar servicios por agencia, buscar las gencias con el nombre que propciorna
serviceAgencyCtrl.getAgencuSerciByNameAgency=function(req,res,next){
    var {agency}=req.body;
    const sql=`CALL consultarServicioAgencia('${agency}')`;

    mysql.query(sql,function(err,result){
        if(!err){
            if(result.length>0){
                return res.status(200).json(result[0]);
            }else{
                return res.status(404).json({"warning":"No data found"});
            }
        }else{
            return res.status(400).json({"Error":err.sqlMessage});
        }
    });

}
module.exports=serviceAgencyCtrl;