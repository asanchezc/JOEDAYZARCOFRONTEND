export class Titular{
    public constructor(
        public nombres: string,
        public apellidos: string,
        public tipdoc: string,
        public numdoc: string,
        public email: string,
        public domicilio: string,
        public archivoAdjunto: File,
        public tipoSolicitud: string
    ){}
}