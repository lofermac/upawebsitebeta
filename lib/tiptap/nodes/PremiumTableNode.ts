import { Node, mergeAttributes } from '@tiptap/core';

export interface PremiumTableOptions {
  HTMLAttributes: Record<string, unknown>;
}

export interface TableData {
  rows: string[][];
  headers: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    premiumTable: {
      setPremiumTable: (attrs: { data: TableData }) => ReturnType;
    };
  }
}

export const PremiumTableNode = Node.create<PremiumTableOptions>({
  name: 'premiumTable',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      data: {
        default: { headers: [], rows: [] },
        parseHTML: (element) => {
          try {
            return JSON.parse(element.getAttribute('data-table') || '{"headers":[],"rows":[]}');
          } catch {
            return { headers: [], rows: [] };
          }
        },
        renderHTML: (attributes) => ({
          'data-table': JSON.stringify(attributes.data),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="premium-table"]' }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { data } = node.attrs as { data: TableData };
    const { headers, rows } = data;

    // Helper to detect if value is monetary (has £, $, €, or is numeric with optional %)
    const isMonetary = (value: string): boolean => {
      return /^[£$€]\d+/.test(value) || /^\d+(\.\d+)?%?$/.test(value);
    };

    // Helper to detect if value looks like a date
    const isDate = (value: string): boolean => {
      return /\d{1,2}[–\-—]\d{1,2}\s+\w+/.test(value) || /\d{1,2}\s+\w+/.test(value);
    };

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'premium-table',
        class: 'premium-table-block',
      }),
      [
        'div',
        {},
        [
          'table',
          {},
          [
            'thead',
            {},
            [
              'tr',
              { class: 'bg-gradient-to-r from-[#077124]/40 via-[#077124]/50 to-[#077124]/40 border-b-2 border-[#077124]/40' },
              ...headers.map((header) => [
                'th',
                { class: 'px-6 py-5 text-white font-bold text-base tracking-wide' },
                header,
              ]),
            ],
          ],
          [
            'tbody',
            {},
            ...rows.map((row, rowIndex) => [
              'tr',
              {
                class: `${
                  rowIndex < rows.length - 1 ? 'border-b border-[#077124]/10' : ''
                } hover:bg-[#077124]/10 transition-all duration-300 group/row`,
              },
              ...row.map((cell) => {
                // Determine cell classes based on content
                let cellClass = 'px-6 py-5 ';
                if (isMonetary(cell)) {
                  cellClass += 'text-emerald-400 font-bold';
                } else if (isDate(cell)) {
                  cellClass += 'text-gray-400 group-hover/row:text-gray-200 transition-colors';
                } else if (cell.toLowerCase().includes('based on') || cell.toLowerCase().includes('entries')) {
                  cellClass += 'text-gray-300 group-hover/row:text-white transition-colors';
                } else {
                  cellClass += 'text-gray-200 font-semibold group-hover/row:text-white transition-colors';
                }
                return ['td', { class: cellClass }, cell];
              }),
            ]),
          ],
        ],
      ],
    ];
  },

  addCommands() {
    return {
      setPremiumTable:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { data: attrs.data },
          });
        },
    };
  },
});

