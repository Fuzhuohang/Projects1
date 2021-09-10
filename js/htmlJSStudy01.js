window.onload = function() {
    // var变量定义
    var message;
    console.log(message);

    // var变量定义时赋值
    var message = "hi";
    console.log(message);

    // var变量定义并赋值后，将变量重新赋值为另一种数据类型的变量值
    // 开发中不推荐这么做
    var message = "hi";
    message = 100;
    console.log(message);

    // var声明变量的作用域为当前声明的函数体中
    function test() {
        var message = "hi";
    }
    test();
    console.log(message);

    // 不使用var、let等标识符，在函数体中直接使用变量名声明的变量为全局变量
    function test() {
        message = "hi";
    }
    test();
    console.log(message);

    // 同时声明多个变量，变量之间使用“,”隔开
    var message = "hi",
        found = "false",
        age = 29;
    console.log(message + " " + found + " " + age);

    // 变量声明会被自动提前到当前的函数体头部，但声明时进行的赋值操作还是在原位置
    function foo() {
        console.log(age);
        var age = 26;
    }
    foo();

    // 同一个变量的多次重复声明只会生效一次，后续的重复声明只会被当作赋值操作
    function foo() {
        var age = 16;
        var age = 26;
        var age = 36;
        console.log(age);
    }
    foo();

    // let声明作用的范围是区域块，例如if、for、while等逻辑语句的执行块
    // var声明作用的范围则是当前函数
    if (true) {
        var name = 'Matt';
        console.log(name);
    }
    console.log(name);

    if (true) {
        let age = 18;
        console.log(age);
    }
    console.log(age);

    // let声明不允许冗余声明，但var可以但不推荐
    var name;
    var name;
    let age;
    let age;

    // 嵌套使用相同的变量声明是被允许且不会出错的
    // var变量的嵌套声明会相当于原变量的修改
    // let变量的嵌套声明相当于在块中定义的一个新变量，与原变量无关
    var name = 'Nicholas';
    console.log(name);
    if (true) {
        var name = 'Matt';
        console.log(name);
    }
    console.log(name);

    let age = 30;
    console.log(age);
    if (true) {
        let age = 26;
        console.log(age);
    }
    console.log(age);

    // var和let定义的同名变量会出现冗余声明报错，这与两者的顺序无关
    var name;
    let name;

    let age;
    var age;

    // let变量在编译时不会声明提前
    console.log(name);
    var name = 'Matt';

    console.log(age);
    let age = 26;

    for (var i = 0; i < 5; ++i) {

    }
    console.log(i);

    for (let i = 0; i < 5; ++i) {

    }
    console.log(i);

    for (var i = 0; i < 5; ++i) {
        setTimeout(() => console.log(i), 0);
    }

    for (let i = 0; i < 5; ++i) {
        setTimeout(() => console.log(i), 0);
    }

    const age = 26;
    age = 36;

    const name = 'fuzhuoh';
    const name = 'xuzy';

    const name = 'fuzhuoh';
    if (true) {
        const name = 'xuzy';
    }
    console.log(name);

    const person = {};
    person.name = 'fuzhuoh';
    person.age = '23';
    console.log(person);

    let i = 0;
    for (const j = 7; i < 5; ++i) {
        console.log(j);
    }

    for (const key in { a: 1, b: 2 }) {
        console.log(key);
    }

    for (const value of[1, 2, 3, 4, 5]) {
        console.log(value);
    }

    let a;
    let b = true;
    let c = "fu";
    let d = 1;
    let e = {};
    let f = function foo() {

    }
    let g = Symbol();
    console.log(typeof a);
    console.log(typeof(b));
    console.log(typeof c);
    console.log(typeof(d));
    console.log(typeof e);
    console.log(typeof(f));
    console.log(typeof g);

    let message;
    console.log(message == undefined);

    let message;
    if (message) {
        console.log('true');
    } else {
        console.log("not ture");
    }
    if (!message) {
        console.log("false");
    } else {
        console.log("not false");
    }
    if (age) {
        console.log("error");
    } else {
        console.log("contect");
    }

    let num = 2.024e7;
    console.log(num);

    let a = 0.1;
    let b = 0.2;
    console.log(a + b == 0.3 ? "ture" : "false");
    console.log(a + b);

    let lang = "Java";
    lang += "Script";
    console.log(lang);

    let value = 5;
    let exponent = 'second';

    let interpolatedString = value + ' to the ' + exponent + ' power is ' + (value * value);

    let interpolatedTemplateLiteral = `${value} to the ${exponent} power is ${value * value}`;

    console.log(interpolatedString);
    console.log(interpolatedTemplateLiteral);

    let a = 6;
    let b = 9;

    function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
        console.log(strings);
        console.log(aValExpression);
        console.log(bValExpression);
        console.log(sumExpression);
        return 'foobar';
    }

    let untaggedResult = ` ${a} + ${b} = ${a+b} `;
    let taggedResult = simpleTag ` ${a} + ${b} = ${a+b} `;

    console.log(untaggedResult);
    console.log(taggedResult);

    function simpleTag(strings, ...expressions) {
        console.log(strings);
        for (const expression of expressions) {
            console.log(expression);
        }
        return 'foobar';
    }

    let a = 6,
        b = 9,
        c = 12;

    let taggedResult = simpleTag ` ${a} + ${b} + ${c} = ${a + b + c}`;

    console.log(taggedResult);

    let sym = Symbol();
    console.log(typeof sym);
    console.log(sym);

    class Foo {
        async * [Symbol.asyncIterator]() {}
    }
    let f = new Foo();
    console.log(f[Symbol.asyncIterator]());

    class Emitter {
        constructor(max) {
            this.max = max;
            this.asyncIdx = 0;
        }

        async * [Symbol.asyncIterator]() {
            while (this.asyncIdx < this.max) {
                yield new Promise((resolve) => resolve(this.asyncIdx++));
            }
        }
    }
    async function asyncCount() {
        let emitter = new Emitter(5);
        for await (const x of emitter) {
            console.log(x);
        }
    }
    asyncCount();

    let s1 = "2";
    let s2 = "z";
    let b = false;
    let f = 1.1;
    let o = {
        valueOf() {
            return 5;
        }
    }
    console.log(++s1, ++s2, ++b, --f, ++o);

    let num1 = 25;
    console.log(num1.toString(2));
    let num2 = ~num1;
    console.log(num2.toString(2));
    console.log(num2);


}

var name = 'fuzhuoh';
console.log(window.name);

let age = 23;
console.log(window.age);

for (const propName in Window) {
    document.write(propName);
}