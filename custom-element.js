var Ot = Object.defineProperty;
var It = (m, r, u) => r in m ? Ot(m, r, { enumerable: !0, configurable: !0, writable: !0, value: u }) : m[r] = u;
var G = (m, r, u) => (It(m, typeof r != "symbol" ? r + "" : r, u), u), Lt = (m, r, u) => {
  if (!r.has(m))
    throw TypeError("Cannot " + u);
};
var it = (m, r, u) => {
  if (r.has(m))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(m) : r.set(m, u);
};
var je = (m, r, u) => (Lt(m, r, "access private method"), u);
function ot() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let _e = ot();
function Bt(m) {
  _e = m;
}
const Nt = /[&<>"']/, Mt = new RegExp(Nt.source, "g"), St = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Ut = new RegExp(St.source, "g"), zt = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, bt = (m) => zt[m];
function se(m, r) {
  if (r) {
    if (Nt.test(m))
      return m.replace(Mt, bt);
  } else if (St.test(m))
    return m.replace(Ut, bt);
  return m;
}
const $t = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function Pt(m) {
  return m.replace($t, (r, u) => (u = u.toLowerCase(), u === "colon" ? ":" : u.charAt(0) === "#" ? u.charAt(1) === "x" ? String.fromCharCode(parseInt(u.substring(2), 16)) : String.fromCharCode(+u.substring(1)) : ""));
}
const Vt = /(^|[^\[])\^/g;
function P(m, r) {
  m = typeof m == "string" ? m : m.source, r = r || "";
  const u = {
    replace: (e, a) => (a = typeof a == "object" && "source" in a ? a.source : a, a = a.replace(Vt, "$1"), m = m.replace(e, a), u),
    getRegex: () => new RegExp(m, r)
  };
  return u;
}
function Et(m) {
  try {
    m = encodeURI(m).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return m;
}
const Xe = { exec: () => null };
function wt(m, r) {
  const u = m.replace(/\|/g, (s, o, g) => {
    let d = !1, v = o;
    for (; --v >= 0 && g[v] === "\\"; )
      d = !d;
    return d ? "|" : " |";
  }), e = u.split(/ \|/);
  let a = 0;
  if (e[0].trim() || e.shift(), e.length > 0 && !e[e.length - 1].trim() && e.pop(), r)
    if (e.length > r)
      e.splice(r);
    else
      for (; e.length < r; )
        e.push("");
  for (; a < e.length; a++)
    e[a] = e[a].trim().replace(/\\\|/g, "|");
  return e;
}
function He(m, r, u) {
  const e = m.length;
  if (e === 0)
    return "";
  let a = 0;
  for (; a < e; ) {
    const s = m.charAt(e - a - 1);
    if (s === r && !u)
      a++;
    else if (s !== r && u)
      a++;
    else
      break;
  }
  return m.slice(0, e - a);
}
function jt(m, r) {
  if (m.indexOf(r[1]) === -1)
    return -1;
  let u = 0;
  for (let e = 0; e < m.length; e++)
    if (m[e] === "\\")
      e++;
    else if (m[e] === r[0])
      u++;
    else if (m[e] === r[1] && (u--, u < 0))
      return e;
  return -1;
}
function vt(m, r, u, e) {
  const a = r.href, s = r.title ? se(r.title) : null, o = m[1].replace(/\\([\[\]])/g, "$1");
  if (m[0].charAt(0) !== "!") {
    e.state.inLink = !0;
    const g = {
      type: "link",
      raw: u,
      href: a,
      title: s,
      text: o,
      tokens: e.inlineTokens(o)
    };
    return e.state.inLink = !1, g;
  }
  return {
    type: "image",
    raw: u,
    href: a,
    title: s,
    text: se(o)
  };
}
function Ht(m, r) {
  const u = m.match(/^(\s+)(?:```)/);
  if (u === null)
    return r;
  const e = u[1];
  return r.split(`
`).map((a) => {
    const s = a.match(/^\s+/);
    if (s === null)
      return a;
    const [o] = s;
    return o.length >= e.length ? a.slice(e.length) : a;
  }).join(`
`);
}
class Ze {
  constructor(r) {
    G(this, "options");
    // TODO: Fix this rules type
    G(this, "rules");
    G(this, "lexer");
    this.options = r || _e;
  }
  space(r) {
    const u = this.rules.block.newline.exec(r);
    if (u && u[0].length > 0)
      return {
        type: "space",
        raw: u[0]
      };
  }
  code(r) {
    const u = this.rules.block.code.exec(r);
    if (u) {
      const e = u[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: u[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? e : He(e, `
`)
      };
    }
  }
  fences(r) {
    const u = this.rules.block.fences.exec(r);
    if (u) {
      const e = u[0], a = Ht(e, u[3] || "");
      return {
        type: "code",
        raw: e,
        lang: u[2] ? u[2].trim().replace(this.rules.inline._escapes, "$1") : u[2],
        text: a
      };
    }
  }
  heading(r) {
    const u = this.rules.block.heading.exec(r);
    if (u) {
      let e = u[2].trim();
      if (/#$/.test(e)) {
        const a = He(e, "#");
        (this.options.pedantic || !a || / $/.test(a)) && (e = a.trim());
      }
      return {
        type: "heading",
        raw: u[0],
        depth: u[1].length,
        text: e,
        tokens: this.lexer.inline(e)
      };
    }
  }
  hr(r) {
    const u = this.rules.block.hr.exec(r);
    if (u)
      return {
        type: "hr",
        raw: u[0]
      };
  }
  blockquote(r) {
    const u = this.rules.block.blockquote.exec(r);
    if (u) {
      const e = He(u[0].replace(/^ *>[ \t]?/gm, ""), `
`), a = this.lexer.state.top;
      this.lexer.state.top = !0;
      const s = this.lexer.blockTokens(e);
      return this.lexer.state.top = a, {
        type: "blockquote",
        raw: u[0],
        tokens: s,
        text: e
      };
    }
  }
  list(r) {
    let u = this.rules.block.list.exec(r);
    if (u) {
      let e = u[1].trim();
      const a = e.length > 1, s = {
        type: "list",
        raw: "",
        ordered: a,
        start: a ? +e.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      e = a ? `\\d{1,9}\\${e.slice(-1)}` : `\\${e}`, this.options.pedantic && (e = a ? e : "[*+-]");
      const o = new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let g = "", d = "", v = !1;
      for (; r; ) {
        let b = !1;
        if (!(u = o.exec(r)) || this.rules.block.hr.test(r))
          break;
        g = u[0], r = r.substring(g.length);
        let _ = u[2].split(`
`, 1)[0].replace(/^\t+/, (O) => " ".repeat(3 * O.length)), k = r.split(`
`, 1)[0], q = 0;
        this.options.pedantic ? (q = 2, d = _.trimStart()) : (q = u[2].search(/[^ ]/), q = q > 4 ? 1 : q, d = _.slice(q), q += u[1].length);
        let W = !1;
        if (!_ && /^ *$/.test(k) && (g += k + `
`, r = r.substring(k.length + 1), b = !0), !b) {
          const O = new RegExp(`^ {0,${Math.min(3, q - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), I = new RegExp(`^ {0,${Math.min(3, q - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), L = new RegExp(`^ {0,${Math.min(3, q - 1)}}(?:\`\`\`|~~~)`), Z = new RegExp(`^ {0,${Math.min(3, q - 1)}}#`);
          for (; r; ) {
            const V = r.split(`
`, 1)[0];
            if (k = V, this.options.pedantic && (k = k.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), L.test(k) || Z.test(k) || O.test(k) || I.test(r))
              break;
            if (k.search(/[^ ]/) >= q || !k.trim())
              d += `
` + k.slice(q);
            else {
              if (W || _.search(/[^ ]/) >= 4 || L.test(_) || Z.test(_) || I.test(_))
                break;
              d += `
` + k;
            }
            !W && !k.trim() && (W = !0), g += V + `
`, r = r.substring(V.length + 1), _ = k.slice(q);
          }
        }
        s.loose || (v ? s.loose = !0 : /\n *\n *$/.test(g) && (v = !0));
        let X = null, E;
        this.options.gfm && (X = /^\[[ xX]\] /.exec(d), X && (E = X[0] !== "[ ] ", d = d.replace(/^\[[ xX]\] +/, ""))), s.items.push({
          type: "list_item",
          raw: g,
          task: !!X,
          checked: E,
          loose: !1,
          text: d,
          tokens: []
        }), s.raw += g;
      }
      s.items[s.items.length - 1].raw = g.trimEnd(), s.items[s.items.length - 1].text = d.trimEnd(), s.raw = s.raw.trimEnd();
      for (let b = 0; b < s.items.length; b++)
        if (this.lexer.state.top = !1, s.items[b].tokens = this.lexer.blockTokens(s.items[b].text, []), !s.loose) {
          const _ = s.items[b].tokens.filter((q) => q.type === "space"), k = _.length > 0 && _.some((q) => /\n.*\n/.test(q.raw));
          s.loose = k;
        }
      if (s.loose)
        for (let b = 0; b < s.items.length; b++)
          s.items[b].loose = !0;
      return s;
    }
  }
  html(r) {
    const u = this.rules.block.html.exec(r);
    if (u)
      return {
        type: "html",
        block: !0,
        raw: u[0],
        pre: u[1] === "pre" || u[1] === "script" || u[1] === "style",
        text: u[0]
      };
  }
  def(r) {
    const u = this.rules.block.def.exec(r);
    if (u) {
      const e = u[1].toLowerCase().replace(/\s+/g, " "), a = u[2] ? u[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "", s = u[3] ? u[3].substring(1, u[3].length - 1).replace(this.rules.inline._escapes, "$1") : u[3];
      return {
        type: "def",
        tag: e,
        raw: u[0],
        href: a,
        title: s
      };
    }
  }
  table(r) {
    const u = this.rules.block.table.exec(r);
    if (u) {
      if (!/[:|]/.test(u[2]))
        return;
      const e = {
        type: "table",
        raw: u[0],
        header: wt(u[1]).map((a) => ({ text: a, tokens: [] })),
        align: u[2].replace(/^\||\| *$/g, "").split("|"),
        rows: u[3] && u[3].trim() ? u[3].replace(/\n[ \t]*$/, "").split(`
`) : []
      };
      if (e.header.length === e.align.length) {
        let a = e.align.length, s, o, g, d;
        for (s = 0; s < a; s++) {
          const v = e.align[s];
          v && (/^ *-+: *$/.test(v) ? e.align[s] = "right" : /^ *:-+: *$/.test(v) ? e.align[s] = "center" : /^ *:-+ *$/.test(v) ? e.align[s] = "left" : e.align[s] = null);
        }
        for (a = e.rows.length, s = 0; s < a; s++)
          e.rows[s] = wt(e.rows[s], e.header.length).map((v) => ({ text: v, tokens: [] }));
        for (a = e.header.length, o = 0; o < a; o++)
          e.header[o].tokens = this.lexer.inline(e.header[o].text);
        for (a = e.rows.length, o = 0; o < a; o++)
          for (d = e.rows[o], g = 0; g < d.length; g++)
            d[g].tokens = this.lexer.inline(d[g].text);
        return e;
      }
    }
  }
  lheading(r) {
    const u = this.rules.block.lheading.exec(r);
    if (u)
      return {
        type: "heading",
        raw: u[0],
        depth: u[2].charAt(0) === "=" ? 1 : 2,
        text: u[1],
        tokens: this.lexer.inline(u[1])
      };
  }
  paragraph(r) {
    const u = this.rules.block.paragraph.exec(r);
    if (u) {
      const e = u[1].charAt(u[1].length - 1) === `
` ? u[1].slice(0, -1) : u[1];
      return {
        type: "paragraph",
        raw: u[0],
        text: e,
        tokens: this.lexer.inline(e)
      };
    }
  }
  text(r) {
    const u = this.rules.block.text.exec(r);
    if (u)
      return {
        type: "text",
        raw: u[0],
        text: u[0],
        tokens: this.lexer.inline(u[0])
      };
  }
  escape(r) {
    const u = this.rules.inline.escape.exec(r);
    if (u)
      return {
        type: "escape",
        raw: u[0],
        text: se(u[1])
      };
  }
  tag(r) {
    const u = this.rules.inline.tag.exec(r);
    if (u)
      return !this.lexer.state.inLink && /^<a /i.test(u[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(u[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(u[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(u[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: u[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: u[0]
      };
  }
  link(r) {
    const u = this.rules.inline.link.exec(r);
    if (u) {
      const e = u[2].trim();
      if (!this.options.pedantic && /^</.test(e)) {
        if (!/>$/.test(e))
          return;
        const o = He(e.slice(0, -1), "\\");
        if ((e.length - o.length) % 2 === 0)
          return;
      } else {
        const o = jt(u[2], "()");
        if (o > -1) {
          const d = (u[0].indexOf("!") === 0 ? 5 : 4) + u[1].length + o;
          u[2] = u[2].substring(0, o), u[0] = u[0].substring(0, d).trim(), u[3] = "";
        }
      }
      let a = u[2], s = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(a);
        o && (a = o[1], s = o[3]);
      } else
        s = u[3] ? u[3].slice(1, -1) : "";
      return a = a.trim(), /^</.test(a) && (this.options.pedantic && !/>$/.test(e) ? a = a.slice(1) : a = a.slice(1, -1)), vt(u, {
        href: a && a.replace(this.rules.inline._escapes, "$1"),
        title: s && s.replace(this.rules.inline._escapes, "$1")
      }, u[0], this.lexer);
    }
  }
  reflink(r, u) {
    let e;
    if ((e = this.rules.inline.reflink.exec(r)) || (e = this.rules.inline.nolink.exec(r))) {
      let a = (e[2] || e[1]).replace(/\s+/g, " ");
      if (a = u[a.toLowerCase()], !a) {
        const s = e[0].charAt(0);
        return {
          type: "text",
          raw: s,
          text: s
        };
      }
      return vt(e, a, e[0], this.lexer);
    }
  }
  emStrong(r, u, e = "") {
    let a = this.rules.inline.emStrong.lDelim.exec(r);
    if (!a || a[3] && e.match(/[\p{L}\p{N}]/u))
      return;
    if (!(a[1] || a[2] || "") || !e || this.rules.inline.punctuation.exec(e)) {
      const o = [...a[0]].length - 1;
      let g, d, v = o, b = 0;
      const _ = a[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      for (_.lastIndex = 0, u = u.slice(-1 * r.length + o); (a = _.exec(u)) != null; ) {
        if (g = a[1] || a[2] || a[3] || a[4] || a[5] || a[6], !g)
          continue;
        if (d = [...g].length, a[3] || a[4]) {
          v += d;
          continue;
        } else if ((a[5] || a[6]) && o % 3 && !((o + d) % 3)) {
          b += d;
          continue;
        }
        if (v -= d, v > 0)
          continue;
        d = Math.min(d, d + v + b);
        const k = [...a[0]][0].length, q = r.slice(0, o + a.index + k + d);
        if (Math.min(o, d) % 2) {
          const X = q.slice(1, -1);
          return {
            type: "em",
            raw: q,
            text: X,
            tokens: this.lexer.inlineTokens(X)
          };
        }
        const W = q.slice(2, -2);
        return {
          type: "strong",
          raw: q,
          text: W,
          tokens: this.lexer.inlineTokens(W)
        };
      }
    }
  }
  codespan(r) {
    const u = this.rules.inline.code.exec(r);
    if (u) {
      let e = u[2].replace(/\n/g, " ");
      const a = /[^ ]/.test(e), s = /^ /.test(e) && / $/.test(e);
      return a && s && (e = e.substring(1, e.length - 1)), e = se(e, !0), {
        type: "codespan",
        raw: u[0],
        text: e
      };
    }
  }
  br(r) {
    const u = this.rules.inline.br.exec(r);
    if (u)
      return {
        type: "br",
        raw: u[0]
      };
  }
  del(r) {
    const u = this.rules.inline.del.exec(r);
    if (u)
      return {
        type: "del",
        raw: u[0],
        text: u[2],
        tokens: this.lexer.inlineTokens(u[2])
      };
  }
  autolink(r) {
    const u = this.rules.inline.autolink.exec(r);
    if (u) {
      let e, a;
      return u[2] === "@" ? (e = se(u[1]), a = "mailto:" + e) : (e = se(u[1]), a = e), {
        type: "link",
        raw: u[0],
        text: e,
        href: a,
        tokens: [
          {
            type: "text",
            raw: e,
            text: e
          }
        ]
      };
    }
  }
  url(r) {
    let u;
    if (u = this.rules.inline.url.exec(r)) {
      let e, a;
      if (u[2] === "@")
        e = se(u[0]), a = "mailto:" + e;
      else {
        let s;
        do
          s = u[0], u[0] = this.rules.inline._backpedal.exec(u[0])[0];
        while (s !== u[0]);
        e = se(u[0]), u[1] === "www." ? a = "http://" + u[0] : a = u[0];
      }
      return {
        type: "link",
        raw: u[0],
        text: e,
        href: a,
        tokens: [
          {
            type: "text",
            raw: e,
            text: e
          }
        ]
      };
    }
  }
  inlineText(r) {
    const u = this.rules.inline.text.exec(r);
    if (u) {
      let e;
      return this.lexer.state.inRawBlock ? e = u[0] : e = se(u[0]), {
        type: "text",
        raw: u[0],
        text: e
      };
    }
  }
}
const S = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: Xe,
  lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
S._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
S._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
S.def = P(S.def).replace("label", S._label).replace("title", S._title).getRegex();
S.bullet = /(?:[*+-]|\d{1,9}[.)])/;
S.listItemStart = P(/^( *)(bull) */).replace("bull", S.bullet).getRegex();
S.list = P(S.list).replace(/bull/g, S.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + S.def.source + ")").getRegex();
S._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
S._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
S.html = P(S.html, "i").replace("comment", S._comment).replace("tag", S._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
S.lheading = P(S.lheading).replace(/bull/g, S.bullet).getRegex();
S.paragraph = P(S._paragraph).replace("hr", S.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", S._tag).getRegex();
S.blockquote = P(S.blockquote).replace("paragraph", S.paragraph).getRegex();
S.normal = { ...S };
S.gfm = {
  ...S.normal,
  table: "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
};
S.gfm.table = P(S.gfm.table).replace("hr", S.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", S._tag).getRegex();
S.gfm.paragraph = P(S._paragraph).replace("hr", S.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", S.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", S._tag).getRegex();
S.pedantic = {
  ...S.normal,
  html: P(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", S._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Xe,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: P(S.normal._paragraph).replace("hr", S.hr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", S.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
const y = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: Xe,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    //         (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //         | Skip orphan inside strong      | Consume to delim | (1) #***              | (2) a***#, a***                    | (3) #***a, ***a                  | (4) ***#                 | (5) #***#                         | (6) a***a
    rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: Xe,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^((?![*_])[\spunctuation])/
};
y._punctuation = "\\p{P}$+<=>`^|~";
y.punctuation = P(y.punctuation, "u").replace(/punctuation/g, y._punctuation).getRegex();
y.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
y.anyPunctuation = /\\[punct]/g;
y._escapes = /\\([punct])/g;
y._comment = P(S._comment).replace("(?:-->|$)", "-->").getRegex();
y.emStrong.lDelim = P(y.emStrong.lDelim, "u").replace(/punct/g, y._punctuation).getRegex();
y.emStrong.rDelimAst = P(y.emStrong.rDelimAst, "gu").replace(/punct/g, y._punctuation).getRegex();
y.emStrong.rDelimUnd = P(y.emStrong.rDelimUnd, "gu").replace(/punct/g, y._punctuation).getRegex();
y.anyPunctuation = P(y.anyPunctuation, "gu").replace(/punct/g, y._punctuation).getRegex();
y._escapes = P(y._escapes, "gu").replace(/punct/g, y._punctuation).getRegex();
y._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
y._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
y.autolink = P(y.autolink).replace("scheme", y._scheme).replace("email", y._email).getRegex();
y._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
y.tag = P(y.tag).replace("comment", y._comment).replace("attribute", y._attribute).getRegex();
y._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
y._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
y._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
y.link = P(y.link).replace("label", y._label).replace("href", y._href).replace("title", y._title).getRegex();
y.reflink = P(y.reflink).replace("label", y._label).replace("ref", S._label).getRegex();
y.nolink = P(y.nolink).replace("ref", S._label).getRegex();
y.reflinkSearch = P(y.reflinkSearch, "g").replace("reflink", y.reflink).replace("nolink", y.nolink).getRegex();
y.normal = { ...y };
y.pedantic = {
  ...y.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: P(/^!?\[(label)\]\((.*?)\)/).replace("label", y._label).getRegex(),
  reflink: P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", y._label).getRegex()
};
y.gfm = {
  ...y.normal,
  escape: P(y.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
y.gfm.url = P(y.gfm.url, "i").replace("email", y.gfm._extended_email).getRegex();
y.breaks = {
  ...y.gfm,
  br: P(y.br).replace("{2,}", "*").getRegex(),
  text: P(y.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
class he {
  constructor(r) {
    G(this, "tokens");
    G(this, "options");
    G(this, "state");
    G(this, "tokenizer");
    G(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = r || _e, this.options.tokenizer = this.options.tokenizer || new Ze(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const u = {
      block: S.normal,
      inline: y.normal
    };
    this.options.pedantic ? (u.block = S.pedantic, u.inline = y.pedantic) : this.options.gfm && (u.block = S.gfm, this.options.breaks ? u.inline = y.breaks : u.inline = y.gfm), this.tokenizer.rules = u;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: S,
      inline: y
    };
  }
  /**
   * Static Lex Method
   */
  static lex(r, u) {
    return new he(u).lex(r);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(r, u) {
    return new he(u).inlineTokens(r);
  }
  /**
   * Preprocessing
   */
  lex(r) {
    r = r.replace(/\r\n|\r/g, `
`), this.blockTokens(r, this.tokens);
    let u;
    for (; u = this.inlineQueue.shift(); )
      this.inlineTokens(u.src, u.tokens);
    return this.tokens;
  }
  blockTokens(r, u = []) {
    this.options.pedantic ? r = r.replace(/\t/g, "    ").replace(/^ +$/gm, "") : r = r.replace(/^( *)(\t+)/gm, (g, d, v) => d + "    ".repeat(v.length));
    let e, a, s, o;
    for (; r; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((g) => (e = g.call({ lexer: this }, r, u)) ? (r = r.substring(e.raw.length), u.push(e), !0) : !1))) {
        if (e = this.tokenizer.space(r)) {
          r = r.substring(e.raw.length), e.raw.length === 1 && u.length > 0 ? u[u.length - 1].raw += `
` : u.push(e);
          continue;
        }
        if (e = this.tokenizer.code(r)) {
          r = r.substring(e.raw.length), a = u[u.length - 1], a && (a.type === "paragraph" || a.type === "text") ? (a.raw += `
` + e.raw, a.text += `
` + e.text, this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : u.push(e);
          continue;
        }
        if (e = this.tokenizer.fences(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.heading(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.hr(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.blockquote(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.list(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.html(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.def(r)) {
          r = r.substring(e.raw.length), a = u[u.length - 1], a && (a.type === "paragraph" || a.type === "text") ? (a.raw += `
` + e.raw, a.text += `
` + e.raw, this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : this.tokens.links[e.tag] || (this.tokens.links[e.tag] = {
            href: e.href,
            title: e.title
          });
          continue;
        }
        if (e = this.tokenizer.table(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.lheading(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (s = r, this.options.extensions && this.options.extensions.startBlock) {
          let g = 1 / 0;
          const d = r.slice(1);
          let v;
          this.options.extensions.startBlock.forEach((b) => {
            v = b.call({ lexer: this }, d), typeof v == "number" && v >= 0 && (g = Math.min(g, v));
          }), g < 1 / 0 && g >= 0 && (s = r.substring(0, g + 1));
        }
        if (this.state.top && (e = this.tokenizer.paragraph(s))) {
          a = u[u.length - 1], o && a.type === "paragraph" ? (a.raw += `
` + e.raw, a.text += `
` + e.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : u.push(e), o = s.length !== r.length, r = r.substring(e.raw.length);
          continue;
        }
        if (e = this.tokenizer.text(r)) {
          r = r.substring(e.raw.length), a = u[u.length - 1], a && a.type === "text" ? (a.raw += `
` + e.raw, a.text += `
` + e.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : u.push(e);
          continue;
        }
        if (r) {
          const g = "Infinite loop on byte: " + r.charCodeAt(0);
          if (this.options.silent) {
            console.error(g);
            break;
          } else
            throw new Error(g);
        }
      }
    return this.state.top = !0, u;
  }
  inline(r, u = []) {
    return this.inlineQueue.push({ src: r, tokens: u }), u;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(r, u = []) {
    let e, a, s, o = r, g, d, v;
    if (this.tokens.links) {
      const b = Object.keys(this.tokens.links);
      if (b.length > 0)
        for (; (g = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          b.includes(g[0].slice(g[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, g.index) + "[" + "a".repeat(g[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (g = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, g.index) + "[" + "a".repeat(g[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (g = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, g.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; r; )
      if (d || (v = ""), d = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((b) => (e = b.call({ lexer: this }, r, u)) ? (r = r.substring(e.raw.length), u.push(e), !0) : !1))) {
        if (e = this.tokenizer.escape(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.tag(r)) {
          r = r.substring(e.raw.length), a = u[u.length - 1], a && e.type === "text" && a.type === "text" ? (a.raw += e.raw, a.text += e.text) : u.push(e);
          continue;
        }
        if (e = this.tokenizer.link(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.reflink(r, this.tokens.links)) {
          r = r.substring(e.raw.length), a = u[u.length - 1], a && e.type === "text" && a.type === "text" ? (a.raw += e.raw, a.text += e.text) : u.push(e);
          continue;
        }
        if (e = this.tokenizer.emStrong(r, o, v)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.codespan(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.br(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.del(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (e = this.tokenizer.autolink(r)) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (!this.state.inLink && (e = this.tokenizer.url(r))) {
          r = r.substring(e.raw.length), u.push(e);
          continue;
        }
        if (s = r, this.options.extensions && this.options.extensions.startInline) {
          let b = 1 / 0;
          const _ = r.slice(1);
          let k;
          this.options.extensions.startInline.forEach((q) => {
            k = q.call({ lexer: this }, _), typeof k == "number" && k >= 0 && (b = Math.min(b, k));
          }), b < 1 / 0 && b >= 0 && (s = r.substring(0, b + 1));
        }
        if (e = this.tokenizer.inlineText(s)) {
          r = r.substring(e.raw.length), e.raw.slice(-1) !== "_" && (v = e.raw.slice(-1)), d = !0, a = u[u.length - 1], a && a.type === "text" ? (a.raw += e.raw, a.text += e.text) : u.push(e);
          continue;
        }
        if (r) {
          const b = "Infinite loop on byte: " + r.charCodeAt(0);
          if (this.options.silent) {
            console.error(b);
            break;
          } else
            throw new Error(b);
        }
      }
    return u;
  }
}
class Qe {
  constructor(r) {
    G(this, "options");
    this.options = r || _e;
  }
  code(r, u, e) {
    var s;
    const a = (s = (u || "").match(/^\S*/)) == null ? void 0 : s[0];
    return r = r.replace(/\n$/, "") + `
`, a ? '<pre><code class="language-' + se(a) + '">' + (e ? r : se(r, !0)) + `</code></pre>
` : "<pre><code>" + (e ? r : se(r, !0)) + `</code></pre>
`;
  }
  blockquote(r) {
    return `<blockquote>
${r}</blockquote>
`;
  }
  html(r, u) {
    return r;
  }
  heading(r, u, e) {
    return `<h${u}>${r}</h${u}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(r, u, e) {
    const a = u ? "ol" : "ul", s = u && e !== 1 ? ' start="' + e + '"' : "";
    return "<" + a + s + `>
` + r + "</" + a + `>
`;
  }
  listitem(r, u, e) {
    return `<li>${r}</li>
`;
  }
  checkbox(r) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(r) {
    return `<p>${r}</p>
`;
  }
  table(r, u) {
    return u && (u = `<tbody>${u}</tbody>`), `<table>
<thead>
` + r + `</thead>
` + u + `</table>
`;
  }
  tablerow(r) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r, u) {
    const e = u.header ? "th" : "td";
    return (u.align ? `<${e} align="${u.align}">` : `<${e}>`) + r + `</${e}>
`;
  }
  /**
   * span level renderer
   */
  strong(r) {
    return `<strong>${r}</strong>`;
  }
  em(r) {
    return `<em>${r}</em>`;
  }
  codespan(r) {
    return `<code>${r}</code>`;
  }
  br() {
    return "<br>";
  }
  del(r) {
    return `<del>${r}</del>`;
  }
  link(r, u, e) {
    const a = Et(r);
    if (a === null)
      return e;
    r = a;
    let s = '<a href="' + r + '"';
    return u && (s += ' title="' + u + '"'), s += ">" + e + "</a>", s;
  }
  image(r, u, e) {
    const a = Et(r);
    if (a === null)
      return e;
    r = a;
    let s = `<img src="${r}" alt="${e}"`;
    return u && (s += ` title="${u}"`), s += ">", s;
  }
  text(r) {
    return r;
  }
}
class lt {
  // no need for block level renderers
  strong(r) {
    return r;
  }
  em(r) {
    return r;
  }
  codespan(r) {
    return r;
  }
  del(r) {
    return r;
  }
  html(r) {
    return r;
  }
  text(r) {
    return r;
  }
  link(r, u, e) {
    return "" + e;
  }
  image(r, u, e) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class ge {
  constructor(r) {
    G(this, "options");
    G(this, "renderer");
    G(this, "textRenderer");
    this.options = r || _e, this.options.renderer = this.options.renderer || new Qe(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new lt();
  }
  /**
   * Static Parse Method
   */
  static parse(r, u) {
    return new ge(u).parse(r);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(r, u) {
    return new ge(u).parseInline(r);
  }
  /**
   * Parse Loop
   */
  parse(r, u = !0) {
    let e = "";
    for (let a = 0; a < r.length; a++) {
      const s = r[a];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const o = s, g = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (g !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
          e += g || "";
          continue;
        }
      }
      switch (s.type) {
        case "space":
          continue;
        case "hr": {
          e += this.renderer.hr();
          continue;
        }
        case "heading": {
          const o = s;
          e += this.renderer.heading(this.parseInline(o.tokens), o.depth, Pt(this.parseInline(o.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const o = s;
          e += this.renderer.code(o.text, o.lang, !!o.escaped);
          continue;
        }
        case "table": {
          const o = s;
          let g = "", d = "";
          for (let b = 0; b < o.header.length; b++)
            d += this.renderer.tablecell(this.parseInline(o.header[b].tokens), { header: !0, align: o.align[b] });
          g += this.renderer.tablerow(d);
          let v = "";
          for (let b = 0; b < o.rows.length; b++) {
            const _ = o.rows[b];
            d = "";
            for (let k = 0; k < _.length; k++)
              d += this.renderer.tablecell(this.parseInline(_[k].tokens), { header: !1, align: o.align[k] });
            v += this.renderer.tablerow(d);
          }
          e += this.renderer.table(g, v);
          continue;
        }
        case "blockquote": {
          const o = s, g = this.parse(o.tokens);
          e += this.renderer.blockquote(g);
          continue;
        }
        case "list": {
          const o = s, g = o.ordered, d = o.start, v = o.loose;
          let b = "";
          for (let _ = 0; _ < o.items.length; _++) {
            const k = o.items[_], q = k.checked, W = k.task;
            let X = "";
            if (k.task) {
              const E = this.renderer.checkbox(!!q);
              v ? k.tokens.length > 0 && k.tokens[0].type === "paragraph" ? (k.tokens[0].text = E + " " + k.tokens[0].text, k.tokens[0].tokens && k.tokens[0].tokens.length > 0 && k.tokens[0].tokens[0].type === "text" && (k.tokens[0].tokens[0].text = E + " " + k.tokens[0].tokens[0].text)) : k.tokens.unshift({
                type: "text",
                text: E + " "
              }) : X += E + " ";
            }
            X += this.parse(k.tokens, v), b += this.renderer.listitem(X, W, !!q);
          }
          e += this.renderer.list(b, g, d);
          continue;
        }
        case "html": {
          const o = s;
          e += this.renderer.html(o.text, o.block);
          continue;
        }
        case "paragraph": {
          const o = s;
          e += this.renderer.paragraph(this.parseInline(o.tokens));
          continue;
        }
        case "text": {
          let o = s, g = o.tokens ? this.parseInline(o.tokens) : o.text;
          for (; a + 1 < r.length && r[a + 1].type === "text"; )
            o = r[++a], g += `
` + (o.tokens ? this.parseInline(o.tokens) : o.text);
          e += u ? this.renderer.paragraph(g) : g;
          continue;
        }
        default: {
          const o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return e;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(r, u) {
    u = u || this.renderer;
    let e = "";
    for (let a = 0; a < r.length; a++) {
      const s = r[a];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const o = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          e += o || "";
          continue;
        }
      }
      switch (s.type) {
        case "escape": {
          const o = s;
          e += u.text(o.text);
          break;
        }
        case "html": {
          const o = s;
          e += u.html(o.text);
          break;
        }
        case "link": {
          const o = s;
          e += u.link(o.href, o.title, this.parseInline(o.tokens, u));
          break;
        }
        case "image": {
          const o = s;
          e += u.image(o.href, o.title, o.text);
          break;
        }
        case "strong": {
          const o = s;
          e += u.strong(this.parseInline(o.tokens, u));
          break;
        }
        case "em": {
          const o = s;
          e += u.em(this.parseInline(o.tokens, u));
          break;
        }
        case "codespan": {
          const o = s;
          e += u.codespan(o.text);
          break;
        }
        case "br": {
          e += u.br();
          break;
        }
        case "del": {
          const o = s;
          e += u.del(this.parseInline(o.tokens, u));
          break;
        }
        case "text": {
          const o = s;
          e += u.text(o.text);
          break;
        }
        default: {
          const o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return e;
  }
}
class Le {
  constructor(r) {
    G(this, "options");
    this.options = r || _e;
  }
  /**
   * Process markdown before marked
   */
  preprocess(r) {
    return r;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(r) {
    return r;
  }
}
G(Le, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess"
]));
var Me, at, Ye, Ft;
class Gt {
  constructor(...r) {
    it(this, Me);
    it(this, Ye);
    G(this, "defaults", ot());
    G(this, "options", this.setOptions);
    G(this, "parse", je(this, Me, at).call(this, he.lex, ge.parse));
    G(this, "parseInline", je(this, Me, at).call(this, he.lexInline, ge.parseInline));
    G(this, "Parser", ge);
    G(this, "Renderer", Qe);
    G(this, "TextRenderer", lt);
    G(this, "Lexer", he);
    G(this, "Tokenizer", Ze);
    G(this, "Hooks", Le);
    this.use(...r);
  }
  /**
   * Run callback for every token
   */
  walkTokens(r, u) {
    var a, s;
    let e = [];
    for (const o of r)
      switch (e = e.concat(u.call(this, o)), o.type) {
        case "table": {
          const g = o;
          for (const d of g.header)
            e = e.concat(this.walkTokens(d.tokens, u));
          for (const d of g.rows)
            for (const v of d)
              e = e.concat(this.walkTokens(v.tokens, u));
          break;
        }
        case "list": {
          const g = o;
          e = e.concat(this.walkTokens(g.items, u));
          break;
        }
        default: {
          const g = o;
          (s = (a = this.defaults.extensions) == null ? void 0 : a.childTokens) != null && s[g.type] ? this.defaults.extensions.childTokens[g.type].forEach((d) => {
            e = e.concat(this.walkTokens(g[d], u));
          }) : g.tokens && (e = e.concat(this.walkTokens(g.tokens, u)));
        }
      }
    return e;
  }
  use(...r) {
    const u = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((e) => {
      const a = { ...e };
      if (a.async = this.defaults.async || a.async || !1, e.extensions && (e.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const o = u.renderers[s.name];
          o ? u.renderers[s.name] = function(...g) {
            let d = s.renderer.apply(this, g);
            return d === !1 && (d = o.apply(this, g)), d;
          } : u.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = u[s.level];
          o ? o.unshift(s.tokenizer) : u[s.level] = [s.tokenizer], s.start && (s.level === "block" ? u.startBlock ? u.startBlock.push(s.start) : u.startBlock = [s.start] : s.level === "inline" && (u.startInline ? u.startInline.push(s.start) : u.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (u.childTokens[s.name] = s.childTokens);
      }), a.extensions = u), e.renderer) {
        const s = this.defaults.renderer || new Qe(this.defaults);
        for (const o in e.renderer) {
          const g = e.renderer[o], d = o, v = s[d];
          s[d] = (...b) => {
            let _ = g.apply(s, b);
            return _ === !1 && (_ = v.apply(s, b)), _ || "";
          };
        }
        a.renderer = s;
      }
      if (e.tokenizer) {
        const s = this.defaults.tokenizer || new Ze(this.defaults);
        for (const o in e.tokenizer) {
          const g = e.tokenizer[o], d = o, v = s[d];
          s[d] = (...b) => {
            let _ = g.apply(s, b);
            return _ === !1 && (_ = v.apply(s, b)), _;
          };
        }
        a.tokenizer = s;
      }
      if (e.hooks) {
        const s = this.defaults.hooks || new Le();
        for (const o in e.hooks) {
          const g = e.hooks[o], d = o, v = s[d];
          Le.passThroughHooks.has(o) ? s[d] = (b) => {
            if (this.defaults.async)
              return Promise.resolve(g.call(s, b)).then((k) => v.call(s, k));
            const _ = g.call(s, b);
            return v.call(s, _);
          } : s[d] = (...b) => {
            let _ = g.apply(s, b);
            return _ === !1 && (_ = v.apply(s, b)), _;
          };
        }
        a.hooks = s;
      }
      if (e.walkTokens) {
        const s = this.defaults.walkTokens, o = e.walkTokens;
        a.walkTokens = function(g) {
          let d = [];
          return d.push(o.call(this, g)), s && (d = d.concat(s.call(this, g))), d;
        };
      }
      this.defaults = { ...this.defaults, ...a };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, u) {
    return he.lex(r, u ?? this.defaults);
  }
  parser(r, u) {
    return ge.parse(r, u ?? this.defaults);
  }
}
Me = new WeakSet(), at = function(r, u) {
  return (e, a) => {
    const s = { ...a }, o = { ...this.defaults, ...s };
    this.defaults.async === !0 && s.async === !1 && (o.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), o.async = !0);
    const g = je(this, Ye, Ft).call(this, !!o.silent, !!o.async);
    if (typeof e > "u" || e === null)
      return g(new Error("marked(): input parameter is undefined or null"));
    if (typeof e != "string")
      return g(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
    if (o.hooks && (o.hooks.options = o), o.async)
      return Promise.resolve(o.hooks ? o.hooks.preprocess(e) : e).then((d) => r(d, o)).then((d) => o.walkTokens ? Promise.all(this.walkTokens(d, o.walkTokens)).then(() => d) : d).then((d) => u(d, o)).then((d) => o.hooks ? o.hooks.postprocess(d) : d).catch(g);
    try {
      o.hooks && (e = o.hooks.preprocess(e));
      const d = r(e, o);
      o.walkTokens && this.walkTokens(d, o.walkTokens);
      let v = u(d, o);
      return o.hooks && (v = o.hooks.postprocess(v)), v;
    } catch (d) {
      return g(d);
    }
  };
}, Ye = new WeakSet(), Ft = function(r, u) {
  return (e) => {
    if (e.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
      const a = "<p>An error occurred:</p><pre>" + se(e.message + "", !0) + "</pre>";
      return u ? Promise.resolve(a) : a;
    }
    if (u)
      return Promise.reject(e);
    throw e;
  };
};
const Te = new Gt();
function $(m, r) {
  return Te.parse(m, r);
}
$.options = $.setOptions = function(m) {
  return Te.setOptions(m), $.defaults = Te.defaults, Bt($.defaults), $;
};
$.getDefaults = ot;
$.defaults = _e;
$.use = function(...m) {
  return Te.use(...m), $.defaults = Te.defaults, Bt($.defaults), $;
};
$.walkTokens = function(m, r) {
  return Te.walkTokens(m, r);
};
$.parseInline = Te.parseInline;
$.Parser = ge;
$.parser = ge.parse;
$.Renderer = Qe;
$.TextRenderer = lt;
$.Lexer = he;
$.lexer = he.lex;
$.Tokenizer = Ze;
$.Hooks = Le;
$.parse = $;
$.options;
$.setOptions;
$.use;
$.walkTokens;
$.parseInline;
ge.parse;
he.lex;
var Xt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zt(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default") ? m.default : m;
}
var Rt = { exports: {} }, Oe = {}, me = {}, ke = {}, Ct;
function Je() {
  if (Ct)
    return ke;
  Ct = 1;
  function m(s, o, g) {
    if (g === void 0 && (g = Array.prototype), s && typeof g.find == "function")
      return g.find.call(s, o);
    for (var d = 0; d < s.length; d++)
      if (Object.prototype.hasOwnProperty.call(s, d)) {
        var v = s[d];
        if (o.call(void 0, v, d, s))
          return v;
      }
  }
  function r(s, o) {
    return o === void 0 && (o = Object), o && typeof o.freeze == "function" ? o.freeze(s) : s;
  }
  function u(s, o) {
    if (s === null || typeof s != "object")
      throw new TypeError("target is not an object");
    for (var g in o)
      Object.prototype.hasOwnProperty.call(o, g) && (s[g] = o[g]);
    return s;
  }
  var e = r({
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
    isHTML: function(s) {
      return s === e.HTML;
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
  }), a = r({
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
    isHTML: function(s) {
      return s === a.HTML;
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
  return ke.assign = u, ke.find = m, ke.freeze = r, ke.MIME_TYPE = e, ke.NAMESPACE = a, ke;
}
var xt;
function qt() {
  if (xt)
    return me;
  xt = 1;
  var m = Je(), r = m.find, u = m.NAMESPACE;
  function e(t) {
    return t !== "";
  }
  function a(t) {
    return t ? t.split(/[\t\n\f\r ]+/).filter(e) : [];
  }
  function s(t, n) {
    return t.hasOwnProperty(n) || (t[n] = !0), t;
  }
  function o(t) {
    if (!t)
      return [];
    var n = a(t);
    return Object.keys(n.reduce(s, {}));
  }
  function g(t) {
    return function(n) {
      return t && t.indexOf(n) !== -1;
    };
  }
  function d(t, n) {
    for (var i in t)
      Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
  }
  function v(t, n) {
    var i = t.prototype;
    if (!(i instanceof n)) {
      let A = function() {
      };
      var f = A;
      A.prototype = n.prototype, A = new A(), d(i, A), t.prototype = i = A;
    }
    i.constructor != t && (typeof t != "function" && console.error("unknown Class:" + t), i.constructor = t);
  }
  var b = {}, _ = b.ELEMENT_NODE = 1, k = b.ATTRIBUTE_NODE = 2, q = b.TEXT_NODE = 3, W = b.CDATA_SECTION_NODE = 4, X = b.ENTITY_REFERENCE_NODE = 5, E = b.ENTITY_NODE = 6, O = b.PROCESSING_INSTRUCTION_NODE = 7, I = b.COMMENT_NODE = 8, L = b.DOCUMENT_NODE = 9, Z = b.DOCUMENT_TYPE_NODE = 10, V = b.DOCUMENT_FRAGMENT_NODE = 11, K = b.NOTATION_NODE = 12, M = {}, z = {};
  M.INDEX_SIZE_ERR = (z[1] = "Index size error", 1), M.DOMSTRING_SIZE_ERR = (z[2] = "DOMString size error", 2);
  var h = M.HIERARCHY_REQUEST_ERR = (z[3] = "Hierarchy request error", 3);
  M.WRONG_DOCUMENT_ERR = (z[4] = "Wrong document", 4), M.INVALID_CHARACTER_ERR = (z[5] = "Invalid character", 5), M.NO_DATA_ALLOWED_ERR = (z[6] = "No data allowed", 6), M.NO_MODIFICATION_ALLOWED_ERR = (z[7] = "No modification allowed", 7);
  var C = M.NOT_FOUND_ERR = (z[8] = "Not found", 8);
  M.NOT_SUPPORTED_ERR = (z[9] = "Not supported", 9);
  var N = M.INUSE_ATTRIBUTE_ERR = (z[10] = "Attribute in use", 10);
  M.INVALID_STATE_ERR = (z[11] = "Invalid state", 11), M.SYNTAX_ERR = (z[12] = "Syntax error", 12), M.INVALID_MODIFICATION_ERR = (z[13] = "Invalid modification", 13), M.NAMESPACE_ERR = (z[14] = "Invalid namespace", 14), M.INVALID_ACCESS_ERR = (z[15] = "Invalid access", 15);
  function T(t, n) {
    if (n instanceof Error)
      var i = n;
    else
      i = this, Error.call(this, z[t]), this.message = z[t], Error.captureStackTrace && Error.captureStackTrace(this, T);
    return i.code = t, n && (this.message = this.message + ": " + n), i;
  }
  T.prototype = Error.prototype, d(M, T);
  function F() {
  }
  F.prototype = {
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
    item: function(t) {
      return t >= 0 && t < this.length ? this[t] : null;
    },
    toString: function(t, n) {
      for (var i = [], f = 0; f < this.length; f++)
        Se(this[f], i, t, n);
      return i.join("");
    },
    /**
     * @private
     * @param {function (Node):boolean} predicate
     * @returns {Node[]}
     */
    filter: function(t) {
      return Array.prototype.filter.call(this, t);
    },
    /**
     * @private
     * @param {Node} item
     * @returns {number}
     */
    indexOf: function(t) {
      return Array.prototype.indexOf.call(this, t);
    }
  };
  function l(t, n) {
    this._node = t, this._refresh = n, c(this);
  }
  function c(t) {
    var n = t._node._inc || t._node.ownerDocument._inc;
    if (t._inc !== n) {
      var i = t._refresh(t._node);
      if (Dt(t, "length", i.length), !t.$$length || i.length < t.$$length)
        for (var f = i.length; f in t; f++)
          Object.prototype.hasOwnProperty.call(t, f) && delete t[f];
      d(i, t), t._inc = n;
    }
  }
  l.prototype.item = function(t) {
    return c(this), this[t] || null;
  }, v(l, F);
  function p() {
  }
  function D(t, n) {
    for (var i = t.length; i--; )
      if (t[i] === n)
        return i;
  }
  function w(t, n, i, f) {
    if (f ? n[D(n, f)] = i : n[n.length++] = i, t) {
      i.ownerElement = t;
      var A = t.ownerDocument;
      A && (f && Ae(A, t, f), J(A, t, i));
    }
  }
  function x(t, n, i) {
    var f = D(n, i);
    if (f >= 0) {
      for (var A = n.length - 1; f < A; )
        n[f] = n[++f];
      if (n.length = A, t) {
        var R = t.ownerDocument;
        R && (Ae(R, t, i), i.ownerElement = null);
      }
    } else
      throw new T(C, new Error(t.tagName + "@" + i));
  }
  p.prototype = {
    length: 0,
    item: F.prototype.item,
    getNamedItem: function(t) {
      for (var n = this.length; n--; ) {
        var i = this[n];
        if (i.nodeName == t)
          return i;
      }
    },
    setNamedItem: function(t) {
      var n = t.ownerElement;
      if (n && n != this._ownerElement)
        throw new T(N);
      var i = this.getNamedItem(t.nodeName);
      return w(this._ownerElement, this, t, i), i;
    },
    /* returns Node */
    setNamedItemNS: function(t) {
      var n = t.ownerElement, i;
      if (n && n != this._ownerElement)
        throw new T(N);
      return i = this.getNamedItemNS(t.namespaceURI, t.localName), w(this._ownerElement, this, t, i), i;
    },
    /* returns Node */
    removeNamedItem: function(t) {
      var n = this.getNamedItem(t);
      return x(this._ownerElement, this, n), n;
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function(t, n) {
      var i = this.getNamedItemNS(t, n);
      return x(this._ownerElement, this, i), i;
    },
    getNamedItemNS: function(t, n) {
      for (var i = this.length; i--; ) {
        var f = this[i];
        if (f.localName == n && f.namespaceURI == t)
          return f;
      }
      return null;
    }
  };
  function U() {
  }
  U.prototype = {
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
    hasFeature: function(t, n) {
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
    createDocument: function(t, n, i) {
      var f = new Q();
      if (f.implementation = this, f.childNodes = new F(), f.doctype = i || null, i && f.appendChild(i), n) {
        var A = f.createElementNS(t, n);
        f.appendChild(A);
      }
      return f;
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
    createDocumentType: function(t, n, i) {
      var f = new Pe();
      return f.name = t, f.nodeName = t, f.publicId = n || "", f.systemId = i || "", f;
    }
  };
  function B() {
  }
  B.prototype = {
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
    insertBefore: function(t, n) {
      return be(this, t, n);
    },
    replaceChild: function(t, n) {
      be(this, t, n, ze), n && this.removeChild(n);
    },
    removeChild: function(t) {
      return ne(this, t);
    },
    appendChild: function(t) {
      return this.insertBefore(t, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(t) {
      return nt(this.ownerDocument || this, this, t);
    },
    // Modified in DOM Level 2:
    normalize: function() {
      for (var t = this.firstChild; t; ) {
        var n = t.nextSibling;
        n && n.nodeType == q && t.nodeType == q ? (this.removeChild(n), t.appendData(n.data)) : (t.normalize(), t = n);
      }
    },
    // Introduced in DOM Level 2:
    isSupported: function(t, n) {
      return this.ownerDocument.implementation.hasFeature(t, n);
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
    lookupPrefix: function(t) {
      for (var n = this; n; ) {
        var i = n._nsMap;
        if (i) {
          for (var f in i)
            if (Object.prototype.hasOwnProperty.call(i, f) && i[f] === t)
              return f;
        }
        n = n.nodeType == k ? n.ownerDocument : n.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function(t) {
      for (var n = this; n; ) {
        var i = n._nsMap;
        if (i && Object.prototype.hasOwnProperty.call(i, t))
          return i[t];
        n = n.nodeType == k ? n.ownerDocument : n.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function(t) {
      var n = this.lookupPrefix(t);
      return n == null;
    }
  };
  function Y(t) {
    return t == "<" && "&lt;" || t == ">" && "&gt;" || t == "&" && "&amp;" || t == '"' && "&quot;" || "&#" + t.charCodeAt() + ";";
  }
  d(b, B), d(b, B.prototype);
  function ae(t, n) {
    if (n(t))
      return !0;
    if (t = t.firstChild)
      do
        if (ae(t, n))
          return !0;
      while (t = t.nextSibling);
  }
  function Q() {
    this.ownerDocument = this;
  }
  function J(t, n, i) {
    t && t._inc++;
    var f = i.namespaceURI;
    f === u.XMLNS && (n._nsMap[i.prefix ? i.localName : ""] = i.value);
  }
  function Ae(t, n, i, f) {
    t && t._inc++;
    var A = i.namespaceURI;
    A === u.XMLNS && delete n._nsMap[i.prefix ? i.localName : ""];
  }
  function Ee(t, n, i) {
    if (t && t._inc) {
      t._inc++;
      var f = n.childNodes;
      if (i)
        f[f.length++] = i;
      else {
        for (var A = n.firstChild, R = 0; A; )
          f[R++] = A, A = A.nextSibling;
        f.length = R, delete f[f.length];
      }
    }
  }
  function ne(t, n) {
    var i = n.previousSibling, f = n.nextSibling;
    return i ? i.nextSibling = f : t.firstChild = f, f ? f.previousSibling = i : t.lastChild = i, n.parentNode = null, n.previousSibling = null, n.nextSibling = null, Ee(t.ownerDocument, t), n;
  }
  function ce(t) {
    return t && (t.nodeType === B.DOCUMENT_NODE || t.nodeType === B.DOCUMENT_FRAGMENT_NODE || t.nodeType === B.ELEMENT_NODE);
  }
  function Re(t) {
    return t && (le(t) || Be(t) || oe(t) || t.nodeType === B.DOCUMENT_FRAGMENT_NODE || t.nodeType === B.COMMENT_NODE || t.nodeType === B.PROCESSING_INSTRUCTION_NODE);
  }
  function oe(t) {
    return t && t.nodeType === B.DOCUMENT_TYPE_NODE;
  }
  function le(t) {
    return t && t.nodeType === B.ELEMENT_NODE;
  }
  function Be(t) {
    return t && t.nodeType === B.TEXT_NODE;
  }
  function re(t, n) {
    var i = t.childNodes || [];
    if (r(i, le) || oe(n))
      return !1;
    var f = r(i, oe);
    return !(n && f && i.indexOf(f) > i.indexOf(n));
  }
  function Ne(t, n) {
    var i = t.childNodes || [];
    function f(R) {
      return le(R) && R !== n;
    }
    if (r(i, f))
      return !1;
    var A = r(i, oe);
    return !(n && A && i.indexOf(A) > i.indexOf(n));
  }
  function ee(t, n, i) {
    if (!ce(t))
      throw new T(h, "Unexpected parent node type " + t.nodeType);
    if (i && i.parentNode !== t)
      throw new T(C, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !Re(n) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      oe(n) && t.nodeType !== B.DOCUMENT_NODE
    )
      throw new T(
        h,
        "Unexpected node type " + n.nodeType + " for parent node type " + t.nodeType
      );
  }
  function Ue(t, n, i) {
    var f = t.childNodes || [], A = n.childNodes || [];
    if (n.nodeType === B.DOCUMENT_FRAGMENT_NODE) {
      var R = A.filter(le);
      if (R.length > 1 || r(A, Be))
        throw new T(h, "More than one element or text in fragment");
      if (R.length === 1 && !re(t, i))
        throw new T(h, "Element in fragment can not be inserted before doctype");
    }
    if (le(n) && !re(t, i))
      throw new T(h, "Only one element can be added and only after doctype");
    if (oe(n)) {
      if (r(f, oe))
        throw new T(h, "Only one doctype is allowed");
      var H = r(f, le);
      if (i && f.indexOf(H) < f.indexOf(i))
        throw new T(h, "Doctype can only be inserted before an element");
      if (!i && H)
        throw new T(h, "Doctype can not be appended since element is present");
    }
  }
  function ze(t, n, i) {
    var f = t.childNodes || [], A = n.childNodes || [];
    if (n.nodeType === B.DOCUMENT_FRAGMENT_NODE) {
      var R = A.filter(le);
      if (R.length > 1 || r(A, Be))
        throw new T(h, "More than one element or text in fragment");
      if (R.length === 1 && !Ne(t, i))
        throw new T(h, "Element in fragment can not be inserted before doctype");
    }
    if (le(n) && !Ne(t, i))
      throw new T(h, "Only one element can be added and only after doctype");
    if (oe(n)) {
      let de = function(pe) {
        return oe(pe) && pe !== i;
      };
      var ie = de;
      if (r(f, de))
        throw new T(h, "Only one doctype is allowed");
      var H = r(f, le);
      if (i && f.indexOf(H) < f.indexOf(i))
        throw new T(h, "Doctype can only be inserted before an element");
    }
  }
  function be(t, n, i, f) {
    ee(t, n, i), t.nodeType === B.DOCUMENT_NODE && (f || Ue)(t, n, i);
    var A = n.parentNode;
    if (A && A.removeChild(n), n.nodeType === V) {
      var R = n.firstChild;
      if (R == null)
        return n;
      var H = n.lastChild;
    } else
      R = H = n;
    var ie = i ? i.previousSibling : t.lastChild;
    R.previousSibling = ie, H.nextSibling = i, ie ? ie.nextSibling = R : t.firstChild = R, i == null ? t.lastChild = H : i.previousSibling = H;
    do
      R.parentNode = t;
    while (R !== H && (R = R.nextSibling));
    return Ee(t.ownerDocument || t, t), n.nodeType == V && (n.firstChild = n.lastChild = null), n;
  }
  function $e(t, n) {
    return n.parentNode && n.parentNode.removeChild(n), n.parentNode = t, n.previousSibling = t.lastChild, n.nextSibling = null, n.previousSibling ? n.previousSibling.nextSibling = n : t.firstChild = n, t.lastChild = n, Ee(t.ownerDocument, t, n), n;
  }
  Q.prototype = {
    //implementation : null,
    nodeName: "#document",
    nodeType: L,
    /**
     * The DocumentType node of the document.
     *
     * @readonly
     * @type DocumentType
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(t, n) {
      if (t.nodeType == V) {
        for (var i = t.firstChild; i; ) {
          var f = i.nextSibling;
          this.insertBefore(i, n), i = f;
        }
        return t;
      }
      return be(this, t, n), t.ownerDocument = this, this.documentElement === null && t.nodeType === _ && (this.documentElement = t), t;
    },
    removeChild: function(t) {
      return this.documentElement == t && (this.documentElement = null), ne(this, t);
    },
    replaceChild: function(t, n) {
      be(this, t, n, ze), t.ownerDocument = this, n && this.removeChild(n), le(t) && (this.documentElement = t);
    },
    // Introduced in DOM Level 2:
    importNode: function(t, n) {
      return dt(this, t, n);
    },
    // Introduced in DOM Level 2:
    getElementById: function(t) {
      var n = null;
      return ae(this.documentElement, function(i) {
        if (i.nodeType == _ && i.getAttribute("id") == t)
          return n = i, !0;
      }), n;
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
    getElementsByClassName: function(t) {
      var n = o(t);
      return new l(this, function(i) {
        var f = [];
        return n.length > 0 && ae(i.documentElement, function(A) {
          if (A !== i && A.nodeType === _) {
            var R = A.getAttribute("class");
            if (R) {
              var H = t === R;
              if (!H) {
                var ie = o(R);
                H = n.every(g(ie));
              }
              H && f.push(A);
            }
          }
        }), f;
      });
    },
    //document factory method:
    createElement: function(t) {
      var n = new j();
      n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.localName = t, n.childNodes = new F();
      var i = n.attributes = new p();
      return i._ownerElement = n, n;
    },
    createDocumentFragment: function() {
      var t = new Ve();
      return t.ownerDocument = this, t.childNodes = new F(), t;
    },
    createTextNode: function(t) {
      var n = new We();
      return n.ownerDocument = this, n.appendData(t), n;
    },
    createComment: function(t) {
      var n = new Ke();
      return n.ownerDocument = this, n.appendData(t), n;
    },
    createCDATASection: function(t) {
      var n = new et();
      return n.ownerDocument = this, n.appendData(t), n;
    },
    createProcessingInstruction: function(t, n) {
      var i = new rt();
      return i.ownerDocument = this, i.tagName = i.nodeName = i.target = t, i.nodeValue = i.data = n, i;
    },
    createAttribute: function(t) {
      var n = new te();
      return n.ownerDocument = this, n.name = t, n.nodeName = t, n.localName = t, n.specified = !0, n;
    },
    createEntityReference: function(t) {
      var n = new tt();
      return n.ownerDocument = this, n.nodeName = t, n;
    },
    // Introduced in DOM Level 2:
    createElementNS: function(t, n) {
      var i = new j(), f = n.split(":"), A = i.attributes = new p();
      return i.childNodes = new F(), i.ownerDocument = this, i.nodeName = n, i.tagName = n, i.namespaceURI = t, f.length == 2 ? (i.prefix = f[0], i.localName = f[1]) : i.localName = n, A._ownerElement = i, i;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function(t, n) {
      var i = new te(), f = n.split(":");
      return i.ownerDocument = this, i.nodeName = n, i.name = n, i.namespaceURI = t, i.specified = !0, f.length == 2 ? (i.prefix = f[0], i.localName = f[1]) : i.localName = n, i;
    }
  }, v(Q, B);
  function j() {
    this._nsMap = {};
  }
  j.prototype = {
    nodeType: _,
    hasAttribute: function(t) {
      return this.getAttributeNode(t) != null;
    },
    getAttribute: function(t) {
      var n = this.getAttributeNode(t);
      return n && n.value || "";
    },
    getAttributeNode: function(t) {
      return this.attributes.getNamedItem(t);
    },
    setAttribute: function(t, n) {
      var i = this.ownerDocument.createAttribute(t);
      i.value = i.nodeValue = "" + n, this.setAttributeNode(i);
    },
    removeAttribute: function(t) {
      var n = this.getAttributeNode(t);
      n && this.removeAttributeNode(n);
    },
    //four real opeartion method
    appendChild: function(t) {
      return t.nodeType === V ? this.insertBefore(t, null) : $e(this, t);
    },
    setAttributeNode: function(t) {
      return this.attributes.setNamedItem(t);
    },
    setAttributeNodeNS: function(t) {
      return this.attributes.setNamedItemNS(t);
    },
    removeAttributeNode: function(t) {
      return this.attributes.removeNamedItem(t.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(t, n) {
      var i = this.getAttributeNodeNS(t, n);
      i && this.removeAttributeNode(i);
    },
    hasAttributeNS: function(t, n) {
      return this.getAttributeNodeNS(t, n) != null;
    },
    getAttributeNS: function(t, n) {
      var i = this.getAttributeNodeNS(t, n);
      return i && i.value || "";
    },
    setAttributeNS: function(t, n, i) {
      var f = this.ownerDocument.createAttributeNS(t, n);
      f.value = f.nodeValue = "" + i, this.setAttributeNode(f);
    },
    getAttributeNodeNS: function(t, n) {
      return this.attributes.getNamedItemNS(t, n);
    },
    getElementsByTagName: function(t) {
      return new l(this, function(n) {
        var i = [];
        return ae(n, function(f) {
          f !== n && f.nodeType == _ && (t === "*" || f.tagName == t) && i.push(f);
        }), i;
      });
    },
    getElementsByTagNameNS: function(t, n) {
      return new l(this, function(i) {
        var f = [];
        return ae(i, function(A) {
          A !== i && A.nodeType === _ && (t === "*" || A.namespaceURI === t) && (n === "*" || A.localName == n) && f.push(A);
        }), f;
      });
    }
  }, Q.prototype.getElementsByTagName = j.prototype.getElementsByTagName, Q.prototype.getElementsByTagNameNS = j.prototype.getElementsByTagNameNS, v(j, B);
  function te() {
  }
  te.prototype.nodeType = k, v(te, B);
  function we() {
  }
  we.prototype = {
    data: "",
    substringData: function(t, n) {
      return this.data.substring(t, t + n);
    },
    appendData: function(t) {
      t = this.data + t, this.nodeValue = this.data = t, this.length = t.length;
    },
    insertData: function(t, n) {
      this.replaceData(t, 0, n);
    },
    appendChild: function(t) {
      throw new Error(z[h]);
    },
    deleteData: function(t, n) {
      this.replaceData(t, n, "");
    },
    replaceData: function(t, n, i) {
      var f = this.data.substring(0, t), A = this.data.substring(t + n);
      i = f + i + A, this.nodeValue = this.data = i, this.length = i.length;
    }
  }, v(we, B);
  function We() {
  }
  We.prototype = {
    nodeName: "#text",
    nodeType: q,
    splitText: function(t) {
      var n = this.data, i = n.substring(t);
      n = n.substring(0, t), this.data = this.nodeValue = n, this.length = n.length;
      var f = this.ownerDocument.createTextNode(i);
      return this.parentNode && this.parentNode.insertBefore(f, this.nextSibling), f;
    }
  }, v(We, we);
  function Ke() {
  }
  Ke.prototype = {
    nodeName: "#comment",
    nodeType: I
  }, v(Ke, we);
  function et() {
  }
  et.prototype = {
    nodeName: "#cdata-section",
    nodeType: W
  }, v(et, we);
  function Pe() {
  }
  Pe.prototype.nodeType = Z, v(Pe, B);
  function ct() {
  }
  ct.prototype.nodeType = K, v(ct, B);
  function pt() {
  }
  pt.prototype.nodeType = E, v(pt, B);
  function tt() {
  }
  tt.prototype.nodeType = X, v(tt, B);
  function Ve() {
  }
  Ve.prototype.nodeName = "#document-fragment", Ve.prototype.nodeType = V, v(Ve, B);
  function rt() {
  }
  rt.prototype.nodeType = O, v(rt, B);
  function ft() {
  }
  ft.prototype.serializeToString = function(t, n, i) {
    return ht.call(t, n, i);
  }, B.prototype.toString = ht;
  function ht(t, n) {
    var i = [], f = this.nodeType == 9 && this.documentElement || this, A = f.prefix, R = f.namespaceURI;
    if (R && A == null) {
      var A = f.lookupPrefix(R);
      if (A == null)
        var H = [
          { namespace: R, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Se(this, i, t, n, H), i.join("");
  }
  function gt(t, n, i) {
    var f = t.prefix || "", A = t.namespaceURI;
    if (!A || f === "xml" && A === u.XML || A === u.XMLNS)
      return !1;
    for (var R = i.length; R--; ) {
      var H = i[R];
      if (H.prefix === f)
        return H.namespace !== A;
    }
    return !0;
  }
  function ut(t, n, i) {
    t.push(" ", n, '="', i.replace(/[<>&"\t\n\r]/g, Y), '"');
  }
  function Se(t, n, i, f, A) {
    if (A || (A = []), f)
      if (t = f(t), t) {
        if (typeof t == "string") {
          n.push(t);
          return;
        }
      } else
        return;
    switch (t.nodeType) {
      case _:
        var R = t.attributes, H = R.length, ue = t.firstChild, ie = t.tagName;
        i = u.isHTML(t.namespaceURI) || i;
        var de = ie;
        if (!i && !t.prefix && t.namespaceURI) {
          for (var pe, De = 0; De < R.length; De++)
            if (R.item(De).name === "xmlns") {
              pe = R.item(De).value;
              break;
            }
          if (!pe)
            for (var ve = A.length - 1; ve >= 0; ve--) {
              var Ce = A[ve];
              if (Ce.prefix === "" && Ce.namespace === t.namespaceURI) {
                pe = Ce.namespace;
                break;
              }
            }
          if (pe !== t.namespaceURI)
            for (var ve = A.length - 1; ve >= 0; ve--) {
              var Ce = A[ve];
              if (Ce.namespace === t.namespaceURI) {
                Ce.prefix && (de = Ce.prefix + ":" + ie);
                break;
              }
            }
        }
        n.push("<", de);
        for (var xe = 0; xe < H; xe++) {
          var fe = R.item(xe);
          fe.prefix == "xmlns" ? A.push({ prefix: fe.localName, namespace: fe.value }) : fe.nodeName == "xmlns" && A.push({ prefix: "", namespace: fe.value });
        }
        for (var xe = 0; xe < H; xe++) {
          var fe = R.item(xe);
          if (gt(fe, i, A)) {
            var ye = fe.prefix || "", qe = fe.namespaceURI;
            ut(n, ye ? "xmlns:" + ye : "xmlns", qe), A.push({ prefix: ye, namespace: qe });
          }
          Se(fe, n, i, f, A);
        }
        if (ie === de && gt(t, i, A)) {
          var ye = t.prefix || "", qe = t.namespaceURI;
          ut(n, ye ? "xmlns:" + ye : "xmlns", qe), A.push({ prefix: ye, namespace: qe });
        }
        if (ue || i && !/^(?:meta|link|img|br|hr|input)$/i.test(ie)) {
          if (n.push(">"), i && /^script$/i.test(ie))
            for (; ue; )
              ue.data ? n.push(ue.data) : Se(ue, n, i, f, A.slice()), ue = ue.nextSibling;
          else
            for (; ue; )
              Se(ue, n, i, f, A.slice()), ue = ue.nextSibling;
          n.push("</", de, ">");
        } else
          n.push("/>");
        return;
      case L:
      case V:
        for (var ue = t.firstChild; ue; )
          Se(ue, n, i, f, A.slice()), ue = ue.nextSibling;
        return;
      case k:
        return ut(n, t.name, t.value);
      case q:
        return n.push(
          t.data.replace(/[<&>]/g, Y)
        );
      case W:
        return n.push("<![CDATA[", t.data, "]]>");
      case I:
        return n.push("<!--", t.data, "-->");
      case Z:
        var mt = t.publicId, Fe = t.systemId;
        if (n.push("<!DOCTYPE ", t.name), mt)
          n.push(" PUBLIC ", mt), Fe && Fe != "." && n.push(" ", Fe), n.push(">");
        else if (Fe && Fe != ".")
          n.push(" SYSTEM ", Fe, ">");
        else {
          var At = t.internalSubset;
          At && n.push(" [", At, "]"), n.push(">");
        }
        return;
      case O:
        return n.push("<?", t.target, " ", t.data, "?>");
      case X:
        return n.push("&", t.nodeName, ";");
      default:
        n.push("??", t.nodeName);
    }
  }
  function dt(t, n, i) {
    var f;
    switch (n.nodeType) {
      case _:
        f = n.cloneNode(!1), f.ownerDocument = t;
      case V:
        break;
      case k:
        i = !0;
        break;
    }
    if (f || (f = n.cloneNode(!1)), f.ownerDocument = t, f.parentNode = null, i)
      for (var A = n.firstChild; A; )
        f.appendChild(dt(t, A, i)), A = A.nextSibling;
    return f;
  }
  function nt(t, n, i) {
    var f = new n.constructor();
    for (var A in n)
      if (Object.prototype.hasOwnProperty.call(n, A)) {
        var R = n[A];
        typeof R != "object" && R != f[A] && (f[A] = R);
      }
    switch (n.childNodes && (f.childNodes = new F()), f.ownerDocument = t, f.nodeType) {
      case _:
        var H = n.attributes, ie = f.attributes = new p(), de = H.length;
        ie._ownerElement = f;
        for (var pe = 0; pe < de; pe++)
          f.setAttributeNode(nt(t, H.item(pe), !0));
        break;
      case k:
        i = !0;
    }
    if (i)
      for (var De = n.firstChild; De; )
        f.appendChild(nt(t, De, i)), De = De.nextSibling;
    return f;
  }
  function Dt(t, n, i) {
    t[n] = i;
  }
  try {
    if (Object.defineProperty) {
      let t = function(n) {
        switch (n.nodeType) {
          case _:
          case V:
            var i = [];
            for (n = n.firstChild; n; )
              n.nodeType !== 7 && n.nodeType !== 8 && i.push(t(n)), n = n.nextSibling;
            return i.join("");
          default:
            return n.nodeValue;
        }
      };
      var ur = t;
      Object.defineProperty(l.prototype, "length", {
        get: function() {
          return c(this), this.$$length;
        }
      }), Object.defineProperty(B.prototype, "textContent", {
        get: function() {
          return t(this);
        },
        set: function(n) {
          switch (this.nodeType) {
            case _:
            case V:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (n || String(n)) && this.appendChild(this.ownerDocument.createTextNode(n));
              break;
            default:
              this.data = n, this.value = n, this.nodeValue = n;
          }
        }
      }), Dt = function(n, i, f) {
        n["$$" + i] = f;
      };
    }
  } catch {
  }
  return me.DocumentType = Pe, me.DOMException = T, me.DOMImplementation = U, me.Element = j, me.Node = B, me.NodeList = F, me.XMLSerializer = ft, me;
}
var Ie = {}, st = {}, yt;
function Qt() {
  return yt || (yt = 1, function(m) {
    var r = Je().freeze;
    m.XML_ENTITIES = r({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), m.HTML_ENTITIES = r({
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
    }), m.entityMap = m.HTML_ENTITIES;
  }(st)), st;
}
var Ge = {}, kt;
function Yt() {
  if (kt)
    return Ge;
  kt = 1;
  var m = Je().NAMESPACE, r = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, u = new RegExp("[\\-\\.0-9" + r.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), e = new RegExp("^" + r.source + u.source + "*(?::" + r.source + u.source + "*)?$"), a = 0, s = 1, o = 2, g = 3, d = 4, v = 5, b = 6, _ = 7;
  function k(h, C) {
    this.message = h, this.locator = C, Error.captureStackTrace && Error.captureStackTrace(this, k);
  }
  k.prototype = new Error(), k.prototype.name = k.name;
  function q() {
  }
  q.prototype = {
    parse: function(h, C, N) {
      var T = this.domBuilder;
      T.startDocument(), Z(C, C = {}), W(
        h,
        C,
        N,
        T,
        this.errorHandler
      ), T.endDocument();
    }
  };
  function W(h, C, N, T, F) {
    function l(j) {
      if (j > 65535) {
        j -= 65536;
        var te = 55296 + (j >> 10), we = 56320 + (j & 1023);
        return String.fromCharCode(te, we);
      } else
        return String.fromCharCode(j);
    }
    function c(j) {
      var te = j.slice(1, -1);
      return Object.hasOwnProperty.call(N, te) ? N[te] : te.charAt(0) === "#" ? l(parseInt(te.substr(1).replace("x", "0x"))) : (F.error("entity not found:" + j), j);
    }
    function p(j) {
      if (j > Q) {
        var te = h.substring(Q, j).replace(/&#?\w+;/g, c);
        B && D(Q), T.characters(te, 0, j - Q), Q = j;
      }
    }
    function D(j, te) {
      for (; j >= x && (te = U.exec(h)); )
        w = te.index, x = w + te[0].length, B.lineNumber++;
      B.columnNumber = j - w + 1;
    }
    for (var w = 0, x = 0, U = /.*(?:\r\n?|\n)|.*$/g, B = T.locator, Y = [{ currentNSMap: C }], ae = {}, Q = 0; ; ) {
      try {
        var J = h.indexOf("<", Q);
        if (J < 0) {
          if (!h.substr(Q).match(/^\s*$/)) {
            var Ae = T.doc, Ee = Ae.createTextNode(h.substr(Q));
            Ae.appendChild(Ee), T.currentElement = Ee;
          }
          return;
        }
        switch (J > Q && p(J), h.charAt(J + 1)) {
          case "/":
            var ee = h.indexOf(">", J + 3), ne = h.substring(J + 2, ee).replace(/[ \t\n\r]+$/g, ""), ce = Y.pop();
            ee < 0 ? (ne = h.substring(J + 2).replace(/[\s<].*/, ""), F.error("end tag name: " + ne + " is not complete:" + ce.tagName), ee = J + 1 + ne.length) : ne.match(/\s</) && (ne = ne.replace(/[\s<].*/, ""), F.error("end tag name: " + ne + " maybe not complete"), ee = J + 1 + ne.length);
            var Re = ce.localNSMap, oe = ce.tagName == ne, le = oe || ce.tagName && ce.tagName.toLowerCase() == ne.toLowerCase();
            if (le) {
              if (T.endElement(ce.uri, ce.localName, ne), Re)
                for (var Be in Re)
                  Object.prototype.hasOwnProperty.call(Re, Be) && T.endPrefixMapping(Be);
              oe || F.fatalError("end tag name: " + ne + " is not match the current start tagName:" + ce.tagName);
            } else
              Y.push(ce);
            ee++;
            break;
          case "?":
            B && D(J), ee = K(h, J, T);
            break;
          case "!":
            B && D(J), ee = V(h, J, T, F);
            break;
          default:
            B && D(J);
            var re = new M(), Ne = Y[Y.length - 1].currentNSMap, ee = E(h, J, re, Ne, c, F), Ue = re.length;
            if (!re.closed && L(h, ee, re.tagName, ae) && (re.closed = !0, N.nbsp || F.warning("unclosed xml attribute")), B && Ue) {
              for (var ze = X(B, {}), be = 0; be < Ue; be++) {
                var $e = re[be];
                D($e.offset), $e.locator = X(B, {});
              }
              T.locator = ze, O(re, T, Ne) && Y.push(re), T.locator = B;
            } else
              O(re, T, Ne) && Y.push(re);
            m.isHTML(re.uri) && !re.closed ? ee = I(h, ee, re.tagName, c, T) : ee++;
        }
      } catch (j) {
        if (j instanceof k)
          throw j;
        F.error("element parse error: " + j), ee = -1;
      }
      ee > Q ? Q = ee : p(Math.max(J, Q) + 1);
    }
  }
  function X(h, C) {
    return C.lineNumber = h.lineNumber, C.columnNumber = h.columnNumber, C;
  }
  function E(h, C, N, T, F, l) {
    function c(B, Y, ae) {
      N.attributeNames.hasOwnProperty(B) && l.fatalError("Attribute " + B + " redefined"), N.addValue(
        B,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        Y.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, F),
        ae
      );
    }
    for (var p, D, w = ++C, x = a; ; ) {
      var U = h.charAt(w);
      switch (U) {
        case "=":
          if (x === s)
            p = h.slice(C, w), x = g;
          else if (x === o)
            x = g;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (x === g || x === s)
            if (x === s && (l.warning('attribute value must after "="'), p = h.slice(C, w)), C = w + 1, w = h.indexOf(U, C), w > 0)
              D = h.slice(C, w), c(p, D, C - 1), x = v;
            else
              throw new Error("attribute value no end '" + U + "' match");
          else if (x == d)
            D = h.slice(C, w), c(p, D, C), l.warning('attribute "' + p + '" missed start quot(' + U + ")!!"), C = w + 1, x = v;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (x) {
            case a:
              N.setTagName(h.slice(C, w));
            case v:
            case b:
            case _:
              x = _, N.closed = !0;
            case d:
            case s:
              break;
            case o:
              N.closed = !0;
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return l.error("unexpected end of input"), x == a && N.setTagName(h.slice(C, w)), w;
        case ">":
          switch (x) {
            case a:
              N.setTagName(h.slice(C, w));
            case v:
            case b:
            case _:
              break;
            case d:
            case s:
              D = h.slice(C, w), D.slice(-1) === "/" && (N.closed = !0, D = D.slice(0, -1));
            case o:
              x === o && (D = p), x == d ? (l.warning('attribute "' + D + '" missed quot(")!'), c(p, D, C)) : ((!m.isHTML(T[""]) || !D.match(/^(?:disabled|checked|selected)$/i)) && l.warning('attribute "' + D + '" missed value!! "' + D + '" instead!!'), c(D, D, C));
              break;
            case g:
              throw new Error("attribute value missed!!");
          }
          return w;
        case "":
          U = " ";
        default:
          if (U <= " ")
            switch (x) {
              case a:
                N.setTagName(h.slice(C, w)), x = b;
                break;
              case s:
                p = h.slice(C, w), x = o;
                break;
              case d:
                var D = h.slice(C, w);
                l.warning('attribute "' + D + '" missed quot(")!!'), c(p, D, C);
              case v:
                x = b;
                break;
            }
          else
            switch (x) {
              case o:
                N.tagName, (!m.isHTML(T[""]) || !p.match(/^(?:disabled|checked|selected)$/i)) && l.warning('attribute "' + p + '" missed value!! "' + p + '" instead2!!'), c(p, p, C), C = w, x = s;
                break;
              case v:
                l.warning('attribute space is required"' + p + '"!!');
              case b:
                x = s, C = w;
                break;
              case g:
                x = d, C = w;
                break;
              case _:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      w++;
    }
  }
  function O(h, C, N) {
    for (var T = h.tagName, F = null, U = h.length; U--; ) {
      var l = h[U], c = l.qName, p = l.value, B = c.indexOf(":");
      if (B > 0)
        var D = l.prefix = c.slice(0, B), w = c.slice(B + 1), x = D === "xmlns" && w;
      else
        w = c, D = null, x = c === "xmlns" && "";
      l.localName = w, x !== !1 && (F == null && (F = {}, Z(N, N = {})), N[x] = F[x] = p, l.uri = m.XMLNS, C.startPrefixMapping(x, p));
    }
    for (var U = h.length; U--; ) {
      l = h[U];
      var D = l.prefix;
      D && (D === "xml" && (l.uri = m.XML), D !== "xmlns" && (l.uri = N[D || ""]));
    }
    var B = T.indexOf(":");
    B > 0 ? (D = h.prefix = T.slice(0, B), w = h.localName = T.slice(B + 1)) : (D = null, w = h.localName = T);
    var Y = h.uri = N[D || ""];
    if (C.startElement(Y, w, T, h), h.closed) {
      if (C.endElement(Y, w, T), F)
        for (D in F)
          Object.prototype.hasOwnProperty.call(F, D) && C.endPrefixMapping(D);
    } else
      return h.currentNSMap = N, h.localNSMap = F, !0;
  }
  function I(h, C, N, T, F) {
    if (/^(?:script|textarea)$/i.test(N)) {
      var l = h.indexOf("</" + N + ">", C), c = h.substring(C + 1, l);
      if (/[&<]/.test(c))
        return /^script$/i.test(N) ? (F.characters(c, 0, c.length), l) : (c = c.replace(/&#?\w+;/g, T), F.characters(c, 0, c.length), l);
    }
    return C + 1;
  }
  function L(h, C, N, T) {
    var F = T[N];
    return F == null && (F = h.lastIndexOf("</" + N + ">"), F < C && (F = h.lastIndexOf("</" + N)), T[N] = F), F < C;
  }
  function Z(h, C) {
    for (var N in h)
      Object.prototype.hasOwnProperty.call(h, N) && (C[N] = h[N]);
  }
  function V(h, C, N, T) {
    var F = h.charAt(C + 2);
    switch (F) {
      case "-":
        if (h.charAt(C + 3) === "-") {
          var l = h.indexOf("-->", C + 4);
          return l > C ? (N.comment(h, C + 4, l - C - 4), l + 3) : (T.error("Unclosed comment"), -1);
        } else
          return -1;
      default:
        if (h.substr(C + 3, 6) == "CDATA[") {
          var l = h.indexOf("]]>", C + 9);
          return N.startCDATA(), N.characters(h, C + 9, l - C - 9), N.endCDATA(), l + 3;
        }
        var c = z(h, C), p = c.length;
        if (p > 1 && /!doctype/i.test(c[0][0])) {
          var D = c[1][0], w = !1, x = !1;
          p > 3 && (/^public$/i.test(c[2][0]) ? (w = c[3][0], x = p > 4 && c[4][0]) : /^system$/i.test(c[2][0]) && (x = c[3][0]));
          var U = c[p - 1];
          return N.startDTD(D, w, x), N.endDTD(), U.index + U[0].length;
        }
    }
    return -1;
  }
  function K(h, C, N) {
    var T = h.indexOf("?>", C);
    if (T) {
      var F = h.substring(C, T).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      return F ? (F[0].length, N.processingInstruction(F[1], F[2]), T + 2) : -1;
    }
    return -1;
  }
  function M() {
    this.attributeNames = {};
  }
  M.prototype = {
    setTagName: function(h) {
      if (!e.test(h))
        throw new Error("invalid tagName:" + h);
      this.tagName = h;
    },
    addValue: function(h, C, N) {
      if (!e.test(h))
        throw new Error("invalid attribute:" + h);
      this.attributeNames[h] = this.length, this[this.length++] = { qName: h, value: C, offset: N };
    },
    length: 0,
    getLocalName: function(h) {
      return this[h].localName;
    },
    getLocator: function(h) {
      return this[h].locator;
    },
    getQName: function(h) {
      return this[h].qName;
    },
    getURI: function(h) {
      return this[h].uri;
    },
    getValue: function(h) {
      return this[h].value;
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
  function z(h, C) {
    var N, T = [], F = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (F.lastIndex = C, F.exec(h); N = F.exec(h); )
      if (T.push(N), N[1])
        return T;
  }
  return Ge.XMLReader = q, Ge.ParseError = k, Ge;
}
var Tt;
function Jt() {
  if (Tt)
    return Ie;
  Tt = 1;
  var m = Je(), r = qt(), u = Qt(), e = Yt(), a = r.DOMImplementation, s = m.NAMESPACE, o = e.ParseError, g = e.XMLReader;
  function d(E) {
    return E.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
  }
  function v(E) {
    this.options = E || { locator: {} };
  }
  v.prototype.parseFromString = function(E, O) {
    var I = this.options, L = new g(), Z = I.domBuilder || new _(), V = I.errorHandler, K = I.locator, M = I.xmlns || {}, z = /\/x?html?$/.test(O), h = z ? u.HTML_ENTITIES : u.XML_ENTITIES;
    K && Z.setDocumentLocator(K), L.errorHandler = b(V, Z, K), L.domBuilder = I.domBuilder || Z, z && (M[""] = s.HTML), M.xml = M.xml || s.XML;
    var C = I.normalizeLineEndings || d;
    return E && typeof E == "string" ? L.parse(
      C(E),
      M,
      h
    ) : L.errorHandler.error("invalid doc source"), Z.doc;
  };
  function b(E, O, I) {
    if (!E) {
      if (O instanceof _)
        return O;
      E = O;
    }
    var L = {}, Z = E instanceof Function;
    I = I || {};
    function V(K) {
      var M = E[K];
      !M && Z && (M = E.length == 2 ? function(z) {
        E(K, z);
      } : E), L[K] = M && function(z) {
        M("[xmldom " + K + "]	" + z + q(I));
      } || function() {
      };
    }
    return V("warning"), V("error"), V("fatalError"), L;
  }
  function _() {
    this.cdata = !1;
  }
  function k(E, O) {
    O.lineNumber = E.lineNumber, O.columnNumber = E.columnNumber;
  }
  _.prototype = {
    startDocument: function() {
      this.doc = new a().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function(E, O, I, L) {
      var Z = this.doc, V = Z.createElementNS(E, I || O), K = L.length;
      X(this, V), this.currentElement = V, this.locator && k(this.locator, V);
      for (var M = 0; M < K; M++) {
        var E = L.getURI(M), z = L.getValue(M), I = L.getQName(M), h = Z.createAttributeNS(E, I);
        this.locator && k(L.getLocator(M), h), h.value = h.nodeValue = z, V.setAttributeNode(h);
      }
    },
    endElement: function(E, O, I) {
      var L = this.currentElement;
      L.tagName, this.currentElement = L.parentNode;
    },
    startPrefixMapping: function(E, O) {
    },
    endPrefixMapping: function(E) {
    },
    processingInstruction: function(E, O) {
      var I = this.doc.createProcessingInstruction(E, O);
      this.locator && k(this.locator, I), X(this, I);
    },
    ignorableWhitespace: function(E, O, I) {
    },
    characters: function(E, O, I) {
      if (E = W.apply(this, arguments), E) {
        if (this.cdata)
          var L = this.doc.createCDATASection(E);
        else
          var L = this.doc.createTextNode(E);
        this.currentElement ? this.currentElement.appendChild(L) : /^\s*$/.test(E) && this.doc.appendChild(L), this.locator && k(this.locator, L);
      }
    },
    skippedEntity: function(E) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(E) {
      (this.locator = E) && (E.lineNumber = 0);
    },
    //LexicalHandler
    comment: function(E, O, I) {
      E = W.apply(this, arguments);
      var L = this.doc.createComment(E);
      this.locator && k(this.locator, L), X(this, L);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(E, O, I) {
      var L = this.doc.implementation;
      if (L && L.createDocumentType) {
        var Z = L.createDocumentType(E, O, I);
        this.locator && k(this.locator, Z), X(this, Z), this.doc.doctype = Z;
      }
    },
    /**
     * @see org.xml.sax.ErrorHandler
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(E) {
      console.warn("[xmldom warning]	" + E, q(this.locator));
    },
    error: function(E) {
      console.error("[xmldom error]	" + E, q(this.locator));
    },
    fatalError: function(E) {
      throw new o(E, this.locator);
    }
  };
  function q(E) {
    if (E)
      return `
@` + (E.systemId || "") + "#[line:" + E.lineNumber + ",col:" + E.columnNumber + "]";
  }
  function W(E, O, I) {
    return typeof E == "string" ? E.substr(O, I) : E.length >= O + I || O ? new java.lang.String(E, O, I) + "" : E;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(E) {
    _.prototype[E] = function() {
      return null;
    };
  });
  function X(E, O) {
    E.currentElement ? E.currentElement.appendChild(O) : E.doc.appendChild(O);
  }
  return Ie.__DOMHandler = _, Ie.normalizeLineEndings = d, Ie.DOMParser = v, Ie;
}
var _t;
function Wt() {
  if (_t)
    return Oe;
  _t = 1;
  var m = qt();
  return Oe.DOMImplementation = m.DOMImplementation, Oe.XMLSerializer = m.XMLSerializer, Oe.DOMParser = Jt().DOMParser, Oe;
}
(function(m) {
  (function(r, u) {
    m.exports ? m.exports = u(Wt().DOMParser) : r.X2JS = u();
  })(Xt, function(r) {
    return function(e) {
      var a = "3.4.4";
      e = e || {};
      function s() {
        e.arrayAccessForm = e.arrayAccessForm || "none", e.emptyNodeForm = e.emptyNodeForm || "text", e.jsAttributeFilter = e.jsAttributeFilter, e.jsAttributeConverter = e.jsAttributeConverter, e.attributeConverters = e.attributeConverters || [], e.datetimeAccessFormPaths = e.datetimeAccessFormPaths || [], e.arrayAccessFormPaths = e.arrayAccessFormPaths || [], e.xmldomOptions = e.xmldomOptions || {}, e.enableToStringFunc === void 0 && (e.enableToStringFunc = !0), e.skipEmptyTextNodesForObj === void 0 && (e.skipEmptyTextNodesForObj = !0), e.stripWhitespaces === void 0 && (e.stripWhitespaces = !0), e.useDoubleQuotes === void 0 && (e.useDoubleQuotes = !0), e.ignoreRoot === void 0 && (e.ignoreRoot = !1), e.escapeMode === void 0 && (e.escapeMode = !0), e.attributePrefix === void 0 && (e.attributePrefix = "_"), e.selfClosingElements === void 0 && (e.selfClosingElements = !0), e.keepCData === void 0 && (e.keepCData = !1), e.keepText === void 0 && (e.keepText = !1), e.jsDateUTC === void 0 && (e.jsDateUTC = !1);
      }
      function o() {
        function l(c) {
          var p = String(c);
          return p.length === 1 && (p = "0" + p), p;
        }
        typeof String.prototype.trim != "function" && (String.prototype.trim = function() {
          return this.replace(/^\s+|^\n+|(\s|\n)+$/g, "");
        }), typeof Date.prototype.toISOString != "function" && (Date.prototype.toISOString = function() {
          var p = 1e3;
          return this.getUTCFullYear() + "-" + l(this.getUTCMonth() + 1) + "-" + l(this.getUTCDate()) + "T" + l(this.getUTCHours()) + ":" + l(this.getUTCMinutes()) + ":" + l(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / p).toFixed(3)).slice(2, 5) + "Z";
        });
      }
      s(), o();
      var g = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
      };
      function d(l) {
        var c = l.localName;
        return c == null && (c = l.baseName), (c == null || c === "") && (c = l.nodeName), c;
      }
      function v(l) {
        return l.prefix;
      }
      function b(l) {
        return typeof l == "string" ? l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : l;
      }
      function _(l) {
        return l.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
      }
      function k(l, c, p) {
        switch (e.arrayAccessForm) {
          case "property":
            l[c] instanceof Array ? l[c + "_asArray"] = l[c] : l[c + "_asArray"] = [l[c]];
            break;
        }
        if (!(l[c] instanceof Array) && e.arrayAccessFormPaths.length > 0) {
          for (var D = !1, w = 0; w < e.arrayAccessFormPaths.length; w++) {
            var x = e.arrayAccessFormPaths[w];
            if (typeof x == "string") {
              if (x === p) {
                D = !0;
                break;
              }
            } else if (x instanceof RegExp) {
              if (x.test(p)) {
                D = !0;
                break;
              }
            } else if (typeof x == "function" && x(c, p)) {
              D = !0;
              break;
            }
          }
          D && (l[c] = [l[c]]);
        }
      }
      function q(l) {
        var c = 60, p = l.split(/[-T:+Z]/g), D = new Date(p[0], p[1] - 1, p[2]), w = p[5].split(".");
        if (D.setHours(p[3], p[4], w[0]), w.length > 1 && D.setMilliseconds(w[1]), p[6] && p[7]) {
          var x = p[6] * c + Number(p[7]), U = /\d\d-\d\d:\d\d$/.test(l) ? "-" : "+";
          x = 0 + (U === "-" ? -1 * x : x), D.setMinutes(D.getMinutes() - x - D.getTimezoneOffset());
        } else
          l.indexOf("Z", l.length - 1) !== -1 && (D = new Date(Date.UTC(D.getFullYear(), D.getMonth(), D.getDate(), D.getHours(), D.getMinutes(), D.getSeconds(), D.getMilliseconds())));
        return D;
      }
      function W(l, c, p) {
        if (e.datetimeAccessFormPaths.length > 0)
          for (var D = p.split(".#")[0], w = 0; w < e.datetimeAccessFormPaths.length; w++) {
            var x = e.datetimeAccessFormPaths[w];
            if (typeof x == "string") {
              if (x === D)
                return q(l);
            } else if (x instanceof RegExp) {
              if (x.test(D))
                return q(l);
            } else if (typeof x == "function" && x(D))
              return q(l);
          }
        return l;
      }
      function X(l) {
        for (var c = {}, p = l.childNodes, D = 0; D < p.length; D++) {
          var w = p.item(D);
          if (w.nodeType === g.ELEMENT_NODE) {
            var x = d(w);
            e.ignoreRoot ? c = O(w, x) : c[x] = O(w, x);
          }
        }
        return c;
      }
      function E(l, c) {
        var p = {};
        p.__cnt = 0;
        for (var D = l.childNodes, w = 0; w < D.length; w++) {
          var x = D.item(w), U = d(x);
          x.nodeType !== g.COMMENT_NODE && (p.__cnt++, p[U] == null ? (p[U] = O(x, c + "." + U), k(p, U, c + "." + U)) : (p[U] instanceof Array || (p[U] = [p[U]], k(p, U, c + "." + U)), p[U][p[U].length] = O(x, c + "." + U)));
        }
        for (var B = 0; B < l.attributes.length; B++) {
          var Y = l.attributes.item(B);
          p.__cnt++;
          for (var ae = Y.value, Q = 0; Q < e.attributeConverters.length; Q++) {
            var J = e.attributeConverters[Q];
            J.test.call(null, Y.name, Y.value) && (ae = J.convert.call(null, Y.name, Y.value));
          }
          p[e.attributePrefix + Y.name] = ae;
        }
        var Ae = v(l);
        return Ae && (p.__cnt++, p.__prefix = Ae), p["#text"] && (p.__text = p["#text"], p.__text instanceof Array && (p.__text = p.__text.join(`
`)), e.escapeMode && (p.__text = _(p.__text)), e.stripWhitespaces && (p.__text = p.__text.trim()), delete p["#text"], e.arrayAccessForm === "property" && delete p["#text_asArray"], p.__text = W(p.__text, "#text", c + ".#text")), p.hasOwnProperty("#cdata-section") && (p.__cdata = p["#cdata-section"], delete p["#cdata-section"], e.arrayAccessForm === "property" && delete p["#cdata-section_asArray"]), p.__cnt === 1 && p.__text && !e.keepText ? p = p.__text : p.__cnt === 0 && e.emptyNodeForm === "text" ? p = "" : p.__cnt > 1 && p.__text !== void 0 && e.skipEmptyTextNodesForObj && (e.stripWhitespaces && p.__text === "" || p.__text.trim() === "") && delete p.__text, delete p.__cnt, !e.keepCData && !p.hasOwnProperty("__text") && p.hasOwnProperty("__cdata") && Object.keys(p).length === 1 ? p.__cdata ? p.__cdata : "" : (e.enableToStringFunc && (p.__text || p.__cdata) && (p.toString = function() {
          return (this.__text ? this.__text : "") + (this.__cdata ? this.__cdata : "");
        }), p);
      }
      function O(l, c) {
        return l.nodeType === g.DOCUMENT_NODE ? X(l) : l.nodeType === g.ELEMENT_NODE ? E(l, c) : l.nodeType === g.TEXT_NODE || l.nodeType === g.CDATA_SECTION_NODE ? l.nodeValue : null;
      }
      function I(l, c, p, D) {
        var w = "<" + (l && l.__prefix ? l.__prefix + ":" : "") + c;
        if (p)
          for (var x = 0; x < p.length; x++) {
            var U = p[x], B = l[U];
            e.escapeMode && (B = b(B)), w += " " + U.substr(e.attributePrefix.length) + "=", e.useDoubleQuotes ? w += '"' + B + '"' : w += "'" + B + "'";
          }
        return D ? w += " />" : w += ">", w;
      }
      function L(l, c) {
        return "</" + (l && l.__prefix ? l.__prefix + ":" : "") + c + ">";
      }
      function Z(l, c) {
        return l.indexOf(c, l.length - c.length) !== -1;
      }
      function V(l, c) {
        return !!(e.arrayAccessForm === "property" && Z(c.toString(), "_asArray") || c.toString().indexOf(e.attributePrefix) === 0 || c.toString().indexOf("__") === 0 || l[c] instanceof Function);
      }
      function K(l) {
        var c = 0;
        if (l instanceof Object)
          for (var p in l)
            V(l, p) || c++;
        return c;
      }
      function M(l) {
        var c = [];
        if (l instanceof Object)
          for (var p in l)
            p.toString().indexOf("__") === -1 && p.toString().indexOf(e.attributePrefix) === 0 && c.push(p);
        return c;
      }
      function z(l) {
        var c = "";
        return l.__cdata && (c += "<![CDATA[" + l.__cdata + "]]>"), (l.__text || typeof l.__text == "number" || typeof l.__text == "boolean") && (e.escapeMode ? c += b(l.__text) : c += l.__text), c;
      }
      function h(l) {
        var c = "";
        return l instanceof Object ? c += z(l) : l !== null && (e.escapeMode ? c += b(l) : c += l), c;
      }
      function C(l, c, p) {
        var D = "";
        if (l.length === 0)
          D += I(l, c, p, !0);
        else
          for (var w = 0; w < l.length; w++)
            D += N(l[w], c, M(l[w]));
        return D;
      }
      function N(l, c, p) {
        var D = "";
        if (e.jsAttributeFilter && e.jsAttributeFilter.call(null, c, l))
          return D;
        if (e.jsAttributeConverter && (l = e.jsAttributeConverter.call(null, c, l)), (l == null || l === "") && e.selfClosingElements)
          D += I(l, c, p, !0);
        else if (typeof l == "object")
          if (Object.prototype.toString.call(l) === "[object Array]")
            D += C(l, c, p);
          else if (l instanceof Date)
            D += I(l, c, p, !1), D += e.jsDateUTC ? l.toUTCString() : l.toISOString(), D += L(l, c);
          else {
            var w = K(l);
            w > 0 || typeof l.__text == "number" || typeof l.__text == "boolean" || l.__text || l.__cdata ? (D += I(l, c, p, !1), D += T(l), D += L(l, c)) : e.selfClosingElements ? D += I(l, c, p, !0) : (D += I(l, c, p, !1), D += L(l, c));
          }
        else
          D += I(l, c, p, !1), D += h(l), D += L(l, c);
        return D;
      }
      function T(l) {
        var c = "", p = K(l);
        if (p > 0) {
          for (var D in l)
            if (!V(l, D)) {
              var w = l[D], x = M(w);
              c += N(w, D, x);
            }
        }
        return c += h(l), c;
      }
      function F(l) {
        if (l === void 0 || typeof l != "string")
          return null;
        var c = null, p = null;
        if (r)
          c = new r(e.xmldomOptions), p = c.parseFromString(l, "text/xml");
        else if (window && window.DOMParser) {
          c = new window.DOMParser();
          var D = null, w = window.ActiveXObject || "ActiveXObject" in window;
          if (!w && document.all && !document.addEventListener)
            try {
              D = c.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI;
            } catch {
              D = null;
            }
          try {
            p = c.parseFromString(l, "text/xml"), D !== null && p.getElementsByTagNameNS(D, "parsererror").length > 0 && (p = null);
          } catch {
            p = null;
          }
        } else
          l.indexOf("<?") === 0 && (l = l.substr(l.indexOf("?>") + 2)), p = new ActiveXObject("Microsoft.XMLDOM"), p.async = "false", p.loadXML(l);
        return p;
      }
      this.asArray = function(c) {
        return c == null ? [] : c instanceof Array ? c : [c];
      }, this.toXmlDateTime = function(c) {
        return c instanceof Date ? c.toISOString() : typeof c == "number" ? new Date(c).toISOString() : null;
      }, this.asDateTime = function(c) {
        return typeof c == "string" ? q(c) : c;
      }, this.xml2dom = function(c) {
        return F(c);
      }, this.dom2js = function(c) {
        return O(c, null);
      }, this.js2dom = function(c) {
        var p = this.js2xml(c);
        return F(p);
      }, this.xml2js = function(c) {
        var p = F(c);
        return p != null ? this.dom2js(p) : null;
      }, this.js2xml = function(c) {
        return T(c);
      }, this.getVersion = function() {
        return a;
      };
    };
  });
})(Rt);
var Kt = Rt.exports;
const er = /* @__PURE__ */ Zt(Kt);
class tr extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const u = await (await fetch("sitemap.xml")).text();
    let a = new er().xml2js(u), s = "files:<br />";
    for (const o of a.urlset.url) {
      const d = new URL(o.loc).pathname;
      s += `&nbsp;&nbsp;<a href="${d}">${d}</a><br />`;
    }
    this.innerHTML = s;
  }
}
customElements.define("x-sitemap", tr);
class rr extends HTMLElement {
  // (1)
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.ariaExpanded)
      if (this.ariaExpanded = !0, this.attributes.src) {
        const r = new URL(this.attributes.src.baseURI), u = r.pathname.substr(0, r.pathname.lastIndexOf("/") + 1), e = r.origin + u + this.attributes.src.value + r.search, s = await (await fetch(e)).text();
        this.innerHTML = $(s);
      } else
        this.innerHTML = $(this.innerHTML);
  }
}
customElements.define("x-markdown2html", rr);
