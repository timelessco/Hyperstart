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



    addAndRemoveClassOneByOne();




});

 // Function to add and remove a class to each div one by one
 const addAndRemoveClassOneByOne = () => {
  let currentIndex = 0;

  const addClass = () => {
    console.log("currentIndex > 0",currentIndex > 0)
    // Add class to the current div
    $('.clm-list-content:eq(' + currentIndex + ')').addClass('clm-list-selected');

    // Remove class from the previous div (if not the first div)
    if (currentIndex > 0) {
      $('.clm-list-content:eq(' + (currentIndex - 1) + ')').removeClass('clm-list-selected');
    }

    currentIndex++;

    // Reset to the first div if reached the last div
    if (currentIndex >= $('.clm-list-content').length) {
      currentIndex = 0;
    }

    // Call the function recursively with a time interval
    setTimeout(addClass, 2000); // Add a class every 2000 milliseconds (2 seconds) interval
  };

  // Call the function initially
  addClass();
};



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
  
        for (let i = 0; i <= selected; i++) {
          thumbCarousel.slideNodes()[i].classList.add('is-selected');
        }
  
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
  



  var Cards = document.querySelectorAll("#cardList > div");
document.addEventListener("DOMContentLoaded", function () {
  currentHighlight = 0;
  const N = 3; // interval in seconds
  function changeActiveState() {
    currentHighlight = (currentHighlight + 1) % Cards.length;
    for (var i = 0; i < Cards.length; i++) {
      Cards[i].classList.remove("active");
    }
    // console.log("this ", currentHighlight)
    Cards[currentHighlight].classList.add("active");
  }
  setInterval(changeActiveState, N * 1000);
});

function hoverActiveState () {
    Cards[i].classList.add('dropdown-show');
}

for (var i = 0; i < Cards.length; i++) {
    Cards.addEventListener('mouseenter', hoverActiveState)
}