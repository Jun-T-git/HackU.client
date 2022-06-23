import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "~/components/button/button";
import TextField from "~/components/field/textField";

const Index: React.VFC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      userId: email,
    };
    // const res = await signIn(params);
    // console.log("Submit", res);
    // router.push("/");
  };

  return (
    <>
      <div className="inset-0 min-h-screen bg-gradient-to-b from-[#404040] via-[#444444] to-[#333333] px-2 py-5 drop-shadow-lg">
        <div className="rounded-lg bg-white py-10">
          <h1 className="mb-10 text-center text-2xl font-bold text-red-500">
            ログイン
          </h1>
          <form onSubmit={onSubmit} className="mx-auto max-w-3xl px-2">
            <div className="my-5 flex flex-col gap-y-5">
              <TextField
                fieldId="email"
                label="メールアドレス"
                placeholder="yamada@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                type="email"
              />
              <TextField
                fieldId="password"
                label="パスワード"
                placeholder="半角英数字記号"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                type="password"
              />
            </div>
            <div className="mt-10 flex justify-center gap-x-5">
              <Button
                className="block w-[40%]"
                styleType="outlined"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                キャンセル
              </Button>
              <Button
                className="block w-[40%]"
                type="submit"
                disabled={(!email || !password) && true}
              >
                ログイン
              </Button>
            </div>
          </form>
          <Link href="/signup">
            <a className="mt-10 flex justify-center text-sm text-blue-700 hover:opacity-50">
              アカウントをお持ちでない方はこちら
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
