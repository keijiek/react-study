# メモ

## 追加で npm i -D

```bash
npm i -D @types/node autoprefixer sass
```

### @types/node 

どういうわけか、これが無いと ts が上手く動かない。なので、tsを使うなら必須だと思われる。

### autoprefixer, sass

css 用のモジュール。

---

## vite.config.ts の書き方

```TypeScript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  // 規定値はプロジェクトルート(=vite.configのあるdir)。ソースを src dir に置きたいので書き換える。エントリーポイントである index.html と同じ場所にしなければならない。
  root : path.resolve(__dirname, 'src'),

  // 規定値は'/'。ソース中に記述する相対パスの先頭の文字となる。build 後の依存関係がおかしくなるので、'./'とする。
  base: './',

  // 規定値は root(=上記で設定) 起点の相対パスとしての'public'。root が変更になっているので、絶対パスとして public dir を指定しなおしている。
  publicDir: path.resolve(__dirname, 'public'),


  css: {
    // autoprefixer を使うための設定。冒頭での import も必要。
    postcss: {
      plugins: [autoprefixer],
    },
  },


  build: {
    // 規定値は root(=上記で設定) からの相対パスとしての'dist'。root が変更されているので絶対パスとして dist dir を指定しなおしている。
    outDir: path.resolve(__dirname, 'dist'),

    // true なら build 時に outDir の中身を削除。outDir が root 内にあると自動で true 扱いだが、root が変更され outDir が root 外にあるので、明示的に true とする。
    emptyOutDir: true,

    // false | 'esbuild' 。false だとミニファイしない。
    minify: 'esbuild',

    rollupOptions: {
      // 複数の html ファイルを使う場合、ここに全てのhtmlのパスを書く。key 名は、そのhtmlに対応したjsファイルの名前でもある。
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
      }
    }
  },

  plugins: [react()],

  resolve: {
    // ソース上でパスを書く時に使えるエイリアスをここに設定しておく。
    alias: {
      '@src' : path.resolve(__dirname, 'src'),
      // '~bootstrap': path.resolve(__dirname,'node_modules/bootstrap'),
    }
  },
})
```

---

## browserslist

package.json のオブジェクトのルートに、次の"browserslist"オブジェクトを追加。配列の値の内容は、これと同じではなくても良い。
この環境では、主に autoprefixer 用の機能。

```json
{
  "browserslist": [
    "defaults and supports es6-module",
    "maintained node versions"
  ],
}
```