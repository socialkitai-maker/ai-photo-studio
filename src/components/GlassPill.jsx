export default function GlassPill({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`glass-pill transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
