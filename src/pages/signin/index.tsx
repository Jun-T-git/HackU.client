import React from "react";
import Router from "next/router"
import Link from "next/link";
import Button from "~/components/button/button";
import TextField from "~/components/field/textField";

function clickToIndex () {
  Router.push("/")
  return
}

const Index: React.VFC = () => {
  return (
    <>
      <h1 className="text-xl font-bold">サインインページ</h1>
      <form className="mx-auto mt-5 max-w-3xl px-3">
        <TextField
          fieldId="email"
          label="メールアドレス"
        />
        <TextField
          fieldId="password"
          label="パスワード"
        />
      </form>
      <ul className="flex flex-col gap-2 text-center">
        <li>
          <Button
            className="my-5"
            onClick={() => {
              alert("success!");
              clickToIndex()
            }}
          >
            Signin
          </Button>
        </li>
        <li>
          <Link href="/signup">
            <a className="hover:text-blue-500">アカウントをお持ちでない方はこちら</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Index;
