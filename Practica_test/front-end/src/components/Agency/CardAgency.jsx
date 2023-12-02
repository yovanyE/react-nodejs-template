import toast,{ Toaster }  from "react-hot-toast"
import { useAgencyContext } from "../../context/AgencyContext"
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
export function PostCard({postCard}){
    const {deleteAgency}=useAgencyContext();
    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //creamos formulario dismmis para eliminar 
    const handleDelete = (id) => {
        toast(
            (t) => (
              <div>
                <p className="text-white">
                  Do you want to delete <strong>{id}</strong>?
                </p>
                <div>
                  <button
                    className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
                    onClick={(e) => {
                        e.stopPropagation();
                      deleteAgency(id);
                      toast.dismiss(t.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        toast.dismiss(t.id);
                    }
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ),
            {
              duration: "4000",
              style: {
                background: "#202020"
              }
            }
          );
      };

    return (
        <div
        key={postCard.idagencia} 
          className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
          onClick={() => navigate(`/agency/${postCard.idagencia}`)}
        >
          <div className="px-4 py-7">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold">{postCard.nombre}</h3>
              <button
                className="bg-red-600 text-sm px-2 py-1 rounded-sm"
                onClick={(e) => {
                     e.stopPropagation();
                     handleDelete(postCard.idagencia);
                }}
              >
                Delete
              </button>
              <Toaster/>
            </div>
            <p className="text-gray-400">{postCard.nombre}</p>
          </div>
          {postCard.nombre && <img src={postCard.foto} alt="Imagen" className="w-40 h-40 rounded-full" loading="lazy"/>}
        </div>
      );
}