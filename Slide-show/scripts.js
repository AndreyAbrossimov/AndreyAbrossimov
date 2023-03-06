let counter = 0;

function switchSlides(diff){
    counter+=diff;
    showSlides(counter);
}

function showSlides(n){
    counter = n;
    const slides = document.getElementsByClassName('slide');
    if(counter <0){
        counter = slides.length - 1;
    }
    else  if(counter === slides.length){
        counter = 0;
    }
    for (let index = 0; index<slides.length; index++){
        slides[index].style.display = 'none';
    }
    slides[counter].style.display = 'flex';
    console.log(slides[n]);

}
showSlides(0);