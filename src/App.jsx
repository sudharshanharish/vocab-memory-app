import { useState,useEffect } from "react"
import Challenge from "./components/layouts/Challenge"
import Dashboard from "./components/layouts/Dashboard"
import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import WORDS from "./utils/VOCAB.json"
import { countdownIn24Hours, getWordByIndex, PLAN } from "./utils"
function App() {

  const [selectedPage,setSelectedPage] = useState(0);
   const [favorites, setFavorites] = useState([]);

  //const selectedPage = 2; // 0 welcome , 1 for dashboard , 2 for challenge
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [datetime,setDatetime] = useState(null)
  const [history, setHistory] = useState({})
  const [attempts, setAttempts] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  
  const daysWords = PLAN[day].map((idx)=>{
    return getWordByIndex(WORDS, idx).word
  })
    console.log(daysWords);

  function handleChangePage(pageIndex) {
      setSelectedPage(pageIndex)
  }

  function handleCreateAccount(){
    if(!name) { return }
    localStorage.setItem('username', name)
    handleChangePage(1)
  }

  function handleCompleteDay() {
      const newDay = day + 1;
      const newDatetime = Date.now()
      setDay(newDay)
      setDatetime(newDatetime)

      localStorage.setItem('day',JSON.stringify({
        day: newDay,datetime: newDatetime
      }))
      setSelectedPage(1)
  }

  function handleIncrementAttempts(){
    // take the current attmept numbers to save in local storage
  
    const newRecord = attempts + 1
    localStorage.setItem('attempts', newRecord)
    setAttempts(newRecord)
  }
  useEffect(() => {
    
    //callback function is triggered on page load
    if(!localStorage) { return } 
    if(localStorage.getItem('username')) {
        // if we find the item (so get item returns something),
        setName(localStorage.getItem('username'))
      
          //since we have a name , skipping to dashboard page
          setSelectedPage(1)

    }
    if(localStorage.getItem('attempts')) {
      // got the attempts
      let data = parseInt(localStorage.getItem('attempts'))
      setAttempts(data);
    }

    if(localStorage.getItem('history')){
      setHistory(JSON.parse(localStorage.getItem('history')))
    }

    if(localStorage.getItem('day')){
     // destruscturing object from localstorage
      const {day : d, datetime: dt } = JSON.parse
      (localStorage.getItem('day'))
      setDatetime(dt)
      setDay(d)
      if(d >1 && dt){
          const diff = countdownIn24Hours(dt)
          if(diff < 0){
            console.log("failed the challenge")
            let newHistory = {...history}
            const timestamp = new Date(dt)
            const formattedTimestamp = timestamp.
            toString().split(' ').slice(1,4).join(' ')
            newHistory[formattedTimestamp] = d;
            setHistory(newHistory)
            setDay(1)
            setDatetime(null)
            setAttempts(0)

            localStorage.setItem('attempts', 0)
            localStorage.setItem('history', JSON.stringify(newHistory))
            localStorage.setItem('day',JSON.stringify({day : 1, datetime : null}))
          }
      }
    }

  }, [])

  // Load favorites on app start
useEffect(() => {
  const savedFavorites = localStorage.getItem("favorites");

  if (savedFavorites) {
    setFavorites(JSON.parse(savedFavorites));
  }

  setIsLoaded(true); //  mark as loaded
}, []);

// Save favorites whenever they change
useEffect(() => {
  if (!isLoaded) return; //  prevent overwrite on first load

  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites, isLoaded]);


  const pages = {
    0: <Welcome handleCreateAccount={handleCreateAccount} 
    username="hello world" name={name} setName={setName} />,
    1: <Dashboard name={name} history={history} attempts={attempts} day ={day} PLAN={PLAN}
    handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime} favorites={favorites}
  setFavorites={setFavorites} setSelectedWord={setSelectedWord}/>,
    2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} 
        handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}
        favorites={favorites} setFavorites={setFavorites}
        selectedWord={selectedWord}
  setSelectedWord={setSelectedWord}/>
  }



  return (
    
    
      <Layout>
         {pages[selectedPage]}

      </Layout>
    
  )
}

export default App
