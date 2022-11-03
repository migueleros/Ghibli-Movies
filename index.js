let ghibliEndPoint = `https://ghibliapi.herokuapp.com/films`
const movies_container = document.getElementById('movies_container')
const movie_details = document.querySelector('.movie_details_section')

fetch(ghibliEndPoint, {
    method: 'GET'
}).then(res => {
    res.json().then(data => {
        build_movies(data)
    })
})

function build_movies(data) {
    data.forEach(movie => {
        movies_container.insertAdjacentHTML('beforeend', `
            <div class="movie" id='${movie.id}' title="${movie.title}">
                <img src="${movie.image}" alt="howls_poster">
            </div>
        `)
    })

    document.querySelectorAll('.movie').forEach(movie => {
        movie.addEventListener('click', () => {
            build_movie_details(movie.id)
        })
    })
}

function build_movie_details(id) {
    let url = `https://ghibliapi.herokuapp.com/films/${id}`

    fetch(url, {
        method: 'GET'
    }).then(res => {
        res.json().then(data => {
            document.querySelector('.movie_details_background').style.backgroundImage = `url(${data.movie_banner})`

            document.querySelector('.movie_indicator').textContent = data.title
        
            document.querySelector('.movie_description').textContent = data.description
        
            document.querySelector('.movie_director').textContent = `Director: ${data.director}`
        
            document.querySelector('.release_date').textContent = `Release Date: ${data.release_date}`
        
            document.querySelector('.running_time').textContent = `Running Time: ${data.running_time} mins`

            window.scrollTo(0, 0);

            document.body.style.overflow = 'hidden'
            
            movie_details.classList.add('show')
        })
    })
}

document.getElementById('send_home').addEventListener('click', () => {
    movie_details.classList.remove('show')

    document.body.style.overflow = 'visible'
})