import { createStore } from 'vuex'
import case_info from "./model/case_class";
import {state} from "vue-tsc/out/shared";
import page_info from "./model/page_class";
import template_sizes from "./model/template_sizes_class";
import template_sizes_text from "./model/template_sizes_text_class";

export default createStore({
    state: {
        inf : new case_info('', '', '', '', ''),
        store_act_index : 0,
        active_template : 0,
        templ_1_1 : new template_sizes(259,167,2, false),
        templ_1_2 : new template_sizes(125,167,2, false),
        templ_1_3 : new template_sizes(80.33,167,2, false),
        templ_1_4 : new template_sizes(125,82,1, false),
        templ_1_6 : new template_sizes(80.33,82,1, false),
        templ_1_8 : new template_sizes(58,82,1, false),
        templ_p_1_1 : new template_sizes_text(234,167,2, true, 25, 167, false),
        templ_p_1_2_a : new template_sizes_text(100,167,2, true, 25, 167, false),
        templ_p_1_2_b : new template_sizes_text(125,167,2, true, 125, 47, true),
        templ_p_1_3 : new template_sizes_text(80.33,167,2, true, 80.33, 47, true),
        templ_p_1_4 : new template_sizes_text(58,167,2, true, 58, 47, true),
        templ_t_1_1 : new template_sizes_text(265,167,2, true, 259, 167, true),
    },
    mutations: {
        set_active(state, {index}) {
            state.store_act_index = index
        },
        add_new_page(state) {
            state.inf.page_cnt_model++
            let tmp = new page_info(state.inf.page_cnt_model)
            state.inf.pages.push(tmp)
            state.store_act_index = state.inf.page_cnt_model
            //console.log(state.inf.pages[0].c_stranky)
        },
        next_page_store(state) {
            if (state.store_act_index !== state.inf.page_cnt_model) {
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
                        if (number.number === state.inf.page_cnt_model) {
                            state.store_act_index--
                        }
                        state.inf.page_cnt_model--
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