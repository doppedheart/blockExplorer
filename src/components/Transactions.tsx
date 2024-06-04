import { useEffect, useState } from "react"

export function Transactions(){
    const [transactions, setTransactions] = useState([])
    useEffect(()=>{
        
    })

    return (
        <div>
            {transactions.length ? "no transactions": transactions.map((tx, index) => {
                return <div key={index}>
                tx
                </div>
            })}
        </div>
    )
}