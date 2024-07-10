export type MenuItem ={
    id:number, 
    name: string, 
    price:number
}

//Heredamos de MenuItem
export type OrderItem=MenuItem &{
    quantity:number
}