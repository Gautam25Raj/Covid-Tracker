const navSlide = () => {
  const menu = document.querySelector('.hamburger');
  const nav = document.querySelector('.navigation');

  menu.addEventListener('click', () => {
    menu.classList.toggle('toggle');
    nav.classList.toggle('open');
  });
};

navSlide();
