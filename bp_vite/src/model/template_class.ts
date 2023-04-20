export default class template_info {
    id_templatu : number;
    template_type : string;
    image : string = '';
    text : string = '';
    from_top: string = '24mm';
    from_left: string = '32mm';

    constructor(id : number, t_t : string) {
        this.id_templatu = id
        this.template_type = t_t
    }
}