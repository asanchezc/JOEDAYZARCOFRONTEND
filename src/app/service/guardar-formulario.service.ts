import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titular } from '../models/titular';
import { Representante } from '../models/representante';
import { Adicionales } from '../models/adicionales';

@Injectable()
export class GuardarFormularioService {

  private URL_BACKEND: string = 'http://localhost:8082/fps-app-ws-extranetorchestrator/inkafarma/arco/insertform';

  constructor(private http: HttpClient) {}

  guardarFormulario(titular: Titular, repre: Representante, checkedRepre: boolean, adicionales: Adicionales): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();


    formdata.append('titu_archivo', titular.archivoAdjunto);
    formdata.append('titu_nombre', titular.nombres);
    formdata.append('titu_apellidos', titular.apellidos);
    formdata.append('titu_domicilio', titular.domicilio);
    formdata.append('titu_email', titular.email);
    formdata.append('titu_numdoc', titular.numdoc);
    formdata.append('titu_tipdoc', titular.tipdoc);
    formdata.append('titu_tipoSolicitud', titular.tipoSolicitud);
    formdata.append('checkedRepre', checkedRepre.toString());
    formdata.append('repre_nombres', repre.nombres);
    formdata.append('repre_apellidos', repre.apellidos);
    formdata.append('repre_tipdoc', repre.tipdoc);
    formdata.append('repre_numdoc', repre.numdoc);
    formdata.append('repre_archivoAdjunto', repre.archivoAdjunto);
    formdata.append('repre_archivoAcrediteAdjunto', repre.archivoAcrediteAdjunto);
    formdata.append('adicional_text', adicionales.textArea);
    formdata.append('adicional_archivoAdjunto', adicionales.archivoAdjunto);


    console.log('por enviar:', JSON.stringify(formdata));
    const req = new HttpRequest('POST', this.URL_BACKEND, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  /*getFiles(): Observable<string[]> {
    return this.http.get('/getallfiles');
  }*/
}
