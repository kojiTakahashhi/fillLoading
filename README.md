## Summary

full screen loading

#### Install via NPM

```bash
npm install simple-fs-loading
```

#### Usage

```javascript
import sfsLoading from 'simple-fs-loading';
```

```javascript
// show
sfsLoading.show(options);

// hide
sfsLoading.hide(options);

// getState :boolean
sfsLoading.isShow();

sfsLoading.setDefault(options);
```

#### options

```typescript
options = {
    imgSrc:string,
    message:string,
    zIndex:number,
    transitionTime:number,
    style:{
        imgWidth:string,
        imgHeight:string,
        fontSize:string,
        fontFamily:string,
        color:string,
        backgroundColor:string,
    },
}
```

引数は必須ではありません。

##### imgSrc:string
使いたい画像のurl

##### message:string
表示させたいメッセージ

##### zIndex:number
表示する領域のz-indexの値

##### transitionTime:number
表示切り替え時のアニメーション時間。msで入力。

##### style.imgWidth:string
画像の横幅

##### style.imgHeight:string
画像の縦幅

##### style.fontSize:string
メッセージのfont-size

##### style.fontFamily:string
メッセージのfont-family

##### style.color:string
メッセージの色

##### style.backgroundColor:string
表示領域の色

### never use in server side

dom操作を行うので、サーバーサイドで使おうとするとバグります。

nuxt.jsなどのSSRモードのアプリケーションで使うときは

```javascript
if(process.browser){
    const sfsLoading = require('simple-fs-loading');
}
```

のように回避してください。



Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php)