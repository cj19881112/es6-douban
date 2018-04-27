import jsonp from './jsonp'

const DOUBAN_API = 'https://api.douban.com' 

export default {
    searchMovies (keyword) {
        return jsonp(DOUBAN_API + `/v2/movie/search?q=${keyword}`)
    }
}