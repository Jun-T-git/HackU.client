import React, { ComponentPropsWithoutRef } from "react";

type Props = {
  searchUser: (userName: string) => void;
  className: string;
} & ComponentPropsWithoutRef<"form">;
let userName = "";
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  userName = e.target.value;
};

const Search: React.VFC<Props> = ({ searchUser, className }) => {
  return (
    <form
      className={
        "flex overflow-hidden rounded border-gray-400 py-2 text-center shadow-lg " +
        className
      }
      onSubmit={(e) => {
        userName && searchUser(userName);
        return e.preventDefault();
      }}
    >
      <input
        id={"text-search"}
        placeholder="名前を入力して検索"
        className="min-h-[32px] w-full appearance-none rounded border bg-[#eeeeee] px-1 py-2 text-base font-normal text-[#222222]"
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};

export default Search;
