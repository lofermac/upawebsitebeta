import { Node, mergeAttributes } from '@tiptap/core';

export interface GalleryOptions {
  HTMLAttributes: Record<string, unknown>;
}

export interface GalleryImage {
  src: string;
  alt?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gallery: {
      setGallery: (attrs: { images: GalleryImage[]; layout: 2 | 3 | 4 | 5 | 6 }) => ReturnType;
    };
  }
}

export const GalleryNode = Node.create<GalleryOptions>({
  name: 'gallery',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      images: {
        default: [],
        parseHTML: (element) => {
          const data = element.getAttribute('data-images');
          return data ? JSON.parse(data) : [];
        },
        renderHTML: (attributes) => {
          return {
            'data-images': JSON.stringify(attributes.images),
          };
        },
      },
      layout: {
        default: 2,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="gallery"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const images: GalleryImage[] = node.attrs.images || [];
    const layout = node.attrs.layout;

    const layoutClasses = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-2',
      5: 'special-5',
      6: 'grid-cols-3',
    };

    const gridClass = layoutClasses[layout as keyof typeof layoutClasses] || 'grid-cols-2';

    // Layout especial para 5 imagens
    if (layout === 5 && images.length === 5) {
      return [
        'div',
        mergeAttributes(HTMLAttributes, {
          'data-type': 'gallery',
          'data-layout': layout,
          class: 'gallery-block my-8',
        }),
        [
          'div',
          { class: 'space-y-4' },
          [
            'div',
            { class: 'grid grid-cols-3 gap-4' },
            ...images.slice(0, 3).map((img) => [
              'div',
              { class: 'relative rounded-2xl overflow-hidden aspect-video' },
              ['img', { src: img.src, alt: img.alt || '', class: 'w-full h-full object-cover' }],
            ]),
          ],
          [
            'div',
            { class: 'flex justify-center gap-4' },
            ...images.slice(3, 5).map((img) => [
              'div',
              { class: 'relative rounded-2xl overflow-hidden aspect-video', style: 'width: calc(33.333% - 0.667rem)' },
              ['img', { src: img.src, alt: img.alt || '', class: 'w-full h-full object-cover' }],
            ]),
          ],
        ],
      ];
    }

    // Layout padrão para outros números
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'gallery',
        'data-layout': layout,
        class: 'gallery-block my-8',
      }),
      [
        'div',
        { class: `grid ${gridClass} gap-4` },
        ...images.map((img) => [
          'div',
          { class: 'relative rounded-2xl overflow-hidden aspect-video' },
          ['img', { src: img.src, alt: img.alt || '', class: 'w-full h-full object-cover' }],
        ]),
      ],
    ];
  },

  addCommands() {
    return {
      setGallery:
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

