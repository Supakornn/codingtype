<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Timer from "./Timer.svelte";
  import { getLines, getExpectedIndentation } from "./utils/textProcessing";
  import { TypingMetrics } from "./utils/typingMetrics";

  export let currentText: string;
  export let duration: number;

  let timerComponent: Timer;
  let userInput = "";
  let mistakes = 0;
  let hasStarted = false;
  let inputRef: HTMLInputElement;

  const dispatch = createEventDispatcher();
  const metrics = new TypingMetrics();

  $: lines = getLines(currentText);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Tab") {
      const prevChar = userInput[userInput.length - 1];
      if (prevChar === "\n") {
        const expectedIndent = getExpectedIndentation(lines, userInput.length - 1);
        if (expectedIndent > 0) {
          userInput += " ".repeat(expectedIndent);
          event.preventDefault();
        }
      }
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key === "Backspace") {
      if (userInput.length > 0) {
        userInput = userInput.slice(0, -1);
      }
      event.preventDefault();
      return;
    }

    if (event.key === "Enter") {
      if (!hasStarted) {
        hasStarted = true;
        timerComponent.startTimer();
      }

      if (userInput.length < currentText.length) {
        const expectedIndent = getExpectedIndentation(lines, userInput.length);
        userInput += "\n" + " ".repeat(expectedIndent);
        mistakes = Array.from(userInput).reduce((count, char, i) => {
          return count + (char !== currentText[i] ? 1 : 0);
        }, 0);

        if (userInput.length === currentText.length) {
          timerComponent.stopTimer();
          dispatch("complete", { userInput, mistakes });
        }
      }

      event.preventDefault();
      return;
    }

    if (event.key.length === 1) {
      if (!hasStarted) {
        hasStarted = true;
        timerComponent.startTimer();
      }

      if (userInput.length < currentText.length) {
        userInput += event.key;
        mistakes = metrics.calculateMistakes(userInput, currentText);

        if (userInput.length === currentText.length) {
          timerComponent.stopTimer();
          dispatch("complete", { userInput, mistakes });
        }
      }

      event.preventDefault();
    }
  }

  function handleTimeUp() {
    dispatch("complete", { userInput, mistakes });
  }

  export function resetTest() {
    userInput = "";
    mistakes = 0;
    metrics.reset();
    hasStarted = false;
    timerComponent.reset();
    setTimeout(() => {
      inputRef?.focus();
    }, 0);
  }

  export function focusInput() {
    inputRef?.focus();
  }

  function handleReset() {
    resetTest();
    focusInput();
  }

  let focusInterval: number;

  onMount(() => {
    inputRef.focus();
    focusInterval = setInterval(() => {
      if (document.activeElement !== inputRef) {
        inputRef?.focus();
      }
    }, 100);

    return () => {
      clearInterval(focusInterval);
    };
  });

  $: {
    if (hasStarted) {
      dispatch("timerStatus", { isRunning: true });
    } else {
      dispatch("timerStatus", { isRunning: false });
    }
  }
</script>

<form class="space-y-8" on:submit|preventDefault>
  <h2 class="sr-only">Coding</h2>

  <div class="flex justify-between items-center">
    <input
      type="text"
      class="sr-only"
      aria-label="Coding input"
      bind:this={inputRef}
      on:keydown={handleKeydown}
    />
    <Timer bind:this={timerComponent} {duration} on:timeUp={handleTimeUp} />
    <button
      type="button"
      class="w-8 h-8 flex items-center justify-center rounded-full text-tokyo-night-text opacity-50 hover:opacity-100 hover:bg-tokyo-night-text hover:text-tokyo-night-accent hover:bg-opacity-10 transition-all"
      on:click={handleReset}
      aria-label="Reset test"
    >
      ↺
    </button>
  </div>

  <div class="font-mono text-lg cursor-default select-none bg-tokyo-night-bg/50 rounded-lg p-6">
    <div class="code-container">
      {#each lines as line, i}
        <div class="code-line">
          {#each line.text.split("") as char, j}
            {@const index = line.start + j}
            <span
              class="code-char {index < userInput.length
                ? userInput[index] === char
                  ? 'text-tokyo-night-accent'
                  : 'text-tokyo-night-error'
                : index === userInput.length
                  ? 'bg-tokyo-night-accent bg-opacity-50'
                  : 'text-tokyo-night-text opacity-50'}">{char}</span
            >
          {/each}
          {#if line.end === userInput.length && i < lines.length - 1}
            <span class="cursor-newline bg-tokyo-night-accent bg-opacity-50">⏎</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  {#if !hasStarted}
    <div class="text-center text-sm text-tokyo-night-text opacity-50">
      Type any key to start coding
    </div>
  {/if}
</form>

<style>
  .code-container {
    font-family: "JetBrains Mono", monospace;
    line-height: 1.6;
  }

  .code-line {
    min-height: 1.6em;
    white-space: pre;
  }

  .code-char {
    display: inline-block;
  }

  .cursor-newline {
    font-size: 0.8em;
    padding: 0 0.2em;
  }
</style>
