let counter = 0;//-1  6
showSlides(0);
function switchSlides(diff){
    counter += diff;
    showSlides(counter);
}

setInterval(() => showSlides(counter+=1), 3000)
function showSlides(n){
    counter = n;
    const slides = document.getElementsByClassName('slide');
    if(counter < 0){
        counter = slides.length - 1;
    }else if(counter === slides.length){
        counter = 0;
    }
    for (let index = 0; index < slides.length; index++) {
        slides[index].style.display = 'none';
    }
    slides[counter].style.display = 'flex';
}

class SlideShow {
    constructor() {
      this.counter = 0;
      this.slides = document.getElementsByClassName('slide');
      this.dots = document.getElementsByClassName('dot');
      this.intervalId = null;
    }
  
    start() {
      this.showSlides(this.counter);
      this.intervalId = setInterval(() => this.showSlides(this.counter += 1), 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
    }
  
    switchSlides(diff) {
      this.counter += diff;
      this.showSlides(this.counter);
    }
  
    showSlides(n) {
      this.counter = n;
      if (this.counter < 0) {
        this.counter = this.slides.length - 1;
      } else if (this.counter === this.slides.length) {
        this.counter = 0;
      }
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = 'none';
      }
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].classList.remove('active');
      }
      this.slides[this.counter].style.display = 'flex';
      this.dots[this.counter].classList.add('active');
    }
  
    showSlideByDot(index) {
      this.showSlides(index);
      this.counter = index;
    }
  }
  
  const slideShow = new SlideShow();
  slideShow.start();
  
  const dots = document.getElementsByClassName('dot');
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => slideShow.showSlideByDot(i));
  }
  