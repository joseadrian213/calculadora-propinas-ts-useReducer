import { useMemo,useCallback,Dispatch } from "react"
import { OrderActions } from "../reducers/order-reducer"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
type OrderTotalsProps = {
    order: OrderItem[],
    tip:number,
    dispatch: Dispatch<OrderActions>
}
export default function OrderTotals({ order,tip,dispatch }: OrderTotalsProps) {
    //Solo se ejecuta cuando la dependencia cambia por eso usa useMemo
    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    const tipAmount=useMemo(()=>subtotalAmount*  tip ,[tip,order])
    //sintaxis para poder utilizar useCallback cuando se manada a llamar es igual que en una función 
    const totalAmount=useCallback(()=>subtotalAmount+tipAmount,[tip,order])
    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propinas:</h2>
                <p>Subtotal a Pagar:{' '}
                    <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
                </p>
                <p>Propina:{' '}
                    <span className="font-bold">{formatCurrency(tipAmount)}</span>
                </p>
                <p>Total a Pagar:{' '}
                    <span className="font-bold">{formatCurrency(totalAmount())}</span>
                </p>
            </div>
            <button
            className="w-full p-3 mt-10 font-bold bg-black uppercase text-white disabled:opacity-10"
            disabled={totalAmount()===0}
            onClick={()=> dispatch({type:'place-order'})}
           >
                Guardar Orden 
            </button>
        </>
    )
}
