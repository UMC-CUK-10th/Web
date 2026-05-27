import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();

  const { data: lp, isLoading, isError, refetch } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: async () => {
      let token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      if (token) token = token.replace(/^"|"$/g, "");

      const response = await axios.get(`http://localhost:8000/v1/lps/${lpid}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      return response.data.data || response.data;
    },
    enabled: !!lpid,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      let token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      if (token) token = token.replace(/^"|"$/g, "");
      await axios.delete(`http://localhost:8000/v1/lps/${lpid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate("/");
    },
  });

  if (isLoading) return <div className="p-20 text-center font-bold text-gray-400">Loading...</div>;
  if (isError || !lp) return (
    <div className="p-20 text-center">
      <p className="text-red-500 mb-4">데이터를 불러오지 못했습니다.</p>
      <button onClick={() => refetch()} className="border px-4 py-2 rounded">다시 시도</button>
    </div>
  );

  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12">
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-lp-spin { animation: spin 8s linear infinite; }
      `}</style>

      <div className="flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black font-medium">← Back</button>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/edit/${lpid}`)} className="p-2 hover:bg-gray-100 rounded-full">📝</button>
          <button onClick={() => { if(confirm("삭제할까요?")) deleteMutation.mutate(); }} className="p-2 hover:bg-red-50 rounded-full">🗑️</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="relative group animate-lp-spin">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-black/5">
              {lp.thumbnail ? (
                <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-gray-50 rounded-full border border-black/10 shadow-inner"></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <header>
            <div className="flex gap-2 mb-3">
              {lp.tags?.map((tag: any) => (
                <span key={tag.id} className="text-blue-500 text-sm font-semibold tracking-wide">#{tag.name}</span>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{lp.title}</h1>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <span>{formattedDate}</span>
              <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
              <button className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                <span className="text-lg">❤️</span>
                <span className="text-gray-700 font-bold">{lp.likes?.length || 0}</span>
              </button>
            </div>
          </header>

          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 min-h-[220px]">
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed italic">
              "{lp.content}"
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LpDetailPage;