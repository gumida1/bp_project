export default class template_sizes_text {
    height : number
    width : number
    columns : number
    has_text : boolean
    text_height : number
    text_width : number
    side_text : boolean
    constructor(height : number, width : number, cols : number, h_t : boolean, t_height :number, t_width : number, s_text : boolean) {
        this.height = height
        this.width = width
        this.columns = cols
        this.has_text = h_t
        this.text_height = t_height
        this.text_width = t_width
        this.side_text = s_text
    }
}