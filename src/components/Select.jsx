import React from "react";

export default function Select({
  htmlFor,
  label,
  id,
  value,
  onChange,
  className,
  errors,
  options,
  defaultValue,
}) {
  return (
    <div >
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        style={{fontSize:"20px"}}
      >
        {defaultValue && (
          <option value="" disabled>
            {defaultValue}
          </option>
        )}
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
       <p className={className}>{errors}</p>
    </div>
  );
}
