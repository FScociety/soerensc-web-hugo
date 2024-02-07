
var slideIndex = 1;
showSlide(slideIndex);

function openLightbox() {
  document.getElementById('Lightbox').style.display = 'block';
}

function closeLightbox() {
  document.getElementById('Lightbox').style.display = 'none';
}

function changeSlide(n) {
	showSlide(slideIndex += n);
}

function toSlide(n) {
	showSlide(slideIndex = n);
}

function showSlide(n) {

  const slides = document.getElementsByClassName('slide');

  if (n > slides.length) {
    slideIndex = 1;	
  }
  
  if (n < 1) {
  	slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  
  slides[slideIndex - 1].style.display = 'block';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      changeSlide(-1); // Move to previous slide when left arrow key is pressed
    } else if (event.key === 'ArrowRight') {
      changeSlide(1); // Move to next slide when right arrow key is pressed
    } else if (event.key === "Escape") {
        closeLightbox();
    }
  });