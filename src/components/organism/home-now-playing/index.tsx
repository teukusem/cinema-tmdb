import { extractYear } from "@/utils/convert-date";
import type { NowPlaying } from "@/utils/types/home";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { RiBookmarkLine, RiHeartLine } from "@remixicon/react";

export default function NowPlayings({
  listNowPlaying,
}: {
  listNowPlaying: NowPlaying[];
}) {
  return (
    <>
      <p className="text-5xl font-semibold leading-[72px] text-left mt-12">
        Now Playing
      </p>

      <div className="overflow-x-auto whitespace-nowrap py-4 scrollContainer">
        <div className="inline-flex gap-2">
          {listNowPlaying.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
              className="bg-[#050E12] w-[193px] sm:w-[193px] inline-block"
            >
              <CardBody className="overflow-visible p-0 relative">
                <Image
                  shadow="sm"
                  radius="none"
                  width="100%"
                  height="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={`${process.env.BASE_URL_IMAGE}${item.poster_path}`}
                />
                <div className="absolute bottom-0 right-0 m-2 z-10 flex">
                  <RiBookmarkLine size={20} color="white" className="mr-3" />
                  <RiHeartLine size={20} color="white" />
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
    </>
  );
}
