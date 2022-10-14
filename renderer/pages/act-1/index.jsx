import { saveAs } from "file-saver";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react"
import { randomNames, randomOpers } from "../../helpers/genericData";
import { generateRandom, generateRandomInRange } from "../../helpers/randomNumbers";

const ActivitieOne = () => {

  /**States */
  const [processAmount, setProcessAmount] = useState(0);

  /**Functions */
  const generateFile = () => {
    const result = formatData();
    removeFile();
    const blob = new Blob([result], {type:'text/plain:charset=utf8'})
    saveAs(blob, "datos.txt");
  }

  const formatData = () => {
    var formatedString = "";
    let processNumber = 1;
    let loteNumber = 1;
    let needToProcess = processAmount;
    console.log(needToProcess, '-', processAmount);
    while(needToProcess != 0)
    {
      formatedString+=`Lote # ${loteNumber}`
      if(needToProcess < 5)
      {
        for(let j=0; j<needToProcess; j++)
        {
          formatedString += '\n';
          formatedString += `\n\t${processNumber}-. ${randomNames[generateRandomInRange(0,3)]}`
          formatedString += `\n\t${generateRandom(1000)} ${randomOpers[generateRandomInRange(0,3)]} ${generateRandom(1000)}`
          formatedString += `\n\tTIME: ${generateRandomInRange(4, 13)}`
          processNumber++;
        }
        needToProcess = 0;
      }
      else
      {
        for(let i=0; i<5; i++)
        {
          formatedString += '\n';
          formatedString += `\n\t${processNumber}-. ${randomNames[generateRandomInRange(0,3)]}`
          formatedString += `\n\t${generateRandom(1000)} ${randomOpers[generateRandomInRange(0,3)]} ${generateRandom(1000)}`
          formatedString += `\n\tTIME: ${generateRandomInRange(4, 13)}`
          processNumber++;
        }
        needToProcess = needToProcess - 5;
      }
      formatedString+='\n\n';
      loteNumber++;
    }
    return formatedString;
  }
  
  const removeFile = () => {
    
  }

  /**View */
  return (
    <div className="grid w-full h-full grid-cols-12 p-10 gap-x-8">
      <Head>
        <title>Actividad #1: Procesamiento por Lotes</title>
      </Head>
      <div className="flex flex-row items-center col-span-12">
        <Link href="/home">
          <div className="px-5 pb-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 hover:animate-pulse">
            <h1>{"<"}</h1>
          </div>
        </Link>
        <h1 className="ml-5">Procesamiento Por Lotes</h1>
      </div>
      <div className="flex flex-row items-center justify-between col-span-12 mt-5">
        <div className="flex flex-row items-center justify-around w-2/6 bg-red-500 h-fit">
          <h3># Procesos</h3>
          <input min={0} value={processAmount} onChange={(e) => setProcessAmount(e.target.value)} type={"number"} className="w-3/6 focus:border-4"/>
          <button onClick={() => generateFile()} disabled = {processAmount===0} className={`rounded-2xl btn-blue ${processAmount > 0 ? '' : 'bg-gray-600 hover:bg-gray-600'}`}>
            Generar
          </button>
        </div>
        <div className="flex flex-col items-center w-2/6 Justify-center">
          <h3>Reloj Global</h3>
          <h4>00:00:00</h4>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-4 mt-5">
        <h3>EN ESPERA</h3>
        <div className="w-full p-2 my-4 bg-gray-800 rounded-lg h-96">
          {/**Se renderizan los procesos generados aquí */}
        </div>
        <h3># de Lotes pendientes: </h3>
      </div>
      <div className="flex flex-col items-center justify-center col-span-4 mt-5">
        <h3>EJECUCIÓN</h3>
        <div className="w-full h-64 p-2 my-4 bg-gray-800 rounded-lg">
          {/**Se renderizan los procesos generados aquí */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-4 mt-5">
        <h3>TERMINADOS</h3>
        <div className="w-full p-2 my-4 bg-gray-800 rounded-lg h-96">
          {/**Se renderizan los procesos generados aquí */}
        </div>
        <button className={`rounded-2xl btn-blue`}>
          OBTENER RESULTADOS
        </button>
      </div>
    </div>
  )
}

export default ActivitieOne;