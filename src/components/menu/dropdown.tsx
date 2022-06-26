import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, ReactNode } from "react";
import { useResetRecoilState } from "recoil";
import { userState } from "~/libs/recoil/user";

type Props = {
  children: ReactNode;
};

const DropDown: React.VFC<Props> = ({ children }) => {
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex">{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-[#777777] rounded-md bg-[#444444] text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active && "opacity-50"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => router.push("/ranking")}
              >
                つながりランキング
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active && "opacity-50"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => router.push("/account")}
              >
                アカウント情報
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active && "opacity-50"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => resetUser()}
              >
                ログアウト
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
