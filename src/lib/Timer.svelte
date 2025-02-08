<script lang="ts">
  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let duration: number;
  const dispatch = createEventDispatcher();

  let timeLeft = duration;
  let intervalId: number;

  export function startTimer() {
    intervalId = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        stopTimer();
        dispatch("timeUp");
      }
    }, 1000);
  }

  export function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  export function reset() {
    stopTimer();
    timeLeft = duration;
  }

  $: if (duration) {
    timeLeft = duration;
  }

  onDestroy(() => {
    stopTimer();
  });
</script>

<div class="text-3xl font-mono">
  {timeLeft}s
</div>
