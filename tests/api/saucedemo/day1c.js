function sayHello(name) {
    console.log(`Hello, ${name}!`);
}
sayHello("Trong");
sayHello("John");

function add(a, b) {
    return (a+ b);
}
const result = add(333,555);
console.log(result);

//======
const addnew = (a, b) => a+b;
console.log(addnew(333,555));

//======
const users = [
    {id: 1, name: 'An'},
    {id: 2, name: 'Binh'},
    {id: 3, name: 'Cuong'}
];
console.log(users[1].name);

//======
users.forEach(user => {
    console.log(user.name);
})

//======
const result2 = users.find(user => user.id === 2);
console.log(result2.name);
//======
const result3 = users.find(user => user.name === "Binh");
console.log(result3.id);
