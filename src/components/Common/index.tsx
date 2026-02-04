/**
 * Card reutilizável
 */
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-gray-900 rounded-lg p-lg border border-gray-700 hover:border-primary transition-all',
        onClick && 'cursor-pointer hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Button reutilizável
 */
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded transition-colors disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-primary text-dark hover:bg-orange-500',
    secondary: 'bg-secondary text-light hover:bg-blue-600',
    danger: 'bg-red-600 text-light hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'px-md py-xs text-sm',
    md: 'px-lg py-sm text-base',
    lg: 'px-xl py-md text-lg',
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
};

/**
 * Input reutilizável
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-xs">
      {label && <label className="text-light font-semibold">{label}</label>}
      <input
        className={clsx(
          'bg-gray-900 border rounded px-md py-sm text-light',
          error ? 'border-red-600' : 'border-gray-700 focus:border-primary'
        )}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

/**
 * Modal reutilizável
 */
interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg max-w-md w-full mx-md border border-gray-700">
        <div className="flex justify-between items-center p-lg border-b border-gray-700">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <button onClick={onClose} className="text-light hover:text-primary">
            ✕
          </button>
        </div>
        <div className="p-lg">{children}</div>
        {actions && <div className="flex gap-md p-lg border-t border-gray-700">{actions}</div>}
      </div>
    </div>
  );
};
