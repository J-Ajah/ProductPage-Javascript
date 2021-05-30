//productsItem starts here
class ProductsItem {
  products = [
    new Products(
      'Skirt & Blouse',
      59.99,
      5,
      'UK made soft cotton skirt and blouse',
      'assets/skirtBlouse.jpg',


    ),
    new Products(
      'IWO Smart Watch',
      89.99,
      4,
      'New generation smart watch with a 2years warranty',
      'assets/smartWatch.jpg'
    ),
    new Products(
      'Shoe Polish',
      79.99,
      4,
      'Shoe sparkler for real gentle men',
      'assets/POLISH.jpg'
    ),

    new Products(
      'Unisex Canvas Shoe',
      90.99,
      4,
      'Uk made stock canvas for men and women',
      'assets/unisexShoe.jpg'
    ),

    new Products(
      'Men Slip on Canvas',
      60.99,
      4,
      'Men slip on sneekers',
      'assets/menslipOn.jpg'
    ),

    new Products(
      'Alive Sports Shoe',
      57.99,
      4,
      'Uk made sports shoe for men and female',
      'assets/images.jpg'
    ),

  ];


  //The render product method
  renderProduct() {
    const parentDiv = document.querySelector('.container');
    const divOfProds = document.createElement('div');
    divOfProds.className = "div-of-prods"
    const listOfProds = document.createElement('ul');
    listOfProds.className = 'list-of-prods';
    for (let product of this.products) {
      let item = new ProductInfo(product);
      const prodElement = item.renderElement();
      listOfProds.append(prodElement);
    }


    parentDiv.append(divOfProds);
    divOfProds.append(listOfProds);

    divOfProds.insertAdjacentHTML('afterbegin',
      '<div  class="info-div"> <h2 class="caption"> Recent Products </h2>  <h2 class=" caption"><a id="cartView"> View Cart Items <a/> </h2>   </div>');


    //adding Event listner
    //  console.log(divOfProds);
    divOfProds.querySelector('#cartView').addEventListener('click', function () {
      ShoppingCart.showCartItems();
      let shopcart = new ShoppingCart();
      shopcart.renderCartItems();
    });

  }




}



//Page UI class
class WebUI extends ProductsItem {

  constructor() {
    super();
    this.containerDiv = document.querySelector('.container');
    this.body = document.querySelector('body');
  }
  renderUI() {


    // console.log(containerDiv);


    //Overlay starts here


    const overLay = document.createElement('div');
    overLay.id = 'backdrop';

    //creating navigation for the website
    const navigation = document.createElement('div');
    navigation.className = 'nav-bar';
    navigation.innerHTML = `
       <div class="logo">
        <img src="assets/iceshop.png" alt="logo Image"/>
       </div>
       <div class="nav-menu">
        <ul>
          <li class="navButton">Home</li>
          <li class="navButton">About</li>
          <li class="navButton">Products</li>
          <li class="navButton">Signup</li>
  
        </ul>
       </div>
  
       <div class="searchDiv">
           <input type="text" name="SearchItem" id="search">
           <button> Search </button>
       </div>
     
     `;

    //Content menu starts here
    const containerItem = document.createElement('div');
    containerItem.className = 'containerItem';
    containerItem.innerHTML = `
         <div class="containerText">
              <h3>Best Selling Products</h3>
              <p> Consider purchasing our 3 in 1 unisex T-Shirts
               at a a very low price and get it delivered to your 
               door step. </p>
  
          <button> Shop now </button>     
         </div>
     
     `;



    //footer starts here
    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerHTML = `
         <div class="footer-div">
            
         </div>
     
     `;





    //Appending elements to ParentDivs for rendering
    this.body.append(overLay);
    this.containerDiv.appendChild(navigation);
    this.containerDiv.appendChild(containerItem);
    //  console.log( containerDiv.children.length+1);
    super.renderProduct();


    //adding cart containerDiv
    this.containerDiv.insertAdjacentHTML('beforebegin',
      '<div  class="cart-Container"></div>');


    this.containerDiv.append(footer)


  }


}


//products class starts here
class Products {
  constructor(title, price, stock, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.description = description,
      this.imageUrl = imageUrl
  }
}

class ItemCart {

  constructor(item) {
    this.item = item;
  }

  cartItemCard() {
    //Renders each individual product

    const prods = document.createElement('div')
    prods.className = 'individual-products';

    prods.innerHTML = `
                    <img class="delete-img" src="assets/delete.png"   alt="" />
                    <img class="prod-image" src="${this.item.imageUrl}"   alt="" />
                    <h4> ${this.item.title} </h4>
                    <h4 class="price"> \$<span>${this.item.price} </span></h4>
                    
                    <div class='quantityDiv'>
                     <img class='minus' src='assets/minus.png' />
                     <input type="number" name="quantity" min="0" max="100" value="1" id="num" >
                     <img class='add' src='assets/plusIcon.png' />
                    </div>
     
     
                    <h4 class="quantity"> \$<span>${this.item.price}</span></h4>
                    
     
                 
      
     
                `;



    // cartDiv.append(prods)
    //  console.log(product)



    return prods;
  }


}





class CartComponents extends WebUI {
  backdropOverlay = document.querySelector('#backdrop');

  constructor(product) {
    super();
    this.product = product;
  }

  showBackDropOverlay() {
    // this.backdropOverlay.id('visible');

    this.backdropOverlay.classList.add('visible');
    // this.containerDiv.innerHTML = '';

  }

  addToCart() {
    
    this.showBackDropOverlay();
    // console.log(this.product);

    const shoppingCart = new ShoppingCart();
    ShoppingCart.addNewItem(this.product);
    //  console.log(shoppingCart.cartItems);
    shoppingCart.renderCartItems();



  }

}



class ProductInfo extends CartComponents {
  constructor(product) {
    super();
    this.product = product;
  }

  renderElement() {
    let list = document.createElement('li');
    list.className = 'products-info';
    list.innerHTML = `
         <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}"/>
            <div class="product-info-content">
              <h2> ${this.product.title} </h2>
              <h3>  \$${this.product.price}  </h3>
              <h3>Available Stock: <span>  ${this.product.stock} <span> </h3>
              <p>  ${this.product.description} </p>
            </div>
            <button>  Add to Cart </button>
         </div>
      
      `;

    let addtoCartButton = list.querySelector('button');
    addtoCartButton.addEventListener('click', this.addToCart.bind(this))
   
    return list;
  }
}




class ShoppingCart extends ProductInfo {
  static  cartItems = [];
  
  constructor(product) {
    super(product);
   this.overAllItems = 0;

  }

  static addNewItem(item) {
    const ui = new WebUI();
    // const cartDiv = ui.body.querySelector('.cart-Container');
    console.log(ShoppingCart.cartItems)
    console.log(ShoppingCart.cartItems[2])
    if (ShoppingCart.findProduct(item) == null) {
      ShoppingCart.cartItems.push(item);
    } else {
      alert("product exits")
    }


  }


  static findProduct(product) {
    // for (let productInCart of ShoppingCart.cartItems) {
    //   console.log(product.title)
    //   console.log(ShoppingCart.cartItems)
    //   console.log("================================")
    //   console.log(product.title +" == "+ productInCart.title)
    //   console.log(product.title == productInCart.title)
    //   if (product.title === productInCart.title) {

    //     return productInCart;
    //   } else {
    //     return null;
    //   }
    // }

    for(let i = 0; i < ShoppingCart.cartItems.length; i++){
          if(product.title == ShoppingCart.cartItems[i].title){
          
             return ShoppingCart.cartItems[i];
             
          }
    }

    return null;


}

  static showCartItems() {
    let container = document.querySelector('.cart-Container');
    let backdrop = document.querySelector('#backdrop');
    container.classList.add('visible');
    backdrop.classList.add('visible');


  }

  closeCartItems() {

    let container = document.querySelector('.cart-Container');
    let backdrop = document.querySelector('#backdrop');
    container.classList.remove('visible');
    backdrop.classList.remove('visible');


  }



  //The next method will be used to render product Items to the screen
  renderCartItems() {
    const ui = new WebUI();
    const cartDiv = ui.body.querySelector('.cart-Container');
    cartDiv.classList.add('visible');
    // this.showCartItems();
    if (ShoppingCart.cartItems.length === 0) {
      cartDiv.innerHTML = `
            <img class="closeImage" src="assets/closebutton.jpg" />
            <div class="cartError">
             <h4> No items in cart  yet.</h3>

             </div>
                
          `;


      //adding an event listener to the close button
      cartDiv.querySelector(".closeImage").addEventListener("click", this.closeCartItems)
    } else {
      cartDiv.innerHTML = `
       <div class="cart-Heading">   
           <h3>  Product </h3>

           <h3>  Price </h3>

           <h3>  Quantity </h3>

           <h3>  Total </h3>
       
       </div>

       
       `;




      for (let prod of ShoppingCart.cartItems) {
        let item = new ItemCart(prod);
        cartDiv.append(item.cartItemCard());
      }

      //  });


      //Adding a button to continue shoping and total Items div
      const cartFooterDiv = document.createElement('div');
      cartFooterDiv.className = 'cart-footer';
      cartFooterDiv.innerHTML = `
           <h5 class="total-text"> Total: <span>  </span> </h5>
           <h5 class="continue-text"> Continue Shopping </h5>
           <button class="btn-checkout"> CheckOut </button>


       `;




      cartDiv.append(cartFooterDiv);
      //Adding Event listeners to each Items


      cartDiv.querySelector('.continue-text').addEventListener('click', this.closeCartItems)


      //Adding event listeners to the necessary elements
      this.addEventListeners();


      //Default calculation of the total amount is done here
      // let total = cartDiv.querySelector('.quantity span');
      // let quanText = cartDiv.querySelector('.total-text span');
      // quanText.innerText = ShoppingCart.total_PriceAmount();
      // total.innerText = ShoppingCart.total_PriceAmount();


      //calculates the total Items available in the cart
      this.Items();


    }
  }


  addEventListeners() {
    const ui = new WebUI();
    const cartDiv = ui.body.querySelector('.cart-Container');
    const products = cartDiv.querySelectorAll('.individual-products');

    //Loops through the products and attaches an event listener

    for (let i = 0; i < products.length; i++) {
      // products[i].addEventListener('click',)
      products[i].querySelector('.minus').addEventListener('click', (e)=>{
        this.decreaseQuantity(e)
      });
      products[i].querySelector('.add').addEventListener('click', (e)=>{
        
        this.increaseQuantity(e);
        this.Items();
     
      });

      products[i].querySelector('.delete-img').addEventListener('click', (e) => {
        let prodParent = e.currentTarget.parentNode;
        let prodTitle = prodParent.querySelector('h4');
        this.deleteItem(prodTitle);
      })

    }


  }


  //Returns product 
  getProd(product) {
    for (let productInCart of ShoppingCart.cartItems) {
      if (productInCart.title == product) {
        return productInCart;
      }
    }
  }


  deleteItem(prod) {
   
    let title = prod.innerText;
    let product = this.getProd(title);

    if (product != null) {
      let position = ShoppingCart.cartItems.indexOf(product);
      ShoppingCart.cartItems.splice(position, 1);
    }

    //the next line of code re-renders our cart items
    this.renderCartItems();
    
    
  }

  scrollToBottom() {
    let ui = new WebUI();
    let div = ui.body.querySelector('.cart-Container');;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

   Items(){
      
     let count = 0;
    let totalItem = document.querySelector('.cart-footer .total-text span');
    let productsInCart = document.querySelectorAll('.individual-products');
    // console.log(productsInCart)
 
    this.overAllItems = 0;
    for (let prods of productsInCart) {
    
      let price = prods.children[5].children[0].innerText;
     
      this.overAllItems = this.overAllItems + parseFloat(price)
      totalItem.innerText = this.overAllItems.toFixed(2);
      count ++;
      // console.log(totalSum)
    }
 }


  increaseQuantity(e) {
    //  const ancestoryContainer = document.querySelector('.individual-products')
   

    
    let valueItem =e.target.previousElementSibling.value;
    let quantity = parseFloat(valueItem);
    let val = (quantity == "") ? 1 : quantity + 1;
  

    e.target.previousElementSibling.value = val;
   


     
    let itemPrice = e.target.parentNode.previousElementSibling.children[0];
    let totalSpan = e.target.parentNode.nextElementSibling.children[0];
    let total = parseFloat(totalSpan.innerText) + parseFloat(itemPrice.innerText);
    totalSpan.innerText = total.toFixed(2);



    // let totalItem = document.querySelector('.cart-footer .total-text span');
    // totalItem.innerText = ShoppingCart.total_PriceAmount().toFixed(2);
    // console.log(totalItem);

    
    //Update the overall total price of the Items
   
  }



  decreaseQuantity(e) {

    let quantity = parseFloat(e.target.nextElementSibling.value);
    if (quantity != 1) {
      let val = (quantity == "") ? 1 : quantity - 1;
      e.target.nextElementSibling.value = val;
    }


    let itemPrice = e.target.parentNode.previousElementSibling.children[0];
    let totalSpan = e.target.parentNode.nextElementSibling.children[0];
    let total = 0;

    if (parseFloat(totalSpan.innerText) === parseFloat(itemPrice.innerText)) {
      return;
    }
    total = parseFloat(totalSpan.innerText).toFixed(2) - parseFloat(itemPrice.innerText).toFixed(2);
    totalSpan.innerText = total.toFixed(2);

  
    this.Items();

  }

  static total_PriceAmount() {
    let totalSum = 0;


    let productsInCart = document.querySelectorAll('.individual-products');

    let listOfProd = [];
    listOfProd.push(productsInCart);
    //  quantity.forEach(item => totalSum =  parseInt(item.value));
    let count = 0;

    //calculates the price of  products 
    for (let prods of listOfProd) {

      let price = prods[count].children[3].children[0].innerText;
      let proQuant = prods[count].children[4].children[1].value;
      totalSum = totalSum + parseFloat(price) * parseFloat(proQuant);
      count = count + 1
    }


    //  console.log(totalSum);

    return totalSum;

  }

  

}


//Renders individual products and returns it to the product Items




// let productItem = new ProductsItem();
// productItem.renderProduct();
// renderUI();





new WebUI().renderUI();