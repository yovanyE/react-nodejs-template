import { Box,Avatar, Button, TextField,Autocomplete   } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Headers";
import { useTheme } from "@mui/material";
import { useServiceAgencyContext } from "../../context/serviceAgencyContext";

import { useEffect, useState } from "react";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAgencyContext } from "../../context/AgencyContext";
import { useTypeService } from "../../context/TypeServiceContext";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {serviceAgency,
    getServiceAgencyContext,
    addAgencyServiceContext,
    getAgencyServiceByNameAgencyContext
  }=useServiceAgencyContext();

  const [selectServiceAgency,setSelectServiceAgency]=useState({
    idagencia:0,
    descripcion:'',
    idtiposervicio:0
  });
  const {agency}=useAgencyContext();
  const {typeServices,getTypeService}=useTypeService();
  
  useEffect(()=>{
    (async()=>{
      await getTypeService();
    })();
  },[]);

  const columns = [
    { field: "idagencia", 
      headerName: "ID AGENCIA", 
      flex: 0.5 
    },
    { field: "agencia", 
      headerName: "Agencia" 
    },
    {
      field: "servicio",
      headerName: "Servicio",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      headerAlign: "left",
      align: "left",
      flex:2,
      cellClassName: "wrap-text",
      renderCell: (params) => (
        <div className="wrap-text">
          {params.value}
        </div>
      ),
    },
    {
      field: "foto_agency",
      headerName: "Imagen agencia",
      flex: 1,
      renderCell: (params) => (
        <Box>
          {params.value && 
          <Avatar alt="Agency Image" src={params.value}
          />
       
           }
        </Box>
      ),
    },
    {
      field: "cantidad_personas",
      headerName: "Cantidad Persona en agencia",
      type:'number',
      headerAlign:'left',
      flex: 1,
    },
    {
      field: "capacidad_agency",
      headerName: "Capacidad de agencia",
      flex: 1,
      renderCell: (params) => (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: `${params.value}%`,
              height: '100%',
              backgroundColor: 'rgba(255, 0, 0, 0.7) !important', // Cambiado a un rojo más llamativo
              borderRadius: '4px',
            }}
          />
          <div style={{ width: '100%', marginLeft: '8px' }}>{params.value}%</div>
        </div>
      ),
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];
  const addNewServiceAgency=async (values,action)=>{
    try{
      await addAgencyServiceContext(values);
    }catch(error){
      console.log('ocurrio un error xd');
    }
  }
  
  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .wrap-text": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "break-spaces",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Formik
        onSubmit={addNewServiceAgency}
        initialValues={selectServiceAgency}
        >
          {({
            values,
            error,
            touched,
            handleBlur,
            handleChange,
            handleSubmit:addNewServiceAgency,
          })=>(
            <form onSubmit={addNewServiceAgency}>
              <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              >
        <Autocomplete
          options={agency}
          getOptionLabel={(option) => `${option.nombre}`} // Muestra nombre e imagen de la agencia
          //getOptionSelected={(option) => option.idagencia === values.idagencia} // Selecciona la opción según el valor de values.agencia
          fullWidth
          value={agency.find((option) => option.idagencia === values.idagencia) || null} // Encuentra la opción correspondiente a values.agencia
          sx={{ gridColumn: "span 3" }}
          onChange={(event, newValue) => {
            // Establece el valor de values.agencia en el id de la agencia seleccionada
            handleChange({ target: { name: "idagencia", value: newValue?.idagencia || "" } });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Agencia"
              variant="filled"
              sx={{ gridColumn: "span 3" }}
            />
          )}
          renderOption={(props, option) => (
            <Box {...props} sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={option.foto}
                alt={option.nombre}
                style={{ width: 32, height: 32, marginRight: 8, borderRadius: '50%' }}
              />
              <span>{option.nombre}</span>
            </Box>
          )}
        />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripción"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion}
                name="descripcion"
                sx={{ gridColumn: "span 1" }}
              />
              <Autocomplete
              options={typeServices}
              getOptionLabel={(option)=> `${option.descripcion}`}
             // getOptionSelected={(option)=> option.idtiposervicio===values.idtiposervicio}
              fullWidth
              value={typeServices.find((option)=>option.idtiposervicio===values.idtiposervicio) || null}
              sx={{ gridColumn: "span 3" }}
              onChange={(event,newValue)=>{
                handleChange({target:{name:'idtiposervicio',value:newValue?.idtiposervicio || ""}});
              }}
              renderInput={(params)=>(
                <TextField
                {...params}
                label="Servicio"
                sx={{ gridColumn: "span 2" }}
              />
              )}
             
              />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new Service Agency
              </Button>
            </Box>
            </form>
          )}

        </Formik>
        <DataGrid
          rows={serviceAgency}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;