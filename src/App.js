import {useState} from 'react';
import './App.css';
import myImage from './car_photos/00001.webp';
import car from './data/data.json';

function App() {
  const options = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Mazda'];

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
    
    if (status === 1) return "circle circle-green";
    if (status === 2) return "circle circle-red";
    return "circle circle-white";
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is a prototype of cardle app
        </p> 
      </header>

      <main className="App-main">
        <section className='module'>
          <div className='headings'>
            <p className='heading'>{car.cont}</p>
            <p className='heading'>{car.body_type}</p>
            <p className='heading'>{car.gen}</p>            
          </div>
        </section>

        <div>
            <img src={myImage} alt="Description" className='fixed-viewport'/>
        </div>

        <section className='module'>
          <div className='headings'>
            <p className='heading'>Make</p>
            <p className='heading'>Model</p>
            <p className='heading'>Year</p>
          </div>


          {[0, 1, 2, 3, 4].map(rowIndex => (
            <div key={rowIndex} className="circles-container">
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

        <section>
          <p>Curent Score</p>
          <p>Final Score Multiplier</p>
        </section>

        {round < 5 && (
          <div className="form">
            <div>
              <div className="select">
                <input 
                  type="text" 
                  list="car-makes" 
                  placeholder="Make" 
                  autoComplete="off" 
                  className="select_input"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                />
                <datalist id="car-makes">
                  {options.map(option => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>
              
              <div className="select">
                <input 
                  type="text" 
                  placeholder="Model" 
                  autoComplete="off" 
                  className="select_input"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
              </div>
              
              <div className="select">
                <input 
                  type="number" 
                  placeholder="Year" 
                  autoComplete="off"
                  className="select_input"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              onClick={submitHandler}
              className="form_submit"
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
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
