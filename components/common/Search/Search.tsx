import { ChangeEvent, FC } from 'react';

import s from './Search.module.scss';

interface SearchProps {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchProps> = (props) => {
  return (
    <div className={s.root}>
      <input
        className={s.input}
        type="search"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <button className={s.btn}>
        <svg className={s.icon} viewBox="0 0 20 20">
          <title>Submit</title>
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <circle cx="8" cy="8" r="6" />
            <line x1="12.242" y1="12.242" x2="18" y2="18" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Search;
