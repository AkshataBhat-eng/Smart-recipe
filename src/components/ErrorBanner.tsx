interface Props {
  message: string;
}

const ErrorBanner: React.FC<Props> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-xs sm:text-sm mb-4">
      <strong className="font-bold">Error:</strong>
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default ErrorBanner;
