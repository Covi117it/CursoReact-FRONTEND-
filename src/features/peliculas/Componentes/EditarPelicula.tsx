import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type PeliculasCreacion from "../modelos/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/cargando";
import type PeliculasPutGet from "../modelos/PeliculasPutGet";
import { useNavigate } from "react-router";
import clienteAPI from "../../../api/ClienteAxios";
import FormatearFecha from "../../../utilidades/FormatearFecha";
import convertirPeliculaCreacionAFormData from "../utilidades/ConvertirpeliculaCreacionAFormData";
import { extraerErrores } from "../../../utilidades/Extraererrores";
import type { AxiosError } from "axios";

export default function EditarPelicula() {

    const [modelo, setModelo] = useState<PeliculasCreacion | undefined>(undefined);
    const [peliculaPutGet, setPeliculaPutGet] = useState<PeliculasPutGet>();
    const { id } = useParams();
    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<PeliculasCreacion> = async (data) => {
        try {
            const formData = convertirPeliculaCreacionAFormData(data);
            await clienteAPI.putForm(`/peliculas/${id}`, formData);
            navigate(`/peliculas/${id}`);

        } catch (err) {
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
    }
    useEffect(() => {
        clienteAPI.get<PeliculasPutGet>(`/peliculas/putget/${id}`).then(res => {
            const pelicula = res.data.pelicula;
            const peliculaCreacion: PeliculasCreacion = {
                titulo: pelicula.titulo,
                fechaLanzamiento: FormatearFecha(pelicula.fechaLanzamiento),
                poster: pelicula.poster,
                trailer: pelicula.trailer
            }

            setModelo(peliculaCreacion);
            setPeliculaPutGet(res.data);
        })
    }, [id]);

    return (
        <>
            <h3>Editar Pelicula</h3>
            {modelo && peliculaPutGet ? <FormularioPelicula errores={errores} modelo={modelo} onSubmit={onSubmit}
                generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
                generosSeleccionados={peliculaPutGet.generosSeleccionados}
                cinesSeleccionados={peliculaPutGet.cinesSeleccionados}
                cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
                actoresSeleccionados={peliculaPutGet.actores}
            /> : <Cargando />}
        </>
    )
}

