window.addEventListener('DOMContentLoaded', function () {

	//Бургер

	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.tabl');
	const body = document.body;
	const reset = document.querySelector('.reset')
	const menuLinks = document.querySelectorAll('.header__top-link');

	burger.addEventListener('click', (e) => {
	  menu.classList.toggle('tabl--active');
	});

	reset.addEventListener('click', (e) => {
	  menu.classList.toggle('tabl--active');
	});

	menuLinks.forEach(el => {
	  el.addEventListener('click', (e) => {
		menu.classList.remove('tabl--active');
	  });
	});

	/*Инпут-лупа 768*/

	if (window.innerWidth <= 1000) {
	  //let input = document.getElementsByClassName('header__bottom-search-input')[0];
	  let input = document.getElementsByClassName('search-form')[0];


	  document.querySelector('#search').addEventListener('click', function () {
		input.classList.add('show');
		document.querySelector('#close').classList.add('show');
		input.focus();
	  });

	  document.querySelector('#close').addEventListener('click', function () {
		input.classList.remove('show');
		document.querySelector('#close').classList.remove('show');
	  });

	}

	//Инпут "Cтудия"

	new JustValidate('.studio__subscr-form', {
	  colorWrong: '#F06666',
	  rules: {
		mail: {
		  required: true,
		  email: true,
		},
	  },
	  messages: {
		mail: 'Недопустимый формат',
	  },
	});

	//Слайдер "Проекты"

	const swiper = new Swiper('.project__slider-container', {
	  slideClass: 'project__slide',
	  wrapperClass: "project__swiper-wrapper",
	  loop: true,
	  pagination: {
		el: ".pagination",
		clickable: true,
		renderBullet: function (index, className) {
		  return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	  },
	});

	//Табы "Услуги студии"
	document.querySelectorAll('.service__nav-item-btn').forEach(function (tabsItem) {
	  tabsItem.addEventListener('click', function (event) {
		const path = event.currentTarget.dataset.path;
		document.querySelectorAll('.tab-content').forEach(function (tabContent) {
		  //tabContent.classList.remove('service__block-active');
		  tabContent.classList.remove('tab-content-active');
		})
		document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
	  })
	})

	const firstTab = document.querySelectorAll("[data-path='one']")[0];
	const secondTab = document.querySelectorAll("[data-path='two']")[0];
	const firstTabC = document.querySelectorAll(".service__nav-item-step")[0];
	const secondTabC = document.querySelectorAll(".service__nav-item-step")[1];
	let switched = false;

	firstTab.addEventListener('click', function (event) {
	  const path = event.currentTarget.dataset.path;
	  if (switched) {
		secondTab.classList.toggle('btn-selected');
		firstTab.classList.toggle('btn-selected');
		secondTabC.classList.toggle('li-selected');
		firstTabC.classList.toggle('li-selected');
		switched = false;
	  }
	});

	secondTab.addEventListener('click', function (event) {
	  const path = event.currentTarget.dataset.path;
	  if (!switched) {
		secondTab.classList.toggle('btn-selected');
		firstTab.classList.toggle('btn-selected');
		secondTabC.classList.toggle('li-selected');
		firstTabC.classList.toggle('li-selected');
		switched = true;
	  }
	});

	secondTab.addEventListener('click', function () {
	  secondTab.blur();
	});


	//Информация на карте "Контакты"

	document.querySelector('#reset').addEventListener('click', function () {
	  document.querySelector('#descr').classList.toggle('descr-none')
	});

	//Карта "Контакты"

	ymaps.ready(init);

	function init() {
	  var myMap = new ymaps.Map('map', {
		center: [55.76938256898189, 37.638521000000004],
		zoom: 15
	  });

	  var myGeoObject = new ymaps.GeoObject({
		geometry: {
		  type: "Point", // тип геометрии - точка
		  coordinates: [55.76938256898189, 37.638521000000004] // координаты точки
		}
	  });

	  var myPlacemark = new ymaps.Placemark([55.76938256898189, 37.638521000000004], {}, {
		iconLayout: 'default#image',
		iconImageHref: 'img/contacts/map.svg',
		iconImageSize: [12, 12],
		iconImageOffset: [-3, -42]
	  });

	  myPlacemark.events.add('click', function () {
		document.querySelector('#descr').classList.remove('descr-none')
	  });

	  myMap.geoObjects.add(myPlacemark);
	}

	//Инпуты "Контакты"

	new JustValidate('.contacts__right-form', {
	  colorWrong: '#F06666',
	  rules: {
		name: {
		  required: true,
		  minLength: 2,
		  maxLength: 11,
		  strength: {
			custom: '^[А-Я][а-я]'
		  }
		},

		mail: {
		  required: true,
		  email: true,
		},
	  },
	  messages: {
		mail: 'Недопустимый формат',
		name: 'Недопустимый формат',
	  },
	});
  })
