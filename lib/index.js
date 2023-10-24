import { marked } from "marked";

class MarkdownElement extends HTMLElement { // (1)

  constructor() {
    super();
  }

  async connectedCallback() {
    if(!this.ariaExpanded){
      this.ariaExpanded = true;
      if(this.attributes.src){
        const oUrl = new URL(this.attributes.src.baseURI);
        const sBaseName = oUrl.pathname.substr(0, oUrl.pathname.lastIndexOf("/") + 1);
        const sUrl = oUrl.origin + sBaseName + this.attributes.src.value + oUrl.search;
        const res = await fetch(sUrl);
        const sText = await res.text();
        this.innerHTML = marked(sText);
      }else{
        this.innerHTML = marked(this.innerHTML);
      }
  
    }
  }

}

customElements.define("x-markdown2html", MarkdownElement); // (2)
