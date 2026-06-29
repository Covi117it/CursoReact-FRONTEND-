import React from "react";
import type Claim from "../modelos/Claim";

const AutenticationContext = React.createContext<AutenticationContextParams>({claims: [], actualizar: () => {}})

interface AutenticationContextParams {
    claims: Claim[];
    actualizar(claim: Claim[]): void;
}

export default AutenticationContext