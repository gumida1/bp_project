import { createStore } from 'vuex'
import case_info from "./model/case_class";
import {state} from "vue-tsc/out/shared";

export default createStore({
    state: {
        inf : new case_info('', '', '', '', ''),
        evi_filled: false,
        vyj_filled: false
    },
    mutations: {
        check_filled_input_evi(state) {
            //state.evi_filled = state.inf.c_evidencni !== '';
            if (state.inf.c_evidencni !== '') {
                state.evi_filled = true
            }
        },
        check_filled_input_vyj(state) {
            //state.vyj_filled = state.inf.c_vyjezdu !== '';
            if (state.inf.c_vyjezdu !== '') {
                state.vyj_filled = true
            }
        },
        fill_vyhotovil(state) {
            if (state.inf.j_zpracovatel !== '') {
                state.inf.j_vyhotovitel = state.inf.j_zpracovatel
            }
        },
        fill_zpracoval(state) {
            if (state.inf.j_vyhotovitel !== '') {
                state.inf.j_zpracovatel = state.inf.j_vyhotovitel
            }
        },
        print_state(state) {
            console.log(state.evi_filled)
            console.log(state.vyj_filled)
        }
    }
})