import { createStore } from "vuex";
import database from "@/scripts/database";

let isRequestedCinemas = false;

const store = createStore({
    state () {
        return {
            cinemas: null,
            promotions: null,
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
            if(isRequestedCinemas !== true) {
                database.listenData(url, value => state.cinemas = value);
                isRequestedCinemas = true;
            }

            return state.cinemas;
        }
    }
});

export default store;

