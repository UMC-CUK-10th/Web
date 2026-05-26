type Props = {
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SignupInput = ({ error, className = "", ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        className={`border w-[300px] p-[10px] text-white font-bold rounded-sm focus:border-[#807bff]
        ${error ? "border-red-500 bg-red-900" : "border-white bg-black"}
        ${className}`}
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default SignupInput;