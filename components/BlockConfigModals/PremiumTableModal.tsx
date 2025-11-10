'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';

interface PremiumTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (headers: string[], rows: string[][]) => void;
  initialData?: {
    data?: {
      headers: string[];
      rows: string[][];
    };
  };
  onDelete?: () => void;
}

const PremiumTableModal: React.FC<PremiumTableModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
  onDelete,
}) => {
  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3);
  const [headers, setHeaders] = useState<string[]>(['Column 1', 'Column 2', 'Column 3']);
  const [rows, setRows] = useState<string[][]>([
    ['Value 1', 'Value 2', 'Value 3'],
    ['Value 4', 'Value 5', 'Value 6'],
    ['Value 7', 'Value 8', 'Value 9'],
  ]);

  useEffect(() => {
    if (isOpen && initialData?.data) {
      const { headers: initHeaders, rows: initRows } = initialData.data;
      setHeaders(initHeaders);
      setRows(initRows);
      setNumCols(initHeaders.length);
      setNumRows(initRows.length);
    } else if (isOpen && !initialData) {
      setHeaders(['Column 1', 'Column 2', 'Column 3']);
      setRows([
        ['Value 1', 'Value 2', 'Value 3'],
        ['Value 4', 'Value 5', 'Value 6'],
        ['Value 7', 'Value 8', 'Value 9'],
      ]);
      setNumCols(3);
      setNumRows(3);
    }
  }, [isOpen, initialData]);

  const handleRowsChange = (newNumRows: number) => {
    setNumRows(newNumRows);
    const newRows = [...rows];
    
    // Add or remove rows
    if (newNumRows > rows.length) {
      for (let i = rows.length; i < newNumRows; i++) {
        newRows.push(Array(numCols).fill(`Value ${i * numCols + 1}`));
      }
    } else {
      newRows.splice(newNumRows);
    }
    
    setRows(newRows);
  };

  const handleColsChange = (newNumCols: number) => {
    setNumCols(newNumCols);
    
    // Update headers
    const newHeaders = [...headers];
    if (newNumCols > headers.length) {
      for (let i = headers.length; i < newNumCols; i++) {
        newHeaders.push(`Column ${i + 1}`);
      }
    } else {
      newHeaders.splice(newNumCols);
    }
    setHeaders(newHeaders);
    
    // Update rows
    const newRows = rows.map((row) => {
      const newRow = [...row];
      if (newNumCols > row.length) {
        for (let i = row.length; i < newNumCols; i++) {
          newRow.push(`Value ${i + 1}`);
        }
      } else {
        newRow.splice(newNumCols);
      }
      return newRow;
    });
    setRows(newRows);
  };

  const updateHeader = (colIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    setHeaders(newHeaders);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  const handleSubmit = () => {
    onInsert(headers, rows);
    // Reset to defaults
    setNumRows(3);
    setNumCols(3);
    setHeaders(['Column 1', 'Column 2', 'Column 3']);
    setRows([
      ['Value 1', 'Value 2', 'Value 3'],
      ['Value 4', 'Value 5', 'Value 6'],
      ['Value 7', 'Value 8', 'Value 9'],
    ]);
    onClose();
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Premium Table"
      submitText={initialData ? 'Update Block' : 'Insert Block'}
      onDelete={onDelete}
    >
      <div className="space-y-4">
        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Rows
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={numRows}
              onChange={(e) => handleRowsChange(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Columns
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={numCols}
              onChange={(e) => handleColsChange(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            />
          </div>
        </div>

        {/* Headers */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Column Headers
          </label>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
            {headers.map((header, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={header}
                onChange={(e) => updateHeader(colIndex, e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white text-sm"
                placeholder={`Column ${colIndex + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Table Data */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Table Data
          </label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
              >
                {row.map((cell, colIndex) => (
                  <input
                    key={colIndex}
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white text-sm"
                    placeholder={`Row ${rowIndex + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/20 via-emerald-900/30 to-[#077124]/20"></div>
          <div className="relative border-2 border-[#077124]/30 rounded-2xl overflow-hidden backdrop-blur-sm bg-black/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-[#077124]/40 via-[#077124]/50 to-[#077124]/40 border-b-2 border-[#077124]/40">
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="px-4 py-3 text-white font-bold tracking-wide">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-[#077124]/10 hover:bg-[#077124]/10 transition-all duration-300"
                  >
                    {row.map((cell, colIndex) => {
                      const isNumeric = cell.match(/^\d+(\.\d+)?%?$/) || cell.match(/^\d+(\,\d+)?$/) || cell.match(/^\$\d+(\,\d+)?$/);
                      return (
                        <td
                          key={colIndex}
                          className={`px-4 py-3 ${
                            isNumeric
                              ? 'text-emerald-400 font-bold'
                              : 'text-gray-200 font-semibold'
                          } transition-colors`}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default PremiumTableModal;

