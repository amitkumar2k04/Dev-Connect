import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-200 flex items-center justify-center relative overflow-hidden';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-purple-500/25',
    secondary:
      'bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-indigo-400/25',
    outline:
      'bg-transparent border border-gray-700 hover:border-purple-500/50 text-gray-300 hover:text-white backdrop-blur-sm',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'px-6 py-2.5',
    lg: 'text-lg px-8 py-3',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
