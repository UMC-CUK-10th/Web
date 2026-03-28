interface HeaderProps {
    nickname: string;
}

export default function Header({nickname}: HeaderProps) {
    return (
        <section className="mb-12 text-center">
          <h1 className='text-[3rem] font-bold mb-4'>{nickname}의 체크리스트</h1>
          <p className="text-[1.3rem]">오늘은 무엇을 배웠나요?</p>
        </section>
    )
}