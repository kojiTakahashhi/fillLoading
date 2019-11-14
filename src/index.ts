import './defaultStyle.scss';

import createElementWithAttribute from './createElementWithAttribute';

interface OptionsInterface {
    imgSrc:string,
    message:string,
    zIndex:number,
    transitionTime:number,
    style:Styles,
}

interface Styles {
    imgWidth:string,
    imgHeight:string,
    fontSize:string,
    fontFamily:string,
    color:string,
    backgroundColor:string,
}

class fsLoading {

    // エレメントのid
    private bgElementId:string = 'fsLoadingBg';
    private imgElementId:string = 'fsLoadingImage';
    private messageElementId:string = 'fsLoadingMessage';

    // state（修飾子はこれでいいのか？）
    private isShow:boolean = false;

    // デフォルトオプション
    private defaultOptions:OptionsInterface = {
        imgSrc:'',
        message:'loading...',
        zIndex:100,
        transitionTime:200,
        style:{
          imgWidth:'',
          imgHeight:'',
          fontSize:'',
          fontFamily:'',
          color:'',
          backgroundColor:'',
        },
    }

    // 実際に適用するオプション
    private optionsToApply:OptionsInterface = {
        imgSrc:'',
        message:'',
        zIndex:100,
        transitionTime:200,
        style:{
          imgWidth:'',
          imgHeight:'',
          fontSize:'',
          fontFamily:'',
          color:'',
          backgroundColor:'',
        },
    };

    /**デフォルトのセッティングを変更するメソッド
     * @param オプション
    */
    private changeDefaultSetting = (options:OptionsInterface):void => {
        Object.assign(this.defaultOptions,options);
    }
    
    /**
     * ローディングを表示する
    */
    private showLoading = (options:OptionsInterface):void => {
        this.isShow = true;

        // オプションをマージ
        this.margeOption(options);

        const appendLoadingElement = new Promise((resolve,reject) => {
            // element作成
            document.body.appendChild(this.makeLoadingElementInner());
            resolve();
        });

        // アニメーション開始
        appendLoadingElement.then(() => {
            setTimeout(() => {
                document.getElementById(this.bgElementId).style.opacity = '1';
            },1)
        })

    }

    private margeOption = (options:OptionsInterface):void => {
        // デフォルトオプションをコピーする
        // ※ Object.assign()は破壊的であるため、こんな形に
        this.optionsToApply = Object.assign({},this.defaultOptions);

        // optionsがあればマージ
        if(options){
            Object.assign(this.optionsToApply,options);
        }
    }

    /**
     * ローディングを消す
     * 
    */
    private hideLoading = ():void => {
        this.isShow = false;
        document.getElementById(this.bgElementId).style.opacity = '0';
        
        setTimeout(() => {
            const loadingElement = document.getElementById(this.bgElementId);
            loadingElement.parentNode.removeChild(loadingElement);
        },this.optionsToApply.transitionTime)
    }
    

    /**
     * ローディング表示のelementを生成
     * @return string
    */
    private makeLoadingElementInner = ():HTMLElement => {

        // bg element

        let bgStyle = `
            background-color:` + this.optionsToApply.style.backgroundColor + `;
            z-index:` + this.optionsToApply.zIndex + `;
            transition:opacity ` + this.optionsToApply.transitionTime + `ms;
        `;

        // transitionTimeが設定されていればopacityを0に
        if(this.optionsToApply.transitionTime > 0){
            bgStyle += 'opacity:0;'
        }

        const bgElement = createElementWithAttribute('div',{
            id:this.bgElementId,
            style:bgStyle
        });


        // img element

        if(this.optionsToApply.imgSrc !== ''){

            const imgWidth = this.optionsToApply.style.imgWidth ? 'width:' + this.optionsToApply.style.imgWidth + ';' : '';
            const imgHeight = this.optionsToApply.style.imgHeight ? 'height:' + this.optionsToApply.style.imgHeight + ';' : '';

            const imgElement = createElementWithAttribute('img',{
                id:this.imgElementId,
                src:this.optionsToApply.imgSrc,
                style:imgWidth +''+ imgHeight
            });

            bgElement.appendChild(imgElement);

        }


        // message element

        if(this.optionsToApply.message !== ''){
            const messageStyle = `
                font-size:` + this.optionsToApply.style.fontSize + `;
                font-family:` + this.optionsToApply.style.fontFamily + `;
                color:` + this.optionsToApply.style.color + `;
            `;

            const messageElement = createElementWithAttribute('div',{
                id:this.messageElementId,
                style:messageStyle
            });

            messageElement.innerText = this.optionsToApply.message;

            bgElement.appendChild(messageElement);

        }


        return bgElement;
    };

    // exportする関数群
    public methodsToExport:any = {
        show:(options:OptionsInterface) => this.showLoading(options),
        hide:() => this.hideLoading(),
        setDefault: (options:OptionsInterface) => this.changeDefaultSetting(options),
        isShow:() => this.isShow,
    }

};

export default new fsLoading().methodsToExport;;
