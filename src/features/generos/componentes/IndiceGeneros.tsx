import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";
import ListadoGenerico from "../../../componentes/ListadoGenerico";
import Paginacion from "../../../componentes/Paginacion";
import Cargando from "../../../componentes/cargando";
import { useGeneros } from "../hooks/useGeneros";
import clienteAPI from "../../../api/ClienteAxios";
import Confirmar from "../../../utilidades/Confirmar";

export default function IndiceGeneros() {
    const navigate = useNavigate();
    const { cargando, pagina, setPagina, recordsPorPagina, setRecordsPorPagina, cantidadTotalRegistros, generos, cargarRegistros } = useGeneros();

    const Borrar = async (id: number) => {
        try{
            await clienteAPI.delete(`/generos/${id}`);

            if (pagina === 1){
                cargarRegistros();
            } else {
                setPagina(1);
            }
        } catch (err) {
            console.error(err);
        } 
    }

    return (
        <>
            <h3>Géneros</h3>
            <div>

                <Boton onClick={() => navigate("/generos/crear")}>Crear Género</Boton>
            </div>

            {cargando ? <Cargando /> : <div className="mt-4">

                <div className="mb-2">
                    <Paginacion paginaActual={pagina} registrosPorPagina={recordsPorPagina} cantidadTotalDeRegistros={cantidadTotalRegistros}
                        registrosPorPaginaOpciones={[5, 10, 50]} onCambioPaginacion={(pagina, recordsPorPagina) => {
                            setPagina(pagina);
                            setRecordsPorPagina(recordsPorPagina);

                        }} />
                </div>

                <ListadoGenerico listado={generos}>
                    <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
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
                                    <Boton
                                        onClick={() => navigate(`/generos/editar/${genero.id}`)}
                                        className="btn btn-sm btn-outline-primary me-2"><i className="bi bi-pencil-square me-1">
                                        </i>Editar</Boton>
                                    <Boton 
                                        onClick={() => Confirmar(() => Borrar(genero.id))}
                                        className="btn btn-sm btn-outline-danger me-2"><i className="bi bi-trash me-1">
                                        </i>Borrar</Boton>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </ListadoGenerico>

            </div>}

        </>
    )
}   