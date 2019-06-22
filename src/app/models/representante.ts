export class Representante{
    public constructor(
        public nombres: string,
        public apellidos: string,
        public tipdoc: string,
        public numdoc: string,
        public archivoAdjunto: File,
        public archivoAcrediteAdjunto: File,
    ){}
}