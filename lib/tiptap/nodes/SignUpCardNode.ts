import { Node, mergeAttributes } from '@tiptap/core';

export interface SignUpCardOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    signUpCard: {
      setSignUpCard: (attrs: {
        logoSrc: string;
        title: string;
        description: string;
        buttonText: string;
        buttonUrl: string;
        bgGradient?: string;
      }) => ReturnType;
    };
  }
}

export const SignUpCardNode = Node.create<SignUpCardOptions>({
  name: 'signUpCard',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      logoSrc: {
        default: 'https://via.placeholder.com/128x128?text=LOGO',
      },
      title: {
        default: 'Create Your Account Today',
      },
      description: {
        default: 'Join thousands of players and start enjoying exclusive benefits.',
      },
      buttonText: {
        default: 'Sign Up Now',
      },
      buttonUrl: {
        default: '/register',
      },
      bgGradient: {
        default: 'from-[#077124]/20 via-emerald-900/30 to-[#077124]/20',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="signup-card"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'signup-card',
        class: 'signup-card-block my-12',
      }),
      [
        'div',
        { class: 'relative rounded-3xl overflow-hidden shadow-2xl w-full' },
        [
          'div',
          { class: `absolute inset-0 bg-gradient-to-br ${node.attrs.bgGradient}` },
        ],
        [
          'div',
          { class: 'relative border-2 border-[#077124]/30 rounded-3xl p-6 md:p-8 backdrop-blur-sm bg-black/40' },
          [
            'div',
            { class: 'flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center' },
            // Column 1: Logo
            [
              'div',
              { class: 'flex-shrink-0' },
              [
                'img',
                {
                  src: node.attrs.logoSrc,
                  alt: 'Logo',
                  class: 'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg object-cover',
                },
              ],
            ],
            // Column 2: Title + Description
            [
              'div',
              { class: 'flex-1 text-center md:text-left' },
              [
                'h3',
                {
                  class: 'text-white text-xl md:text-2xl font-bold mb-2',
                  style: 'text-shadow: 0 2px 12px rgba(0,0,0,0.6); letter-spacing: -0.015em;',
                },
                node.attrs.title,
              ],
              [
                'p',
                { class: 'text-gray-300 text-sm md:text-base leading-relaxed' },
                node.attrs.description,
              ],
            ],
            // Column 3: CTA Button
            [
              'div',
              { class: 'flex-shrink-0' },
              [
                'a',
                {
                  href: node.attrs.buttonUrl,
                  class:
                    'signup-card-cta inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full transition-all duration-500 hover:scale-[1.05] whitespace-nowrap',
                  style:
                    'box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.4), 0 8px 32px rgba(7,113,36,0.3), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)',
                },
                [
                  'span',
                  { class: 'tracking-wide drop-shadow-lg' },
                  node.attrs.buttonText,
                ],
              ],
            ],
          ],
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setSignUpCard:
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

