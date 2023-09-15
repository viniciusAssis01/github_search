function trocaPagina(){
    const button = document.querySelector(".button-quartError")
    button.addEventListener("click", (event)=>{
        event.preventDefault(); // usar só qndo a tag BUTTON está dentro da TAG FORM
        window.location.replace("../../../index.html")
    })
}
trocaPagina()