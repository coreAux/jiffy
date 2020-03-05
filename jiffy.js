// Here we uppercase the API_KEY to signal that it's something that doesn't change
const API_KEY = '6p7rYjivDzeZL9ke1T2jA5MFuswaRZqP'
// Grab the search input element
const searchEl = document.querySelector('.search-input')
// Grab search hint element
const searchHintEl = document.querySelector('.search-hint')
// Grab videos element
const videosEl = document.querySelector('.videos')
// Grab search-clear button
const clearEl = document.querySelector('.search-clear')

const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length)
    return arr[randIndex]
}

const createVideo = src => {
    const video = document.createElement('video')
    video.src = src
    video.autoplay = true
    video.loop = true
    video.className = 'video'

    return video
}

// When we search show the loading spinner by adding a class to the body

const toggleLoading = state => {
//    console.log('We are loading', state)
    // In here we toggle the page loading state between loading and not loading
    // The first part runs if state is true and the else part runs if state is false
    if (state) {
        document.body.classList.add('loading')
        searchEl.disabled = true
    } else {
        document.body.classList.remove('loading')
        searchEl.disabled = false
        searchEl.focus()
    }
}

// Here we wrap up all of our fetch functionality into its own function
const searchGiphy = searchTerm => {
    // We toggle the loading to let the user know it's loading
    toggleLoading(true)

    // We use backticks for our string so that we can embed our API_KEY and searchTerm variables
    // The searchTerm will be different for every varying search we make
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`)
        // Converting the response to JSON
        .then(response => {
            return response.json()
        })
        // Work with JSON data here
        .then(data => {
            // Here we call our randomchoice function to give us back a random result from the array of images
            const gif = randomChoice(data.data)
            const src = gif.images.original.mp4

            const video = createVideo(src)

            videosEl.appendChild(video)

            video.addEventListener('loadeddata', event => {
                // Toggles fading in effect of our videos
                video.classList.add('visible')
                // We toggle the loading off again
                toggleLoading(false)
                // Adding has-results to toggle the close button
                document.body.classList.add('has-results')
                // Change the hint text to see more results
                searchHintEl.innerHTML = `Hit enter to search more ${searchTerm}`
            })

        })
        // Do something for an error here
        .catch(error => {
            // On fail let the user know there was an error
            toggleLoading(false)
            searchHintEl.innerHTML = `No results were found for ${searchTerm} :(`
            //console.log(error)
        })
}

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
        // Here we call to our searchGiphy function and pass along our searchTerm with it
        searchGiphy(searchTerm)
    }
}

const clearSearch = event => {
    document.body.classList.remove('has-results')
    videosEl.innerHTML = ''
    searchHintEl.innerHTML = ''
    searchEl.value = ''
    // Here we focus the input cursor back onto our input
    searchEl.focus()
}

// Clear the searches if ESC is pressed
document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        clearSearch()
    }
})

document.addEventListener('click', event => {
    searchEl.focus()
})

// We listen out for the keyup event on our search-input
searchEl.addEventListener('keyup', doSearch)
clearEl.addEventListener('click', clearSearch)
