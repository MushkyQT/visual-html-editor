// Grab webpage preview iframe
const iframe = document.querySelector('#webpagePreview').contentWindow

// When called, takes text content of html editor textarea and copies it to iframe body
function updatePreview() {
  let html = document.querySelector('#html-editor-input').value
  iframe.document.open()
  iframe.document.write(html)
  iframe.document.close()
}

// Debounce function to limit calls to updatePreview(),
// start on keyup and execute when no new keyup for 1 second (wait = 1000)
function debounce(callback, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      callback.apply(this, args)
    }, wait)
  }
}

window.addEventListener('keyup', debounce(() => {
  updatePreview()
}, 1000))