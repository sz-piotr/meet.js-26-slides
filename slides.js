function Slide(elements) {
  this.elements = elements || []
  this.prev = null
  this.next = null
}

Slide.prototype.hide = function() {
  this.elements.forEach(function(element) {
    element.style.display = 'none'
  })
}

Slide.prototype.show = function() {
  this.elements.forEach(function(element) {
    element.style.removeProperty('display')
  })
}

var trim = document.querySelectorAll('pre[data-trim] code')
for(var i = 0; i < trim.length; i++) {
  var slideElement = trim[i]
  var html = slideElement.innerHTML.split('\n')
  var indentSize = html[1].match(/^\s*/)[0].length
  slideElement.innerHTML = html.slice(1, html.length - 1)
    .map(string => string.substring(indentSize))
    .join('\n')
}

var currentSlide

var slideElements = document.querySelectorAll('section')
for(var i = slideElements.length - 1; i >= 0; i--) {
  var slideElement = slideElements[i]
  slideElement.style.display = 'none'

  var fragments = slideElement.querySelectorAll('[data-enter], [data-exit]')
  var lifeLineLength = 1
  fragments.forEach(function(fragment) {
    lifeLineLength = Math.max(
      lifeLineLength,
      parseInt(fragment.dataset.enter || 1),
      parseInt(fragment.dataset.exit || 0) + 1
    )
  })

  var lifeLine = []
  for(var j = 0; j < lifeLineLength; j++) {
    lifeLine[j] = [slideElement]
  }

  fragments.forEach(function(fragment) {
    fragment.style.display = 'none'
    var enterAt = parseInt(fragment.dataset.enter || 0)
    var exitAt = parseInt(fragment.dataset.exit || lifeLineLength)
    for(var i = enterAt; i < exitAt; i++) {
      lifeLine[i].push(fragment)
    }
  })

  for(var j = lifeLine.length - 1; j >= 0; j--) {
    var slide = new Slide(lifeLine[j])
    if(currentSlide) {
      slide.next = currentSlide
      currentSlide.prev = slide
    }
    currentSlide = slide
  }
}

function next() {
  if(currentSlide.next) {
    currentSlide.hide()
    currentSlide = currentSlide.next
    currentSlide.show()
  }
}

function previous() {
  if(currentSlide.prev) {
    currentSlide.hide()
    currentSlide = currentSlide.prev
    currentSlide.show()
  }
}

currentSlide.show()

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
