window.addEventListener("DOMContentLoaded", () => {
	//Tabs
	const tabs = document.querySelectorAll(".tabheader__item"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabsParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = "none";
		});
		tabs.forEach(item => {
			item.classList.remove("tabheader__item_active");
		});
	}
	function showTabContent(i = 0) {
		tabsContent[i].style.display = "block";
		tabs[i].classList.add("tabheader__item_active");
	}
	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer

	const deadline = "2022-08-1";

	function getTimeRemaining(endTime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endTime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
		else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
				hours = Math.floor((t / (1000 * 60 * 60)) % 24),
				minutes = Math.floor((t / 1000 / 60) % 60),
				seconds = Math.floor((t / 1000) % 60);
		}

		return {
			"total": t,
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(".timer", deadline);
	//Modal 
	const modalBtns = document.querySelectorAll("[data-modal]"),
		modalWindow = document.querySelector(".modal");


	const modalTimerId = setTimeout(openModal, 50000);

	function openModal() {
		modalWindow.classList.add("show");
		modalWindow.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modalWindow.classList.add("hide");
		modalWindow.classList.remove("show");
		document.body.style.overflow = "";
	}
	modalBtns.forEach((btn) => {
		btn.addEventListener("click", openModal);

	});



	modalWindow.addEventListener("click", (e) => {
		if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
			closeModal();
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modalWindow.classList.contains("show")) {
			closeModal();
		}
	});
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);

	// Використовуєм класи для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.transfer = 36;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = +this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = "menu__item";
				element.classList.add(this.element);
			} else {
				this.classes.forEach(classesName => element.classList.add(classesName));
			}


			element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
			`;
			this.parent.append(element);
		}
	}
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню 'Фитнес'",
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		".menu .container",
		"menu__item",
	).render();
	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		"Меню “Премиум”",
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		".menu .container",
		"menu__item"
	).render();
	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		21,
		".menu .container",
		"menu__item"
	).render();

	//Forms

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "img/form/spinner.svg",
		success: "Дякую! Скоро ми вам зателефонуєм",
		failur: "Щось пішло не так..."
	};

	function postData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`;
			form.insertAdjacentElement("afterend", statusMessage);

			const request = new XMLHttpRequest();
			request.open("POST", "server.php");

			request.setRequestHeader("Content-type", "application/json");
			let formData = new FormData(form);

			const object = {};

			formData.forEach(function (value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener("load", () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();

					statusMessage.remove();

				} else {
					showThanksModal(message.failur);
				}
			});
		});
	}

	forms.forEach(item => {
		postData(item);
	});

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		prevModalDialog.classList.remove("show");
		openModal();

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");

		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
						<div class="modal__title">${message}</div>
			</div>
		`;
		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal();
		}, 4000);

	}
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: "POST",
		body: JSON.stringify({ name: "Alex" }),
		headers: {
			'Content-type': "application/json"
		}

	})
		.then(response => response.json())
		.then(json => console.log(json));
});