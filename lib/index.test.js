import { expect, test } from 'vitest'
import { marked } from './marked.js'
if(typeof(HTMLElement) == "undefined"){
    const { HTMLElement = class {} } = globalThis;
  }
  
test('strips metadara', () => {
  expect(marked(
`---
Title: test data
---
Rich was here`)).toBe("<p>Rich was here</p>\n")
})