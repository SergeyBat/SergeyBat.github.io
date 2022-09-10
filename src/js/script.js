/* eslint-disable no-tabs */
/* eslint-disable no-undef */
const listItem = [
	{
		title: 'Aliquam pharetra vulputate',
		text: '	Vivamus est mauris, sollicitudin ut ipsum pharetra, porta rutrum turpis. Suspendisse sollicitudin quam eget condimentum posuere. In auctor vel mi porta commodo. Vestibulum mattis ringilla tempus. Etiam eu consectetur nisi. Aenean blandit sodales euismod. In hac habitasse platea dictumst.',
		url: './assets/image/image_background_mountains.png',
	},
	{
		title: 'Razer',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quis modi expedita veritatis dicta quisquam saepe officia, veniam fuga ut cum id quae velit amet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quis modi expedita veritatis dicta quisquam saepe officia, veniam fuga ut cum id quae velit amet.',
		url: './assets/image/Razer-BlackShark-poster.jpg',
	},
	{
		title: 'IMG Academy ',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quis modi expedita veritatis dicta quisquam saepe officia, veniam fuga ut cum id quae velit amet.',
		url: './assets/image/helpbox-contact.jpg',
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
