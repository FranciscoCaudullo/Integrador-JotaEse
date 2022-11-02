let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem(`cart`, JSON.stringify(cartList));
};

const renderCartProduct = (cartProduct) => {
	const { id, name, price, img, quantity } = cartProduct;
	return `
    <li id = "${id}">
    <img src="${img}" alt="item" />
    <div class="info-item">
        <h3>${name}</h3>
        <span>$${price}</span>
        <button id="btnBuy"
         data-button="buy" data-name="${name}" data-price="${price}" data-id="${id}" data-quantity =1 data-img="${img}"
         >Buy</button>
    </div>
</li>`;
};

const productData = (img, name, price, img) => {
	return { id, name, price, img };
};
const addProduct = (e) => {
	if (e.target.id == "btnBuy") {
		const { id, name, bid, img } = e.target.dataset;
		const product = productData(id, name, bid, img);
	}
};

listItems.addEventListener("click", (e) => detectItem(e));
