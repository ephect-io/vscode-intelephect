export function formatEphectDocument(text: string): string {
  const lines: string[] = text.split('\n');
  let indent: number = 0;
  const INDENT: string = '    ';

  const openers: RegExp[] = [
    /^@if\b/,
    /^@else\b/,
    /^@elseif\b/,
    /^@for\b/,
    /^@while\b/,
    /^@switch\b/,
    /^@case\b/,
    /^@default\b/,
    /\bdo\s*$/,
  ];

  const closers: RegExp[] = [/^@done\b/, /^@endswitch\b/];

  return lines
    .map((line: string): string => {
      const trimmed: string = line.trim();

      // Block closing before indent
      if (closers.some((r: RegExp): boolean => r.test(trimmed))) {
        indent = Math.max(0, indent - 1);
      }

      let formatted: string = INDENT.repeat(indent) + trimmed;

      // Block opening after indent
      if (openers.some((r: RegExp): boolean => r.test(trimmed))) {
        indent++;
      }

      return formatted;
    })
    .join('\n');
}
