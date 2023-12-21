import React from "react"
import { Box,IconButton,Button,Input,TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
const ModalAgency=({styleModal,headerStyle,footerStyle,styleIcon,tmptUpdateImageModal,fileInputRef,formilkUpdateImage,isNonMobile,closeModal,clickImageModal,colors})=>{
    return (
    <Box style={styleModal}>
            <Grid container justifyContent="flex-end" item>
                <IconButton style={styleIcon} onClick={closeModal}>
                    <CloseIcon style={styleIcon}/>
                </IconButton>
            </Grid>
            <div align="center">
                <h2 style={headerStyle}>Actualizar</h2>
            </div>
            <div style={{ padding: '16px 32px 0' }}>
                <Box component="form" noValidate onSubmit={formilkUpdateImage.handleSubmit} sx={{ mt: 3 }}>
                <Grid  item xs={12}>
                    <img
                    src={formilkUpdateImage.values.foto && typeof formilkUpdateImage.values.foto !== 'string' ? URL.createObjectURL(formilkUpdateImage.values.foto) : formilkUpdateImage.values.foto || ''}
                    style={{ width: '200px', height: '200px', borderRadius: '10%' }}
                    alt="Profile"
                    onClick={clickImageModal}
                    />
                    <Button
                    variant="contained"
                    component="label"
                    style={{ display: 'none' }}
                    onClick={clickImageModal}
                    >
                        <Input
                        id="foto"
                        name="foto"
                        type="file"
                        onChange={tmptUpdateImageModal}
                        onBlur={formilkUpdateImage.handleBlur}
                        inputProps={{ accept: 'image/*' }}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        />
                    </Button>
                </Grid>
                <Grid  item xs={12}>
                    <TextField
                    fullWidth
                    label="Id agencia"
                    name="idagencia"
                    value={formilkUpdateImage.values.idagencia}
                    onChange={formilkUpdateImage.handleChange}
                    onBlur={formilkUpdateImage.handleBlur}
                    style={{ display:  'none' }}
                    />
                </Grid>
                <div style={footerStyle}>
                    <Button type="submit" variant="contained" sx={{backgroundColor: colors.primary[100]}}>
                        Actualizar
                    </Button>
                    <Button onClick={closeModal} sx={{backgroundColor:colors.grey[700]}}>
                        Cerrar
                    </Button>
                </div>
            </Box>
        </div>
    </Box>
    )
};

export default ModalAgency