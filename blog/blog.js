      // 自動目次生成
      document.addEventListener("DOMContentLoaded", () => {
         const tocList = document.getElementById("toc-list");
         const headings = document.querySelectorAll("article h2,article h3");

         headings.forEach((heading, index) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#section-${index}`;
            link.textContent = heading.textContent;
            listItem.appendChild(link);
            tocList.appendChild(listItem);

            // IDを追加してリンク対応
            heading.id = `section-${index}`;
         });
      });


      // サンプル記事データ
      const articles = [
         { title: "SEOブログサイト", description: "概要1", thumbnail: "thumbnail1.jpg" },
         { title: "記事タイトル2", description: "概要2", thumbnail: "thumbnail2.jpg" },
         { title: "記事タイトル3", description: "概要3", thumbnail: "thumbnail3.jpg" },
         { title: "記事タイトル4", description: "概要4", thumbnail: "thumbnail4.jpg" },
         { title: "記事タイトル5", description: "概要5", thumbnail: "thumbnail5.jpg" },
         { title: "記事タイトル6", description: "概要6", thumbnail: "thumbnail6.jpg" },
         { title: "記事タイトル7", description: "概要7", thumbnail: "thumbnail7.jpg" },
         { title: "記事タイトル8", description: "概要8", thumbnail: "thumbnail8.jpg" }
      ];

      // ページネーション設定
      const articlesPerPage = 3;
      let currentPage = 1;

      // DOM要素
      const articleContainer = document.getElementById("article-container");
      const prevPageBtn = document.getElementById("prev-page");
      const nextPageBtn = document.getElementById("next-page");
      const pageInfo = document.getElementById("page-info");

      // ページネーションを更新
      function renderArticles() {
         // 表示する記事の開始と終了インデックス
         const startIndex = (currentPage - 1) * articlesPerPage;
         const endIndex = startIndex + articlesPerPage;

         // 記事を表示
         articleContainer.innerHTML = "";
         const visibleArticles = articles.slice(startIndex, endIndex);
         visibleArticles.forEach(article => {
            const articleCard = document.createElement("div");
            articleCard.classList.add("article-card");
            articleCard.innerHTML = `
      <img src="${article.thumbnail}" alt="${article.title}">
      <h3><a href="#">${article.title}</a></h3>
      <p>${article.description}</p>
   `;
            articleContainer.appendChild(articleCard);
         });

         // ページ情報を更新
         const totalPages = Math.ceil(articles.length / articlesPerPage);
         pageInfo.textContent = `${currentPage} / ${totalPages}`;

         // ボタンの有効・無効化
         prevPageBtn.disabled = currentPage === 1;
         nextPageBtn.disabled = currentPage === totalPages;
      }

      // ページ変更ハンドラ
      prevPageBtn.addEventListener("click", () => {
         if (currentPage > 1) {
            currentPage--;
            renderArticles();
         }
      });

      nextPageBtn.addEventListener("click", () => {
         const totalPages = Math.ceil(articles.length / articlesPerPage);
         if (currentPage < totalPages) {
            currentPage++;
            renderArticles();
         }
      });

      // 初期表示
      document.addEventListener("DOMContentLoaded", renderArticles);
