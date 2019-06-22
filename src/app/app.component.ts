import { Component } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { GuardarFormularioService } from '../app/service/guardar-formulario.service';
import { Titular } from './models/titular';
import { Representante } from './models/representante';
import { ValidTitular } from './models/valid-titular';
import { ValidRepresentante } from './models/valid-representante';
import { MsgValid } from './models/valid-message';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import { NgxSpinnerService } from 'ngx-spinner';
import { Adicionales } from './models/adicionales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /*models*/
  public titular: Titular;
  public repre: Representante;
  public validTitular: ValidTitular;
  public validRepresentante: ValidRepresentante;
  public adicionales: Adicionales;

  /* primitivos */
  public validArchivoAdicional: boolean;
  public msgValidArchivoAdicional: string;
  public disabledEnvio: boolean = true;
  public activeRepre: boolean = false;
  public msgvalidfiletitu: string;
  public msgvalidfilerepreacredite: string;
  public msgvalidfilereprearchivo: string;
  public checkedRepre: boolean;
  public validNombres: boolean = false;
  public radioSeleccionado: string = '';
  selectedFiles: FileList;
  selectedFilesRepre: FileList;
  selectedFilesAcrediteRepre: FileList;
  selectedFilesAdicional: FileList;
  currentFileUpload: File;

  constructor(private spinner: NgxSpinnerService, private toastaService:ToastaService, private toastaConfig: ToastaConfig, private guardarFormularioService: GuardarFormularioService){
    this.toastaConfig.theme = 'bootstrap';
    this.titular = new Titular('','','','','','',null,'');
    this.repre = new Representante('','','','',null,null);
    this.validTitular = new ValidTitular(false,false,false,false,false,false,false,false);
    this.validRepresentante = new ValidRepresentante(false,false,false,false,false,false);
    this.checkedRepre = false;
    this.adicionales = new Adicionales('', null);
  }
  
  activeRepresen(){
    console.log('radioSeleccionado: ', this.radioSeleccionado);
    if(this.checkedRepre){
      this.activeRepre=true;
    }else{
      this.activeRepre=false;
    }
  }

  adjuntarDoc(event) {
    this.validTitular.archivoAdjunto= false;
    this.selectedFiles = event.target.files;
    let msgValid: MsgValid = this.validarFile(this.selectedFiles);
    console.log('msgValid.valido:', msgValid.valido);
    if(!msgValid.valido){
      this.msgvalidfiletitu=msgValid.mensage;
      this.validTitular.archivoAdjunto= true;
    }else{
      console.log('valido');
      this.titular.archivoAdjunto = this.selectedFiles.item(0);
    }
  }

  adjuntarDocRepre(event) {
    console.log('adjuntarDocRepre');
    this.validRepresentante.archivoAdjunto=false;
    this.selectedFilesRepre = event.target.files;
    let msgValid: MsgValid = this.validarFile(this.selectedFilesRepre);
    console.log('msgValid.valido:', msgValid.valido);
    console.log('msgValid.msg:', msgValid.mensage);
    if(!msgValid.valido){
      this.msgvalidfilereprearchivo=msgValid.mensage;
      this.validRepresentante.archivoAdjunto= true;
    }else{
      console.log('valido');
      this.repre.archivoAdjunto = this.selectedFilesRepre.item(0);
    }
  }

  adjuntarDocAcrediteRepre(event) {
    this.validRepresentante.archivoAcrediteAdjunto=false;
    this.selectedFilesAcrediteRepre = event.target.files;
    let msgValid: MsgValid = this.validarFile(this.selectedFilesAcrediteRepre);
    console.log('msgValid.valido:', msgValid.valido);
    if(!msgValid.valido){
      this.msgvalidfilerepreacredite=msgValid.mensage;
      this.validRepresentante.archivoAcrediteAdjunto= true;
    }else{
      console.log('valido');
      this.repre.archivoAcrediteAdjunto = this.selectedFilesAcrediteRepre.item(0);
    }
  }

  adjuntarDocAdicional(event){
    this.validArchivoAdicional=false;
    this.selectedFilesAdicional = event.target.files;
    let msgValid: MsgValid = this.validarFile(this.selectedFilesAdicional);
    console.log('msgValid.valido:', msgValid.valido);
    if(!msgValid.valido){
      this.msgValidArchivoAdicional=msgValid.mensage;
      this.validArchivoAdicional= true;
    }else{
      console.log('valido');
      this.adicionales.archivoAdjunto = this.selectedFilesAdicional.item(0);
    }
  }

  onSubmit(){

     if(this.validarFormulario()){
      this.spinner.show();
      this.disabledEnvio=false;
      //if(true){
      console.log('enviar');
      console.log('ischecked:', this.checkedRepre);
      //console.log('file', this.selectedFiles.item(0));
      console.log('file', this.titular.archivoAdjunto);
      //this.repre.archivoAdjunto = this.selectedFilesRepre.item(0);
      //this.repre.archivoAcrediteAdjunto = this.selectedFilesAcrediteRepre.item(0);
      this.guardarFormularioService.guardarFormulario(this.titular, this.repre, this.checkedRepre, this.adicionales).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          //this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.spinner.hide();
          this.toastaService.success('Se ha enviado correctamente la solicitud!.');
          this.disabledEnvio=true;
        }
      })
    }else{
      this.toastaService.error('Completar correctamente los campos!.');
      return false;
    }
    //this.selectedFiles = undefined;
  }

  pressTipoSolicitud(){
    console.log('titular.tipoSolicitud:', this.titular.tipoSolicitud);
    this.validTitular.tipoSolicitud=false;
  }

  validarFormulario(): boolean{

    let valid:boolean = true;
    if(this.titular.nombres==''){
       this.validTitular.nombres=true;
       valid=false;
    }if(this.titular.apellidos==''){
      this.validTitular.apellidos=true;
      valid=false;
    }if(this.titular.email==''){
      this.validTitular.email=true;
      valid=false;
    }if(this.titular.domicilio==''){
      this.validTitular.domicilio=true;
      valid=false;
    }if(this.titular.numdoc==''){
      this.validTitular.numdoc=true;
      valid=false;
    }if(this.titular.tipdoc==''){
      this.validTitular.tipdoc=true;
      valid=false;
    }if(this.titular.archivoAdjunto==null){
      console.log('this.titular.archivoAdjunto: ', this.titular.archivoAdjunto);
      this.validTitular.archivoAdjunto=true;
      this.msgvalidfiletitu='Por favor Adjunte un archivo válido'
      valid=false;
    }
    if(this.titular.tipoSolicitud==''){
      this.validTitular.tipoSolicitud=true;
      valid=false;
    }

    /* Validar campos del representante Legal */
    if(this.checkedRepre){

        if(this.repre.nombres==''){
            this.validRepresentante.nombres=true;
            valid=false;
        }if(this.repre.apellidos==''){
          this.validRepresentante.apellidos=true;
          valid=false;
        }if(this.repre.numdoc==''){
          this.validRepresentante.numdoc=true;
          valid=false;
        }if(this.repre.tipdoc==''){
          this.validRepresentante.tipdoc=true;
          valid=false;
        }
        if(this.repre.archivoAdjunto==null){
          console.log('this.repre.archivoAdjunto: ', this.repre.archivoAdjunto);
          this.validRepresentante.archivoAdjunto=true;
          this.msgvalidfilereprearchivo='Por favor Adjunte un archivo válido'
          valid=false;
        }else{}
        if(this.repre.archivoAcrediteAdjunto==null){
          console.log('this.repre.archivoAcrediteAdjunto: ', this.repre.archivoAcrediteAdjunto);
          this.validRepresentante.archivoAcrediteAdjunto=true;
          this.msgvalidfilerepreacredite='Por favor Adjunte un archivo válido'
          valid=false;
        }

    }

      return valid;
  }

  validarFile(selectedFiles: FileList): MsgValid{

    let msgValid: MsgValid = new MsgValid(true, '');
    let sizeFileBytes = selectedFiles.item(0).size;
    let fileSelectName: string = selectedFiles.item(0).name;
    let indexExtension = fileSelectName.lastIndexOf(".");
    let extension: string = fileSelectName.substring(indexExtension+1);
    console.log('extension: ', extension);
    if(extension=="jpg" || extension=="png" || extension=="pdf"){
      if(sizeFileBytes>=2097152){
        msgValid.mensage='El tamaño del archivo sobre para a los 2MB.';
        msgValid.valido=false;
      }
    }else{
      msgValid.mensage='La extensión del archivo no es valido.';
      msgValid.valido=false;
    }

    return msgValid;
  }

  onKeyInputNombres(){this.validTitular.nombres=false;}
  /*onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}
  onKeyInputNombres(){this.validTitular.nombres=false;}*/

  //(keyup)="onKey(box.value)"

  /*
  this.validTitular.nombres=true;
       valid=false;
    }if(this.titular.apellidos==''){
      this.validTitular.apellidos=true;
      valid=false;
    }if(this.titular.email==''){
      this.validTitular.email=true;
      valid=false;
    }if(this.titular.domicilio==''){
      this.validTitular.domicilio=true;
      valid=false;
    }if(this.titular.numdoc==''){
      this.validTitular.numdoc=true;
      valid=false;
    }if(this.titular.tipdoc==''){
      this.validTitular.tipdoc=true;
      valid=false;
    }if(this.titular.archivoAdjunto==null){
      console.log('this.titular.archivoAdjunto: ', this.titular.archivoAdjunto);
      this.validTitular.archivoAdjunto=true;
      this.msgvalidfiletitu='Por favor Adjunte un archivo válido'
      valid=false;
    }
    if(this.titular.tipoSolicitud==''){
      this.validTitular.tipoSolicitud=true;
      valid=false;
    }

    if(this.checkedRepre){

      if(this.repre.nombres==''){
          this.validRepresentante.nombres=true;
          valid=false;
      }if(this.repre.apellidos==''){
        this.validRepresentante.apellidos=true;
        valid=false;
      }if(this.repre.numdoc==''){
        this.validRepresentante.numdoc=true;
        valid=false;
      }if(this.repre.tipdoc==''){
        this.validRepresentante.tipdoc=true;
        valid=false;
      }
      if(this.repre.archivoAdjunto==null){
        console.log('this.repre.archivoAdjunto: ', this.repre.archivoAdjunto);
        this.validRepresentante.archivoAdjunto=true;
        this.msgvalidfilereprearchivo='Por favor Adjunte un archivo válido'
        valid=false;
      }else{}
      if(this.repre.archivoAcrediteAdjunto==null){
        console.log('this.repre.archivoAcrediteAdjunto: ', this.repre.archivoAcrediteAdjunto);
        this.validRepresentante.archivoAcrediteAdjunto=true;
  
  */


}
