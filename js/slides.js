var presentation = {
  slides: [],
  currentIndex: 0,
  hide: function () {
    this.slides[this.currentIndex].forEach(function(element) {
      element.style.display = 'none'
    })
  },
  show: function() {
    this.slides[this.currentIndex].forEach(function(element) {
      element.style.removeProperty('display')
    })
    location.hash = this.currentIndex
  },
  start: function() {
    this.currentIndex = parseInt(location.hash.substring(1)) || 0
    this.show()
  },
  next: function() {
    if(this.currentIndex < this.slides.length - 1) {
      this.hide()
      this.currentIndex++
      this.show()
    }
  },
  prev: function() {
    if(this.currentIndex > 0) {
      this.hide()
      this.currentIndex--
      this.show()
    }
  }
}

document.querySelectorAll('section:not([data-skip])').forEach(function (slide) {
  slide.style.display = 'none'

  var fragments = slide.querySelectorAll('[data-enter], [data-exit]')
  var subSlides = 1
  fragments.forEach(function(fragment) {
    subSlides = Math.max(
      subSlides,
      parseInt(fragment.dataset.enter || 0) + 1,
      parseInt(fragment.dataset.exit || 0) + 1
    )
  })

  var timeline = []
  for(var j = 0; j < subSlides; j++) {
    timeline[j] = [slide]
  }

  fragments.forEach(function(fragment) {
    fragment.style.display = 'none'
    var enterAt = parseInt(fragment.dataset.enter || 0)
    var exitAt = parseInt(fragment.dataset.exit || subSlides)
    for(var i = enterAt; i < exitAt; i++) {
      timeline[i].push(fragment)
    }
  })

  presentation.slides = presentation.slides.concat(timeline)
})

presentation.start()

document.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    case 39:
    case 32:
    case 68:
      presentation.next()
      break
    case 37:
    case 65:
      presentation.prev()
      break
  }
})
