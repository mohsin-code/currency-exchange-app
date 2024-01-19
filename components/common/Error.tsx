interface ErrorProps {
  error: string;
  successMessage: string;
}

export const Error = ({ error, successMessage }:ErrorProps) => {
  let errorStyle = '';
  switch (error) {
    case 'Loading...':
      errorStyle = 'text-slate-600';
      break;
    case successMessage:
      errorStyle = 'text-green-600';
      break;
    default:
      errorStyle = 'text-red-600';
  }

  return error && <p className={errorStyle}>{error}</p>;
}