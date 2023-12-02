import { addTypeServiceRequest, deleteTypeServiceRequest, getTypeServiceRequest, updateServiceTypeRequest } from "../services/serviceTypeService";

const { createContext, useContext, useState, useEffect } = require("react");

const typeServiceContext=createContext();

export const useTypeService=()=>{
    const context=useContext(typeServiceContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const TypeServiceProvider=({children})=>{
    const [typeServices, setTypeServices]=useState([]);
    /*useEffect(()=>{
      (async ()=>{
          const res=await getTypeServiceRequest();
          console.log('servicio');
          setTypeServices(res.data);
      })();
  },[]);*/
    const getTypeService=async()=>{
        const res=await  getTypeServiceRequest();
        if(res.data.status){
          setTypeServices(res.data.value);
        }
    }

    const addTypeService=async(typeService)=>{
        const res=await addTypeServiceRequest(typeService);
        if(res.data.status){
          setTypeServices([...typeServices,res.data.value[0]]);
        }else{
          console.log('ocurrio error ');
          console.log(res.data.value[0]);
        }
      

    }
    const updateTypeService=async (id,serviceType)=>{
        try{
            const res=await updateServiceTypeRequest(serviceType);
            if(res.data.status){
              //este es un metodo en donde optimizamos el array de consulta
              const index = typeServices.findIndex(item => item.idtiposervicio === id);
              if (index !== -1) {
                const updatedTypeServices = [...typeServices];
                updatedTypeServices.splice(index, 1, res.data.value[0]);
                setTypeServices(updatedTypeServices);
              }
              //este metodo funciona
              //setTypeServices(typeServices.map((item)=>(item.idtiposervicio==id? res.data.value[0]: item)));
            }else{
              console.log(res.data.value[0]);
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteTypeService=async (serviceType)=>{
      try{
        const res=await deleteTypeServiceRequest(serviceType);
        if(res.status){
          const deletedServiceIds = serviceType.map(serviceType => serviceType.idtiposervicio);

          setTypeServices(typeServices.filter(postItem => !deletedServiceIds.includes(postItem.idtiposervicio)));
        }

      }catch(error){
        console.log(error);
      }
    }
    return (
        <typeServiceContext.Provider
        value={{typeServices,getTypeService,
          addTypeService,
          updateTypeService,
          deleteTypeService,
        }}
        >
        {children}
        </typeServiceContext.Provider>
    )
}
