jQuery.noConflict();

(function ($) {
    $(function () {
        var cursor = $("<div id='cursor'></div>");
        var stalker = $("<div id='stalker'></div>");
        $("body").addClass("custom-cursor").append(cursor).append(stalker);

        // すべての a タグにホバーアニメーションを動的に適用
        $(document).on("mouseenter", ".accordion-wrap , a , .card , .se-tab-w", function () {
            cursor.addClass('cursor--hover');
            stalker.addClass('stalker--hover');
        });

        $(document).on("mouseleave", ".accordion-wrap , a , .card , .se-tab-w", function () {
            cursor.removeClass('cursor--hover');
            stalker.removeClass('stalker--hover');
        });

        $(document).on("mousemove", function (e) {
            var x = e.clientX;
            var y = e.clientY;

            // カーソルの位置をマウスの位置に追従させる
            cursor.css({
                "opacity": "1",
                "top": y + "px",
                "left": x + "px"
            });

            // ストーカー要素を少し遅れて追従させる
            setTimeout(function () {
                stalker.css({
                    "opacity": "1",
                    "top": y + "px",
                    "left": x + "px"
                });
            }, 150); // 150ms遅延
        });

        // 初期状態で透明に設定
        cursor.css("opacity", "0");
        stalker.css("opacity", "0");
    });
})(jQuery);

//fade-in
document.addEventListener('DOMContentLoaded', function () {
    function fadeInOnScroll() {
        var fadeElements = document.querySelectorAll('.fade_bottom');

        fadeElements.forEach(function (element) {
            var rect = element.getBoundingClientRect();
            var elementTop = rect.top;
            var windowHeight = window.innerHeight;

            // 要素が画面の指定位置に到達したらクラスを追加
            var triggerPosition = windowHeight * 0.75; // 画面の50%位置に到達時に発火

            if (elementTop < triggerPosition) {
                element.classList.add('visible');
            }
        });
    }

    // スクロール時とページロード時にフェードインを実行
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();  // ページ読み込み時に一度実行
});
