import Head from "next/head";
import Link from "next/link";
import {useState, useEffect} from "react";
import Piramid from "../../components/piramid";

const Diagnostico = () => {
  
  /**States */
  const [character, setCharacter] = useState('')
  const [rows, setRows] = useState(0)
  const [isStarted, setIsStarted] = useState(false)


  /**Functiosn */
  const isDisabled = () => {
    if(character === '' || rows === 0)
    {
      return true
    }
    return false;
  }

  const startHandler = () => {
    if(isStarted)
    {
      setCharacter('');
      setRows(0);
    }
    setIsStarted(!isStarted)
  }

  /**View */
  return (
    <div className="grid w-full h-full grid-cols-12 p-10 gap-x-4">
      <Head>
        <title>Diagnostico: Pirámide</title>
      </Head>
      <div className="flex flex-row items-center col-span-12">
        <Link href="/home">
          <div className="px-5 pb-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 hover:animate-pulse">
            <h1>{"<"}</h1>
          </div>
        </Link>
        <h1 className="ml-5">Diagnóstico</h1>
      </div>
      <div className="w-full col-span-2 mt-4 h-fit">
        <div className="flex flex-col justify-start w-full h-full">
          <label>Caracter:</label>
          <input value={character} onChange={(e) => setCharacter(e.target.value)} maxLength={1} className=" focus:border-4"/>
        </div>
        <div className="flex flex-col justify-start w-full h-full">
          <label>Filas:</label>
          <input value={rows} onChange={(e) => setRows(e.target.value)} type={"number"} max={1000} min={1} className=" focus:border-4"/>
        </div>
        <button onClick={() => startHandler()} disabled = {isDisabled()} className={`mt-5 rounded-2xl btn-blue ${!isDisabled() ? '' : 'bg-gray-600 hover:bg-gray-600'}`}>
          {isStarted ? 'Limpiar' : 'Imprimir'}
        </button>
      </div>
      <div className="w-full h-full col-span-10 mt-4">
        <Piramid character={character} rows={rows} isStarted = {isStarted}/>
      </div>
    </div>
  )
}

export default Diagnostico;
