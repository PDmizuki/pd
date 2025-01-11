// ページ読み込み時に最初の質問を表示
document.addEventListener("DOMContentLoaded", () => {
   displayQuestion();
});

// 状態管理用変数
let currentQuestion = 1; // 現在の質問番号
let selectedAnswers = {}; // 選択された回答を格納するオブジェクト

const questions = {
   1: {
      text: "現在、どのような方法で集客していますか？",
      options: {
         1: "オフライン（チラシ、紹介、イベントなど）",
         2: "SNS（Instagram, Twitter, Facebookなど）",
         3: "Webサイト（ブログ、LP、広告など）",
         4: "特に何もしていない"
      },
      //next: (answer) => [11, 21, 31, 41][answer - 1] || null
      next: () => 11
   },
   //1: "オフライン（チラシ、紹介、イベントなど）",
   11: {
      text: "集客状況に満足していますか？",
      options: {
         1: "はい",
         2: "いいえ"
      },
      next: (answer) => [99, 21][answer - 1] || null
   },
   //11-1: "はい",
   21: {
      text: "Webサイト制作に興味はありますか？ ",
      options: {
         1: "興味があるが、費用が心配",
         2: "興味があるが、メリットがわからない",
         3: "興味があるが、運営方法がわからない",
         4: "特に興味はない",
      },
      next: (answer) => [22, 22, 22, 99][answer - 1] || null
   },
   ////21-2: "いいえ",
   22: {
      text: "Webサイトを作る際、以下の中で最も不安な点を教えてください。",
      options: {
         1: "制作費用が高そう",
         2: "制作後の運用が難しそう",
         3: "ウェブやネットに関する知識が少ない",
         4: "必要性を感じていない"
      },
      next: (answer) => [23, 23, 23, 99][answer - 1] || null
   },
   //21-1: "興味があるが、費用が心配",
   23: {
      text: "Webサイト制作に使える予算はどのくらいですか？",
      options: {
         1: "予算がほとんどない",
         2: "5万円以下",
         3: "10万円以下",
         4: "10万円以上"
      },
      next: (answer) => [99, 24, 24, 24][answer - 1] || null
   },
   //21-2: "興味があるが、メリットがわからない",
   24: {
      text: "制作後の運営や更新に使えるリソースはどのくらいですか？",
      options: {
         1: "自分でできる時間がある",
         2: "外注を検討している",
         3: "リソースがなく心配"
      },
      next: (answer) => [99, 25, 25, 25][answer - 1] || null
   },
   //21-3: "興味があるが、運営方法がわからない",
   25: {
      text: "Webサイトを作るとしたら、どのような効果を期待しますか？",
      options: {
         1: "集客力を高めたい",
         2: "ブランドイメージを向上させたい",
         3: "商品やサービスを販売したい",
         4: "他と差別化したい",
         5: "特に目的はまだない"
      },
      next: () => 26 // 診断結果へ
   },
   //21-4: "特に興味はない",
   26: {
      text: "Webサイトに期待する主な機能は何ですか？",
      options: {
         1: "お問い合わせフォーム",
         2: "オンライン販売機能（EC）",
         3: "予約システム",
         4: "ブログや情報発信機能"
      },
      next: () => 27 // 診断結果へ
   },
   27: {
      text: "Web制作や運営にどの程度のサポートが必要ですか？",
      options: {
         1: "初めから全て教えてほしい",
         2: "最低限のサポートだけでよい",
         3: "サポートは不要、自分で進められる"
      },
      next: () => 28
   },
   //質問32
   28: {
      text: "Web制作後、定期的な運用や改善のサポートが必要ですか？",
      options: {
         1: "はい",
         2: "時々あればよい",
         3: "いいえ"
      },
      next: () => 29
   },
   //質問33
   29: {
      text: "Webサイト制作を検討するタイミングとして、どのくらいを考えていますか？",
      options: {
         1: "すぐに取り組みたい",
         2: "1〜3ヶ月以内",
         3: "半年〜1年以内",
         4: "まだ具体的には決めていない"
      },
      next: () => 99 // 診断結果へ
   }
};

// ページ読み込み時に最初の質問を表示
window.onload = displayQuestion;

// 質問を表示する関数
function displayQuestion() {
   const questionContainer = document.getElementById("question-container");
   const resultContainer = document.getElementById("result-container");

   questionContainer.style.display = "block";
   resultContainer.style.display = "none";

   const question = questions[currentQuestion];
   if (!question) {
      console.error("質問が存在しません");
      return;
   }

   const questionText = questionContainer.querySelector(".question");
   const optionsContainer = questionContainer.querySelector(".options");

   questionText.textContent = question.text;
   optionsContainer.innerHTML = "";

   Object.entries(question.options).forEach(([key, value]) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = value;
      button.onclick = () => handleAnswer(parseInt(key, 10));
      li.appendChild(button);
      optionsContainer.appendChild(li);
   });
}

// 回答を処理する関数
function handleAnswer(answer) {
   selectedAnswers[currentQuestion] = answer;

   const nextQuestion = questions[currentQuestion]?.next(answer);

   if (nextQuestion === 99) {
      showContactForm();
   } else if (questions[nextQuestion]) {
      currentQuestion = nextQuestion;
      displayQuestion();
   } else {
      displayResult();
   }
}

// 追加情報入力フォームの表示
function showContactForm() {
   const contactInfo = document.getElementById("contact-info");
   contactInfo.style.display = "block";
   displayResult();
}

// 結果を表示する関数
function displayResult() {
   const questionContainer = document.getElementById("question-container");
   const resultContainer = document.getElementById("result-container");
   const resultText = document.getElementById("result-text");
   //   const adviceContent = document.getElementById("advice-content");

   questionContainer.style.display = "none";
   resultContainer.style.display = "block";

   // 選択された回答をフォーマット
   const formattedAnswers = Object.entries(selectedAnswers)
      .map(([index, answer]) => {
         const question = questions[index];
         const answerText = question.options[answer];
         return `質問：${question.text}<br>選んだ答え：${answerText}`;
      })
      .join("<br><br>");

   // 回答結果を表示
   resultText.innerHTML = `<span>あなたの回答</span><br>${formattedAnswers}`;

   // アドバイスを生成して表示
   const advice = generateAdvice();

   document.getElementById("submit-button").onclick = sendToServer;
   document.getElementById("reload-button").onclick = () => location.reload();
}


// アドバイスを生成する関数
function generateAdvice() {
   // アドバイス内容を定義
   let advice = "<h2>最終診断結果</h2>";
   advice += "<span>ご回答ありがとうございます。</span><br>今後のステップとしては、最適なマーケティング戦略の検討や、具体的な行動計画の策定をお勧めします。<br>";
   advice += "<span>どのような施策を選択するにせよ、継続的な努力が成功の鍵となります。</span>";

   // アドバイスをHTMLに表示
   const adviceElement = document.getElementById("advice"); // IDが"advice"の要素を取得
   if (adviceElement) {
      adviceElement.innerHTML = advice; // アドバイスを表示
   }

   // もし"advice-content"要素にも設定する必要がある場合
   const adviceContentElement = document.getElementById("advice-content");
   if (adviceContentElement) {
      adviceContentElement.innerHTML = advice; // アドバイスを設定
   }

   return advice; // 必要に応じて戻り値として返却
}


submitButton.addEventListener("click", (event) => {
   event.preventDefault(); // フォーム送信のデフォルト動作を防止
   sendToServer();
});


document.addEventListener("DOMContentLoaded", () => {
   const submitButton = document.getElementById("submit-button");
   const reloadButton = document.getElementById("reload-button");

   // 送信中かどうかを判定するフラグ
   let isSubmitting = false;

   // 送信ボタンのクリックイベント
   if (submitButton) {
      // ボタンの type を "button" に変更 (HTMLで対応していない場合の保険)
      submitButton.setAttribute("type", "button");

      // リスナーの重複を防止
      if (!submitButton.hasAttribute("data-listener")) {
         submitButton.setAttribute("data-listener", "true");

         submitButton.addEventListener("click", async () => {
            if (isSubmitting) {
               console.log("送信処理中のため、新たな送信はキャンセルされました。");
               return;
            }
            isSubmitting = true; // フラグを立てる
            submitButton.disabled = true; // ボタンを一時的に無効化

            try {
               await sendToServer();
            } catch (error) {
               console.error("送信中にエラーが発生しました:", error);
            }

            isSubmitting = false; // フラグを解除
            submitButton.disabled = false; // ボタンを再び有効化
         });
      }
   } else {
      console.error("エラー: 'submit-button' が見つかりませんでした。");
   }

   // リロードボタンのクリックイベント
   if (reloadButton) {
      reloadButton.addEventListener("click", () => {
         location.reload();
      });
   }
});

// サーバーにデータを送信する関数
async function sendToServer() {
   const name = document.getElementById("name").value.trim();
   const address = document.getElementById("address").value.trim();
   const advice = document.getElementById("advice-content").textContent || "なし";

   // 入力チェック
   if (!name || !address) {
      alert("氏名とメールアドレスを入力してください。");
      return;
   }

   // 送信データをURLエンコード形式に変換
   const data = new URLSearchParams({
      name,
      address,
      advice,
   }).toString();

   console.log("送信データ:", data); // デバッグ用ログ

   try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxjDir0hWBEQJYwBCRIgMEfQQOcqxZz2iLtjHbkX6--LOS1RpOf67UhsVXSHnxiM_ft/exec", {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
         body: data,
      });

      if (!response.ok) {
         throw new Error(`HTTPエラー: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("サーバーからのレスポンス:", responseData);

      if (responseData.success) {
         alert("送信が完了しました！");
      } else {
         alert("エラーが発生しました: " + responseData.message);
      }
   } catch (error) {
      console.error("送信エラー:", error);
      alert("送信エラーが発生しました。");
   }
}



//送信完了後＝送信完了しました
//99前にこちらからの連絡は希望しますか？
//はい＝Addressの入力＝99へ移動
//（回答結果、アドバイス、Address）の送信
//いいえ＝99へ移動
//（回答結果、アドバイス）の送信