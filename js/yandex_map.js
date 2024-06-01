const linkRestOnTheMap = document.querySelector(".rest_on_map");
const modalOverlay3 = document.querySelector('.modal_overlay_3');
const closeButton3 = document.querySelector(".close-button-3");

linkRestOnTheMap.addEventListener('click', () => {
    console.log('click')
    modalOverlay3.classList.add('modal_overlay--visible');
    document.querySelector('.modal_33').classList.add('modal_1--visible');
    document.body.classList.add('lock');
    changeMap();

})

window.onclick = function (event) {
    if (event.target == modalOverlay3) {
        modalOverlay3.classList.remove('modal_overlay--visible');
        document.body.classList.remove('lock');
    }
}

closeButton3.onclick = function () {
    modalOverlay3.classList.remove('modal_overlay--visible');
    document.body.classList.remove('lock');
}

let map_1 = document.querySelector('.map_1');
let map_2 = document.querySelector('.map_2');
map_1.innerHTML = "";
map_2.innerHTML = "";


function changeMap(){
    if(!(modalOverlay3.classList.contains('modal_overlay--visible'))) return;
    if (window.innerWidth > 900 && map_1.innerHTML == "") {
        map_1.innerHTML = `<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A9471a7de78889ac3f0dbdc65b638be5a0a93195c7d74dacc0fe653851f511a16&amp;source=constructor" width="800" height="600" frameborder="0"></iframe>`;
        map_2.innerHTML = "";
    }
    else if(window.innerWidth <= 900 && map_2.innerHTML == "") {
        map_1.innerHTML = "";
        map_2.innerHTML = `<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A9471a7de78889ac3f0dbdc65b638be5a0a93195c7d74dacc0fe653851f511a16&amp;source=constructor" width="320" height="400" frameborder="0"></iframe>`;
    }
}

window.addEventListener('resize', changeMap)


