const setTimeFormat = (totalTime) => {
    
    const sec = (totalTime % 60);
    const min = Math.floor(totalTime / 60);
    const hours = Math.floor(totalTime / 3600);
      
    const formatedSeconds = (sec < 10) ? `0${sec}` : `${sec}`;
    const formatedMinutes = (min > 60) ? 
                            ((min-60*hours < 10) ? `0${min-60*hours}` : `${min-60*hours}`) : 
                            ((min < 10) ? ((min === 0) ? `00` : `0${min}`) : `${min}`) ;  
    const formatedHours = (hours < 1) ? '00' : (hours > 0 && hours < 10) ? `0${hours}` : `${hours}`;

    return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
  };
  
  export default setTimeFormat;
  
  