import axios from 'axios';

export const getAgency=async()=>{ 
    return  await axios.get("/agencia");
};
export const getAgencyByIdRequest=async (id)=> await axios.get('/agencia/'+id);

export const deleteAgencyRequest=async(id)=>
    await axios.delete("/agencia/"+id);

export const AddAgencyWithPhoto=async(post)=>{
    const form=new FormData();
    for(let key in post){
        form.append(key,post[key]);
    }
    return await axios.post("/agencia",form,{
        headers: {
            "Content-Type": "multipart/form-data",
          }
    });
};
export const addAgencyRequest=async(post)=>{
    const form=new FormData();
    for(let key in post){
        form.append(key,post[key]);
    }
    return await axios.post("/agencia",form,{
        headers: {
            "Content-Type": "multipart/form-data",
          }
    });
    //return await axios.post("/agencia",post);
};

export const updateAgencyRequest=async(agency)=>{
    return await axios.put("/agencia",agency);

}
export const updateAgencyPhotoRequest=async (agency)=>{
    const formdata=new FormData();
    console.log(agency);
    for(let key in agency){
        formdata.append(key,agency[key]);
    }
    return await axios.put("/agencia/imagen",formdata,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updateAgencyRequest2=async(agency)=>{
    const form=new FormData();
    for(let key in agency){
        form.append(key,agency[key]);
    }
    return await axios.put("/agencia",form,{
        headers: {
            "Content-Type": "multipart/form-data",
          }
    });

}