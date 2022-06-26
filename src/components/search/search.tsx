import React, { ComponentPropsWithoutRef, useState } from "react";
import { User } from "~/types/user";

type Props = {
  onSearch: (keyword: string, users: User[]) => void;
  allUsers: User[];
  className: string;
} & ComponentPropsWithoutRef<"form">;

const Search: React.VFC<Props> = ({ onSearch, allUsers, className }) => {
  const [userNameKey, setUserNameKey] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameKey(e.target.value);
  };

  return (
    <form
      className={className}
      onSubmit={async (e) => {
        e.preventDefault();
        if (userNameKey.length == 0) {
          return;
        }
        const filteredUsers = allUsers.filter((user) =>
          user.userName.includes(userNameKey)
        );
        onSearch(userNameKey, filteredUsers);
      }}
    >
      <input
        id={"text-search"}
        placeholder="名前を入力して検索"
        className="min-h-[32px] w-full appearance-none rounded-full border bg-[#eeeeee] px-1 py-2 text-base font-normal text-[#222222]"
        onChange={onChange}
      />
    </form>
  );
};

export default Search;
