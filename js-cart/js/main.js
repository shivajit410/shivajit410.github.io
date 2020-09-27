if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    var btnCount = removeCartItemButtons.length;
    for (var i = 0; i < btnCount; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var qunatityInputs = document.getElementsByClassName('cart-quantity-input');
    var qtyCount = qunatityInputs.length;
    for (var i = 0; i < qtyCount; i++) {
        var input = qunatityInputs[i]
        input.addEventListener('change', qunatityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    var cartButtonCount = addToCartButtons.length;
    for (var i = 0; i < cartButtonCount; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function qunatityChanged(event) {
    var input = event.target;
    if (isNaN(input).value || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imgSrc)
    updateCartTotal()

}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartRow.classList.add('cart-row')
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    cartItemCount = cartItemNames.length;
    for (var i = 0; i < cartItemCount; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Item already in the cart!')
            return
        }
    }
    cartRow.innerHTML = `
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
                                <span class="cart-item-title">${title}</span>
                            </div>
                            <span class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class="btn btn-danger" type="button">REMOVE</button>
                            </div>
                        `
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', qunatityChanged)
}

function purchaseClicked() {
    alert('Thank you for the purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    rowCount = cartRows.length;
    var total = 0;
    for (var i = 0; i < rowCount; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var qunatity = quantityElement.value
        total += (price * qunatity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total
}