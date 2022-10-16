'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `This Website is designed by Gokulraj. <button class = "btn btn--close--cookie"> Click OK to disapper </button>`;

header.prepend(message);
// header.append(message.cloneNode(true));

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function () {
  // const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // section1.scrollIntoView();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Working on Nav links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// Working on Tabs

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(tc => tc.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

// Hover the nav links

const nav = document.querySelector('.nav');

const mouseHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target.closest('.nav').querySelectorAll('.nav__link');

    const logo = e.target.closest('.nav').querySelector('.nav__logo');

    link.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', mouseHover.bind(0.5));
nav.addEventListener('mouseout', mouseHover.bind(1));

//nav scroll using eventlistner

// const getSectionAttributes = section1.getBoundingClientRect();
// console.log(getSectionAttributes);

// window.addEventListener('scroll', function () {
//   console.log(this.window.scrollY);
//   if (window.scrollY > getSectionAttributes.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//nav scroll using intersection observer
const getNavAttributes = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');
const stickynav = function (enteries) {
  const [entry] = enteries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observer = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-${getNavAttributes}px`,
});
observer.observe(header);

//Reveal Sections
const sectionAll = document.querySelectorAll('.section');
const revelSec = function (enteries, observer) {
  const [entry] = enteries;
  // console.log(entry);
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(revelSec, {
  root: null,
  threshold: 0.15,
});

sectionAll.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//load image

const allImg = document.querySelectorAll('img[data-src]');

const loadImg = function (enteries, observer) {
  const [entry] = enteries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `-200px`,
});

allImg.forEach(img => imgObserver.observe(img));

//slides
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
