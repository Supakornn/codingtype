<script lang="ts">
  import Stats from "./Stats.svelte";

  export let wpm: number;
  export let accuracy: number;
  export let mistakes: number;
  export let language: string;

  function handleRetry() {
    window.location.hash = "";
  }
</script>

<div class="max-w-2xl mx-auto py-12 px-4">
  <h1 class="text-2xl font-semibold text-tokyo-night-accent text-center mb-8">
    Complete - <span class="text-tokyo-night-highlight">{language}</span>
  </h1>

  <Stats {wpm} {accuracy} {mistakes} />

  <div class="flex justify-center mt-12 space-x-4">
    <button
      class="px-6 py-2 bg-tokyo-night-accent bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
      on:click={handleRetry}
    >
      Try Again
    </button>
  </div>
</div>
