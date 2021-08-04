import React, { 
  useCallback,
  useEffect,
  useState,
} from 'react';
import { 
  Observable, 
  Subject 
} from 'rxjs';
import './styles/App.scss';
import setTimeFormat from './utils/timeFormattingUtil';

function App() {
  let clicked = false;
  let timeout;

  const [state, setState] = useState('stop');
  const [time, setTime] = useState(0);

  const start = () => {
    setState('start');
  };

  const stop = useCallback(() => {
    setTime(0);
    setState('stop');
  }, []);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  const wait = useCallback(() => {
    if (clicked) {
      clicked = false;
      clearTimeout(timeout);
      setState('wait');
      return;
    }
    clicked = true;
    timeout = setTimeout(() => {
      clicked = false;
    }, 300);
    
  }, []);

  useEffect(() => {
    const timer$ = new Observable((observer) => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(count += 1);
        console.log(count);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });

    const subscribtion$ = timer$
      .subscribe({
        next: () => {
          if (state === 'start') {
            setTime((prev) => prev + 1);
          }
        },
      });

    return (() => {
      subscribtion$.unsubscribe();
    });
  }, [state]);

  return (
    <div className="App">
      <header>
        <h1 className="title">
          Stopwatch
        </h1>
        
        <div className="display">
          {setTimeFormat(time)}
        </div>
      </header>
      <div className = "timer-buttons">
        <button className="start-button" onClick={start} >
          Start
        </button>
        <button className="stop-button" onClick={stop}>
          Stop
        </button>
        <button className="wait-button" onClick={wait} >
          Wait
        </button>
        <button className="reset-button" onClick={reset} >
          Reset
        </button>
      </div>
      
      <footer>
        <p><i>2021 by Pranovych Anastasiia</i></p>
      </footer>
    </div>
  );
}

export default App;