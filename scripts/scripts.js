// Desestructura el item
const desestructuringItem = (elementToRender) => {
	const { name, price, id, img } = elementToRender;
	return `<li id = "${id}">
    <img src="${img}" alt="item" />
    <div class="info-item">
        <h3>${name}</h3>
        <span>$${price}</span>
        <button id="btnBuy">Buy</button>
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
};

init();
