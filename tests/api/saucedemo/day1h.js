try {

    const products = undefined;

    console.log(products.length);

} catch (error) {

    console.log('Something wrong');

    console.log(error.message);
}

//=====
const user = null;

try {
    console.log(user.name);
} catch (error) {
    console.log('Something wrong');
    console.log(error.message);
}