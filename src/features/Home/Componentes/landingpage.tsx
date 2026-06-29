import { useState, useEffect } from "react";
import ListadoPeliculas from "../../peliculas/Componentes/ListadoPeliculas";
import type LandingPageDto from "../modelos/LandingPage.DTO";
import clienteAPI from "../../../api/ClienteAxios";
import AlertaContext from "../../../utilidades/AlertaContext";

export default function LandingPage() {

  const [peliculas, setPeliculas] = useState<LandingPageDto>({});

  useEffect(() => {
    cargarDatos();
  }, [])

  function cargarDatos() {
    clienteAPI.get<LandingPageDto>("/peliculas/landing").then(res => setPeliculas(res.data));
  }

  return (
    <>
  
      <AlertaContext.Provider value={() => cargarDatos()}>
        <h3>En cines</h3>
        <ListadoPeliculas peliculas={peliculas.enCines} />

        <h3>Próximos estrenos</h3>
        <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
      </AlertaContext.Provider>
    </>
  )
}

