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
      <h1 className="col-span-12">Actividad #0: Diagnóstico</h1>
      <h4 className="col-span-12 mt-5">Giovanni Emmanuel Muñoz López --- 218746654 --- SSPUAESO </h4>
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
