$(function () {
    let results = []
    let currentPage = 1
  
    $('#search-btn').click(() => {
      const query = $('#search-box').val().trim()
      if (!query) return
  
      $.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`, (data) => {
        results = data.items || []
        currentPage = 1
        showPage(currentPage)
        setupPagination()
      })
    })
  
    function showPage(page) {
      $('#search-results').empty()
      const start = (page - 1) * 10
      const pageBooks = results.slice(start, start + 10)
  
      pageBooks.forEach((book) => {
        const info = book.volumeInfo
        const thumb = info.imageLinks ? info.imageLinks.thumbnail : ''
        const bookDiv = $(`
          <div class="book" data-title="${info.title}" data-authors="${(info.authors || []).join(', ')}" data-desc="${info.description || ''}" data-link="${info.infoLink}">
            ${thumb ? `<img src="${thumb}" alt="cover" />` : ''}
            <p>${info.title}</p>
          </div>
        `)
        $('#search-results').append(bookDiv)
      })
    }
  
    function setupPagination() {
      $('#pagination').empty()
      const totalPages = Math.min(5, Math.ceil(results.length / 10))
      for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button>${i}</button>`)
        if (i === currentPage) btn.addClass('active')
        btn.click(() => {
          currentPage = i
          showPage(currentPage)
          setupPagination()
        })
        $('#pagination').append(btn)
      }
    }
  
    $(document).on('click', '.book', function () {
      const title = $(this).data('title')
      const authors = $(this).data('authors')
      const desc = $(this).data('desc')
      const link = $(this).data('link')
  
      $('#book-details').html(`
        <h3>${title}</h3>
        <p><strong>Authors:</strong> ${authors}</p>
        <p>${desc}</p>
        <a href="${link}" target="_blank">More info</a>
      `)
    })
  
    function loadBookshelf() {
      const fakeBooks = [
        { id: '1', title: 'Tips for Students', authors: ['Beatrice Noon'], description: 'A guide to help high school and college students.', infoLink: 'https://example.com/tips' },
        { id: '2', title: 'Hungry Hippocampus', authors: ['Janice Edwards'], description: 'Why do our brains need fuel?', infoLink: 'https://example.com/brain-book' },
        { id: '3', title: 'Dogs', authors: ['Chris Styles'], description: 'All about dogs.', infoLink: 'https://example.com/dogs' },
        { id: '4', title: 'Room Decor', authors: ['West Gone'], description: 'Best room decor for anyone.', infoLink: 'https://example.com/decor' }
      ]
  
      $('#bookshelf').html('<h3>Bookshelf</h3>')
  
      fakeBooks.forEach(book => {
        const bookHTML = $(`
          <div class="book" data-id="fake-${book.id}" data-title="${book.title}" data-authors="${book.authors.join(', ')}" data-desc="${book.description}" data-link="${book.infoLink}">
            <p>${book.title}</p>
          </div>
        `)
        $('#bookshelf').append(bookHTML)
      })
    }
  
    loadBookshelf()
  })
  
  