document.addEventListener("DOMContentLoaded", function(){ //Cuando el documento html carga se ejecuta todo el script.js
    let datos = []; //Arreglo de beneficiarios
    let datosFilter = []; //Arreglo de beneficiarios filtrados
    const enviar = document.getElementById("enviar"); //Se captura enviar
    const boton = document.getElementById("boton"); //Se captura boton de filtro
    const resultados = document.getElementById("resultados"); //Se captura el elemento en donde irán los filtros

    if(localStorage.getItem("database")){ //Si existe esta clave en localStorage se procede a cargar los datos en el arreglo de beneficiarios
        datos = JSON.parse(localStorage.getItem("database"));
    }
    printResults(datos); //Se imprimen los beneficiarios pasandole el arreglo que contiene los datos que desea imprimir
    
    enviar.addEventListener("click", function(e){ //Se registra evento de tipo click al boton enviar
        e.preventDefault();

        //Se capturan el valor de los campos del formulario
        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const ingresos = document.getElementById("ingresos").value;
        const familia = document.getElementById("familia").value;

        //Se crea un objeto en base a los valores de los campos
        const usuario = {nombre, edad, ingresos, familia}
        datos.push(usuario); //Se añade el formulario al arreglo de beneficiarios
        
        localStorage.setItem("database", JSON.stringify(datos)); //Se guarda el arreglo en el localStorage para que persistan los datos, incluso cuando se cierre el navegador
        printResults(datos); //Se imprime el arreglo de beneficiarios
    });

    boton.addEventListener("click", function(e){ //Se registra evento al boton de filtrado
        if(e.target.textContent == "Menores de $200"){ 
            datosFilter = datos.filter(user => user.ingresos < 200); //Se filtran los beneficiarios con ingresos menores a 200
            printResults(datosFilter); //Se imprime el arreglo filtrado

            e.target.textContent = "Ver todos";
        } else if (e.target.textContent == "Ver todos"){
            printResults(datos); //Se imprime todos los benefeciarios si el boton dice "Ver todos"

            e.target.textContent = "Menores de $200"; //Regresa el boton a su contenido original
        }
        
    });

    function printResults(data){ 
        //Para imprimir los resultados, primero se debe pasar un arreglo que contiene los datos a imprimir.
        //Después se recorrera este arreglo esto con el fin de obtener los datos de cada beneficiario para agregarlo a una estructura HTML, la cuál será la estructura de este beneficiario en la página y así poder visualizarlo
        resultados.innerHTML = "";//Se limpia el contenedor en donde se imprimen para realizar nuevamente el proceso sin repetir información anterior
        data.forEach((usuario, index) => {
            let content = `<div class="resultados__elemento">
                    <h4>${index+1}.</h4>
                    <p>${usuario.nombre}</p>
                    <p>${usuario.edad}</p>
                    <p>${usuario.ingresos}</p>
                    <p>${usuario.familia}</p>
                    </div>` //Se crea estructura en base a los datos del beneficiario
            resultados.innerHTML += content; //Se acumula esta estructura más las que se encuentrán dentro del contenedor, de esta manerá se imprimirá cada estructura del benefeciario
        });
        
    }
});