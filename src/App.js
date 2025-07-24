import logo from './logo.svg';
import './App.css';
import myImage from './car_photos/00001.webp'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is a prototype of cardle app
        </p> 
      </header>
      <main className="App-main">
        <div>
          <p>
            <img src={myImage} alt="Description" className='fixed-viewport'/>
          </p>
        </div>
        <div>
          <p>
            guess check status
          </p>
        </div>
        <div>
          <p>
            form input
          </p>
        </div>
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
