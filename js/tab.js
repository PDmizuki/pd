jQuery(document).ready(function ($) {
    class StickyNavigation {
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 0;
            this.offsetAdjust = 0; // 調整用のオフセット変数
            this.init();
        }

        init() {
            let self = this;
            $('.tab').click(function (event) {
                self.onTabClick(event, $(this));
            });
            $(window).scroll(() => {
                this.onScroll();
            });
            $(window).resize(() => {
                this.onResize();
            });
            this.onScroll();
        }

        onTabClick(event, element) {
            event.preventDefault();
            let target = $(element.attr('href'));
            if (target.length) {
                let scrollTop = target.offset().top - this.tabContainerHeight + 1 + this.offsetAdjust;
                // アニメーションの速度を500msに設定
                $('html, body').animate({ scrollTop: scrollTop }, 500, () => {
                    // アニメーション完了後に強制的にスクロールイベントをトリガー
                    this.updateTabPosition();
                });
            }
        }

        onScroll() {
            this.checkTabContainerPosition();
            this.findCurrentTabSelector();
        }

        onResize() {
            if (this.currentId) {
                this.setSliderCss();
            }
        }

        checkTabContainerPosition() {
            let offset = $('.tabs').offset().top + $('.tabs').height() - this.tabContainerHeight + this.offsetAdjust;
            if ($(window).scrollTop() > offset) {
                $('.tabs-container').addClass('tabs-container--top');
            } else {
                $('.tabs-container').removeClass('tabs-container--top');
            }
        }        

        findCurrentTabSelector() {
            let newCurrentId;
            let newCurrentTab;
            let self = this;
            $('.tab').each(function () {
                let id = $(this).attr('href');
                let target = $(id);
                if (target.length) {
                    let offsetTop = target.offset().top - self.tabContainerHeight + self.offsetAdjust;
                    let offsetBottom = target.offset().top + target.height() - self.tabContainerHeight + self.offsetAdjust;
                    if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                        newCurrentId = id;
                        newCurrentTab = $(this);
                    }
                }
            });
            if (this.currentId !== newCurrentId || this.currentId === null) {
                this.currentId = newCurrentId;
                this.currentTab = newCurrentTab;
                this.setSliderCss();
            }
        }

        setSliderCss() {
            if (this.currentTab) {
                // 幅を正確に取得
                let width = this.currentTab.outerWidth();
                // タブの左からの位置を取得
                let left = this.currentTab.position().left;
                
                // タブスライダーのCSSを設定
                $('.tab-slider').css({
                    width: width,  // 高さではなく幅を設定
                    left: left     // leftの位置を設定
                });
            }
        }

        updateTabPosition() {
            // 強制的にスクロールイベントをトリガーしてバーの位置を更新
            $(window).scroll();
        }
    }

    new StickyNavigation();
});
