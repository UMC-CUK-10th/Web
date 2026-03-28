export default function LoadingBar() {
    return (
        <section className="mb-8 flex justify-center space-x-4">
            {['🌻', '🌻', '🌻'].map((emoji, i) => (
                <span key={i} className='text-[2rem] animate-bounce' style={{ animationDelay: `${i * 0.1}s` }}>{emoji}</span>
            ))}
        </section>
    )
}