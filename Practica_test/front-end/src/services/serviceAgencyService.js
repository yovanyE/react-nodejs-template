import axios from "axios";

export const addAgencyService=async (agencyService)=>{
    return await axios.post("/serviceAgency",agencyService);
}
export const getAllAgencyService=async ()=>{
    return await axios.get("/serviceAgency");
}
//buscar agencia en un auto-complete
export const getAgencyServiceByNameAgency=async(nameAgency)=>{
    return await axios.post("/serviceAgency",nameAgency);
}