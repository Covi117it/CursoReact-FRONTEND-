import type { SubmitHandler } from "react-hook-form";
import FormularioPelicula from "./FormularioPelicula";
import type PeliculasCreacion from "../modelos/PeliculaCreacion.model";
import type Genero from "../../generos/moelos/Genero.model";
import type Cine from "../../cines/modelos/Cine.model";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/ClienteAxios";
import type PeliculasPostGet from "../modelos/PeliculasPostGet";
import Cargando from "../../../componentes/cargando";
import { useNavigate } from "react-router";
import convertirPeliculaCreacionAFormData from "../utilidades/convertirPeliculaCreacionAFormData";
import { extraerErrores } from "../../../utilidades/Extraererrores";
import type { AxiosError } from "axios";
import type Pelicula from "../modelos/pelicula.model";

export default function CrearPelicula() {

    const navigate = useNavigate();
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<Genero[]>([]);
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<Cine[]>([]);
    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState<string[]>([])

    useEffect(() => {
        clienteAPI.get<PeliculasPostGet>(`/peliculas/postget`).then(res => {
            setGenerosNoSeleccionados(res.data.generos);
            setCinesNoSeleccionados(res.data.cines);
            setCargando(false);
        });
    }, [])

    const onSubmit: SubmitHandler<PeliculasCreacion> = async (data) => {
        try {
            const formData = convertirPeliculaCreacionAFormData(data);
           const respuesta = await clienteAPI.post<Pelicula>('/peliculas', formData);
            navigate(`/peliculas/${respuesta.data.id}`);
        }
        catch (err) {
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
    }

    return (
        <>
            <h3>Crear Pelicula</h3>
            {cargando ? <Cargando /> : <FormularioPelicula
                errores={errores}
                onSubmit={onSubmit} generosNoSeleccionados={generosNoSeleccionados}
                generosSeleccionados={[]}
                cinesSeleccionados={[]} cinesNoSeleccionados={cinesNoSeleccionados}
                actoresSeleccionados={[]} />}
        </>
    )
}