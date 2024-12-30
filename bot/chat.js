// JavaScriptでテンプレートを読み込む
function loadChatBotTemplate() {
  fetch('bot.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
      initializeChatBot();
    })
    .catch(error => console.error('Error loading chatbot template:', error));
}

// グローバルスコープの toggleChatWindow
function toggleChatWindow() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
  } else {
    console.error("Chat window not found!");
  }
}

function initializeChatBot() {
  console.log("ChatBot initialized");
}

// 質問を送信する関数
function askQuestion() {
  const userQuestion = document.getElementById('user-input').value;

  if (!userQuestion) {
    console.error("質問を入力してください。");
    return;
  }

  const request = {
    queryInput: {
      text: {
        text: userQuestion,
        languageCode: 'ja',
      },
    },
  };

  document.getElementById('user-input').value = '';
  // ここにAPI呼び出しを追加する予定
}

function handleResponse(response) {
  const botReply = response.queryResult.fulfillmentText;
  addMessage('ChatBot', botReply);
}

function addMessage(sender, message) {
  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML += `<div><strong>${sender}:</strong> ${message}</div>`;
}

// DOMが読み込まれた後の処理
document.addEventListener('DOMContentLoaded', function () {
  jQuery.noConflict();
  jQuery(document).ready(function ($) {
    const chatWindow = $('#chat');
    const categoryRadio = $('input[name="category"]');
    const keywordRadioContainer = $('.keyword-options');
    const sendButton = $('#send-button');
    const clearButton = $('#clear-button');

    sendButton.on('click', sendMessage);
    clearButton.on('click', clearChat);

    function sendMessage() {
      const selectedCategory = categoryRadio.filter(':checked').val();
      if (!selectedCategory) {
        appendMessage('bot', "カテゴリーを選択してください。");
        return;
      }
      const selectedKeyword = keywordRadioContainer.find('input[name="keyword"]:checked').val();
      if (!selectedKeyword) {
        appendMessage('bot', "キーワードを選択してください。");
        return;
      }
      const botResponse = generateResponse(selectedCategory, selectedKeyword);
      appendMessage('bot', botResponse);
    }

    function clearChat() {
      chatWindow.html('');
    }

    function appendMessage(sender, message) {
      const messageDiv = $('<p>').addClass(sender).text(message);
      chatWindow.append(messageDiv);
      chatWindow.scrollTop(chatWindow[0].scrollHeight);
    }

    function generateResponse(selectedCategory, selectedKeyword) {
      const responses = {
        about: {
          想い: "私たちの想いは、人はいつからでも変わることができる、自分らしく、人としての感情や思考を大切にすることです。",
          目的: "私たちの目的は、人としての想いや考え、自分自身とこころを大切にすること、一番は人なんだということ、を伝えていくことです。",
          活動: "私たちの活動はコーチングやお悩み相談（カウンセリング）の他に、個人事業の事業サポート・制作を行っています。その他の活動はBlogページに投稿しているのでご覧ください。",
        },
        works: {
          PDでできること: "私たちは、こころが良い方向への変化するお手伝いをしています。",
          事業内容: "事業内容は「コーチング、お悩み相談（カウンセリング）」「個人事業を対象にした事業サポート、制作」を行っております。",
          事業詳細: "事業の詳細は画像データをダウンロードしていただくか、公式LINEもしくはコンタクトフォームからお問い合わせください。",
        },
        その他: {
          相談: "相談は「コーチング、お悩み相談（カウンセリング）、事業サポート」お1人様1回30分～45分までとなっています。",
          申込み: "お申し込み方法は、HPもしくは公式LINEからお申し込みができます。",
          料金: "料金は当HPのWorksページにある「Piece一覧.jpg」もしくは公式LINEのリッチメニューからご確認いただけます。",
        },
      };

      return responses[selectedCategory]?.[selectedKeyword] || "該当する応答が見つかりません。";
    }

    function updateKeywordOptions() {
      const selectedCategory = categoryRadio.filter(':checked').val();
      const keywordOptions = Object.keys(responses[selectedCategory] || {});
      keywordRadioContainer.empty();

      if (keywordOptions.length === 0) {
        keywordRadioContainer.append('<div>選択したカテゴリーに関連するキーワードを表示します。</div>');
      } else {
        keywordOptions.forEach(keyword => {
          const label = $('<label>').html(`<input type="radio" name="keyword" value="${keyword}"><span> ${keyword}</span>`);
          keywordRadioContainer.append(label);
        });
      }
    }

    categoryRadio.on('change', updateKeywordOptions);
    updateKeywordOptions();
  });
});
