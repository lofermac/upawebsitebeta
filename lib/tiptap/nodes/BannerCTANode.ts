import { Node, mergeAttributes } from '@tiptap/core';

export interface BannerCTAOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bannerCTA: {
      setBannerCTA: (attrs: { title: string; description: string; buttonText: string; buttonUrl: string; bgColor?: string }) => ReturnType;
    };
  }
}

export const BannerCTANode = Node.create<BannerCTAOptions>({
  name: 'bannerCTA',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      title: {
        default: 'Start your journey with Universal',
      },
      description: {
        default: 'Join PartyPoker through Universal Poker and unlock exclusive benefits.',
      },
      buttonText: {
        default: 'View Our Deals',
      },
      buttonUrl: {
        default: '/deals',
      },
      bgColor: {
        default: 'from-zinc-900/60 via-black/80 to-zinc-900/60',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="banner-cta"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'banner-cta',
        class: 'banner-cta-block my-12',
      }),
      [
        'div',
        { class: 'relative rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl' },
        [
          'div',
          { class: `absolute inset-0 bg-gradient-to-br ${node.attrs.bgColor}` },
        ],
        [
          'div',
          { class: 'absolute top-1/4 left-1/4 w-72 h-72 bg-[#077124]/[0.08] rounded-full blur-[120px]' },
        ],
        [
          'div',
          { class: 'absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.06] rounded-full blur-[120px]' },
        ],
        [
          'div',
          { 
            class: 'relative border border-white/[0.08] rounded-3xl p-12',
            style: 'text-align: center;'
          },
          [
            'h3',
            {
              class: 'text-white text-2xl md:text-3xl font-bold mb-4',
              style: 'text-shadow: 0 2px 12px rgba(0,0,0,0.4); letter-spacing: -0.015em; text-align: center;',
            },
            node.attrs.title,
          ],
          [
            'p',
            { 
              class: 'text-gray-300 text-base md:text-lg mb-8 max-w-2xl leading-relaxed',
              style: 'text-align: center; margin-left: auto; margin-right: auto;'
            },
            node.attrs.description,
          ],
          [
            'a',
            {
              href: node.attrs.buttonUrl,
              class:
                'banner-cta-button inline-flex items-center justify-center gap-3 px-12 py-5 text-base md:text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full transition-all duration-500 hover:scale-[1.05]',
              style:
                'box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)',
            },
            [
              'span',
              { class: 'tracking-wide drop-shadow-lg' },
              node.attrs.buttonText,
            ],
          ],
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setBannerCTA:
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

