import { Node, mergeAttributes } from '@tiptap/core';

export interface SectionHeadingOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sectionHeading: {
      setSectionHeading: (attrs: { text: string }) => ReturnType;
    };
  }
}

export const SectionHeadingNode = Node.create<SectionHeadingOptions>({
  name: 'sectionHeading',

  group: 'block',

  content: 'text*',

  addAttributes() {
    return {
      text: {
        default: 'Section Title',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'h2[data-type="section-heading"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'h2',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'section-heading',
        class: 'section-heading text-white text-2xl md:text-3xl font-bold',
        style: 'text-shadow: 0 2px 12px rgba(0,0,0,0.4); letter-spacing: -0.015em;',
      }),
      node.attrs.text || 0,
    ];
  },

  addCommands() {
    return {
      setSectionHeading:
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

