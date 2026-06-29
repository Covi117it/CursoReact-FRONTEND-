import { BrowserRouter } from "react-router";
import Menu from "./componentes/Menu";
import AppRoutes from "./AppRoutes";
import AutenticationContext from "./features/Seguridad/utilidades/AutenticationContext";
import { useEffect, useState } from "react";
import type Claim from "./features/Seguridad/modelos/Claim";
import { obtenerClaims } from "./utilidades/Manejadorjwt";

export default function App() {

  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims())
  }, [])

  function actualizar(claims: Claim[]) {
    setClaims(claims);
  }

  return (
    <>

      <BrowserRouter>
        <AutenticationContext.Provider value={{ claims, actualizar }}>
          <Menu />
          <div className="container mb-4">
            <AppRoutes />
          </div>
        </AutenticationContext.Provider>
      </BrowserRouter>
    </>
  );
}

