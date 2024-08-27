import Head from "@/components/atoms/head";
import WatchList from "@/components/organism/watchlist-list";
import { setActionWatchlistId } from "@/redux/action/list-storage";
import { setActionModalAuth } from "@/redux/action/session";
import { addWatchlist, getWatchList } from "@/utils/api/services/movies-action";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WatchlistPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentQuery = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );

  const { watchListId } = useSelector((state: any) => state.listStorage);

  const [listWatchlist, setListWatchlist] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRouteToDetailData = (id: number) => {
    router.push({
      pathname: `/detail/${id}`,
      query: currentQuery,
    });
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
        fetchDataWatchList();
      }
    } else {
      dispatch(setActionModalAuth(!isOpenModalAuth));
    }
  };

  const fetchDataWatchList = async () => {
    try {
      setLoading(true);
      const watchList = await getWatchList(sessionUserId);
      setListWatchlist(watchList?.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataWatchList();
  }, []);

  return (
    <div className="h-screen">
      <Head title="Favorite" />
      <WatchList
        loading={loading}
        listWatchlist={listWatchlist}
        handleChangeActionModalAuth={handleChangeActionModalAuth}
        handleRouteToDetailData={handleRouteToDetailData}
      />
    </div>
  );
}
