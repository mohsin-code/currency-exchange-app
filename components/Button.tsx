interface ButtonProps {
  label: string;
  handleClick: any;
}

export default function Button({ label, handleClick }: ButtonProps) {
  return (
    <button className="bg-sky-700 text-teal-50 rounded-md font-semibold p-1.5" onClick={handleClick}>{label}</button>
  )
}
