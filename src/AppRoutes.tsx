import { Routes, Route } from "react-router";
import IndiceGeneros from "./features/generos/componentes/IndiceGeneros";
import LandingPage from "./features/Home/Componentes/landingpage";
import CrearGenero from "./features/generos/componentes/CrearGenero";
import EditarGenero from "./features/generos/componentes/EditarGenero";
import IndiceActores from "./features/actores/componentes/IndiceActores";
import CrearActor from "./features/actores/componentes/CrearActor";
import EditarActor from "./features/actores/componentes/EditarActor";
import IndiceCines from "./features/cines/componentes/IndiceCines";
import CrearCine from "./features/cines/componentes/CrearCine";
import EditarCine from "./features/cines/componentes/EditarCine";
import CrearPelicula from "./features/peliculas/Componentes/CrearPelicula";
import EditarPelicula from "./features/peliculas/Componentes/EditarPelicula";
import RutaNoEncontrada from "./componentes/RutaNoEncontrada";
import FiltrarPeliculas from "./features/peliculas/Componentes/FiltrarPeliculas";
import DetallePelicula from "./features/peliculas/Componentes/DetallePelicula";
import RutaProtegida from "./features/Seguridad/componentes/RutaProtegida";
import Registro from "./features/Seguridad/componentes/Registro";
import Login from "./features/Seguridad/componentes/Login";
import IndiceUsuarios from "./features/Seguridad/componentes/IndiceUsuarios";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/registro" element={<Registro />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<RutaProtegida claims={['esadmin']} />}>
                <Route path="/generos" element={<IndiceGeneros />} />
                <Route path="/generos/crear" element={<CrearGenero />} />
                <Route path="/generos/editar/:id" element={<EditarGenero />} />
                <Route path="/actores" element={<IndiceActores />} />
                <Route path="/actores/crear" element={<CrearActor />} />
                <Route path="/actores/editar/:id" element={<EditarActor />} />
                <Route path="/cines" element={<IndiceCines />} />
                <Route path="/cines/crear" element={<CrearCine />} />
                <Route path="/cines/editar/:id" element={<EditarCine />} />
                <Route path="/usuarios" element={<IndiceUsuarios />} />
                <Route path="/peliculas/crear" element={<CrearPelicula />} />
                <Route path="/peliculas/editar/:id" element={<EditarPelicula />} />
            </Route>

            <Route path="/peliculas/filtrar" element={<FiltrarPeliculas />} />
            <Route path="/peliculas/:id" element={<DetallePelicula />} />

            <Route path="*" element={<RutaNoEncontrada />} />

        </Routes>
    )
}