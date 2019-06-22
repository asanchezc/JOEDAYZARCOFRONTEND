import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GuardarFormularioService } from './service/guardar-formulario.service';
import { ToastaModule } from 'ngx-toasta';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OnlyNumber } from './directives/OnlyNumbers';
import { OnlyCaracters } from './directives/OnlyCaracters';
@NgModule({
  declarations: [
    AppComponent,
    OnlyNumber,
    OnlyCaracters
  ],
  imports: [
    BrowserModule,
    ToastaModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [GuardarFormularioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
