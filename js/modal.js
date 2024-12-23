// jQuery の競合を避ける方法 (noConflict を利用)
jQuery.noConflict();
(function ($) {
    $(function () {
        // モーダルを開く関数
        function openModal(modalId) {
            $("#" + modalId).addClass("show");
            $(".modal-overlay").addClass("show");
        }

        // モーダルを閉じる関数
        function closeModal() {
            $(".modal").removeClass("show");
            $(".modal-overlay").removeClass("show");
        }

        // ボタンをクリックしてモーダルを開く
        $(".button").on("click", function (e) {
            e.preventDefault(); // デフォルト動作を無効化
            const modalId = $(this).data("modal");
            openModal(modalId);
        });

        // モーダルの背景や閉じるボタンをクリックして閉じる
        $(".modal-overlay, .close").on("click", function () {
            closeModal();
        });
    });
})(jQuery);