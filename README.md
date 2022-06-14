# HackU.client

HackU のフロントエンドリポジトリ
[https://hack-u-client.vercel.app/](https://hack-u-client.vercel.app/)

# 開発

## 環境構築

以下をインストール

- node
- yarn
- git
- VSCode（必須ではないが推奨）

## 起動

普段の開発では以下を実行

```:bash
# 初回 or 新しいライブラリをインストールしたときのみ
yarn

# ローカルで起動
yarn dev
```

ビルドを含めて起動する場合は以下を実行

```:bash
# 初回 or 新しいライブラリをインストールしたときのみ
yarn

# ビルド
yarn build

# ローカルで起動
yarn start
```

# 使用技術

- Next.js
- TypeScript
- TailwindCSS（スタイリングのため）
- Prettier（記法統一のため）
- ESLint（記法統一のため）
