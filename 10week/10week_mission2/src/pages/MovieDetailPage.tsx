import { useParams } from "react-router-dom"

export default function MovieDetailPage() {
  const { id } = useParams<{id: string}>();

  return (
    <div>
      영화 상세 페이지
      <h1 className="">haha</h1>
      <h1>{id}번 영화 상세 페이지를 패치해옵니다.</h1>
    </div>
  )
}