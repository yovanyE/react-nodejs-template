const loginCtrl={};
const mysql=require('../database');

loginCtrl.loginUser=function(req,res,next){
    const {usuario,password}=req.body;
    const sql=`CALL loginuser('${usuario}','${password}');`;

    mysql.query(sql,function(err,result){
        if(!err){
            if(result[0].length>0){
                return res.status(200).json(result[0]);

            }else{
                return res.status(404).json({"Warning":"usuario y/contraseña incorecta"});
            }
        }else{
            return res.status(400).json({"Error": err.sqlMessage});
        }
    });
}

module.exports=loginCtrl;