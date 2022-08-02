import tabs from './modules/tabs';
import modal from './modules/modal';
import { openModal } from "./modules/modal";
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';
import forms from "./modules/forms";
window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);
	tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
	modal("[data-modal]", ".modal", modalTimerId);
	timer(".timer", "2022-10-1");
	cards();
	slider({
		container: ".offer__slider",
		slide: ".offer__slide",
		prevArrow: ".offer__slider-prev",
		nextArrow: ".offer__slider-next",
		tatalCounter: "#total",
		currentCounter: "#current",
		wrapper: ".offer__slider-wrapper",
		field: ".offer__slider-inner"
	});
	calculator();
	forms("form", modalTimerId);
});