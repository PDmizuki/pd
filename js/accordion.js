var $j = jQuery.noConflict();

(function ($) {
    $(document).ready(function () {
        // Your code here
        $(".accordion-wrap").on("click", function () {
            var accordionText = $(this).children().eq(1);
            accordionText.slideToggle(500);
            $(this).children().eq(0).toggleClass("accordion-no-bar");
            $(this).siblings().find(".accordion-header").removeClass("accordion-gold").removeClass("active");
            $(this).siblings().find(".accordion-header i").removeClass("rotate-fa");
            $(this).find(".accordion-header").toggleClass("accordion-gold").toggleClass("active");
            $(this).find(".fa").toggleClass("rotate-fa");
            $(".accordion-wrap .accordion-text").not(accordionText).slideUp(500);
        });

        $(".clickable").on("click", function () {
            $(this).toggleClass("rotated");
        });
    });
})(jQuery);
