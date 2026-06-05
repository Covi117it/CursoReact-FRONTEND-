import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type PeliculasCreacion from "../modelos/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/cargando";
import type Genero from "../../generos/moelos/Genero.model";
import type Cine from "../../cines/modelos/Cine.model";
import type ActorPelicula from "../modelos/ActorPelicula";

export default function EditarPelicula() {

    const [modelo, setModelo] = useState<PeliculasCreacion | undefined>(undefined);
    const { id } = useParams();

    const onSubmit: SubmitHandler<PeliculasCreacion> = async(data) =>{
            console.log("editar pelicula...");
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(data);
        }

        const generosSeleccionados: Genero[] = [{id: 1, nombre: "Amor"}];
        const generosNoSeleccionados: Genero[] = [{id: 1, nombre: "Accion"}, {id: 1, nombre: "Comedia"}, {id: 3, nombre: "Romcom"}]

         const cinesSeleccionados: Cine[] = [{id: 1, nombre: "Agora", latitud: 0, longitud: 0}];
            const cinesNoSeleccionados: Cine[] = [
                {id: 2, nombre: "Sambil", latitud: 0, longitud: 0}
            ];

    useEffect(() => {
        setTimeout(() => {
            setModelo({titulo: "Avengers" + id, fechaLanzamiento: "2020-05-11", trailer: "abc", poster: "https://th.bing.com/th/id/R.fb229445e379afa39e82c699b020f59b?rik=UK2gSD3%2b2HSRkA&pid=ImgRaw&r=0"})
        }, 500)
    }, [id]);

    const actoresSeleccionados: ActorPelicula[] = [
         { id: 2, nombre: "Marisa Tomei", personaje: "tia mey", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Marisa_Tomei_Photo_Op_GalaxyCon_Raleigh_2024_%28cropped%29.jpg/960px-Marisa_Tomei_Photo_Op_GalaxyCon_Raleigh_2024_%28cropped%29.jpg" }
    ]

    return (
        <>
            <h3>Editar Pelicula</h3>
            {modelo ? <FormularioPelicula modelo={modelo} onSubmit={onSubmit}
                generosNoSeleccionados={generosNoSeleccionados}
                generosSeleccionados={generosSeleccionados}
                cinesSeleccionados={cinesSeleccionados}
                cinesNoSeleccionados={cinesNoSeleccionados}
                actoresSeleccionados={actoresSeleccionados}
            />: <Cargando/>}
        </>
    )
}