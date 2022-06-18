import React, { useState, useEffect } from "react";
import Router from "next/router"
import Link from "next/link";
import Button from "~/components/button/button";
import TextField from "~/components/field/textField";

function onSubmit () {
  alert("success!");
  Router.push("/")
  return
}

const Index: React.VFC = () => {
  const [emailText, setEmail] = useState("")
  const [passwordText, setPassword] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.type === "email") {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }
  return (
    <>
      <h1 className="text-xl font-bold">サインインページ</h1>
      <form className="mx-auto mt-5 max-w-3xl px-3"
      onSubmit={onSubmit}
      >
        <TextField
          value={emailText}
          fieldId="email"
          label="メールアドレス"
          type = "email"
          onChange={(e) => handleChange(e)} 
        />
        <TextField
          value={passwordText}
          fieldId="password"
          label="パスワード"
          type="password"
          onChange={(e) => handleChange(e)} 
        />
        <div className="text-center">
          <Button
            className="my-5"
            type="submit"
          >
            Signin
          </Button>
        </div>
      </form>
      <div className="text-center">
        <Link href="/signup">
          <a className="hover:text-blue-500">アカウントをお持ちでない方はこちら</a>
        </Link>
      </div>
    </>
  );
};

export default Index;
