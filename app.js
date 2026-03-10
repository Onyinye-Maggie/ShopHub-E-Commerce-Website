window.addToCart = function(id){
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  const product = products.find(p => p.id == id)

  if(!product) return

  const exist = cart.find(i => i.id == id)

  if(exist){
    exist.qty++
  } else {
    cart.push({...product, qty:1})
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  renderCart()
}
document.addEventListener("DOMContentLoaded", () => {

const products = [
{
id:1,
name:"Running Sneakers",
price:65,
image:"https://images.unsplash.com/photo-1661605813204-8c7662c1a5f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJ1bm5pbmclMjBzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D"
},
{
id:2,
name:"Travel Backpack",
price:45,
image:"https://images.unsplash.com/photo-1673505705824-e6abaa279c97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYXZlbCUyMGJhY2twYWNrfGVufDB8fDB8fHww"
},
{
id:3,
name:"Luxury Watch",
price:120,
image:"https://images.unsplash.com/photo-1634140704051-58a787556cd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMHdhdGNofGVufDB8fDB8fHww"
},
{
id:4,
name:"Wireless Headphones",
price:90,
image:"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww"
},
{
id:5,
name:"Fashion Handbag",
price:100,
image:"https://images.unsplash.com/photo-1566150902887-9679ecc155ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhbmRiYWd8ZW58MHx8MHx8fDA%3D"
}
]
/* ---------------- CART ---------------- */
window.getCart = function(){
  return JSON.parse(localStorage.getItem("cart")) || []
}

window.saveCart = function(cart){
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  renderCart()
}

window.updateCartCount = function(){
  const count = document.getElementById("cart-count")
  if(!count) return
  const cart = getCart()
  count.innerText = cart.reduce((a,b)=>a+b.qty,0)
}

/* ---------------- ADD TO CART ---------------- */
window.addToCart = function(id){
  const cart = getCart()
  const product = products.find(p => p.id == id)
  if(!product) return
  const exist = cart.find(i => i.id == id)
  if(exist){
    exist.qty++
  } else {
    cart.push({...product, qty:1})
  }
  saveCart(cart)
}

/* ---------------- CART SIDEBAR ---------------- */
window.toggleCart = function(){
  const sidebar = document.getElementById("cart-sidebar")
  if(sidebar) sidebar.classList.toggle("open")
}

/* ---------------- RENDER CART ---------------- */
window.renderCart = function(){
  const cart = getCart()
  const container = document.getElementById("cart-items")
  if(!container) return
  container.innerHTML=""
  let total = 0
  cart.forEach(item=>{
    total += item.price * item.qty
    container.innerHTML += `
      <div class="cart-item">
        <p>${item.name}</p>
        <p>${item.qty} x $${item.price}</p>
      </div>
    `
  })
  const totalEl = document.getElementById("cart-total")
  if(totalEl) totalEl.innerText = total
}

/* ---------------- RENDER PRODUCTS ON MAIN PAGE ---------------- */
const productList = document.getElementById("product-list")
if(productList){
  productList.innerHTML=""
  products.forEach(product=>{
    productList.innerHTML += `
      <div class="product">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}">
        </a>
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id}); renderCart(); updateCartCount();">Add to Cart</button>
      </div>
    `
  })
}

/* ---------------- PRODUCT PAGE ---------------- */
const params = new URLSearchParams(window.location.search)
const productId = params.get("id")
if(productId){
  const product = products.find(p => p.id == productId)
  if(product){
    const img = document.getElementById("product-image")
    const name = document.getElementById("product-name")
    const price = document.getElementById("product-price")
    const button = document.getElementById("add-to-cart")
    if(img) img.src = product.image
    if(name) name.innerText = product.name
    if(price) price.innerText = "$"+product.price
    if(button){
      button.addEventListener("click", () => {
        addToCart(product.id)
        renderCart()
        updateCartCount()
      })
    }
  }
}

/* ---------------- CHECKOUT ---------------- */
window.checkout = function(){
  alert("Payment successful!")
  localStorage.removeItem("cart")
  renderCart()
  updateCartCount()
}

/* ---------------- DARK MODE ---------------- */
const toggle = document.getElementById("dark-toggle")
if(toggle){
  if(localStorage.getItem("darkMode")==="true"){
    document.body.classList.add("dark")
    toggle.checked = true
  }
  toggle.addEventListener("change", ()=>{
    document.body.classList.toggle("dark")
    localStorage.setItem("darkMode", document.body.classList.contains("dark"))
  })
}

/* ---------------- INITIALIZE ---------------- */
updateCartCount()
renderCart()

})