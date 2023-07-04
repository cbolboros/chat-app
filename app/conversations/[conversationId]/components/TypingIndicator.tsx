const TypingIndicator = () => {
  return (
    <span className="flex gap-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full delay-300 animate-squish"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full delay-500 animate-squish"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full delay-1000 animate-squish"></div>
    </span>
  );
};

export default TypingIndicator;
