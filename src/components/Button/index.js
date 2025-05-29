// src/components/Button/index.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './button.css';

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon, 
  className = "",
  fullWidth = false,
  ...props 
}) => {
  const getVariantClass = () => {
    switch(variant) {
      case 'primary': return 'button-primary';
      case 'secondary': return 'button-secondary';
      case 'ghost': return 'button-ghost';
      default: return 'button-primary';
    }
  };

  const getSizeClass = () => {
    switch(size) {
      case 'md': return 'button-md';
      case 'lg': return 'button-lg';
      default: return 'button-md';
    }
  };

  return (
    <button
      className={`
        button-base
        ${getVariantClass()}
        ${getSizeClass()}
        ${fullWidth ? 'button-full-width' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <FontAwesomeIcon 
          icon={icon} 
          className="button-icon" 
        />
      )}
      {children}
    </button>
  );
};

export default Button;