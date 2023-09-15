//pegar os dados do localStorage, para podermos usar esse "database"
//transforma a stringfy do local storage em objeto (em JSON)
const UsuarioGitHub = JSON.parse(localStorage.getItem("usuario_Github"))
console.log(UsuarioGitHub)


async function renderizaCardUsuario(objeto){
    const header= document.querySelector("header");
    header.innerHTML= " "
    //const img= document.querySelector("img")
    const card= cardUsuario(objeto)
    header.append(card)


    const button = document.querySelector(".button-secundaryHeader")
    button.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("../../../index.html")
    })
}

function cardUsuario(usuario){
    const div= document.createElement("div");
    const containerProfileDescription= document.createElement("div");
    const figureProfile = document.createElement("figure");
    const imgProfile = document.createElement("img");
    const pProfile= document.createElement("p");

    const buttonNovousuario= document.createElement("button")
    const redirecionar= document.createElement("a")

    div.classList.add("container__header")
    containerProfileDescription.classList.add("container__profileDescription")
    imgProfile.src= usuario.avatar_url
    imgProfile.alt= usuario.name
    pProfile.classList.add("title-usuario")

    buttonNovousuario.classList.add("button-secundaryHeader")
    redirecionar.classList.add("button_a")
    redirecionar.href="../../../index.html"

    pProfile.innerText=usuario.name
    buttonNovousuario.innerText= "Trocar de usuario"

    figureProfile.appendChild(imgProfile)
    containerProfileDescription.append(figureProfile, pProfile)
    buttonNovousuario.appendChild(redirecionar)
    div.append(containerProfileDescription, buttonNovousuario)

    return div
}

async function renderizaCardRepositorio(array){
    const lista_container=document.querySelector("ul");

    lista_container.innerHTML=" ";

    array.forEach( repositorio =>{
        const cardRepositorios= cardRepositorio(repositorio)
        lista_container.appendChild(cardRepositorios)
    });
}
function cardRepositorio(repositorio){
    const Li= document.createElement("li")
    const title_li= document.createElement("h2")
    const text_li=document.createElement("p")
    const button_li= document.createElement("button");
    const a_buttonLi= document.createElement("a");

    title_li.classList.add("title-li")
    title_li.innerText= repositorio.name;
    text_li.classList.add("text-li");
    text_li.innerText= repositorio.description;
    button_li.classList.add("button-terceryCard", "button-terceryHover")
    button_li.innerText="Repositorio"
    a_buttonLi.classList.add("button_a");

    button_li.append(a_buttonLi)
    Li.append(title_li, text_li, button_li)

    //console.log(repositorio);
    return Li;

}

//essa função pega o repositorio do usuario.
async function pegaRepositorio(usuarioGitHub){
    //esse fetch funciona meio q o  arq "dataBase.js"
    const repositorio= await fetch(`https://api.github.com/users/${usuarioGitHub.login}/repos`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return null;
            }
          });
          if(repositorio){
            //console.log(repositorio)
            renderizaCardRepositorio(repositorio)
          }
}
pegaRepositorio(UsuarioGitHub)
//essa função deve retornar um array de objetos

renderizaCardUsuario(UsuarioGitHub)



/*
percebi uma ordem de criação
1º)criar as funções cards
2º)criar a função de requisição (aqla q tem o FETCH)
3º)criar a renderização 
*/