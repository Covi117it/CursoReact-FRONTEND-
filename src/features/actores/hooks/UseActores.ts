import { useState, useEffect, useCallback } from "react";
import clienteAPI from "../../../api/ClienteAxios";
import type Actor from "../modelos/Actor.model";

export function useActores() {
    const [actores, setActores] = useState<Actor[]>();
        const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);
        const [pagina, setPagina] = useState(1);
        const [recordsPorPagina, setRecordsPorPagina] = useState(5);
        const [cargando, setCargando] = useState(true);
        
        const cargarRegistros = useCallback( () => {
            setCargando(true);
            clienteAPI.get<Actor[]>(`/actores`, {
                params: { pagina, recordsPorPagina }
            }).then(res => {
                const cantidadTotalDeRegistro = parseInt(res.headers['cantidad-total-registros']);
                setCantidadTotalRegistros(cantidadTotalDeRegistro);
                setActores(res.data);
                setCargando(false);
            });
        }, [pagina, recordsPorPagina]);
    
        useEffect(() => {
            cargarRegistros();
        }, [cargarRegistros]);

        return {cargando, pagina, setPagina, recordsPorPagina, setRecordsPorPagina, cantidadTotalRegistros, actores: actores, cargarRegistros};
}