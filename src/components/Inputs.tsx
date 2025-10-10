import React from 'react';
import type { ReactNode } from 'react';

type InputProps = {
    label?: string,
    type: 'text' | 'email' | 'button' | 'password' | 'checkbox' | 'radio',
    icon?: ReactNode,
    placeholder:string,
    required?: boolean,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Input = ({label,type, icon, placeholder, required, value, onChange}:InputProps) => {
  return (
    <div className='my-6 ' >
      <label htmlFor="firstname" className="font-semibold " >{label}</label>
              <div className="flex border-b-[2px] px-2 text-lg border-white/50 rounded-[8px] items-center ">
                <span className="text-3xl text-white ">
                  {icon}
                </span>
                <input
                  className="bg-transparent w-full placeholder:text-white/70 placeholder:text-opacity-30 my-2  outline-none border-none h-12 px-2 "
                  type={type}
                  id={label}
                onChange={onChange}
                  value={value}
                  required={required}
                  placeholder={placeholder}
                />
              </div>
    </div>
  );
}

export default Input;