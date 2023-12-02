const serviceRepository=require('../controller/serviceType.controller');

const createTypeService= async (typeServiceData)=>{
    return serviceRepository.addService(typeServiceData);
}
const UpdateTypeService=async (typeServiceData)=>{
    return serviceRepository.updateService(typeServiceData);
}
const getAllServiceType=async ()=>{
    return serviceRepository.getAllServiceType();
}
const deleteServiceType=async(typeServiceData)=>{
    return serviceRepository.deleteServiceType(typeServiceData)
}
module.exports={
    createTypeService,
    UpdateTypeService,
    getAllServiceType,
    deleteServiceType
}