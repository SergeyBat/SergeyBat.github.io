/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import axios from 'axios';

// eslint-disable-next-line no-alert
let result = prompt('Укажите количество постов', 0);

const listItem = [
	{
		title: 'Aliquam pharetra vulputate',
		text: '	Vivamus est mauris, sollicitudin ut ipsum pharetra, porta rutrum turpis. Suspendisse sollicitudin quam eget condimentum posuere. In auctor vel mi porta commodo. Vestibulum mattis ringilla tempus. Etiam eu consectetur nisi. Aenean blandit sodales euismod. In hac habitasse platea dictumst.',
		url: '../src/img/image_background_mountains.png',
	},
	{
		title: 'Razer',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quis modi expedita veritatis dicta quisquam saepe officia, veniam fuga ut cum id quae velit amet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quis modi expedita veritatis dicta quisquam saepe officia, veniam fuga ut cum id quae velit amet.',
		url: '../src/img/Razer-BlackShark-poster.jpg',
	},
	{
		title: 'IMG Academy ',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quis modi expedita veritatis dicta quisquam saepe officia, veniam fuga ut cum id quae velit amet.',
		url: '../src/img/helpbox-contact.jpg',
	},

];
const sliderTrack = document.querySelector('.slider-tack');

const buttonPrevSlide = document.querySelector('.slidePrev');
const buttonNextSlide = document.querySelector('.slideNext');

function addSlides(list) {
	list.forEach((e, index) => {
		const div = document.createElement('div');
		div.className = 'slide billboard animate__animated animate__fadeInLeftBig';
		if (index === 0) {
			div.dataset.visible = 'true';
		} else {
			div.dataset.visible = 'false';
		}
		div.style.backgroundImage = `url(${e.url})`;
		div.style.backgroundColor = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))';
		div.style.backgroundRepeat = 'no-repeat';
		div.style.backgroundSize = '100% 100%';
		div.innerHTML = `
				<h1 class="billboard__title text_color_yellow">
								${e.title}
							</h1>
							<div class="billboard-description">
								<p class="billboard-description__text text text-size-m text_color_white">
									${e.text}
								</p>
								<button class="billboard-description__button button"> Read more</button>
							</div>
	`;
		sliderTrack.append(div);
	});
}

addSlides(listItem);

buttonPrevSlide.addEventListener('click', () => {
	const slides = [...document.querySelectorAll('.slide')];

	const currentSlide = slides.findIndex((item) => item.dataset.visible === 'true') + 1;
	if (currentSlide === 1) {
		slides[slides.length - 1].dataset.visible = 'true';
		slides[currentSlide - 1].dataset.visible = 'false';
	} else {
		slides[currentSlide - 2].dataset.visible = 'true';
		slides[currentSlide - 1].dataset.visible = 'false';
	}
});

buttonNextSlide.addEventListener('click', () => {
	const slides = [...document.querySelectorAll('.slide')];
	const currentSlide = slides.findIndex((item) => item.dataset.visible === 'true') + 1;
	if (currentSlide === slides.length) {
		slides[0].dataset.visible = 'true';
		slides[currentSlide - 1].dataset.visible = 'false';
	} else {
		slides[currentSlide].dataset.visible = 'true';
		slides[currentSlide - 1].dataset.visible = 'false';
	}
});
const url = `https://baconipsum.com/api/?type=meat-and-filler&paras=${result}&format=json`;
async function doGetRequest() {
	const res = await axios.get(`${url}`);
	const { data } = res;
	return data;
}
result = Number(result);
if (/\d+/.test(result) && result !== 0 && result !== undefined) {
	const posts = document.querySelector('.posts');
	doGetRequest().then((data) => {
		let themeLinePrev = 'title_theme_line_primary';
		let themeLine = 'title_theme_line_primary';
		let link = '<button class="post-description__text-bottom text_size_s read-more__button">Read more...</button>';
		let str = '';
		let text = '';
		// eslint-disable-next-line no-useless-escape
		const reg = /^.{0,425}[\s!,\.\\\/]/m;
		data.forEach((e, index) => {
			const post = document.createElement('div');
			post.className = 'post';
			if (index === 0) {
				themeLine = 'title_theme_line_primary';
			} else if (index % 2 === 0) {
				themeLine = themeLinePrev;
			} else if (index % 2 === 1 && themeLinePrev === 'title_theme_line_primary') {
				themeLine = 'title_theme_line_yellow';
			} else if (index % 2 === 1 && themeLinePrev === 'title_theme_line_yellow') {
				themeLine = 'title_theme_line_primary';
			}
			if (e.length >= 425) {
				const masReg = e.match(reg);
				// eslint-disable-next-line prefer-destructuring
				str = masReg[0];
				// eslint-disable-next-line no-useless-escape
				if (/\W+$/g.test(str)) {
					const partReplace = str.match(/\W+$/g);
					str.slice(-partReplace[0].length);
					text = `${str}...`;
				}
				link = '<button class="post-description__text-bottom text_size_s read-more__button">Read more...</button>';
			} else {
				text = e;
				link = '';
			}
			post.innerHTML = `
						<h2 class="post__title title title_theme_line ${themeLine} text_weight_l">ABOUT SUPER LOGO</h2>
						<div class="information-block">
							<div class="post-image-wrapper">
								<img class="post__image" src="src/img/image_${Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0))) + Math.ceil(0)}.png" alt="img">
							</div>
							<div class="post-description">
								<p id='${index}' class="post-description__text text text_size_s">${text}</p>
								${link}
							</div>
						</div>`;
			posts.append(post);
			themeLinePrev = themeLine;
		});
		const readMoreButton = document.querySelectorAll('.read-more__button');
		readMoreButton.forEach((e) => {
			e.addEventListener('click', () => {
				const { id } = e.parentNode.firstElementChild;
				e.parentNode.firstElementChild.textContent = data[id];
				e.remove();
			});
		});
	});
}
