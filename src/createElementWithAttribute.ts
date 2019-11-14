
/**
 * 指定された属性を伴ってエレメントを生成
 * @param elementName :string
 * @param attributes :any あえてany
 * @return :HTMLElement エレメント
 */
export default function createElementWithAttribute(elementName:string,attributes:any){

    const newElement = document.createElement(elementName);

    Object.keys(attributes).forEach(function (key) {
        const valueString = attributes[key].toString()
        addAttribute(newElement,key,valueString);
    });

    return newElement;
}

/**
 * エレメントに属性を加える
 * @param element 
 * @param attributeName 
 * @param attributeValue 
 */
const addAttribute = (element:HTMLElement,attributeName:string,attributeValue:string) => {
    // element
    element.setAttribute(attributeName,attributeValue);
}


 