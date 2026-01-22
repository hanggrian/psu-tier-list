import {JSX} from 'react';

interface Specification {
  label: string;
  mobile_label: string;
  value: string | number;
  darkMode: boolean;
}

const SpecificationRow: (spec: Specification) => JSX.Element = (spec: Specification) => (
  <div className='flex justify-between'>
    <span
      className={
        `mr-2
        ${spec.darkMode
          ? 'text-slate-400'
          : 'text-slate-600'
        } font-medium hide-on-mobile`
      }>
      <div className='on-desktop'>{spec.label}</div>
      <div className='on-mobile'>{spec.mobile_label}</div>
    </span>
    <span
      className={
        `font-bold
        ${spec.darkMode
          ? 'text-white'
          : 'text-slate-900'
        } text-end`
      }>
      {spec.value}
    </span>
  </div>
);

export default SpecificationRow;
