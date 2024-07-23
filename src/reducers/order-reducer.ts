import { MenuItem, OrderItem } from "../types";

export type OrderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', payload: { value: number } }

export type OrderState = {
    order: OrderItem[],
    tip: number
}
export const initialState: OrderState = {
    order: [],
    tip: 0
}
export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {
    if (action.type === 'add-item') {
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)
        let order: OrderItem[] = []
        if (itemExist) {
            order = state.order.map(orderItem => orderItem.id === action.payload.item.id ?
                { ...orderItem, quantity: orderItem.quantity + 1 } //Si existe le agregamos un elemento mas en solo lla cantidad 
                : orderItem//Si no existe simplemente devolvemos el objeto sin alterarlo
            )
            // setOrder(order)Ya no se requieren los set ya que estamos retornando el state 
        } else {
            //Se debe de crear una nueva variable para poder agirnarle el valor del nuevo item al arreglo
            const newItem: OrderItem = { ...action.payload.item, quantity: 1 }
            order = [...state.order, newItem]

        }
        return {
            ...state,
            order
        }
    }
    if (action.type === 'remove-item') {
        const  order=state.order.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            order
        }
    }
    if (action.type === 'place-order') {

        return {
            ...state,
            order:[],
            tip:0
        }
    }
    if (action.type === 'add-tip') {
        const tip=action.payload.value
        return {
            ...state,
            tip
        }
    }
    return state
}