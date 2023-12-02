import { Link } from "react-router-dom";
import { VscEmptyWindow } from "react-icons/vsc";
import { PostCard } from "../../../components/Agency/CardAgency";
import { useAgencyContext } from "../../../context/AgencyContext";
import { Box, Grid } from "@mui/material";
import Header from "../../../components/Headers";
export function ListAgency(){
    const {agency}=useAgencyContext();

    const renderPost = () => {
      if (agency.length === 0)
        return (
          <div className="flex flex-col justify-center items-center">
            <VscEmptyWindow className="w-48 h-48 text-white" />
            <h1 className="text-white text-2xl">There are no posts</h1>
          </div>
        );
  
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agency.map((postItem) => (
            <PostCard key={postItem.idagencia} postCard={postItem} />
          ))}
          </div>
      );
    };

    return (
        <Box m="20px">
          <main>
        <Header title="Listado de Agenciaas" subtitle="seleccione sub agencias para editar" />
          <Grid container justifyContent="flex-end">
        <Box mr={2}>
        <h1 className="text-2xl text-gray-300 font-bold">
            Agencias ({agency.length})
          </h1>
        </Box>
        </Grid>
  
        {renderPost()}
        </main>
      </Box>
    );
}