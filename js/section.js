let isAnimating = false;

function showSection(sectionId) {
    if (isAnimating) return; // アニメーション中はクリックを無効化
    isAnimating = true;

    const currentSection = document.querySelector('.displayed-section');
    const nextSection = document.getElementById(sectionId);

    if (currentSection === nextSection) {
        isAnimating = false;
        return; // 同じセクションをクリックした場合は何もしない
    }

    // メニュー項目のアクティブ状態を更新
    updateActiveMenu(sectionId);

    // ステップ1: 表示中のセクションを縮小
    currentSection.classList.add('shrink');
    setTimeout(() => {
        // ステップ2: 表示中のセクションを左にスライドして非表示
        currentSection.classList.add('slide-left');
        setTimeout(() => {
            // ステップ3: 新しいセクションを右から縮小状態で中央へスライド
            nextSection.classList.remove('next-section');
            nextSection.classList.add('slide-center');
            setTimeout(() => {
                // ステップ4: 新しいセクションを拡大して表示
                nextSection.classList.remove('slide-center');
                nextSection.classList.add('displayed-section', 'expand');

                // アニメーションが完了したら不要なクラスを削除し、アニメーションフラグをリセット
                currentSection.classList.remove('displayed-section', 'shrink', 'slide-left');
                currentSection.classList.add('next-section');
                nextSection.classList.remove('expand');
                isAnimating = false;
            }, 380);
        }, 400);
    }, 380);
}

function updateActiveMenu(activeSectionId) {
    // すべてのメニューリンクのアクティブクラスをリセット
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'));

    // すべてのセクションの状態クラスをリセット
    document.querySelectorAll('section').forEach(section => section.classList.remove('active-section', 'next-section'));

    // 表示中のセクションに対応するリンクとセクションにクラスを追加
    const activeSection = document.getElementById(activeSectionId);
    const activeLink = document.getElementById('link-' + activeSectionId);

    if (activeSection) {
        activeSection.classList.add('active-section'); // 表示中のセクション
    }
    if (activeLink) {
        activeLink.classList.add('active'); // 表示中のリンク
    }

    // 次に表示されるセクション以外を `next-section` 状態にする
    document.querySelectorAll('section').forEach(section => {
        if (section !== activeSection) {
            section.classList.add('next-section');
        }
    });
}


const splide = new Splide('.splide');


splide.on('pagination:mounted', function (data) {
    // ULエレメントにクラスを追加できます
    data.list.classList.add('splide__pagination--custom');


    // `items`は、すべてのLI要素とボタン要素を保持しています
    data.items.forEach(function (item) {
        item.button.textContent = String(item.page + 1);
    });
});


splide.mount();