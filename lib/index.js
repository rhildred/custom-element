import { marked } from "marked";

class MarkdownElement extends HTMLElement { // (1)

  constructor() {
    super();
  }

  async connectedCallback() {
    if(!this.ariaExpanded){
      this.ariaExpanded = true;
      if(this.attributes.src){
        const sUrl = this.attributes.src.baseURI + this.attributes.src.value;
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