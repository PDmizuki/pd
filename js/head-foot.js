document.addEventListener("DOMContentLoaded", function () {
   // ヘッダーとフッターの読み込みと初期化
   function initializeHeaderFooter() {
       return Promise.all([
           fetch("header.html")
               .then(response => response.text())
               .then(headerData => {
                   document.getElementById("header-container").innerHTML = headerData;
               }),
           fetch("footer.html")
               .then(response => response.text())
               .then(footerData => {
                   document.getElementById("footer-container").innerHTML = footerData;
               })
       ]);
   }

   // サウンドトグルの初期化
   function initializeAudioToggle() {
       const toggleSwitch = document.getElementById('soundToggle');
       const backgroundAudio = document.getElementById('backgroundAudio');

       if (toggleSwitch && backgroundAudio) {
           toggleSwitch.addEventListener('change', function () {
               if (toggleSwitch.checked) {
                   backgroundAudio.play();
               } else {
                   backgroundAudio.pause();
                   backgroundAudio.currentTime = 0;
               }
           });
       } else {
           console.error('Toggle switch or background audio element not found');
       }
   }

   // 初期化プロセス
   initializeHeaderFooter().then(() => {
       // ヘッダー・フッターが読み込まれた後にオーディオトグルを初期化
       initializeAudioToggle();
   }).catch(error => {
       console.error("Error loading header or footer:", error);
   });

   // メニューの初期化
   function initializeMenu() {
       var $nav = document.getElementById('navArea');
       var $btn = document.querySelector('.toggle_btn');
       var $mask = document.getElementById('mask');
       var open = 'open';

       if ($btn && $mask) {
           $btn.addEventListener('click', function () {
               if (!$nav.classList.contains(open)) {
                   $nav.classList.add(open);
               } else {
                   $nav.classList.remove(open);
               }
           });

           $mask.addEventListener('click', function () {
               $nav.classList.remove(open);
           });
       } else {
           console.error('Menu button or mask not found');
       }
   }

   // メニュー初期化を呼び出し
   initializeMenu();

   // 画像の遅延読み込み
   const lazyImages = document.querySelectorAll('img[data-src]');
   lazyImages.forEach(function (img) {
       img.setAttribute('src', img.getAttribute('data-src'));
       img.onload = function () {
           img.removeAttribute('data-src');
       };
   });
});
