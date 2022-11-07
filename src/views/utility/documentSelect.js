export function createElement(element) {
  return document.createElement(element);
}

export function returnDocumentId(id) {
  return document.getElementById(id) ?? null;
}

export function returnDocumentClass(className) {
  return document.querySelector(`.${className}`) ?? null;
}

export function clearContainer($container) {
  while ($container.firstChild) {
    $container.removeChild($container.firstChild);
  }
}
