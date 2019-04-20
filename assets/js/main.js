/// SIEMA SLIDER
var siemaSlider = null;
const siemaSliderPrev = document.querySelector(".prev");
const siemaSliderNext = document.querySelector(".next");

//setSiemaSlider("all");

function setSiemaSlider(selector){

    siemaSlider = new Siema({
        selector: `#field--${selector} .fieldDetails__list`,
        duration: 200,
        easing: 'ease-out',
        perPage: 4,
        draggable: false,
        threshold: 20,
        loop: true,
        rtl: false,
        onInit: () => {},
        onChange: () => {},
    });

    siemaSliderPrev.addEventListener('click', () => siemaSlider.prev());
    siemaSliderNext.addEventListener('click', () => siemaSlider.next());
}