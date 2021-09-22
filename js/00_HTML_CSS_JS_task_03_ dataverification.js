// 表单提交校验
function submitForm() {
    // 必填
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
                    delayPrompt("数据项 " + item.name + "(" + item.id + ")” 必填校验不通过");
                    return false;
                }
            } else if (document.getElementsByName(item.name + "(" + item.id + ")")[0].value.length == 0) {
                document.getElementById(item.id + "_form").style.backgroundColor = "rgba(255,0,0,.1)";
                document.getElementById(item.id + "_fBody").onfocus = function() {
                    document.getElementById(item.id + "_form").style.backgroundColor = "";
                };
                delayPrompt("数据项 “" + item.name + "(" + item.id + ")” 必填校验不通过");
                // alert("数据项 “" + item.name + "(" + item.id + ")” 必填校验不通过");
                return false;
            }
        } else {
            continue;
        }
    }

    // 正则
    for (const regularCheck in checkRules[0]) {
        if (checkRules[0][regularCheck].expression.length != 0) {
            const item = document.getElementById(regularCheck + "_fBody");
            const pattern = new RegExp(checkRules[0][regularCheck].expression);
            const regularCheckValue = item.value;
            console.log(pattern);
            console.log(regularCheckValue)
            console.log(pattern.test(regularCheckValue));
            if (!pattern.test(regularCheckValue)) {
                delayPrompt(checkRules[0][regularCheck].tips)
                return false;
            }
        }
    }

    // 提交
    for (const submitVeri in checkRules[1]) {
        if (checkRules[1][submitVeri].beginValue.length != 0) {
            const item = document.getElementById(submitVeri + "_fBody");
            const submitVeriValue = item.value;
            let beginValue, endValue;
            if (checkRules[1][submitVeri].template == "1") {
                beginValue = checkRules[1][submitVeri].beginValue;
                endValue = checkRules[1][submitVeri].endValue;
            } else {
                beginValue = document.getElementById(checkRules[1][submitVeri].beginValue).value;
                endValue = document.getElementById(checkRules[1][submitVeri].endValue).value;
            }

            switch (checkRules[1][submitVeri].relationship) {
                case "1":
                    if (beginValue.length != 0 && submitVeriValue != beginValue) {
                        delayPrompt(checkRules[1][submitVeri].tips)
                        return false;
                    }
                    break;
                case "2":
                    if (beginValue.length != 0 && submitVeriValue <= beginValue) {
                        delayPrompt(checkRules[1][submitVeri].tips)
                        return false;
                    }
                    break;
                case "3":
                    if (beginValue.length != 0 && submitVeriValue >= beginValue) {
                        delayPrompt(checkRules[1][submitVeri].tips)
                        return false;
                    }
                    break;
                case "4":
                    if (beginValue.length != 0 && submitVeriValue < beginValue) {
                        delayPrompt(checkRules[1][submitVeri].tips)
                        return false;
                    }
                    break;
                case "5":
                    if (beginValue.length != 0 && submitVeriValue > beginValue) {
                        delayPrompt(checkRules[1][submitVeri].tips)
                        return false;
                    }
                    break;
                case "6":
                    if ((beginValue.length != 0 && submitVeriValue < beginValue) || (endValue.length != 0 && submitVeriValue > endValue)) {
                        delayPrompt(checkRules[1][submitVeri].tips)
                        return false;
                    }
                    break;
            }
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

function delayPrompt(text) {
    let timer = null;
    const Prompt = document.getElementById("requVeriProm");

    clearTimeout(timer);
    Prompt.style.display = "block";
    document.getElementById("requVeriProm_text").innerHTML = text;
    timer = setTimeout(function() {
        Prompt.style.display = "none";
    }, 2500);

}

// function getLocation() {
//     let address = "广东省深圳市南山区";
//     return address;
// }