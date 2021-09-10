import React from 'react';
import TestRenderer from 'react-test-renderer';
import { getRenderedCSS, resetStyled } from './utils';

let styled: ReturnType<typeof resetStyled>;
describe('with styles', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    styled = resetStyled();
  });

  it('should add a nonce to the style tags if one is available in the global scope', () => {
    const base64Nonce = 'styled base 64 nonce';
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('property', 'csp-nonce');
    metaTag.setAttribute('content', base64Nonce);
    document.querySelector('head').appendChild(metaTag);

    const rule = 'color: hotpink;';
    const Comp = styled.div`
      ${rule};
    `;
    TestRenderer.create(<Comp />);
    expect(getRenderedCSS()).toMatchInlineSnapshot(`
      ".b {
        color: hotpink;
      }"
    `);

    expect(document.querySelector('meta').getAttribute('content')).toBe(base64Nonce);

    Array.from(document.querySelectorAll('style')).forEach(el => {
      expect(el.getAttribute('nonce')).toBe(base64Nonce);
    });
  });
});
