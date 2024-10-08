import LoadingList from "@/components/atoms/loading";
import { extractYear } from "@/utils/convert-date";
import type { NowPlaying } from "@/utils/types/home";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { useSelector } from "react-redux";

export default function NowPlayings({
  listNowPlaying,
  handleChangeActionModalAuth,
  handleRouteToDetailData,
  loading,
}: {
  listNowPlaying: NowPlaying[];
  handleChangeActionModalAuth: (id: number, type: string) => void;
  handleRouteToDetailData: (data: number) => void;
  loading: boolean;
}) {
  const { watchListId, favoriteListId } = useSelector(
    (state: any) => state.listStorage
  );
  return (
    <>
      <p className="text-5xl font-semibold leading-[72px] text-left mt-12">
        Now Playing
      </p>

      {loading ? (
        <LoadingList />
      ) : (
        <div className="overflow-x-auto whitespace-nowrap py-4 scrollContainer">
          <div className="inline-flex gap-2">
            {listNowPlaying.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onClick={() => handleRouteToDetailData(item?.id)}
                className="bg-[#050E12] w-[193px] h-[355px] max-w-[193px] max-h-[355px] inline-block"
              >
                <CardBody className="overflow-visible p-0 relative">
                  <Image
                    shadow="sm"
                    radius="none"
                    width="100%"
                    height="100%"
                    alt={item.title}
                    className="w-[193px] h-[355px] object-cover max-w-[193px] max-h-[355px]"
                    src={`${process.env.BASE_URL_IMAGE}${item.poster_path}`}
                  />
                  <div className="absolute bottom-0 right-0 m-2 z-10 flex">
                    {watchListId.includes(item?.id) ? (
                      <RiBookmarkFill
                        size={20}
                        color="white"
                        className="mr-3"
                        onClick={(e) => {
                          handleChangeActionModalAuth(item?.id, "marked");
                          e.stopPropagation();
                        }}
                      />
                    ) : (
                      <RiBookmarkLine
                        size={20}
                        color="white"
                        className="mr-3"
                        onClick={(e) => {
                          handleChangeActionModalAuth(item?.id, "marked");
                          e.stopPropagation();
                        }}
                      />
                    )}

                    {favoriteListId.includes(item?.id) ? (
                      <RiHeartFill
                        size={20}
                        color="white"
                        onClick={(e) => {
                          handleChangeActionModalAuth(item?.id, "favorite");
                          e.stopPropagation();
                        }}
                      />
                    ) : (
                      <RiHeartLine
                        size={20}
                        color="white"
                        onClick={(e) => {
                          handleChangeActionModalAuth(item?.id, "favorite");
                          e.stopPropagation();
                        }}
                      />
                    )}
                  </div>
                </CardBody>
                <CardFooter className="flex-col items-start text-left">
                  <b className="truncate w-full text-lg text-[#B6B6B6]">
                    {item.title}
                  </b>
                  <p className="text-xs text-[#828282]">
                    {extractYear(item.release_date)}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
