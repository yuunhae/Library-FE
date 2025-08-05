import Header from "../../common/Header";
import { TitleAndDescription } from "../../common/TitleAndDescription";
import StartupInformationList from "./components/StartupInformationList";

export default function ResourcesPage() {
  return (
    <>
      <div className="w-full text-left">
        <Header />
        <TitleAndDescription
          title="실시간 창업 정보"
          description="K-startup 창업지원 포털 데이터 기반으로 실시간 창업 정보를 제공합니다."
        />
        <StartupInformationList />
      </div>
    </>
  );
}
