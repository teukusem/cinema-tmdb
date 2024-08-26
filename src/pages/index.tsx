import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from "@nextui-org/react";
import ModalAuth from "@/components/atoms/modal/login";
import { getListNowPlaying, getListTopRated } from "@/utils/api/services/home";
import type { NowPlaying } from "@/utils/types/home";
import { extractYear } from "@/utils/convert-date";
import Head from "@/components/atoms/head";
import { RiBookmarkLine, RiHeartLine } from "@remixicon/react";
import NowPlayings from "@/components/organism/home-now-playing";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setActionModalAuth, setActionToken } from "@/redux/action/session";
import { useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { request_token, approved } = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );

  const [listNowPlaying, setListNowPlaying] = useState<NowPlaying[] | []>([]);
  const [listTopRated, setListTopRated] = useState<NowPlaying[] | []>([]);
  const [paginationConfig, setPaginationConfig] = useState({
    page: 1,
    totalData: 10,
  });

  const handleChangePagination = (nextPage: number) => {
    setPaginationConfig((prev) => ({
      ...prev,
      page: nextPage,
    }));
    fetchDataListTopRated(nextPage);
  };

  const handleChangeActionModalAuth = () => {
    if (tokenUser && sessionUserId) {
      alert("holla");
    } else {
      dispatch(setActionModalAuth(!isOpenModalAuth));
    }
  };

  const fetchDataListTopRated = async (page: number) => {
    try {
      const listTopRated = await getListTopRated(page);
      setListTopRated(listTopRated?.results);
      setPaginationConfig((prev) => ({
        ...prev,
        totalData: 500,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataList = async () => {
    try {
      const listsNowPlaying = await getListNowPlaying(1);
      setListNowPlaying(listsNowPlaying?.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setActionToken(request_token));
  }, [request_token]);

  useEffect(() => {
    fetchDataListTopRated(paginationConfig?.page);
    fetchDataList();
  }, []);

  return (
    <>
      <Head title="Home" />

      <NowPlayings
        listNowPlaying={listNowPlaying}
        handleChangeActionModalAuth={handleChangeActionModalAuth}
      />

      <p className="text-5xl font-semibold leading-[72px] text-left my-12">
        Top Rated
      </p>

      <div className="gap-3 grid grid-cols-2 sm:grid-cols-6">
        {listTopRated.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onClick={() => console.log("item pressed")}
            className="bg-[#050E12] h-[415px] sm:h-[305px] inline-block"
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
              <div
                className="absolute bottom-0 right-0 m-2 z-10 flex"
                onClick={handleChangeActionModalAuth}
              >
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
      <Pagination
        className="mt-8 flex justify-end"
        total={paginationConfig.totalData}
        initialPage={paginationConfig.page}
        onChange={handleChangePagination}
      />
      <ModalAuth
        onOpenChange={handleChangeActionModalAuth}
        isOpen={isOpenModalAuth}
      />
    </>
  );
}
