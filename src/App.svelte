<script lang="ts">
  import type { LanguageKey, Snippets } from "./types";
  import TopMenu from "./lib/TopMenu.svelte";
  import TypingTest from "./lib/TypingTest.svelte";
  import Stats from "./lib/Stats.svelte";
  import LanguagePopup from "./lib/LanguagePopup.svelte";
  import snippets from "./data/snippets";
  import ResultPage from "./lib/ResultPage.svelte";

  let selectedDuration = 15;
  let selectedLanguage: LanguageKey = "JavaScript";
  let currentText = "";
  let isTyping = false;
  let wpm = 0;
  let accuracy = 0;
  let mistakes = 0;
  let showStats = false;
  let showLanguagePopup = false;
  let typingTestComponent: TypingTest;
  let currentRoute = "";
  let isTimerRunning = false;

  let availableLanguages = Object.keys(snippets) as LanguageKey[];

  function getRandomSnippet(language: LanguageKey): string {
    const languageSnippets = (snippets as Snippets)[language];
    return languageSnippets[Math.floor(Math.random() * languageSnippets.length)];
  }

  function handleLanguageSelect(event: CustomEvent<LanguageKey>) {
    selectedLanguage = event.detail;
    if (isTyping) {
      resetTest();
    }
  }

  function resetTest() {
    currentText = getRandomSnippet(selectedLanguage);
    isTyping = true;
    showStats = false;
  }

  function calculateStats(userInput: string) {
    const words = userInput.trim().split(/\s+/).length;
    const minutes = selectedDuration / 60;
    wpm = Math.round(words / minutes);

    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentText[i]) correct++;
    }
    accuracy = Math.round((correct / currentText.length) * 100);
  }

  function handleTestComplete(event: CustomEvent<{ userInput: string; mistakes: number }>) {
    const { userInput, mistakes: testMistakes } = event.detail;
    mistakes = testMistakes;
    calculateStats(userInput);
    isTyping = false;
    isTimerRunning = false;
    window.location.hash = "/results";
  }

  function handleDurationChange() {
    if (typingTestComponent) {
      typingTestComponent.resetTest();
      resetTest();
      typingTestComponent.focusInput();
    }
  }

  function handleHashChange() {
    currentRoute = window.location.hash;
    if (currentRoute === "") {
      isTimerRunning = false;
    }
  }

  function handleTimerStatus(event: CustomEvent<{ isRunning: boolean }>) {
    isTimerRunning = event.detail.isRunning;
  }

  $: {
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", handleHashChange);
      handleHashChange();
    }
  }

  resetTest();
</script>

<main class="min-h-screen bg-tokyo-night-bg text-tokyo-night-text">
  {#if currentRoute === "#/results"}
    <ResultPage {wpm} {accuracy} {mistakes} language={selectedLanguage} />
  {:else}
    <div class="max-w-3xl mx-auto px-4 py-8">
      <TopMenu bind:selectedDuration on:durationChange={handleDurationChange} />

      <button
        class="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg transition-all
          {isTimerRunning
          ? 'opacity-50 cursor-not-allowed'
          : 'text-tokyo-night-accent hover:bg-tokyo-night-text hover:bg-opacity-10'}"
        on:click={() => !isTimerRunning && (showLanguagePopup = true)}
        disabled={isTimerRunning}
        title={isTimerRunning ? "Finish coding first" : "Select language"}
      >
        <span class="text-lg">⌨</span>
        <span>{selectedLanguage}</span>
        <span class="text-sm opacity-50">▼</span>
      </button>

      <TypingTest
        bind:this={typingTestComponent}
        {currentText}
        duration={selectedDuration}
        on:complete={handleTestComplete}
        on:timerStatus={handleTimerStatus}
      />

      {#if showStats}
        <div class="mt-8">
          <Stats {wpm} {accuracy} {mistakes} />
        </div>
      {/if}
    </div>
  {/if}
</main>

<LanguagePopup
  bind:show={showLanguagePopup}
  {selectedLanguage}
  languages={availableLanguages}
  on:select={handleLanguageSelect}
/>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #1a1b26;
  }
</style>
