let data;
document.addEventListener("DOMContentLoaded", ()=>{
    const spinner = document.getElementById("spinner");
    const searchButton = document.getElementById("search");
    const form = document.getElementById("form");
    const myList = document.getElementById("list");
    form.addEventListener("submit", async e => {
        myList.innerHTML = '';
        spinner.style.display = "inline";
        searchButton.disabled = true;
        e.preventDefault();
        const input = document.getElementById("input");
        const response = await fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${input.value}&from=0&to=15`);
        data = await response.json();
        spinner.style.display = "none";
        searchButton.disabled = false;
        render();
    })
});

function render(){
    const list = document.getElementById("list");
    let result = "";

    for (let item of data.hits){
        result += `<li>
            <br/><b>${item.recipe.label}</b><br/>
            <img src="${item.recipe.image}" ></br>
            <br/><i> ${item.recipe.ingredientLines.join('<br>')}</i></br>
            </li>`;
    }
    list.innerHTML = result
}
