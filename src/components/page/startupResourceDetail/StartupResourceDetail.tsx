import { useParams, useNavigate } from "react-router-dom";
import { earlyStartupData } from "../../../mocks/earlyStartupData";

const StartupResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const resourceId = parseInt(id || "0", 10);
  const resource = earlyStartupData[resourceId];

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            자료를 찾을 수 없습니다
          </h1>
          <button 
            onClick={() => navigate("/")}
            className="text-[#3366e5] hover:underline"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#3366e5] rounded flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">책</span>
            </div>
            <span className="text-xl font-bold text-[#1a1a1a]">스타트업 라이브러리</span>
          </div>
          
          {/* PC Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate("/")}
              className="text-[#666666] hover:text-[#3366e5] font-medium"
            >
              도서추천
            </button>
            <span className="text-[#666666] font-medium">지원사업</span>
            <span className="text-[#3366e5] font-medium">창업자료</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Section */}
        <article className="py-8 sm:py-12">
          {/* Image Section */}
          <div className="mb-8 sm:mb-12">
            <div className="w-full aspect-[16/9] sm:aspect-[2/1] bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-4xl font-semibold text-black leading-tight text-left">
              {resource.title}: {resource.content?.subtitle}
            </h1>
          </div>

          {/* Content Section */}
          <div className="max-w-none text-left">
            <div className="space-y-8 text-black">
              {resource.content?.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-left">{section.title}</h2>
                  {section.subtitle && (
                    <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#2663EB] text-left">
                      {section.subtitle}
                    </h3>
                  )}
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="leading-relaxed mb-6 text-left">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default StartupResourceDetail;