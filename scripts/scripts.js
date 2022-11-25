function toggleMenu(event) {
	this.classList.toggle("is-active");
	menuHamburguer.classList.toggle("is_active");
	closeCartFun();
	event.preventDefault();
}
const closeMenu = () => {
	if (menuHamburguer.classList.contains("is_active")) {
		menuHamburguer.classList.remove("is_active");
	}
};

// Desestructura el item
const desestructuringItem = (elementToRender) => {
	const { name, price, id, img } = elementToRender;
	return `<li id = "${id}">
    <img src="${img}" alt="item" />
    <div class="info-item">
        <h3>${name}</h3>
        <span>$${price}</span>
        <button id="btnBuy" data-name="${name}" class="btn-add"
		data-price="${price}" data-id="${id}" data-img="${img}" data-quantity = 1>Buy</button>
    </div>
</li>`;
};

let randomNums = (arrayfor = []);
//se crean 12 numeros aleatorios
for (let i = 0; i < 6; i++) {
	let resultado = Math.floor(Math.random() * 21);
	if (!arrayfor.includes(resultado)) {
		arrayfor.push(resultado);
	} else {
		i--;
	}
}

const renderRandom = () => {
	listItems.innerHTML = "";
	newPopular = motherList.filter((objeto) => randomNums.includes(objeto.id));
	newPopular.map(
		(object) => (listItems.innerHTML += desestructuringItem(object))
	);
};
// renderiza el array
const render = (listOfItems) => {
	listItems.innerHTML = ``;
	listOfItems.map(
		(element) => (listItems.innerHTML += desestructuringItem(element))
	);
};

// detecta la categoria seleccionada y llama el render

const detectingClick = (e) => {
	const elementClicked = e.target.dataset.category;
	if (elementClicked == "popular") {
		renderRandom();
		return;
	}
	const filterList = motherList.filter(
		(element) => element.category == elementClicked
	);

	render(filterList);
	changeBtnActive(elementClicked);
};
// Resalta la categoria seleccionada
const changeBtnActive = (elementClicked) => {
	const categories = [...allCategories];
	categories.forEach((category) => {
		if (category.dataset.category !== elementClicked) {
			category.classList.remove("active");
			return;
		}
		category.classList.add("active");
	});
};
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (menuHamburguer.classList.contains("is_active")) {
		menuHamburguer.classList.remove("is_active");
	}
};
const closeCartFun = () => {
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
	}
};
const renderCartProduct = (cartProduct) => {
	const { id, name, price, img, quantity } = cartProduct;
	return `    
    <div class="cart-item" id="cart-item">
      <img src=${img} alt="Item in cart" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        
        <span class="item-price">$${price}</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" id="up" data-id=${id}>+</span>
      </div>
    </div>`;
};
const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add("disabled");
		return;
	}
	btn.classList.remove("disabled");
};
const renderCart = () => {
	// Si el carrito esta vacío
	if (!cart.length) {
		productsCart.innerHTML = `<p class="empty-msg"> No hay productos en el carrito. </p>`;
		return;
	}
	// Renderizamos lo que hay
	productsCart.innerHTML = cart.map(renderCartProduct).join("");
};

const getCartTotal = () => {
	return cart.reduce(
		(acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
		0
	);
};

const showTotal = () => {
	total.innerHTML = `$${getCartTotal().toFixed(2)}`;
};
const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};

const createCartProduct = (product) => {
	cart = [...cart, { ...product, quantity: 1 }];
};

const isExistingCartProduct = (product) => {
	return cart.find((item) => item.id === product.id);
};

const createProductData = (id, name, price, img) => {
	return { id, name, price, img };
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCart(cart);
	showTotal(cart);
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
};

const showSuccessModal = (msg) => {
	successModal.classList.add("active-modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active-modal");
	}, 1500);
};

const addProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) return;
	const { id, name, price, img } = e.target.dataset;

	const product = createProductData(id, name, price, img);

	//El producto exista en el carrito
	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
		showSuccessModal("Se agregó una unidad del producto al carrito");
	} else {
		//Que no exista el product
		createCartProduct(product);
		showSuccessModal("El producto se ha agregado al carrito");
	}
	checkCartState();
};

const substractProductUnit = (existingProduct) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === existingProduct.id
			? { ...cartProduct, quantity: cartProduct.quantity - 1 }
			: cartProduct;
	});
};

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id);
	checkCartState();
};

const handleMinusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id);

	if (existingCartProduct.quantity === 1) {
		if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
			removeProductFromCart(existingCartProduct);
		}
		return;
	}
	substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id);
	addUnitToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
	console.log("hola");

	if (e.target.classList.contains("down")) {
		handleMinusBtnEvent(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		handlePlusBtnEvent(e.target.dataset.id);
	}
	checkCartState();
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
	if (!cart.length) return;
	if (window.confirm(confirmMsg)) {
		resetCartItems();
		alert(successMsg);
	}
};
//
//
const completeBuy = () => {
	completeCartAction(
		"¿Desea completar su compra?",
		"La compra se ha realizado correctamente"
	);
};

const deleteCart = () => {
	completeCartAction(
		"¿Está seguro de que desea vaciar el carrito?",
		"No hay productos en el carrito"
	);
};

const init = () => {
	categoriesList.addEventListener("click", detectingClick);
	renderRandom();
	document.addEventListener("scroll", closeMenu);
	menuhamburguerIcon.addEventListener("click", toggleMenu);
	cartIcon.addEventListener("click", toggleCart);
	listItems.addEventListener("click", addProduct);
	checkCartState();
	buyBtn.addEventListener("click", completeBuy);
	deleteBtn.addEventListener("click", deleteCart);
	document.addEventListener("DOMContentLoaded", showTotal);
	closeMenuButton.addEventListener("click", toggleMenu);
	document.addEventListener("scroll", closeCartFun);
	closeCartButton.addEventListener("click", toggleCart);
	document.addEventListener("click", handleQuantity);
};

init();
