const lineNumberManager = {
  apply_numbers: function (id) {
    // Grab input area we want to base line numbers off of
    const editorInputArea = document.querySelector(id)
    if (editorInputArea === null) {
      return console.error(`Couldn't find element with id ${id}`)
    }

    // Grab wrapper div placed before textarea to populate with line numbers
    const editorLineNumbers = document.querySelector(id).previousElementSibling
    if (editorLineNumbers === null) {
      return console.error(`Couldn't find first previous sibling of element with id ${id}`)
    }

    // Init styles
    editorInputArea.classList.add("line-numbers-on")
    editorLineNumbers.classList.add("line-numbers-wrapper")

    // Insert line numbers
    lineNumberManager.update_numbers(editorInputArea, editorLineNumbers)

    // Set up event listener for enter and backspace that triggers line count update
    // TODO Performance increase potential here for sure.
    // TODO Need scroll event listeners, currently scroll breaks line count (not synced)
    document.querySelector('#html-editor-input').addEventListener('keyup', (e) => {
      if (e.key == 'Enter' || e.key == 'Backspace') {
        lineNumberManager.update_numbers(editorInputArea, editorLineNumbers)
      }
    })
  },

  update_numbers: function (inputArea, lineNumbers) {
    const linesInInput = inputArea.value.split('\n').length // Number of lines in input area
    const linesInWrapper = lineNumbers.children.length // Number of line number spans in wrapper
    // Calc difference in line count for input area and line count wrapper
    let linesDiff = linesInInput - linesInWrapper

    // Check if linesDiff has positive remainder, if so, add more line number spans
    if (linesDiff > 0) {
      const fragment = document.createDocumentFragment() // Working with DOM frag to minimize browser reflow
      while (linesDiff > 0) {
        const lineNumberSpan = document.createElement("span")
        lineNumberSpan.classList.add("line-numbers-wrapper-line")
        fragment.appendChild(lineNumberSpan)
        linesDiff--
      }
      // Done iterating on DOM fragment, append to main DOM and trigger browser reflow
      lineNumbers.appendChild(fragment)
    } else if (linesDiff < 0) {
      // If linesDiff has negative remainder, must remove line number spans
      while (linesDiff < 0) {
        lineNumbers.removeChild(lineNumbers.lastChild) // Remove last line number span as long as diff
        linesDiff++
      }
    }
  }
}

lineNumberManager.apply_numbers('#html-editor-input')