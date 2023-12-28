$(document).ready(function () {
  // Page scroll add class name
  $(window).scroll(function () {
    var scroll = $(window).scrollTop()
    if (scroll >= 100) {
      $('.site-header').addClass('header-overlay')
    } else {
      $('.site-header').removeClass('header-overlay')
    }
  })

//Faq Dropdpwn
var accordionParentClass = '.faq-list-wrapper';
var accordionQuestionClass = '.faq-list-wrapper';
var accordionContentClass = '.accordion-content';

// Close all accordions and hide content initially
$(accordionParentClass).each(function() {
  $(this).addClass('close');
  $(this).find(accordionContentClass).hide();
});

// Click event for accordion questions
$(accordionQuestionClass).click(function() {
  var faqClass = $(this).closest(accordionParentClass).attr('class');

  if (faqClass.indexOf('close') != -1) {
    // WHEN CLOSED
    $(accordionParentClass).find(accordionContentClass).slideUp('slow'); // CLOSE ALL
    $(accordionParentClass).addClass('close').removeClass('open'); // Set all faq as closed

    $(this).closest(accordionParentClass).removeClass('close');
    $(this).closest(accordionParentClass).addClass('open');
    $(this).closest(accordionParentClass).find(accordionContentClass).slideDown('slow');

  } else {
    $(this).closest(accordionParentClass).addClass('close');
    $(this).closest(accordionParentClass).removeClass('open');
    $(this).closest(accordionParentClass).find(accordionContentClass).slideUp('slow');
  }
});

// Trigger click on the first accordion to open it by default
$(accordionQuestionClass).first().trigger('click');


// toggleFooter
function toggleFooter(){
  $('.footer-list-item h5').on('click', function () {
      $('.footer-text').removeClass('open-list');
      $('.footer-list-item h5').removeClass('rotate');
      $(this).closest('.footer-list-item').find('.footer-text').toggleClass('open-list');
      $(this).closest('.footer-list-item').find('h5').toggleClass('rotate');
  });
} toggleFooter();

});




// Thumnail carousal
function thumbCarousal () {
  const mainCarouselWrap = document.getElementById('main-carousel')
  const mainCarouselView = mainCarouselWrap.querySelector('.embla__viewport')
  const prevBtn = document.querySelector('.embla__button--prev')
  const nextBtn = document.querySelector('.embla__button--next')
  let delay = 4000;

  const mainCarousel = EmblaCarousel(
    mainCarouselView,
    {
      selectedClass: '',
      loop: true,
      skipSnaps: false,
      startIndex: 0,
      align: 'start'
    },
    [
      EmblaCarouselAutoplay(
        {
          playOnInit: true,
          delay: delay
        },
        (emblaRoot) => emblaRoot.parentElement
      )
    ]
  )

  const thumbCarouselWrap = document.getElementById('thumb-carousel')
  const thumbCarouselView = thumbCarouselWrap.querySelector('.embla__viewport')
  const thumbCarousel = EmblaCarousel(
    thumbCarouselView,
    {
      selectedClass: '',
      containScroll: 'keepSnaps',
      dragFree: true,
      startIndex: 0,
      align: 'start',
      slidesInView: window.innerWidth < 768 ? 1 : 3
    },
    [
      EmblaCarouselAutoplay(
        {
          playOnInit: true,
          delay: delay
        },
        (emblaRoot) => emblaRoot.parentElement
      )
    ]
  )

  const onThumbClick = (mainCarousel, thumbCarousel, index) => () => {
    mainCarousel.scrollTo(index)
  }

  const followMainCarousel = (mainCarousel, thumbCarousel) => () => {
    const currentSlideIndex = mainCarousel.selectedScrollSnap()
    thumbCarousel.scrollTo(currentSlideIndex)
    selectThumbBtn(mainCarousel, thumbCarousel)
  }

  const selectThumbBtn = (mainCarousel, thumbCarousel) => {
    const selected = mainCarousel.selectedScrollSnap()

    for (let i = 0; i <= selected; i++) {
      thumbCarousel.slideNodes()[i].classList.add('is-selected')
    }

    for (let i = selected + 1; i < thumbCarousel.slideNodes().length; i++) {
      thumbCarousel.slideNodes()[i].classList.remove('is-selected')
    }
  }

  thumbCarousel.slideNodes().forEach((thumbNode, index) => {
    const onClick = onThumbClick(mainCarousel, thumbCarousel, index)
    thumbNode.addEventListener('click', onClick, false)
  })

  const syncThumbCarousel = followMainCarousel(mainCarousel, thumbCarousel)
  mainCarousel.on('select', syncThumbCarousel)
  thumbCarousel.on('init', syncThumbCarousel)

  const prev = () => {
    mainCarousel.scrollPrev()
    syncThumbCarousel()
  }

  const next = () => {
    mainCarousel.scrollNext()
    syncThumbCarousel()
  }

  prevBtn.addEventListener('click', prev)
  nextBtn.addEventListener('click', next)
}

window.addEventListener('load', () => {
  thumbCarousal()
})
