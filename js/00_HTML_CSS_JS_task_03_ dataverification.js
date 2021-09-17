// 延时提示框对象
let Prompt;

// 表单提交校验——必填
function submitForm() {
    let timer = null;
    for (const item of itemsData) {
        if (item.attr.required) {
            if (item.type == "checkbox" || item.type == "radio") {
                if (!requiredVeri(item.name + "(" + item.id + ")")) {
                    document.getElementById(item.id + "_form").style.backgroundColor = "rgba(255,0,0,.1)";
                    for (const option of document.getElementsByName(item.name + "(" + item.id + ")")) {
                        option.onclick = function() {
                            document.getElementById(item.id + "_form").style.backgroundColor = "";
                        };
                    }
                    clearTimeout(timer);
                    Prompt.style.display = "block";
                    document.getElementsByClassName("requVeriProm_text")[0].innerHTML = "数据项 “" + item.name + "(" + item.id + ")” 必填校验不通过";
                    timer = setTimeout(function() {
                        Prompt.style.display = "none";
                    }, 2500);
                    // alert("数据项 “" + item.name + "(" + item.id + ")” 必填校验不通过");
                    return false;
                }
            } else if (document.getElementsByName(item.name + "(" + item.id + ")")[0].value.length == 0) {
                document.getElementById(item.id + "_form").style.backgroundColor = "rgba(255,0,0,.1)";
                document.getElementById(item.id + "_fBody").onfocus = function() {
                    document.getElementById(item.id + "_form").style.backgroundColor = "";
                };
                clearTimeout(timer);
                Prompt.style.display = "block";
                document.getElementsByClassName("requVeriProm_text")[0].innerHTML = "数据项 “" + item.name + "(" + item.id + ")” 必填校验不通过";
                timer = setTimeout(function() {
                    Prompt.style.display = "none";
                }, 2500);
                // alert("数据项 “" + item.name + "(" + item.id + ")” 必填校验不通过");
                return false;
            }
        } else {
            continue;
        }
    }
    return true;
}
// 单选框、复选框必填校验
function requiredVeri(name) {
    const options = document.getElementsByName(name);
    for (const option of options) {
        if (option.checked) {
            return true;
        }
    }
    return false;
}