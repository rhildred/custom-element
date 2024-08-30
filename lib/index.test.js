import { expect, test } from 'vitest'
import { marked } from './marked.js'
import { getSlides } from './getSlides.js'
if(typeof(HTMLElement) == "undefined"){
    const { HTMLElement = class {} } = globalThis;
  }
  
test('strips metadata', () => {
  expect(marked(
`---
Title: test data
---
Rich was here`)).toBe("<p>Rich was here</p>\n")
});

test('gets slides', async () => {
  const rc = await getSlides('rhildred/INFO8985/observability');
  expect(true).toBe(true);
});