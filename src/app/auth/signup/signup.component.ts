import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


//******************* FUNCIONES PARA VALIDAR ***************************

function valoresIguales() {

  return (control: AbstractControl) => {
    const contrasenia = control.get('contrasena')?.value; // ? nos indica que puede ser null, pero que si no es null nos devuelva el valor
  const confirmacionContrasenia = control.get('confirmContrasena')?.value; 

  if(contrasenia === confirmacionContrasenia){
    return null;
  }

  return { contrasenasDiferentes: true};
  }
  


}

// *****************************************************************

@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {


//creamos la referencia al formulario de html 
  miformulario = new FormGroup({

    //hacemos la referencia a los input de html
    correo: new FormControl('', {
      validators:[Validators.email, Validators.required],
    }),

    contrasena: new FormGroup({
        
        contrasena: new FormControl('', {
          validators:[Validators.required, Validators.minLength(6)],
        }),
        confirmContrasena: new FormControl('', {
          validators:[Validators.required, Validators.minLength(6)],
        }),
    }, {

     validators:[ valoresIguales ]
    }), 

    primerNombre: new FormControl('', { validators:[Validators.required,] }),
    segundoNombre: new FormControl('', { validators:[Validators.required,] }), 
    
    direccion: new FormGroup({
        
        calle: new FormControl('', { validators:[Validators.required,] }), 
        numCalle: new FormControl('', { validators:[Validators.required,] }), 
        codPostal: new FormControl('', { validators:[Validators.required,] }), 
        ciudad: new FormControl('', { validators:[Validators.required,] }), 

    }),

    origen: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    
    rol: new FormControl<'student' | 'teacher'|'employee' |'founder' |'other' >('student',{ validators:[Validators.required,] }), // dentro de < > pasamos los valores posibles que puede recibir esta referencia
    casillaVerificacion: new FormControl(false, { validators:[Validators.required,] })


  })

  arrayDeDatos: any[]=[];

onSubmit() {
  
  const datosRecuperados = this.miformulario.value;
  this.arrayDeDatos.push(datosRecuperados);
  console.log(this.miformulario);
  console.log('la representación de los dtos recuepewrados en un objeto')
  console.log(datosRecuperados)
  console.log('la representación de los dtos recuepewrados en un ARRAY')
  console.log(this.arrayDeDatos)

  
}



}
