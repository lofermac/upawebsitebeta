import { Node, mergeAttributes } from '@tiptap/core';

export interface DividerOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    divider: {
      setDivider: () => ReturnType;
    };
  }
}

export const DividerNode = Node.create<DividerOptions>({
  name: 'divider',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="divider"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'divider', class: 'divider-block' }),
      [
        'div',
        { class: 'relative' },
        [
          'div',
          { class: 'absolute inset-0 bg-[#077124] blur-sm opacity-30' },
        ],
        [
          'div',
          { class: 'relative h-[2px] bg-gradient-to-r from-transparent via-[#077124] to-transparent' },
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setDivider:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});

