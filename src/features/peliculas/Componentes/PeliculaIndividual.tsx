import { NavLink, useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";
import type Pelicula from "../modelos/pelicula.model";
import styles from "./PeliculaIndividual.module.css";
import clienteAPI from "../../../api/ClienteAxios";
import { useContext } from "react";
import AlertaContext from "../../../utilidades/AlertaContext";
import Confirmar from "../../../utilidades/Confirmar";
import Autorizado from "../../Seguridad/componentes/Autorizado";

export default function PeliculaIndividual(props: PeliculaIndividualProps) {

    const construirLink = () => `/peliculas/${props.pelicula.id}`;
    const navigate = useNavigate();
    const alerta = useContext(AlertaContext)

    const borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`/peliculas/${id}`);
            alerta();
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.div}>
            <NavLink to={construirLink()}>
                <img alt="Poster" src={props.pelicula.poster} />
            </NavLink>
            <p>
                <NavLink to={construirLink()} className={styles.NavLink}>
                    {props.pelicula.titulo}
                </NavLink>
            </p>

            <Autorizado
                claims={['esadmin']}
                autorizado={<>
                    <div>
                        <Boton onClick={() => navigate(`peliculas/editar/${props.pelicula.id}`)}>Editar</Boton>
                        <Boton className="btn btn-danger ms-4" onClick={() => Confirmar(() => borrar(props.pelicula.id))}>Borrar</Boton>
                    </div>
                </>}
            />

        </div>
    )
}

interface PeliculaIndividualProps {
    pelicula: Pelicula
}