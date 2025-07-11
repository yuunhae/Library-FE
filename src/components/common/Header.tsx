import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center h-16 bg-white border-b border-b-[#3282F0] px-6">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 bg-[#3282F0] rounded-sm" />
        <span className="text-xl font-bold text-[#1e293b]">
          스타트업 라이브러리
        </span>
      </div>
      {/* PC 메뉴 */}
      <nav className="hidden md:flex items-center space-x-8">
        <span className="text-base font-normal text-[#64748B] cursor-pointer">
          도서추천
        </span>
        <span className="text-base font-normal text-[#64748B] cursor-pointer">
          지원사업
        </span>
        <span className="text-base font-normal text-[#64748B] cursor-pointer">
          창업자료
        </span>
      </nav>
      {/* 모바일 햄버거 */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="메뉴 열기"
      >
        {/* 햄버거 아이콘 (SVG) */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" fill="#3282F0" />
          <rect y="11" width="24" height="2" rx="1" fill="#3282F0" />
          <rect y="18" width="24" height="2" rx="1" fill="#3282F0" />
        </svg>
      </button>
      {/* 모바일 메뉴 오버레이 */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-b-[#3282F0] flex flex-col items-center z-50 md:hidden">
          <span className="py-4 text-base font-normal text-[#64748B] cursor-pointer">
            도서추천
          </span>
          <span className="py-4 text-base font-normal text-[#64748B] cursor-pointer">
            지원사업
          </span>
          <span className="py-4 text-base font-normal text-[#64748B] cursor-pointer">
            창업자료
          </span>
        </div>
      )}
    </header>
  );
}
