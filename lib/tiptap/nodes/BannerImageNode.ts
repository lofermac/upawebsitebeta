import { Node, mergeAttributes } from '@tiptap/core';

export interface BannerImageOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bannerImage: {
      setBannerImage: (attrs: { src: string; alt?: string; size: 'small' | 'medium' | 'large' }) => ReturnType;
    };
  }
}

export const BannerImageNode = Node.create<BannerImageOptions>({
  name: 'bannerImage',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: 'Banner image',
      },
      size: {
        default: 'large',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="banner-image"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const sizeRatios = {
      small: '16/3',
      medium: '16/5',
      large: '16/9',
    };

    const aspectRatio = sizeRatios[node.attrs.size as keyof typeof sizeRatios] || '16/9';

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'banner-image',
        'data-size': node.attrs.size,
        class: 'banner-image-block my-8',
      }),
      [
        'div',
        {
          class: 'relative rounded-2xl overflow-hidden shadow-xl',
          style: `aspect-ratio: ${aspectRatio}`,
        },
        [
          'img',
          {
            src: node.attrs.src || 'https://via.placeholder.com/1600x400?text=Banner+Image',
            alt: node.attrs.alt,
            class: 'w-full h-full object-cover',
          },
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setBannerImage:
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

