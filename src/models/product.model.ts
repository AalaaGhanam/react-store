export interface Rate {
    rate: number
    count: number
}
export interface Product {
    id: string
    title: string
    price: number
    description: string
    image: string
    rating: Rate
    category: string
}
