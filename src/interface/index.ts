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
    id?: number
    title: string
    content: string
    user_name: string
    head_img : string
    publish_time: Date
}

export interface Reply {
    a_id?: number
    user_id?: number
    user_name?: string
    head_img?: string
    content: string
    floor_id: number
    is_owner: boolean
    target: number | null
    target_name: string | null
    reply_time?: Date
}