import { Box } from "@mui/material";
import { tokens } from "../../theme";

import { useTheme } from "@mui/material";
import { Formik, useFormik } from "formik";
import { useParams,Link } from "react-router-dom";
import * as Yup from "yup";
import { useAgencyContext } from "../../context/AgencyContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState,useRef  } from "react";
import { TextField, Button, Input, IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Modal } from "@mui/material";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ModalAgency from "./modalAgency";
import { footerStyle, headerStyle, styleIcon,styleModal } from "../team/style";
import useMediaQuery from "@mui/material/useMediaQuery";

const defaultTheme = createTheme();

  
const Agency = () => {

const isNonMobile = useMediaQuery("(min-width:600px)");
const theme = useTheme();
const colors = tokens(theme.palette.mode);
//llamamos funciones a utilizar 
const {createAgency,getAgencyById,updateAgency,updateAgencyWithPhoto}=useAgencyContext();
const navigate = useNavigate();
const [agency, setAgency] = useState({
    nombre: "",
    latitud: "",
    longitud:"",
    cant_personas:"",
    capacidad_personas:"",
    idagencia: -1,
    foto:"subidas/default.png"
  });

  const [agencyM, setAgencyM]=useState({
    idagencia:0,
    foto:"subidas/default.png"
  });
  //para seleccionar archivo desde la misma imagen 
  const fileInputRef = useRef(null);

//para identificar si la pagina recibe parametro
const params=useParams();
// estados para modal
const [openModal, setOpenModal] = useState(false);

useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getAgencyById(params.id);
        setAgency({
          nombre:post[0].nombre,
          latitud: post[0].latitud,
          longitud:post[0].longitud,
          cant_personas:post[0].cant_personas,
          capacidad_personas:post[0].capacidad_personas,
          idagencia:post[0].idagencia,
          foto:post[0].foto
        });
      }
    })();
  }, [params.id, getAgencyById]);

const onSubmit = async (values,actions) => {
    if (params.id) {
        await updateAgency(params.id, values);
      } else {
        await createAgency(values);
      }
      actions.resetForm();
      actions.setSubmitting(false);
      navigate("/listAgency");
  };
  const onSubmitUpdateImage=async (values,actions)=>{
    await updateAgencyWithPhoto(params.id,values);

    setAgency({...agency, foto: values.foto});
    setOpenModal(false);
  };
const formilkUpdateImage=useFormik({
  initialValues:agencyM,
  enableReinitialize: true,
  onSubmit:onSubmitUpdateImage
});
const handleFileChange = (event) => {
  setAgency({...agency, foto: event.target.files[0]});
 // formik.setFieldValue('foto', event.target.files[0]);

};
const handleClick  = () => {
  if(params.id){ // si estamos en modo actualizar abrimos modal 
    setAgencyM({
        idagencia:agency.idagencia,
        foto:agency.foto
      });
    setOpenModal(true);
  }else{
    fileInputRef.current.click();
  }
};
const clickImageModal=()=>{
  fileInputRef.current.click();
}
const tmptUpdateImageModal=(event)=>{
  setAgencyM({...agencyM, foto: event.target.files[0]})
  formilkUpdateImage.setFieldValue('foto',event.target.files[0]);
}

const closeModal=()=>{
  setOpenModal(false);
}
const modalStyle = styleModal(colors);
const headerStyling = headerStyle(colors);
const footerStyling = footerStyle(colors);
return (
    <Box m="20px">
      
      <Modal open={openModal} onClose={() => setOpenModal(false)}
      items={openModal.toString()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
         <div>
          <ModalAgency
            styleModal={modalStyle}
            headerStyle={headerStyling}
            footerStyle={footerStyling}
            styleIcon={styleIcon}
            tmptUpdateImageModal={tmptUpdateImageModal}
            fileInputRef={fileInputRef}
            formilkUpdateImage={formilkUpdateImage}
            isNonMobile={isNonMobile}
            closeModal={closeModal}
            clickImageModal={clickImageModal}
            colors={colors}
          />
         </div>
      </Modal>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container justifyContent="flex-end">
            <Link to="/listAgency" className="text-gray-400 text-sm hover:text-gray-300">
                Go Back
            </Link>
        </Grid>
        <Typography component="h1" variant="h5" paragraph>
          Agencia
        </Typography>
        <Formik
        onSubmit={onSubmit}
        initialValues={agency}
        enableReinitialize={true}
        validationSchema={Yup.object({
          idagencia: Yup.string().required("Title is Required"),
          nombre: Yup.string().required("Description is Required"),
          latitud: Yup.number().typeError('Debe ser un valor numérico').
                      required("campo obligatorio"),
          longitud: Yup.number().typeError("Debe ingresar valor numerico")
                    .required("campo obligatorio"),
          cant_personas: Yup.number().typeError("Debe ingresar valor numerico"). 
                          required("campo obligatorio"),
          capacidad_personas: Yup.number().typeError("Debe ingresar valor numerico")
                              .required("Description is Required")
        })}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            errors
          })=>(
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <div className="col-md-4 mt-0">
              <img
                  src={values.foto && typeof values.foto !== 'string' ? URL.createObjectURL(values.foto) : values.foto || ''}
                  style={{ width: '200px', height: '200px', borderRadius: '10%' }}
                  alt="Imagen"
                  onClick={handleClick}
                />
                <Button
                  variant="contained"
                  component="label"
                  style={{ display: 'none' }}
                  onClick={handleClick}
                >
                    <Input
                    id="foto"
                    name="foto"
                    type="file"
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                    inputProps={{ accept: 'image/*' }}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  </Button>
            </div>
              <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                fullWidth
                label="Id agencia"
                name="idagencia"
                value={values.idagencia}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ display:  'none' }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth 
                    label="Nombre"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Latitud"
                    name="latitud"
                    value={values.latitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.latitud && Boolean(errors.latitud)}
                    helperText={touched.latitud && errors.latitud}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Longitud"
                    name="longitud"
                    value={values.longitud}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.longitud && Boolean(errors.longitud)}
                    helperText={touched.longitud && errors.longitud}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Cantidad de personas"
                    name="cant_personas"
                    value={values.cant_personas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cant_personas && Boolean(errors.cant_personas)}
                    helperText={touched.cant_personas && errors.cant_personas}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                label="Capacidad de personas"
                name="capacidad_personas"
                value={values.capacidad_personas}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.capacidad_personas && Boolean(errors.capacidad_personas)}
                helperText={touched.capacidad_personas && errors.capacidad_personas}
                />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="info"
              >
                Registrar
              </Button>
            </Box>
          )}
        </Formik>

      </Box>
    </Container>
  </Box>
)
};

export default Agency;