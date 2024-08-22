import { marked } from "marked";
import X2JS from 'x2js';


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
      if (window.frameElement.getAttribute("data-src")) {
        this.attributes.src = window.frameElement.getAttribute("data-src");
      }
      if (this.attributes.src) {
        // const oUrl = new URL(this.attributes.src.baseURI);
        // const sBaseName = oUrl.pathname.substr(0, oUrl.pathname.lastIndexOf("/") + 1);
        // const sUrl = oUrl.origin + sBaseName + this.attributes.src.value + oUrl.search;
        const sUrl = this.attributes.src;
        const res = await fetch(sUrl);
        const sText = await res.text();
        this.innerHTML = marked(sText);
        if (window.frameElement.getAttribute("data-src")) {
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
