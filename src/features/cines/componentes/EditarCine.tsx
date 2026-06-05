import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type CineCreacion from "../modelos/CineCreacion.Model";
import FormularioCine from "./FormularioCine";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/cargando";

export default function     EditarCine() {

    const { id } = useParams();
    const [modelo, setModelo] = useState<CineCreacion | undefined>(undefined);
    useEffect(() => {
        setTimeout(() => {
            setModelo({nombre: "Agora Mall2", latitud: 18.48340642793992, longitud: -69.93975877761842})
        }, 1000)
    }, [id]);

    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
            console.log("editar el cine...");
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(data);
        };

    return (
        <>
            <h3>Editar Cine</h3>
            {modelo ? <FormularioCine modelo={modelo} onSubmit={onSubmit}/> : <Cargando/>}
        </>
    )
}