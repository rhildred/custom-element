import { marked as _marked} from "marked";

function marked(sText){
    const aText = sText.split('---');
    try{
        return _marked(aText[2])
    }
    catch{
        return sText;
    }
  }


export {marked}