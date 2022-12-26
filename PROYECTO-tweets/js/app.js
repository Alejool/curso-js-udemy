// variables 
const formulario=document.querySelector('#formulario');
const listaTweets=document.querySelector('#lista-tweets');
let tweets=[];
const tweet=document.querySelector('#tweet');


// event listener
evenlisteners();
function evenlisteners(){
  //agregarTweets
  formulario.addEventListener('submit',agregarTweets);
  

  //localStorage
  document.addEventListener('DOMContentLoaded', ()=>{
    tweets=JSON.parse(localStorage.getItem('tweets'))|| [];
    agregar();
  })
}

// funciones
function agregarTweets(e){
  e.preventDefault();
    const tweett= tweet.value.trim();
  if(tweett!== ''){

    // objeto para identificar cada tweet 
    const objectTweet={
      id: Date.now(),
      tweet:tweett
    }

    // arreglar al arreglo
    tweets=[objectTweet, ...tweets]
    console.log(tweets)

    agregar(tweett);
    formulario.reset();
    return;
  }

  error(tweett);

}

function error(){
  const errorT=document.createElement('P');
  errorT.textContent='El tweet no puede estar vacio, no intentes trolear';
  errorT.classList.add('error');
  formulario.appendChild(errorT);

  setTimeout(()=>{
    errorT.remove();
  },5000);
}


function agregar(){
  vaciarTweet();
  
if(tweets.length>0){
  tweets.forEach(tweet=>{

    const btnEliminar=document.createElement('A');
    btnEliminar.classList.add('borrar-tweet');
    btnEliminar.textContent='Eliminar';

    // eliminar de la lista
    btnEliminar.onclick=()=>{
      eliminar(tweet.id);
    }

    const agregado=document.createElement('LI');
    agregado.classList.add('lista')
    agregado.textContent=tweet.tweet;
    agregado.appendChild(btnEliminar)
    listaTweets.appendChild(agregado);
  })
}
savedlocalStare();
  
}


function vaciarTweet(){
 while(listaTweets.firstChild){
  listaTweets.removeChild(listaTweets.firstChild)
 }
}

function  savedlocalStare(){
  localStorage.setItem('tweets',JSON.stringify(tweets))
}


//eliminar el tweet

function eliminar(id){
  tweets=tweets.filter((tweet)=> tweet.id!==id)
  console.log(tweets);
  agregar();
 
}