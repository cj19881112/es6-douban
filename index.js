import doubanApi from './douban'

let index = {
    /**
     * 视图元素
     */
    searchInput: null,
    searchBtn: null,
    errorContainer: null,
    cardContainer: null,

    /**
     * 数据元素
     */
    movies: {},
    error: '',

    init() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.errorContainer = document.getElementById('error-container');
        this.cardContainer = document.getElementById('card-container');

        this.searchBtn.addEventListener('click', () => {
            this.doSearch();
        })
        this.searchInput.addEventListener('keypress', e => {
            if (e.keyCode === 13) {
                this.doSearch();
            }
        })

        this.doSearch();
    },

    doSearch() {
        this.error = '';
        doubanApi.searchMovies(this.searchInput.value).then(data => {
            this.movies = data;
        }).catch(err => {
            this.error = '获取数据失败';
        }).then(() => {
            this.updateUI()
        });
    },

    updateUI() {
        this.updateErrorMsg();
        this.updateMovieList();
    },

    updateErrorMsg() {
        this.errorContainer.innerHTML = this.error;
        this.errorContainer.style.display = this.error ? 'block' : 'none'
    },

    updateMovieList() {
        let { subjects = [] } = this.movies;

        let html = subjects.map(movie => {
            let { directors=[], casts=[], genres=[] } = movie;

            let director = directors.map(({name}) => name).join('/');
            let cast = casts.map(({name}) => name).join('/');
            let genre = genres.join('/');

            return `
                <div class="card">
                    <img class="card-img-top movie-img" src="${movie.images.large || movie.images.medium || movie.images.small}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">
                            <div>导演：${director}</div>
                            <div>编剧：${cast}</div>
                            <div>类型：${genre}</div>
                        </p>
                        <a href="${movie.alt}" class="btn btn-primary btn-block">查看详情</a>
                    </div>
                </div>
                `;
        }).join('');

        this.cardContainer.innerHTML = html;
    }
}

window.onload = () => {
    index.init();
}
