import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import Button from "~/components/button/button";
import SelectField from "~/components/field/selectField";
import TextField from "~/components/field/textField";
import { signUp } from "~/libs/api/auth";
import { prefectures } from "~/libs/constants/prefectures";
import { getPrefectureIdByName } from "~/libs/functions/prefecture";
import { textValidation } from "~/libs/functions/validation";
import { userState } from "~/libs/recoil/user";
import Loading from "~/components/loading/loading";

// todo: 余裕があればValidation実装
// // validation rule
// const nameRule = {
//   min: 1,
//   max: 100,
//   required: true,
// };

// const emailRule = {
//   min: 1,
//   max: 100,
//   pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
//   required: true,
// };

// const passwordRule = {
//   min: 8,
//   max: 100,
//   pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, // 半角英数字記号のみ
//   required: true,
// };

const Index: React.VFC = () => {
  const setUser = useSetRecoilState(userState);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [prefectureId, setPrefectureId] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // サインアップ
    const params = {
      userId: email,
      userName: name,
      prefectureId: prefectureId,
    };
    const { status } = await signUp(params);
    setIsLoading(false);
    if (status == 400) {
      setErrorMessage("※登録済みのメールアドレスです");
      return;
    }
    setErrorMessage("");
    // ユーザ情報をグローバルstateに格納
    setUser({ ...params, point: 0 });
    // 日本地図ページに遷移
    router.push(`/${email}/map`);
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
                fieldId="name"
                label="名前"
                placeholder="山田太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
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
              <SelectField
                fieldId="prefecture"
                label="住んでいる都道府県"
                options={Object.keys(prefectures).map((prefectureName) => {
                  return {
                    name: prefectureName,
                    value: getPrefectureIdByName(prefectureName),
                  };
                })}
                value={prefectureId}
                onChange={(e) => setPrefectureId(Number(e.target.value))}
                required={true}
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
                disabled={(!name || !email || !password) && true}
              >
                新規登録
              </Button>
            </div>
          </form>
          <Link href="/signin">
            <a className="mt-10 flex justify-center text-sm text-blue-700 hover:opacity-50">
              既にアカウントを持っている
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
