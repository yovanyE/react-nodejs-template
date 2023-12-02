const serviceTypeCtrl={};
const { resolve } = require('path');
const mysql=require('../database');
const sequelize=require('../database');
const TypeService=require('../model/typeService');

serviceTypeCtrl.addService= async (serviceData)=>{
    var {descripcion}=serviceData;
    const sql=`CALL crearttipoServicio('${descripcion}');`;
    return new Promise((resolve, reject) => {
        mysql.query(sql, [descripcion], (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      });
}
serviceTypeCtrl.updateService=async (serviceData)=>{
    var {descripcion,idtiposervicio}=serviceData;
    const sql=`CALL updatettipoServicio('${descripcion}',${idtiposervicio});`;
    return new Promise((resolve, reject) => {
        mysql.query(sql, [descripcion,idtiposervicio], (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      });

}
serviceTypeCtrl.getAllServiceType=async ()=>{
    const sql = `CALL consultarttipoServicio();`;
    return new Promise((resolve, reject) => {
        try {
          mysql.query(sql, function(err, result) {
            if (!err) {
              if (result[0].length > 0) {
                resolve(result);
              } else {
                reject("No data found services type");
              }
            } else {
              reject(err.sqlMessage);
            }
          });
        } catch (error) {
          reject("Internal Server Error");
        }
      });
}
serviceTypeCtrl.deleteServiceType=async (serviceData)=>{
  return new Promise((resolve, reject) => {
    if (serviceData.length > 0) {
        const promises = serviceData.map(item => {
            return new Promise((resolve, reject) => {
                let sql = `CALL deletettipoServicio(${item.idtiposervicio})`;
                mysql.query(sql, function (err, result) {
                    if (!err) {
                        resolve("registros eliminados");
                    } else {
                        reject(err.sqlMessage);
                    }
                });
            });
        });

        Promise.all(promises)
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    } else {
        reject("Debe seleccionar un registro para eliminar");
    }
});
}
module.exports=serviceTypeCtrl;