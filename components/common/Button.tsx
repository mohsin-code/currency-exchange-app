interface ButtonProps {
  label: string;
  handleClick: any;
  className?: string;
}

export default function Button({ label, handleClick, className }: ButtonProps) {
  return (
    <button className={`bg-sky-700 text-teal-50 rounded-md font-semibold p-1.5 ${className}`} onClick={handleClick}>{label}</button>
  )
}
