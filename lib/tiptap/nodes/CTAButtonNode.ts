import { Node, mergeAttributes } from '@tiptap/core';

export interface CTAButtonOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ctaButton: {
      setCTAButton: (attrs: { text: string; url: string; align?: 'left' | 'center' | 'right' }) => ReturnType;
    };
  }
}

export const CTAButtonNode = Node.create<CTAButtonOptions>({
  name: 'ctaButton',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      text: {
        default: 'Click Here',
      },
      url: {
        default: '#',
      },
      align: {
        default: 'center',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="cta-button"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const alignClass = 
      node.attrs.align === 'left' ? 'justify-start' :
      node.attrs.align === 'right' ? 'justify-end' :
      'justify-center';

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'cta-button',
        class: `cta-button-block flex ${alignClass} my-8`,
      }),
      [
        'a',
        {
          href: node.attrs.url,
          class:
            'group/btn relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]',
          style:
            'box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)',
        },
        [
          'div',
          {
            class:
              'absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500',
          },
        ],
        [
          'div',
          {
            class:
              'absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent',
            style: 'height: 50%',
          },
        ],
        [
          'span',
          {
            class: 'relative z-10 tracking-wide drop-shadow-lg',
          },
          node.attrs.text,
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setCTAButton:
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

