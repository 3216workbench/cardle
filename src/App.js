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
            <img src={myImage} alt="Description" className='fixed-viewport'/>
        </div>
        <section className='scoreboard'>
          <div className='scoreboard_headings'>
            <p className='scoreboard_heading'>Make</p>
            <p className='scoreboard_heading'>Model</p>
            <p className='scoreboard_heading'>Year</p>
          </div>
          <div className="circles-container">
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
          </div>
          <div className="circles-container">
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
          </div>
          <div className="circles-container">
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
          </div>
          <div className="circles-container">
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
          </div>
          <div className="circles-container">
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
            <div className="circle circle-white"></div>
          </div>
        </section>
        <section>
          <p>Curent Score</p>
          <p>Final Score Multiplier</p>
        </section>
        <form className='form'>
          <div className='select'>
            <input type='text' placeholder='Make' autoComplete='off' className='select_input'></input>
          </div>
          <div className='select'>
            <input type='text' placeholder='Model' autoComplete='off' className='select_input'></input>
          </div>
          <div className='select'>
            <input type='text' placeholder='Year' autoComplete='off'className='select_input'></input>
          </div>
          <button type='submit' className='form_submit'>Submit</button>
        </form>
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
