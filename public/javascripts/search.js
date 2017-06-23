(function() {
  const DEBOUNCE_MS = 700

  const movieHTML = movie => `
<div class="movie">
<img src="${movie.logo || 'https://dummyimage.com/42x68.gif?text=%3f'}" alt="${movie.title}"/>
${movie.title}
</div>
  `

  const debounce = (func, wait, immediate) => {
    // stolen from: https://snippetrepo.com/snippets/basic-vanilla-javascript-throttlingdebounce
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  };

  const doSearch = (page = 1) => {
    const query = document.getElementById('search').value
    console.log(`searching for ${query}, page ${page}...`)
    fetch(`/api/searchMovieWithLogo?query=${encodeURIComponent(query)}&page=${page}`)
    .then(res => {
      res.json().then(data => {
        const nextButton = data.page < data.total_pages ? '<button id="next">next</button>' : ''
        const prevButton = data.page > 1 ? '<button id="prev">prev</button>' : ''
        if (data.results.length) {
          document.getElementById('results').innerHTML = `
          <div id="movies">
            ${data.results.map(movieHTML).join('\n')}
          </div>
<p>Showing ${data.results.length}/${data.total_results} results</p>
<p>
Page ${data.page}/${data.total_pages}
${prevButton}
${nextButton}
</p>

        `
          nextButton && addEventHandler(document.getElementById('next'), 'click', () => {
            doSearch(data.page + 1)
          })
          prevButton && addEventHandler(document.getElementById('prev'), 'click', () => {
            doSearch(data.page - 1)
          })
        }
      })
    })
  }

  const debounceSearch = debounce(doSearch, DEBOUNCE_MS)

  const addEventHandler = (elem, eventType, handler) => {
    if (elem.addEventListener) {
      elem.addEventListener (eventType, handler, false)
    } else if (elem.attachEvent) {
      elem.attachEvent ('on' + eventType, handler)
    }
  }

  addEventHandler(document, 'DOMContentLoaded', () => {
    //need to use a non-arrow function because it allows us to to use 'this' to refer to the target element
    addEventHandler(document.getElementById('search'), 'keyup', () => {
      debounceSearch()
    })
  })
})()

