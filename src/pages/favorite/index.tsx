import Head from "@/components/atoms/head";
import FavoriteList from "@/components/organism/favorite-list";
import { setActionFavoritelistId } from "@/redux/action/list-storage";
import { setActionModalAuth } from "@/redux/action/session";
import {
  addFavorite,
  getListFavorite,
} from "@/utils/api/services/movies-action";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function FavoritePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentQuery = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );

  const { favoriteListId } = useSelector((state: any) => state.listStorage);

  const [listFavorite, setListFavorite] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRouteToDetailData = (id: number) => {
    router.push({
      pathname: `/detail/${id}`,
      query: currentQuery,
    });
  };

  const handleChangeActionModalAuth = async (id: number, type: string) => {
    if (tokenUser && sessionUserId) {
      if (type === "favorite") {
        const updatedFavoriteListId = favoriteListId.includes(id)
          ? favoriteListId.filter(
              (favoriteListId: number) => favoriteListId !== id
            )
          : [...favoriteListId, id];

        const payload = {
          media_type: "movie",
          media_id: id,
          favorite: !favoriteListId.includes(id),
        };
        await addFavorite(payload, sessionUserId);
        dispatch(setActionFavoritelistId(updatedFavoriteListId));
        fetchDataListFavorite();
      }
    } else {
      dispatch(setActionModalAuth(!isOpenModalAuth));
    }
  };

  const fetchDataListFavorite = async () => {
    try {
      setLoading(true);
      const favoritelist = await getListFavorite(sessionUserId);
      setListFavorite(favoritelist?.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataListFavorite();
  }, []);

  return (
    <div className="h-screen">
      <Head title="Favorite" />
      <FavoriteList
        loading={loading}
        listFavorite={listFavorite}
        handleChangeActionModalAuth={handleChangeActionModalAuth}
        handleRouteToDetailData={handleRouteToDetailData}
      />
    </div>
  );
}
