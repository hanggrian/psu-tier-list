interface Specification {
  label: string;
  value: string | number;
  darkMode: boolean;
}

const SpecificationRow = ({label, value, darkMode}: Specification) => (
  <div className='flex justify-between'>
    <span
      className={
        `${darkMode
          ? 'text-slate-400'
          : 'text-slate-600'
        } font-medium`
      }>
      {label}:
    </span>
    <span
      className={
        `font-bold
          ${darkMode
          ? 'text-white'
          : 'text-slate-900'}`
      }>
      {value}
    </span>
  </div>
);

export default SpecificationRow;
