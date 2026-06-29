import type { SubmitHandler } from "react-hook-form";
import FormularioActor from "./FormularioActor";
import type ActorCreacion from "../modelos/ActorCreacion.Model";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { extraerErrores } from "../../../utilidades/Extraererrores";
import clienteAPI from "../../../api/ClienteAxios";



export default function CrearActor() {
    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        try{
            await clienteAPI.postForm('/actores', data);
        navigate('/actores');
        }catch(err){
            const errores = extraerErrores(err as AxiosError);
            setErrores(errores);
        }
}
    return (
    <>
         <h3>Crear Actor</h3>
         <FormularioActor onSubmit={onSubmit} errores={errores}/>
    </>
    )
}