const bicycleProjectImages = [
  './assets/images/bicycle-shop1.png',
  './assets/images/bicycle-shop2.png',
  './assets/images/bicycle-shop3.png'
];

const fashionProjectImages = [
  './assets/images/fashionShop1.png',
  './assets/images/fashionShop2.png',
  './assets/images/fashionShop3.png'
];

const musicProjectImages = [
  './assets/images/musicweb1.png',
  './assets/images/musicweb2.png',
  './assets/images/musicweb3.png'
];

let currentIndex = 0;
let interval;

const imageElement1 = document.getElementById('project-image-slide-1');
const imageElement2 = document.getElementById('project-image-slide-2');
const imageElement3 = document.getElementById('project-image-slide-3');

imageElement1.src = bicycleProjectImages[0];
imageElement2.src = fashionProjectImages[0];
imageElement3.src = musicProjectImages[0];


function startSlideshow(imageElement, projectImages) {
  currentIndex = 0;
  interval = setInterval(() => {
    imageElement.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % projectImages.length;
      imageElement.src = projectImages[currentIndex];
      imageElement.classList.remove('fade-out');
      imageElement.classList.add('fade-in');
    }, 500);
  }, 2000);
}

function stopSlideshow() {
  clearInterval(interval);
}

imageElement1.addEventListener('mouseenter', ()=>startSlideshow(imageElement1, bicycleProjectImages));
imageElement2.addEventListener('mouseenter', ()=>startSlideshow(imageElement2,fashionProjectImages));
imageElement3.addEventListener('mouseenter', ()=>startSlideshow(imageElement3,musicProjectImages));
imageElement1.addEventListener('mouseleave', stopSlideshow);
imageElement2.addEventListener('mouseleave', stopSlideshow);
imageElement3.addEventListener('mouseleave', stopSlideshow);

function toggleMenu() {
  const moveMenu = document.querySelector("#hamburger-nav");
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  moveMenu.classList.toggle("open");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
  document.documentElement.classList.toggle('light-mode');
  modeSwitch.classList.toggle('active');
});
