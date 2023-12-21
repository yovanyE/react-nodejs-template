import { createContext,useEffect,useState,useContext } from "react";
import {addAgencyService,getAllAgencyService,getAgencyServiceByNameAgency} 
from '../services/serviceAgencyService';

const serviceAgencyContext=createContext();

export const useServiceAgencyContext=()=>{
    const context=useContext(serviceAgencyContext);
    if(!context) throw new Error("Provider is missing");
    return context;
};
export const ServiceAgencyContextProvider=({children})=>{
    const [serviceAgency,setServiceAgency]=useState([]);

    useEffect(()=>{
        (async ()=>{
            const res=await getAllAgencyService();
            setServiceAgency(res.data);
        })();
    },[]);
    const getServiceAgencyContext=async ()=>{
        const res=await getAllAgencyService();
        setServiceAgency(res.data);
    }
    const addAgencyServiceContext=async (p_serviceAgency)=>{
        try{
            const res=await addAgencyService(p_serviceAgency);
            getServiceAgencyContext();
        }catch(error){
            console.log(error);
        }
    }
    const getAgencyServiceByNameAgencyContext=async (p_agency)=>{
        try{
            const res=await getAgencyServiceByNameAgency(p_agency);
            console.log(res.data);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <serviceAgencyContext.Provider
        value={{serviceAgency,
            getServiceAgencyContext,
            addAgencyServiceContext,
            getAgencyServiceByNameAgencyContext}}
        >
        {children}
        </serviceAgencyContext.Provider>
    )
}