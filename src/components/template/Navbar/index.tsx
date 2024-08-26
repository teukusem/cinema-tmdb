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

export default function NavigationBar() {
  const dispatch = useDispatch();
  const { tokenUser, isOpenModalAuth, sessionUserId } = useSelector(
    (state: any) => state.userAuth
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Favorite", "Watchlist", "Log Out"];

  const handleChangeActionModalAuth = () => {
    if (tokenUser && sessionUserId) {
      alert("holla");
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
        <NavbarBrand>
          <p className="text-5xl text-inherit text-white font-black md:tracking-[.5em]">
            CINEMA
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem
          className="hidden lg:flex md:flex cursor-pointer"
          onClick={handleChangeActionModalAuth}
        >
          <p className="text-xl text-white font-normal">Favorite</p>
        </NavbarItem>
        <NavbarItem
          className="hidden lg:flex md:flex cursor-pointer"
          onClick={handleChangeActionModalAuth}
        >
          <p className="text-xl text-white font-normal">Watchlist</p>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 0
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
