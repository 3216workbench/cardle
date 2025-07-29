import { useState } from 'react';

function App() {
  const options = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Mazda'];
  
  // Mock car data since the JSON import isn't available
  const car = {
    make: 'Toyota',
    model: 'Camry',
    yearBot: 2018,
    yearTop: 2022,
    cont: 'Asia',
    body_type: 'Sedan',
    gen: '8th Gen'
  };

  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  
  // Convert to React state
  const [check, setCheck] = useState([false, false, false]);
  const [score, setScore] = useState([
    [" ", 0, " ", 0, " ", 0],
    [" ", 0, " ", 0, " ", 0],
    [" ", 0, " ", 0, " ", 0],
    [" ", 0, " ", 0, " ", 0],
    [" ", 0, " ", 0, " ", 0],
  ]);
  const [round, setRound] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (round >= 5) return; // Prevent going beyond 5 rounds
    
    const newCheck = [...check];
    const newScore = score.map(row => [...row]); // Deep copy
    const yearNum = parseInt(carYear);
    
    // Check make
    if (carMake === car.make) {
      newCheck[0] = true;
      newScore[round][0] = car.make;
      newScore[round][1] = 1;
    } else {
      newScore[round][0] = carMake;
      newScore[round][1] = 2;
    }
    
    // Check model
    if (carModel === car.model) {
      newCheck[1] = true;
      newScore[round][2] = car.model;
      newScore[round][3] = 1;
    } else {
      newScore[round][2] = carModel;
      newScore[round][3] = 2;
    }
    
    // Check year
    if (yearNum >= car.yearBot && yearNum <= car.yearTop) {
      newCheck[2] = true;
      newScore[round][4] = `${car.yearBot}-${car.yearTop}`;
      newScore[round][5] = 1;
    } else {
      newScore[round][4] = carYear;
      newScore[round][5] = 2;
    }
    
    // Update state
    setCheck(newCheck);
    setScore(newScore);
    setRound(round + 1);
    setCarMake("");
    setCarModel("");
    setCarYear("");
  };

  const getCellClass = (rowIndex, statusIndex) => {
    const status = score[rowIndex][statusIndex];
    
    if (status === 1) return "h-12 w-full rounded flex items-center justify-center text-sm font-medium bg-green-500 text-white";
    if (status === 2) return "h-12 w-full rounded flex items-center justify-center text-sm font-medium bg-red-500 text-white";
    return "h-12 w-full rounded flex items-center justify-center text-sm font-medium bg-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cardle Game</h1>
        <p className="text-gray-600">This is a prototype of cardle app</p>
      </header>
      
      <main className="max-w-2xl mx-auto">
        <section className="bg-white rounded-lg p-4 mb-6 shadow">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-semibold">Continent</p>
              <p className="text-blue-600">{car.cont}</p>
            </div>
            <div>
              <p className="font-semibold">Body Type</p>
              <p className="text-blue-600">{car.body_type}</p>
            </div>
            <div>
              <p className="font-semibold">Generation</p>
              <p className="text-blue-600">{car.gen}</p>
            </div>
          </div>
        </section>

        <div className="bg-gray-200 h-48 mb-6 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">Car Image Placeholder</p>
        </div>

        <section className="bg-white rounded-lg p-4 mb-6 shadow">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <p className="font-semibold">Make</p>
            <p className="font-semibold">Model</p>
            <p className="font-semibold">Year</p>
          </div>
          
          {[0, 1, 2, 3, 4].map(rowIndex => (
            <div key={rowIndex} className="grid grid-cols-3 gap-4 mb-2">
              <div className={getCellClass(rowIndex, 1)}>
                {score[rowIndex][0]}
              </div>
              <div className={getCellClass(rowIndex, 3)}>
                {score[rowIndex][2]}
              </div>
              <div className={getCellClass(rowIndex, 5)}>
                {score[rowIndex][4]}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-lg p-4 mb-6 shadow">
          <p className="text-center">Round: {round}/5</p>
          <p className="text-center">Correct: {check.filter(c => c).length}/3</p>
        </section>

        {round < 5 && (
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input 
                  type="text" 
                  list="car-makes" 
                  placeholder="Make" 
                  autoComplete="off" 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                />
                <datalist id="car-makes">
                  {options.map(option => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Model" 
                  autoComplete="off" 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
              </div>
              
              <div>
                <input 
                  type="number" 
                  placeholder="Year" 
                  autoComplete="off"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              onClick={submitHandler}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors font-medium"
              disabled={!carMake || !carModel || !carYear}
            >
              Submit Guess
            </button>
          </div>
        )}

        {round >= 5 && (
          <div className="bg-white rounded-lg p-6 shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-lg">You got {check.filter(c => c).length} out of 3 correct!</p>
            <p className="mt-2">The car was: {car.make} {car.model} ({car.yearBot}-{car.yearTop})</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;