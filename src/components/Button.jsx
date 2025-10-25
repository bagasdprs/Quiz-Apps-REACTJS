import classNames from "classnames";
import React from "react";

function Button({ children, onClick, type = "button", variant = "primary", disabled }) {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold transition duration-200 focus:outline-none";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const classes = classNames(baseStyle, variants[variant], {
    "opacity-50 cursor-not-allowed": disabled,
  });

  return (
    <>
      <button type={type} className={classes} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </>
  );
}

export default Button;
