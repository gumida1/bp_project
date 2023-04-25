import page_info from "./page_class";

export default class case_info {
    c_jednaci: string;
    c_evidencni: string;
    c_vyjezdu: string;
    j_vyhotovitel: string;
    j_zpracovatel: string;
    pages: page_info[] = [];
    images: string[] = [];
    page_cnt_model: number = 0;
    template_cnt_model: number = 1;
    constructor(c_j: string, c_e: string, c_v: string, j_v: string, j_z: string ) {
        this.c_jednaci = c_j;
        this.c_evidencni = c_e;
        this.c_vyjezdu = c_v;
        this.j_vyhotovitel = j_v;
        this.j_zpracovatel = j_z;
    }

    toJSON(): any {
        return {
            c_jednaci: this.c_jednaci,
            c_evidencni: this.c_evidencni,
            c_vyjezdu: this.c_vyjezdu,
            j_vyhotovitel: this.j_vyhotovitel,
            j_zpracovatel: this.j_zpracovatel,
            pages: this.pages,
            images: this.images,
            page_cnt_model: this.page_cnt_model,
            template_cnt_model: this.template_cnt_model,
        };
    }

}
