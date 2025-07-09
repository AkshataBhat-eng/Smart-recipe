const LoadingSpinner = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;