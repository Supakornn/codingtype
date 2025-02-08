export class TypingMetrics {
  private errorHistory: Set<number> = new Set();

  calculateMistakes(input: string, target: string): number {
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== target[i]) {
        this.errorHistory.add(i);
      }
    }
    return this.errorHistory.size;
  }

  reset() {
    this.errorHistory.clear();
  }
}
