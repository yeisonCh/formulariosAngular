import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  //importamos FormsModule para tabajar con formularios y desbloquear ngModel
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //añadimos el motodo onSubmit que estamos llamando en la plantilla
  onSubmit(datosFormulario: NgForm) {

    if(datosFormulario.form.invalid){
      return;
    }
    console.log(datosFormulario);
    console.log(datosFormulario.form.value.email)
    console.log(datosFormulario.form.value.password)

    
  }



}
