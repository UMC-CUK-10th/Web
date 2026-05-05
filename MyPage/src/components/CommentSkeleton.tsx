export default function CommentSkeleton() {
    return (
        <div className="flex gap-4 border-b border-gray-50 pb-4 animate-pulse">
            {/* 아바타 스켈레톤 */}
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    {/* 이름 스켈레톤 */}
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    {/* 날짜 스켈레톤 */}
                    <div className="h-2 w-12 bg-gray-100 rounded" />
                </div>
                {/* 본문 스켈레톤 (두 줄) */}
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-3/4 bg-gray-100 rounded" />
                </div>
            </div>
        </div>
    );
}