interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({message}: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <span>😱</span>
            <p className="font-medium">{message}</p>
        </div>
    )
}