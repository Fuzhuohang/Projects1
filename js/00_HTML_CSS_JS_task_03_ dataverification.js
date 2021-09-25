/**
 * 表单提交时——对提交数据进行规则校验
 * @returns 
 */
function submitForm() {
    // 必填
    for (const id of myFormData.tableLayout) {
        const item = myFormData.itemsData[id];
        if (item.attr.required) {
            if (item.type === "checkbox" || item.type === "radio") {
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
            } else if (document.getElementsByName(item.name + "(" + item.id + ")")[0].value.length === 0) {
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
    for (const regularCheck in myFormData.r_check) {
        if (myFormData.r_check[regularCheck].expression.length != 0) {
            const item = document.getElementById(regularCheck + "_fBody");
            const pattern = new RegExp(myFormData.r_check[regularCheck].expression);
            const regularCheckValue = item.value;
            console.log(pattern);
            console.log(regularCheckValue)
            console.log(pattern.test(regularCheckValue));
            if (!pattern.test(regularCheckValue)) {
                delayPrompt(myFormData.r_check[regularCheck].tips)
                return false;
            }
        }
    }

    // 提交
    for (const submitVeri in myFormData.s_check) {
        if (myFormData.s_check[submitVeri].beginValue.length != 0) {
            const item = document.getElementById(submitVeri + "_fBody");
            const submitVeriValue = item.value;
            let beginValue, endValue;
            if (myFormData.s_check[submitVeri].template === "1") {
                beginValue = myFormData.s_check[submitVeri].beginValue;
                endValue = myFormData.s_check[submitVeri].endValue;
            } else {
                beginValue = document.getElementById(myFormData.s_check[submitVeri].beginValue).value;
                endValue = document.getElementById(myFormData.s_check[submitVeri].endValue).value;
            }

            switch (myFormData.s_check[submitVeri].relationship) {
                case "1":
                    if (beginValue.length != 0 && submitVeriValue != beginValue) {
                        delayPrompt(myFormData.s_check[submitVeri].tips)
                        return false;
                    }
                    break;
                case "2":
                    if (beginValue.length != 0 && submitVeriValue <= beginValue) {
                        delayPrompt(myFormData.s_check[submitVeri].tips)
                        return false;
                    }
                    break;
                case "3":
                    if (beginValue.length != 0 && submitVeriValue >= beginValue) {
                        delayPrompt(myFormData.s_check[submitVeri].tips)
                        return false;
                    }
                    break;
                case "4":
                    if (beginValue.length != 0 && submitVeriValue < beginValue) {
                        delayPrompt(myFormData.s_check[submitVeri].tips)
                        return false;
                    }
                    break;
                case "5":
                    if (beginValue.length != 0 && submitVeriValue > beginValue) {
                        delayPrompt(myFormData.s_check[submitVeri].tips)
                        return false;
                    }
                    break;
                case "6":
                    if ((beginValue.length != 0 && submitVeriValue < beginValue) || (endValue.length != 0 && submitVeriValue > endValue)) {
                        delayPrompt(myFormData.s_check[submitVeri].tips)
                        return false;
                    }
                    break;
            }
        }
    }

    return true;
}

/**
 * 表单提交时——对单选框、复选框进行必填校验
 * @param {string} name 
 * @returns 
 */
function requiredVeri(name) {
    const options = document.getElementsByName(name);
    for (const option of options) {
        if (option.checked) {
            return true;
        }
    }
    return false;
}

/**
 * 延时错误提示框
 * @param {string} text 
 */
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

/**
 * 地址控件弹窗
 * @param {object} obj 
 */
function getLocation(obj) {
    const addressMap = document.getElementById("address_map");
    addressMap.style.display = "block";
    const chosenAddress = document.getElementById("chosen_address");
    let coordinate, market;

    const map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
    });

    map.on('complete', function() {
        if (obj.value.length != 0) {
            AMap.plugin('AMap.Geocoder', function() {
                const geocoder = new AMap.Geocoder({

                })

                geocoder.getLocation(obj.value, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // result中对应详细地理坐标信息
                        console.log(result);
                        chosenAddress.value = result.geocodes[0].formattedAddress;
                        market = new AMap.Marker({
                            position: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
                            title: result.geocodes.formattedAddress
                        });
                        map.add(market);
                    }
                })
            })
        } else {
            AMap.plugin('AMap.CitySearch', function() {
                const citySearch = new AMap.CitySearch()
                citySearch.getLocalCity(function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // 查询成功，result即为当前所在城市信息
                        chosenAddress.value = result.province + result.city;
                        coordinate = map.getCenter();
                        market = new AMap.Marker({
                            position: coordinate,
                            title: '广东省深圳市'
                        });
                        map.add(market);
                    }
                })
            })
        }
    });

    map.on('click', function(ev) {
        // 触发事件的地理坐标，AMap.LngLat 类型
        const lnglat = ev.lnglat;
        AMap.plugin('AMap.Geocoder', function() {
            const geocoder = new AMap.Geocoder({

            })

            geocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // result为对应的地理位置详细信息
                    chosenAddress.value = result.regeocode.formattedAddress;
                    map.remove(market);
                    market = new AMap.Marker({
                        position: lnglat,
                        title: result.regeocode.formattedAddress
                    });
                    map.add(market);
                }
            })
        })
    });
    document.getElementById("addr_cancel_btn").onclick = function() {
        addressMap.style.display = "none";
        map.destroy();
    }

    document.getElementById("addr_deter_btn").onclick = function() {
        obj.value = chosenAddress.value;
        addressMap.style.display = "none";
        obj.className += " notNull"
        map.destroy();
    }

}