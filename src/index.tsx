import React, {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Award, Filter, Moon, Plug, Search, Sun, Zap} from 'lucide-react';
import SpecificationRow from './specification';
import {Product, PRODUCTS} from './product';
import './index.css';

const WATTAGE_REGEX: RegExp = /(\d+)-(\d+)/;
const TIER_COLORS: Record<string, string> = {
  'A': 'bg-green-500',
  'A*': 'bg-green-500',
  'A+': 'bg-green-500',
  'A-': 'bg-green-500',
  'B': 'bg-blue-500',
  'B*': 'bg-blue-500',
  'B+': 'bg-blue-500',
  'B-': 'bg-blue-500',
  'C': 'bg-amber-400',
  'C*': 'bg-amber-400',
  'C+': 'bg-amber-400',
  'C-': 'bg-amber-400',
  'D': 'bg-orange-500',
  'D-': 'bg-orange-500',
  'E': 'bg-red-500',
  'F': 'bg-gray-900',
  'N': 'bg-indigo-500',
  'X': 'bg-fuchsia-500',
};

function getClickableClass(darkMode: boolean): string {
  return `font-medium
  ${darkMode
    ? 'text-indigo-400 hover:text-indigo-300'
    : 'text-indigo-600 hover:text-indigo-700'
  }`;
}

const PsuTierList: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [product, setProduct] = useState<string>('');
  const [tier, setTier] = useState<string>('all');
  const [wattage, setWattage] = useState<string>('all');

  const filteredProducts: Product[] =
    PRODUCTS.filter(p => {
      if (!p.name.toLowerCase().includes(product.toLowerCase())) {
        return false;
      }
      if (tier !== 'all' && !p.tier.startsWith(tier)) {
        return false;
      }
      let fromWattage;
      let toWattage;
      if (wattage === 'all') {
        fromWattage = 0;
        toWattage = 2000;
      } else {
        const match = wattage.match(WATTAGE_REGEX);
        if (!match) {
          return false;
        }
        fromWattage = parseInt(match[1], 10);
        toWattage = parseInt(match[2], 10);
      }
      return p.wattage.filter(w => w >= fromWattage && w <= toWattage).length > 0;
    });

  const getTierColor = (tier: string): string => {
    return TIER_COLORS[tier] || 'bg-gray-500';
  };

  return (
    <div
      className={
        `min-h-screen
        ${darkMode
          ? 'bg-linear-to-br from-slate-900 to-slate-800'
          : 'bg-linear-to-br from-slate-50 to-slate-100'
        }`
      }>
      <header
        className={
          `${darkMode
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white/80 border-slate-200'
          } sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300`
        }>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center gap-x-6 gap-y-3'>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className='p-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors'>
              {
                darkMode
                  ? <Sun className='w-8 h-8 text-white'/>
                  : <Moon className='w-8 h-8 text-white'/>
              }
            </button>
            <div>
              <h1
                className={
                  `text-4xl font-bold
                  ${darkMode
                    ? 'text-white'
                    : 'text-slate-900'}`
                }>
                PSU Tier List
              </h1>
              <p
                className={
                  `${darkMode
                    ? 'text-slate-400'
                    : 'text-slate-600'
                  } mt-1`
                }>
                Power supplies curated by <a
                className={getClickableClass(darkMode)}
                href='https://cultists.network/140/psu-tier-list/'>
                Cultists
              </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Filter Card */}
        <div
          className={
            `${darkMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200'
            } rounded-2xl shadow-lg border p-6 mb-8`
          }>
          <div className='flex items-center gap-2 mb-6'>
            <Filter
              className={
                `w-5 h-5
                 ${darkMode
                  ? 'text-indigo-400'
                  : 'text-indigo-600'}`
              }/>
            <h2
              className={
                `text-xl font-bold
                 ${darkMode
                  ? 'text-white'
                  : 'text-slate-900'
                }`
              }>
              Filter Products
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Search Input */}
            <div>
              <label
                className={
                  `block text-sm font-semibold
                   ${darkMode
                    ? 'text-slate-300'
                    : 'text-slate-700'
                  } mb-2`
                }>
                Search Products
              </label>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400'/>
                <input
                  type='text'
                  placeholder='Type to search...'
                  value={product}
                  onChange={e => setProduct(e.target.value)}
                  className={
                    `w-full pl-10 pr-4 py-3
                     ${darkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200'
                    } border-2 rounded-xl focus:border-indigo-500 focus:outline-none transition-all`
                  }/>
              </div>
            </div>

            {/* Tier Select */}
            <div>
              <label
                className={
                  `block text-sm font-semibold
                  ${darkMode
                    ? 'text-slate-300'
                    : 'text-slate-700'} mb-2`
                }>
                Tier Level
              </label>
              <div className='relative'>
                <Award
                  className='
                    absolute
                    left-3
                    top-1/2
                    transform
                    -translate-y-1/2 w-5 h-5
                    text-slate-400 pointer-events-none'/>
                <select
                  value={tier}
                  onChange={e => setTier(e.target.value)}
                  className={
                    `w-full pl-10 pr-4 py-3
                     ${darkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200'
                    } border-2 rounded-xl focus:border-indigo-500 focus:outline-none transition-all appearance-none`
                  }>
                  <option value='all'>All Tiers</option>
                  <option value='A'>Tier A (High-end)</option>
                  <option value='B'>Tier B (Mid-range)</option>
                  <option value='C'>Tier C (Low-end)</option>
                  <option value='D'>Tier D (Only for iGPU builds)</option>
                  <option value='E'>Tier E (Avoid)</option>
                  <option value='F'>Tier F (Replace immediately)</option>
                </select>
              </div>
            </div>

            {/* Wattage Select */}
            <div>
              <label
                className={
                  `block text-sm font-semibold
                  ${darkMode
                    ? 'text-slate-300'
                    : 'text-slate-700'
                  } mb-2`
                }>
                Power Output
              </label>
              <div className='relative'>
                <Plug
                  className='
                    absolute
                    left-3
                    top-1/2
                    transform
                    -translate-y-1/2
                    w-5
                    h-5
                    text-slate-400 pointer-events-none'/>
                <select
                  value={wattage}
                  onChange={e => setWattage(e.target.value)}
                  className={
                    `w-full pl-10 pr-4 py-3
                     ${darkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200'
                    } border-2 rounded-xl focus:border-indigo-500 focus:outline-none transition-all appearance-none`
                  }>
                  <option value='all'>All Wattages</option>
                  <option value='30-330W'>0-330W</option>
                  <option value='350-500W'>350-500W</option>
                  <option value='550-750W'>550-750W</option>
                  <option value='850-1200W'>850-1200W</option>
                  <option value='1300-2000W'>1300-2000W</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Counter */}
          <div
            className={
              `mt-6 pt-6
             ${darkMode
                ? 'border-slate-700'
                : 'border-slate-200'
              } border-t`
            }>
            <p
              className={
                `text-sm
                ${darkMode
                  ? 'text-slate-400'
                  : 'text-slate-600'
                }`
              }>
              <span
                className={
                  `font-semibold
                  ${darkMode
                    ? 'text-white'
                    : 'text-slate-900'
                  }`
                }>
                {filteredProducts.length}
              </span> products found
              {
                (product || tier !== 'all' || wattage !== 'all') && (
                  <button
                    onClick={() => {
                      setProduct('');
                      setTier('all');
                      setWattage('all');
                    }}
                    className={`ml-4 ${getClickableClass(darkMode)}`}>
                    Clear all filters
                  </button>
                )
              }
            </p>
          </div>
        </div>

        {/* Products Grid - 2x2 Landscape Cards */}
        {
          filteredProducts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {
                filteredProducts.map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    onClick={() => console.log('Clicked product:', p.image)}
                    className={
                      `${darkMode
                        ? 'bg-slate-900 border-slate-700'
                        : 'bg-white border-slate-200'
                      }
                      rounded-2xl
                      shadow-lg
                      border
                      overflow-hidden
                      hover:shadow-xl
                      transition-all
                      hover:-translate-y-1
                      cursor-pointer`
                    }>
                    <div className='flex'>
                      {/* Product Image Placeholder - Square on Left */}
                      <div
                        className='
                        bg-linear-to-br
                        from-slate-100
                        to-slate-200
                        w-48
                        h-48
                        flex
                        items-center
                        justify-center
                        shrink-0
                        relative
                        overflow-hidden'>
                        <picture>
                          <img
                            src={`${import.meta.env.BASE_URL}/images/${p.image}`}
                            alt={p.name}
                            className='
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            opacity-0
                            transition-opacity
                            duration-200'
                            onLoad={e => e.currentTarget.classList.remove('opacity-0')}
                            onError={e => e.currentTarget.remove()}/>
                        </picture>
                        <div className='text-center'>
                          <Zap className='w-12 h-12 text-slate-400 mx-auto mb-2'/>
                          <p className='text-xs text-slate-500 font-medium'>Product Image</p>
                        </div>
                      </div>

                      {/* Right Side Content */}
                      <div className='flex-1 flex flex-col p-4'>
                        {/* Header with Tier and Price */}
                        <div className='flex items-start justify-between mb-2'>
                          <h3
                            className={
                              `text-base font-bold
                              ${darkMode
                                ? 'text-white group-hover:text-indigo-400'
                                : 'text-slate-900 group-hover:text-indigo-600'
                              } mb-3 transition-colors`
                            }>
                            {p.name}
                          </h3>
                          {
                            p.tier && (
                              <div
                                className={
                                  `flex
                                  items-center
                                  whitespace-nowrap
                                  gap-1
                                  ml-2
                                  ${getTierColor(p.tier)}
                                  text-white
                                  px-3
                                  py-1
                                  rounded-lg
                                  font-bold
                                  text-sm
                                  shadow-md`
                                }>
                                <div className='on-desktop'>Tier</div>
                                {p.tier}
                              </div>
                            )
                          }
                        </div>

                        {/* Specifications */}
                        <div className='space-y-2 text-sm'>
                          {
                            p.year && (
                              <SpecificationRow
                                label='Released:'
                                mobile_label='Year:'
                                value={p.year}
                                darkMode={darkMode}/>
                            )
                          }
                          <SpecificationRow
                            label='Wattage:'
                            mobile_label='Watt.:'
                            value={p.wattage.map(w => `${w}W`).join(', ')}
                            darkMode={darkMode}/>
                          {
                            p.efficiency && (
                              <SpecificationRow
                                label='Efficiency:'
                                mobile_label='Eff.:'
                                value={p.efficiency}
                                darkMode={darkMode}/>
                            )
                          }
                          <SpecificationRow
                            label='Cable Type:'
                            mobile_label='Cable:'
                            value={p.modular}
                            darkMode={darkMode}/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div
              className={
                `${darkMode
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-white border-slate-200'
                } rounded-2xl shadow-lg border p-12 text-center`
              }>
              <div className='max-w-md mx-auto'>
                <div
                  className={
                    `w-16 h-16
                    ${darkMode
                      ? 'bg-slate-800'
                      : 'bg-slate-100'
                    } rounded-full flex items-center justify-center mx-auto mb-4`
                  }>
                  <Search className='w-8 h-8 text-slate-400'/>
                </div>
                <h3
                  className={
                    `text-xl font-bold
                    ${darkMode
                      ? 'text-white'
                      : 'text-slate-900'
                    } mb-2`
                  }>
                  No products found
                </h3>
                <p
                  className={
                    `${darkMode
                      ? 'text-slate-400'
                      : 'text-slate-600'
                    } mb-6`
                  }>
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setProduct('');
                    setTier('all');
                    setWattage('all');
                  }}
                  className='
                  px-6
                  py-3
                  bg-indigo-600
                  text-white
                  rounded-xl
                  font-semibold
                  hover:bg-indigo-700
                  transition-colors'>
                  Reset Filters
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PsuTierList;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PsuTierList/>
  </StrictMode>
);
