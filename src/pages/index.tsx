import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import ModalAuth from "@/components/atoms/modal/login";
import { getListNowPlaying, getListTopRated } from "@/utils/api/services/home";
import type { NowPlaying } from "@/utils/types/home";
import Head from "@/components/atoms/head";
import NowPlayings from "@/components/organism/home-now-playing";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setActionModalAuth, setActionToken } from "@/redux/action/session";
import { useSelector } from "react-redux";
import TopRated from "@/components/organism/home-top-rated";

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { request_token } = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );

  const [listNowPlaying, setListNowPlaying] = useState<NowPlaying[] | []>([]);
  const [listTopRated, setListTopRated] = useState<NowPlaying[] | []>([]);
  const [loadingTopRated, setLoadingTopRated] = useState<boolean>(false);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState<boolean>(false);
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

  const handleRouteToDetailData = (id: number) => {
    router.push(`/detail/${id}`);
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
    <>
      <Head title="Home" />

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
      <ModalAuth
        onOpenChange={handleChangeActionModalAuth}
        isOpen={isOpenModalAuth}
      />
    </>
  );
}
