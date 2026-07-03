const response = {
    status: 200,
    data: {
        products: [
            {id:1, name: 'Iphone', price: 1000000},
            {id:2, name: 'Samsung', price: 800000},
            {id:3, name: 'Macbook', price: 600000},
            {id:4, name: 'Xiaomi', price: 400000}
        ]
    }
};
//get status code
console.log(response.status);

//Get all products
console.log(response.data.products);

//Filter expensive products
const expensiveProducts = response.data.products.filter(
    p => p.price >=610000);
console.log(expensiveProducts);

//Filter products with name containing "i" and price less than 500000
const result1 = response.data.products.filter( 
    p => p.name.includes("i") && p.price < 500000);
console.log(result1);

//Find Samsung product
const samsungProduct = response.data.products.find(
    p => p.name === "Samsung");
console.log(samsungProduct);

//foreach
response.data.products.forEach(p => {
    console.log(p.name);
});