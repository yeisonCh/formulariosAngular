import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm, ValueChangeEvent } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  //importamos FormsModule para tabajar con formularios y desbloquear ngModel
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

private formulario1 = viewChild.required<NgForm>('formulario');
private destruirReferencia = inject(DestroyRef);

constructor() {
  afterNextRender(() => {

    const datoGuardado = window.localStorage.getItem('correo');
    
    if(datoGuardado){
      //JSON.parse obtendremos un objeto de la forma email: value.email
       const datoGuardadoLocal = JSON.parse(datoGuardado);
       const  datoEmailGuardado = datoGuardadoLocal.email;
       //actualizamos el formulario con ese valor optenido con el form que configura angular
        setTimeout(() => {
          //en controls hacemos referencia al name de la etiqueta
        this.formulario1().controls['email'].setValue(datoEmailGuardado);
        }, 10);

       // para actualizar solo un control 
       /* si queremos actualizar todos los datos del formulario 
       this.formulario1().setValue({
        correo: datoEmailGuardado,
        contrasena: ''
       });*/

    }


    //usando pipe y la funcion debounceTime, activa la función solo cuando el usuario deja de escribir por 5000 milisegundos 
   const subscipcion = this.formulario1().valueChanges?.pipe(debounceTime(500)).subscribe({
      next: (value) => localStorage.setItem('correo', JSON.stringify({email: value.email})),
        //console.log(value.email),
    });

    this.destruirReferencia.onDestroy(() => subscipcion?.unsubscribe())
  })
}


  //añadimos el motodo onSubmit que estamos llamando en la plantilla
  onSubmit(datosFormulario: NgForm) {

    if(datosFormulario.form.invalid){
      return; // si el formulario es invalido no se ejecuta el resto del código
    }
    console.log(datosFormulario);
    console.log(datosFormulario.touched);
    console.log('se ha ingresado email '+datosFormulario.controls['email'].touched);
    console.log('se ha ingresado passsword '+datosFormulario.controls['password'].touched);


    console.log(datosFormulario.form.value.email)
    console.log(datosFormulario.form.value.password)
    console.log(datosFormulario.controls['email'].dirty)


    //datosFormulario.reset()  nos permite resetear el formulario o los datos intoducidos en el formulario
    datosFormulario.form.reset();
    
    //para resetear el formulario y dejarlo vacio usando el método setValue
    //setValue nos permite cambiar el valor de los controles del formulario
    //setValue({email: '', password: ''})  nos permite cambiar el valor de los controles del formulario
   /* datosFormulario.setValue({
      email: '',
      password: ''
    });*/

}
    
  
}
