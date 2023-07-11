interface TypingIndicatorProps {
  width?: number;
  height?: number;
}
const TypingIndicator: React.FC<TypingIndicatorProps> = ({ width, height }) => {
  return (
    <span className="flex gap-1">
      <div
        className="rounded-full bg-gray-400 delay-300 animate-squish"
        style={{ width: width || 8, height: height || 8 }}
      ></div>
      <div
        className="rounded-full bg-gray-400 delay-500 animate-squish"
        style={{ width: width || 8, height: height || 8 }}
      ></div>
      <div
        className="rounded-full bg-gray-400 delay-1000 animate-squish"
        style={{ width: width || 8, height: height || 8 }}
      ></div>
    </span>
  );
};

export default TypingIndicator;
