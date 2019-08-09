export interface User {
    id?: number
    login_name: string
    name?: string
    password?: string
    sex?: boolean
    head_img?: string
    resgister_time?: Date
}

export interface Ba {
    id: number
    name: string
    url: string
    img: string
    bg_img?: string
    special?: boolean
}

export interface Article {
    title: string
    content: string
}
