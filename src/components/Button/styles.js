// styles.js
export const buttonStyles = {
  base: "w-full font-medium py-3 rounded-lg transition-all duration-300 focus:outline-none",
  variants: {
    primary: "bg-[#00AA66] hover:bg-[#00FF99] text-white hover:shadow-[0_0_20px_rgba(0,255,153,0.3)]",
    secondary: "bg-white hover:bg-gray-100 text-gray-800",
    ghost: "bg-transparent hover:bg-gray-700/50 text-gray-300 hover:text-white"
  },
  sizes: {
    md: "py-3 px-6",
    lg: "py-4 px-8"
  },
  icon: "mr-2"
};