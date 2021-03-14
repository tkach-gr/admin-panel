import { createStore } from "vuex";
import database from "@/scripts/database";

let isRequestedCinemas = false;
let isRequestedPromotions = false;
let isRequestedNews = false;

const store = createStore({
    state () {
        return {
            cinemas: null,
            promotions: null,
            news: null
        }
    },
    getters: {
        getCinemas: state => url => {
            if(isRequestedCinemas !== true) {
                database.listenData(url, value => state.cinemas = value);
                isRequestedCinemas = true;
            }

            return state.cinemas;
        },
        getPromotions: state => url => {
            if(isRequestedPromotions !== true) {
                database.listenData(url, value => state.promotions = value);
                isRequestedPromotions = true;
            }

            return state.promotions;
        },
        getNews: state => url => {
            if(isRequestedNews !== true) {
                database.listenData(url, value => state.news = value);
                isRequestedNews = true;
            }

            return state.news;
        }
    }
});

export default store;

