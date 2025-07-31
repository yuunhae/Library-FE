import DistanceIcon from "../../../../../../asset/distance.svg";
import AddressIcon from "../../../../../../asset/address.svg";
import ClockIcon from "../../../../../../asset/time.svg";
import PhoneIcon from "../../../../../../asset/phone.svg";

type LibraryInformation = {
  libCode: string;
  libName: string;
  address: string;
  tel: string;
  operatingTime: string;
  distance?: number;
  isAvailable: boolean;
  error?: GeolocationPositionError;
};

export const LibraryCard = ({
  libCode,
  libName,
  address,
  tel,
  operatingTime,
  distance,
  isAvailable,
  error,
}: LibraryInformation) => {
  return (
    <div className="grid grid-cols-[2.5fr_0.5fr] justify-between w-full h-31 p-4 border border-border-color text-left text-14 font-light rounded">
      <div key={libCode} className=" space-y-1">
        <p className="text-16 font-semibold">{libName}</p>
        {error ? (
          "거리 : 브라우저 설정에서 위치 권한을 허용해주세요."
        ) : (
          <p className="text-14 flex flex-row">
            <img src={DistanceIcon} alt="DistanceIcon" className="mr-1" />
            {distance}km
          </p>
        )}
        <p className="text-14 flex flex-row">
          <img src={AddressIcon} alt="AddressIcon" className="mr-1" />
          {address}
        </p>

        <p className="text-14 flex flex-row">
          <img src={PhoneIcon} alt="PhoneIcon" className="mr-1" />
          {tel}
        </p>
        <p className="text-14 flex flex-row items-start">
          <img src={ClockIcon} alt="ClockIcon" className="mr-1" />
          {operatingTime}
        </p>
      </div>
      {isAvailable ? (
        <div className="w-24 h-8 xs:w-17 xs:h-6 sm:text-xs bg-[#EDFCED] text-[#21C45E] text-xs flex justify-center items-center rounded">
          대출가능
        </div>
      ) : (
        <div className="w-24 h-8 xs:w-17 xs:h-6 sm:text-xs bg-[#EDFCED] text-[#DE5252] text-xs flex justify-center items-center rounded">
          대출불가
        </div>
      )}
    </div>
  );
};
