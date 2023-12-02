import { createContext, useEffect, useState,useContext } from "react";
import { deleteAgencyRequest, getAgency, getAgencyByIdRequest, addAgencyRequest, updateAgencyPhotoRequest, updateAgencyRequest } 
from "../services/agencyService";

const agencyContext=createContext();

export const useAgencyContext = () => {
    const context = useContext(agencyContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
  };

export const AgencyContextProvider=({children})=>{
    const [agency,setAgency]=useState([]);

    useEffect(()=>{
        (async ()=>{
            const res=await getAgency();
            setAgency(res.data);
        })();
    },[]);
    const getAgencyAll=async ()=>{
      const res=await getAgency();
      setAgency(res.data);

    }
    const deleteAgency=async (id)=>{
      const res=await deleteAgencyRequest(id);
      if(res.status===200){
        setAgency(agency.filter((postItem)=>postItem.idagencia!=id));
      }
    }
    const createAgency=async (agency)=>{
      try{
        const res=await addAgencyRequest(agency);
        //setPost([...post,res.data]);
        getAgencyAll();
      }catch(error){
        console.log(error);
      }
    }
    const updateAgency=async (id,agencyEdit)=>{
      try{
        const res=await updateAgencyRequest(agencyEdit);
        setAgency(agency.map((postItem)=>(postItem.idagencia==id ? res.data:postItem)));
    
      }catch(error){
        console.log(error);
      }
    }
    const updateAgencyWithPhoto=async (id,agencyEdit)=>{
      try{
        const res=await updateAgencyPhotoRequest(agencyEdit);
        console.log(res.data);
        //setAgency(agency.map((postItem)=>(postItem.idagencia==id? res.data: agency)));
        setAgency(agency.map((postItem) => {
          if (postItem.idagencia === id) {
            // Actualizar solo ciertas propiedades del objeto
            return {
              ...postItem, // Copiar todas las propiedades existentes
              foto: res.data.foto, // Actualizar la propiedad 'foto'
              // Otras propiedades que desees actualizar...
            };
          }
          return postItem; // Mantener sin cambios los objetos que no coincidan con la condición
        }));
        
      }catch(error){
        console.log(error);
      }
    }
    const getAgencyById=async (id)=>{
      try{
        const res=await getAgencyByIdRequest(id);
        return res.data;

      }catch(error){
        console.log(error);
      }
    }
    return (
        <agencyContext.Provider
        value={{ agency,getAgencyAll,deleteAgency,createAgency,updateAgency, getAgencyById
          ,updateAgencyWithPhoto }}
        >
          {children}
        </agencyContext.Provider>
      );
}