document.addEventListener("DOMContentLoaded", function () {
   // メニューの初期化関数
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

   // 画像の遅延読み込み
   var lazyImages = document.querySelectorAll('img[data-src]');
   lazyImages.forEach(function (img) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function () {
         img.removeAttribute('data-src');
      };
   });

   // ヘッダーとフッターの読み込みと初期化
   fetch("header.html")
      .then(response => response.text())
      .then(headerData => {
         document.getElementById("header-container").innerHTML = headerData;
         initializeMenu();
      });

   fetch("footer.html")
      .then(response => response.text())
      .then(footerData => {
         document.getElementById("footer-container").innerHTML = footerData;
      });

   // ドラッグ機能
   const img = document.getElementById("menu-img");
   if (img) {
      img.style.position = "absolute";
      img.style.cursor = "grab";

      let isDragging = false;
      let offsetX, offsetY;

      img.addEventListener("mousedown", (e) => {
         e.preventDefault();
         isDragging = true;
         img.style.cursor = "grabbing";
         offsetX = e.clientX - img.getBoundingClientRect().left;
         offsetY = e.clientY - img.getBoundingClientRect().top;
      });

      document.addEventListener("mousemove", (e) => {
         if (isDragging) {
            img.style.left = `${e.clientX - offsetX}px`;
            img.style.top = `${e.clientY - offsetY}px`;
         }
      });

      document.addEventListener("mouseup", () => {
         isDragging = false;
         img.style.cursor = "grab";
      });
   }
});


document.addEventListener('DOMContentLoaded', function () {
   const toggleSwitch = document.getElementById('soundToggle');
   const backgroundAudio = document.getElementById('backgroundAudio');

   // 要素の確認
   console.log('Toggle Switch:', toggleSwitch);
   console.log('Background Audio:', backgroundAudio);

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
});

document.addEventListener('DOMContentLoaded', function () {
   const targetNode = document.body;  // 監視対象の親ノード

   const observer = new MutationObserver(function (mutationsList, observer) {
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
         observer.disconnect();  // 要素が見つかったので監視を終了
      }
   });

   observer.observe(targetNode, { childList: true, subtree: true });
});
