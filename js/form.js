// グローバル変数 'submitted' を宣言
let submitted = false;

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");

  inputs.forEach(input => {
    // 初期チェック
    toggleLabel(input);

    // 入力イベントに応じてクラスを切り替え
    input.addEventListener("input", function () {
      toggleLabel(input);
    });

    function toggleLabel(input) {
      if (input.value !== "") {
        input.classList.add("not-empty");
      } else {
        input.classList.remove("not-empty");
      }
    }
  });

  const modal = document.getElementById('thanksModal');
  const closeButton = document.getElementsByClassName('close')[0];

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // 送信処理
    fetch(form.action, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        submitted = true;  // 送信成功時に submitted を true にする
        modal.style.display = "block";  // モーダルを表示
        form.reset();  // フォームをリセット
        document.querySelectorAll('.input-text').forEach(input => {
          input.classList.remove('not-empty');
        });
      } else {
        alert('送信に問題が発生しました。サーバーからエラーが返されました。');
        console.error('送信エラー:', response);
      }
    }).catch(error => {
      alert('送信に問題が発生しました。ネットワークエラーの可能性があります。');
      console.error('ネットワークエラー:', error);  // エラーをコンソールに出力
    });
  });

  // iframe の onload イベントを別途設定
  const hiddenIframe = document.getElementById('hidden_iframe');
  if (hiddenIframe) {
    hiddenIframe.onload = function () {
      if (submitted) {
        alert('送信が完了しました。');
        submitted = false;  // リセット
      }
    };
  }

  // モーダルのクローズボタン
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  // モーダル外をクリックしたときの閉じる処理
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
