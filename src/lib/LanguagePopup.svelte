<script lang="ts">
  import type { LanguageKey } from "../types";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher<{
    select: LanguageKey;
  }>();

  export let show = false;
  export let selectedLanguage: LanguageKey;
  export let languages: LanguageKey[];

  let modalRef: HTMLDialogElement;

  function handleSelect(language: LanguageKey) {
    dispatch("select", language);
    show = false;
  }

  function handleClose() {
    show = false;
  }

  $: if (show && modalRef) {
    modalRef.showModal();
  } else if (modalRef) {
    modalRef.close();
  }

  onMount(() => {
    if (show && modalRef) {
      modalRef.showModal();
    }
  });
</script>

<dialog
  bind:this={modalRef}
  class="bg-transparent p-0 m-0 backdrop:bg-black backdrop:bg-opacity-50 fixed inset-0"
  on:close={() => (show = false)}
>
  <div
    class="bg-tokyo-night-bg border border-tokyo-night-text rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto"
  >
    <form method="dialog" class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 id="language-select-title" class="text-xl font-semibold text-tokyo-night-highlight">
          Select Language
        </h2>
        <button
          type="submit"
          class="text-tokyo-night-text hover:text-tokyo-night-accent"
          aria-label="Close dialog"
        >
          ✕
        </button>
      </div>

      <div class="space-y-2">
        {#each languages as language}
          <button
            type="button"
            class="w-full text-left p-2 rounded hover:bg-tokyo-night-text hover:bg-opacity-10 transition-colors
                   {selectedLanguage === language
              ? 'text-tokyo-night-accent'
              : 'text-tokyo-night-text'}"
            on:click={() => handleSelect(language)}
          >
            {language}
          </button>
        {/each}
      </div>
    </form>
  </div>
</dialog>

<style>
  dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
  }

  dialog::backdrop {
    animation: fade-in 0.1s ease-out;
  }

  dialog[open] {
    animation: slide-up 0.2s ease-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      transform: translate(-50%, -45%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
</style>
