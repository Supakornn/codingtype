<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  
  export let wpm: number;
  export let accuracy: number;
  export let mistakes: number;
  
  onMount(() => {
    const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['WPM', 'Accuracy %', 'Mistakes'],
        datasets: [{
          data: [wpm, accuracy, mistakes],
          backgroundColor: [
            '#7aa2f7',
            '#bb9af7',
            '#f7768e'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
</script>

<div class="p-4 bg-tokyo-night-bg rounded-lg">
  <canvas id="statsChart"></canvas>
  <div class="grid grid-cols-3 gap-4 mt-4 text-center">
    <div>
      <div class="text-tokyo-night-accent text-2xl">{wpm}</div>
      <div class="text-tokyo-night-text">WPM</div>
    </div>
    <div>
      <div class="text-tokyo-night-highlight text-2xl">{accuracy}%</div>
      <div class="text-tokyo-night-text">Accuracy</div>
    </div>
    <div>
      <div class="text-tokyo-night-error text-2xl">{mistakes}</div>
      <div class="text-tokyo-night-text">Mistakes</div>
    </div>
  </div>
</div>