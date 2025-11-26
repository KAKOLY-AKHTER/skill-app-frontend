export default function Loader() {
  return (
    <div className="w-full h-[60vh] flex justify-center items-center">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-b-purple-500 animate-spin blur-[1px]"></div>

        {/* Inner glowing orb */}
        <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping shadow-lg shadow-blue-500/50"></div>
      </div>
    </div>
  );
}
