var trim = document.querySelectorAll('pre[data-trim] code')
for(var i = 0; i < trim.length; i++) {
  var element = trim[i]
  var html = element.innerHTML.split('\n')
  var indentSize = html[1].match(/^\s*/)[0].length
  element.innerHTML = html.slice(1, html.length - 1)
    .map(string => string.substring(indentSize))
    .join('\n')
}

var slides = document.querySelectorAll('section')
for(var i = 0; i < slides.length; i++) {
  var slide = slides[i]
  slide.style.display = 'none'
}

var currentIndex = 0
var currentSlide = slides[0]
currentSlide.style.display = 'block'

function next() {
  currentIndex++
  if(currentIndex >= slides.length) {
    currentIndex = slides.length - 1
    return
  }

  var previousSlide = currentSlide
  currentSlide = slides[currentIndex]
  previousSlide.style.display = 'none'
  currentSlide.style.display = 'block'
}

function previous() {
  currentIndex--
  if(currentIndex < 0) {
    currentIndex = 0
    return
  }

  var previousSlide = currentSlide
  currentSlide = slides[currentIndex]
  previousSlide.style.display = 'none'
  currentSlide.style.display = 'block'
}

document.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    case 39:
    case 32:
    case 68:
      next()
      break
    case 37:
    case 65:
      previous()
      break
  }
})
