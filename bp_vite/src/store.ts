import { createStore } from 'vuex'
import case_info from "./model/case_class";
import {state} from "vue-tsc/out/shared";
import page_info from "./model/page_class";

export default createStore({
    state: {
        inf : new case_info('', '', '', '', ''),
        evi_filled: false,
        vyj_filled: false,
        store_act_index : 0,
        page_cnt : 0
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
        },
        set_active(state, {index}) {
            state.store_act_index = index
        },
        add_new_page(state) {
            state.page_cnt++
            let tmp = new page_info(state.page_cnt)
            state.inf.pages.push(tmp)
            //console.log(state.inf.pages[0].c_stranky)
        },
        next_page_store(state) {
            if (state.store_act_index !== state.page_cnt) {
                state.store_act_index++
            }
        },
        previous_page_store(state) {
            if (state.store_act_index !== 1 ) {
                state.store_act_index--
            }
        },
        save_image_paths(state, payload ) {
            state.inf.images.push(payload.path)
        },
        delete_page(state, number) {
            let flag = 0
            console.log('MAZEME')
            for (let page of state.inf.pages) {
                if (page.c_stranky === number.number) {
                    const index = state.inf.pages.indexOf(page);
                    if (index !== -1) {
                        state.inf.pages.splice(index, 1);
                        state.page_cnt--
                        flag = 1
                    }
                }
            }
            if (flag === 1) {
                for (let page2 of state.inf.pages) {
                    if (page2.c_stranky > number.number) {
                        page2.c_stranky--
                    }
                }
                flag = 0
            }
        }
    }
})