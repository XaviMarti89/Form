//   Initialize Firebase (ADD YOUR OWN DATA)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL: "https://proyecto-am-67bee-default-rtdb.europe-west1.firebasedatabase.app/"
}

//CREAR VARIABLES
const app = initializeApp(appSettings);
const database = getDatabase(app);
const profileInDB = ref(database,"profile") 

//REFERENCIAS HTML
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button")
const profileEl= document.getElementById("perfiles")


onValue(profileInDB, function(snapshot){

  if(snapshot.exists()){
    clearprofileEl();
  let listArray = Object.entries(snapshot.val());
  for(let count = 0; count < listArray.length; count++){
      let currentItem = listArray[count];
      appendItemToprofileEl(listArray[count]);
  }}
  else{
     profileEl.innerHTML = "Not items yet.."
  }
})


addButtonEl.addEventListener('click', function(){
  
  var nombre = document.getElementById("nombre").value
  var trabajo = document.getElementById("trabajo").value
  var correo = document.getElementById("correo").value
  var telefono = document.getElementById("telefono").value
  var mensaje = document.getElementById("mensaje").value

  const valores = {
    nombre: nombre,
    trabajo:trabajo,
    correo: correo,
    num: telefono,
    mensaje: mensaje
  }

  console.log(valores)
  push(profileInDB, valores)

  clearInputFieldEl();

})


/*BORRA EL VALOR DE INPUT
function clearInputFieldEl(){
  document.getElementById("nombre").value= ""
  document.getElementById("trabajo").value=""
  document.getElementById("correo").value=""
  document.getElementById("telefono").value=""
  document.getElementById("mensaje").value=""
}*/
//BORRA EL VALOR DE INPUT
function clearInputFieldEl(){
  inputFieldEl.value = "";
}
//VERIFICAR LOS PERFIELS
function clearprofileEl(){
  profileEl.innerHTML = "";
}
//Agregarlo al html 
function appendItemToprofileEl(item){
  
  
  let itemValue = item[1];
  let itemID = item[0];


  let htmlEL = document.createElement("li")
  htmlEL.textContent = itemValue.nombre;

  htmlEL.addEventListener("click", function(){
    let exactLocationOfItemDB = ref(database, `perfiles/${itemID}`)
    remove(exactLocationOfItemDB)
    alert("hecho ?")

  
      
  })
  profileEl.append(htmlEL);
}
function showvalues(){
  
  let valores= document.createElement(" extra")

}
