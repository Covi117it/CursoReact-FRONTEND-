import type Pelicula from "../../peliculas/modelos/pelicula.model";

export default interface LandingPageDto {
  enCines?: Pelicula[];
  proximosEstrenos?: Pelicula[];
}

