(function ($) {
    $(document).ready(function () {
        console.log("Document ready");

        $(".list-tab").click(function () {
            console.log("Tab clicked");
            var tabId = $(this).attr('id').replace('tab', '');
            console.log("Tab ID: " + tabId);

            $(".list-tab").removeClass('selected');
            $(this).addClass('selected');

            $(".container").removeClass('show');
            $("#content" + tabId).addClass('show');
        });

        // 初期状態でタブ1を選択
        $("#tab1").trigger("click");
    });
})(jQuery);
