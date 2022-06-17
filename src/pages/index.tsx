import React from "react";
import Button from "~/components/button/button";
import Link from "next/link";
import JapanMap, { Edge } from "~/components/japanMap";

const OFFLINE_COLOR = "#ff000040";
const ONLINE_COLOR = "#00ff0040";

const edges: Edge[] = [
  { nodes: ["広島県", "東京都"], color: ONLINE_COLOR },
  { nodes: ["広島県", "大阪府"], color: ONLINE_COLOR },
  { nodes: ["千葉県", "東京都"], color: ONLINE_COLOR },
  { nodes: ["愛知県", "広島県"], color: ONLINE_COLOR },
  { nodes: ["愛知県", "大阪府"], color: ONLINE_COLOR },
  { nodes: ["北海道", "東京都"], color: ONLINE_COLOR },
  { nodes: ["新潟県", "島根県"], color: ONLINE_COLOR },
  { nodes: ["京都府", "沖縄県"], color: ONLINE_COLOR },
  { nodes: ["大阪府", "広島県"], color: ONLINE_COLOR },
  { nodes: ["大阪府", "広島県"], color: ONLINE_COLOR },
  { nodes: ["青森県", "秋田県"], color: ONLINE_COLOR },
  { nodes: ["岩手県", "佐賀県"], color: ONLINE_COLOR },
  { nodes: ["東京都", "千葉県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "大阪府"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "埼玉県"], color: OFFLINE_COLOR },
  { nodes: ["広島県", "岡山県"], color: OFFLINE_COLOR },
  { nodes: ["福岡県", "広島県"], color: OFFLINE_COLOR },
  { nodes: ["高知県", "愛媛県"], color: OFFLINE_COLOR },
  { nodes: ["兵庫県", "長野県"], color: OFFLINE_COLOR },
];

const Index: React.VFC = () => {
  return (
    <>
      <div className="py-10 text-center">
        <h1 className="text-xl font-bold">日本地図ページ</h1>

        <div className="flex justify-center bg-[#333333]">
          <JapanMap edges={edges} />
        </div>

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
