import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-tailwindcss)</title>
      </Head>
      <div className='grid w-full grid-cols-12 p-5 gap-x-4'>
        <h1 className="col-span-12">Actividades: SSPUAESO</h1>
        <h4 className="col-span-12 mt-5">Sección: D03 --- I5904 --- CUCEI </h4>
        <h4 className="col-span-12 mt-5">Giovanni Emmanuel Muñoz López --- 218746654 --- INNI </h4>
        <div className='col-span-3'>
          <Link href='/diagnostico' >
            <div className='flex flex-col justify-center w-full p-5 mt-5 bg-gray-800 cursor-pointer h-32-max-h-32 rounded-xl hover:bg-gray-700 hover:animate-pulse'>
              <h3>Diagnostico</h3>
              <h4>Piramide</h4>
              <br/>
              <p>Ejercicio de inicio que consta de crear una piramide de caracteres usando conocimientos adquiridos en la actualidad.</p>
            </div>
          </Link>
        </div>
        <div className='col-span-3'>
          <Link href='/act-1' className='col-span-3'>
            <div className='flex flex-col justify-center w-full p-5 mt-5 bg-gray-800 cursor-pointer h-32-max-h-32 rounded-xl hover:bg-gray-700 hover:animate-pulse'>
              <h3>Actividad #1:</h3>
              <h4>Procesamiento por lotes (Parte 1)</h4>
              <br/>
              <p>Se trabaja usando archivos de texto y métodos asíncronos con retrasos de tiempo para simular ejecuciones de procesos. En esta parte solo se trabaja en la interfaz y generar los lotes</p>
            </div>
          </Link>
        </div>
        <div className='col-span-3'>
          <Link href='/act-2' className='col-span-3'>
            <div className='flex flex-col justify-center w-full p-5 mt-5 bg-gray-800 cursor-pointer h-32-max-h-32 rounded-xl hover:bg-gray-700 hover:animate-pulse'>
              <h3>Actividad #2:</h3>
              <h4>Procesamiento por lotes (Parte 2)</h4>
              <br/>
              <p>Se trabaja usando archivos de texto y métodos asíncronos con retrasos de tiempo para simular ejecuciones de procesos. Aqui ya la actividad se completa, viendo la simulación completa y pudiendo exportar los resultados en un archivo de texto.</p>
            </div>
          </Link>
        </div>
        <div className='col-span-3'>
          <Link href='/act-3' className='col-span-3'>
            <div className='flex flex-col justify-center w-full p-5 mt-5 bg-gray-800 cursor-pointer h-32-max-h-32 rounded-xl hover:bg-gray-700 hover:animate-pulse'>
              <h3>Actividad #3:</h3>
              <h4>Procesamiento por lotes y multiprogramación</h4>
              <br/>
              <p>Se trabaja usando archivos de texto y métodos asíncronos con retrasos de tiempo para simular ejecuciones de procesos. Esta vez los procesos pueden ser interrumpidos ya sea por errror o de manera voluntario para simular la multiprogramación</p>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
