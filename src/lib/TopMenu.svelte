<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let selectedDuration: number;

  function handleDurationSelect(time: number) {
    selectedDuration = time;
    dispatch("durationChange", time);
  }
</script>

<div class="flex flex-col items-center space-y-8 mb-12">
  <h1 class="text-3xl font-bold text-center text-tokyo-night-highlight">CodingType</h1>
  <div class="flex items-center space-x-6 text-sm">
    <button class="opacity-50 hover:opacity-100 hover:text-tokyo-night-error transition-opacity"
      >Made</button
    >
    <button class="opacity-50 hover:opacity-100 hover:text-tokyo-night-error transition-opacity"
      >with</button
    >
    <button class="opacity-50 hover:opacity-100 transition-opacity">❤️</button>
    <button class="opacity-50 hover:opacity-100 hover:text-tokyo-night-error transition-opacity"
      >by</button
    >
    <button class="text-tokyo-night-accent">Supakornn</button>
    <button
      class="opacity-50 hover:opacity-100 hover:text-tokyo-night-error transition-opacity"
      on:click={() => window.open("https://github.com/Supakornn", "_blank")}
    >
      💻 GitHub</button
    >
  </div>

  <div class="flex items-center space-x-4">
    {#each [15, 30, 60] as time}
      <button
        class="px-3 py-1 rounded {selectedDuration === time
          ? 'text-tokyo-night-accent'
          : 'opacity-50 hover:opacity-100'} transition-all"
        on:click={() => handleDurationSelect(time)}
      >
        {time}
      </button>
    {/each}
  </div>
</div>
