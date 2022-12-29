// Select Elements
const productsElement = document.querySelector('.products')
const cartsElement = document.querySelector('.cart-items')
const subtotalElement = document.querySelector('.subtotal')
const totalItemsInCart = document.querySelector('.total-items-in-cart')

const renderProducts = () => {
  products.forEach((product) => {
    productsElement.innerHTML += `
          <div class="item">
            <div class="item-container">
              <div class="item-img">
                <img src=${product.imgSrc} alt=${product.name} />
              </div>
              <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                ${product.description}
                </p>
              </div>
              <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list" />
              </div>
              <div class="add-to-cart">
                <img src="./icons/bag-plus.png" onClick="addToCart(${product.id})" alt="add to cart" />
              </div>
            </div>
        </div>
    `
  })
}

renderProducts()

// cart array
let cart = []

const addToCart = (id) => {
  // Check if the product is already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits('plus', id)
  } else {
    const item = products.find((product) => product.id === id)
    cart.push({
      ...item,
      numberOfUnits: 1
    })
    console.log(cart)
  }
  updateCart()
}

const updateCart = () => {
  renderCartItems()
  renderSubtotal()
}
// calculate and render subtotal
const renderSubtotal = () => {
  let totalPrice = 0,
    totalItems = 0

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits
    totalItems += item.numberOfUnits
  })
  subtotalElement.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )}`
  totalItemsInCart.textContent = totalItems
}

const renderCartItems = () => {
  cartsElement.innerHTML = '' // clear the cart element before adding the new one
  cart.forEach((item) => {
    cartsElement.innerHTML += `
          <div class="cart-item">
              <div class="item-info" onClick="removeItemFromCart(${item.id})">
                <img src=${item.imgSrc} alt=${item.name} />
                <h4>${item.name}</h4>
              </div>
              <div class="unit-price"><small>$</small>${item.price}</div>
              <div class="units">
                <div class="btn minus" onClick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onClick="changeNumberOfUnits('plus', ${item.id})">+</div>
              </div>
          </div>
      `
  })
}
// remove item from the cart
const removeItemFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id)

  updateCart()
}

// Change number of units for an item
const changeNumberOfUnits = (action, id) => {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits

    if (item.id === id) {
      if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--
      } else if (action === 'plus' && numberOfUnits < item.inStock) {
        numberOfUnits++
      }
    }

    return {
      ...item,
      numberOfUnits
    }
  })
  updateCart()
}
