const $nav = document.getElementById('nav');
const $main = document.getElementById('main');
const navTop = $nav.offsetTop;

const stickyNav = event => {
  if (window.scrollY >= navTop) {    
    $nav.classList.add('sticky');
    $main.classList.add('sticky');
  } else {
    $nav.classList.remove('sticky');
    $main.classList.remove('sticky');
  }
}

window.addEventListener('scroll', stickyNav);