export interface Line {
  text: string;
  start: number;
  end: number;
}

export function getLines(text: string): Line[] {
  const lines: Line[] = [];
  let position = 0;

  text.split("\n").forEach((line) => {
    lines.push({
      text: line,
      start: position,
      end: position + line.length
    });
    position += line.length + 1;
  });

  return lines;
}

export function getExpectedIndentation(lines: Line[], currentPos: number): number {
  const currentLine = lines.find((line) => currentPos >= line.start && currentPos <= line.end);
  if (!currentLine) return 0;

  const nextLineIndex = lines.findIndex((l) => l === currentLine) + 1;
  if (nextLineIndex >= lines.length) return 0;

  const nextLine = lines[nextLineIndex];
  const spaces = nextLine.text.match(/^\s*/)?.[0]?.length || 0;
  return spaces;
}
