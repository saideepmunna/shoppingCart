let shop = document.querySelector('.shop');
let myCart = document.querySelector('.cartQuantity');
let myPrice = document.querySelector('.price');
let actualCart = JSON.parse(localStorage.getItem('data')) || [];
myCart.innerHTML = JSON.parse(localStorage.getItem('cart')) || 0;

let generateShop = () => { 
    let itemHTML = shopItemsData.map((element) => {
        let { id, clothType, clothImage, clothDetail, clothPrice } = element;
        let search = actualCart.find((x) => x.id === id) || []
        return `<div id = product-id-${id} class="item">
                <img width="220" src=${clothImage} alt="">
                <div class="details">
                    <h3>${clothType}</h3>
                    <p>${clothDetail}</p>
                    <div class="price-quantity">
                        <h2 class="price">$ ${clothPrice}</h2>
                        <div class="buttons">
                            <i class="fa-solid fa-minus"></i>
                            <div class="quantity" id=${id}>${search.item === undefined ? 0 : search.item}</div>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    shop.innerHTML = itemHTML.join('');

}

generateShop();
let plus = document.querySelectorAll('.fa-plus');
let minus = document.querySelectorAll('.fa-minus');
let myQuantity = document.querySelector('.quantity');

plus.forEach((x, index) => {
    x.addEventListener('click', () => {
        increment(index);
        updateCart();
    })
})

minus.forEach((x, index) => {
    x.addEventListener('click', () => {
        decrement(index);
        updateCart();
    })
})

const increment = (index) => {
    let search = actualCart.find((x) => x.id === shopItemsData[index].id);
    if (search === undefined) {
        actualCart.push({
            id: shopItemsData[index].id,
            item: 1,
            Productprice: shopItemsData[index].clothPrice
        })
    }
    else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(actualCart))
    updateValue(shopItemsData[index].id);
    console.log(actualCart)

}

const decrement = (index) => {
    let search = actualCart.find((x) => x.id === shopItemsData[index].id);
    if (search === undefined) {
        return;
    }
    else if (search.item === 0) {
        return;
    }
    else {
        search.item -= 1
    }
    updateValue(shopItemsData[index].id)

    actualCart = actualCart.filter((x) => x.item !== 0);

    localStorage.setItem("data", JSON.stringify(actualCart));
   
    console.log(actualCart)


}

const updateValue = (index) => {
    let search = actualCart.find((x) => x.id === index);
    document.getElementById(index).textContent = search.item;
}

const updateCart = () => {
    let value = actualCart.map((x) => x.item).reduce((x, y) => x + y, 0)
    localStorage.setItem('cart', JSON.stringify(value))
    myCart.textContent = value;
    totalCartValue();
}

const totalCartValue = () => {
    let entireCartValue = actualCart.map((x) => x.item * x.Productprice).reduce((x, y) => x + y, 0)
    localStorage.setItem('totalCart', JSON.stringify(entireCartValue))
    console.log(entireCartValue)
}
