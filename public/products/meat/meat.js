let cartstot=document.querySelectorAll(".addcart");
let product= [
    
    {tag:"bacon",
        name:"Bacon",
        price:45,
        inCart:0
    },
    {tag:"meat",
        name:"Meat",
        price:45,
        inCart:0
    },
    {tag:"shrimp",
        name:"Shrimp",
        price:45,
        inCart:0
    },
    {tag:"fishmeat",
        name:"Fish Meat",
        price:45,
        inCart:0
    },
    {tag:"chickenmeat",
        name:"Chicken Meat",
        price:45,
        inCart:0
    },
    {tag:"brownegg",
        name:"Brown Egg",
        price:45,
        inCart:0
    },
    {tag:"whiteegg",
        name:"White Egg",
        price:45,
        inCart:0
    },
    {tag:"beef",
        name:"Beef",
        price:45,
        inCart:0
    }
];

for(let i=0;i<cartstot.length;i++)
{
      cartstot[i].addEventListener('click', ()=>{
          productNumber(product[i]);
          totalCost(product[i]);
      })
}
function onloadcart()
{
    let cartNumber=localStorage.getItem('cartitem');
    if(cartNumber)
    {
      
        document.querySelector('#cart-btn span ').textContent=cartNumber;
    }
}
function productNumber(products)
{
    
    let cartNumber=localStorage.getItem('cartitem');

    cartNumber=parseInt(cartNumber);

    if(cartNumber)
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
    console.log(CartmeItem);
    localStorage.setItem("productsincart", JSON.stringify(CartmeItem));
}
function totalCost( product) {
    let cart = localStorage.getItem("totalCost");

   
   if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
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

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
onloadcart();
