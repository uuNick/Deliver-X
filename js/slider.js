var param = {
    loop: true,
    direction: 'horizontal',
    slidesPerView: 2,
    centeredSlides: false,
    speed: 500,
    freeMode: true,
    spaceBetween: 0,

    // keyboard: {
    //     enabled: true,
    //     onlyInViewport: true,
    // },

    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },

    mousewheel: {
        sensitivity: 0.8,
    },

    breakpoints:{
        901:{
            direction: "vertical",
            slidesPerView: 3,
            spaceBetween: 150,
            
        },
        300:{
            direction: 'horizontal',
            slidesPerView: 2,
            spaceBetween: 150,
        }
    }
}


const swiper_1 = new Swiper('.swiper_1', param)
const swiper_2 = new Swiper('.swiper_2', param)

