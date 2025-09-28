export default function LibrarySkeleton() {
  return (
    <div className="grid grid-cols-[2.5fr_0.3fr] justify-between w-full h-31 p-4 border border-border-color text-left text-14 font-light rounded animate-pulse">
      {/* 왼쪽: 도서관 정보 */}
      <div className="space-y-1">
        {/* 도서관명 */}
        <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
        
        {/* 거리 정보 */}
        <div className="flex flex-row items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
        
        {/* 주소 정보 */}
        <div className="flex flex-row items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-40"></div>
        </div>
        
        {/* 전화번호 정보 */}
        <div className="flex flex-row items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
        
        {/* 운영시간 정보 */}
        <div className="flex flex-row items-start">
          <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-36"></div>
        </div>
      </div>

      {/* 오른쪽: 대출 상태 */}
      <div>
        <div className="w-24 h-8 xs:w-17 xs:h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
