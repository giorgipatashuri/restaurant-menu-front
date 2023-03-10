import { FC } from 'react';
import './Input.scss';

interface inputProps {
  value: string | number;
  label: string;
  name: string;
  setValue?: (e: any) => void;
}

const Input: FC<inputProps> = ({ value, label, setValue, name }) => {
  return (
    <div>
      <input type='text' required onChange={setValue} name={name} value={value} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default Input;
