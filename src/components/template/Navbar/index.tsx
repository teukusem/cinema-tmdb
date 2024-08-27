import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActionModalAuth } from "@/redux/action/session";
import { useRouter } from "next/router";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { request_token, approved } = router.query;

  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Favorite", route: "/favorite" },
    { label: "Watchlist", route: "/watchlist" },
    { label: "Log Out" },
  ];

  const handleChangeActionModalAuth = (route: string) => {
    if (tokenUser && sessionUserId) {
      router.push({
        pathname: route,
        query: { request_token: request_token, approved: approved },
      });
    } else {
      dispatch(setActionModalAuth(!isOpenModalAuth));
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="bg-[#0EA5E9]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
          onClick={() => {
            router.push({
              pathname: `/`,
              query: { request_token: request_token, approved: approved },
            });
          }}
          className="cursor-pointer"
        >
          <p className="text-5xl text-inherit text-white font-black md:tracking-[.5em]">
            CINEMA
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem
          className="hidden lg:flex md:flex cursor-pointer"
          onClick={() => handleChangeActionModalAuth("/favorite")}
        >
          <p className="text-xl text-white font-normal">Favorite</p>
        </NavbarItem>
        <NavbarItem
          className="hidden lg:flex md:flex cursor-pointer"
          onClick={() => handleChangeActionModalAuth("/watchlist")}
        >
          <p className="text-xl text-white font-normal">Watchlist</p>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === menuItems.length - 1 ? "danger" : "foreground"}
              className="w-full"
              onClick={() => {
                router.push({
                  pathname: item.route,
                  query: { request_token: request_token, approved: approved },
                });
              }}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
