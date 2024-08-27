import LoadingSkeletonCard from "@/components/atoms/loading/skeleton-card";
import { extractYear } from "@/utils/convert-date";
import type { NowPlaying } from "@/utils/types/home";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { useSelector } from "react-redux";

export default function WatchList({
  listWatchlist,
  handleChangeActionModalAuth,
  handleRouteToDetailData,
  loading,
}: {
  listWatchlist: NowPlaying[] | [];
  handleChangeActionModalAuth: (id: number, type: string) => void;
  handleRouteToDetailData: (data: number) => void;
  loading?: boolean;
}) {
  const { watchListId, favoriteListId } = useSelector(
    (state: any) => state.listStorage
  );
  return (
    <div className="">
      <p className="text-5xl font-semibold leading-[72px] text-left my-12">
        Your Watchlist
      </p>

      {loading ? (
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-6">
          {[...Array(6)].map((_, index) => (
            <LoadingSkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-6">
          {listWatchlist.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onClick={() => handleRouteToDetailData(item?.id)}
              className="bg-[#050E12] w-full md:w-[160px] h-full md:h-[357px] max-w-full md:max-w-[160px] max-h-full md:max-h-[357px] inline-block"
            >
              <CardBody className="overflow-visible p-0 relative">
                <Image
                  shadow="sm"
                  radius="none"
                  width="100%"
                  height="100%"
                  alt={item.title}
                  className="w-[193px] h-[355px] max-w-[193px] max-h-[355px] object-cover "
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
      )}
    </div>
  );
}
