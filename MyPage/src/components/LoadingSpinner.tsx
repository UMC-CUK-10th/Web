interface LoadingSpinnerProps {
    title? : string;
}

export default function LoadingSpinner({ title }: LoadingSpinnerProps) {
    return (
        <div className="
            flex flex-col items-center justify-center
            space-y-4 p-8"
        >
            <div className="w-10 h-10 
                border-4 border-gray-200 border-t-blue-500 
                rounded-full animate-spin"
            ></div>
            <p>{title ? title : "잠시만 기다려주세요"}</p>
        </div>
    )
}