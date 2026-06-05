import { useState, useEffect } from "react";
import ListadoPeliculas from "../../peliculas/Componentes/ListadoPeliculas";
import type Pelicula from "../../peliculas/modelos/pelicula.model";

export default function LandingPage() {

    const [peliculas, setPeliculas] = useState<AppState>({});
    
      useEffect(() => {
        setTimeout(() => {
    
          const enCines: Pelicula[] = [{
            id: 1,
            titulo: "El Padrino",
            poster: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg"
          }, {
            id: 2,
            titulo: 'John Wick',
            poster: "https://tse1.mm.bing.net/th/id/OIP.atr58Il4sHnIthvlTLZxmAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          }];
    
            const proximosEstrenos: Pelicula[] = [{
              id: 3,
              titulo: "Spiderman 3",
              poster: "https://cdn.kinocheck.com/i/w=1200/s3m42w97ej.jpg"
            }];
    
          setPeliculas({
            enCines,
            proximosEstrenos
          });
    
        }, 1000);
      }, [])

    return (
        <>
            <h3>En cines</h3>
            <ListadoPeliculas peliculas={peliculas.enCines} />

            <h3>Próximos estrenos</h3>
            <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />

        </>
    )
}

interface AppState {
  enCines?: Pelicula[];
  proximosEstrenos?: Pelicula[];
}

