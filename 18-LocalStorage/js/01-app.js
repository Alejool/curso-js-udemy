localStorage.setItem('nombre', 'Alejandro');
localStorage.setItem('apellido', 'bosque');
localStorage.setItem('cc', 10002);
localStorage.getItem('cc'); 
localStorage.getItem('apellido');

localStorage.clear(); //limpiar el local storage

//almacenar objetos y arreglos (JSON.STRINGIFY)

const productos={
  nombre: 'luis',
  apellido: 'days',
  dinero: 120,
  edad:19
}

localStorage.setItem('ObjectProducto', JSON.stringify(productos))

const productos2=[
  1,2,3,4,5,6,7,8,9,10
]
localStorage.setItem('arrayProducto', JSON.stringify(productos2))



//accedemos
console.log(localStorage.getItem('ObjectProducto')); 
console.log(localStorage.getItem('arrayProducto')); 

//convertir string a object de nuevo y array
const object=JSON.parse(localStorage.getItem('ObjectProducto'))
console.log(object);
const array=JSON.parse(localStorage.getItem('arrayProducto'))
console.log(array);



//eliminar
localStorage.removeItem('ObjectProducto')
