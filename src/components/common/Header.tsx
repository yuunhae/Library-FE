import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (
      path === "/startup-resource" &&
      location.pathname.startsWith("/startup-resource")
    ) {
      return true;
    }
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    const baseClass = "text-base font-medium cursor-pointer";

    return isActive(path)
      ? `${baseClass} text-[#3366e5]`
      : `${baseClass} text-[#666666] hover:text-[#3366e5]`;
  };

  return (
    <header className="flex justify-between items-center h-16 px-6">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-[#3366e5] rounded flex items-center justify-center relative">

          <span className="text-white text-[10px] font-bold absolute bottom-0 right-0">
            책
          </span>
        </div>
        <Link to="/">
          <span className="text-xl font-bold text-[#1a1a1a]">
            스타트업 라이브러리
          </span>
        </Link>
      </div>
      
      {/* PC 메뉴 */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="/book-recommendation"
          className={getLinkClass("/book-recommendation")}
        >
          도서추천
        </Link>

        <Link to="/support" className={getLinkClass("/support")}>
          지원사업
        </Link>
        <Link to="/resources" className={getLinkClass("/resources")}>
          창업정보
        </Link>
      </nav>

      {/* 모바일 햄버거 */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="메뉴 열기"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" fill="#3366e5" />
          <rect y="11" width="24" height="2" rx="1" fill="#3366e5" />
          <rect y="18" width="24" height="2" rx="1" fill="#3366e5" />
        </svg>
      </button>


      {/* 모바일 메뉴 오버레이 */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-b-[#3366e5] flex flex-col items-center z-50 md:hidden">
          <Link
            to="/book-recommendation"
            className="py-4 text-base font-medium text-[#666666] cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            도서추천
          </Link>
          <Link
            to="/support"
            className="py-4 text-base font-medium text-[#666666] cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            지원사업
          </Link>
          <Link
            to="/resources"
            className="py-4 text-base font-medium text-[#666666] cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            창업정보
          </Link>
        </div>
      )}
    </header>
  );
}
