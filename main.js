import doubanApi from './douban'
import loader from './loader'

export default {
  searchInput: null,
  searchBtn: null,
  errorContainer: null,
  cardContainer: null,

  movies: {},
  error: '',

  init() {
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');
    this.errorContainer = document.getElementById('error-container');
    this.cardContainer = document.getElementById('card-container');

    this.searchBtn.addEventListener('click', () => {
      this.doSearch(this.searchInput.value);
    });
    this.searchInput.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.doSearch(this.searchInput.value);
      }
    });

    this.doSearch();
  },

  doSearch(keyword = '成龙') {
    this.error = '';
    loader.start();
    doubanApi.searchMovies(keyword).then(data => {
      this.movies = data;
    }).catch(err => {
      this.error = '获取数据失败';
    }).then(() => {
      loader.end();
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
    let {subjects = []} = this.movies;

    let html = subjects.map(movie => {
      let {directors = [], casts = [], genres = []} = movie;

      let director = directors.map(({name}) => name).join('/');
      let cast = casts.map(({name}) => name).join('/');
      let genre = genres.join('/');
      let img = movie.images.large || movie.images.medium || movie.images.small

      return `
        <div class="card">
            <img class="card-img-top movie-img" src="${img}" alt="Card image cap">
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

    this.cardContainer.innerHTML = html ? html : '未查询到数据，换个关键字试试';
  }
}