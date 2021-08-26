function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {


    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    var div1 = document.createElement("div");
    div1.id = "new_div";
    div1.style.display = "inline-block";
    div1.style.width = "100%";
    var div2 = document.createElement("div");
    div2.style.display = "inline-block";
    div2.innerText = "单行文本："
    var input = document.createElement("input");
    input.style.display = "inline";
    div1.appendChild(div2);
    div1.appendChild(input);
    ev.target.appendChild(div1);
}