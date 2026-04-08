const sequenceWavyStyle = (
    <style>{`
        @keyframes sequenceWavy {
            0%, 20%, 100% { 
                transform: translateY(0);
                opacity: 1
            }
            10% { 
                transform: translateY(-10px);
                opacity: 0.8;
            }
        }
        .seq-char {
            display: inline-block;
            animation: sequenceWavy 2s ease-in-out infinite;
        }
    `}</style>
);

interface BouncyTextProps {
    text: string;
}

export default function BouncyText({ text }: BouncyTextProps) {
    const renderSequenceText = () => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                className="seq-char text-blue-600"
                style={{
                    // 글자마다 시작점을 뒤로 밀어서 한 글자씩만 움직이게 함
                    animationDelay: `${index * 0.1}s`
                }}
            >
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <div className="text-center pb-5">
            <div className="flex items-center justify-center text-xl font-bold tracking-tight">
                {sequenceWavyStyle}
                {renderSequenceText()}
            </div>
        </div>
    )
}