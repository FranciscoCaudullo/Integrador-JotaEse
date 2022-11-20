const listItems = document.getElementById("listItems");
const categoriesList = document.getElementById("categoriesList");
const allCategories = document.querySelectorAll(".category");
const menuhamburguerIcon = document.querySelector(".hamburger");
const menuHamburguer = document.querySelector(".menuppal");
const portada = document.getElementsByClassName("portada");
const cartIcon = document.querySelector(".cartIcon");
const cartMenu = document.querySelector(".cart");
const barsBtn = document.querySelector(".menu-label");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const btnLoad = document.querySelector(".btn-load");
const deleteBtn = document.querySelector(".btn-delete");
const successModal = document.querySelector(".add-modal");
const overlay = document.querySelectorAll(".overlay");
const barsMenu = document.querySelector(".navbar-list");
const closeMenuButton = document.getElementById("closeMenu");
const closeCartButton = document.getElementById("closeCart");

const photos = [
	"./assets/img/japan.jpg",
	"./assets/img/fua.jpg",
	"./assets/img/clean.webp",
	"./assets/img/cleanardo.webp",
];
const motherList = [
	{
		name: "Honey Milk",
		price: 474,
		id: 1,
		img: "./assets/items/item1.jpg",
		category: "kit",
	},
	{
		name: "Avocado",
		price: 522,
		id: 2,
		img: "./assets/items/item2.jpg",
		category: "kit",
	},
	{
		name: "Maersliv",
		price: 568,
		id: 3,
		img: "./assets/items/item3.jpg",
		category: "kit",
	},
	{
		name: "Kaiju",
		price: 568,
		id: 4,
		img: "./assets/items/item4.jpg",
		category: "kit",
	},
	{
		name: "Night Sakura",
		price: 458,
		id: 5,
		img: "./assets/items/item5.jpg",
		category: "kit",
	},
	{
		name: "Botanical",
		price: 976,
		id: 6,
		img: "./assets/items/item6.jpg",
		category: "kit",
	},
	{
		name: "Dots",
		price: 768,
		id: 7,
		img: "./assets/items/item7.jpg",
		category: "kit",
	},
	{
		name: "Tuzi",
		price: 546,
		id: 8,
		img: "./assets/items/item8.jpg",
		category: "kit",
	},
	{
		name: "Rain",
		price: 867,
		id: 9,
		img: "./assets/items/item9.jpg",
		category: "kit",
	},
	,
	{
		name: "Akko Lavender Purple",
		price: 345,
		id: 10,
		img: "./assets/switch/switch1.jpg",
		category: "switch",
	},
	{
		name: "Akko Rose Red",
		price: 456,
		id: 11,
		img: "./assets/switch/switch2.jpg",
		category: "switch",
	},
	{
		name: "Akko Jelly Black",
		price: 872,
		id: 12,
		img: "./assets/switch/switch3.jpg",
		category: "switch",
	},
	{
		name: "Akko Jelly Pink",
		price: 723,
		id: 13,
		img: "./assets/switch/switch4.jpg",
		category: "switch",
	},
	{
		name: "Akko Jelly Purple",
		price: 612,
		id: 14,
		img: "./assets/switch/switch5.jpg",
		category: "switch",
	},
	{
		name: "Jwick jwt T1 V2",
		price: 619,
		id: 15,
		img: "./assets/switch/switch6.jpg",
		category: "switch",
	},
	{
		name: "Black Coiled",
		price: 723,
		id: 16,
		img: "./assets/accesories/item1.jpg",
		category: "accesories",
	},
	{
		name: "Red Coiled",
		price: 939,
		id: 17,
		img: "./assets/accesories/item2.jfif",
		category: "accesories",
	},
	{
		name: "White Coiled",
		price: 821,
		id: 18,
		img: "./assets/accesories/item4.jfif",
		category: "accesories",
	},
	{
		name: "Light Green Coiled",
		price: 533,
		id: 19,
		img: "./assets/accesories/item6.png",
		category: "accesories",
	},
	{
		name: "Pink Coiled",
		price: 555,
		id: 20,
		img: "./assets/accesories/item7.jfif",
		category: "accesories",
	},
	{
		name: "Light Blue Coiled",
		price: 834,
		id: 21,
		img: "./assets/accesories/item5.jpg",
		category: "accesories",
	},
	{
		name: "Yoda",
		price: 705,
		id: 30,
		img: "./assets/keycap/item1.jpg",
		category: "keycap",
	},
	{
		name: "Winter",
		price: 824,
		id: 22,
		img: "./assets/keycap/item2.webp",
		category: "keycap",
	},
	{
		name: "Cat",
		price: 623,
		id: 23,
		img: "./assets/keycap/item3.webp",
		category: "keycap",
	},
	{
		name: "Mountain",
		price: 611,
		id: 24,
		img: "./assets/keycap/item4.webp",
		category: "keycap",
	},
	{
		name: "Sauron",
		price: 997,
		id: 25,
		img: "./assets/keycap/item5.jpg",
		category: "keycap",
	},
	{
		name: "Pokeball",
		price: 398,
		id: 26,
		img: "./assets/keycap/item6.jpg",
		category: "keycap",
	},
	{
		name: "Pikachu",
		price: 807,
		id: 27,
		img: "./assets/keycap/item7.jpg",
		category: "keycap",
	},
	{
		name: "Sauron's ring",
		price: 664,
		id: 28,
		img: "./assets/keycap/item8.jpg",
		category: "keycap",
	},
	{
		name: "Sandwich & Chesse",
		price: 865,
		id: 29,
		img: "./assets/keycap/item9.jpg",
		category: "keycap",
	},
	{
		name: "MK870 case and plate white",
		price: 432,
		id: 30,
		img: "./assets/craft/item1.webp",
		category: "craft",
	},
	{
		name: "Case and plate black",
		price: 662,
		id: 31,
		img: "./assets/craft/item2.jpg",
		category: "craft",
	},
	{
		name: "Case and plate ligthblue",
		price: 678,
		id: 32,
		img: "./assets/craft/item3.webp",
		category: "craft",
	},
	{
		name: "Violet Case",
		price: 456,
		id: 33,
		img: "./assets/craft/item4.jpg",
		category: "craft",
	},
	{
		name: "Black Case",
		price: 890,
		id: 34,
		img: "./assets/craft/item5.jpg",
		category: "craft",
	},
	{
		name: "White Case",
		price: 900,
		id: 35,
		img: "./assets/craft/item6.jpg",
		category: "craft",
	},
	{
		name: "Wood Case",
		price: 584,
		id: 36,
		img: "./assets/craft/item7.jfif",
		category: "craft",
	},
	{
		name: "Black Plate",
		price: 700,
		id: 37,
		img: "./assets/craft/item8.webp",
		category: "craft",
	},
	{
		name: "White Plate",
		price: 345,
		id: 38,
		img: "./assets/craft/item9.webp",
		category: "craft",
	},
	{
		name: "Black PCB",
		price: 723,
		id: 39,
		img: "./assets/craft/item10.jpg",
		category: "craft",
	},
	{
		name: "White PCB",
		price: 871,
		id: 40,
		img: "./assets/craft/item11.jpg",
		category: "craft",
	},
	{
		name: "Kit lubricant+tools",
		price: 545,
		id: 41,
		img: "./assets/craft/item12.jpg",
		category: "craft",
	},
];
