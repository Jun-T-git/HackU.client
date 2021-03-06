import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Button from "~/components/button/button";
import TextField from "~/components/field/textField";
import { signIn } from "~/libs/api/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "~/libs/recoil/user";
import { fetchUser } from "~/libs/api/user";
import Loading from "~/components/loading/loading";

const Index: React.VFC = () => {
  const setUser = useSetRecoilState(userState);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // サインイン
    const signInParams = {
      userId: email,
    };
    const { status } = await signIn(signInParams);
    if (status == 400) {
      setErrorMessage("※メールアドレスまたはパスワードが間違っています");
      setIsLoading(false);
      return;
    }
    setErrorMessage("");
    // ユーザ情報をグローバルstateに格納
    const fetchUserParams = {
      userIdKey: email,
    };
    const { users } = await fetchUser(fetchUserParams);
    if (users.length > 0) {
      setUser(users[0]);
      // 日本地図ページに遷移
      router.push(`/${users[0].userId}/map`);
    }
  };

  return (
    <>
      <div className="inset-0 min-h-screen bg-gradient-to-b from-[#404040] via-[#444444] to-[#333333] px-2 py-5 drop-shadow-lg">
        <div className="mx-auto max-w-xl rounded-lg bg-white py-10">
          <div className="mx-auto mb-8 text-center">
            <Image
              src="/logo/logo_dark01.svg"
              width="150px"
              height="40px"
              alt="COM.PY-logo"
            />
          </div>
          <form onSubmit={onSubmit} className="mx-auto max-w-3xl px-2">
            <div className="my-5 mx-auto flex max-w-lg flex-col gap-y-5">
              <TextField
                fieldId="email"
                label="メールアドレス"
                placeholder="yamada@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                /* type="email" ダミーデータに対応できないためコメントアウト */
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
              <span className="text-sm font-bold text-red-500">
                {errorMessage}
              </span>
            </div>
            <div className="mx-auto h-7 text-center">
              {isLoading && <Loading />}
            </div>
            <div className="flex justify-center gap-x-5">
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
