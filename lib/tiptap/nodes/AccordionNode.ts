import { Node, mergeAttributes } from '@tiptap/core';

export interface AccordionOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    accordion: {
      setAccordion: (attrs: { title: string; content: string }) => ReturnType;
    };
  }
}

export const AccordionNode = Node.create<AccordionOptions>({
  name: 'accordion',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      title: {
        default: 'Terms & Conditions',
      },
      content: {
        default: '',
        parseHTML: (element) => {
          return element.getAttribute('data-content') || '';
        },
        renderHTML: (attributes) => {
          return {
            'data-content': attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="accordion"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'accordion',
        'data-content': node.attrs.content,
        class: 'accordion-block my-8',
      }),
      [
        'div',
        {
          class:
            'relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] border border-white/[0.08]',
        },
        [
          'button',
          {
            class: 'accordion-toggle w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors cursor-pointer',
            type: 'button',
          },
          [
            'span',
            { class: 'text-white text-lg font-semibold' },
            node.attrs.title,
          ],
          [
            'svg',
            {
              class: 'w-5 h-5 text-[#077124] transition-transform',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
              'stroke-width': '2.5',
            },
            ['path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19 9l-7 7-7-7' }],
          ],
        ],
        [
          'div',
          {
            class: 'accordion-content hidden px-6 pb-6 border-t border-white/[0.05] pt-6',
            innerHTML: node.attrs.content,
          },
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setAccordion:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});

