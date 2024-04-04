import React from "react";

const InputComp = ({
  type,
  placeholder,
  value,
  onChange,
  max,
  min,
  maxLabel,
  minLabel,
}) => {
  if (type === "text") {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className=" rounded-md p-1"
      />
    );
  }

  if (type === "range") {
    return (
      <>
        <input
          type={type}
          max={max}
          min={min}
          value={value}
          onChange={onChange}
        />
        <div className=" flex justify-between" >
          <span>{minLabel ? minLabel : min}</span>
          <b>{value}</b>
          <span>{maxLabel ? maxLabel : max}</span>
        </div>
      </>
    );
  }
};

export default InputComp;
