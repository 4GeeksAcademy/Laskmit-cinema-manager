// funcion para crear la sala de cine
function CrearSalaCine(filas: number, columnas: number): number[][] {
  return Array.from({ length: filas }, () => Array(columnas).fill(0));
}

// funcion para imprimir la sala de cine
function ImprimirSalaCine(sala: number[][]): void {
  if (sala.length === 0 || sala[0].length === 0) {
    console.log("Sala vacia");
    return;
  }

  const columnas = sala[0].length;

  const encabezadoColumnas = [" ", ...Array.from({ length: columnas }, (_, i) => i)].join(" ");
  console.log("Sala de Cine:");
  console.log(encabezadoColumnas);

  for (let i = 0; i < sala.length; i++) {
    const filaImpresa = sala[i].map((asiento) => (asiento === 0 ? "L" : "X")).join(" ");
    console.log(`${i} ${filaImpresa}`);
  }
}

// funcion para reservar un asiento de la sala
function ReservarAsiento(sala: number[][], fila: number, columna: number): void {
  if (fila < 0 || fila >= sala.length || columna < 0 || columna >= sala[0].length) {
    console.error(`Error: el asiento indicado no existe (fila: ${fila}, columna: ${columna})`);
    return;
  }

  if (sala[fila][columna] === 0) {
    sala[fila][columna] = 1;
    console.log(`Asiento reservado en fila ${fila}, columna ${columna}`);
  } else {
    console.error("Error: el asiento ya esta ocupado");
  }
}

// funcion para indicar cuantos asientos hay ocupados y disponibles
function ContarAsientos(sala: number[][]): { ocupados: number, disponibles: number } {
  let ocupados = 0;
  let disponibles = 0;

  for (const fila of sala) {
    for (const asiento of fila) {
      if (asiento === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }
  return { ocupados, disponibles };
}

// funcion para buscar dos asientos libres contiguos en la misma fila
function BuscarDosAsientosContiguos(sala: number[][]
): { asiento1: { fila: number; columna: number }; asiento2: { fila: number; columna: number } } | null {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      if (sala[fila][columna] === 0 && sala[fila][columna + 1] === 0) {
        return {
          asiento1: { fila, columna },
          asiento2: { fila, columna: columna + 1 },
        };
      }
    }
  }

  return null;
}


// Inicio de las llamadas a las funciones

for (let nrotest = 1; nrotest <= 4; nrotest++) {
  let SalaCine: number[][] = CrearSalaCine(8, 10);
  ImprimirSalaCine(SalaCine);  // deberia estar vacia
  // con este switch se simulan reservas correspondientes a cada test 
  // (son 4 test en total, cada uno con un nivel de ocupacion diferente)
  switch (nrotest) {
    case 1: //sala vacia
      console.log("************** TEST 1: Sala vacia *************");
      break;
    case 2: //sala medio llena
      console.log("************** TEST 2: Sala medio llena *************");
      ReservarAsiento(SalaCine, 2, 3);
      // hacer 10 reservas aleatorias
      for (let i = 0; i < 10; i++) {
        let filaAleatoria: number = Math.floor(Math.random() * SalaCine.length);
        let columnaAleatoria: number = Math.floor(Math.random() * SalaCine[0].length);
        ReservarAsiento(SalaCine, filaAleatoria, columnaAleatoria);
      }
      ImprimirSalaCine(SalaCine); // deberia salir con las 10 reservas hechas
      break;
    case 3: //sala casi llena
      console.log("************** TEST 3: Sala casi llena *************");
      // hacer 65 reservas aleatorias
      for (let i = 0; i < 65; i++) {
        let filaAleatoria: number = Math.floor(Math.random() * SalaCine.length);
        let columnaAleatoria: number = Math.floor(Math.random() * SalaCine[0].length);
        ReservarAsiento(SalaCine, filaAleatoria, columnaAleatoria);
      }
      ImprimirSalaCine(SalaCine); // deberia salir con las 65 reservas hechas  
      break;
    case 4: //sala llena
      console.log("************** TEST 4: Sala llena *************");
      // hacer 80 reservas aleatorias
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 10; j++) {
          ReservarAsiento(SalaCine, i, j);
        }
      }
      ImprimirSalaCine(SalaCine); // deberia salir con la sala llena
  }

  let { ocupados, disponibles } = ContarAsientos(SalaCine);
  let asientosContiguos = BuscarDosAsientosContiguos(SalaCine);
  ReservarAsiento(SalaCine, 2, 3);  // deberia salir error porque el asiento ya esta ocupado
  ReservarAsiento(SalaCine, 10, 10); // deberia salir error porque el asiento no existe 

  console.log(`Asientos ocupados: ${ocupados}`);
  console.log(`Asientos disponibles: ${disponibles}`);

  if (asientosContiguos) {
    console.log(
      `Asientos contiguos libres encontrados: (${asientosContiguos.asiento1.fila}, ${asientosContiguos.asiento1.columna}) y (${asientosContiguos.asiento2.fila}, ${asientosContiguos.asiento2.columna})`
    );
    ReservarAsiento(SalaCine, asientosContiguos.asiento1.fila, asientosContiguos.asiento1.columna);
    ReservarAsiento(SalaCine, asientosContiguos.asiento2.fila, asientosContiguos.asiento2.columna);
  } else {
    console.log("No se encontraron dos asientos libres contiguos");
  }
} // cierre del for de los tests

  export { };
