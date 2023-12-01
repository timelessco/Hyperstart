$(document).ready(function() {
    //Page scroll add class name
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $(".site-header").addClass("header-overlay");
        } else {
            $(".site-header").removeClass("header-overlay");
        }
    });
});




//Thumnail carousal
function thumbCarousal() {
    const mainCarouselWrap = document.getElementById("main-carousel");
    const mainCarouselView = mainCarouselWrap.querySelector(".embla__viewport");
    const slides = mainCarouselView.querySelectorAll(".embla__slide");
    let delay = 4000;
    const mainCarousel = EmblaCarousel(
      mainCarouselView,
      {
        selectedClass: "",
        loop: true,
        skipSnaps: false,
        startIndex: 0,
        align: 'start',  
      },
      [
        EmblaCarouselAutoplay(
          {
            playOnInit: true,
            delay: delay,
          },
          (emblaRoot) => emblaRoot.parentElement
        ),
      ]
    );
  
    const thumbCarouselWrap = document.getElementById("thumb-carousel");
    const thumbCarouselView = thumbCarouselWrap.querySelector(".embla__viewport");
    const thumbCarousel = EmblaCarousel(
      thumbCarouselView,
      {
        selectedClass: "",
        containScroll: "keepSnaps",
        dragFree: false,
        startIndex: 0,
        slidesToScroll: 1,
        slidesInView: window.innerWidth < 768 ? 1 : 3,
      },
      [
        EmblaCarouselAutoplay(
          {
            playOnInit: true,
            delay: delay,
          },
          (emblaRoot) => emblaRoot.parentElement
        ),
      ]
    );
  
    const onThumbClick = (mainCarousel, thumbCarousel, index) => () => {
      mainCarousel.scrollTo(index);
    };
  
    const followMainCarousel = (mainCarousel, thumbCarousel) => () => {
      const currentSlideIndex = mainCarousel.selectedScrollSnap();
      thumbCarousel.scrollTo(mainCarousel.selectedScrollSnap());
      selectThumbBtn(mainCarousel, thumbCarousel);
      slides.forEach((slide) => {
        slide.classList.remove("is-current-slide");
      });
      slides[currentSlideIndex].classList.add("is-current-slide");
    };
    const selectThumbBtn = (mainCarousel, thumbCarousel) => {
        const selected = mainCarousel.selectedScrollSnap();
  
        console.log('Selected Slide:', selected);
  
        // Add 'is-selected' class to all thumbnails up to the clicked thumbnail
        for (let i = 0; i <= selected; i++) {
          thumbCarousel.slideNodes()[i].classList.add('is-selected');
        }
  
        // Remove 'is-selected' class from subsequent thumbnails
        for (let i = selected + 1; i < thumbCarousel.slideNodes().length; i++) {
          thumbCarousel.slideNodes()[i].classList.remove('is-selected');
        }
      };
  
    thumbCarousel.slideNodes().forEach((thumbNode, index) => {
      const onClick = onThumbClick(mainCarousel, thumbCarousel, index);
      thumbNode.addEventListener("click", onClick, false);
    });
  
    const syncThumbCarousel = followMainCarousel(mainCarousel, thumbCarousel);
    mainCarousel.on("select", syncThumbCarousel);
    thumbCarousel.on("init", syncThumbCarousel);
  }
  

  
  window.addEventListener("load", () => {
    thumbCarousal();
  });
  