import axios from "../../helpers/axios";
import { saveAs } from "file-saver";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react"
import { randomNames, randomOpers } from "../../helpers/genericData";
import { generateRandom, generateRandomInRange } from "../../helpers/randomNumbers";

const ActivitieTwo = () => {

  /**States */
  const [processAmount, setProcessAmount] = useState(0);
  const [allProcesses, setAllProcesses] = useState([]);
  const [actualProcesses, setActualProcesses] = useState([]);
  const [finishedProcesses, setFinishedProcesses] = useState([]);
  const [onExectution, setOnExecution] = useState({});
  const [pendingLotes, setPendingLotes] = useState('');
  const [globalClock, setGlobalClock] = useState({
      h: 0,
      m: 0,
      s: 0,
      full_seconds: 0
  });
  const [localSeconds, setLocalSeconds] = useState('');
  const [started, setStarted] = useState(false);
  const [currentLote, setCurrentLote] = useState('')


  /**Effects */

  useEffect(() => {

    const interval = setInterval(() => {
      var newGlobalSeconds = 0;
      var newLocalSeconds = 0;
      if(started)
      {
        newGlobalSeconds = globalClock.full_seconds + 1;

        newLocalSeconds = localSeconds - 1;

        if(newLocalSeconds === 0)
        {
          if(actualProcesses.length === 0 && pendingLotes === 0)
          {
            updateFinishedProcesses();
            setOnExecution({});
            setStarted(false);
          }
          else
          {
            checkAndUpdateActualProcesses();
            return;
          }
        }

        setGlobalClock({
            h: Math.floor(newGlobalSeconds / 3600),
            m: Math.floor(newGlobalSeconds % 3600 / 60),
            s: Math.floor(newGlobalSeconds % 3600 % 60),
            full_seconds: newGlobalSeconds
        });

        if(newLocalSeconds >= 0)
        {
          setLocalSeconds(newLocalSeconds);
        }
      }
    }, 1000);

    return () => clearInterval(interval)
  })

  /**Functions */

  const handleActualProcesses = (currentLote) => {
    const actualLote = allProcesses.filter((item) => item.lote === currentLote);
    const firstExecutionProcess = actualLote.shift();
    setOnExecution(firstExecutionProcess);
    setLocalSeconds(firstExecutionProcess.time);
    setActualProcesses(actualLote);
  }

  const updateFinishedProcesses = () => {
    let finished = finishedProcesses;
    let result = '';
    let operElements = onExectution.operation.split(" ");
    switch(operElements[1])
    {
      case '+':
        result = `${operElements[0]} ${operElements[1]} ${operElements[2]} = ${parseInt(operElements[0]) + parseInt(operElements[2])}`;
        break;
      case '-':
        result = `${operElements[0]} ${operElements[1]} ${operElements[2]} = ${parseInt(operElements[0]) - parseInt(operElements[2])}`;
        break;
      case '/':
        result = `${operElements[0]} ${operElements[1]} ${operElements[2]} = ${parseInt(operElements[0]) / parseInt(operElements[2])}`;
        break;
      case '*':
        result = `${operElements[0]} ${operElements[1]} ${operElements[2]} = ${parseInt(operElements[0]) * parseInt(operElements[2])}`;
        break;
      default:
        result = 'OPERATION ERROR';
        break;
    }
    finished.push({
      programmer: onExectution.programmer,
      result: result,
      lote: onExectution.lote
    });
    
    setFinishedProcesses(finished);
  }

  const checkAndUpdateActualProcesses = () => {
    //Actualizamos el aray de terminados
    updateFinishedProcesses();
    if(actualProcesses.length > 0)
    {
      //Preparamos el siguiente proceso en ejecución
      const actualLote = actualProcesses;
      const newExecProcess = actualLote.shift();
      console.log('line 117', actualLote, newExecProcess);
      setActualProcesses(actualLote);
      setOnExecution(newExecProcess);
      setLocalSeconds(newExecProcess.time);
    }
    else
    {
      let newLote = currentLote + 1;
      let pending = pendingLotes - 1;
      setCurrentLote(newLote);
      setPendingLotes(pending);
      handleActualProcesses(newLote);
    }
  }

  const generateResultsFile = async () => {
    let registered = 0;
    let loteNumber = 1;
    let formatedString = "";
    while(registered < finishedProcesses.length)
    {
      formatedString+=`Lote # ${loteNumber}`
      let loteArray = finishedProcesses.filter(process => process.lote === loteNumber);
      for(let i = 0; i<loteArray.length; i++)
      {
        formatedString += '\n';
        formatedString += `\n\t${loteArray[i].programmer}`
        formatedString += `\n\t${loteArray[i].result}`
        registered++;
      }
      loteNumber++;
      formatedString+=`\n\n`;
    }
    await axios.post('/file', {text: formatedString, type: "resultados"});
  }

  const generateFile = async () => {
    const result = formatData();
    const response = await axios.post('/file', {text: result.text, type: "datos"});
    if(response.status === 200)
    {
      setAllProcesses(result.process);
      setPendingLotes(result.lotesAmount-1);
      setCurrentLote(1);
      const actualLote = result.process.filter((item) => item.lote === 1);
      const firstExecutionProcess = actualLote.shift();
      console.log('holi', actualLote, firstExecutionProcess);
      setOnExecution(firstExecutionProcess);
      setLocalSeconds(firstExecutionProcess.time);
      setActualProcesses(actualLote);
      setStarted(true);
    }
  }

  const formatData = () => {
    let formatedString = "";
    let process = [];
    let processNumber = 1;
    let loteNumber = 1;
    let needToProcess = processAmount;
    while(needToProcess != 0)
    {
      formatedString+=`Lote # ${loteNumber}`
      if(needToProcess < 5)
      {
        for(let j=0; j<needToProcess; j++)
        {
          let newProcess  = {
            programmer: `${processNumber}-. ${randomNames[generateRandomInRange(0,3)]}`,
            operation: `${generateRandom(1000)} ${randomOpers[generateRandomInRange(0,3)]} ${generateRandom(1000)}`,
            time: generateRandomInRange(4, 13),
            lote: loteNumber
          }

          formatedString += '\n';
          formatedString += `\n\t${newProcess.programmer}`
          formatedString += `\n\t${newProcess.operation}`
          formatedString += `\n\tTIME: ${newProcess.time}`
          process.push(newProcess);
          processNumber++;
        }
        needToProcess = 0;
      }
      else
      {
        for(let i=0; i<5; i++)
        {
          let newProcess  = {
            programmer: `${processNumber}-. ${randomNames[generateRandomInRange(0,3)]}`,
            operation: `${generateRandom(1000)} ${randomOpers[generateRandomInRange(0,3)]} ${generateRandom(1000)}`,
            time: generateRandomInRange(4, 13),
            lote: loteNumber
          }

          formatedString += '\n';
          formatedString += `\n\t${newProcess.programmer}`
          formatedString += `\n\t${newProcess.operation}`
          formatedString += `\n\tTIME: ${newProcess.time}`
          process.push(newProcess);
          processNumber++;
        }
        needToProcess = needToProcess - 5;
      }
      formatedString+='\n\n';
      loteNumber++;
    }
    return {text: formatedString, process: process, lotesAmount: loteNumber-1};
  }
  

  /**View */
  return (
    <div className="grid w-full h-full grid-cols-12 p-10 gap-x-8">
      <Head>
        <title>Actividad #2: Procesamiento por Lotes</title>
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
        <div className="flex flex-row items-center justify-around w-2/6 h-fit">
          <h3># Procesos</h3>
          <input min={0} value={processAmount} onChange={(e) => setProcessAmount(e.target.value)} type={"number"} className="w-3/6 focus:border-4"/>
          <button onClick={() => generateFile()} disabled = {processAmount===0} className={`rounded-2xl btn-blue ${processAmount > 0 ? '' : 'bg-gray-600 hover:bg-gray-600'}`}>
            Generar
          </button>
        </div>
        <div className="flex flex-col items-center w-2/6 Justify-center">
          <h3>Reloj Global</h3>
          <h4>{globalClock.h >= 10 ? '' : '0'}{globalClock.h}:{globalClock.m >= 10 ? '' : '0'}{globalClock.m}:{globalClock.s >= 10 ? '' : '0'}{globalClock.s}</h4>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-4 mt-5">
        <h3>EN ESPERA</h3>
        <div className="w-full p-2 my-4 bg-gray-800 rounded-lg h-96">
          <h4>Lote # {currentLote}</h4>
          {/**Se renderizan los procesos generados aquí */
            actualProcesses.map((process, index) => {
              return (
                <div className="mt-2 ml-3">
                  <p>{process.programmer}</p>
                  <p>{process.operation}</p>
                  <p>TIME: {process.time}</p>
                </div>
              )
            })
          }
          <h4 className="justify-self-end">Procesos pendientes: {actualProcesses.length}</h4>
        </div>
        <h3># de Lotes pendientes: {pendingLotes}</h3>
      </div>
      <div className="flex flex-col items-center justify-center col-span-4 mt-5">
        <h3>EJECUCIÓN</h3>
        <div className="w-full h-64 p-2 my-4 bg-gray-800 rounded-lg">
          {/**proceso en ejecución */}
          <p>{onExectution && onExectution.programmer ? onExectution.programmer : ''}</p>
          <p>{onExectution && onExectution.operation ? onExectution.operation : ''}</p>
          <p>{ localSeconds > 0 ? `TIME: ${localSeconds}` : ''}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-4 mt-5">
        <h3>TERMINADOS</h3>
        <div className="w-full p-2 my-4 overflow-y-scroll bg-gray-800 rounded-lg h-96">
          {/**Se renderizan los procesos terminados aquí */
            finishedProcesses.map((process, index) => {
              return (
                <div className="mt-2 ml-3">
                  <p>{process.programmer}</p>
                  <p>{process.result}</p>
                </div>
              )
            })
          }
        </div>
        <button onClick={() => generateResultsFile()} disabled= {!(finishedProcesses.length >0 && pendingLotes===0 && actualProcesses.length === 0 && localSeconds === 0)} className={`rounded-2xl btn-blue  ${finishedProcesses.length >0 && pendingLotes===0 && actualProcesses.length === 0 && localSeconds === 0 ? '' : 'bg-gray-600 hover:bg-gray-600'}`}>
          OBTENER RESULTADOS
        </button>
      </div>
    </div>
  )
}

export default ActivitieTwo;