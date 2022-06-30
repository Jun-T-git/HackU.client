import React from "react";
import Link from "next/link";
import Image from "next/image";
import DropDown from "~/components/menu/dropdown";

type Props = {
  userId: string;
};

const Header: React.VFC<Props> = ({ userId }) => {
  return (
    <div className="fixed top-0 z-30 h-[70px] w-full px-2 py-3">
      <div className="flex items-center justify-between gap-3.5">
        <Link href={`/${userId}/map`}>
          <a className="flex items-center">
            <Image
              src="/logo/logo_light01.svg"
              width="140px"
              height="35px"
              alt="COM.PY-logo"
            />
          </a>
        </Link>
        <DropDown userId={userId}>
          <Image src="/image/hamburger-menu.svg" width="28px" height="28px" />
        </DropDown>
      </div>
    </div>
  );
};

export default Header;
