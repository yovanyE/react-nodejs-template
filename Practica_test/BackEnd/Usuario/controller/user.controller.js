const userCtrl={};
const mysql=require('../database');


userCtrl.createUser=function(req,res,next){
    const {usuario,password,correo}=req.body;
    var photo="";
    if(req.file==undefined){
        photo="shared/default.png";
    }else{
        photo="shared/"+req.file.path.split('\\')[1];
    }

    const sql=`CALL crearUsuario('${usuario}','${password}','${correo}','${photo}')`;
    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"success":"registrado"});
        }else{
            return res.status(400).json({"error":err.sqlMessage});
        }
    });

}
userCtrl.updateUser=function(req,res,next){
    const {usuario,password,correo,idusuario}=req.body;
    var photo="";
    if(req.file==undefined){
        photo="";
    }else{
        photo="shared/"+req.file.path.split('\\')[1];
    }

    const sql=`CALL updateUsuario('${usuario}','${password}','${correo}','${photo}',${idusuario})`;
    mysql.query(sql,function(err,result){
        if(!err){
            return res.status(200).json({"success":"actualizado"});
        }else{
            return res.status(400).json({"error":err.sqlMessage});
        }
    });
}
userCtrl.getUser=function(req,res,next){
    const sql=`CALL consultarUsuario();`;

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

module.exports=userCtrl;