jQuery.noConflict();
(function ($) {
    $(function () {
        // カードクリックイベント
        $(".card-wrapper").on("click", function () {
            const $thisCard = $(this);

            // 他のカードをリセット
            $(".card-wrapper").not($thisCard).each(function () {
                $(this).removeClass("active").css({
                    transform: "",
                    transition: "transform 0.5s ease",
                    zIndex: 1 // 非アクティブカードの z-index をリセット
                });
            });

            // クリックされたカードの状態を切り替え
            if ($thisCard.hasClass("active")) {
                // アクティブ状態を解除
                $thisCard.removeClass("active").css({
                    transform: "",
                    transition: "transform 0.25s ease",
                    zIndex: 1 // 非アクティブ状態の z-index に戻す
                });
            } else {
                // アクティブに設定
                $thisCard.addClass("active").css({
                    transition: "z-index 0.5s ease",
                    zIndex: 11 // アクティブ状態のカードを最前面に
                });

                // カードを中央に配置
                const windowWidth = $(window).width();
                const windowHeight = $(window).height();
                const cardWidth = $thisCard.outerWidth();
                const cardHeight = $thisCard.outerHeight();

                const cardOffset = $thisCard.offset();
                const centerX = (windowWidth / 3) - (cardWidth / 3);
                const centerY = (windowHeight / 2.5) - (cardHeight / 2.5);

                const translateX = centerX - cardOffset.left;
                const translateY = centerY - cardOffset.top;

                $thisCard.css({
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    transition: "transform 0.5s ease"
                });
            }
        });
    });
})(jQuery);
//修正