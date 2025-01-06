// JavaScriptでテンプレートを読み込む
document.addEventListener('DOMContentLoaded', function () {
  loadChatBotTemplate();

  fetch('bot.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
      initializeChatBot();
    })
    .catch(error => console.error('Error loading chatbot template:', error));
}
});


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

        // Send ボタンのクリックイベント
        sendButton.on('click', function () {
          const selectedCategory = categoryRadio.filter(':checked').val();
          if (!selectedCategory) {
            appendMessage('bot', 'カテゴリーを選択してください。');
            return;
          }
          const selectedKeyword = keywordRadioContainer.find('input[name="keyword"]:checked').val();
          if (!selectedKeyword) {
            appendMessage('bot', 'キーワードを選択してください。');
            return;
          }
          const botResponse = generateResponse(selectedCategory, selectedKeyword);
          appendMessage('bot', botResponse);
        });

        // Clear ボタンのクリックイベント
        clearButton.on('click', function () {
          chatWindow.html('');
        });

        // メッセージ追加
        function appendMessage(sender, message) {
          const messageDiv = $('<p>').addClass(sender).text(message);
          chatWindow.append(messageDiv);
          chatWindow.scrollTop(chatWindow[0].scrollHeight);
        }

        // カテゴリーとキーワードに基づく応答生成
        function generateResponse(category, keyword) {
          if (category === 'about') {
            return `カテゴリー：${category}, キーワード：${keyword}`;
          } else if (category === 'works') {
            return `カテゴリー：${category}, キーワード：${keyword}`;
          } else {
            return `カテゴリー：その他, キーワード：${keyword}`;
          }
        }

        // カテゴリー変更時にキーワード選択肢を更新
        categoryRadio.on('change', function () {
          updateKeywordOptions();
        });

        function updateKeywordOptions() {
          const selectedCategory = categoryRadio.filter(':checked').val();
          keywordRadioContainer.empty();

          if (selectedCategory === 'about') {
            addKeywordOptions(['想い', '目的', '活動']);
          } else if (selectedCategory === 'works') {
            addKeywordOptions(['PDでできること', '事業内容', '事業詳細']);
          } else if (selectedCategory === 'その他') {
            addKeywordOptions(['相談', '申込み', '料金']);
          }
        }

        function addKeywordOptions(keywords) {
          for (const keyword of keywords) {
            const label = $('<label>').html(`
              <input type="radio" name="keyword" value="${keyword}">
              <span>${keyword}</span>
            `);
            keywordRadioContainer.append(label);
          }
        }
      });
    });

    function toggleChatWindow() {
      const chatWindow = document.getElementById('chat-window');
      if (chatWindow) {
        chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
      } else {
        console.error("Chat window not found!");
      }
    }
    