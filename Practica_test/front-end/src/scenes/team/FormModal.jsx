import React from "react";
import { Box, Button, TextField,IconButton } from "@mui/material";
import { Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import Grid from '@mui/material/Grid';

const FormModal = ({ styleModal, headerStyle, footerStyle, styleIcon, selectService, handleFormSubmit, closeModal, isNonMobile, colors }) => {
  return (
    <div style={styleModal}>
      <Grid container justifyContent="flex-end" item>
        <IconButton style={styleIcon} onClick={closeModal}>
          <CloseIcon style={styleIcon}/>
        </IconButton>
      </Grid>
      <div align="center">
        <h2 style={headerStyle}>Actualizar</h2>
      </div>

      <div style={{ padding: '16px 32px 0' }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={selectService}
          enableReinitialize={true}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Id"
                  value={values.idtiposervicio}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="idtiposervicio"
                  sx={{ input: { color: colors.grey[100] },gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Descripción"
                  value={values.descripcion}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="descripcion"
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <div style={footerStyle}>
                <Button type="submit" variant="contained" sx={{backgroundColor: colors.primary[100]}}>
                  Submit
                </Button>
                <Button onClick={closeModal} sx={{backgroundColor:colors.grey[700]}}>Cancelar</Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormModal;

