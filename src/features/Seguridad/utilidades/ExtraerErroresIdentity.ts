import type { AxiosError } from "axios";

export default function extraerErroresIdentity(obj: AxiosError): string[]{
    const data = obj.response?.data as RespuestaError[];
    
    if (!data || !Array.isArray(data)) {
        if (obj.message) {
            return [obj.message];
        }
        return ["Ha ocurrido un error inesperado al comunicarse con el servidor."];
    }
    
    const mensajesDeError: string[] = data.map(error => error.description);
    return mensajesDeError;
}

interface RespuestaError{
    code: string;
    description: string;
}