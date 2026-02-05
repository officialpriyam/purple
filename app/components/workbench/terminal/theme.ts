import type { ITheme } from '@xterm/xterm';

const style = getComputedStyle(document.documentElement);
const cssVar = (token: string) => style.getPropertyValue(token) || undefined;

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar('--purple-elements-terminal-cursorColor'),
    cursorAccent: cssVar('--purple-elements-terminal-cursorColorAccent'),
    foreground: cssVar('--purple-elements-terminal-textColor'),
    background: cssVar('--purple-elements-terminal-backgroundColor'),
    selectionBackground: cssVar('--purple-elements-terminal-selection-backgroundColor'),
    selectionForeground: cssVar('--purple-elements-terminal-selection-textColor'),
    selectionInactiveBackground: cssVar('--purple-elements-terminal-selection-backgroundColorInactive'),

    // ansi escape code colors
    black: cssVar('--purple-elements-terminal-color-black'),
    red: cssVar('--purple-elements-terminal-color-red'),
    green: cssVar('--purple-elements-terminal-color-green'),
    yellow: cssVar('--purple-elements-terminal-color-yellow'),
    blue: cssVar('--purple-elements-terminal-color-blue'),
    magenta: cssVar('--purple-elements-terminal-color-magenta'),
    cyan: cssVar('--purple-elements-terminal-color-cyan'),
    white: cssVar('--purple-elements-terminal-color-white'),
    brightBlack: cssVar('--purple-elements-terminal-color-brightBlack'),
    brightRed: cssVar('--purple-elements-terminal-color-brightRed'),
    brightGreen: cssVar('--purple-elements-terminal-color-brightGreen'),
    brightYellow: cssVar('--purple-elements-terminal-color-brightYellow'),
    brightBlue: cssVar('--purple-elements-terminal-color-brightBlue'),
    brightMagenta: cssVar('--purple-elements-terminal-color-brightMagenta'),
    brightCyan: cssVar('--purple-elements-terminal-color-brightCyan'),
    brightWhite: cssVar('--purple-elements-terminal-color-brightWhite'),

    ...overrides,
  };
}
