export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
};

export const products: Record<string, Product> = {
    backpack: {
        id: 'sauce-labs-backpack',
        name: 'Sauce Labs Backpack',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        price: 29.99
    },

    bikeLight: {
        id: 'sauce-labs-bike-light',
        name: 'Sauce Labs Bike Light',
        description: 'A red light for your bike',
        price: 9.99
    },
    boltTShirt: {
        id: 'sauce-labs-bolt-t-shirt',
        name: 'Sauce Labs Bolt T-Shirt',
        description: 'Get your testing superhero on with the Sauce Labs Bolt T-Shirt. This classic tee features a bold lightning bolt design, symbolizing the power and speed of our testing solutions. Made from soft, comfortable fabric, it’s perfect for both casual wear and testing marathons. Show off your love for quality software and stylish swag with this iconic shirt.',
        price: 15.99
    },
    fleeceJacket: {
        id: 'sauce-labs-fleece-jacket',
        name: 'Sauce Labs Fleece Jacket',
        description: 'Stay warm and cozy while testing with the Sauce Labs Fleece Jacket. This high-quality jacket is made from soft fleece material, providing comfort and insulation during those long testing sessions. Featuring the Sauce Labs logo on the chest, it’s a stylish way to show your support for our testing solutions. Whether you’re working in a chilly office or braving the elements, this jacket is the perfect companion for any tester.',
        price: 49.99
    },      
    onesie: {
        id: 'sauce-labs-onesie',
        name: 'Sauce Labs Onesie',
        description: 'Wrap yourself in comfort and cuteness with the Sauce Labs Onesie. This adorable one-piece outfit is made from soft, cozy fabric, perfect for lounging or testing in style. Featuring the Sauce Labs logo on the front, it’s a fun way to show your love for our testing solutions. Whether you’re working from home or just want to relax after a long day of testing, this onesie is the ultimate choice for comfort and swag.',
        price: 7.99
    },
    redTShirt: {
        id: 'test.allthethings()-t-shirt-(red)',
        name: 'Test.allTheThings() T-Shirt (Red)',
        description: 'Show off your testing prowess with the Test.allTheThings() T-Shirt in vibrant red. This bold tee features the iconic "Test.allTheThings()" slogan, symbolizing your commitment to comprehensive testing. Made from soft, comfortable fabric, it’s perfect for both casual wear and testing marathons. Whether you’re a seasoned tester or just starting out, this shirt is a great way to express your passion for quality software and stylish swag.',
        price: 15.99
    }


};