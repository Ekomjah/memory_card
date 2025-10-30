import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [poker, setPoker] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function pokerFetch() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=25",
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
            isHit: false,
          };
        });
        const result = await Promise.all(array);
        setPoker(result);

        console.log(result);
      } catch (err) {
        setError(true);
        console.log("Error, ", err);
      } finally {
        setLoading(false);
      }
    }

    pokerFetch();
  }, []);

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
  if (loading) {
    return <div className="loading"></div>;
  } else if (error) {
    return <h1 className="error">Error! NO INTERNET CONNECTION ESTABLISHED</h1>;
  }
  return (
    <>
      <div>
        <p>Counter: {counter}</p>
        <div className="card-parent">
          {!loading &&
            poker.map(({ name, image }) => (
              <div
                className="card"
                onClick={() => {
                  setCounter((count) => count + 1);
                  shuffle();
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
