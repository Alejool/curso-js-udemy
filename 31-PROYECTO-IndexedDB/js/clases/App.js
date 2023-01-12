import {datosCita, nuevaCita} from '../funciones.js';
import {
  mascotaInput,
  propietarioInput, 
  telefonoInput, 
  horaInput, 
  fechaInput, 
  sintomasInput, 
  formulario} from '../selectores.js'


class App {
  constructor (){
    this.initApp();
  }
  initApp(){
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);

  }
}

export default App;