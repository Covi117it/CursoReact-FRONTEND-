import type Genero from "../moelos/Genero.model";
import IndiceEntidades from "../../../componentes/IndiceEntidades";
import { useEntidades } from "../../../hooks/useEntidades";

export default function IndiceGeneros() {
    const entidadesHook = useEntidades<Genero>('/generos');



    return (
        <>
            <IndiceEntidades<Genero>
                titulo="Géneros" nombreEntidad="Géneros" url="/generos"
                urlCrear="/generos/crear" {...entidadesHook}
            >
                {(generos, botones) => <>
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
                        {generos?.map(genero => <tr key={genero.id}>
                            <td>{genero.nombre}</td>
                            <td className="text-end">
                                {botones(`/generos/editar/${genero.id}`, genero.id)}
                            </td>
                        </tr>)}
                    </tbody>
                </>}
            </IndiceEntidades>

        </>
    )
}   