import React, { ComponentPropsWithoutRef } from "react";
import TextField from "~/components/field/textField";
import Button from "~/components/button/button";

type Props = {
  searchUser: (userName: (string)) => void
} & ComponentPropsWithoutRef<"form">;
let userName = "";
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  userName = e.target.value
}

const Search: React.VFC<Props> = ({
  searchUser,
}) => {
  return (
    <form className="flex rounded overflow-hidden shadow-lg text-center border-gray-400 py-2"
      onSubmit={
                (e) => {userName && searchUser(userName);
                return e.preventDefault();
                }}
      >
      <TextField
        fieldId="search"
        label="name"
        className="p-1"
        onChange={(e) => handleChange(e)} 
      />
      <Button
        className="bg-transparent my-5 rounded border border-gray-300 px-3 py-2.5 font-bold text-gray-300"
        type="submit"
      >
        検索
      </Button>
    </form>
  );
};

export default Search;