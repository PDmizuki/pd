// script.js
document.getElementById("questionnaire").addEventListener("submit", function (e) {
  e.preventDefault();

  // フォームデータを取得
  const formData = new FormData(this);

  // 回答データを取得
  const answers = {
    issues: formData.getAll("issues"), // 複数選択対応
    marketing: formData.get("marketing"),
    it_tools: formData.get("it_tools"),
    finance: formData.get("finance"),
    expert_support: formData.get("expert_support"),
  };

  // 結果を生成
 

   // 結果を生成
   const advice = generateDynamicAdvice(answers);
 
   // モーダルに結果を表示
   const resultContent = document.getElementById("result-content");
   resultContent.innerHTML = `
     <h3>やる事:</h3>
     <p>${advice.tasks}</p>
     <h3>やった方が良いこと:</h3>
     <p>${advice.suggestions}</p>
     <h3>アドバイス:</h3>
     <p>${advice.advice}</p>
   `;
   document.getElementById("result-modal").classList.remove("hidden");
 });
 
 // モーダル閉じるボタン
 document.getElementById("close-modal").addEventListener("click", function () {
   document.getElementById("result-modal").classList.add("hidden");
 });
 
 // 結果生成ロジック（柔軟な組み合わせ対応）
 function generateDynamicAdvice(answers) {
   const tasks = [];
   const suggestions = [];
   const advice = [];
 
   // 複数選択対応（回答1の選択肢をループで処理）
   answers.issues.forEach((issue) => {
     if (issue === "売上拡大") {
       tasks.push("売上拡大のために新しい集客方法を試してください。");
       suggestions.push("SNS広告を活用し、ターゲット層を拡大しましょう。");
       advice.push("FacebookやInstagramなどのSNS広告は特に効果的です。");
     }
     if (issue === "業務効率化") {
       tasks.push("業務効率化のために業務プロセスを見直してください。");
       suggestions.push("RPAツールやクラウド型サービスを導入しましょう。");
       advice.push("業務の重複や無駄をなくすことが鍵です。");
     }
     if (issue === "資金管理") {
       tasks.push("コスト削減のために固定費を分析してください。");
       suggestions.push("サブスクリプションの見直しや無駄な支出を削減しましょう。");
       advice.push("まずは毎月の支出を洗い出すことから始めてください。");
     }
   });
 
   // 他の回答に基づく結果生成
   if (answers.marketing === "いいえ") {
     tasks.push("マーケティング戦略を立てる必要があります。");
     suggestions.push("ターゲット市場のニーズを調査してください。");
     advice.push("Google Analyticsやアンケート調査を活用しましょう。");
   }
 
   if (answers.it_tools === "不足している") {
     tasks.push("ITツールを導入して業務効率を向上させてください。");
     suggestions.push("スケジュール管理ツールや顧客管理ツールを検討してください。");
     advice.push("無料トライアルのあるツールを選ぶとリスクを軽減できます。");
   }
 
   if (answers.finance === "はい" && answers.expert_support === "いいえ") {
     tasks.push("財務管理の専門家に相談してください。");
     suggestions.push("地元の商工会や中小企業支援センターを活用しましょう。");
     advice.push("財務状況の改善に必要なサポートを受けることをおすすめします。");
   }
 
   // デフォルトのアドバイス（該当なしの場合）
   if (tasks.length === 0) {
     tasks.push("事業全体の状況を見直してください。");
     suggestions.push("短期的な目標を設定し、優先順位を明確にしましょう。");
     advice.push("専門家やビジネスコンサルタントの助言を検討してください。");
   }
 
   return {
     tasks: tasks.join("<br>"),
     suggestions: suggestions.join("<br>"),
     advice: advice.join("<br>"),
   };
 }
 