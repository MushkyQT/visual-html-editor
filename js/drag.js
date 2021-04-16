dragula(
    [
      document.querySelector('.blocks-toolbox-blocks'),
      document.querySelector('#html-editor-input')
    ],
    {
      copy: function (el, source) {
        return source === document.querySelector('.blocks-toolbox-blocks')
      },
      accepts: function (el, target) {
        return target !== document.querySelector('.blocks-toolbox-blocks')
      }
    }
).on('drop', function (el, target, source, sibling) {
  if (target !== null) {
    let lineCountDiv = document.querySelector(`#${target.id}`).previousElementSibling
    target.value += `\n ${el.innerHTML.trim()}`
    updatePreview()
    lineNumberManager.update_numbers(target, lineCountDiv)
  }
})