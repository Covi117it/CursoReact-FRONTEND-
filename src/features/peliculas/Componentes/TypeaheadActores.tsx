import { Typeahead } from "react-bootstrap-typeahead";
import type ActorPelicula from "../modelos/ActorPelicula";
import { useState } from "react";

export default function TypeaheadActores(props: TypeaheadActoresProps) {

    const actores: ActorPelicula[] = [{
        id: 1, nombre: "Tom Holland", personaje: "", foto: "https://th.bing.com/th/id/OIP.-55qeefiytunq26WTBog6QHaLG?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    { id: 2, nombre: "Marisa Tomei", personaje: "", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Marisa_Tomei_Photo_Op_GalaxyCon_Raleigh_2024_%28cropped%29.jpg/960px-Marisa_Tomei_Photo_Op_GalaxyCon_Raleigh_2024_%28cropped%29.jpg" },
    {
        id: 3, nombre: "Tom Hanks", personaje: "", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/960px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg",

    }
    ]

    const seleccion: ActorPelicula[] = [];

    const [elementoArrastrado, setElementoArrastrado] = useState<ActorPelicula | undefined>(undefined);

    const manejarDragStart = (actor: ActorPelicula) => {
        setElementoArrastrado(actor);
    }

    const manejarDragOver = (actor: ActorPelicula) => {
        if (!elementoArrastrado || actor.id === elementoArrastrado.id) {
            return;
        }

        const actores = [...props.actores];
        const indiceDesde = actores.findIndex(x => x.id === elementoArrastrado.id);
        const indiceHasta = actores.findIndex(x => x.id === actor.id);

        if (indiceDesde !== -1 && indiceHasta !== -1) {
            [actores[indiceDesde], actores[indiceHasta]] = [actores[indiceHasta], actores[indiceDesde]];
            props.onAdd(actores);
        }
    }

    return (
        <>
            <label>Actores</label>
            <Typeahead
                id="typeahead"
                onChange={(actores: any[]) => {
                    const actorSeleccionado = actores[0] as ActorPelicula;
                    if (props.actores.findIndex(x => x.id == actorSeleccionado.id) == -1) {
                        props.onAdd([...props.actores, actorSeleccionado])
                    }
                }}

                options={actores}
                labelKey={(opcion: any) => {
                    const actor = opcion as ActorPelicula;
                    return actor.nombre
                }}

                filterBy={["nombre"]}
                placeholder="Escriba el nombredel actor..."
                minLength={2}
                flip={true}
                selected={seleccion}
                renderMenuItemChildren={(opcion: any) => {
                    const actor = opcion as ActorPelicula;
                    return (
                        <>
                            <img alt="imagen actor" src={actor.foto}
                                style={{
                                    height: "64px",
                                    marginRight: "10px"
                                }} />

                            <span>{actor.nombre}</span>

                        </>
                    )
                }}
            />

            <ul className="list-group">
                {props.actores.map(actor => (
                    <li
                        draggable={true}
                        onDragStart={() => manejarDragStart(actor)}
                        onDragOver={() => manejarDragOver(actor)}
                        className="list-group-item d-flex align-items-center"
                        key={actor.id}
                    >
                        <div style={{ width: "70px" }}>
                            <img style={{ height: "60px" }}
                                src={actor.foto}
                                alt="foto"
                            />
                        </div>
                        <div style={{ width: "150px", marginLeft: "1rem" }}>
                            {actor.nombre}
                        </div>

                        <div className="flex-grow-1 mx-3">
                            <input className="form-control" 
                                placeholder="personaje" type="text" value={actor.personaje}
                                onChange={e => {
                                    props.onCambioPersonaje(actor.id, e.currentTarget.value)
                                }}
                            />
                        </div>
                        <span role="button" className="badge text-bg-secondary" onClick={() => props.onRemove(actor)}>X</span>
                    </li>
                ))}
            </ul>

        </>

    )
}

interface TypeaheadActoresProps {
    actores: ActorPelicula[];
    onAdd(actores: ActorPelicula[]): void;
    onCambioPersonaje(id: number, personaje: string): void;
    onRemove(actor: ActorPelicula): void;
}