import X2JS from 'x2js';
import {marked} from './marked';
import {getSlides} from './getSlides';

class SitemapElement extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const oResponse = await fetch("sitemap.xml");
    const sSitemap = await oResponse.text();
    let parser = new X2JS();
    let json = parser.xml2js(sSitemap);
    let sOut = "files:<br />";
    for (const url of json.urlset.url) {
      const oUrl = new URL(url.loc);
      const sUrl = oUrl.pathname;
      sOut += `&nbsp;&nbsp;<a href="${sUrl}">${sUrl}</a><br />`
    }
    this.innerHTML = sOut;
  }
}

customElements.define("x-sitemap", SitemapElement);

class MarkdownElement extends HTMLElement { // (1)

  constructor() {
    super();
  }

  async connectedCallback() {
    if (!this.ariaExpanded) {
      this.ariaExpanded = true;
      if (window.frameElement && window.frameElement.getAttribute("data-src")) {
        this.attributes.src = window.frameElement.getAttribute("data-src");
      }else{
        const urlParams = new URLSearchParams(window.location.search);
        const src = urlParams.get('src');
        if(src){
          this.attributes.src = src;
        }
      }
      if (this.attributes.src) {
        let sUrl = this.attributes.src;
        if(typeof(sUrl) != "string"){
          sUrl = this.attributes.src.value;
        }
        const oUrl = new URL(sUrl.replace("https:/", "https://wp-now-corsproxy.rhildred.workers.dev/corsproxy"));
        const res = await fetch(oUrl);
        const sText = await res.text();
        this.innerHTML = marked(sText);
        if (window.frameElement) {
          const iframe = window.frameElement;
          iframe.width = iframe.contentWindow.document.body.scrollWidth + 50;
          iframe.height = iframe.contentWindow.document.body.scrollHeight + 50;
        }
      } else {
        this.innerHTML = marked(this.innerHTML);
      }

    }
  }

}

customElements.define("x-markdown2html", MarkdownElement); // (2)

class SCORMElement extends HTMLElement{
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.ariaExpanded) {
      this.ariaExpanded = true;
      this.innerHTML = `<x-workbook></x-workbook><x-marking id="Upload"></x-marking>`;
    }
  }
}

customElements.define("x-scorm", SCORMElement); // (2)

class WorkbookElement extends HTMLElement{
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.ariaExpanded) {
      this.ariaExpanded = true;
      let sPath;
      try{
        sPath = window.parent.API.Activity.ItemIdentifier;
      }catch{
        sPath = "rhildred/INFO8985/observability";
      }
      this.innerHTML = await getSlides(sPath);
    }
  }  
}

customElements.define("x-workbook", WorkbookElement);

class MarkingElement extends HTMLElement{
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.ariaExpanded) {
      this.ariaExpanded = true;
      this.innerHTML = `
<style>
#drop-area {
  width: 400px;
  height: 200px;
  margin: 20px auto;
  text-align: center;
  line-height: 200px;
  border: 2px dashed #ccc;
  cursor: pointer;
}
</style>
<div id="drop-area">
Drag file here to assign a grade to your work.
</div>
`
    }
  }

}

customElements.define("x-marking", MarkingElement);