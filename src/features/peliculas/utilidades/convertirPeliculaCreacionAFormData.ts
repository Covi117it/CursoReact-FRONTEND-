import type PeliculasCreacion from "../modelos/PeliculaCreacion.model";

export default function convertirPeliculaCreacionAFormData(peliculaCreacion: PeliculasCreacion) {
    const formData = new FormData();
    
     formData.append('Titulo', peliculaCreacion.titulo);
    formData.append('FechaLanzamiento', peliculaCreacion.fechaLanzamiento);

    if (peliculaCreacion.poster) {
        formData.append('Poster', peliculaCreacion.poster);
    }

    if (peliculaCreacion.trailer) {
        formData.append('Trailer', peliculaCreacion.trailer);
    }

    formData.append('GenerosIds', JSON.stringify(peliculaCreacion.generosIds ?? []));
    formData.append('CinesIds', JSON.stringify(peliculaCreacion.cinesIds ?? []));
    formData.append('Actores', JSON.stringify(peliculaCreacion.actores ?? []));

    return formData;
}