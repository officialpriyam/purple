import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'bolt';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  accent: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  shortcuts: {
    'bolt-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 bolt-ease-cubic-bezier',
    kdb: 'bg-purple-elements-code-background text-purple-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      bolt: {
        elements: {
          borderColor: 'var(--purple-elements-borderColor)',
          borderColorActive: 'var(--purple-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--purple-elements-bg-depth-1)',
              2: 'var(--purple-elements-bg-depth-2)',
              3: 'var(--purple-elements-bg-depth-3)',
              4: 'var(--purple-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--purple-elements-textPrimary)',
          textSecondary: 'var(--purple-elements-textSecondary)',
          textTertiary: 'var(--purple-elements-textTertiary)',
          code: {
            background: 'var(--purple-elements-code-background)',
            text: 'var(--purple-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--purple-elements-button-primary-background)',
              backgroundHover: 'var(--purple-elements-button-primary-backgroundHover)',
              text: 'var(--purple-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--purple-elements-button-secondary-background)',
              backgroundHover: 'var(--purple-elements-button-secondary-backgroundHover)',
              text: 'var(--purple-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--purple-elements-button-danger-background)',
              backgroundHover: 'var(--purple-elements-button-danger-backgroundHover)',
              text: 'var(--purple-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--purple-elements-item-contentDefault)',
            contentActive: 'var(--purple-elements-item-contentActive)',
            contentAccent: 'var(--purple-elements-item-contentAccent)',
            contentDanger: 'var(--purple-elements-item-contentDanger)',
            backgroundDefault: 'var(--purple-elements-item-backgroundDefault)',
            backgroundActive: 'var(--purple-elements-item-backgroundActive)',
            backgroundAccent: 'var(--purple-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--purple-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--purple-elements-actions-background)',
            code: {
              background: 'var(--purple-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--purple-elements-artifacts-background)',
            backgroundHover: 'var(--purple-elements-artifacts-backgroundHover)',
            borderColor: 'var(--purple-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--purple-elements-artifacts-inlineCode-background)',
              text: 'var(--purple-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--purple-elements-messages-background)',
            linkColor: 'var(--purple-elements-messages-linkColor)',
            code: {
              background: 'var(--purple-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--purple-elements-messages-inlineCode-background)',
              text: 'var(--purple-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--purple-elements-icon-success)',
            error: 'var(--purple-elements-icon-error)',
            primary: 'var(--purple-elements-icon-primary)',
            secondary: 'var(--purple-elements-icon-secondary)',
            tertiary: 'var(--purple-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--purple-elements-preview-addressBar-background)',
              backgroundHover: 'var(--purple-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--purple-elements-preview-addressBar-backgroundActive)',
              text: 'var(--purple-elements-preview-addressBar-text)',
              textActive: 'var(--purple-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--purple-elements-terminals-background)',
            buttonBackground: 'var(--purple-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--purple-elements-dividerColor)',
          loader: {
            background: 'var(--purple-elements-loader-background)',
            progress: 'var(--purple-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--purple-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--purple-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--purple-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--purple-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--purple-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--purple-elements-cta-background)',
            text: 'var(--purple-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
