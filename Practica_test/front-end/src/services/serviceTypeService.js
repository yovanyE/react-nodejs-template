import axios from "axios";

export const getTypeServiceRequest=async()=>{
    return await axios.get("/serviceType");
}
export const addTypeServiceRequest=async(typeService)=>{
        return await axios.post("/serviceType", typeService);
}

export const updateServiceTypeRequest=async(typeService)=>{
    return await axios.put("/serviceType",typeService);
}
export const deleteTypeServiceRequest=async(typeService)=>{
    return await axios.delete("/serviceType",{ data: typeService });
}