declare let __webpack_nonce__: string;

export default function getNonce() {
  if (typeof document !== 'undefined') {
    const head = document.head as any as HTMLElement;
    if (head.querySelector('meta')?.getAttribute('property') === 'csp-nonce') {
      return head.querySelector('meta')?.getAttribute('content');
    }
  }
  return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
}
