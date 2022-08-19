import { useEffect, useState } from "react";

const Piramid = ({character, rows, isStarted}) => {

  /** States */
  const [pirarray, setPirarray] = useState([])

  /** Effects */
  useEffect(() => {
    if(isStarted)
    {
      makeLogicalPiramid();
    }
    else
    {
      setPirarray([]);
    }
  }, [isStarted])

  /** Functions */
  const makeLogicalPiramid = () => {
    var tempPirarray = [];
    var tempCharArray = [];
    var rowPlus = -1;
    for(var i=0; i<rows; i++)
    {
      rowPlus =rowPlus+2;
      for(let j=0; j<rowPlus; j++)
      {
        tempCharArray.push(character);
      }
      tempPirarray.push(tempCharArray);
      tempCharArray = [];
    }
    setPirarray(tempPirarray);
  }

  /**View */
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      {pirarray.map( row => {
        return (
          <div className="flex flex-row items-center justify-center w-full my-1 h-fit">
            {row.map( element => {
              return <span style={{fontSize: 200/rows }} className="mx-1 font-bold text-white duration-200 cursor-pointer transform-all animate-pulse hover:text-blue-600 hover:scale-125 hover:animate-ping">{element}</span>
            })
            }  
          </div>
        )
      })
      }
    </div>
  )
}

export default Piramid;