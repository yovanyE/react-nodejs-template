import React, { useState,useEffect } from "react";
import { Box, Button, Icon, useTheme, Modal } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import  FormModal from './FormModal';
import Table from './Table';
import Notification from "../../utils/Notification";
import ConfirmationToast from "../../utils/ConfirmationToast";
import Header from "../../components/Headers";
import { useTypeService } from "../../context/TypeServiceContext";
import { Toaster }  from "react-hot-toast"
import { styleModal, headerStyle, footerStyle, styleIcon } from "./style";

const Team = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

//llamamos funciones a utilizar 
  const {typeServices,
    getTypeService,
    addTypeService,
    updateTypeService,
    deleteTypeService,
  }=useTypeService();
 
  useEffect(()=>{
    (async ()=>{
      await getTypeService();
    })();
 },[]); 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const modalStyle = styleModal(colors);
  const headerStyling = headerStyle(colors);
  const footerStyling = footerStyle(colors);
   // estados para modal
   const [openModal, setOpenModal] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const [selectService, setSelectService]=useState({
    idtiposervicio:0,
    descripcion:""
  })


  const handleRowSelection = (selection) => {
    const selectedData = selection.map((selectedId) => {
      const row = typeServices.find((row) => row.idtiposervicio === selectedId);
      return {
        idtiposervicio: row.idtiposervicio,
        descripcion: row.descripcion
      };
    });
    setSelectedRows(selectedData);
  };
  const handleDeleteSelected = async () => {
   if(selectedRows.length==0){
    Notification({ message: "Debe seleccionar un dato para eliminar", type: "warning" });
   }else{
    const confirmation = await ConfirmationToast({ message: '¿Estas seguro de eliminar?' });
    if(confirmation){
      try{
        await deleteTypeService(selectedRows);
        Notification({ message: "Registro eliminador", type: "success" });
      }catch(error){
        Notification({message: error.response.data.value, type:"error"});
      }
    }
    
   }
  };
  const addService=()=>{
     setOpenModal(true); //abrir modal
     //limpiamos arreglo para modal
     setSelectService({
        idtiposervicio:0,
        descripcion:""
     });
  }
  const editService=async (typeService)=>{
    setSelectService(typeService);
    setOpenModal(true); //abrir modal
  }

  const handleFormSubmit = async (values,actions) => {
    //click al dar guardar en boton modal
    if(values.idtiposervicio!=0){
      try{
        await updateTypeService(values.idtiposervicio,values);
      }catch(error){
        Notification({message:error.response.data.value, type:"error"});
      }
    }else{ //siendo diferente de cero, agrega un nuevo servicio
      try{
        await addTypeService(values);
      }catch(error){
        Notification({ message: error.response.data.value, type: "error" });
      } 
    }
    setOpenModal(false); //cierra modal
  };
  const closeModal=()=>{
    setOpenModal(false);
  };

  const columns = [
    { field: "idtiposervicio", headerName: "ID" },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "Evento",
      flex: 1,
      renderCell:({row})=>{
          const handleEditClick = (event) => {
            event.stopPropagation(); // Evitar que el evento se propague al contenedor de fila
            editService(row);
        };
        return (
          <Box
            width="25%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[500]}
            borderRadius="4px"
          >
          <Button onClick={handleEditClick} startIcon={<EditIcon />}>editar</Button>
          </Box>
        );
      }
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Grid container justifyContent="flex-end">
        <Toaster/>
        <Box mr={2}>
          <Button onClick={handleDeleteSelected} color="error" startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        </Box>
        <Box mr={2}>
          <Button onClick={addService} color="success" startIcon={<GridAddIcon />}>
            Agregar
          </Button>
        </Box>
        <Icon className="fa fa-plus-circle" color="primary" />
      </Grid>
        <Modal
        open={openModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        items={openModal.toString()}
        >
        <div>
        <FormModal
          styleModal={modalStyle}
          headerStyle={headerStyling}
          footerStyle={footerStyling}
          styleIcon={styleIcon}
          selectService={selectService}
          handleFormSubmit={handleFormSubmit}
          closeModal={closeModal}
          isNonMobile={isNonMobile}
          colors={colors}
          />
        </div>
        </Modal>  
      <Table 
        colors={colors}
        selectedRows={selectedRows}
        typeServices={typeServices}
        handleRowSelection={handleRowSelection}
        columns={columns}
      />
    </Box>
  );
};

export default Team;