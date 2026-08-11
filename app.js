(function () {
  "use strict";

  const screens = {
    home: document.getElementById("screen-home"),
    study: document.getElementById("screen-study"),
    flashcards: document.getElementById("screen-flashcards"),
    match: document.getElementById("screen-match"),
    type: document.getElementById("screen-type"),
    result: document.getElementById("screen-result"),
  };

  function showScreen(name) {
    Object.values(screens).forEach((el) => el.classList.remove("active"));
    screens[name].classList.add("active");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickRandomFive() {
    return shuffle(FORMS).slice(0, 5);
  }

  // ---- round state ----
  let roundItems = [];
  let score = 0;

  function startRound() {
    roundItems = pickRandomFive();
    score = 0;
    showScreen("study");
  }

  // ---- Flash cards mode ----
  let flashcardItems = [];
  let flashcardIndex = 0;

  function renderFlashcard() {
    const item = flashcardItems[flashcardIndex];
    document.getElementById("flashcard-progress").textContent =
      `${flashcardIndex + 1} / ${flashcardItems.length}`;
    document.getElementById("flashcard-card").innerHTML = `
      <div class="num">${item.number}</div>
      <div class="ordinal-kanji jp">${item.ordinalKanji}</div>
      <div class="romaji">${item.ordinalRomaji}</div>
      <div class="waza">
        <span class="waza-kanji jp">${item.wazaKanji}</span><br>
        ${item.wazaRomaji} (${item.meaningEn})
      </div>
    `;
    const nextBtn = document.getElementById("btn-flashcard-next");
    const isLast = flashcardIndex === flashcardItems.length - 1;
    nextBtn.innerHTML = isLast
      ? `Done <span class="jp">終了</span>`
      : `Next <span class="jp">次へ</span>`;
  }

  function startFlashcards() {
    flashcardItems = pickRandomFive();
    flashcardIndex = 0;
    renderFlashcard();
    showScreen("flashcards");
  }

  function onFlashcardNext() {
    if (flashcardIndex < flashcardItems.length - 1) {
      flashcardIndex++;
      renderFlashcard();
    } else {
      showScreen("study");
    }
  }

  // ---- Matching mode ----
  let matchSelected = null; // { el, item, side }
  let matchLockedCount = 0;

  function startMatching(mode) {
    matchSelected = null;
    matchLockedCount = 0;
    const board = document.getElementById("match-board");
    board.innerHTML = "";

    const title = document.getElementById("match-title");
    if (mode === "numbersOnly") {
      title.innerHTML = `Matching (Numbers Only) <span class="jp">数字だけでマッチング</span>`;
    } else {
      title.innerHTML = `Matching <span class="jp">マッチング</span>`;
    }

    const leftCol = document.createElement("div");
    leftCol.className = "match-col";
    const rightCol = document.createElement("div");
    rightCol.className = "match-col";

    const leftOrder = shuffle(roundItems);
    const rightOrder = shuffle(roundItems);

    leftOrder.forEach((item) => {
      const card = document.createElement("div");
      card.dataset.number = item.number;
      card.dataset.side = "left";
      if (mode === "numbersOnly") {
        card.className = "match-card number-plain";
        card.textContent = item.number;
      } else {
        card.className = "match-card number-card";
        card.innerHTML = `${item.number}. ${item.ordinalRomaji}`;
      }
      card.addEventListener("click", () => onMatchCardClick(card, item, "left"));
      leftCol.appendChild(card);
    });

    rightOrder.forEach((item) => {
      const card = document.createElement("div");
      card.dataset.number = item.number;
      card.dataset.side = "right";
      if (mode === "numbersOnly") {
        card.className = "match-card combo-card jp";
        card.innerHTML = `
          <span class="combo-kanji">${item.ordinalKanji} ${item.wazaKanji}</span>
          <span class="combo-romaji">${item.ordinalRomaji}: ${item.wazaRomaji}</span>
        `;
      } else {
        card.className = "match-card kanji-card jp";
        card.textContent = item.ordinalKanji;
      }
      card.addEventListener("click", () => onMatchCardClick(card, item, "right"));
      rightCol.appendChild(card);
    });

    board.appendChild(leftCol);
    board.appendChild(rightCol);
    showScreen("match");
  }

  function onMatchCardClick(card, item, side) {
    if (card.classList.contains("correct")) return;

    if (!matchSelected) {
      matchSelected = { el: card, item, side };
      card.classList.add("selected");
      return;
    }

    if (matchSelected.side === side) {
      // switching selection within the same column
      matchSelected.el.classList.remove("selected");
      matchSelected = { el: card, item, side };
      card.classList.add("selected");
      return;
    }

    // attempt a pair
    const a = matchSelected;
    const isMatch = a.item.number === item.number;

    if (isMatch) {
      a.el.classList.remove("selected");
      a.el.classList.add("correct");
      card.classList.add("correct");
      matchLockedCount += 2;
      matchSelected = null;
      if (matchLockedCount === roundItems.length * 2) {
        score = roundItems.length;
        setTimeout(() => finishRound(), 500);
      }
    } else {
      card.classList.add("wrong");
      a.el.classList.add("wrong");
      setTimeout(() => {
        card.classList.remove("wrong");
        a.el.classList.remove("wrong", "selected");
      }, 450);
      matchSelected = null;
    }
  }

  // ---- Typing mode ----
  let typeIndex = 0;
  let typeItems = [];
  let typeMode = "labeled";

  function normalizeRomaji(s) {
    return s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function fullRomaji(item) {
    return `${item.ordinalRomaji} ${item.wazaRomaji}`;
  }

  function startTyping(mode) {
    typeMode = mode || "labeled";
    typeItems = shuffle(roundItems);
    typeIndex = 0;
    score = 0;

    const title = document.getElementById("type-title");
    const insEn = document.getElementById("type-instructions-en");
    const insJp = document.getElementById("type-instructions-jp");
    const input = document.getElementById("type-input");

    if (typeMode === "numbersOnly") {
      title.innerHTML = `Type the Kanji (Numbers Only) <span class="jp">数字だけで入力</span>`;
      insEn.textContent = "Type the kanji for the number shown.";
      insJp.textContent = "表示された番号の漢字を入力してください。";
      input.placeholder = "漢字を入力 / kanji here";
      input.lang = "ja";
    } else if (typeMode === "romajiNumbersOnly") {
      title.innerHTML = `Type the Romaji (Numbers Only) <span class="jp">数字だけでローマ字入力</span>`;
      insEn.textContent = "Type the full romaji (ordinal name + technique name) for the number shown. The kanji will appear as you type it correctly.";
      insJp.textContent = "表示された番号の正式なローマ字（序数名と技名）を入力してください。正しく入力すると漢字が表示されます。";
      input.placeholder = "e.g. Hachihon-me Ganmen Ate";
      input.removeAttribute("lang");
    } else {
      title.innerHTML = `Type the Kanji <span class="jp">漢字入力</span>`;
      insEn.textContent = "Type the kanji for the number shown.";
      insJp.textContent = "表示された番号の漢字を入力してください。";
      input.placeholder = "漢字を入力 / kanji here";
      input.lang = "ja";
    }

    showScreen("type");
    renderTypeQuestion();
  }

  function renderTypeQuestion() {
    const item = typeItems[typeIndex];
    document.getElementById("type-progress").textContent =
      `${typeIndex + 1} / ${typeItems.length}`;
    document.getElementById("type-prompt").innerHTML =
      typeMode === "labeled"
        ? `
          <span class="num">${item.number}</span>
          <span class="romaji">${item.ordinalRomaji}</span>
        `
        : typeMode === "romajiNumbersOnly"
        ? `<span class="num">${item.number}</span>`
        : `
          <span class="num">${item.number}</span>
          <span class="waza-hint jp">${item.wazaRomaji} (${item.wazaKanji})</span>
        `;
    const feedback = document.getElementById("type-feedback");
    feedback.textContent = "";
    feedback.className = "type-feedback";
    const reveal = document.getElementById("type-reveal");
    reveal.textContent = "";
    reveal.classList.remove("visible");
    const input = document.getElementById("type-input");
    input.value = "";
    input.disabled = false;
    input.focus();
  }

  function onTypeInputLive() {
    if (typeMode !== "romajiNumbersOnly") return;
    const input = document.getElementById("type-input");
    if (input.disabled) return;
    const item = typeItems[typeIndex];
    const reveal = document.getElementById("type-reveal");
    if (normalizeRomaji(input.value) === normalizeRomaji(fullRomaji(item))) {
      reveal.textContent = `${item.ordinalKanji} ${item.wazaKanji}`;
      reveal.classList.add("visible");
    } else {
      reveal.textContent = "";
      reveal.classList.remove("visible");
    }
  }

  function checkTypeAnswer(e) {
    e.preventDefault();
    const input = document.getElementById("type-input");
    if (input.disabled) return;

    const item = typeItems[typeIndex];
    const answer = input.value.trim();
    const feedback = document.getElementById("type-feedback");
    const reveal = document.getElementById("type-reveal");
    const isRomaji = typeMode === "romajiNumbersOnly";
    const isCorrect = isRomaji
      ? normalizeRomaji(answer) === normalizeRomaji(fullRomaji(item))
      : answer === item.ordinalKanji;

    if (isCorrect) {
      score++;
      feedback.textContent = "Correct! 正解！";
      feedback.className = "type-feedback ok";
      if (isRomaji) {
        reveal.textContent = `${item.ordinalKanji} ${item.wazaKanji}`;
        reveal.classList.add("visible");
      }
    } else {
      feedback.textContent = isRomaji
        ? `Answer: ${fullRomaji(item)} (${item.ordinalKanji} ${item.wazaKanji})`
        : `Answer: ${item.ordinalKanji} (${item.ordinalRomaji})`;
      feedback.className = "type-feedback bad";
      if (isRomaji) {
        reveal.textContent = `${item.ordinalKanji} ${item.wazaKanji}`;
        reveal.classList.add("visible");
      }
    }

    input.disabled = true;
    setTimeout(() => {
      typeIndex++;
      if (typeIndex < typeItems.length) {
        renderTypeQuestion();
      } else {
        finishRound();
      }
    }, 900);
  }

  function finishRound() {
    document.getElementById("result-score").textContent =
      `${score} / ${roundItems.length} correct`;
    showScreen("result");
  }

  // ---- wiring ----
  document.getElementById("btn-start").addEventListener("click", startRound);
  document.getElementById("btn-mode-flashcards").addEventListener("click", startFlashcards);
  document.getElementById("btn-flashcard-next").addEventListener("click", onFlashcardNext);
  document.getElementById("btn-home-from-flashcards").addEventListener("click", () => showScreen("study"));
  document.getElementById("btn-mode-match").addEventListener("click", () => startMatching("labeled"));
  document.getElementById("btn-mode-type").addEventListener("click", () => startTyping("labeled"));
  document.getElementById("btn-mode-match-numbers").addEventListener("click", () => startMatching("numbersOnly"));
  document.getElementById("btn-mode-type-numbers").addEventListener("click", () => startTyping("numbersOnly"));
  document.getElementById("btn-mode-type-romaji").addEventListener("click", () => startTyping("romajiNumbersOnly"));
  document.getElementById("btn-home-from-study").addEventListener("click", () => showScreen("home"));
  document.getElementById("btn-again").addEventListener("click", startRound);
  document.getElementById("btn-home-from-result").addEventListener("click", () => showScreen("home"));
  document.getElementById("type-form").addEventListener("submit", checkTypeAnswer);
  document.getElementById("type-input").addEventListener("input", onTypeInputLive);

  showScreen("home");
})();
