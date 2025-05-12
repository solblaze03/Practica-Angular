import { ValidationErrors, AbstractControl } from "@angular/forms";


export function isBlank(control: AbstractControl) : ValidationErrors |null{

    const valor = control.value;

    
    if(typeof valor === 'string' && valor.trim().length === 0){
        return { isBlank: true }
    }
    return null
}