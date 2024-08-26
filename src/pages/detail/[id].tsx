import React, { useEffect, useState } from "react";
import Head from "@/components/atoms/head";
import { Card, Image, CardBody, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { getDetailData, recomendationMovie } from "@/utils/api/services/detail";
import { MovieDetails, RecomendationResultKey } from "@/utils/types/detail";
import { extractYear } from "@/utils/convert-date";
import { formatRuntime } from "@/utils/convert-time";
import { RiBookmarkLine, RiHeartLine } from "@remixicon/react";
import Recomendation from "@/components/organism/detail-recomendation";
import { useSelector } from "react-redux";
import { setActionModalAuth } from "@/redux/action/session";
import { useDispatch } from "react-redux";
import LoadingList from "@/components/atoms/loading";

export default function DetailFilm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRecomendation, setLoadingRecomendation] =
    useState<boolean>(false);
  const [detailMovie, setDetailMovie] = useState<MovieDetails | undefined>(
    undefined
  );
  const [listRecomendation, setListRecomendation] = useState<
    RecomendationResultKey[] | undefined
  >(undefined);

  const genreNames = detailMovie?.genres.map((genre) => genre.name).join(", ");

  const fetchMovieRecomendation = async (id: string | undefined) => {
    try {
      setLoadingRecomendation(true);
      const recomendation = await recomendationMovie(id);
      setListRecomendation(recomendation?.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRecomendation(false);
    }
  };

  const fetchMovieDetail = async (id: string | undefined) => {
    try {
      setLoading(true);
      const detailMovie = await getDetailData(id);
      setDetailMovie(detailMovie);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeActionModalAuth = () => {
    if (tokenUser && sessionUserId) {
      alert("holla");
    } else {
      dispatch(setActionModalAuth(!isOpenModalAuth));
    }
  };

  const handleRouteToDetailData = (id: number) => {
    router.replace(`/detail/${id}`);
  };

  useEffect(() => {
    if (id) {
      const movieId = Array.isArray(id) ? id[0] : id;
      fetchMovieDetail(movieId);
      fetchMovieRecomendation(movieId);
    }
  }, [id]);

  return (
    <>
      <div>
        <Head title="Detail" />
        {loading ? (
          <LoadingList />
        ) : (
          <div className="relative text-left">
            <Image
              src={`${process.env.BASE_URL_IMAGE}${detailMovie?.backdrop_path}`}
              height="100%"
              width="100%"
              alt="Background Image"
              className="md:flex hidden opacity-80 object-cover h-[300px] md:h-[400px]"
            />
            <div className="md:absolute h-fit md:h-full flex md:flex-row flex-col z-10 top-0 left-0 items-center p-5 w-full text-white bg-black bg-opacity-60">
              <Card className="w-3/12">
                <CardBody className="p-0 ">
                  <Image
                    shadow="sm"
                    radius="none"
                    src={`${process.env.BASE_URL_IMAGE}${detailMovie?.poster_path}`}
                    alt={detailMovie?.title}
                    height="100%"
                    width="100%"
                    className="w-full h-full inline-block"
                  />
                </CardBody>
              </Card>
              <div className="md:ml-4 ml-0 md:mt-0 mt-5 md:w-9/12 w-full">
                <p className="text-3xl font-bold">
                  {detailMovie?.title} ({extractYear(detailMovie?.release_date)}
                  )
                </p>
                <p className="text-sm font-normal">
                  {detailMovie?.release_date} • {genreNames} •{" "}
                  {formatRuntime(detailMovie?.runtime ?? 0)}
                </p>
                <div className="flex my-2.5">
                  <RiBookmarkLine size={20} color="white" className="mr-3" />
                  <RiHeartLine size={20} color="white" />
                </div>
                <p className="text-sm font-normal italic my-2.5">
                  {detailMovie?.tagline}
                </p>
                <p className="font-bold text-sm">Overview</p>
                <p className="text-sm font-normal">{detailMovie?.overview}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-10">
        <Recomendation
          listRecomendation={listRecomendation}
          handleChangeActionModalAuth={handleChangeActionModalAuth}
          handleRouteToDetailData={handleRouteToDetailData}
          loading={loadingRecomendation}
        />
      </div>
    </>
  );
}
