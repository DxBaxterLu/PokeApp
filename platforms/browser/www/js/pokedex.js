function consultar() {
    nombre = $('#txtNombre').val();

    dirpokemons = "https://pokeapi.co/api/v2/pokemon/";

    dir = "https://pokeapi.co/api/v2/type/" + nombre
    
    $.ajax({
        url: dir,
        error: function (err) {
            alert("El tipo de pokemon no existe");
            console.log(err);
        },

        beforeSend: function(){
            $('#divCargando').show();
        }

    }).done(function(data)
    {

        $('#divCargando').hide();
        console.log('Iniciar la busqueda');
        const api = new XMLHttpRequest();

        api.open('GET', dir, true)
        api.send();
        api.onreadystatechange = function(){

            if(this.readyState == 4 && this.status==200){

                let datos = JSON.parse(this.responseText);
                console.log(datos.pokemon);
                let resultado = document.querySelector('#resultado')
                resultado.innerHTML = '';

                for(let item of datos.pokemon){

                    console.log(item.name)
                    const api2 = new XMLHttpRequest();
                    let newURL = dirpokemons+item.pokemon.name;
                    api2.open('GET', newURL, true);
                    api2.send();

                    api2.onreadystatechange = function(){

                        if (this.readyState == 4 && this.status == 200){

                            let data = JSON.parse(this.responseText);
                            console.log(data.name);
                            resultado.innerHTML += `<a><h4>${(item.pokemon.name)}</h4></a><a><img src="${data.sprites.front_default}"/></a><a><h6>+Peso: ${(data.weight)}</h6></a><a><h6>+Exp: ${(data.base_experience)}</h6></a>`;
                        }
                    }
                }
            }
        }


    });

}
