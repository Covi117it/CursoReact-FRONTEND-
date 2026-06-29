export default interface PeliculasFiltrarDTO {
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
    paginacion: {
        pagina: number;
        recordsPorPagina: number;
    };
}