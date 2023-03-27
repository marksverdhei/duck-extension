function animateWord(word) {
  const container = document.createElement('span');
  container.className = 'rainbow-duck-container';

  for (let i = 0; i < word.length; i++) {
    const charSpan = document.createElement('span');
    charSpan.className = 'rainbow-duck';
    charSpan.style.setProperty('--amplitude', `${Math.sin(i) * 5}px`);
    charSpan.style.animationDelay = `${i * 0.1}s`;
    charSpan.textContent = word[i];
    container.appendChild(charSpan);
  }

  return container;
}

function replaceText(node) {
  const wordRegex = /(?:fucking|fuck|duckling|duck)/gi;
  const parent = node.parentNode;
  const textContent = node.textContent;
  let lastIndex = 0;

  if (textContent && wordRegex.test(textContent)) {
    const fragment = document.createDocumentFragment();
    wordRegex.lastIndex = 0;

    let match;
    while ((match = wordRegex.exec(textContent)) !== null) {
      const textNode = document.createTextNode(textContent.slice(lastIndex, match.index));
      const replacementWord = match[0].toLowerCase() === 'fuck' ? 'duck' : match[0].toLowerCase() === 'fucking' ? 'duckling' : match[0];
      const animatedWord = animateWord(replacementWord);
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
