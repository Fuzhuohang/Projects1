var buttons;
var formula;
var result;

window.onload = function() {
    buttons = document.getElementsByTagName('BUTTON');
    formula = document.getElementById('formula');
    result = document.getElementById('result');
    var num1 = "",
        num2 = "",
        num3 = "",
        res = "";
    var sym = 1,
        lo = "";
    var isDecimal = /\d*\.\d*/;

    for (var i = 0; i < buttons.length; i++) {
        switch (i) {
            case 0: // %
                buttons[i].onclick = function(e) {
                    if (num1.length == 0) {
                        num1 += 0;
                    }
                    if (num2.length == 0) {
                        num2 = result.value;
                    }
                    num2 = "" + operation(num1, operation(num2, 100, "÷"), "×");
                    formula.value += num2;
                    result.value = num2;
                }
                break;
            case 1: // CE
                buttons[i].onclick = function(e) {
                    num2 = "";
                    result.value = 0;
                }
                break;
            case 2: // C
                buttons[i].onclick = function(e) {
                    num1 = "";
                    num2 = "";
                    num3 = "";
                    lo = "";
                    sym = 1;
                    result.value = 0;
                    formula.value = "";
                }
                break;
            case 3: // DEL
                buttons[i].onclick = function(e) {
                    // console.log("DEL clicked");
                    // console.log(num2);
                    if (num2.length != 0) {
                        num2 = num2.substring(0, num2.length - 1);
                        if (num2.length == 0 || num2 == "-") {
                            result.value = 0;
                        } else {
                            result.value = num2;
                        }
                    }
                }
                break;
            case 4: // 1/X
                buttons[i].onclick = function(e) {
                    if (num2.length == 0) {
                        num2 = result.value;
                    }
                    formula.value = "1/(" + num2 + ")";
                    num2 = "" + operation(1, num2, "÷");
                    result.value = num2;
                }
                break;
            case 5: // X^2
                buttons[i].onclick = function(e) {
                    if (num2.length == 0) {
                        num2 = result.value;
                    }
                    formula.value = "sqr(" + num2 + ")";
                    num2 = "" + operation(num2, num2, "×");
                    result.value = num2;
                }
                break;
            case 6: // √x
                buttons[i].onclick = function(e) {
                    if (num2.length == 0) {
                        num2 = result.value;
                    }
                    formula.value = "√(" + num2 + ")";
                    if (num2 < 0) {
                        num2 = "";
                        result.value = "无效输入";
                    } else {
                        num2 = "" + Math.sqrt(Number(num2));
                        result.value = num2;
                    }
                }
                break;
            case 7: // ÷
                buttons[i].onclick = function(e) {
                    if (num2.length != 0) {
                        if (num1.length != 0) {
                            res = "" + operation(num1, num2, lo);
                            history(num1, num2, lo, res);
                            num1 = res;
                            num2 = "";
                            lo = "÷";
                            formula.value = num1 + "÷";
                            result.value = res;
                        } else {
                            num1 = num2;
                            if (formula.value.length != 0) {
                                formula.value += "÷"
                            } else {
                                formula.value = num1 + "÷";
                            }
                            lo = "÷";
                            num2 = "";
                        }
                    } else {
                        if (num1.length != 0) {
                            formula.value = formula.value.substring(0, formula.value.length - 1) + "÷";
                            lo = "÷";
                        }
                    }
                }
                break;
            case 11: // ×
                buttons[i].onclick = function(e) {
                    if (num2.length != 0) {
                        if (num1.length != 0) {
                            res = "" + operation(num1, num2, lo);
                            history(num1, num2, lo, res);
                            num1 = res;
                            num2 = "";
                            lo = "×";
                            formula.value = num1 + "×";
                            result.value = res;
                        } else {
                            num1 = num2;
                            if (formula.value.length != 0) {
                                formula.value += "×"
                            } else {
                                formula.value = num1 + "×";
                            }
                            lo = "×";
                            num2 = "";
                        }
                    } else {
                        if (num1.length != 0) {
                            formula.value = formula.value.substring(0, formula.value.length - 1) + "×";
                            lo = "×";
                        }
                    }
                }
                break;
            case 15: // －
                buttons[i].onclick = function(e) {
                    console.log(num1);
                    console.log(num2);
                    if (num2.length != 0) {
                        if (num1.length != 0) {
                            res = "" + operation(num1, num2, lo);
                            history(num1, num2, lo, res);
                            num1 = res;
                            num2 = "";
                            lo = "-";
                            formula.value = num1 + "－";
                            result.value = res;
                        } else {
                            num1 = num2;
                            if (formula.value.length != 0) {
                                formula.value += "－"
                            } else {
                                formula.value = num1 + "－";
                            }
                            lo = "-";
                            num2 = "";
                        }
                    } else {
                        if (num1.length != 0) {
                            formula.value = formula.value.substring(0, formula.value.length - 1) + "－";
                            lo = "-";
                        }
                    }
                }
                break;
            case 19: // +
                buttons[i].onclick = function(e) {
                    if (num2.length != 0) {
                        if (num1.length != 0) {
                            res = "" + operation(num1, num2, lo);
                            history(num1, num2, lo, res);
                            num1 = res;
                            num2 = "";
                            lo = "+";
                            formula.value = num1 + "+";
                            result.value = res;
                        } else {
                            num1 = num2;
                            if (formula.value.length != 0) {
                                formula.value += "+"
                            } else {
                                formula.value = num1 + "+";
                            }
                            lo = "+";
                            num2 = "";
                        }
                    } else {
                        if (num1.length != 0) {
                            formula.value = formula.value.substring(0, formula.value.length - 1) + "+";
                            lo = "+";
                        }
                    }
                }
                break;
            case 20: // ±
                buttons[i].onclick = function(e) {
                    num2 = "" + (num2 * (-1));
                    sym *= (-1);
                    result.value = num2;
                }
                break;
            case 22: // .
                buttons[i].onclick = function(e) {
                    if (!isDecimal.test(num2)) {
                        if (num2.length == 0) {
                            num2 += "0.";
                        } else {
                            num2 += ".";
                        }
                        result.value = num2;
                    }
                }
                break;
            case 23: // =
                buttons[i].onclick = function(e) {
                    if (num2.length != 0) {
                        if (num1.length != 0) {
                            num3 = num2;
                            num2 = "";
                            formula.value = num1 + lo + num3 + "=";
                            res = "" + operation(num1, num3, lo);
                            history(num1, num3, lo, res);
                            result.value = res;
                            num1 = res;
                        } else {
                            num1 = num2;
                            num2 = "";
                            formula.value = num1 + "=";
                            result.value = num1;
                        }
                    } else {
                        if (num1.length != 0) {
                            if (num3.length != 0) {
                                formula.value = num1 + lo + num3 + "=";
                                res = "" + operation(num1, num3, lo);
                                history(num1, num3, lo, res);
                                result.value = res;
                                num1 = res;
                            } else {
                                num3 = result.value;
                                formula.value = num1 + lo + num3 + "=";
                                res = "" + operation(num1, num3, lo);
                                history(num1, num3, lo, res);
                                result.value = res;
                                num1 = res;
                            }
                        } else {
                            num1 = result.value;
                            formula.value = num1 + lo + num3 + "=";
                            result.value = num1;
                        }
                    }
                }
                break;
            default: // number
                buttons[i].onclick = function(e) {
                    if (num2 == "0") {
                        num2 = e.target.value;
                        result.value = num2;
                    } else {
                        num2 += e.target.value;
                        result.value = num2;
                    }
                }
                break;
        }
    }
}

function operation(num1, num2, lo) {
    var isNagative = /^\-\d*(\.\d*)?$/
    var sym1 = isNagative.test(num1) ? -1 : 1;
    var sym2 = isNagative.test(num2) ? -1 : 1;

    console.log("operation: " + num1, num2, lo, sym1, sym2);

    switch (lo) {
        case "+":
            if ((sym1 > 0 && sym2 > 0) || (sym1 < 0 && sym2 < 0)) {
                return "" + add("" + (num1 * sym1), "" + (num2 * sym2)) * sym1;
            } else if (sym1 > 0 && sym2 < 0) {
                return "" + sub(num1, "" + (num2 * sym2));
            } else if (sym1 < 0 && sym2 > 0) {
                return "" + sub(num2, "" + (num1 * sym1));
            }
        case "-":
            if ((sym1 > 0 && sym2 > 0) || (sym1 < 0 && sym2 < 0)) {
                return "" + sub("" + (num1 * sym1), "" + (num2 * sym2)) * sym1;
            } else if (sym1 > 0 && sym2 < 0) {
                return "" + add(num1, "" + (num2 * sym2));
            } else if (sym1 < 0 && sym2 > 0) {
                return "" + add("" + (num1 * sym1), num2) * sym1;
            }
        case "×":
            return "" + mult("" + (num1 * sym1), "" + (num2 * sym2)) * sym1 * sym2;
        case "÷":
            return "" + divi("" + (num1 * sym1), "" + (num2 * sym2)) * sym1 * sym2;
    }
}

function add(num1, num2) {
    var Num1 = num1.split(".");
    var Num2 = num2.split(".");
    var res1 = "",
        res2 = "";

    if (Num1.length < 2) {
        Num1[1] = "0";
    }

    if (Num2.length < 2) {
        Num2[1] = "0";
    }

    var len1 = Num1[0].length > Num2[0].length ? Num1[0].length : Num2[0].length;
    var len2 = Num1[1].length > Num2[1].length ? Num1[1].length : Num2[1].length;

    var n = 0;
    for (var i = len2 - 1; i >= 0; i--) {
        var n1 = i >= Num1[1].length ? 0 : Number(Num1[1].charAt(i));
        var n2 = i >= Num2[1].length ? 0 : Number(Num2[1].charAt(i));
        n = n1 + n2 + n;
        if (n < 10) {
            if (res2.length != 0 || n != 0) {
                res2 = "" + n + res2;
            }
            n = 0;
        } else {
            var x = n - 10;
            if (res2.length != 0 || x != 0) {
                res2 = "" + x + res2;
            }
            n = 1;
        }
    }

    for (i = 1; i <= len1; i++) {
        var n1 = i <= Num1[0].length ? Number(Num1[0].charAt(Num1[0].length - i)) : 0;
        var n2 = i <= Num2[0].length ? Number(Num2[0].charAt(Num2[0].length - i)) : 0;
        n = n1 + n2 + n;
        if (n < 10) {
            res1 = "" + n + res1;
            n = 0;
        } else {
            var x = n - 10;
            res1 = "" + x + res1;
            n = 1;
        }
    }

    if (n != 0) {
        res1 = "" + n + res1;
    }

    if (res2.length != 0) {
        return res1 + "." + res2;
    } else {
        return res1;
    }
}

function sub(num1, num2) {
    var sym = 1;
    if (Number(num1) < Number(num2)) {
        sym *= (-1);
        var num = num1;
        num1 = num2;
        num2 = num;
    }

    var Num1 = num1.split(".");
    var Num2 = num2.split(".");
    var res1 = "",
        res2 = "";

    if (Num1.length < 2) {
        Num1[1] = "0";
    }

    if (Num2.length < 2) {
        Num2[1] = "0";
    }

    var len1 = Num1[0].length > Num2[0].length ? Num1[0].length : Num2[0].length;
    var len2 = Num1[1].length > Num2[1].length ? Num1[1].length : Num2[1].length;

    var n = 0;
    for (var i = len2 - 1; i >= 0; i--) {
        var n1 = i >= Num1[1].length ? 0 : Number(Num1[1].charAt(i));
        var n2 = i >= Num2[1].length ? 0 : Number(Num2[1].charAt(i));
        n = n1 - n2 - n;
        if (n >= 0) {
            if (res2.length != 0 || n != 0) {
                res2 = "" + n + res2;
            }
            n = 0;
        } else {
            var x = n + 10;
            if (res2.length != 0 || x != 0) {
                res2 = "" + x + res2;
            }
            n = -1;
        }
    }

    for (i = 1; i <= len1; i++) {
        var n1 = i <= Num1[0].length ? Number(Num1[0].charAt(Num1[0].length - i)) : 0;
        var n2 = i <= Num2[0].length ? Number(Num2[0].charAt(Num2[0].length - i)) : 0;
        n = n1 - n2 - n;
        if (n >= 0) {
            res1 = "" + n + res1;
            n = 0;
        } else {
            if (i != len1) {
                var x = n + 10;
                res1 = "" + x + res1;
                n = 1;
            } else {
                res1 = "" + n + res1;
                n = 0;
            }
        }
    }

    if (res2.length != 0) {
        return (res1 + "." + res2) * sym;
    } else {
        return res1 * sym;
    }
}

function mult(num1, num2) {
    var Num1 = num1.split(".");
    var Num2 = num2.split(".");
    var res1 = "",
        res = "0";

    if (Num1.length < 2) {
        Num1[1] = "0";
    }

    if (Num2.length < 2) {
        Num2[1] = "0";
    }

    var declen = Num1[1].length + Num2[1].length;

    num1 = Num1[0] + Num1[1];
    num2 = Num2[0] + Num2[1];

    var len1 = num1.length;
    var len2 = num2.length;

    for (var i = 0; i < len2; i++) {
        var n = 0;
        for (var j = 0; j < len1; j++) {
            n = Number(num2.charAt(len2 - i - 1)) * Number(num1.charAt(len1 - j - 1)) + n;
            if (n < 10) {
                res1 = "" + n + res1;
                n = 0;
            } else {
                var x = n % 10;
                res1 = "" + x + res1;
                n = (n - x) / 10;
            }
        }

        if (n != 0) {
            res1 = "" + n + res1;
        }

        res = add("" + res1 * Math.pow(10, i), res);
        res1 = "";
    }

    res = "" + divi(res, "" + Math.pow(10, declen));

    for (var i = 1; i <= res.length; i++) {
        if (res.charAt(res.length - i) == "0") {
            continue;
        } else if (res.charAt(res.length - i) == ".") {
            res = res.substring(0, res.length - i);
            break;
        } else {
            res = res.substring(0, res.length - i + 1);
            break;
        }
    }

    return res;
}

function divi(num1, num2) {
    var Num1 = num1.split(".");
    var Num2 = num2.split(".");
    var res = "";

    if (Num1.length < 2) {
        Num1[1] = "0";
    }

    if (Num2.length < 2) {
        Num2[1] = "0";
    }

    var len = Num1[1].length > Num2[1].length ? Num1[1].length : Num2[1].length;

    num1 = "" + (Num1[0] + Num1[1]) * Math.pow(10, len - Num1[1].length);
    num2 = "" + (Num2[0] + Num2[1]) * Math.pow(10, len - Num2[1].length);

    console.log("num1:" + num1);
    console.log("num2:" + num2);

    var n = 0;
    n = num1 % num2;
    res = res + (num1 - n) / num2;

    var reslen = res.length;
    if (res == 0) {
        reslen--;
    }

    if (n != 0) {
        res += ".";
    }

    while (n != 0 && reslen < 16) {
        var x = n * 10;
        n = x % num2;
        reslen++;
        if (reslen == 16) {
            var y = (x - n) / num2;
            var x = n * 10;
            n = x % num2;
            if ((x - n) / num2 >= 5) {
                y++;
            }
            res = res + y;
        } else {
            res = res + (x - n) / num2;
        }
    }

    return "" + res;
}

function history(num1, num2, lo, res) {
    var div = document.getElementById("historydatainfo");

    var div1 = document.createElement("div");
    div1.style.height = "auto";
    div1.style.width = "200px";
    div1.style.backgroundColor = "white";
    div1.style.margin = "3px";

    var input1 = document.createElement("input");
    input1.value = num1 + lo + num2 + "=";
    input1.style.width = "178px";
    input1.style.fontSize = "20px";
    input1.style.textAlign = "right";
    input1.style.marginTop = "5px";
    var input2 = document.createElement("input");
    input2.value = res;
    input2.style.width = "178px";
    input2.style.fontSize = "20px";
    input2.style.textAlign = "right";
    input2.style.marginBottom = "5px";

    div1.appendChild(input1);
    div1.appendChild(input2);

    div.appendChild(div1);
}