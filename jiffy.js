function createVideo (src) {
    const video = document.createElement('video')
    video.src = src
    video.autoplay = true
    video.loop = true
    video.className = 'video'

    return video
}

const api_key = '6p7rYjivDzeZL9ke1T2jA5MFuswaRZqP'

fetch('https://api.giphy.com/v1/gifs/search?api_key=6p7rYjivDzeZL9ke1T2jA5MFuswaRZqP&q=doggo&limit=50&offset=0&rating=PG-13&lang=en')
    .then(response => {
        // Converting the response to JSON
        return response.json()
    })
    .then(data => {
        // Work with JSON data here
        const gif = data.data[18]
        const src = gif.images.original.mp4

        const video = createVideo(src)

        const videosEl = document.querySelector('.videos')

        // videosEl.appendChild(video)
    })
    .catch(error => {
        // Do something for an error here
        console.log(error)
    })

// Grab the search input element
const searchEl = document.querySelector('.search-input')

// Grab search hint element
const searchHintEl = document.querySelector('.search-hint')

// Separating out our keyup function and we can call to it in various places in our code
const doSearch = event => {

    const searchTerm = searchEl.value

    // Here we set our search-hint to show when we have a searchTerm longer than 2 characters
    if (searchTerm.length > 2) {
        searchHintEl.innerHTML = `Hit enter to search ${searchTerm}`
        document.body.classList.add('show-hint')
    } else {
        document.body.classList.remove('show-hint')
    }


    // We only want to run our search when we have a search term than is longer than 2 characters and when they press the enter key
    if (searchTerm.length > 2 && event.key === 'Enter') {
        console.log('search for', searchTerm)
    }
}

// We listen out for the keyup event on our search-input
searchEl.addEventListener('keyup', doSearch)
