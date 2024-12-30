// JavaScriptでテンプレートを読み込む
function loadChatBotTemplate() {
  fetch('bot.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      document.body.insertAdjacentHTML('beforeend', data);
      initializeChatBot();
    })
    .catch((error) => console.error('Error loading chatbot template:', error));
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
  // ChatBot に関連する処理を記述
  console.log("ChatBot initialized");
}

// jQueryスクリプト
document.addEventListener('DOMContentLoaded', () => {
  if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded. Please include jQuery.');
    return;
  }

  const $ = jQuery.noConflict();
  const chatWindow = $('#chat');
  const categoryRadio = $('input[name="category"]');
  const keywordRadioContainer = $('.keyword-options');
  const sendButton = $('#send-button');
  const clearButton = $('#clear-button');

  sendButton.on('click', sendMessage);
  clearButton.click(clearChat);

  function sendMessage() {
    const selectedCategory = categoryRadio.filter(':checked').val();
    if (!selectedCategory) return;
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
    let response = '';
    if (selectedCategory === 'about') {
      response = generateAuthorResponse(selectedKeyword);
    } else if (selectedCategory === 'works') {
      response = generateArtworkResponse(selectedKeyword);
    } else if (selectedCategory === 'その他') {
      response = generateExhibitionResponse(selectedKeyword);
    } else {
      response = "選択したカテゴリーに関する解答内容です。";
    }
    return response;
  }

  function getKeywordsForCategory(selectedCategory) {
    if (selectedCategory === 'about') {
      return ['想い', '目的', '活動']; //about
    } else if (selectedCategory === 'works') {
      return ['PDでできること', '事業内容', '事業詳細']; //works
    } else if (selectedCategory === 'その他') {
      return ['相談', '申込み', '料金']; //その他
    } else {
      return [];
    }
  }

  function generateAuthorResponse(selectedKeyword) { //about
    if (selectedKeyword === '想い') {
      return "私たちの想いは、人はいつからでも変わることができる、自分らしく、人としての感情や思考を大切にすることです。";
    } else if (selectedKeyword === '目的') {
      return "私たちの目的は、人としての想いや考え、自分自身とこころを大切にすること、一番は人なんだということ、を伝えていくことです。";
    } else if (selectedKeyword === '活動') {
      return "私たちの活動はコーチングやお悩み相談（カウンセリング）の他に、個人事業の事業サポート・制作を行っています。その他の活動はBlogページに投稿しているのでご覧ください。";
    }
  }

  function generateArtworkResponse(selectedKeyword) { //works
    if (selectedKeyword === 'PDでできること') {
      return "私たちは、こころが良い方向への変化するお手伝いをしています。潜在意識に眠る悩みやトラウマを軽減する方法を伝えることの他に、事業を寄り良くする提案（アドバイス）やサポート等を行っています。";
    } else if (selectedKeyword === '事業内容') {
      return "事業内容は「コーチング、お悩み相談（カウンセリング）」「個人事業を対象にした事業サポート、制作」を行っております。";
    } else if (selectedKeyword === '事業詳細') {
      return "事業の詳細は画像データをダウンロードしていただくか、公式LINEもしくはコンタクトフォームからお問い合わせください。";
    }
  }

  function generateExhibitionResponse(selectedKeyword) { //その他
    if (selectedKeyword === '相談') {
      return "相談は「コーチング、お悩み相談（カウンセリング）、事業サポート」お1人様1回30分～45分までとなっています。";
    } else if (selectedKeyword === '申込み') {
      return "お申し込み方法は、HPもしくは公式LINEからお申し込みができます。公式LINEを登録していただくとスムーズにお申し込みを行えますので、是非ご登録をお願いします。";
    } else if (selectedKeyword === '料金') {
      return "料金は当HPのWorksページにある「Piece一覧.jpg」もしくは公式LINEのリッチメニューからご確認いただけます。";
    }
  }

  categoryRadio.on('change', function () {
    updateKeywordOptions();
  });

  function updateKeywordOptions() {
    const selectedCategory = categoryRadio.filter(':checked').val();
    const keywordOptions = getKeywordsForCategory(selectedCategory);
    keywordRadioContainer.empty();
    for (const keyword of keywordOptions) {
      const label = $('<label>').html(`<input type="radio" name="keyword" value="${keyword}"><span> ${keyword}</span>`);
      keywordRadioContainer.append(label);
    }
  }

  updateKeywordOptions();
});


// ページがロードされたときにテンプレートを読み込む
document.addEventListener('DOMContentLoaded', loadChatBotTemplate);

