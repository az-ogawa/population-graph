# 都道府県別人口推移グラフ表示アプリ

このアプリケーションは、React、Typescript、Next.jsを使用して作成されています。都道府県別の人口推移グラフを表示し、RESAS APIを利用してデータを取得します。

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/az-ogawa/population-graph.git

# プロジェクトディレクトリに移動
cd your-repo

# 依存関係をインストール
npm install
```

`.env.local` ファイルを作成し、RESAS APIのキーを設定します。
```
RESAS_API_KEY=your_api_key_here
```

## 起動方法
```bash
npm run dev
```
http://localhost:3000 にブラウザでアクセスします。
