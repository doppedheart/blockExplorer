import { useState,useEffect } from 'react'
import {alchemySettings } from '../store/atom'
import { useRecoilValue } from 'recoil'
import { Alchemy, Block} from 'alchemy-sdk'
import { useNavigate } from 'react-router-dom'


function BlockNumber() {
  const [blockNumber, setBlockNumber] = useState<number>(0)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const alchemyInstance = new Alchemy(useRecoilValue(alchemySettings))
  useEffect(()=>{
    async function getBlockNumber(){
      const newBlockNumber=await alchemyInstance.core.getBlockNumber()
      setBlockNumber(newBlockNumber)
    }
    async function getTransactions(bN:number){
      const transactions = await alchemyInstance.core.getBlockWithTransactions(bN)
      console.log(transactions.transactions.slice(0,10))
      setTransactions(transactions.transactions.slice(0,10))
    }
    getBlockNumber()
    getTransactions(blockNumber)
    const intervalId = setInterval(getBlockNumber,5000)

    return ()=>{
      clearInterval(intervalId)
    }
  },[])
  useEffect(()=>{
    async function getBlocks(){
      const newBlocks=[]
      for ( let i = 0; i < 10; i++)
        newBlocks.push(await alchemyInstance.core.getBlock(blockNumber-i))
      setBlocks(newBlocks)
    }
    getBlocks()
  },[])
  const navigate = useNavigate();
  return (
   <div>
        <div className='p-5 rounded-lg flex justify-center items-center m-10 bg-stone-500 text-white text-2xl'>
          Current Block Number :{blockNumber}
        </div>
        <div className='flex flex-wrap'>
          <div className='m-10 p-5'>
            <h1 className='font-serif pl-3'>list of last 10 blocks</h1>
            {blocks.length>0 &&  blocks.map((block,index)=>{
              return <div className='p-4 m-3 bg-slate-800 text-white rounded-xl ' key={index} onClick={()=>navigate(`/block/${block.number}`)}>
                  <div>
                    <p>Block Number : {block.number}</p>
                    <p>Miner : {block.miner}</p>
                  </div>
                </div>
            })}
          </div>
          <div className='m-10 p-5'>
            {/**list of last 10 transaction and view more */}
            <h1 className='font-serif pl-3'>list of last 10 transactions</h1>
            {transactions.length>0 &&  transactions.map((tx,index)=>{
              return <div className='p-4 m-3 bg-slate-800 text-white rounded-xl ' key={index} onClick={()=>navigate(`/txs/${tx.number}`)}>
                  <div>
                    <p>transaction hash : {tx.hash.slice(0,10)} ...</p>
                    <p>From : {tx.from}</p>
                  </div>
                </div>
            })}
          </div>
        </div>
        
   </div>
  )
}

export default BlockNumber
