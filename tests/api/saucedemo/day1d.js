const product = [
    {id: 1, name: 'Iphone', price: 1000000},
    {id: 2, name: 'Samsung', price: 800000},
    {id: 3, name: 'Macbook', price: 600000},
    {id: 4, name: 'Xiaomi', price: 400000}
];
product.forEach(item => {
    console.log(item.name);
});

//======
const result = product.find(item => item.id === 3);
console.log(result.name);
// expect(result.name).toBe("Huawei");
//======
const expected = "Macbook";
console.log(result.name === expected);

//======
const result2 = product.filter(item => item.name.includes("a"));
console.log(result2);
//======
const result3 = product.filter(item => item.price >= 600000);
console.log(result3);
//======
const result4 = product.filter(item => item.name.includes("a") && item.price >= 600000);
console.log(result4);   