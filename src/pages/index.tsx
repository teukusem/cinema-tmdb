import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Pagination,
} from "@nextui-org/react";
import ModalAuth from "@/components/atoms/modal/login";
import {
  getListNowPlaying,
  getListTopRated,
  searchValue,
} from "@/utils/api/services/home";
import type { NowPlaying } from "@/utils/types/home";
import Head from "@/components/atoms/head";
import NowPlayings from "@/components/organism/home-now-playing";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setActionModalAuth, setActionToken } from "@/redux/action/session";
import { useSelector } from "react-redux";
import TopRated from "@/components/organism/home-top-rated";
import {
  setActionFavoritelistId,
  setActionWatchlistId,
} from "@/redux/action/list-storage";
import { addFavorite, addWatchlist } from "@/utils/api/services/movies-action";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { extractYear } from "@/utils/convert-date";

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentQuery = router.query;
  const { request_token } = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );

  const { watchListId, favoriteListId } = useSelector(
    (state: any) => state.listStorage
  );

  const [listNowPlaying, setListNowPlaying] = useState<NowPlaying[] | []>([]);
  const [listTopRated, setListTopRated] = useState<NowPlaying[] | []>([]);
  const [loadingTopRated, setLoadingTopRated] = useState<boolean>(false);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState<boolean>(false);
  const [searchMovie, setSearchMovie] = useState("");
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

  const handleChangeActionModalAuth = async (id: number, type: string) => {
    if (tokenUser && sessionUserId) {
      if (type === "marked") {
        const updatedWatchListId = watchListId.includes(id)
          ? watchListId.filter((watchId: number) => watchId !== id)
          : [...watchListId, id];
        const payload = {
          media_type: "movie",
          media_id: id,
          watchlist: !watchListId.includes(id),
        };
        await addWatchlist(payload, sessionUserId);
        dispatch(setActionWatchlistId(updatedWatchListId));
        fetchDataListTopRated(paginationConfig?.page);
        fetchDataList();
      } else {
        const updatedFavoriteListId = favoriteListId.includes(id)
          ? favoriteListId.filter(
              (favoriteListId: number) => favoriteListId !== id
            )
          : [...favoriteListId, id];

        const payload = {
          media_type: "movie",
          media_id: id,
          favorite: !watchListId.includes(id),
        };
        await addFavorite(payload, sessionUserId);
        dispatch(setActionFavoritelistId(updatedFavoriteListId));
        fetchDataListTopRated(paginationConfig?.page);
        fetchDataList();
      }
    } else {
      dispatch(setActionModalAuth(!isOpenModalAuth));
    }
  };

  const handleRouteToDetailData = (id: number) => {
    router.push({
      pathname: `/detail/${id}`,
      query: currentQuery,
    });
  };

  const [searchListData, setSearchListData] = useState<NowPlaying[] | []>([]);

  const fetchDataSearching = async (value: string) => {
    try {
      const dataSearch = await searchValue(value);
      setSearchListData(dataSearch?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataListTopRated = async (page: number) => {
    try {
      setLoadingTopRated(true);
      const listTopRated = await getListTopRated(page);
      setListTopRated(listTopRated?.results);
      setPaginationConfig((prev) => ({
        ...prev,
        totalData: 500,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTopRated(false);
    }
  };

  const fetchDataList = async () => {
    try {
      setLoadingNowPlaying(true);
      const listsNowPlaying = await getListNowPlaying(1);
      setListNowPlaying(listsNowPlaying?.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingNowPlaying(false);
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
    <div className="h-fullx">
      <Head title="Home" />
      <Input
        className="mt-5"
        type="text"
        label="Search..."
        onChange={(e) => {
          const { value } = e.target;
          setSearchMovie(value);
          fetchDataSearching(value);
        }}
      />
      {Boolean(searchMovie) ? (
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-6 mt-5">
          {searchListData.map((item, index) => (
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
      ) : (
        <>
          <NowPlayings
            loading={loadingNowPlaying}
            listNowPlaying={listNowPlaying}
            handleChangeActionModalAuth={handleChangeActionModalAuth}
            handleRouteToDetailData={handleRouteToDetailData}
          />

          <TopRated
            loading={loadingTopRated}
            listTopRated={listTopRated}
            handleChangeActionModalAuth={handleChangeActionModalAuth}
            handleRouteToDetailData={handleRouteToDetailData}
          />

          <Pagination
            className="my-8 flex justify-end"
            total={paginationConfig.totalData}
            initialPage={paginationConfig.page}
            onChange={handleChangePagination}
          />
        </>
      )}
      <ModalAuth isOpen={isOpenModalAuth} />
    </div>
  );
}
