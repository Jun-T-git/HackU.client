import React from "react";
import SelectField from "~/components/field/selectField";
import { prefectures } from "~/libs/constants/prefectures";

const Index: React.VFC = () => {
  return (
    <>
      <h1 className="text-xl font-bold">サインアップページ</h1>
      <form className="mx-auto mt-5 max-w-3xl px-3">
        <SelectField
          fieldId="prefecture"
          label="住んでいる都道府県"
          options={prefectures.map((prefecture) => {
            return { name: prefecture.name, value: prefecture.id };
          })}
        />
      </form>
    </>
  );
};

export default Index;
