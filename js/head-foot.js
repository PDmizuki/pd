document.addEventListener("DOMContentLoaded", function () {
   // オーディオトグル機能
   function initializeAudioToggle() {
       const toggleSwitch = document.getElementById("soundToggle");
       const backgroundAudio = document.getElementById("backgroundAudio");

       if (toggleSwitch && backgroundAudio) {
           toggleSwitch.addEventListener("change", function () {
               if (toggleSwitch.checked) {
                   backgroundAudio.play();
               } else {
                   backgroundAudio.pause();
                   backgroundAudio.currentTime = 0;
               }
           });
       } else {
           console.error("Toggle switch or background audio element not found");
       }
   }

   // チャットウィンドウのトグル
   function toggleChatWindow() {
       const chatWindow = document.getElementById("chat-window");
       if (chatWindow) {
           chatWindow.style.display =
               chatWindow.style.display === "none" || !chatWindow.style.display
                   ? "block"
                   : "none";
       } else {
           console.error("Chat window not found");
       }
   }
   window.toggleChatWindow = toggleChatWindow; // グローバルスコープで関数を定義

   // ドラッグ機能
   function initializeDrag() {
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
       } else {
           console.log("Draggable element not found");
       }
   }

   // 初期化
   initializeAudioToggle();
   initializeDrag();

   // ヘッダーとフッターの読み込み
   fetch("header.html")
       .then((response) => response.text())
       .then((headerData) => {
           document.getElementById("header-container").innerHTML = headerData;
       })
       .catch((error) => console.error("Error loading header:", error));

   fetch("footer.html")
       .then((response) => response.text())
       .then((footerData) => {
           document.getElementById("footer-container").innerHTML = footerData;
       })
       .catch((error) => console.error("Error loading footer:", error));
});
