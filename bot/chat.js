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
  // jQueryが正しくロードされたことを確認
  if (typeof jQuery === 'undefined') {
    console.error('jQueryが正しくロードされていません。');
    return;
  }

  // jQuery処理
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
      let response = '';
      if (selectedCategory === 'about') {
        response = "カテゴリー：about、キーワード：" + selectedKeyword;
      } else {
        response = "カテゴリー：" + selectedCategory + "、キーワード：" + selectedKeyword;
      }
      return response;
    }

    categoryRadio.on('change', updateKeywordOptions);

    function updateKeywordOptions() {
      const selectedCategory = categoryRadio.filter(':checked').val();
      const keywords = getKeywordsForCategory(selectedCategory);
      keywordRadioContainer.empty();

      if (keywords.length === 0) {
        keywordRadioContainer.append('<div>関連するキーワードがありません。</div>');
        return;
      }

      keywords.forEach(keyword => {
        const label = $('<label>').html(`<input type="radio" name="keyword" value="${keyword}"><span>${keyword}</span>`);
        keywordRadioContainer.append(label);
      });
    }

    function getKeywordsForCategory(category) {
      switch (category) {
        case 'about':
          return ['想い', '目的', '活動'];
        case 'works':
          return ['PDでできること', '事業内容', '事業詳細'];
        case 'その他':
          return ['相談', '申込み', '料金'];
        default:
          return [];
      }
    }

    // 初期化
    updateKeywordOptions();
  });
});