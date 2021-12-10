const root = document.getElementById("root");

for(let i=0; i<data["Books"].length; i++)
{
    let html = `<div class="col-md-3 col-12 border" onClick="navigate(event)">
    <div class="row">
        <div class="col" style="text-align: center;">
            <img class="thumb" src=${data["Books"][i]["url"]}>
        </div>
    </div>
    <div class="row">
        <div class="col name">${data["Books"][i]["id"]}</div>
    </div>
    <div class="row">
        <div class="col author">
            <span>Author: <b>${data["Books"][i]["Author"]}</b></span>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <span>Genre: <b>${data["Books"][i]["Genre"]}</b></span>
        </div>
    </div>
    <div  id="${data["Books"][i]["id"]}" class="row mask">
        <div class="col-md-3 col-12"></div>
    </div>
</div>`
    root.insertAdjacentHTML('beforeend',html);
}
function navigate(event){
    location.href = "view.html?url="+event.target.id;
}