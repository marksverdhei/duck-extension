function animateWord(word) {
  const span = document.createElement('span');
  span.className = 'rainbow-duck';
  span.textContent = word;
  return span;
}

function replaceText(node) {
  const wordRegex = /duck/gi;
  const parent = node.parentNode;
  const textContent = node.textContent;
  let lastIndex = 0;

  if (textContent && wordRegex.test(textContent)) {
    const fragment = document.createDocumentFragment();
    wordRegex.lastIndex = 0;

    let match;
    while ((match = wordRegex.exec(textContent)) !== null) {
      const textNode = document.createTextNode(textContent.slice(lastIndex, match.index));
      const animatedWord = animateWord(match[0]);
      fragment.appendChild(textNode);
      fragment.appendChild(animatedWord);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < textContent.length) {
      const remainingText = document.createTextNode(textContent.slice(lastIndex));
      fragment.appendChild(remainingText);
    }

    parent.replaceChild(fragment, node);
  }
}

function walk(node) {
  let child, next;

  if (node.nodeType === 1 && node.nodeName.toLowerCase() !== 'script') {
    for (child = node.firstChild; child; child = next) {
      next = child.nextSibling;
      walk(child);
    }
  } else if (node.nodeType === 3) {
    replaceText(node);
  }
}

walk(document.body);
