//1º) essa função a gente cria o evento de clique no bottao da pagina home. na callback a gente passa a função pegarusuarioGit
function pesquisaNoInput(){
    const button = document.querySelector(".button-primary")

    button.addEventListener("click", async function(event){
        event.preventDefault();
        const inputBarraDePesquisa= document.querySelector("#username");
        await pegaUsuarioGit(inputBarraDePesquisa.value)
    })
}
pesquisaNoInput()

//2º) vamos criar a função pegarUsuarioGit
export async function pegaUsuarioGit (usuarioGitHub) {
    const usuario =  await fetch(`https://api.github.com/users/${usuarioGitHub}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },}).then(function (response){
        if(response.ok){
            return response.json()
        }else{
            return null
        }
    })
    //meio q sempre temos q fazer esses 2 if else para colocar a resposta no localStorage.
    if(usuario == null){
        window.location.replace("./src/pages/erro/error.html")
        //se a variavel usuario retornar null, leve para a pagina de erro.
    }else{
        //console.log(usuario)
        localStorage.setItem("usuario_Github", JSON.stringify(usuario))
        window.location.replace("../../src/pages/profile/profile.html")
        //fazendo esse JSON.strigify:   transforma o usuario (uma variavel cujo valor é um objeto) em JSON e depois transforma em string.  entao estamos criando uma chave(propriedade) no localStorage cujo valor vai ser uma string.
    }
}




/* export async function pegaUsuarioGit (usuarioGitHub) {
    const usuario =  await fetch(`https://api.github.com/users/${usuarioGitHub}`, {method: "GET",headers: {"content-type": "application/json",},}).then(response => console.log(response))
    //const usuarioJson= await usuario.json()
    //.then(response => response.json())
    
    //console.log(usuario)
    //console.log(usuarioJson)
    return usuario
    //ou seja, vai retornar a resposta da URL no formato JSON.
}
pegaUsuarioGit("fadsfdasçfljkadsçfkjsadf") */