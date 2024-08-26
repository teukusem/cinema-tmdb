import LoadingList from "@/components/atoms/loading";
import { extractYear } from "@/utils/convert-date";
import { RecomendationResultKey } from "@/utils/types/detail";
import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import { RiBookmarkLine, RiHeartLine } from "@remixicon/react";

export default function Recomendation({
  listRecomendation,
  handleChangeActionModalAuth,
  handleRouteToDetailData,
  loading,
}: {
  listRecomendation: RecomendationResultKey[] | undefined;
  handleChangeActionModalAuth?: () => void | undefined;
  handleRouteToDetailData: (data: number) => void;
  loading: boolean;
}) {
  return (
    <>
      <p className="text-2xl font-semibold leading-[72px] text-left mt-12">
        Recommendations
      </p>
      {loading ? (
        <LoadingList />
      ) : (
        <>
          {listRecomendation?.length ?? 0 > 0 ? (
            <div className="overflow-x-auto whitespace-nowrap py-4 scrollContainer">
              <div className="inline-flex gap-2">
                {listRecomendation?.map((item, index) => (
                  <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onClick={() => handleRouteToDetailData(item?.id)}
                    className="bg-[#050E12] w-[193px] sm:w-[193px] inline-block"
                  >
                    <CardBody className="overflow-visible p-0 relative">
                      <Image
                        shadow="sm"
                        radius="none"
                        width="100%"
                        height="100%"
                        alt={item.name}
                        className="w-full object-cover h-[140px]"
                        src={`${process.env.BASE_URL_IMAGE}${item.poster_path}`}
                      />
                      <div
                        className="absolute bottom-0 right-0 m-2 z-10 flex"
                        onClick={(e) => {
                          handleChangeActionModalAuth?.();
                          e.stopPropagation();
                        }}
                      >
                        <RiBookmarkLine
                          size={20}
                          color="white"
                          className="mr-3"
                        />
                        <RiHeartLine size={20} color="white" />
                      </div>
                    </CardBody>
                    <CardFooter className="flex-col items-start text-left">
                      <b className="truncate w-full text-lg text-[#B6B6B6]">
                        {item.name}
                      </b>
                      <p className="text-xs text-[#828282]">
                        {extractYear(item.first_air_date)}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-52 bg-gray-500 bg-opacity-50 flex items-center justify-center rounded-lg">
              <h1>No Data Found!</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
