import IndiceEntidades from "../../../componentes/IndiceEntidades";
import { useEntidades } from "../../../hooks/useEntidades";
import type Actor from "../modelos/Actor.model";

export default function IndiceActores() {
    const entidadesHook = useEntidades<Actor>('/actores');



    return (
        <>
            <IndiceEntidades<Actor>
                titulo="Actores" nombreEntidad="Actores" url="/actores"
                urlCrear="/actores/crear" {...entidadesHook}
            >
                {(actores, botones) => <>
                    <thead>
                        <tr>
                            <th scope="col">
                                Nombre
                            </th>
                            <th scope="col" className="text-end">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {actores?.map(actor => <tr key={actor.id}>
                            <td>{actor.nombre}</td>
                            <td className="text-end">
                                {botones(`/actores/editar/${actor.id}`, actor.id)}
                            </td>
                        </tr>)}
                    </tbody>
                </>}
            </IndiceEntidades>

        </>
    )
}   