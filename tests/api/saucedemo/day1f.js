const responseStatus = 404;

if (responseStatus === 200) {
    console.log('PASS');
} else {
    console.log('FAIL');
}

const age = 20;

if (age >=18) {
    console.log('Adult');
}

const score = 85;

if (score >= 80) {
    console.log('GOOD');
} else {
    console.log('BAD');
}
//=====
const user = {
    name: 'Phuong',
    role: 'admin'
};
if (user.role === 'admin') {
    console.log('Can edit');
}
//=====
const products = [];

if (products.length === 0) {
    console.log('No data');
}
