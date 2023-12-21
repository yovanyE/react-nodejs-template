import { ColorModeContext, useMode } from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material"
import Topbar from "./scenes/global/TopBar"
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard"
import { Routes, Route } from "react-router-dom";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Agency from "./scenes/agency";
import Form from "./scenes/form";
import Bar from "./scenes/bar";
import {TypeServiceProvider} from './context/TypeServiceContext';
import { AgencyContextProvider } from "./context/AgencyContext";
import { ServiceAgencyContextProvider } from "./context/serviceAgencyContext";
import { ListAgency } from "./scenes/agency/listAgency/ListAgency";
import {NotFoundPage} from './scenes/NotFoundPage'
function App() {
  const [theme,colorMode]=useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <TypeServiceProvider>
        <AgencyContextProvider>
          <ServiceAgencyContextProvider>
        <CssBaseline/>
        <div className="app" style={{ display: "flex" }}>
          <Sidebar/>
        <main className="content"
           style={{
            marginLeft: "0px", // Ajusta el margen izquierdo para que coincida con el ancho de la barra lateral
            height: "100vh", // Ajusta la altura al 100% del viewport
            overflowY: "auto", // Hace que haya un scroll vertical solo cuando sea necesario
            padding: "0px", // Ajusta el relleno según sea necesario
            boxSizing: "border-box",  // Añade esta propiedad para tener en cuenta el padding en el cálculo del tamaño
            marginBottom: "56px",  // Añade un margen inferior para evitar la superposición con el Topbar
          }}
        >
          <Topbar/>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/team" element={<Team/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/invoices"  element={<Invoices/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path="/bar" element={<Bar/>}/>
            <Route path="/agency" element={<Agency/>} />
            <Route path="/agency/:id" element={<Agency/>}/>
            <Route path="listAgency" element={<ListAgency/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        </div>
        </ServiceAgencyContextProvider>
        </AgencyContextProvider>
        </TypeServiceProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
