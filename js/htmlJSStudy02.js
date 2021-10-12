window.onload = function() {
    let a = new Object();
    console.log("a: ", a);
    let b = a;
    console.log("b: ", b);
    console.log("a == b ? : ", a == b);

    let name = "fuzhuoh";
    name.age = 27;
    console.log(name.age);

    let name1 = "fuzhuoh";
    let name2 = new String("fu");
    console.log(name1);
    console.log(name2);
    name1.age = 23;
    name2.age = 26;
    console.log(name1);
    console.log(name2);
    console.log(typeof name1);
    console.log(typeof name2);
    console.log(name2.toString());

    let obj1 = new Object();
    obj1.name = "fuzhuoh";
    console.log(obj1.name);
    console.log(obj1);
    // console.log(obj2);
    let obj2 = obj1;
    console.log(obj2);
    console.log(obj2.name);

    function setName(obj) {
        obj.name = "fuzhuoh";
        console.log(obj);
        obj = new Object();
        obj.name = "fu";
        console.log(obj);
    }
    let person = new Object();
    setName(person);
    console.log(person.name);

    function bulidUrl() {
        let qs = "? debug=true";
        with(location) {
            let url = href + qs;
        }

        return url;
    }
    console.log(bulidUrl());

    function add(num1, num2) {
        var sum = num1 + num2;
        return sum;
    }
    let result = add(10, 20);
    console.log(sum);

    function add(num1, num2) {
        sum = num1 + num2;
        return sum;
    }
    let result = add(10, 20);
    console.log(sum);

    const o3 = Object.freeze({});
    console.log(o3);
    o3.name = 'Jake';
    console.log(o3.name);

    let obj1 = new Object();
    let obj2 = obj1;
    console.log(obj1);
    console.log(obj2);
    obj1.name = "fuzhuoh";
    console.log(obj1);
    console.log(obj2);

    let o1 = "0";
    let o2 = o1;
    console.log(o1);
    console.log(o2);
    o1 += "fuzhuoh";
    console.log(o1);
    console.log(o2);

    let now = new Date();
    console.log(now);
    console.log(now.toLocaleString());
    console.log(now.toDateString());
    console.log(now.toTimeString());
    console.log(now.toLocaleDateString());
    console.log(now.toLocaleTimeString());
    console.log(now.toUTCString());
    console.log(now.toString());
    console.log(now.valueOf());

    let someDate = new Date(Date.parse("May 23, 2019"));
    console.log(someDate);

    let someDate = new Date("May 23, 2019");
    console.log(someDate);

    let y2k = new Date(Date.UTC(2000, 0));
    console.log(y2k);

    let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
    console.log(allFives);

    let ly2k = new Date(2000, 0);
    console.log(ly2k);

    let text = "mom and dad and baby";
    let pattern = /mom( and dad( and baby)?)?/gi;
    let matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs.input);
    console.log(matchs[0]);
    console.log(matchs[1]);
    console.log(matchs[2]);

    let text = "cat, bat, sat, fat";
    let pattern = /.at/;
    let matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);
    matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);

    let text = "cat, bat, sat, fat";
    let pattern = /.at/g;
    let matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);
    matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);
    matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);

    let text = "cat, bat, sat, fat";
    let pattern = /.at/y;
    let matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);
    matchs = pattern.exec(text);
    console.log(matchs);
    // console.log(matchs.index);
    // console.log(matchs[0]);
    console.log(pattern.lastIndex);
    pattern.lastIndex = 5;
    matchs = pattern.exec(text);
    console.log(matchs);
    console.log(matchs.index);
    console.log(matchs[0]);
    console.log(pattern.lastIndex);

    let text = "000-00-0000";
    let pattern = /\d{3}-\d{2}-\d{4}/;
    if (pattern.test(text)) {
        console.log("The pattern was matched.");
    }

    let pattern = new RegExp("\\[bc\\]at", "gi");
    console.log(pattern.toString());
    console.log(pattern.toLocaleString());
    console.log(pattern.valueOf());

    let num = 99;
    console.log(num.toPrecision(1));
    console.log(num.toPrecision(2));
    console.log(num.toPrecision(3));

    console.log(Math.E);
    console.log(Math.LN10);
    console.log(Math.LN2);
    console.log(Math.LOG2E);
    console.log(Math.LOG10E);
    console.log(Math.PI);
    console.log(Math.SQRT1_2);
    console.log(Math.SQRT2);

    console.log(Math.max(3, 54, 32, 16));
    console.log(Math.min(3, 54, 32, 16));

    console.log(Math.ceil(25.9));
    console.log(Math.ceil(25.5));
    console.log(Math.ceil(25.1));
    console.log(Math.round(25.9));
    console.log(Math.round(25.5));
    console.log(Math.round(25.1));
    console.log(Math.fround(25.9));
    console.log(Math.fround(25.5));
    console.log(Math.fround(25.1));
    console.log(Math.floor(25.9));
    console.log(Math.floor(25.5));
    console.log(Math.floor(25.1));

    console.log(Math.random());

    function displayInfo(args) {
        let output = "";
        if (typeof args.name == "string") {
            output += "Name: " + args.name + "\n";
        }
        if (typeof args.age == "number") {
            output += "Age: " + args.age + "\n";
        }
        alert(output);
    }
    displayInfo({
        name: "fuzhuoh",
        age: 23
    });
    displayInfo({
        name: "fu"
    });

    console.log(Array.from("Matt"));

    const m = new Map().set(1, 2).set(3, 4);
    const s = new Set().add(1).add(2).add(3).add(4);
    console.log(m);
    console.log(Array.from(m));
    console.log(s);
    console.log(Array.from(s));

    const a1 = [1, 2, 3, 4];
    const a2 = Array.from(a1);
    console.log(a1);
    console.log(a2);
    console.log(a1 === a2);

    const iter = {
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
        }
    };
    console.log(Array.from(iter));

    function getArgsArray() {
        return Array.from(arguments);
    }
    console.log(getArgsArray(1, 2, 3, 4));

    const arrayLikeObject = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        length: 4
    };
    console.log(Array.from(arrayLikeObject));

    const a1 = [1, 2, 3, 4];
    const a2 = Array.from(a1, x => x ** 3);
    const a3 = Array.from(a1, function(x) { return x ** this.exponent }, { exponent: 4 });
    console.log(a2);
    console.log(a3);

    let colors = ["red", "blue", "green"];
    console.log(colors[0]);
    console.log(colors.length);
    colors[2] = "black";
    console.log(colors);
    console.log(colors.length);
    colors[3] = "brown";
    console.log(colors.length);
    console.log(colors);

    let names = [];
    console.log(names.length);

    let colors = ["red", "blue", "green"];
    colors.length = 2;
    console.log(colors[2]);
    console.log(colors);

    let colors = ["red", "blue", "green"];
    colors.length = 4;
    console.log(colors[3]);
    console.log(colors);


    let obj1 = {
        id: "shottext",
        name: "aaa",
        age: 11
    }
    let obj2 = {
        id: "shottext",
        name: "aaa",
        age: 11
    }
    console.log(obj1.valueOf == obj2.valueOf);


    const x = [1, 2, 3];

    for (let i = 0; i < x.length; i++) {
        console.log(x[i]);
    }

    let x = [{
            value: "aaa"
        },
        {
            value: ""
        },
        {
            value: "ccc"
        },
        {
            value: ""
        },
        {
            value: "eee"
        }
    ];
    for (let i = 0; i < x.length; ++i) {
        x[i].value = "x";
        if (x[i].value == "") {
            x.splice(i, 0);
        }
    }
    console.log(x);

    function* generatorFn() {}

    let generatorFn = function*() {}

    let foo = {
        * generatorFn() {}
    }

    class Foo { *
        generatorFn() {}
    }

    class Bar {
        static * generatorFn() {}
    }

    function* generatorFn() {}
    const g = generatorFn();
    console.log(g);
    console.log(g.next);

    function* generatorFn() {}
    const g = generatorFn();
    console.log(g);
    console.log(g.next());

    function* generatorFn() {
        return 'foo';
    }
    const g = generatorFn();
    console.log(g);
    console.log(g.next());

    let person = new Object();
    person.name = "Nicholas";
    person.age = 29;
    person.job = "Software Engineer";
    person.sayName = function() {
        console.log(this.name);
    }
    console.log(person);

    let person = {
        name: "Nicholas",
        age: 29,
        job: "Software Engineer",
        sayName() {
            console.log(this.name);
        }
    }
    console.log(person);

    let name = "fuhuoh";
    let person = {
        name
    };
    console.log(person);


    function SuperType() {
        this.property = true;
    }

    SuperType.prototype.getSuperValue = function() { return this.property; };

    function SubType() { this.subproperty = false; }

    SubType.prototype = new SuperType();
    SubType.prototype.getSubValue = function() { return this.subproperty; };
    let instance = new SubType();
    console.log(instance);
    console.log(instance.getSuperValue());



    const x = {
        x1: 5,
        x2: 6,
        x3: 7,
        x4: 8
    }

    for (const m in x) {
        console.log(m);
        console.log(x[m]);
    }

    const date = new Date();
    console.log(date.getHours());

    let ints = [1, 2, 3];
    console.log(ints.map(1));
}

function function1(params) {
    return function(obj1, obj2) {
        let val1 = obj1[params];
        let val2 = obj2[params];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    };
}

let compare = function1('name');
console.log(compare);
let result = compare({ name: 'Nicholas' }, { name: 'Matt' });
console.log(result);

function function2(params, obj1, obj2) {
    let val1 = obj1[params];
    let val2 = obj2[params];
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}

let compare = function2('name', { name: 'Nicholas' }, { name: 'Matt' });
console.log(compare);

function Person(name) {
    this.getName = () => { return name; };
    this.setName = (value) => { name = value; };
}
let person = new Person('Nicholas');
console.log(person);
console.log(person.getName());
person.setName('Greg');
console.log(person.getName());

let p = new Promise(() => {});
setTimeout(console.log, 0, p);

let p1 = new Promise((resolve, reject) => resolve());
setTimeout(console.log, 0, p1);
let p2 = new Promise((resolve, reject) => reject());
setTimeout(console.log, 0, p2);

let m = false;
if (m) {
    const x = 1;
    console.log(x);
} else {
    const x = 2;
    console.log(x);
}

const wgsx = '已12345';
// 不得填无、某某某、纯数字、纯字母、纯符号、数字字母符号组合；需要包含有汉字
if (wgsx === '无' || wgsx === '某某某' || !/^[\u4E00-\u9FFF]+$/.test(wgsx)) {
    console.log('务工事项不得填无、某某某、纯数字、纯字母、纯符号、数字字母符号组合；需要包含有汉字');
}

console.log(new Date().getTime());