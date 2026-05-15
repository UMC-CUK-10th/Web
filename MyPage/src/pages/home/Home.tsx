import ContentView from "./ContentView";

export default function Home() {
    return (
        <div className="p-8">
            <div className="flex flex-col justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">다양한 Lp 데이터를 확인하세요</h1>
                <ContentView />
            </div>
        </div>
    );
}