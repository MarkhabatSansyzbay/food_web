window.addEventListener("DOMContentLoaded", () => {

    //tabs

    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
            item.classList.add("fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("fade");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        } 

    });

    //timer

    const deadline = '2022-02-19';

    function getTimeRemaining(endtime) {
        const temp = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (temp / (1000 * 60 * 60 * 24)) ),
            hours = Math.floor( (temp / (1000 * 60 * 60)) % 24 ),
            minutes = Math.floor( (temp / (1000 * 60)) % 60 ),
            seconds = Math.floor( (temp / 1000) % 60 );

        return {
            'total' : temp,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setTimer(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '0';
                hours.innerHTML = '0';
                minutes.innerHTML = '0';
                seconds.innerHTML = '0';
            }
        }
    }

    setTimer('.timer', deadline);

    //modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');

    function openModal() {
        modalWindow.classList.add("show");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // clearInterval(modalTimerId);
    }

    function closeModal () {
        modalWindow.classList.remove("show");
        modalWindow.classList.add("hide");
        document.body.style.overflow = "";
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 15000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // использование классов для карточек

    class Card {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 429;
            this.changeToTenge();
            this.parent = document.querySelector(parentSelector);
        }

        changeToTenge () {
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> тг/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new Card(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new Card(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new Card(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();
});