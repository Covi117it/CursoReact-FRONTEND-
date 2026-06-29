import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import clienteAPI from "../../../api/ClienteAxios";
import type Genero from "../../generos/moelos/Genero.model";
import type Pelicula from "../modelos/pelicula.model";
import type PeliculasFiltrarDTO from "../modelos/PeliculasFiltrar.model";
import type { UseFormSetValue } from "react-hook-form";

export default function useFiltroPeliculas(
    valorInicial: PeliculasFiltrarDTO, 
    setValue: UseFormSetValue<PeliculasFiltrarDTO>,
    _getValues: () => PeliculasFiltrarDTO
) {
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [peliculas, setPeliculas] = useState<Pelicula[]>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagina, setPagina] = useState(searchParams.has('pagina') ? parseInt(searchParams.get('pagina')!, 10) : 1);
    const [recordsPorPagina, setRecordsPorPagina] = useState(searchParams.has('recordsPorPagina') ? parseInt(searchParams.get('recordsPorPagina')!, 10) : 2);
    const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);

    useEffect(() => {
        clienteAPI.get<Genero[]>("generos/todos").then(res => setGeneros(res.data));
    }, []);

    useEffect(() => {
        if (generos.length === 0) {
            return;
        }

        if (searchParams.has('titulo')) {
            valorInicial.titulo = searchParams.get('titulo')!;
            setValue('titulo', valorInicial.titulo);
        }

        if (searchParams.has('generoId')) {
            valorInicial.generoId = parseInt(searchParams.get('generoId')!, 10);
            setValue('generoId', valorInicial.generoId);
        }

        if (searchParams.has('enCines')) {
            valorInicial.enCines = Boolean(searchParams.get("enCines"));
            setValue('enCines', valorInicial.enCines);
        }

        if (searchParams.has('proximosEstrenos')) {
            valorInicial.proximosEstrenos = Boolean(searchParams.get("proximosEstrenos"));
            setValue('proximosEstrenos', valorInicial.proximosEstrenos);
        }

        buscarPeliculas(valorInicial, pagina, recordsPorPagina);
    }, [generos]);

    function modificarURL(valores: PeliculasFiltrarDTO, paginaActual: number, recordsPorPaginaActual: number) {
        const params = new URLSearchParams();

        if (valores.titulo) {
            params.set('titulo', valores.titulo);
        }

        if (valores.generoId) {
            params.set('generoId', String(valores.generoId));
        }

        if (valores.enCines) { 
            params.set('enCines', String(valores.enCines));
        }

        if (valores.proximosEstrenos) {
            params.set('proximosEstrenos', String(valores.proximosEstrenos));
        }

        params.set('pagina', String(paginaActual));
        params.set('recordsPorPagina', String(recordsPorPaginaActual));

        setSearchParams(params);
    }

    async function buscarPeliculas(
        valores: PeliculasFiltrarDTO,
        paginaActual: number = pagina,
        recordsPorPaginaActual: number = recordsPorPagina
    ) {
        modificarURL(valores, paginaActual, recordsPorPaginaActual);
        try {
            const { paginacion, ...otrosValores } = valores;

            const params = {
                ...otrosValores,
                generoId: Number(valores.generoId),
                pagina: paginaActual,
                recordsPorPagina: recordsPorPaginaActual
            };

            const res = await clienteAPI.get<Pelicula[]>("peliculas/filtrar", { params });
            
            const headerTotal = res.headers['cantidad-total-registros'];
            const totalRegistros = typeof headerTotal === 'string' ? parseInt(headerTotal, 10) : 0;

            setPeliculas(res.data);
            setCantidadTotalRegistros(totalRegistros);
        } catch (error) {
            console.error("Error al buscar películas:", error);
        }
    }

    return { buscarPeliculas, generos, pagina, recordsPorPagina, cantidadTotalRegistros, setPagina, setRecordsPorPagina, peliculas };
}