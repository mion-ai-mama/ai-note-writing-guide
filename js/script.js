/**
 * ============================================================
 * script.js — ページの動き（コピー機能・アニメーションなど）
 * ============================================================
 * このファイルは基本的に編集不要です。
 * 文章を変更したい場合は js/content.js を編集してください。
 * ============================================================
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     文字のエスケープ（安全にHTMLへ差し込むための処理）
  ------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ------------------------------------------------------------
     SEO・OGP・favicon の反映
  ------------------------------------------------------------ */
  function applyMeta(m) {
    if (!m) return;
    document.title = m.pageTitle;
    setMetaContent('meta[name="description"]', m.description);
    setMetaContent('meta[property="og:title"]', m.pageTitle);
    setMetaContent('meta[property="og:description"]', m.description);
    setMetaContent('meta[property="og:image"]', m.ogpImage);
    setMetaContent('meta[property="og:url"]', m.siteUrl);
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && m.faviconPath) favicon.setAttribute("href", m.faviconPath);
  }

  function setMetaContent(selector, value) {
    if (value == null) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute("content", value);
  }

  /* ------------------------------------------------------------
     セクションの表示・非表示（content.js の sections で一括制御）
  ------------------------------------------------------------ */
  function toggleSection(id, visible) {
    const root = document.getElementById(id);
    if (!root) return;
    if (visible) {
      root.style.display = "";
      root.removeAttribute("aria-hidden");
    } else {
      root.style.display = "none";
      root.setAttribute("aria-hidden", "true");
    }
  }

  /* ------------------------------------------------------------
     1. 表紙（ファーストビュー）
  ------------------------------------------------------------ */
  function renderHero(c) {
    const root = document.getElementById("hero");
    if (!root || !c) return;
    root.querySelector(".hero__label").textContent = c.label;
    root.querySelector(".hero__title").innerHTML = `${c.titleLine1}<br>${c.titleLine2}`;
    root.querySelector(".hero__subtitle").innerHTML = `${c.subtitleLine1}<br>${c.subtitleLine2}`;
    root.querySelector(".hero__desc").innerHTML = c.description;
    const btn = root.querySelector(".btn");
    btn.textContent = c.buttonText;
    btn.setAttribute("href", "#" + c.buttonScrollTargetId);
  }

  /* ------------------------------------------------------------
     STEP1〜5 詳細
     steps 配列の数だけ、STEPセクションをその場で組み立てます。
  ------------------------------------------------------------ */
  function renderSteps(steps) {
    const container = document.getElementById("steps-container");
    if (!container || !steps) return;

    container.innerHTML = steps
      .map((step, i) => {
        const id = "step" + (i + 1);
        const softClass = i % 2 === 1 ? " section--soft" : "";

        let prose = (step.paragraphs || []).map((p) => `<p>${p}</p>`).join("");
        if (step.list && step.list.length) {
          prose += '<ul class="check-list">' + step.list.map((li) => `<li>${li}</li>`).join("") + "</ul>";
        }
        if (step.numberedList && step.numberedList.length) {
          prose +=
            '<ol class="numbered-box">' + step.numberedList.map((li) => `<li>${li}</li>`).join("") + "</ol>";
        }
        prose += (step.afterParagraphs || []).map((p) => `<p>${p}</p>`).join("");

        const keywordPillsHtml =
          step.keywordPills && step.keywordPills.length
            ? '<div class="keyword-pills">' +
              step.keywordPills.map((k) => `<span class="keyword-pill">${escapeHtml(k)}</span>`).join("") +
              "</div>"
            : "";

        let afterListHtml = "";
        if (step.afterList && step.afterList.length) {
          afterListHtml = step.afterListIntro ? `<p>${step.afterListIntro}</p>` : "";
          afterListHtml += '<ul class="check-list">' + step.afterList.map((li) => `<li>${li}</li>`).join("") + "</ul>";
        }

        const screenshotHtml =
          step.screenshots && step.screenshots.length
            ? '<div class="screenshot-group">' +
              step.screenshots
                .map((shot) =>
                  shot.src
                    ? `<figure class="screenshot-card"><img src="${shot.src}" alt="${escapeHtml(
                        shot.label || ""
                      )}" loading="lazy"><figcaption>${escapeHtml(shot.label || "")}</figcaption></figure>`
                    : `<div class="screenshot-placeholder"><span class="screenshot-placeholder__icon" aria-hidden="true">📷</span><span>【スクリーンショット：${escapeHtml(
                        shot.label || ""
                      )}】</span></div>`
                )
                .join("") +
              "</div>"
            : "";

        const promptHtml = step.prompt
          ? `
          <div class="prompt-box step__prompt">
            <p class="prompt-box__heading">${step.prompt.heading}</p>
            <p class="prompt-box__desc">${step.prompt.description}</p>
            <pre class="prompt-box__text" id="${id}-prompt-text">${escapeHtml(step.prompt.promptText)}</pre>
            <button
              type="button"
              class="btn btn--primary copy-btn"
              data-copy-target="${id}-prompt-text"
              aria-label="${step.prompt.heading}をコピーする">
              <span class="copy-btn__label">${step.prompt.buttonText}</span>
              <span class="copy-btn__done" role="status" aria-live="polite">${step.prompt.copiedText}</span>
            </button>
          </div>`
          : "";

        const noteHtml = step.note
          ? `<div class="note-box"><p class="note-box__label">${step.note.label}</p><p>${step.note.text}</p></div>`
          : "";

        const warningHtml = step.warning
          ? `<div class="warning-box"><p class="warning-box__label">⚠️ ${step.warning.label}</p><p>${step.warning.text}</p></div>`
          : "";

        return `
        <section class="section${softClass} step" id="${id}" aria-labelledby="${id}-heading">
          <div class="section__inner reveal">
            <p class="step__number">${step.number}</p>
            <h2 class="step__title" id="${id}-heading">${step.title}</h2>
            <div class="prose">${prose}</div>
            ${keywordPillsHtml}
            ${afterListHtml}
            ${screenshotHtml}
            ${promptHtml}
            ${warningHtml}
            ${noteHtml}
          </div>
        </section>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------
     おすすめのSubstack
  ------------------------------------------------------------ */
  function renderRecommendations(c) {
    const root = document.getElementById("recommendations");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;
    root.querySelector(".section__desc").innerHTML = c.description || "";

    const picksEl = root.querySelector(".beginner-picks");
    if (picksEl && c.beginnerPicks) {
      picksEl.querySelector(".beginner-picks__label").textContent = c.beginnerPicks.heading;
      picksEl.querySelector(".beginner-picks__names").innerHTML = (c.beginnerPicks.names || [])
        .map((n) => `<span class="keyword-pill">${escapeHtml(n)}</span>`)
        .join("");
    }

    const items = c.items || [];
    const categories = [];
    items.forEach((item) => {
      if (!categories.includes(item.category)) categories.push(item.category);
    });

    const groupsEl = root.querySelector(".recommendation-groups");
    groupsEl.innerHTML = categories
      .map((category) => {
        const cardsHtml = items
          .filter((item) => item.category === category)
          .map(
            (item) => `
          <div class="card">
            <h3 class="card__title">
              <a href="${item.url}" target="_blank" rel="noopener">${escapeHtml(item.name)} ↗</a>
            </h3>
            <span class="card__theme">${escapeHtml(item.theme)}</span>
            <p class="card__who">${escapeHtml(item.who)}</p>
            <p class="card__fit">💡 ${escapeHtml(item.ideaFit)}</p>
          </div>`
          )
          .join("");
        return `
        <div class="recommendation-group">
          ${category ? `<h3 class="recommendation-group__heading">${escapeHtml(category)}</h3>` : ""}
          <div class="card-grid">${cardsHtml}</div>
        </div>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------
     注意点
  ------------------------------------------------------------ */
  function renderCaution(c) {
    const root = document.getElementById("caution");
    if (!root || !c) return;
    root.querySelector(".section__heading").innerHTML = c.heading;
    const warn = root.querySelector(".warning-box");
    if (warn && c.warning) {
      warn.querySelector(".warning-box__label").innerHTML = `⚠️ ${escapeHtml(c.warning.label)}`;
      warn.querySelector("p:last-child").textContent = c.warning.text;
    }
    const list = root.querySelector(".caution-items");
    list.innerHTML = (c.items || [])
      .map(
        (item, i) => `
      <li>
        <span class="caution-items__number">${i + 1}</span>
        <span><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.text)}</span>
      </li>`
      )
      .join("");
  }

  /* ------------------------------------------------------------
     最後の案内（CTA）
  ------------------------------------------------------------ */
  function renderCta(c) {
    const root = document.getElementById("cta");
    if (!root || !c) return;
    root.querySelector(".cta-card__heading").innerHTML = c.heading;
    const [p1, p2] = c.paragraphs;
    const prose = root.querySelector(".prose");
    prose.innerHTML = `<p>${p1}</p><p>${p2}<br><strong class="cta-card__highlight">${c.highlightText}</strong>${c.afterHighlight}</p>`;
    const btn = document.getElementById("cta-button");
    btn.setAttribute("href", c.buttonUrl);

    if (c.bannerImage) {
      btn.classList.remove("btn", "btn--primary", "btn--large");
      btn.classList.add("cta-card__banner-link");
      btn.innerHTML = `<img src="${c.bannerImage}" alt="${escapeHtml(c.bannerAlt || c.buttonText)}" class="cta-card__banner-img">`;
      const img = btn.querySelector("img");
      img.addEventListener(
        "error",
        () => {
          btn.classList.remove("cta-card__banner-link");
          btn.classList.add("btn", "btn--primary", "btn--large");
          btn.textContent = c.buttonText;
        },
        { once: true }
      );
    } else {
      btn.classList.remove("cta-card__banner-link");
      btn.classList.add("btn", "btn--primary", "btn--large");
      btn.textContent = c.buttonText;
    }
  }

  /* ------------------------------------------------------------
     フッター
  ------------------------------------------------------------ */
  function renderFooter(c) {
    const root = document.querySelector(".footer");
    if (!root || !c) return;
    root.innerHTML = `<p>${c.copyright}</p><p>${c.notice}</p>`;
  }

  /* ------------------------------------------------------------
     コピー機能（クリップボードAPI／古いブラウザ向けの代替あり）
  ------------------------------------------------------------ */
  function legacyCopy(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (e) {
      return false;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => legacyCopy(text)
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function bindCopyDelegation() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".copy-btn[data-copy-target]");
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;
      copyText(target.textContent).then((ok) => {
        if (!ok) return;
        btn.classList.add("is-copied");
        window.clearTimeout(btn._copyTimeout);
        btn._copyTimeout = window.setTimeout(() => btn.classList.remove("is-copied"), 2200);
      });
    });
  }

  /* ------------------------------------------------------------
     スクロールで軽くフェードインする演出
  ------------------------------------------------------------ */
  function setupRevealAnimation() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------
     初期化
     content.js が正しく読み込めた場合のみ、内容を反映します。
     content.js が読み込めなかった場合は、index.html に書かれている
     初期文章がそのまま表示されます（ページが真っ白になりません）。
  ------------------------------------------------------------ */
  function init() {
    if (typeof CONTENT !== "undefined") {
      try {
        applyMeta(CONTENT.meta);
        renderHero(CONTENT.hero);
        renderRecommendations(CONTENT.recommendations);
        renderSteps(CONTENT.steps);
        renderCaution(CONTENT.caution);
        renderCta(CONTENT.cta);
        renderFooter(CONTENT.footer);

        const s = CONTENT.sections || {};
        toggleSection("recommendations", s.recommendations !== false);
        toggleSection("steps-container", s.steps !== false);
        toggleSection("caution", s.caution !== false);
      } catch (err) {
        // content.js の書き方に誤りがある場合はここに来ます。
        // index.html に書かれた初期文章がそのまま表示されるので、ページは壊れません。
        console.error("content.js の反映中にエラーが発生しました。index.html の初期内容を表示しています。", err);
      }
    }
    bindCopyDelegation();
    setupRevealAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
