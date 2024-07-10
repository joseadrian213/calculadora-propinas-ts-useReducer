import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"
export default function useOrder() {
    //Aqui es necesario especificarle un generic al useState para que sepa que tipo de dato va a recibir 
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)
    const addItem = (item: MenuItem) => {
        //Evitamos que se agregue el mismo elemento varias veces en el objeto 
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if (itemExist) {
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ?
                { ...orderItem, quantity: orderItem.quantity + 1 } //Si existe le agregamos un elemento mas en solo lla cantidad 
                : orderItem//Si no existe simplemente devolvemos el objeto sin alterarlo
            )
            setOrder(updatedOrder)
        } else {
            //Se debe de crear una nueva variable para poder agirnarle el valor del nuevo item al arreglo
            const newItem = { ...item, quantity: 1 }
            setOrder([...order, newItem]);

        }

    }
    const removeItem = (id: MenuItem['id']) => {//Le pasamos un id  y le indicamos cual es la referencia de MenuItem[]
        setOrder(order.filter(item => item.id !== id))//filtramo y eliminamos el elemento qeu seleccionamos 

    }
    const placeOrder=()=>{
        setOrder([])
        setTip(0)
    }
    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder

    }
}
