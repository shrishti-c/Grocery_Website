function productNumber(products, action)
{
   
    let cartNumber=localStorage.getItem('cartitem');

    cartNumber=parseInt(cartNumber);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartitem", cartNumber - 1);
        document.querySelector('#cart-btn span').textContent = cartNumber - 1;
        console.log("action running");
    } 
    else if(cartNumber)
    {
        localStorage.setItem('cartitem', cartNumber+1);
        document.querySelector('#cart-btn span ').textContent=cartNumber+1;
    }

    else
    {
        localStorage.setItem('cartitem', 1);
        document.querySelector('#cart-btn span ').textContent=1;
    }

    setItems(products);
}
function setItems(products)
{
    let CartmeItem=localStorage.getItem('productsincart');
    CartmeItem=JSON.parse(CartmeItem);
   
  
    if(CartmeItem!=null)
    {
        if(CartmeItem[products.tag]==undefined)
        {
            CartmeItem=
            {
                ...CartmeItem, [products.tag]:products
            }
        }
CartmeItem[products.tag].inCart+=1;
    }
    else
    {
        products.inCart=1;
        CartmeItem={
            [products.tag] : products
        }
    }
   
    localStorage.setItem("productsincart", JSON.stringify(CartmeItem));
}

function displayCart() {
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    if(cart==0 || cart==null)
    {
       
        productContainer.innerHTML = '';
         productContainer.innerHTML += ` Oops...Your Cart is Empty :(`;
           
    }

    else if( cartItems && productContainer ) {
        
       
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="./images/${item.tag}.png" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">₹${item.price}.00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">₹${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">₹${cart}.00</h4>
            </div>`


            productContainer.innerHTML += `
            <button class="paynow" type="button" onclick="paynow();">
                Pay Now
            </button>`

            deleteButtons();
            manageQuantity();
    }

    
   
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) 
            {
                cartItems[currentProduct].inCart -= 1;
                productNumber(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsincart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            productNumber(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsincart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartitem');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);
    let productName;
    

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartitem', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsincart', JSON.stringify(cartItems));

            displayCart();
            onloadcart();
        })
    }
}
function totalCost( product,action) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}
function onloadcart()
{
    let cartNumber=localStorage.getItem('cartitem');
    if(cartNumber)
    {
       
        document.querySelector('#cart-btn span ').textContent=cartNumber;
    }
}


let mybutton = document.getElementById("btn-back-to-top");


window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);
var nm= localStorage.getItem("username");
document.getElementById("wlh").innerHTML=`Items present in ${nm}'s cart are: `
function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function paynow()
{
    swal({
        title: "You want to proceed with order?",
        icon: "info",
        buttons: true,
       
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Thanks, your payment has been sucessful", {
            icon: "success",
          });
          var us=localStorage.getItem("username");
          localStorage.clear();
          localStorage.setItem("username", us);
          setTimeout(function(){  window.location.reload() }, 3000);
                 
        } else {
          swal("Your order has been put on hold");
        }
      });
   
}

displayCart();
onloadcart();