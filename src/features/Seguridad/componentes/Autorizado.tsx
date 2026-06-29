import { useContext, useEffect, useState } from "react";
import AutenticationContext from "../utilidades/AutenticationContext";

export default function Autorizado(props: AutorizadoProps) {
    const [autorizado, setAutorizado] = useState(false);
    const {claims} = useContext(AutenticationContext);

    useEffect(() => {
       if (props.claims){
        for (let i = 0; i < props.claims.length; i++){
            const claim = props.claims[i];
            const indiceClaim = claims.findIndex(c => c.nombre === claim);
            if(indiceClaim > -1){
                setAutorizado(true);
                return;
            }
        }

        setAutorizado(false);
       } else {
        setAutorizado(claims.length > 0);
       }
    }, [claims, props.claims])

    return (
        <>

            {autorizado ? props.autorizado : props.noautorizado}
        </>
    )
}

interface AutorizadoProps {
    autorizado: React.ReactNode;
    noautorizado?: React.ReactNode;
    claims?: string[];


}