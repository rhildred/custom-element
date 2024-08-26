var ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ae(N) {
  return N && N.__esModule && Object.prototype.hasOwnProperty.call(N, "default") ? N.default : N;
}
var te = { exports: {} }, Tu = {}, lu = {}, Eu = {}, Qu;
function qu() {
  if (Qu)
    return Eu;
  Qu = 1;
  function N(v, S, R) {
    if (R === void 0 && (R = Array.prototype), v && typeof R.find == "function")
      return R.find.call(v, S);
    for (var q = 0; q < v.length; q++)
      if (Object.prototype.hasOwnProperty.call(v, q)) {
        var F = v[q];
        if (S.call(void 0, F, q, v))
          return F;
      }
  }
  function B(v, S) {
    return S === void 0 && (S = Object), S && typeof S.freeze == "function" ? S.freeze(v) : v;
  }
  function O(v, S) {
    if (v === null || typeof v != "object")
      throw new TypeError("target is not an object");
    for (var R in S)
      Object.prototype.hasOwnProperty.call(S, R) && (v[R] = S[R]);
    return v;
  }
  var l = B({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see DOMParser.SupportedType.isHTML
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * Helper method to check a mime type if it indicates an HTML document
     *
     * @param {string} [value]
     * @returns {boolean}
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
    isHTML: function(v) {
      return v === l.HTML;
    },
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/html`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  }), z = B({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * Checks if `uri` equals `NAMESPACE.HTML`.
     *
     * @param {string} [uri]
     *
     * @see NAMESPACE.HTML
     */
    isHTML: function(v) {
      return v === z.HTML;
    },
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  return Eu.assign = O, Eu.find = N, Eu.freeze = B, Eu.MIME_TYPE = l, Eu.NAMESPACE = z, Eu;
}
var Zu;
function ne() {
  if (Zu)
    return lu;
  Zu = 1;
  var N = qu(), B = N.find, O = N.NAMESPACE;
  function l(u) {
    return u !== "";
  }
  function z(u) {
    return u ? u.split(/[\t\n\f\r ]+/).filter(l) : [];
  }
  function v(u, e) {
    return u.hasOwnProperty(e) || (u[e] = !0), u;
  }
  function S(u) {
    if (!u)
      return [];
    var e = z(u);
    return Object.keys(e.reduce(v, {}));
  }
  function R(u) {
    return function(e) {
      return u && u.indexOf(e) !== -1;
    };
  }
  function q(u, e) {
    for (var r in u)
      Object.prototype.hasOwnProperty.call(u, r) && (e[r] = u[r]);
  }
  function F(u, e) {
    var r = u.prototype;
    if (!(r instanceof e)) {
      let c = function() {
      };
      var a = c;
      c.prototype = e.prototype, c = new c(), q(r, c), u.prototype = r = c;
    }
    r.constructor != u && (typeof u != "function" && console.error("unknown Class:" + u), r.constructor = u);
  }
  var L = {}, M = L.ELEMENT_NODE = 1, U = L.ATTRIBUTE_NODE = 2, Y = L.TEXT_NODE = 3, au = L.CDATA_SECTION_NODE = 4, K = L.ENTITY_REFERENCE_NODE = 5, A = L.ENTITY_NODE = 6, b = L.PROCESSING_INSTRUCTION_NODE = 7, C = L.COMMENT_NODE = 8, T = L.DOCUMENT_NODE = 9, V = L.DOCUMENT_TYPE_NODE = 10, I = L.DOCUMENT_FRAGMENT_NODE = 11, H = L.NOTATION_NODE = 12, w = {}, x = {};
  w.INDEX_SIZE_ERR = (x[1] = "Index size error", 1), w.DOMSTRING_SIZE_ERR = (x[2] = "DOMString size error", 2);
  var o = w.HIERARCHY_REQUEST_ERR = (x[3] = "Hierarchy request error", 3);
  w.WRONG_DOCUMENT_ERR = (x[4] = "Wrong document", 4), w.INVALID_CHARACTER_ERR = (x[5] = "Invalid character", 5), w.NO_DATA_ALLOWED_ERR = (x[6] = "No data allowed", 6), w.NO_MODIFICATION_ALLOWED_ERR = (x[7] = "No modification allowed", 7);
  var f = w.NOT_FOUND_ERR = (x[8] = "Not found", 8);
  w.NOT_SUPPORTED_ERR = (x[9] = "Not supported", 9);
  var m = w.INUSE_ATTRIBUTE_ERR = (x[10] = "Attribute in use", 10);
  w.INVALID_STATE_ERR = (x[11] = "Invalid state", 11), w.SYNTAX_ERR = (x[12] = "Syntax error", 12), w.INVALID_MODIFICATION_ERR = (x[13] = "Invalid modification", 13), w.NAMESPACE_ERR = (x[14] = "Invalid namespace", 14), w.INVALID_ACCESS_ERR = (x[15] = "Invalid access", 15);
  function h(u, e) {
    if (e instanceof Error)
      var r = e;
    else
      r = this, Error.call(this, x[u]), this.message = x[u], Error.captureStackTrace && Error.captureStackTrace(this, h);
    return r.code = u, e && (this.message = this.message + ": " + e), r;
  }
  h.prototype = Error.prototype, q(w, h);
  function E() {
  }
  E.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
     * @standard level1
     */
    length: 0,
    /**
     * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
     * @standard level1
     * @param index  unsigned long
     *   Index into the collection.
     * @return Node
     * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
     */
    item: function(u) {
      return u >= 0 && u < this.length ? this[u] : null;
    },
    toString: function(u, e) {
      for (var r = [], a = 0; a < this.length; a++)
        Cu(this[a], r, u, e);
      return r.join("");
    },
    /**
     * @private
     * @param {function (Node):boolean} predicate
     * @returns {Node[]}
     */
    filter: function(u) {
      return Array.prototype.filter.call(this, u);
    },
    /**
     * @private
     * @param {Node} item
     * @returns {number}
     */
    indexOf: function(u) {
      return Array.prototype.indexOf.call(this, u);
    }
  };
  function t(u, e) {
    this._node = u, this._refresh = e, n(this);
  }
  function n(u) {
    var e = u._node._inc || u._node.ownerDocument._inc;
    if (u._inc !== e) {
      var r = u._refresh(u._node);
      if (Yu(u, "length", r.length), !u.$$length || r.length < u.$$length)
        for (var a = r.length; a in u; a++)
          Object.prototype.hasOwnProperty.call(u, a) && delete u[a];
      q(r, u), u._inc = e;
    }
  }
  t.prototype.item = function(u) {
    return n(this), this[u] || null;
  }, F(t, E);
  function i() {
  }
  function s(u, e) {
    for (var r = u.length; r--; )
      if (u[r] === e)
        return r;
  }
  function p(u, e, r, a) {
    if (a ? e[s(e, a)] = r : e[e.length++] = r, u) {
      r.ownerElement = u;
      var c = u.ownerDocument;
      c && (a && cu(c, u, a), j(c, u, r));
    }
  }
  function D(u, e, r) {
    var a = s(e, r);
    if (a >= 0) {
      for (var c = e.length - 1; a < c; )
        e[a] = e[++a];
      if (e.length = c, u) {
        var g = u.ownerDocument;
        g && (cu(g, u, r), r.ownerElement = null);
      }
    } else
      throw new h(f, new Error(u.tagName + "@" + r));
  }
  i.prototype = {
    length: 0,
    item: E.prototype.item,
    getNamedItem: function(u) {
      for (var e = this.length; e--; ) {
        var r = this[e];
        if (r.nodeName == u)
          return r;
      }
    },
    setNamedItem: function(u) {
      var e = u.ownerElement;
      if (e && e != this._ownerElement)
        throw new h(m);
      var r = this.getNamedItem(u.nodeName);
      return p(this._ownerElement, this, u, r), r;
    },
    /* returns Node */
    setNamedItemNS: function(u) {
      var e = u.ownerElement, r;
      if (e && e != this._ownerElement)
        throw new h(m);
      return r = this.getNamedItemNS(u.namespaceURI, u.localName), p(this._ownerElement, this, u, r), r;
    },
    /* returns Node */
    removeNamedItem: function(u) {
      var e = this.getNamedItem(u);
      return D(this._ownerElement, this, e), e;
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function(u, e) {
      var r = this.getNamedItemNS(u, e);
      return D(this._ownerElement, this, r), r;
    },
    getNamedItemNS: function(u, e) {
      for (var r = this.length; r--; ) {
        var a = this[r];
        if (a.localName == e && a.namespaceURI == u)
          return a;
      }
      return null;
    }
  };
  function y() {
  }
  y.prototype = {
    /**
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
     * The different implementations fairly diverged in what kind of features were reported.
     * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
     *
     * @deprecated It is deprecated and modern browsers return true in all cases.
     *
     * @param {string} feature
     * @param {string} [version]
     * @returns {boolean} always true
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     */
    hasFeature: function(u, e) {
      return !0;
    },
    /**
     * Creates an XML Document object of the specified type with its document element.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
     * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - this implementation is not validating names or qualified names
     *   (when parsing XML strings, the SAX parser takes care of that)
     *
     * @param {string|null} namespaceURI
     * @param {string} qualifiedName
     * @param {DocumentType=null} doctype
     * @returns {Document}
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
     *
     * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
     * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
     * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
     */
    createDocument: function(u, e, r) {
      var a = new P();
      if (a.implementation = this, a.childNodes = new E(), a.doctype = r || null, r && a.appendChild(r), e) {
        var c = a.createElementNS(u, e);
        a.appendChild(c);
      }
      return a;
    },
    /**
     * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
     *
     * __This behavior is slightly different from the in the specs__:
     * - this implementation is not validating names or qualified names
     *   (when parsing XML strings, the SAX parser takes care of that)
     *
     * @param {string} qualifiedName
     * @param {string} [publicId]
     * @param {string} [systemId]
     * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
     * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
     *
     * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
     * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
     * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
     */
    createDocumentType: function(u, e, r) {
      var a = new _u();
      return a.name = u, a.nodeName = u, a.publicId = e || "", a.systemId = r || "", a;
    }
  };
  function d() {
  }
  d.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    // Modified in DOM Level 2:
    insertBefore: function(u, e) {
      return pu(this, u, e);
    },
    replaceChild: function(u, e) {
      pu(this, u, e, xu), e && this.removeChild(e);
    },
    removeChild: function(u) {
      return Q(this, u);
    },
    appendChild: function(u) {
      return this.insertBefore(u, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(u) {
      return Pu(this.ownerDocument || this, this, u);
    },
    // Modified in DOM Level 2:
    normalize: function() {
      for (var u = this.firstChild; u; ) {
        var e = u.nextSibling;
        e && e.nodeType == Y && u.nodeType == Y ? (this.removeChild(e), u.appendData(e.data)) : (u.normalize(), u = e);
      }
    },
    // Introduced in DOM Level 2:
    isSupported: function(u, e) {
      return this.ownerDocument.implementation.hasFeature(u, e);
    },
    // Introduced in DOM Level 2:
    hasAttributes: function() {
      return this.attributes.length > 0;
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
     *
     * @param {string | null} namespaceURI
     * @returns {string | null}
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     */
    lookupPrefix: function(u) {
      for (var e = this; e; ) {
        var r = e._nsMap;
        if (r) {
          for (var a in r)
            if (Object.prototype.hasOwnProperty.call(r, a) && r[a] === u)
              return a;
        }
        e = e.nodeType == U ? e.ownerDocument : e.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function(u) {
      for (var e = this; e; ) {
        var r = e._nsMap;
        if (r && Object.prototype.hasOwnProperty.call(r, u))
          return r[u];
        e = e.nodeType == U ? e.ownerDocument : e.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function(u) {
      var e = this.lookupPrefix(u);
      return e == null;
    }
  };
  function G(u) {
    return u == "<" && "&lt;" || u == ">" && "&gt;" || u == "&" && "&amp;" || u == '"' && "&quot;" || "&#" + u.charCodeAt() + ";";
  }
  q(L, d), q(L, d.prototype);
  function uu(u, e) {
    if (e(u))
      return !0;
    if (u = u.firstChild)
      do
        if (uu(u, e))
          return !0;
      while (u = u.nextSibling);
  }
  function P() {
    this.ownerDocument = this;
  }
  function j(u, e, r) {
    u && u._inc++;
    var a = r.namespaceURI;
    a === O.XMLNS && (e._nsMap[r.prefix ? r.localName : ""] = r.value);
  }
  function cu(u, e, r, a) {
    u && u._inc++;
    var c = r.namespaceURI;
    c === O.XMLNS && delete e._nsMap[r.prefix ? r.localName : ""];
  }
  function fu(u, e, r) {
    if (u && u._inc) {
      u._inc++;
      var a = e.childNodes;
      if (r)
        a[a.length++] = r;
      else {
        for (var c = e.firstChild, g = 0; c; )
          a[g++] = c, c = c.nextSibling;
        a.length = g, delete a[a.length];
      }
    }
  }
  function Q(u, e) {
    var r = e.previousSibling, a = e.nextSibling;
    return r ? r.nextSibling = a : u.firstChild = a, a ? a.previousSibling = r : u.lastChild = r, e.parentNode = null, e.previousSibling = null, e.nextSibling = null, fu(u.ownerDocument, u), e;
  }
  function tu(u) {
    return u && (u.nodeType === d.DOCUMENT_NODE || u.nodeType === d.DOCUMENT_FRAGMENT_NODE || u.nodeType === d.ELEMENT_NODE);
  }
  function wu(u) {
    return u && (ru(u) || gu(u) || eu(u) || u.nodeType === d.DOCUMENT_FRAGMENT_NODE || u.nodeType === d.COMMENT_NODE || u.nodeType === d.PROCESSING_INSTRUCTION_NODE);
  }
  function eu(u) {
    return u && u.nodeType === d.DOCUMENT_TYPE_NODE;
  }
  function ru(u) {
    return u && u.nodeType === d.ELEMENT_NODE;
  }
  function gu(u) {
    return u && u.nodeType === d.TEXT_NODE;
  }
  function J(u, e) {
    var r = u.childNodes || [];
    if (B(r, ru) || eu(e))
      return !1;
    var a = B(r, eu);
    return !(e && a && r.indexOf(a) > r.indexOf(e));
  }
  function vu(u, e) {
    var r = u.childNodes || [];
    function a(g) {
      return ru(g) && g !== e;
    }
    if (B(r, a))
      return !1;
    var c = B(r, eu);
    return !(e && c && r.indexOf(c) > r.indexOf(e));
  }
  function X(u, e, r) {
    if (!tu(u))
      throw new h(o, "Unexpected parent node type " + u.nodeType);
    if (r && r.parentNode !== u)
      throw new h(f, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !wu(e) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      eu(e) && u.nodeType !== d.DOCUMENT_NODE
    )
      throw new h(
        o,
        "Unexpected node type " + e.nodeType + " for parent node type " + u.nodeType
      );
  }
  function Nu(u, e, r) {
    var a = u.childNodes || [], c = e.childNodes || [];
    if (e.nodeType === d.DOCUMENT_FRAGMENT_NODE) {
      var g = c.filter(ru);
      if (g.length > 1 || B(c, gu))
        throw new h(o, "More than one element or text in fragment");
      if (g.length === 1 && !J(u, r))
        throw new h(o, "Element in fragment can not be inserted before doctype");
    }
    if (ru(e) && !J(u, r))
      throw new h(o, "Only one element can be added and only after doctype");
    if (eu(e)) {
      if (B(a, eu))
        throw new h(o, "Only one doctype is allowed");
      var k = B(a, ru);
      if (r && a.indexOf(k) < a.indexOf(r))
        throw new h(o, "Doctype can only be inserted before an element");
      if (!r && k)
        throw new h(o, "Doctype can not be appended since element is present");
    }
  }
  function xu(u, e, r) {
    var a = u.childNodes || [], c = e.childNodes || [];
    if (e.nodeType === d.DOCUMENT_FRAGMENT_NODE) {
      var g = c.filter(ru);
      if (g.length > 1 || B(c, gu))
        throw new h(o, "More than one element or text in fragment");
      if (g.length === 1 && !vu(u, r))
        throw new h(o, "Element in fragment can not be inserted before doctype");
    }
    if (ru(e) && !vu(u, r))
      throw new h(o, "Only one element can be added and only after doctype");
    if (eu(e)) {
      let ou = function(nu) {
        return eu(nu) && nu !== r;
      };
      var Z = ou;
      if (B(a, ou))
        throw new h(o, "Only one doctype is allowed");
      var k = B(a, ru);
      if (r && a.indexOf(k) < a.indexOf(r))
        throw new h(o, "Doctype can only be inserted before an element");
    }
  }
  function pu(u, e, r, a) {
    X(u, e, r), u.nodeType === d.DOCUMENT_NODE && (a || Nu)(u, e, r);
    var c = e.parentNode;
    if (c && c.removeChild(e), e.nodeType === I) {
      var g = e.firstChild;
      if (g == null)
        return e;
      var k = e.lastChild;
    } else
      g = k = e;
    var Z = r ? r.previousSibling : u.lastChild;
    g.previousSibling = Z, k.nextSibling = r, Z ? Z.nextSibling = g : u.firstChild = g, r == null ? u.lastChild = k : r.previousSibling = k;
    do
      g.parentNode = u;
    while (g !== k && (g = g.nextSibling));
    return fu(u.ownerDocument || u, u), e.nodeType == I && (e.firstChild = e.lastChild = null), e;
  }
  function Fu(u, e) {
    return e.parentNode && e.parentNode.removeChild(e), e.parentNode = u, e.previousSibling = u.lastChild, e.nextSibling = null, e.previousSibling ? e.previousSibling.nextSibling = e : u.firstChild = e, u.lastChild = e, fu(u.ownerDocument, u, e), e;
  }
  P.prototype = {
    //implementation : null,
    nodeName: "#document",
    nodeType: T,
    /**
     * The DocumentType node of the document.
     *
     * @readonly
     * @type DocumentType
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(u, e) {
      if (u.nodeType == I) {
        for (var r = u.firstChild; r; ) {
          var a = r.nextSibling;
          this.insertBefore(r, e), r = a;
        }
        return u;
      }
      return pu(this, u, e), u.ownerDocument = this, this.documentElement === null && u.nodeType === M && (this.documentElement = u), u;
    },
    removeChild: function(u) {
      return this.documentElement == u && (this.documentElement = null), Q(this, u);
    },
    replaceChild: function(u, e) {
      pu(this, u, e, xu), u.ownerDocument = this, e && this.removeChild(e), ru(u) && (this.documentElement = u);
    },
    // Introduced in DOM Level 2:
    importNode: function(u, e) {
      return $u(this, u, e);
    },
    // Introduced in DOM Level 2:
    getElementById: function(u) {
      var e = null;
      return uu(this.documentElement, function(r) {
        if (r.nodeType == M && r.getAttribute("id") == u)
          return e = r, !0;
      }), e;
    },
    /**
     * The `getElementsByClassName` method of `Document` interface returns an array-like object
     * of all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
     *
     *
     * Warning: This is a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(u) {
      var e = S(u);
      return new t(this, function(r) {
        var a = [];
        return e.length > 0 && uu(r.documentElement, function(c) {
          if (c !== r && c.nodeType === M) {
            var g = c.getAttribute("class");
            if (g) {
              var k = u === g;
              if (!k) {
                var Z = S(g);
                k = e.every(R(Z));
              }
              k && a.push(c);
            }
          }
        }), a;
      });
    },
    //document factory method:
    createElement: function(u) {
      var e = new _();
      e.ownerDocument = this, e.nodeName = u, e.tagName = u, e.localName = u, e.childNodes = new E();
      var r = e.attributes = new i();
      return r._ownerElement = e, e;
    },
    createDocumentFragment: function() {
      var u = new Su();
      return u.ownerDocument = this, u.childNodes = new E(), u;
    },
    createTextNode: function(u) {
      var e = new Ru();
      return e.ownerDocument = this, e.appendData(u), e;
    },
    createComment: function(u) {
      var e = new Lu();
      return e.ownerDocument = this, e.appendData(u), e;
    },
    createCDATASection: function(u) {
      var e = new Iu();
      return e.ownerDocument = this, e.appendData(u), e;
    },
    createProcessingInstruction: function(u, e) {
      var r = new Mu();
      return r.ownerDocument = this, r.tagName = r.nodeName = r.target = u, r.nodeValue = r.data = e, r;
    },
    createAttribute: function(u) {
      var e = new $();
      return e.ownerDocument = this, e.name = u, e.nodeName = u, e.localName = u, e.specified = !0, e;
    },
    createEntityReference: function(u) {
      var e = new ku();
      return e.ownerDocument = this, e.nodeName = u, e;
    },
    // Introduced in DOM Level 2:
    createElementNS: function(u, e) {
      var r = new _(), a = e.split(":"), c = r.attributes = new i();
      return r.childNodes = new E(), r.ownerDocument = this, r.nodeName = e, r.tagName = e, r.namespaceURI = u, a.length == 2 ? (r.prefix = a[0], r.localName = a[1]) : r.localName = e, c._ownerElement = r, r;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function(u, e) {
      var r = new $(), a = e.split(":");
      return r.ownerDocument = this, r.nodeName = e, r.name = e, r.namespaceURI = u, r.specified = !0, a.length == 2 ? (r.prefix = a[0], r.localName = a[1]) : r.localName = e, r;
    }
  }, F(P, d);
  function _() {
    this._nsMap = {};
  }
  _.prototype = {
    nodeType: M,
    hasAttribute: function(u) {
      return this.getAttributeNode(u) != null;
    },
    getAttribute: function(u) {
      var e = this.getAttributeNode(u);
      return e && e.value || "";
    },
    getAttributeNode: function(u) {
      return this.attributes.getNamedItem(u);
    },
    setAttribute: function(u, e) {
      var r = this.ownerDocument.createAttribute(u);
      r.value = r.nodeValue = "" + e, this.setAttributeNode(r);
    },
    removeAttribute: function(u) {
      var e = this.getAttributeNode(u);
      e && this.removeAttributeNode(e);
    },
    //four real opeartion method
    appendChild: function(u) {
      return u.nodeType === I ? this.insertBefore(u, null) : Fu(this, u);
    },
    setAttributeNode: function(u) {
      return this.attributes.setNamedItem(u);
    },
    setAttributeNodeNS: function(u) {
      return this.attributes.setNamedItemNS(u);
    },
    removeAttributeNode: function(u) {
      return this.attributes.removeNamedItem(u.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(u, e) {
      var r = this.getAttributeNodeNS(u, e);
      r && this.removeAttributeNode(r);
    },
    hasAttributeNS: function(u, e) {
      return this.getAttributeNodeNS(u, e) != null;
    },
    getAttributeNS: function(u, e) {
      var r = this.getAttributeNodeNS(u, e);
      return r && r.value || "";
    },
    setAttributeNS: function(u, e, r) {
      var a = this.ownerDocument.createAttributeNS(u, e);
      a.value = a.nodeValue = "" + r, this.setAttributeNode(a);
    },
    getAttributeNodeNS: function(u, e) {
      return this.attributes.getNamedItemNS(u, e);
    },
    getElementsByTagName: function(u) {
      return new t(this, function(e) {
        var r = [];
        return uu(e, function(a) {
          a !== e && a.nodeType == M && (u === "*" || a.tagName == u) && r.push(a);
        }), r;
      });
    },
    getElementsByTagNameNS: function(u, e) {
      return new t(this, function(r) {
        var a = [];
        return uu(r, function(c) {
          c !== r && c.nodeType === M && (u === "*" || c.namespaceURI === u) && (e === "*" || c.localName == e) && a.push(c);
        }), a;
      });
    }
  }, P.prototype.getElementsByTagName = _.prototype.getElementsByTagName, P.prototype.getElementsByTagNameNS = _.prototype.getElementsByTagNameNS, F(_, d);
  function $() {
  }
  $.prototype.nodeType = U, F($, d);
  function Du() {
  }
  Du.prototype = {
    data: "",
    substringData: function(u, e) {
      return this.data.substring(u, u + e);
    },
    appendData: function(u) {
      u = this.data + u, this.nodeValue = this.data = u, this.length = u.length;
    },
    insertData: function(u, e) {
      this.replaceData(u, 0, e);
    },
    appendChild: function(u) {
      throw new Error(x[o]);
    },
    deleteData: function(u, e) {
      this.replaceData(u, e, "");
    },
    replaceData: function(u, e, r) {
      var a = this.data.substring(0, u), c = this.data.substring(u + e);
      r = a + r + c, this.nodeValue = this.data = r, this.length = r.length;
    }
  }, F(Du, d);
  function Ru() {
  }
  Ru.prototype = {
    nodeName: "#text",
    nodeType: Y,
    splitText: function(u) {
      var e = this.data, r = e.substring(u);
      e = e.substring(0, u), this.data = this.nodeValue = e, this.length = e.length;
      var a = this.ownerDocument.createTextNode(r);
      return this.parentNode && this.parentNode.insertBefore(a, this.nextSibling), a;
    }
  }, F(Ru, Du);
  function Lu() {
  }
  Lu.prototype = {
    nodeName: "#comment",
    nodeType: C
  }, F(Lu, Du);
  function Iu() {
  }
  Iu.prototype = {
    nodeName: "#cdata-section",
    nodeType: au
  }, F(Iu, Du);
  function _u() {
  }
  _u.prototype.nodeType = V, F(_u, d);
  function Gu() {
  }
  Gu.prototype.nodeType = H, F(Gu, d);
  function ju() {
  }
  ju.prototype.nodeType = A, F(ju, d);
  function ku() {
  }
  ku.prototype.nodeType = K, F(ku, d);
  function Su() {
  }
  Su.prototype.nodeName = "#document-fragment", Su.prototype.nodeType = I, F(Su, d);
  function Mu() {
  }
  Mu.prototype.nodeType = b, F(Mu, d);
  function zu() {
  }
  zu.prototype.serializeToString = function(u, e, r) {
    return Hu.call(u, e, r);
  }, d.prototype.toString = Hu;
  function Hu(u, e) {
    var r = [], a = this.nodeType == 9 && this.documentElement || this, c = a.prefix, g = a.namespaceURI;
    if (g && c == null) {
      var c = a.lookupPrefix(g);
      if (c == null)
        var k = [
          { namespace: g, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Cu(this, r, u, e, k), r.join("");
  }
  function Xu(u, e, r) {
    var a = u.prefix || "", c = u.namespaceURI;
    if (!c || a === "xml" && c === O.XML || c === O.XMLNS)
      return !1;
    for (var g = r.length; g--; ) {
      var k = r[g];
      if (k.prefix === a)
        return k.namespace !== c;
    }
    return !0;
  }
  function Uu(u, e, r) {
    u.push(" ", e, '="', r.replace(/[<>&"\t\n\r]/g, G), '"');
  }
  function Cu(u, e, r, a, c) {
    if (c || (c = []), a)
      if (u = a(u), u) {
        if (typeof u == "string") {
          e.push(u);
          return;
        }
      } else
        return;
    switch (u.nodeType) {
      case M:
        var g = u.attributes, k = g.length, W = u.firstChild, Z = u.tagName;
        r = O.isHTML(u.namespaceURI) || r;
        var ou = Z;
        if (!r && !u.prefix && u.namespaceURI) {
          for (var nu, su = 0; su < g.length; su++)
            if (g.item(su).name === "xmlns") {
              nu = g.item(su).value;
              break;
            }
          if (!nu)
            for (var Au = c.length - 1; Au >= 0; Au--) {
              var hu = c[Au];
              if (hu.prefix === "" && hu.namespace === u.namespaceURI) {
                nu = hu.namespace;
                break;
              }
            }
          if (nu !== u.namespaceURI)
            for (var Au = c.length - 1; Au >= 0; Au--) {
              var hu = c[Au];
              if (hu.namespace === u.namespaceURI) {
                hu.prefix && (ou = hu.prefix + ":" + Z);
                break;
              }
            }
        }
        e.push("<", ou);
        for (var du = 0; du < k; du++) {
          var iu = g.item(du);
          iu.prefix == "xmlns" ? c.push({ prefix: iu.localName, namespace: iu.value }) : iu.nodeName == "xmlns" && c.push({ prefix: "", namespace: iu.value });
        }
        for (var du = 0; du < k; du++) {
          var iu = g.item(du);
          if (Xu(iu, r, c)) {
            var mu = iu.prefix || "", yu = iu.namespaceURI;
            Uu(e, mu ? "xmlns:" + mu : "xmlns", yu), c.push({ prefix: mu, namespace: yu });
          }
          Cu(iu, e, r, a, c);
        }
        if (Z === ou && Xu(u, r, c)) {
          var mu = u.prefix || "", yu = u.namespaceURI;
          Uu(e, mu ? "xmlns:" + mu : "xmlns", yu), c.push({ prefix: mu, namespace: yu });
        }
        if (W || r && !/^(?:meta|link|img|br|hr|input)$/i.test(Z)) {
          if (e.push(">"), r && /^script$/i.test(Z))
            for (; W; )
              W.data ? e.push(W.data) : Cu(W, e, r, a, c.slice()), W = W.nextSibling;
          else
            for (; W; )
              Cu(W, e, r, a, c.slice()), W = W.nextSibling;
          e.push("</", ou, ">");
        } else
          e.push("/>");
        return;
      case T:
      case I:
        for (var W = u.firstChild; W; )
          Cu(W, e, r, a, c.slice()), W = W.nextSibling;
        return;
      case U:
        return Uu(e, u.name, u.value);
      case Y:
        return e.push(
          u.data.replace(/[<&>]/g, G)
        );
      case au:
        return e.push("<![CDATA[", u.data, "]]>");
      case C:
        return e.push("<!--", u.data, "-->");
      case V:
        var Ju = u.publicId, bu = u.systemId;
        if (e.push("<!DOCTYPE ", u.name), Ju)
          e.push(" PUBLIC ", Ju), bu && bu != "." && e.push(" ", bu), e.push(">");
        else if (bu && bu != ".")
          e.push(" SYSTEM ", bu, ">");
        else {
          var Wu = u.internalSubset;
          Wu && e.push(" [", Wu, "]"), e.push(">");
        }
        return;
      case b:
        return e.push("<?", u.target, " ", u.data, "?>");
      case K:
        return e.push("&", u.nodeName, ";");
      default:
        e.push("??", u.nodeName);
    }
  }
  function $u(u, e, r) {
    var a;
    switch (e.nodeType) {
      case M:
        a = e.cloneNode(!1), a.ownerDocument = u;
      case I:
        break;
      case U:
        r = !0;
        break;
    }
    if (a || (a = e.cloneNode(!1)), a.ownerDocument = u, a.parentNode = null, r)
      for (var c = e.firstChild; c; )
        a.appendChild($u(u, c, r)), c = c.nextSibling;
    return a;
  }
  function Pu(u, e, r) {
    var a = new e.constructor();
    for (var c in e)
      if (Object.prototype.hasOwnProperty.call(e, c)) {
        var g = e[c];
        typeof g != "object" && g != a[c] && (a[c] = g);
      }
    switch (e.childNodes && (a.childNodes = new E()), a.ownerDocument = u, a.nodeType) {
      case M:
        var k = e.attributes, Z = a.attributes = new i(), ou = k.length;
        Z._ownerElement = a;
        for (var nu = 0; nu < ou; nu++)
          a.setAttributeNode(Pu(u, k.item(nu), !0));
        break;
      case U:
        r = !0;
    }
    if (r)
      for (var su = e.firstChild; su; )
        a.appendChild(Pu(u, su, r)), su = su.nextSibling;
    return a;
  }
  function Yu(u, e, r) {
    u[e] = r;
  }
  try {
    if (Object.defineProperty) {
      let u = function(e) {
        switch (e.nodeType) {
          case M:
          case I:
            var r = [];
            for (e = e.firstChild; e; )
              e.nodeType !== 7 && e.nodeType !== 8 && r.push(u(e)), e = e.nextSibling;
            return r.join("");
          default:
            return e.nodeValue;
        }
      };
      var de = u;
      Object.defineProperty(t.prototype, "length", {
        get: function() {
          return n(this), this.$$length;
        }
      }), Object.defineProperty(d.prototype, "textContent", {
        get: function() {
          return u(this);
        },
        set: function(e) {
          switch (this.nodeType) {
            case M:
            case I:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
              break;
            default:
              this.data = e, this.value = e, this.nodeValue = e;
          }
        }
      }), Yu = function(e, r, a) {
        e["$$" + r] = a;
      };
    }
  } catch {
  }
  return lu.DocumentType = _u, lu.DOMException = h, lu.DOMImplementation = y, lu.Element = _, lu.Node = d, lu.NodeList = E, lu.XMLSerializer = zu, lu;
}
var Bu = {}, Vu = {}, Ku;
function oe() {
  return Ku || (Ku = 1, function(N) {
    var B = qu().freeze;
    N.XML_ENTITIES = B({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), N.HTML_ENTITIES = B({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: `
`,
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    }), N.entityMap = N.HTML_ENTITIES;
  }(Vu)), Vu;
}
var Ou = {}, ue;
function se() {
  if (ue)
    return Ou;
  ue = 1;
  var N = qu().NAMESPACE, B = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = new RegExp("[\\-\\.0-9" + B.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), l = new RegExp("^" + B.source + O.source + "*(?::" + B.source + O.source + "*)?$"), z = 0, v = 1, S = 2, R = 3, q = 4, F = 5, L = 6, M = 7;
  function U(o, f) {
    this.message = o, this.locator = f, Error.captureStackTrace && Error.captureStackTrace(this, U);
  }
  U.prototype = new Error(), U.prototype.name = U.name;
  function Y() {
  }
  Y.prototype = {
    parse: function(o, f, m) {
      var h = this.domBuilder;
      h.startDocument(), V(f, f = {}), au(
        o,
        f,
        m,
        h,
        this.errorHandler
      ), h.endDocument();
    }
  };
  function au(o, f, m, h, E) {
    function t(_) {
      if (_ > 65535) {
        _ -= 65536;
        var $ = 55296 + (_ >> 10), Du = 56320 + (_ & 1023);
        return String.fromCharCode($, Du);
      } else
        return String.fromCharCode(_);
    }
    function n(_) {
      var $ = _.slice(1, -1);
      return Object.hasOwnProperty.call(m, $) ? m[$] : $.charAt(0) === "#" ? t(parseInt($.substr(1).replace("x", "0x"))) : (E.error("entity not found:" + _), _);
    }
    function i(_) {
      if (_ > P) {
        var $ = o.substring(P, _).replace(/&#?\w+;/g, n);
        d && s(P), h.characters($, 0, _ - P), P = _;
      }
    }
    function s(_, $) {
      for (; _ >= D && ($ = y.exec(o)); )
        p = $.index, D = p + $[0].length, d.lineNumber++;
      d.columnNumber = _ - p + 1;
    }
    for (var p = 0, D = 0, y = /.*(?:\r\n?|\n)|.*$/g, d = h.locator, G = [{ currentNSMap: f }], uu = {}, P = 0; ; ) {
      try {
        var j = o.indexOf("<", P);
        if (j < 0) {
          if (!o.substr(P).match(/^\s*$/)) {
            var cu = h.doc, fu = cu.createTextNode(o.substr(P));
            cu.appendChild(fu), h.currentElement = fu;
          }
          return;
        }
        switch (j > P && i(j), o.charAt(j + 1)) {
          case "/":
            var X = o.indexOf(">", j + 3), Q = o.substring(j + 2, X).replace(/[ \t\n\r]+$/g, ""), tu = G.pop();
            X < 0 ? (Q = o.substring(j + 2).replace(/[\s<].*/, ""), E.error("end tag name: " + Q + " is not complete:" + tu.tagName), X = j + 1 + Q.length) : Q.match(/\s</) && (Q = Q.replace(/[\s<].*/, ""), E.error("end tag name: " + Q + " maybe not complete"), X = j + 1 + Q.length);
            var wu = tu.localNSMap, eu = tu.tagName == Q, ru = eu || tu.tagName && tu.tagName.toLowerCase() == Q.toLowerCase();
            if (ru) {
              if (h.endElement(tu.uri, tu.localName, Q), wu)
                for (var gu in wu)
                  Object.prototype.hasOwnProperty.call(wu, gu) && h.endPrefixMapping(gu);
              eu || E.fatalError("end tag name: " + Q + " is not match the current start tagName:" + tu.tagName);
            } else
              G.push(tu);
            X++;
            break;
          case "?":
            d && s(j), X = H(o, j, h);
            break;
          case "!":
            d && s(j), X = I(o, j, h, E);
            break;
          default:
            d && s(j);
            var J = new w(), vu = G[G.length - 1].currentNSMap, X = A(o, j, J, vu, n, E), Nu = J.length;
            if (!J.closed && T(o, X, J.tagName, uu) && (J.closed = !0, m.nbsp || E.warning("unclosed xml attribute")), d && Nu) {
              for (var xu = K(d, {}), pu = 0; pu < Nu; pu++) {
                var Fu = J[pu];
                s(Fu.offset), Fu.locator = K(d, {});
              }
              h.locator = xu, b(J, h, vu) && G.push(J), h.locator = d;
            } else
              b(J, h, vu) && G.push(J);
            N.isHTML(J.uri) && !J.closed ? X = C(o, X, J.tagName, n, h) : X++;
        }
      } catch (_) {
        if (_ instanceof U)
          throw _;
        E.error("element parse error: " + _), X = -1;
      }
      X > P ? P = X : i(Math.max(j, P) + 1);
    }
  }
  function K(o, f) {
    return f.lineNumber = o.lineNumber, f.columnNumber = o.columnNumber, f;
  }
  function A(o, f, m, h, E, t) {
    function n(d, G, uu) {
      m.attributeNames.hasOwnProperty(d) && t.fatalError("Attribute " + d + " redefined"), m.addValue(
        d,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        G.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, E),
        uu
      );
    }
    for (var i, s, p = ++f, D = z; ; ) {
      var y = o.charAt(p);
      switch (y) {
        case "=":
          if (D === v)
            i = o.slice(f, p), D = R;
          else if (D === S)
            D = R;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (D === R || D === v)
            if (D === v && (t.warning('attribute value must after "="'), i = o.slice(f, p)), f = p + 1, p = o.indexOf(y, f), p > 0)
              s = o.slice(f, p), n(i, s, f - 1), D = F;
            else
              throw new Error("attribute value no end '" + y + "' match");
          else if (D == q)
            s = o.slice(f, p), n(i, s, f), t.warning('attribute "' + i + '" missed start quot(' + y + ")!!"), f = p + 1, D = F;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (D) {
            case z:
              m.setTagName(o.slice(f, p));
            case F:
            case L:
            case M:
              D = M, m.closed = !0;
            case q:
            case v:
              break;
            case S:
              m.closed = !0;
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return t.error("unexpected end of input"), D == z && m.setTagName(o.slice(f, p)), p;
        case ">":
          switch (D) {
            case z:
              m.setTagName(o.slice(f, p));
            case F:
            case L:
            case M:
              break;
            case q:
            case v:
              s = o.slice(f, p), s.slice(-1) === "/" && (m.closed = !0, s = s.slice(0, -1));
            case S:
              D === S && (s = i), D == q ? (t.warning('attribute "' + s + '" missed quot(")!'), n(i, s, f)) : ((!N.isHTML(h[""]) || !s.match(/^(?:disabled|checked|selected)$/i)) && t.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), n(s, s, f));
              break;
            case R:
              throw new Error("attribute value missed!!");
          }
          return p;
        case "":
          y = " ";
        default:
          if (y <= " ")
            switch (D) {
              case z:
                m.setTagName(o.slice(f, p)), D = L;
                break;
              case v:
                i = o.slice(f, p), D = S;
                break;
              case q:
                var s = o.slice(f, p);
                t.warning('attribute "' + s + '" missed quot(")!!'), n(i, s, f);
              case F:
                D = L;
                break;
            }
          else
            switch (D) {
              case S:
                m.tagName, (!N.isHTML(h[""]) || !i.match(/^(?:disabled|checked|selected)$/i)) && t.warning('attribute "' + i + '" missed value!! "' + i + '" instead2!!'), n(i, i, f), f = p, D = v;
                break;
              case F:
                t.warning('attribute space is required"' + i + '"!!');
              case L:
                D = v, f = p;
                break;
              case R:
                D = q, f = p;
                break;
              case M:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      p++;
    }
  }
  function b(o, f, m) {
    for (var h = o.tagName, E = null, y = o.length; y--; ) {
      var t = o[y], n = t.qName, i = t.value, d = n.indexOf(":");
      if (d > 0)
        var s = t.prefix = n.slice(0, d), p = n.slice(d + 1), D = s === "xmlns" && p;
      else
        p = n, s = null, D = n === "xmlns" && "";
      t.localName = p, D !== !1 && (E == null && (E = {}, V(m, m = {})), m[D] = E[D] = i, t.uri = N.XMLNS, f.startPrefixMapping(D, i));
    }
    for (var y = o.length; y--; ) {
      t = o[y];
      var s = t.prefix;
      s && (s === "xml" && (t.uri = N.XML), s !== "xmlns" && (t.uri = m[s || ""]));
    }
    var d = h.indexOf(":");
    d > 0 ? (s = o.prefix = h.slice(0, d), p = o.localName = h.slice(d + 1)) : (s = null, p = o.localName = h);
    var G = o.uri = m[s || ""];
    if (f.startElement(G, p, h, o), o.closed) {
      if (f.endElement(G, p, h), E)
        for (s in E)
          Object.prototype.hasOwnProperty.call(E, s) && f.endPrefixMapping(s);
    } else
      return o.currentNSMap = m, o.localNSMap = E, !0;
  }
  function C(o, f, m, h, E) {
    if (/^(?:script|textarea)$/i.test(m)) {
      var t = o.indexOf("</" + m + ">", f), n = o.substring(f + 1, t);
      if (/[&<]/.test(n))
        return /^script$/i.test(m) ? (E.characters(n, 0, n.length), t) : (n = n.replace(/&#?\w+;/g, h), E.characters(n, 0, n.length), t);
    }
    return f + 1;
  }
  function T(o, f, m, h) {
    var E = h[m];
    return E == null && (E = o.lastIndexOf("</" + m + ">"), E < f && (E = o.lastIndexOf("</" + m)), h[m] = E), E < f;
  }
  function V(o, f) {
    for (var m in o)
      Object.prototype.hasOwnProperty.call(o, m) && (f[m] = o[m]);
  }
  function I(o, f, m, h) {
    var E = o.charAt(f + 2);
    switch (E) {
      case "-":
        if (o.charAt(f + 3) === "-") {
          var t = o.indexOf("-->", f + 4);
          return t > f ? (m.comment(o, f + 4, t - f - 4), t + 3) : (h.error("Unclosed comment"), -1);
        } else
          return -1;
      default:
        if (o.substr(f + 3, 6) == "CDATA[") {
          var t = o.indexOf("]]>", f + 9);
          return m.startCDATA(), m.characters(o, f + 9, t - f - 9), m.endCDATA(), t + 3;
        }
        var n = x(o, f), i = n.length;
        if (i > 1 && /!doctype/i.test(n[0][0])) {
          var s = n[1][0], p = !1, D = !1;
          i > 3 && (/^public$/i.test(n[2][0]) ? (p = n[3][0], D = i > 4 && n[4][0]) : /^system$/i.test(n[2][0]) && (D = n[3][0]));
          var y = n[i - 1];
          return m.startDTD(s, p, D), m.endDTD(), y.index + y[0].length;
        }
    }
    return -1;
  }
  function H(o, f, m) {
    var h = o.indexOf("?>", f);
    if (h) {
      var E = o.substring(f, h).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      return E ? (E[0].length, m.processingInstruction(E[1], E[2]), h + 2) : -1;
    }
    return -1;
  }
  function w() {
    this.attributeNames = {};
  }
  w.prototype = {
    setTagName: function(o) {
      if (!l.test(o))
        throw new Error("invalid tagName:" + o);
      this.tagName = o;
    },
    addValue: function(o, f, m) {
      if (!l.test(o))
        throw new Error("invalid attribute:" + o);
      this.attributeNames[o] = this.length, this[this.length++] = { qName: o, value: f, offset: m };
    },
    length: 0,
    getLocalName: function(o) {
      return this[o].localName;
    },
    getLocator: function(o) {
      return this[o].locator;
    },
    getQName: function(o) {
      return this[o].qName;
    },
    getURI: function(o) {
      return this[o].uri;
    },
    getValue: function(o) {
      return this[o].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  };
  function x(o, f) {
    var m, h = [], E = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (E.lastIndex = f, E.exec(o); m = E.exec(o); )
      if (h.push(m), m[1])
        return h;
  }
  return Ou.XMLReader = Y, Ou.ParseError = U, Ou;
}
var ee;
function le() {
  if (ee)
    return Bu;
  ee = 1;
  var N = qu(), B = ne(), O = oe(), l = se(), z = B.DOMImplementation, v = N.NAMESPACE, S = l.ParseError, R = l.XMLReader;
  function q(A) {
    return A.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
  }
  function F(A) {
    this.options = A || { locator: {} };
  }
  F.prototype.parseFromString = function(A, b) {
    var C = this.options, T = new R(), V = C.domBuilder || new M(), I = C.errorHandler, H = C.locator, w = C.xmlns || {}, x = /\/x?html?$/.test(b), o = x ? O.HTML_ENTITIES : O.XML_ENTITIES;
    H && V.setDocumentLocator(H), T.errorHandler = L(I, V, H), T.domBuilder = C.domBuilder || V, x && (w[""] = v.HTML), w.xml = w.xml || v.XML;
    var f = C.normalizeLineEndings || q;
    return A && typeof A == "string" ? T.parse(
      f(A),
      w,
      o
    ) : T.errorHandler.error("invalid doc source"), V.doc;
  };
  function L(A, b, C) {
    if (!A) {
      if (b instanceof M)
        return b;
      A = b;
    }
    var T = {}, V = A instanceof Function;
    C = C || {};
    function I(H) {
      var w = A[H];
      !w && V && (w = A.length == 2 ? function(x) {
        A(H, x);
      } : A), T[H] = w && function(x) {
        w("[xmldom " + H + "]	" + x + Y(C));
      } || function() {
      };
    }
    return I("warning"), I("error"), I("fatalError"), T;
  }
  function M() {
    this.cdata = !1;
  }
  function U(A, b) {
    b.lineNumber = A.lineNumber, b.columnNumber = A.columnNumber;
  }
  M.prototype = {
    startDocument: function() {
      this.doc = new z().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function(A, b, C, T) {
      var V = this.doc, I = V.createElementNS(A, C || b), H = T.length;
      K(this, I), this.currentElement = I, this.locator && U(this.locator, I);
      for (var w = 0; w < H; w++) {
        var A = T.getURI(w), x = T.getValue(w), C = T.getQName(w), o = V.createAttributeNS(A, C);
        this.locator && U(T.getLocator(w), o), o.value = o.nodeValue = x, I.setAttributeNode(o);
      }
    },
    endElement: function(A, b, C) {
      var T = this.currentElement;
      T.tagName, this.currentElement = T.parentNode;
    },
    startPrefixMapping: function(A, b) {
    },
    endPrefixMapping: function(A) {
    },
    processingInstruction: function(A, b) {
      var C = this.doc.createProcessingInstruction(A, b);
      this.locator && U(this.locator, C), K(this, C);
    },
    ignorableWhitespace: function(A, b, C) {
    },
    characters: function(A, b, C) {
      if (A = au.apply(this, arguments), A) {
        if (this.cdata)
          var T = this.doc.createCDATASection(A);
        else
          var T = this.doc.createTextNode(A);
        this.currentElement ? this.currentElement.appendChild(T) : /^\s*$/.test(A) && this.doc.appendChild(T), this.locator && U(this.locator, T);
      }
    },
    skippedEntity: function(A) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(A) {
      (this.locator = A) && (A.lineNumber = 0);
    },
    //LexicalHandler
    comment: function(A, b, C) {
      A = au.apply(this, arguments);
      var T = this.doc.createComment(A);
      this.locator && U(this.locator, T), K(this, T);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(A, b, C) {
      var T = this.doc.implementation;
      if (T && T.createDocumentType) {
        var V = T.createDocumentType(A, b, C);
        this.locator && U(this.locator, V), K(this, V), this.doc.doctype = V;
      }
    },
    /**
     * @see org.xml.sax.ErrorHandler
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(A) {
      console.warn("[xmldom warning]	" + A, Y(this.locator));
    },
    error: function(A) {
      console.error("[xmldom error]	" + A, Y(this.locator));
    },
    fatalError: function(A) {
      throw new S(A, this.locator);
    }
  };
  function Y(A) {
    if (A)
      return `
@` + (A.systemId || "") + "#[line:" + A.lineNumber + ",col:" + A.columnNumber + "]";
  }
  function au(A, b, C) {
    return typeof A == "string" ? A.substr(b, C) : A.length >= b + C || b ? new java.lang.String(A, b, C) + "" : A;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(A) {
    M.prototype[A] = function() {
      return null;
    };
  });
  function K(A, b) {
    A.currentElement ? A.currentElement.appendChild(b) : A.doc.appendChild(b);
  }
  return Bu.__DOMHandler = M, Bu.normalizeLineEndings = q, Bu.DOMParser = F, Bu;
}
var re;
function ce() {
  if (re)
    return Tu;
  re = 1;
  var N = ne();
  return Tu.DOMImplementation = N.DOMImplementation, Tu.XMLSerializer = N.XMLSerializer, Tu.DOMParser = le().DOMParser, Tu;
}
(function(N) {
  (function(B, O) {
    N.exports ? N.exports = O(ce().DOMParser) : B.X2JS = O();
  })(ie, function(B) {
    return function(l) {
      var z = "3.4.4";
      l = l || {};
      function v() {
        l.arrayAccessForm = l.arrayAccessForm || "none", l.emptyNodeForm = l.emptyNodeForm || "text", l.jsAttributeFilter = l.jsAttributeFilter, l.jsAttributeConverter = l.jsAttributeConverter, l.attributeConverters = l.attributeConverters || [], l.datetimeAccessFormPaths = l.datetimeAccessFormPaths || [], l.arrayAccessFormPaths = l.arrayAccessFormPaths || [], l.xmldomOptions = l.xmldomOptions || {}, l.enableToStringFunc === void 0 && (l.enableToStringFunc = !0), l.skipEmptyTextNodesForObj === void 0 && (l.skipEmptyTextNodesForObj = !0), l.stripWhitespaces === void 0 && (l.stripWhitespaces = !0), l.useDoubleQuotes === void 0 && (l.useDoubleQuotes = !0), l.ignoreRoot === void 0 && (l.ignoreRoot = !1), l.escapeMode === void 0 && (l.escapeMode = !0), l.attributePrefix === void 0 && (l.attributePrefix = "_"), l.selfClosingElements === void 0 && (l.selfClosingElements = !0), l.keepCData === void 0 && (l.keepCData = !1), l.keepText === void 0 && (l.keepText = !1), l.jsDateUTC === void 0 && (l.jsDateUTC = !1);
      }
      function S() {
        function t(n) {
          var i = String(n);
          return i.length === 1 && (i = "0" + i), i;
        }
        typeof String.prototype.trim != "function" && (String.prototype.trim = function() {
          return this.replace(/^\s+|^\n+|(\s|\n)+$/g, "");
        }), typeof Date.prototype.toISOString != "function" && (Date.prototype.toISOString = function() {
          var i = 1e3;
          return this.getUTCFullYear() + "-" + t(this.getUTCMonth() + 1) + "-" + t(this.getUTCDate()) + "T" + t(this.getUTCHours()) + ":" + t(this.getUTCMinutes()) + ":" + t(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / i).toFixed(3)).slice(2, 5) + "Z";
        });
      }
      v(), S();
      var R = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
      };
      function q(t) {
        var n = t.localName;
        return n == null && (n = t.baseName), (n == null || n === "") && (n = t.nodeName), n;
      }
      function F(t) {
        return t.prefix;
      }
      function L(t) {
        return typeof t == "string" ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : t;
      }
      function M(t) {
        return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
      }
      function U(t, n, i) {
        switch (l.arrayAccessForm) {
          case "property":
            t[n] instanceof Array ? t[n + "_asArray"] = t[n] : t[n + "_asArray"] = [t[n]];
            break;
        }
        if (!(t[n] instanceof Array) && l.arrayAccessFormPaths.length > 0) {
          for (var s = !1, p = 0; p < l.arrayAccessFormPaths.length; p++) {
            var D = l.arrayAccessFormPaths[p];
            if (typeof D == "string") {
              if (D === i) {
                s = !0;
                break;
              }
            } else if (D instanceof RegExp) {
              if (D.test(i)) {
                s = !0;
                break;
              }
            } else if (typeof D == "function" && D(n, i)) {
              s = !0;
              break;
            }
          }
          s && (t[n] = [t[n]]);
        }
      }
      function Y(t) {
        var n = 60, i = t.split(/[-T:+Z]/g), s = new Date(i[0], i[1] - 1, i[2]), p = i[5].split(".");
        if (s.setHours(i[3], i[4], p[0]), p.length > 1 && s.setMilliseconds(p[1]), i[6] && i[7]) {
          var D = i[6] * n + Number(i[7]), y = /\d\d-\d\d:\d\d$/.test(t) ? "-" : "+";
          D = 0 + (y === "-" ? -1 * D : D), s.setMinutes(s.getMinutes() - D - s.getTimezoneOffset());
        } else
          t.indexOf("Z", t.length - 1) !== -1 && (s = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes(), s.getSeconds(), s.getMilliseconds())));
        return s;
      }
      function au(t, n, i) {
        if (l.datetimeAccessFormPaths.length > 0)
          for (var s = i.split(".#")[0], p = 0; p < l.datetimeAccessFormPaths.length; p++) {
            var D = l.datetimeAccessFormPaths[p];
            if (typeof D == "string") {
              if (D === s)
                return Y(t);
            } else if (D instanceof RegExp) {
              if (D.test(s))
                return Y(t);
            } else if (typeof D == "function" && D(s))
              return Y(t);
          }
        return t;
      }
      function K(t) {
        for (var n = {}, i = t.childNodes, s = 0; s < i.length; s++) {
          var p = i.item(s);
          if (p.nodeType === R.ELEMENT_NODE) {
            var D = q(p);
            l.ignoreRoot ? n = b(p, D) : n[D] = b(p, D);
          }
        }
        return n;
      }
      function A(t, n) {
        var i = {};
        i.__cnt = 0;
        for (var s = t.childNodes, p = 0; p < s.length; p++) {
          var D = s.item(p), y = q(D);
          D.nodeType !== R.COMMENT_NODE && (i.__cnt++, i[y] == null ? (i[y] = b(D, n + "." + y), U(i, y, n + "." + y)) : (i[y] instanceof Array || (i[y] = [i[y]], U(i, y, n + "." + y)), i[y][i[y].length] = b(D, n + "." + y)));
        }
        for (var d = 0; d < t.attributes.length; d++) {
          var G = t.attributes.item(d);
          i.__cnt++;
          for (var uu = G.value, P = 0; P < l.attributeConverters.length; P++) {
            var j = l.attributeConverters[P];
            j.test.call(null, G.name, G.value) && (uu = j.convert.call(null, G.name, G.value));
          }
          i[l.attributePrefix + G.name] = uu;
        }
        var cu = F(t);
        return cu && (i.__cnt++, i.__prefix = cu), i["#text"] && (i.__text = i["#text"], i.__text instanceof Array && (i.__text = i.__text.join(`
`)), l.escapeMode && (i.__text = M(i.__text)), l.stripWhitespaces && (i.__text = i.__text.trim()), delete i["#text"], l.arrayAccessForm === "property" && delete i["#text_asArray"], i.__text = au(i.__text, "#text", n + ".#text")), i.hasOwnProperty("#cdata-section") && (i.__cdata = i["#cdata-section"], delete i["#cdata-section"], l.arrayAccessForm === "property" && delete i["#cdata-section_asArray"]), i.__cnt === 1 && i.__text && !l.keepText ? i = i.__text : i.__cnt === 0 && l.emptyNodeForm === "text" ? i = "" : i.__cnt > 1 && i.__text !== void 0 && l.skipEmptyTextNodesForObj && (l.stripWhitespaces && i.__text === "" || i.__text.trim() === "") && delete i.__text, delete i.__cnt, !l.keepCData && !i.hasOwnProperty("__text") && i.hasOwnProperty("__cdata") && Object.keys(i).length === 1 ? i.__cdata ? i.__cdata : "" : (l.enableToStringFunc && (i.__text || i.__cdata) && (i.toString = function() {
          return (this.__text ? this.__text : "") + (this.__cdata ? this.__cdata : "");
        }), i);
      }
      function b(t, n) {
        return t.nodeType === R.DOCUMENT_NODE ? K(t) : t.nodeType === R.ELEMENT_NODE ? A(t, n) : t.nodeType === R.TEXT_NODE || t.nodeType === R.CDATA_SECTION_NODE ? t.nodeValue : null;
      }
      function C(t, n, i, s) {
        var p = "<" + (t && t.__prefix ? t.__prefix + ":" : "") + n;
        if (i)
          for (var D = 0; D < i.length; D++) {
            var y = i[D], d = t[y];
            l.escapeMode && (d = L(d)), p += " " + y.substr(l.attributePrefix.length) + "=", l.useDoubleQuotes ? p += '"' + d + '"' : p += "'" + d + "'";
          }
        return s ? p += " />" : p += ">", p;
      }
      function T(t, n) {
        return "</" + (t && t.__prefix ? t.__prefix + ":" : "") + n + ">";
      }
      function V(t, n) {
        return t.indexOf(n, t.length - n.length) !== -1;
      }
      function I(t, n) {
        return !!(l.arrayAccessForm === "property" && V(n.toString(), "_asArray") || n.toString().indexOf(l.attributePrefix) === 0 || n.toString().indexOf("__") === 0 || t[n] instanceof Function);
      }
      function H(t) {
        var n = 0;
        if (t instanceof Object)
          for (var i in t)
            I(t, i) || n++;
        return n;
      }
      function w(t) {
        var n = [];
        if (t instanceof Object)
          for (var i in t)
            i.toString().indexOf("__") === -1 && i.toString().indexOf(l.attributePrefix) === 0 && n.push(i);
        return n;
      }
      function x(t) {
        var n = "";
        return t.__cdata && (n += "<![CDATA[" + t.__cdata + "]]>"), (t.__text || typeof t.__text == "number" || typeof t.__text == "boolean") && (l.escapeMode ? n += L(t.__text) : n += t.__text), n;
      }
      function o(t) {
        var n = "";
        return t instanceof Object ? n += x(t) : t !== null && (l.escapeMode ? n += L(t) : n += t), n;
      }
      function f(t, n, i) {
        var s = "";
        if (t.length === 0)
          s += C(t, n, i, !0);
        else
          for (var p = 0; p < t.length; p++)
            s += m(t[p], n, w(t[p]));
        return s;
      }
      function m(t, n, i) {
        var s = "";
        if (l.jsAttributeFilter && l.jsAttributeFilter.call(null, n, t))
          return s;
        if (l.jsAttributeConverter && (t = l.jsAttributeConverter.call(null, n, t)), (t == null || t === "") && l.selfClosingElements)
          s += C(t, n, i, !0);
        else if (typeof t == "object")
          if (Object.prototype.toString.call(t) === "[object Array]")
            s += f(t, n, i);
          else if (t instanceof Date)
            s += C(t, n, i, !1), s += l.jsDateUTC ? t.toUTCString() : t.toISOString(), s += T(t, n);
          else {
            var p = H(t);
            p > 0 || typeof t.__text == "number" || typeof t.__text == "boolean" || t.__text || t.__cdata ? (s += C(t, n, i, !1), s += h(t), s += T(t, n)) : l.selfClosingElements ? s += C(t, n, i, !0) : (s += C(t, n, i, !1), s += T(t, n));
          }
        else
          s += C(t, n, i, !1), s += o(t), s += T(t, n);
        return s;
      }
      function h(t) {
        var n = "", i = H(t);
        if (i > 0) {
          for (var s in t)
            if (!I(t, s)) {
              var p = t[s], D = w(p);
              n += m(p, s, D);
            }
        }
        return n += o(t), n;
      }
      function E(t) {
        if (t === void 0 || typeof t != "string")
          return null;
        var n = null, i = null;
        if (B)
          n = new B(l.xmldomOptions), i = n.parseFromString(t, "text/xml");
        else if (window && window.DOMParser) {
          n = new window.DOMParser();
          var s = null, p = window.ActiveXObject || "ActiveXObject" in window;
          if (!p && document.all && !document.addEventListener)
            try {
              s = n.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI;
            } catch {
              s = null;
            }
          try {
            i = n.parseFromString(t, "text/xml"), s !== null && i.getElementsByTagNameNS(s, "parsererror").length > 0 && (i = null);
          } catch {
            i = null;
          }
        } else
          t.indexOf("<?") === 0 && (t = t.substr(t.indexOf("?>") + 2)), i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(t);
        return i;
      }
      this.asArray = function(n) {
        return n == null ? [] : n instanceof Array ? n : [n];
      }, this.toXmlDateTime = function(n) {
        return n instanceof Date ? n.toISOString() : typeof n == "number" ? new Date(n).toISOString() : null;
      }, this.asDateTime = function(n) {
        return typeof n == "string" ? Y(n) : n;
      }, this.xml2dom = function(n) {
        return E(n);
      }, this.dom2js = function(n) {
        return b(n, null);
      }, this.js2dom = function(n) {
        var i = this.js2xml(n);
        return E(i);
      }, this.xml2js = function(n) {
        var i = E(n);
        return i != null ? this.dom2js(i) : null;
      }, this.js2xml = function(n) {
        return h(n);
      }, this.getVersion = function() {
        return z;
      };
    };
  });
})(te);
var pe = te.exports;
const fe = /* @__PURE__ */ ae(pe);
class De extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const O = await (await fetch("sitemap.xml")).text();
    let z = new fe().xml2js(O), v = "files:<br />";
    for (const S of z.urlset.url) {
      const q = new URL(S.loc).pathname;
      v += `&nbsp;&nbsp;<a href="${q}">${q}</a><br />`;
    }
    this.innerHTML = v;
  }
}
customElements.define("x-sitemap", De);
class Ae extends HTMLElement {
  // (1)
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.ariaExpanded) {
      if (this.ariaExpanded = !0, window.frameElement && window.frameElement.getAttribute("data-src"))
        this.attributes.src = window.frameElement.getAttribute("data-src");
      else {
        const O = new URLSearchParams(window.location.search).get("src");
        O && (this.attributes.src = O);
      }
      if (this.attributes.src) {
        let B = this.attributes.src;
        typeof B != "string" && (B = this.attributes.src.value);
        const O = new URL(B.replace("https:/", "https://wp-now-corsproxy.rhildred.workers.dev/corsproxy")), z = await (await fetch(O)).text();
        if (this.innerHTML = marked(z), window.frameElement) {
          const v = window.frameElement;
          v.width = v.contentWindow.document.body.scrollWidth + 50, v.height = v.contentWindow.document.body.scrollHeight + 50;
        }
      } else
        this.innerHTML = marked(this.innerHTML);
    }
  }
}
customElements.define("x-markdown2html", Ae);
class he extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.ariaExpanded) {
      this.ariaExpanded = !0;
      const O = window.parent.API.Activity.ItemIdentifier.split("/");
      let l = ["https:/", "github.com"].concat(O.slice(0, 2)).concat(["raw", "main"]).concat(O.slice(2)).concat(["slides.Rmd"]);
      console.log(l);
      const z = l.join("/");
      this.innerHTML = `<x-markdown2html src="${z}"></x-markdown2html>`;
    }
  }
}
customElements.define("x-scorm", he);
