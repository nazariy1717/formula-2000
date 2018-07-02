let front = {

    hamburger: $('.hamburger'),
    nav: $('.header__list'),

    slider_options_default: {
        wrapAround: true,
        pageDots: false,
        prevNextButtons: true,
        autoPlay: true,
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true
    },

    init: function () {
        this.events();
    },

    newSlider: function (selector, options) {
        options = (options !== undefined) ? Object.assign({}, this.slider_options_default, options) : this.slider_options_default;
        // let carousel = new Flickity(document.querySelector(selector), options);
        return new Flickity(document.querySelector(selector), options);
    },




    toogleNav: function(){
        if (!this.hamburger.hasClass('is-active')) {
            this.hamburger.addClass("is-active");
            this.nav.slideToggle();
        }
        else {
            this.hamburger.removeClass("is-active");
            this.nav.slideToggle();
        }
    },






    events: function () {
        let self = this;

        $(document).on('click', '.hamburger', function () {
            self.toogleNav();
        });

        $('.js-scrollLink').on('click', function (e) {
            e.preventDefault();
            let target = this.hash;
            let $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top -80
            }, 500, 'swing');
        });

        $(document).on('click', '.header-drop__btn', function () {
            self.toggleHeaderDrop();
        });
        $(document).on('click', '.playlist-drop__btn', function () {
            self.togglePlaylistDrop();
        });

        $(document).on('click', '.js-panel-head', function () {

            if($(this).closest('.js-panel').hasClass('js-active')){
                $(this).closest('.js-panel').find('.js-panel-content').slideUp(function(){
                    $(this).closest('.js-panel').removeClass('js-active');
                });
            } else {
                $(this).closest('.js-panel').find('.js-panel-content').slideDown(function(){
                    $(this).closest('.js-panel').addClass('js-active');
                });
            }

        });


        window.onclick = function (event) {
            if (!event.target.matches('.header-drop__btn')) {
                let dropdowns = document.getElementsByClassName("header-drop");
                for (let i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('is-active')) {
                        openDropdown.classList.remove('is-active');
                    }
                }
            } else if (!event.target.matches('.playlist-drop__btn')) {
                let dropdowns = document.getElementsByClassName("playlist-drop");
                for (let i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('is-active')) {
                        openDropdown.classList.remove('is-active');
                    }
                }
            }

        };



        $(document).on('click', '.spin__button-plus', function () {

            let $input = $(this).parent().find('input');
            let inputValue = $(this).parent().find('input').val();
            inputValue++;
            if(inputValue > 0){
                $(this).parent().find('.spin__button-minus').removeAttr('disabled');
            }
            $input.val(inputValue);

        });

        $(document).on('click', '.spin__button-minus', function () {
            let $input = $(this).parent().find('input');
            let inputValue = $(this).parent().find('input').val();
            if(inputValue == 0){
                $(this).attr('disabled')
            } else {
                inputValue--;
            }
            $input.val(inputValue);
        });

        $(document).on('click', '.sidebar-keywords__btn', function () {
            $(this).closest('.sidebar-keywords').toggleClass('js-active');
        });

        $(document).on('click', '.dashboard__toggle-btn', function () {
            $(this).toggleClass('js-active');
            $(this).parent().parent().find('.dashboard-sidebar').slideToggle();
        });



    }
};



let modal = {
    closeButton: $('.modal__close'),
    closeOverlay: $('.modal'),
    can: 1,
    init: function () {
        this.events();
    },
    openModal: function (id) {
        let modalWindow = $(id);
        modalWindow.fadeIn();
        modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');
    },

    closeModal: function (id) {
        let modalWindow = $(id);
        modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
        modalWindow.fadeOut();
    },

    events: function () {

        $(document).on('click', '.modalTrigger', function (e) {
            e.preventDefault();
            let self = $(this),
                target = self.attr('data-modal');
            modal.openModal(target);

        });

        $(document).on('click', '.modal', function (event) {
            let self = '#' + $(this).attr('id');
            if (event.target.className == 'modal__body') {
                modal.closeModal(self);
            }
        });

        $(document).on('click', '.modal__close', function () {
            let self = '#' + $(this).closest('.modal').attr('id');
            modal.closeModal(self);
        });




    }
};



jQuery(function () {
    front.init();
    modal.init();
});