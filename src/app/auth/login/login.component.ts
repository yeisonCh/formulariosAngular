<<<<<<< HEAD
import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm, ValueChangeEvent } from '@angular/forms';
import { debounceTime } from 'rxjs';
=======
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

//funcion validadora
function validadorCorreo(control: AbstractControl){

  if(control.value.includes('?')){
    return null;
  }

  return { noContieneSignoDeInterrogacion: true}
}

//funcion validadora asincrona
function correoEsUnico(control: AbstractControl) {
  if(control.value !== "test@ejemplo.com"){
    return of(null); //of nos devuelve un observable y se debe importar desde rxjs
  }

  return of({noEsUnico: true})
}
let valorInicialCorreo= '';
const inicioGuardado = window.localStorage.getItem('guardar-inicio');

if(inicioGuardado){
  const textoRescatado= JSON.parse(inicioGuardado);
  valorInicialCorreo = textoRescatado.email;
}


>>>>>>> c584fb5 (validación de formulario en password)

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
<<<<<<< HEAD
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
=======
>>>>>>> c584fb5 (validación de formulario en password)

//vamos a crear formularios reactivos los cuales se inicializan en el typescript
export class LoginComponent implements OnInit{

  private destruirReferencia = inject(DestroyRef);
  //creamos una nueva pripiedad a la cual debe ser de tipo FormGroup y esta recibe un objeto
  miFormulario = new FormGroup({
    //al crear estos metodos estos pueden recibir dos parametros uno seria el valor inicial y el segundo un objeto para realizar validadciones
      correo: new FormControl(valorInicialCorreo,{
      validators:[Validators.email, Validators.required],
      asyncValidators:[correoEsUnico] //llamamos a nuestra funciòn asincrona para saber si el correo es unico

    }), //le podemos asignar un valor vacio si lo deseamos 
    contrasena: new FormControl('',{
      validators:[Validators.required, Validators.minLength(6), validadorCorreo]
    })

  });

  get correoEsValido() {
    return (
        this. miFormulario.controls.correo.touched 
            && this.miFormulario.controls.correo.dirty 
            && this.miFormulario.controls.correo.invalid
    ) 
  }
 
  get contrasenaEsValido() {
    return (this. miFormulario.controls.contrasena.touched 
    && this.miFormulario.controls.contrasena.dirty 
    && this.miFormulario.controls.contrasena.invalid)
  }

 ngOnInit(){

    // rescatamos en una variable el valor almacenado en el localStorage de la vntana 
   // const inicioGuardado = window.localStorage.getItem('guardar-inicio');
    //establecemos el valor que hemos rescatado en control que necesitamos 

    if(inicioGuardado) {
      const textoRescatado= JSON.parse(inicioGuardado);
      //el metodo patchValue lo usamos si queremos actualizar algo en particular y no todo el componente, y este metodo recibe un objeto
      this.miFormulario.patchValue({
        //email hace referencia al id del input o objeto que queremos afectar
        correo: textoRescatado.email,
      });
    }
<<<<<<< HEAD
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
=======

    const suscribcion =  this.miFormulario.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'guardar-inicio',
          JSON.stringify({email: value.correo})
        )
      }
    })

    this.destruirReferencia.onDestroy(() => suscribcion.unsubscribe());
  }
  
 
   
  onSubmit() {
    console.log(this.miFormulario);
    const correoTexto = this.miFormulario.value.correo;

    console.log('Correo ingresado: ' + correoTexto)
    console.log('el valor ingresado enc ontraseña es: ' + this.miFormulario.controls.contrasena.value)
    console.log(this.miFormulario.controls.correo.invalid)
    console.log(this.miFormulario.controls.contrasena.invalid)
>>>>>>> c584fb5 (validación de formulario en password)
    
 



}
