
const datosSearch={
  marca:'',
  year:'',
  precioMin:'',
  precioMax:'',
  puertas:'',
  color:'',
  transmision:''
}
//variables
const max= new Date().getFullYear();
const min= max-8; //tiempo

const year=document.querySelector('#year');
const marca=document.querySelector('#marca');
const precioMin=document.querySelector('#minimo');
const precioMax=document.querySelector('#maximo');
const puertas=document.querySelector('#puertas');
const color=document.querySelector('#color');
const transmision=document.querySelector('#transmision');

const busqueda=document.querySelector('#resultado');

//eventos para los selects
marca.addEventListener('change', (e)=>{
 datosSearch.marca=e.target.value;
 filtrarAuto();
});

year.addEventListener('change', e=>{
  datosSearch.year=e.target.value;
  filtrarAuto();
})
precioMin.addEventListener('change',e=>{
  datosSearch.precioMin=e.target.value;
  filtrarAuto();
})
precioMax.addEventListener('change',e=>{
  datosSearch.precioMax=e.target.value;
  filtrarAuto();
})
puertas.addEventListener('change',e=>{
  datosSearch.puertas=e.target.value;
  filtrarAuto();
})
color.addEventListener('change',e=>{
  datosSearch.color=e.target.value;
  filtrarAuto();
})
transmision.addEventListener('change',e=>{
  datosSearch.transmision=e.target.value;
  filtrarAuto();
})


//objeto para buscar

//eventos
document.addEventListener('DOMContentLoaded',()=>{
  cargarAutos(autos);
  llenarYears();
  
});


function cargarAutos(autos){
  limpiarHtml();
  autos.forEach(auto => {

  const{ marca,modelo, year, precio, puertas,color, transmision }=auto;
  
  const htmlAuto=document.createElement('P');
  htmlAuto.classList.add('nuevo-auto')
  htmlAuto.textContent=`MARCA:
  ${marca} ---   MODELO: ${modelo} ---  YEAR: ${year} ---PRECIO:  ${precio} ---   PUERTAS: ${puertas} ---  COLOR:${color} ---  TRASMISIÓN: ${transmision} 
  `;
    busqueda.append(htmlAuto);
  });
}

function limpiarHtml(){
  while(busqueda.firstChild){
    busqueda.removeChild(resultado.firstChild)
  }

}


function  llenarYears(){
  for(let i=max; i>=min;i--){
    const options= document.createElement('OPTION');
    options.value=i;
    options.textContent=i;
    year.append(options)

  }
}



function filtrarAuto(){
  const resultado=autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMin).filter(filtrarPrecioMax).filter(filtrarPuertas).filter(filtrarColor).filter(filtrarTrasmision)
 

  if(resultado.length){
    cargarAutos(resultado)
  }else {  limpiarHtml();
    sinResultados();}
 
}
 function sinResultados(){
  const noResult=document.createElement('P');
  noResult.classList.add('error')
  noResult.textContent='No hay resultados de tu busqueda';
  busqueda.appendChild(noResult);

 }
 function filtrarMarca(auto){
  
  const {marca}=datosSearch;
   if(marca){
    return auto.marca===marca;
   }
   return auto;
}


 function filtrarYear(auto){
  
  const {year}=datosSearch;
   if(year){
    return auto.year===parseInt(year);
   }
   return auto;}


 function filtrarPrecioMin(auto){
  
  const {precioMin, precioMax}=datosSearch;
   if(precioMin){
    return auto.precio>=precioMin ;
   }
   return auto;
}
 function filtrarPrecioMax(auto){
  
  const {precioMax}=datosSearch;
   if(precioMin, precioMax){
    return auto.precio<=precioMax ;
   }
   return auto;
}
function filtrarPuertas(auto){
  const {puertas}=datosSearch;
  if(puertas){
   return auto.puertas===parseInt(puertas);
  }
  return auto;
}
function filtrarColor(auto){
  const {color}=datosSearch;
  if(color){
   return auto.color===color;
  }
  return auto;
}
function filtrarTrasmision(auto){
  const {transmision}=datosSearch;
  if(transmision){
   return auto.transmision===transmision;
  }
  return auto;
}


