let data;
document.addEventListener("DOMContentLoaded", ()=>{
    const spinner = document.getElementById("spinner");
    const search = document.getElementById("search");
    const form = document.getElementById("form");
    form.addEventListener("submit", async e => {
        spinner.style.display = "inline";
        e.preventDefault();
        const input = document.getElementById("input");
        const response = await fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${input.value}`);
        data = await response.json();
        render();
    })
});

function render(){
    const list = document.getElementById("list");
    let result = "";

    for (let item of data.hits){
        result += `<li>
            <b>${item.recipe.label}</b>
            <i> </i>
            </li>`;
    }

    list.innerHTML = result
}