import React from "react";
import Button from "~/components/button/button";
import Link from "next/link";

const Index: React.VFC = () => {
  return (
    <>
      <div className="px-20 py-10 text-center">
        <h1 className="text-xl font-bold">日本地図ページ</h1>
        <p className="text-blue-500">Next.js + TypeScript + TailwindCSS</p>

        <Button
          className="my-5"
          onClick={() => {
            alert("Clicked!");
          }}
        >
          ボタンサンプル
        </Button>

        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/users">
              <a>ユーザ一覧ページ</a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a>サインインページ</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>サインアップページ</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Index;
