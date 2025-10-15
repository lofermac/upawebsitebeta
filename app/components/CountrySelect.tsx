'use client'

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, X } from 'lucide-react';
import * as flags from 'country-flag-icons/react/3x2';

// Tipos
interface Country {
  code: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Flag: any;
}

// Lista completa de países com códigos ISO 3166-1 alpha-2 e componentes de bandeiras
const countries: Country[] = [
  { code: 'AF', name: 'Afghanistan', Flag: flags.AF },
  { code: 'AL', name: 'Albania', Flag: flags.AL },
  { code: 'DZ', name: 'Algeria', Flag: flags.DZ },
  { code: 'AD', name: 'Andorra', Flag: flags.AD },
  { code: 'AO', name: 'Angola', Flag: flags.AO },
  { code: 'AG', name: 'Antigua and Barbuda', Flag: flags.AG },
  { code: 'AR', name: 'Argentina', Flag: flags.AR },
  { code: 'AM', name: 'Armenia', Flag: flags.AM },
  { code: 'AU', name: 'Australia', Flag: flags.AU },
  { code: 'AT', name: 'Austria', Flag: flags.AT },
  { code: 'AZ', name: 'Azerbaijan', Flag: flags.AZ },
  { code: 'BS', name: 'Bahamas', Flag: flags.BS },
  { code: 'BH', name: 'Bahrain', Flag: flags.BH },
  { code: 'BD', name: 'Bangladesh', Flag: flags.BD },
  { code: 'BB', name: 'Barbados', Flag: flags.BB },
  { code: 'BY', name: 'Belarus', Flag: flags.BY },
  { code: 'BE', name: 'Belgium', Flag: flags.BE },
  { code: 'BZ', name: 'Belize', Flag: flags.BZ },
  { code: 'BJ', name: 'Benin', Flag: flags.BJ },
  { code: 'BT', name: 'Bhutan', Flag: flags.BT },
  { code: 'BO', name: 'Bolivia', Flag: flags.BO },
  { code: 'BA', name: 'Bosnia and Herzegovina', Flag: flags.BA },
  { code: 'BW', name: 'Botswana', Flag: flags.BW },
  { code: 'BR', name: 'Brazil', Flag: flags.BR },
  { code: 'BN', name: 'Brunei', Flag: flags.BN },
  { code: 'BG', name: 'Bulgaria', Flag: flags.BG },
  { code: 'BF', name: 'Burkina Faso', Flag: flags.BF },
  { code: 'BI', name: 'Burundi', Flag: flags.BI },
  { code: 'KH', name: 'Cambodia', Flag: flags.KH },
  { code: 'CM', name: 'Cameroon', Flag: flags.CM },
  { code: 'CA', name: 'Canada', Flag: flags.CA },
  { code: 'CV', name: 'Cape Verde', Flag: flags.CV },
  { code: 'CF', name: 'Central African Republic', Flag: flags.CF },
  { code: 'TD', name: 'Chad', Flag: flags.TD },
  { code: 'CL', name: 'Chile', Flag: flags.CL },
  { code: 'CN', name: 'China', Flag: flags.CN },
  { code: 'CO', name: 'Colombia', Flag: flags.CO },
  { code: 'KM', name: 'Comoros', Flag: flags.KM },
  { code: 'CG', name: 'Congo', Flag: flags.CG },
  { code: 'CR', name: 'Costa Rica', Flag: flags.CR },
  { code: 'HR', name: 'Croatia', Flag: flags.HR },
  { code: 'CU', name: 'Cuba', Flag: flags.CU },
  { code: 'CY', name: 'Cyprus', Flag: flags.CY },
  { code: 'CZ', name: 'Czech Republic', Flag: flags.CZ },
  { code: 'DK', name: 'Denmark', Flag: flags.DK },
  { code: 'DJ', name: 'Djibouti', Flag: flags.DJ },
  { code: 'DM', name: 'Dominica', Flag: flags.DM },
  { code: 'DO', name: 'Dominican Republic', Flag: flags.DO },
  { code: 'TL', name: 'East Timor', Flag: flags.TL },
  { code: 'EC', name: 'Ecuador', Flag: flags.EC },
  { code: 'EG', name: 'Egypt', Flag: flags.EG },
  { code: 'SV', name: 'El Salvador', Flag: flags.SV },
  { code: 'GQ', name: 'Equatorial Guinea', Flag: flags.GQ },
  { code: 'ER', name: 'Eritrea', Flag: flags.ER },
  { code: 'EE', name: 'Estonia', Flag: flags.EE },
  { code: 'ET', name: 'Ethiopia', Flag: flags.ET },
  { code: 'FJ', name: 'Fiji', Flag: flags.FJ },
  { code: 'FI', name: 'Finland', Flag: flags.FI },
  { code: 'FR', name: 'France', Flag: flags.FR },
  { code: 'GA', name: 'Gabon', Flag: flags.GA },
  { code: 'GM', name: 'Gambia', Flag: flags.GM },
  { code: 'GE', name: 'Georgia', Flag: flags.GE },
  { code: 'DE', name: 'Germany', Flag: flags.DE },
  { code: 'GH', name: 'Ghana', Flag: flags.GH },
  { code: 'GR', name: 'Greece', Flag: flags.GR },
  { code: 'GD', name: 'Grenada', Flag: flags.GD },
  { code: 'GT', name: 'Guatemala', Flag: flags.GT },
  { code: 'GN', name: 'Guinea', Flag: flags.GN },
  { code: 'GW', name: 'Guinea-Bissau', Flag: flags.GW },
  { code: 'GY', name: 'Guyana', Flag: flags.GY },
  { code: 'HT', name: 'Haiti', Flag: flags.HT },
  { code: 'HN', name: 'Honduras', Flag: flags.HN },
  { code: 'HU', name: 'Hungary', Flag: flags.HU },
  { code: 'IS', name: 'Iceland', Flag: flags.IS },
  { code: 'IN', name: 'India', Flag: flags.IN },
  { code: 'ID', name: 'Indonesia', Flag: flags.ID },
  { code: 'IR', name: 'Iran', Flag: flags.IR },
  { code: 'IQ', name: 'Iraq', Flag: flags.IQ },
  { code: 'IE', name: 'Ireland', Flag: flags.IE },
  { code: 'IL', name: 'Israel', Flag: flags.IL },
  { code: 'IT', name: 'Italy', Flag: flags.IT },
  { code: 'JM', name: 'Jamaica', Flag: flags.JM },
  { code: 'JP', name: 'Japan', Flag: flags.JP },
  { code: 'JO', name: 'Jordan', Flag: flags.JO },
  { code: 'KZ', name: 'Kazakhstan', Flag: flags.KZ },
  { code: 'KE', name: 'Kenya', Flag: flags.KE },
  { code: 'KI', name: 'Kiribati', Flag: flags.KI },
  { code: 'KP', name: 'North Korea', Flag: flags.KP },
  { code: 'KR', name: 'South Korea', Flag: flags.KR },
  { code: 'KW', name: 'Kuwait', Flag: flags.KW },
  { code: 'KG', name: 'Kyrgyzstan', Flag: flags.KG },
  { code: 'LA', name: 'Laos', Flag: flags.LA },
  { code: 'LV', name: 'Latvia', Flag: flags.LV },
  { code: 'LB', name: 'Lebanon', Flag: flags.LB },
  { code: 'LS', name: 'Lesotho', Flag: flags.LS },
  { code: 'LR', name: 'Liberia', Flag: flags.LR },
  { code: 'LY', name: 'Libya', Flag: flags.LY },
  { code: 'LI', name: 'Liechtenstein', Flag: flags.LI },
  { code: 'LT', name: 'Lithuania', Flag: flags.LT },
  { code: 'LU', name: 'Luxembourg', Flag: flags.LU },
  { code: 'MK', name: 'Macedonia', Flag: flags.MK },
  { code: 'MG', name: 'Madagascar', Flag: flags.MG },
  { code: 'MW', name: 'Malawi', Flag: flags.MW },
  { code: 'MY', name: 'Malaysia', Flag: flags.MY },
  { code: 'MV', name: 'Maldives', Flag: flags.MV },
  { code: 'ML', name: 'Mali', Flag: flags.ML },
  { code: 'MT', name: 'Malta', Flag: flags.MT },
  { code: 'MH', name: 'Marshall Islands', Flag: flags.MH },
  { code: 'MR', name: 'Mauritania', Flag: flags.MR },
  { code: 'MU', name: 'Mauritius', Flag: flags.MU },
  { code: 'MX', name: 'Mexico', Flag: flags.MX },
  { code: 'FM', name: 'Micronesia', Flag: flags.FM },
  { code: 'MD', name: 'Moldova', Flag: flags.MD },
  { code: 'MC', name: 'Monaco', Flag: flags.MC },
  { code: 'MN', name: 'Mongolia', Flag: flags.MN },
  { code: 'ME', name: 'Montenegro', Flag: flags.ME },
  { code: 'MA', name: 'Morocco', Flag: flags.MA },
  { code: 'MZ', name: 'Mozambique', Flag: flags.MZ },
  { code: 'MM', name: 'Myanmar', Flag: flags.MM },
  { code: 'NA', name: 'Namibia', Flag: flags.NA },
  { code: 'NR', name: 'Nauru', Flag: flags.NR },
  { code: 'NP', name: 'Nepal', Flag: flags.NP },
  { code: 'NL', name: 'Netherlands', Flag: flags.NL },
  { code: 'NZ', name: 'New Zealand', Flag: flags.NZ },
  { code: 'NI', name: 'Nicaragua', Flag: flags.NI },
  { code: 'NE', name: 'Niger', Flag: flags.NE },
  { code: 'NG', name: 'Nigeria', Flag: flags.NG },
  { code: 'NO', name: 'Norway', Flag: flags.NO },
  { code: 'OM', name: 'Oman', Flag: flags.OM },
  { code: 'PK', name: 'Pakistan', Flag: flags.PK },
  { code: 'PW', name: 'Palau', Flag: flags.PW },
  { code: 'PA', name: 'Panama', Flag: flags.PA },
  { code: 'PG', name: 'Papua New Guinea', Flag: flags.PG },
  { code: 'PY', name: 'Paraguay', Flag: flags.PY },
  { code: 'PE', name: 'Peru', Flag: flags.PE },
  { code: 'PH', name: 'Philippines', Flag: flags.PH },
  { code: 'PL', name: 'Poland', Flag: flags.PL },
  { code: 'PT', name: 'Portugal', Flag: flags.PT },
  { code: 'QA', name: 'Qatar', Flag: flags.QA },
  { code: 'RO', name: 'Romania', Flag: flags.RO },
  { code: 'RU', name: 'Russia', Flag: flags.RU },
  { code: 'RW', name: 'Rwanda', Flag: flags.RW },
  { code: 'KN', name: 'Saint Kitts and Nevis', Flag: flags.KN },
  { code: 'LC', name: 'Saint Lucia', Flag: flags.LC },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', Flag: flags.VC },
  { code: 'WS', name: 'Samoa', Flag: flags.WS },
  { code: 'SM', name: 'San Marino', Flag: flags.SM },
  { code: 'ST', name: 'Sao Tome and Principe', Flag: flags.ST },
  { code: 'SA', name: 'Saudi Arabia', Flag: flags.SA },
  { code: 'SN', name: 'Senegal', Flag: flags.SN },
  { code: 'RS', name: 'Serbia', Flag: flags.RS },
  { code: 'SC', name: 'Seychelles', Flag: flags.SC },
  { code: 'SL', name: 'Sierra Leone', Flag: flags.SL },
  { code: 'SG', name: 'Singapore', Flag: flags.SG },
  { code: 'SK', name: 'Slovakia', Flag: flags.SK },
  { code: 'SI', name: 'Slovenia', Flag: flags.SI },
  { code: 'SB', name: 'Solomon Islands', Flag: flags.SB },
  { code: 'SO', name: 'Somalia', Flag: flags.SO },
  { code: 'ZA', name: 'South Africa', Flag: flags.ZA },
  { code: 'ES', name: 'Spain', Flag: flags.ES },
  { code: 'LK', name: 'Sri Lanka', Flag: flags.LK },
  { code: 'SD', name: 'Sudan', Flag: flags.SD },
  { code: 'SR', name: 'Suriname', Flag: flags.SR },
  { code: 'SZ', name: 'Swaziland', Flag: flags.SZ },
  { code: 'SE', name: 'Sweden', Flag: flags.SE },
  { code: 'CH', name: 'Switzerland', Flag: flags.CH },
  { code: 'SY', name: 'Syria', Flag: flags.SY },
  { code: 'TW', name: 'Taiwan', Flag: flags.TW },
  { code: 'TJ', name: 'Tajikistan', Flag: flags.TJ },
  { code: 'TZ', name: 'Tanzania', Flag: flags.TZ },
  { code: 'TH', name: 'Thailand', Flag: flags.TH },
  { code: 'TG', name: 'Togo', Flag: flags.TG },
  { code: 'TO', name: 'Tonga', Flag: flags.TO },
  { code: 'TT', name: 'Trinidad and Tobago', Flag: flags.TT },
  { code: 'TN', name: 'Tunisia', Flag: flags.TN },
  { code: 'TR', name: 'Turkey', Flag: flags.TR },
  { code: 'TM', name: 'Turkmenistan', Flag: flags.TM },
  { code: 'TV', name: 'Tuvalu', Flag: flags.TV },
  { code: 'UG', name: 'Uganda', Flag: flags.UG },
  { code: 'UA', name: 'Ukraine', Flag: flags.UA },
  { code: 'AE', name: 'United Arab Emirates', Flag: flags.AE },
  { code: 'GB', name: 'United Kingdom', Flag: flags.GB },
  { code: 'US', name: 'United States', Flag: flags.US },
  { code: 'UY', name: 'Uruguay', Flag: flags.UY },
  { code: 'UZ', name: 'Uzbekistan', Flag: flags.UZ },
  { code: 'VU', name: 'Vanuatu', Flag: flags.VU },
  { code: 'VA', name: 'Vatican City', Flag: flags.VA },
  { code: 'VE', name: 'Venezuela', Flag: flags.VE },
  { code: 'VN', name: 'Vietnam', Flag: flags.VN },
  { code: 'YE', name: 'Yemen', Flag: flags.YE },
  { code: 'ZM', name: 'Zambia', Flag: flags.ZM },
  { code: 'ZW', name: 'Zimbabwe', Flag: flags.ZW },
];

interface CountrySelectProps {
  value: string;
  onChange: (countryCode: string) => void;
  required?: boolean;
}

export default function CountrySelect({ value, onChange, required = false }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Encontrar país selecionado
  const selectedCountry = countries.find(c => c.code === value);

  // Filtrar países baseado na busca
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll para item destacado
  useEffect(() => {
    if (isOpen && dropdownRef.current && highlightedIndex >= 0) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Controle de teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleSelect(filteredCountries[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        break;
    }
  };

  const handleSelect = (country: Country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(0);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative group/input">
      {/* Glow effect on focus */}
      <div className={`absolute inset-0 rounded-xl opacity-0 ${isOpen ? 'opacity-100' : 'group-focus-within/input:opacity-100'} transition-opacity duration-300 blur-xl bg-[#077124]/10`}></div>
      
      {/* Globe Icon */}
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
        <Globe className={`h-5 w-5 transition-colors duration-300 ${isOpen ? 'text-[#077124]' : 'text-gray-500 group-hover/input:text-gray-400'}`} strokeWidth={2} />
      </div>

      {/* Input Field */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            inputRef.current?.focus();
          }
        }}
        className={`relative w-full pl-14 pr-12 py-4 bg-black/40 border ${isOpen ? 'border-[#077124]/50 ring-2 ring-[#077124]/20' : 'border-white/[0.08]'} rounded-xl text-white text-base cursor-pointer transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50 flex items-center gap-3`}
        style={{
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
        }}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search country..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            autoFocus
          />
        ) : selectedCountry ? (
          <div className="flex items-center gap-3 flex-1">
            <selectedCountry.Flag className="w-6 h-4 rounded-sm shadow-sm" />
            <span>{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Choose a Country</span>
        )}
      </div>

      {/* Chevron/Clear Icon */}
      <div className="absolute inset-y-0 right-0 pr-5 flex items-center gap-2 z-10">
        {selectedCountry && !isOpen && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-[#121212] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => {
              const isHighlighted = index === highlightedIndex;
              const isSelected = country.code === value;
              
              return (
                <div
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all duration-200 ${
                    isHighlighted 
                      ? 'bg-[#077124]/20 text-white' 
                      : isSelected
                      ? 'bg-[#077124]/10 text-white'
                      : 'text-gray-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <country.Flag className="w-6 h-4 rounded-sm shadow-sm flex-shrink-0" />
                  <span className="text-base">{country.name}</span>
                  {isSelected && (
                    <svg className="ml-auto w-5 h-5 text-[#077124]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-5 py-8 text-center text-gray-500">
              <p className="text-base">No countries found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {/* Hidden input para form validation */}
      <input
        type="hidden"
        name="country"
        value={value}
        required={required}
      />
    </div>
  );
}

