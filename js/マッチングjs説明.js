
// 現在の質問番号を保持する変数
let currentQuestion = 1;

// 選択された回答を格納するオブジェクト
// キーは質問番号、値は選択された選択肢の番号
let selectedAnswers = {};

// 各質問のデータを設定
const questions = {
   // 最初の質問（ID: 1）
   1: {
      // 質問文
      text: "あなたが現在直面している課題を選んでください。",
      // 選択肢（キーは選択肢の番号、値は選択肢のテキスト）
      options: {
         1: "ブランドの認知度向上",
         2: "商品の販売促進",
         3: "新規顧客の獲得",
         4: "リピーター獲得"
      },
      // 次の質問IDを決定する関数
      // answerは選択された選択肢の番号
      next: (answer) => {
         // 選択された回答に応じて、次の質問IDを返す
         switch (answer) {
            case 1: return 11; // 「ブランドの認知度向上」が選択された場合、質問11へ
            case 2: return 21; // 「商品の販売促進」が選択された場合、質問21へ
            case 3: return 31; // 「新規顧客の獲得」が選択された場合、質問31へ
            case 4: return 41; // 「リピーター獲得」が選択された場合、質問41へ
            default: return null; // 不正な回答の場合
         }
      }
   },
   // 質問11 (ブランド認知度向上)
   11: {
      text: "現在のブランド認知度向上のための取り組みを選んでください。",
      options: {
         1: "SNS活用",
         2: "オフライン広告",
         3: "他には何もしていない"
      },
      next: (answer) => 11 + answer // 選択肢の番号を足して次の質問へ
   },
   // ... (他の質問データ - 同様の構造)
   //質問12
   12: {
      text: "SNSを活用する際の課題を選んでください。",
      options: {
         1: "投稿頻度が少ない",
         2: "ターゲット層にリーチできていない",
         3: "コンテンツの質が低い"
      },
      next: (answer) => 12 + answer
   },
   //質問13
   13: {
      text: "投稿頻度を上げるために取り組めそうな施策を選んでください。",
      options: {
         1: "投稿スケジュールの作成",
         2: "チームの役割分担",
         3: "外部リソースの活用"
      },
      next: () => 99 // 診断結果へ
   },
   //質問21
   21: {
      text: "現在の販売促進における課題を選んでください。",
      options: {
         1: "オンライン広告の活用不足",
         2: "商品ページの訪問者数が少ない",
         3: "販促キャンペーンの効果が低い"
      },
      next: (answer) => 21 + answer
   },
   //質問22
   22: {
      text: "オンライン広告の課題を選んでください。",
      options: {
         1: "広告予算が足りない",
         2: "広告ターゲットの精度が低い",
         3: "広告運用の知識不足"
      },
      next: (answer) => 22 + answer
   },
   //質問23
   23: {
      text: "広告運用を改善するために取り組みたい方法を選んでください。",
      options: {
         1: "外部の専門家に依頼",
         2: "オンライン広告のトレーニングを受講",
         3: "広告運用ツールの導入"
      },
      next: () => 99 // 診断結果へ
   },
   //質問31
   31: {
      text: "新規顧客獲得における現状の課題を選んでください。",
      options: {
         1: "ウェブサイトの訪問者数が少ない",
         2: "ターゲット層の不明確さ",
         3: "顧客体験（UX）の質が低い"
      },
      next: (answer) => 31 + answer
   },
   //質問32
   32: {
      text: "訪問者数が少ない原因を選んでください。",
      options: {
         1: "SEO対策が不十分",
         2: "広告出稿を行っていない",
         3: "ソーシャルメディアでの露出が少ない"
      },
      next: (answer) => 32 + answer
   },
   //質問33
   33: {
      text: "SEO対策を強化するための施策を選んでください。",
      options: {
         1: "キーワード調査の実施",
         2: "高品質なコンテンツの作成",
         3: "外部リンク戦略の見直し"
      },
      next: () => 99 // 診断結果へ
   },
   //質問41
   41: {
      text: "リピート率向上における課題を選んでください。",
      options: {
         1: "リピーター向けの施策がない",
         2: "商品やサービスの満足度が低い",
         3: "メールマーケティングの効果が薄い"
      },
      next: (answer) => 41 + answer
   },
   //質問42
   42: {
      text: "リピーター施策として取り組みたい内容を選んでください。",
      options: {
         1: "ポイント制度の導入",
         2: "パーソナライズされたメールの送付",
         3: "ロイヤリティプログラムの導入"
      },
      next: (answer) => 42 + answer
   },
   //質問43
   43: {
      text: "ポイント制度を成功させるために取り組むべきことを選んでください。",
      options: {
         1: "シンプルで分かりやすいルールの設定",
         2: "ポイント付与条件の見直し",
         3: "キャンペーンの告知強化"
      },
      next: () => 99 // 診断結果へ
   },
   // 最後の質問（結果表示、ID: 99）
   99: {
      text: "診断結果: あなたの課題に対する最適な解決策が見つかりました！",
      options: {} // 結果画面には選択肢がない
   }
};

// 質問を表示する関数
function displayQuestion() {
   // 現在の質問データを取得
   const question = questions[currentQuestion];
   // 質問文を表示する要素を取得
   const questionContainer = document.getElementById("question-container");
   // 質問文を更新
   questionContainer.querySelector(".question").innerText = question.text;
   // 選択肢を表示する要素を取得
   const optionsContainer = questionContainer.querySelector(".options");
   // 選択肢をクリア
   optionsContainer.innerHTML = "";

   // optionsがない場合（結果画面）はボタンを表示しない
   if (Object.keys(question.options).length === 0) {
      return;
   }

   // 選択肢をループしてボタンを作成
   Object.entries(question.options).forEach(([key, value]) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = value;
      // ボタンがクリックされた時の処理を設定
      button.onclick = () => nextQuestion(parseInt(key));
      li.appendChild(button);
      optionsContainer.appendChild(li);
   });
}

// 回答を処理し、次の質問へ遷移する関数
function nextQuestion(answer) {
   // 選択された回答を保存
   selectedAnswers[currentQuestion] = answer;

   // 次の質問が存在するか確認
   if (questions[currentQuestion].next) {
      // 次の質問IDを取得
      const nextQuestionId = questions[currentQuestion].next(answer);

      // 次の質問が存在する場合
      if (nextQuestionId !== null && questions[nextQuestionId]) {
         // 現在の質問番号を更新
         currentQuestion = nextQuestionId;
         // 次の質問を表示
         displayQuestion();
      } else {
         // 次の質問が存在しない場合（結果画面へ遷移）
         showResults();
      }
   } else {
      // nextプロパティがない場合（結果画面へ遷移）
      showResults();
   }
}

// 結果画面を表示する関数
function showResults() {
   // モーダル（ポップアップ）要素を取得
   const modal = document.getElementById("modal");
   // アドバイス（結果）を表示する要素を取得
   const adviceContent = document.getElementById("advice-content");

   // アドバイスを生成して表示
   adviceContent.innerHTML = generateAdvice();
   // モーダルを表示
   modal.classList.add("active");
   // 質問表示部分を取得
   const questionContainer = document.getElementById("question-container");
   // 質問文を結果表示用のテキストに更新
   questionContainer.querySelector(".question").innerText = questions[99].text;
   // 選択肢表示部分を非表示にする
   questionContainer.querySelector(".options").style.display = 'none';

   // モーダルを閉じるボタンを取得
   const closeButton = modal.querySelector(".modal-close");
   // 閉じるボタンのクリックイベントを設定
   closeButton.onclick = closeModal;
}

// モーダルを閉じる関数
function closeModal() {
   // モーダル要素を取得
   const modal = document.getElementById("modal");
   // モーダルを非表示にする
   modal.classList.remove("active");
   // ページをリロードして診断をリセット
   location.reload();
}

// アドバイスを生成する関数
function generateAdvice() {
   // 最終診断結果を格納する文字列
   let advice = "最終診断結果:<br>";
   // 選択された回答をループ処理
   for (const questionNumber in selectedAnswers) {
      // 現在の質問で選択された回答を取得
      const answer = selectedAnswers[questionNumber];
      // 質問と回答を表示
      advice += `Q${questionNumber}: ${questions[questionNumber].options[answer]}<br>`;

      // 各質問に対するアドバイス
      switch (parseInt(questionNumber)) {
         case 1: // 最初の質問
            switch (answer) {
               case 1: advice += "ブランド認知度向上には、SNS活用、オフライン広告、PR活動などが有効です。ターゲット層に合わせた施策を選びましょう。<br>"; break;
               case 2: advice += "販売促進には、オンライン広告、キャンペーン、イベントなどが効果的です。商品の特性やターゲット層に合わせて戦略を立てましょう。<br>"; break;
               case 3: advice += "新規顧客獲得には、ウェブサイト改善、SEO対策、コンテンツマーケティングなどが重要です。顧客の行動を分析し、最適な施策を行いましょう。<br>"; break;
               case 4: advice += "リピーター獲得には、ポイント制度、メールマーケティング、顧客ロイヤルティプログラムなどが効果的です。顧客との関係性を深める施策を検討しましょう。<br>"; break;
            }
            break;
         case 11:
            switch (answer) {
               case 1: advice += "SNSの投稿頻度、ターゲット層へのリーチ、コンテンツの質を見直しましょう。データ分析ツールを活用して効果測定を行い、改善を繰り返すことが重要です。<br>"; break;
               case 2: advice += "オフライン広告は、地域密着型のビジネスや特定のターゲット層に有効です。費用対効果を考慮し、適切な媒体を選びましょう。<br>"; break;
               case 3: advice += "まずは、自社の状況に合った施策を検討することから始めましょう。SNS活用、ウェブサイト改善、PR活動など、できることから取り組みましょう。<br>"; break;
            }
            break;
         case 12:
            switch (answer) {
               case 1: advice += "投稿スケジュールの作成、コンテンツカレンダーの活用、ツールを使った予約投稿などを検討しましょう。無理のない頻度で継続することが大切です。<br>"; break;
               case 2: advice += "ターゲット層の分析、ハッシュタグの見直し、インフルエンサーとの連携などを検討しましょう。データ分析ツールを使って効果測定を行い、改善を繰り返しましょう。<br>"; break;
               case 3: advice += "ユーザーのニーズに応える質の高いコンテンツを作成しましょう。競合分析やトレンド調査を行い、魅力的なコンテンツを発信することが重要です。<br>"; break;
            }
            break;
         case 13:
            switch (answer) {
               case 1: advice += "投稿スケジュールを作成することで、計画的に投稿を行うことができます。コンテンツカレンダーやタスク管理ツールを活用しましょう。<br>"; break;
               case 2: advice += "チーム内で役割分担を明確にすることで、効率的に作業を進めることができます。各メンバーの得意分野を生かした役割分担を行いましょう。<br>"; break;
               case 3: advice += "外部リソース（ライター、デザイナーなど）を活用することで、コンテンツ作成の負担を軽減できます。予算に合わせて適切なリソースを選びましょう。<br>"; break;
            }
            break;
         // ... (他のcaseも同様に記述)
         case 43:
            switch (answer) {
               case 1: advice += "シンプルで分かりやすいルールの設定のアドバイス<br>"; break;
               case 2: advice += "ポイント付与条件の見直しのアドバイス<br>"; break;
               case 3: advice += "キャンペーンの告知強化のアドバイス<br>"; break;
            }
            break;
         case 44: advice += "商品・サービスの品質に課題がある場合、根本的な原因を究明し、改善に取り組む必要があります。顧客からのフィードバックを真摯に受け止め、品質向上に努めましょう。<br>"; break;
         case 45: advice += "メールマーケティングが効果的に活用できていない場合、配信頻度、コンテンツ内容、配信タイミングなどを見直しましょう。A/Bテストなどを実施し、効果測定を行いながら改善していくことが重要です。<br>"; break;
      }
   }
   return advice;
}

// 最初の質問を表示
displayQuestion();
