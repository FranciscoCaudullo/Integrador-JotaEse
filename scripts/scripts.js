function toggleMenu(event) {
	this.classList.toggle("is-active");
	menuHamburguer.classList.toggle("is_active");
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

const init = () => {
	categoriesList.addEventListener("click", detectingClick);
	renderRandom();
	document.addEventListener("scroll", closeMenu);
	menuhamburguerIcon.addEventListener("click", toggleMenu);
	cartIcon.addEventListener("click", toggleCart);
	listItems.addEventListener("click", addProduct);
	checkCartState();
	deleteBtn.addEventListener("click", deleteCart);
	document.addEventListener("DOMContentLoaded", showTotal);
};

init();
