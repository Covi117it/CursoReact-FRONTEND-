import { useForm, type SubmitHandler } from "react-hook-form";
import Boton from "../../../componentes/Boton";
import ListadoPeliculas from "./ListadoPeliculas";
import Paginacion from "../../../componentes/Paginacion";
import type PeliculasFiltrarDTO from "../modelos/PeliculasFiltrar.model";
import useFiltroPeliculas from "../hooks/useFiltroPeliculas";

export default function FiltrarPeliculas() {

    const valorInicial: PeliculasFiltrarDTO = {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false,
        paginacion: {
            pagina: 1,
            recordsPorPagina: 2
        }
    };


    const { register, handleSubmit, reset, setValue, getValues, formState: { isSubmitting } } = useForm<PeliculasFiltrarDTO>({
        defaultValues: valorInicial
    });

    const onSubmit: SubmitHandler<PeliculasFiltrarDTO> = async (data) => {
        setPagina(1);
        await buscarPeliculas(data, 1, recordsPorPagina);
    }
 

    const { buscarPeliculas, generos, pagina, recordsPorPagina, 
        cantidadTotalRegistros, setPagina, setRecordsPorPagina, peliculas } = useFiltroPeliculas(valorInicial, setValue, getValues);

    return (
        <>
            <h3>Filtro de Películas</h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="row row-cols-lg-auto g-3 align-items-center">

                <div className="col-12">
                    <input
                        id="titulo"
                        placeholder="Título de la película"
                        autoComplete="off"
                        className="form-control"
                        {...register('titulo')}
                    />
                </div>

                <div className="col-12">
                    <select
                        className="form-select"
                        {...register('generoId', { valueAsNumber: true })}
                    >
                        <option value={0}>--Seleccione un género--</option>
                        {generos.map(genero => (
                            <option key={genero.id} value={genero.id}>
                                {genero.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="proximosEstrenos"
                            {...register('proximosEstrenos')}
                        />
                        <label className="form-check-label" htmlFor="proximosEstrenos">
                            Próximos Estrenos
                        </label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="enCines"
                            {...register('enCines')}
                        />
                        <label className="form-check-label" htmlFor="enCines">
                            En Cines
                        </label>
                    </div>
                </div>

                <div className="col-12">
                    <Boton disabled={isSubmitting} type="submit">
                        {isSubmitting ? "Filtrando..." : "Filtrar"}
                    </Boton>
                    <Boton onClick={() => {
                        reset();
                        setPagina(1);
                        buscarPeliculas(valorInicial, 1, recordsPorPagina);
                    }} className="btn btn-danger ms-2">
                        Limpiar
                    </Boton>
                </div>
            </form>

            <div className="mt-4">
                <Paginacion
                    paginaActual={pagina} 
                    registrosPorPagina={recordsPorPagina}
                    cantidadTotalDeRegistros={cantidadTotalRegistros}
                    registrosPorPaginaOpciones={[2, 10, 50]}
                    onCambioPaginacion={(pagina, recordsPorPagina) => {
                        setPagina(pagina);
                        setRecordsPorPagina(recordsPorPagina);
                        buscarPeliculas(getValues(), pagina, recordsPorPagina);
                    }}
                />
            </div>

            <div className="mt-4">
                <ListadoPeliculas peliculas={peliculas} />
            </div>
        </>
    );
}