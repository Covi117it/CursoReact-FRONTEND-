import { Outlet } from "react-router";
import Autorizado from "./Autorizado";

export default function RutaProtegida(props: RutaProtegidaProps) {
    return <Autorizado claims={props.claims} autorizado={<Outlet/>}
    noautorizado={<>no puedes ver este contenido</>} />
}

interface RutaProtegidaProps{
    claims: string[];
}