import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [poker, setPoker] = useState([0]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(false);
  const [highScore, setHighScore] = useState([0]);
  useEffect(() => {
    async function pokerFetch() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=40",
        );

        if (!response.ok) {
          setError(true);
        }
        const data = await response.json();
        const array = data.results.map(async ({ url }) => {
          const subResponse = await fetch(url);

          if (!subResponse.ok) {
            setError(true);
          }
          const subData = await subResponse.json();
          return {
            name: subData.name,
            image: subData.sprites.other["official-artwork"].front_default,
            sound: subData.cries.latest,
            isHit: false,
          };
        });
        const result = await Promise.all(array);
        const randomizedArr = result.slice();
        let currentIndex = randomizedArr.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [randomizedArr[currentIndex], randomizedArr[randomIndex]] = [
            randomizedArr[randomIndex],
            randomizedArr[currentIndex],
          ];
        }
        setPoker(randomizedArr);
      } catch (err) {
        setError(true);
        console.log("Error, ", err);
      } finally {
        setLoading(false);
      }
    }

    pokerFetch();
  }, []);

  function audioPlay(url) {
    const audio = new Audio(url);
    audio.play();
    return audio;
  }

  function shuffle() {
    const array = poker.slice();
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
      setPoker(array);
    }
  }
  function isGameOver(cardName) {
    if (
      counter === poker.length - 1 ||
      poker[poker.findIndex(({ name }) => name === cardName)].isHit
    ) {
      setHighScore((prev) => [...prev, counter]);
      setCounter(0);
      setPoker((prevPoker) =>
        prevPoker.map((poke) => ({ ...poke, isHit: false })),
      );
    } else {
      setPoker((prevPoker) =>
        prevPoker.map((poke) =>
          poke.name === cardName ? { ...poke, isHit: true } : poke,
        ),
      );
      setCounter((counter) => counter + 1);
    }
  }
  if (loading) {
    return <div className="loading"></div>;
  } else if (error) {
    return <h1 className="error">Error! NO INTERNET CONNECTION ESTABLISHED</h1>;
  }
  return (
    <>
      <h1>Poke Memory Card Game</h1>
      <div>
        <div className="flex-score">
          <p className="score">Score: {counter}</p>
          <p className="high-score">Highest Score: {Math.max(...highScore)}</p>
        </div>
        <div className="card-parent">
          {!loading &&
            poker.map(({ name, image, sound }) => (
              <div
                className="card"
                onClick={() => {
                  audioPlay(sound);
                  shuffle();
                  isGameOver(name);
                }}
              >
                <img className="card-img" src={image} alt={name} />
                <p className="card-text">{name.toUpperCase()}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
