import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({ error, className = "", ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`border w-[300px] p-[10px] pr-[40px] text-white font-bold rounded-sm focus:border-[#807bff]
          ${error ? "border-red-500 bg-red-900" : "border-white bg-black"}
          ${className}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default PasswordInput;