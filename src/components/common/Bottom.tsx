const Bottom = () => {
  return (
    <footer className="bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between">
        {/* 좌측: 소개 */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">스타트업 라이브러리</h2>
          <div className="text-gray-700 text-sm leading-relaxed">
            국립중앙도서관 공모전 출품작
            <br />
            초기창업자를 위한 맞춤형 서비스
          </div>
        </div>
        {/* 중앙: 서비스 */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">서비스</h2>
          <ul className="text-gray-700 text-sm leading-relaxed">
            <li>도서 추천</li>
            <li>지원사업 정보</li>
            <li>창업 가이드</li>
            <li>실전 자료</li>
          </ul>
        </div>
        {/* 우측: 연락처 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">연락처</h2>
          <div className="text-gray-700 text-sm leading-relaxed">
            국립중앙도서관
            <br />
            서울특별시 서초구 반포대로 201
            <br />
            02-535-4142
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Bottom;
