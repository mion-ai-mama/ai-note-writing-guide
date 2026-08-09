/**
 * ============================================================
 * content.js — このファイルを編集するだけで新しい特典ページが作れます
 * ============================================================
 *
 * 【使い方】
 * 1. 下の CONTENT オブジェクトの中身（"　　"で囲まれた日本語部分）を
 *    新しい特典の内容に書き換えてください。
 * 2. HTMLタグ（<br> など）はそのまま残して大丈夫です。
 * 3. 保存したら index.html をブラウザで開く（またはGitHub Pagesを更新）だけで
 *    ページに反映されます。
 *
 * 詳しい編集方法は README.md を見てください。
 * ============================================================
 */

const CONTENT = {
  // ------------------------------------------------------------
  // サイト全体の設定（SEO・OGP・favicon）
  // ------------------------------------------------------------
  meta: {
    pageTitle: "AIで海外記事をヒントにnoteを書く方法｜おすすめSubstackとプロンプト付き",
    description:
      "実際に参考にしているSubstackアカウントと、海外記事をnoteに仕上げるまでの手順をまとめた実践ガイド。コピペで使えるプロンプト付き。",
    // TODO: 専用のOGP画像を用意して差し替えてください（現在は暫定的にCTAバナー画像を流用しています）
    ogpImage: "https://mion-ai-mama.github.io/ai-note-writing-guide/assets/images/cta-banner.png",
    siteUrl: "https://mion-ai-mama.github.io/ai-note-writing-guide/",
    faviconPath: "assets/favicon/favicon.svg",
  },

  // ------------------------------------------------------------
  // セクションのON/OFF
  // ------------------------------------------------------------
  sections: {
    recommendations: true, // おすすめのSubstack（ページの最初に表示）
    steps: true, // STEP1〜5 詳細
    caution: true, // 注意点
  },

  // ------------------------------------------------------------
  // 1. 表紙（ファーストビュー）
  // ------------------------------------------------------------
  hero: {
    label: "AI初心者さん向け",
    titleLine1: "AIで海外記事を",
    titleLine2: "ヒントにnoteを書く方法",
    subtitleLine1: "AI初心者でも5分で始められる",
    subtitleLine2: "実践ガイド",
    description: "海外の記事をAIで日本語にして、<br>自分の言葉でnoteに書く。<br>それだけで、ネタ切れの悩みが軽くなります。",
    buttonText: "おすすめ10選を見る",
    buttonScrollTargetId: "recommendations",
  },

  // ------------------------------------------------------------
  // おすすめのSubstack（ページの最初に表示）
  // ------------------------------------------------------------
  // 実際に参考にしている10アカウント（カテゴリ分けはご提供いただいた分類のまま採用）。
  // 各アカウントの説明文は、提供元の文章をそのまま使わずオリジナルで書き直しています。
  // beginnerPicks: 初心者に特におすすめしたいアカウント名を items の name と一致させて指定
  recommendations: {
    heading: "おすすめのSubstack10選",
    description: "私が実際に参考にしているSubstackアカウント10選です。<br>英語ですが、ChatGPTを使えば日本語で内容をつかめます。",
    beginnerPicks: {
      heading: "初心者はまずこの3つから",
      names: ["One Useful Thing", "Not Boring", "First 1000"],
    },
    items: [
      {
        category: "AI・テクノロジートレンド",
        name: "One Useful Thing",
        url: "https://www.oneusefulthing.org",
        theme: "AIの実践的な活用法",
        who: "AIを実務にどう活かすか知りたい方",
        ideaFit: "「AIを仕事でこう使う」という具体的な活用ネタ探しに",
      },
      {
        category: "AI・テクノロジートレンド",
        name: "AI Supremacy",
        url: "https://aisupremacy.substack.com",
        theme: "AI業界の動向・トレンド予測",
        who: "AI業界の大きな流れをつかみたい方",
        ideaFit: "「これから来るAIの波」という先読みネタ探しに",
      },
      {
        category: "AI・テクノロジートレンド",
        name: "Marcus on AI",
        url: "https://garymarcus.substack.com",
        theme: "AIへの批判的・慎重な視点",
        who: "AIの限界や課題も知っておきたい方",
        ideaFit: "「AIのここが心配」という共感系ネタ探しに",
      },
      {
        category: "AI・テクノロジートレンド",
        name: "Understanding AI",
        url: "https://www.understandingai.org",
        theme: "AIの仕組みをやさしく解説",
        who: "AIがどう動いているのか理解したい方",
        ideaFit: "「AIってそういう仕組みなんだ」という解説ネタ探しに",
      },
      {
        category: "マーケティング・グロース戦略",
        name: "Lenny's Newsletter",
        url: "https://www.lennysnewsletter.com",
        theme: "事業成長・キャリアのノウハウ",
        who: "仕事の進め方やキャリアを考えたい方",
        ideaFit: "「できる人の仕事術」系のネタ探しに",
      },
      {
        category: "マーケティング・グロース戦略",
        name: "Growth Unhinged",
        url: "https://www.growthunhinged.com",
        theme: "価格戦略・顧客獲得",
        who: "値付けや集客の考え方を知りたい方",
        ideaFit: "「値段の決め方」「集客のコツ」系のネタ探しに",
      },
      {
        category: "マーケティング・グロース戦略",
        name: "First 1000",
        url: "https://first1000.substack.com",
        theme: "起業初期の顧客獲得ストーリー",
        who: "何か新しいことを始めたい方",
        ideaFit: "「最初の一歩をどう踏み出したか」という体験談ネタ探しに",
      },
      {
        category: "マーケティング・グロース戦略",
        name: "Not Boring",
        url: "https://www.notboring.co",
        theme: "テクノロジーと戦略を物語のように語る",
        who: "難しい話を面白く読みたい方",
        ideaFit: "「読ませる文章の書き方」を学ぶネタ探しに",
      },
      {
        category: "ライティング・コンテンツビジネス",
        name: "Category Pirates",
        url: "https://categorypirates.substack.com",
        theme: "独自のポジションの作り方",
        who: "人と違う切り口を見つけたい方",
        ideaFit: "「自分だけの立ち位置」を考えるネタ探しに",
      },
      {
        category: "ライティング・コンテンツビジネス",
        name: "Simon Owens's Media Newsletter",
        url: "https://simonowens.substack.com",
        theme: "メディア運営・コンテンツでの収益化",
        who: "発信で収益化を目指したい方",
        ideaFit: "「発信の収益化事例」系のネタ探しに",
      },
    ],
  },

  // ------------------------------------------------------------
  // STEP1〜5 詳細
  // ------------------------------------------------------------
  // { } のかたまり1つが STEP1つ分です。増減も自由です。
  // prompt: コピー用プロンプトを表示したい場合だけ設定（不要な場合は null）
  // note: 補足ボックス（水色系） / warning: 注意ボックス（黄色系）
  // screenshots: 実際の画像が届くまでの仮置き表示（[{ label: "〜の画面" }, ...]）
  // keywordPills: 検索キーワードなどを丸いタグで並べたい場合に設定
  steps: [
    {
      number: "STEP 1",
      title: "Substackに登録する",
      paragraphs: ["Substack（サブスタック）は、海外で人気の無料ニュースレターサービスです。"],
      list: [],
      numberedList: [
        "Substack公式サイト（substack.com）を開く",
        "メールアドレスを入力して登録する",
        "届いた確認メールのリンクをクリックする",
        "興味のあるジャンルを選ぶ（あとから変更できます）",
      ],
      afterParagraphs: ["登録は無料。クレジットカードは不要です。"],
      keywordPills: null,
      screenshots: [{ label: "Substackのトップページ" }, { label: "登録フォームの入力画面" }],
      prompt: null,
      note: null,
      warning: null,
    },
    {
      number: "STEP 2",
      title: "人気記事を探す",
      paragraphs: ["気になるジャンルのキーワードで記事を検索してみましょう。"],
      list: [],
      numberedList: [],
      afterParagraphs: [],
      // 検索キーワードは丸いタグで表示
      keywordPills: ["AI", "ChatGPT", "Instagram", "Productivity"],
      screenshots: [{ label: "キーワードで検索している画面" }, { label: "検索結果一覧の画面" }],
      prompt: null,
      note: null,
      warning: null,
      // どの記事を選ぶかの判断基準（検索キーワードの下に表示）
      afterList: [
        "「いいね」やコメントが多い記事",
        "タイトルを見て内容がイメージしやすい記事",
        "更新が新しい記事（1年以内が目安）",
      ],
      afterListIntro: "選ぶ基準は、この3つです。",
    },
    {
      number: "STEP 3",
      title: "ChatGPTで日本語にする",
      paragraphs: ["気になる記事が見つかったら、ChatGPTで日本語にします。"],
      list: [],
      numberedList: [
        "記事のURLをコピーする",
        "ChatGPTに「このURLを日本語に要約して」と伝えて貼り付ける",
        "読み込めない場合は本文をコピーして貼り付け、「日本語に訳して」とお願いする",
        "気になる部分は「もっと詳しく」と追加でお願いする",
      ],
      afterParagraphs: [],
      keywordPills: null,
      screenshots: [{ label: "ChatGPTにURLを貼り付けている画面" }, { label: "日本語に訳された結果の画面" }],
      prompt: null,
      note: {
        label: "補足",
        text: "URLを読み込めないプランもあります。その場合は本文を直接貼り付けてください。",
      },
      warning: null,
    },
    {
      number: "STEP 4",
      title: "note用にリライトする",
      paragraphs: ["日本語にした内容をもとに、下のプロンプトでnote記事を作りましょう。"],
      list: [],
      numberedList: [],
      afterParagraphs: [],
      keywordPills: null,
      screenshots: [{ label: "ChatGPTにプロンプトを送った結果の画面" }],
      prompt: {
        heading: "STEP4用プロンプト",
        description: "STEP3の内容と一緒にコピーして、ChatGPTに送ってください。",
        promptText: `以下の内容をもとに、note用の記事を書いてください。

【記事の要点】
（ここにSTEP3で日本語にした内容を貼り付ける）

【条件】

・タイトル案を3つ
・やさしい言葉で、自分の言葉として書く
・原文の直訳ではなく、自分なりの視点を加える`,
        buttonText: "この指示文をコピーする",
        copiedText: "コピーしました",
      },
      note: null,
      warning: {
        label: "ここ大事",
        text: "自分の言葉に置き換えることが大切です。詳しくは後半の「注意点」もご確認ください。",
      },
    },
    {
      number: "STEP 5",
      title: "投稿前チェック",
      paragraphs: ["公開する前に、次の4つを確認しましょう。"],
      list: [
        "原文をそのままコピーしていないか",
        "自分の言葉が入っているか",
        "日本の読者向けに表現を置き換えたか",
        "事実確認をしたか",
      ],
      numberedList: [],
      afterParagraphs: [],
      keywordPills: null,
      screenshots: [],
      prompt: null,
      note: null,
      warning: null,
    },
  ],

  // ------------------------------------------------------------
  // 注意点
  // ------------------------------------------------------------
  caution: {
    heading: "注意点",
    // 必ず目立つ形で表示する重要な注意（黄色系の警告ボックス）
    warning: {
      label: "必ず読んでください",
      text: "このガイドは、海外記事をそのまま翻訳して投稿する方法ではありません。次の4点を必ず守ってください。",
    },
    // 4つの注意点を「見出し＋説明」の形でまとめて表示
    items: [
      { title: "アイデアや構成を参考にする", text: "本文をそのまま訳さず、切り口や構成をヒントにする。" },
      { title: "自分の言葉で書き直す", text: "AIの訳文をそのまま使わず、自分の言い回しに直す。" },
      { title: "日本向けにアレンジする", text: "海外特有の例えや表現は、日本の読者に伝わる形に置き換える。" },
      { title: "著作権に配慮する", text: "出典を明記し、画像を使う場合は利用規約を確認する。" },
    ],
  },

  // ------------------------------------------------------------
  // 最後の案内（CTA） — リンクは cta.buttonUrl の1か所だけ変更すればOK
  // ------------------------------------------------------------
  cta: {
    heading: "まずは1記事だけ、<br>試してみましょう。",
    paragraphs: [
      "海外の記事をヒントにすれば、<br>ネタ切れに悩む時間がぐっと減ります。",
      "AIをもっと仕事や生活に活かしたい方は、",
    ],
    highlightText: "『AIマネタイズの教科書』",
    afterHighlight: "もあわせてご覧ください。",
    buttonText: "AIマネタイズの教科書を無料で受け取る",
    // ▼▼ 既存の特典と同じ誘導先を利用しています。変更する場合はここだけ書き換えればOK ▼▼
    buttonUrl: "https://sub.aione.co.jp/line/open/ErxG3f10mmcK?mtid=8LTecV7UlNz5",
    bannerImage: "assets/images/cta-banner.png",
    bannerAlt: "無料プレゼント AIマネタイズ教科書。AIで働き方の選択肢を広げたい方へ。LINE登録はこちら",
  },

  // ------------------------------------------------------------
  // フッター
  // ------------------------------------------------------------
  footer: {
    copyright: "© MION",
    notice: "このページの内容の無断転載・複製はご遠慮ください。",
  },
};
