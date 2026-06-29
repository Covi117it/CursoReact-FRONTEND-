import { AsyncTypeahead } from "react-bootstrap-typeahead";
import type ActorPelicula from "../modelos/ActorPelicula";
import { useState } from "react";
import clienteAPI from "../../../api/ClienteAxios";

export default function TypeaheadActores(props: TypeaheadActoresProps) {

    const [actores, setActores] = useState<ActorPelicula[]>([]);
    const [cargando, setCargando] = useState(false);

    function manejarBusqueda(query: string) {
        setCargando(true);

        clienteAPI.get<ActorPelicula[]>(`/actores/${query}`)
            .then(res => {
                setActores(res.data);
                setCargando(false);
            })
    }

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
            <AsyncTypeahead
                isLoading={cargando}
                onSearch={manejarBusqueda}
                id="typeahead"
                onChange={(actores: any[]) => {
                    const actorSeleccionado = actores[0] as ActorPelicula;
                    if (props.actores.findIndex(x => x.id == actorSeleccionado.id) == -1) {
                        actorSeleccionado.personaje = '';
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