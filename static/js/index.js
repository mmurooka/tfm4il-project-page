(() => {
  const links = window.PUBLICATION_LINKS || {};
  function replacePlaceholder(id, href, label) {
    const placeholder = document.getElementById(id);
    const link = document.createElement('a');
    link.className = 'button is-dark is-rounded';
    link.href = href;
    const icon = placeholder.querySelector('.button-icon');
    if (icon) link.append(icon.cloneNode(true));
    const text = document.createElement('span');
    text.textContent = label;
    link.append(text);
    placeholder.replaceWith(link);
  }
  if (/^https:\/\/arxiv\.org\/abs\/[a-zA-Z0-9./-]+$/.test(links.arxivUrl || '')) {
    replacePlaceholder('arxiv-placeholder', links.arxivUrl, 'arXiv');
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(links.youtubeId || '')) {
    replacePlaceholder('youtube-placeholder', `https://www.youtube.com/watch?v=${links.youtubeId}`, 'YouTube');
  }
  document.getElementById('copy-bibtex').addEventListener('click', async () => {
    const citation = document.getElementById('bibtex');
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(citation.textContent);
      status.textContent = 'BibTeX copied.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
    }
  });
})();
