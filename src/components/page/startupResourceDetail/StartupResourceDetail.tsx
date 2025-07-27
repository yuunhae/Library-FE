import { useParams, useNavigate } from "react-router-dom";
import { earlyStartupData } from "../../../mocks/earlyStartupData";
import Header from "../../common/Header";

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
      <Header />

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