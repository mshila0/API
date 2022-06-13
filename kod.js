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
        const response = await fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${input.value}&from=0&to=30`);
        data = await response.json();
        spinner.style.display = "none";
        searchButton.disabled = false;
        render();
    })
});

function render(){
    const list = document.getElementById("list");
    const calories = document.getElementById("calories");
    let result = "";
    let now_cal = 0;
    let max_cal = calories.value == 0 ? 5000 : calories.value
    let dt_index = document.getElementById('mySelect').selectedIndex;
    let dt_options = document.getElementById('mySelect').options;
    let ct_index = document.getElementById('SecondSelect').selectedIndex;
    let ct_options = document.getElementById('SecondSelect').options;
    for (let item of data.hits){
        now_cal = item.recipe.calories
        if (Number(now_cal) <= max_cal && (dt_options[dt_index].value === 'none' ||
            item.recipe.dishType.includes(dt_options[dt_index].value)) &&
            (ct_options[ct_index].value === 'none' ||
            item.recipe.cuisineType.includes(ct_options[ct_index].value))) {

            result += `<li>
            <br/><h2>${item.recipe.label}</h2><br/>
            <img src="${item.recipe.image}" ></br>
            <br/><i> ${item.recipe.ingredientLines.join('<br>')}</i></br>
            <br/>${item.recipe.calories}</br>
            </li>`;
        }
    }
    list.innerHTML = result
}
