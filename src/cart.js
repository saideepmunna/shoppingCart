let myCart = document.querySelector('.cartQuantity');
let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let actualCart = JSON.parse(localStorage.getItem('data')) || [];
let totalBill = document.querySelector('.totalBill');
let clearCart = document.querySelector('.clearCart');
let entireCart = document.querySelector('.myEntireCart');


myCart.innerHTML = JSON.parse(localStorage.getItem('cart')) || 0;
let cartBill = localStorage.getItem('totalCart')
totalBill.innerHTML = cartBill;

let generateCardItems = () => {
    if (actualCart.length !== 0) {
        return (shoppingCart.innerHTML = actualCart.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `<div class="cart-item" id=quantitiy-${id}>
              <img width=100 src="${search.clothImage}" alt="" />
              <div class="details">
                <div class="Title-price-x">
              <h4 class="cloth-price">
                <p>${search.clothType}</p>
                <p class="cloth-price-design">$ ${search.clothPrice}</p>

              </h4> 
              <i class="fa-solid fa-x" x-id=${id}></i>
              </div>

              
              <div class="buttons">
                            <i class="fa-solid fa-minus" data-id="${search.id}"></i>
                            <div class="quantity" id=${id}>${item}</div>
                            <i class="fa-solid fa-plus" data-id="${search.id}"></i>
                        </div>
            
              <h3 class="total-product-price ${id}">$ ${search.clothPrice * item}</h3>
              </div>
            </div>
            `;
        }).join(''));
    }
    else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
     <h2>Your Cart is Empty</h2>
     <a href='index.html'>
     <button class='home-btn'>Back to Home</button>
     </a>
     `
    }
}
document.addEventListener('DOMContentLoaded', () => {
    let plus = document.querySelectorAll('.fa-plus');
    let minus = document.querySelectorAll('.fa-minus');
    let cross = document.querySelectorAll('.fa-x')

    plus.forEach((x) => {
        x.addEventListener('click', (event) => {
            let itemId = event.target.getAttribute('data-id')
            increment(itemId);
            updateCart();
            updateTotalPrice(itemId)

        })
    })

    minus.forEach((x) => {
        x.addEventListener('click', (event) => {
            let itemId = event.target.getAttribute('data-id');
            decrement(itemId);
            updateCart();
            updateTotalPrice(itemId);
        })
    })

    cross.forEach((x) => {
        x.addEventListener('click', (event) => {
            let itemId = event.target.getAttribute('x-id');
            deleteCart(itemId);
            totalCartValue();
        })

    })

    clearCart.addEventListener('click',()=>{
        actualCart = [];
        localStorage.clear();
        entireCart.innerHTML = ""
        location.reload();
        console.log(actualCart)
    })


    const increment = (itemId) => {
        let search = actualCart.find((x) => x.id === itemId);
        if (search === undefined) {
            actualCart.push({
                id: itemId,
                item: 1
            })
        }
        else {
            search.item += 1;
        }
        localStorage.setItem("data", JSON.stringify(actualCart))
        updateValue(itemId);
        console.log(actualCart)
        totalCartValue();
    }

    const decrement = (itemId) => {
        let search = actualCart.find((x) => x.id === itemId);
        if (search === undefined) {
            return;
        }
        else if (search.item === 1) {
            document.getElementById(`quantitiy-${itemId}`).style.display = "none";
            search.item -= 1
        }

        else {
            search.item -= 1;
            updateValue(itemId)
        }
        actualCart = actualCart.filter((x) => x.item !== 0);

        localStorage.setItem("data", JSON.stringify(actualCart));
        totalCartValue();
        console.log(actualCart)


    }

    const updateValue = (itemId) => {
        let search = actualCart.find((x) => x.id === itemId);
        document.getElementById(itemId).textContent = search.item;
    }

    const updateCart = () => {
        let value = actualCart.map((x) => x.item).reduce((x, y) => x + y, 0)
        localStorage.setItem('cart', JSON.stringify(value))
        myCart.textContent = value;
    }



    const updateTotalPrice = (itemId) => {
        let search = shopItemsData.find((x) => x.id === itemId);
        let itemSearch = actualCart.find((x) => x.id === itemId);
        let totalProduct = document.querySelector(`.${itemId}`);
        if (itemSearch) {
            let totalPrice = search.clothPrice * itemSearch.item;
            totalProduct.innerHTML = `$ ${totalPrice}`

        }
    }

    const deleteCart = (itemId) => {
        let search = actualCart.find((x) => x.id === itemId);
        actualCart = actualCart.filter((x) => x.id !== search.id);
        document.getElementById(`quantitiy-${itemId}`).style.display = "none";
        updateCart();
    }

    const totalCartValue = () => {
        let entireCartValue = actualCart.map((x) => x.item * x.Productprice).reduce((x, y) => x + y, 0)
        localStorage.setItem('totalCart', JSON.stringify(entireCartValue))
        console.log(entireCartValue)
        updateCartAmount(entireCartValue)
    }

    const updateCartAmount = (totAmount) => {
        totalBill.innerHTML = totAmount;
    }
})

generateCardItems()

