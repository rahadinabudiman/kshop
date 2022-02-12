let carts = document.querySelectorAll('.beli-sekarang');

let products = [{
        name: 'Kelapa Muda Yahud',
        tag: 'kelapamuda',
        price: 5000,
        inCart: 0
    },
    {
        name: 'Pepsi Soda Can Segar',
        tag: 'pepsisoda',
        price: 10000,
        inCart: 0
    },
    {
        name: 'Jeruk Fresh Asal Spanyol',
        tag: 'jerukspanyol',
        price: 15999,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productsNumbers = localStorage.getItem('cartNumbers');

    if (productsNumbers) {
        document.querySelector('.keranjang span').textContent = productsNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.keranjang span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.keranjang span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log('Harganya adalah', product.price);
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

onLoadCartNumbers();