import { useState } from 'react';

import s from './Search.module.scss';

import searcgImg from '../../assets/img/icons/search.svg';
import loaderImg from '../../assets/loader.svg';

interface IInputProps {
  onChange: (str: string) => void;
  value: string;
  onFocus?: (foo: boolean) => void;
  placeholder?: string;
  big?: boolean;
  loading?: boolean;
}

const Search: React.FC<IInputProps> = ({
  onChange,
  value,
  placeholder,
  big,
  onFocus,
  loading = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const handleOnChange = (str: string) => {
    setInputValue(str);
    onChange(str);
  };
  return (
    <div className={`${s.input} ${big && s.big}`}>
      <div className={s.input_img}>
        {loading ? (
          <img src={loaderImg} alt="loaderImg" />
        ) : (
          <img src={searcgImg} alt="searcgImg" />
        )}
      </div>
      <input
        onFocus={() => {
          if (onFocus) {
            onFocus(true);
          }
        }}
        onBlur={() => {
          if (onFocus) {
            setTimeout(() => {
              onFocus(false);
            }, 100);
          }
        }}
        value={inputValue}
        onChange={(e) => handleOnChange(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
