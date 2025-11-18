import { useEffect, useState } from "react";

function App() {
  const [affirmations, setAffirmations] = useState([]);
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all affirmations on load
  useEffect(() => {
    fetch("/api/affirmations")
      .then((res) => res.json())
      .then((data) => {
        setAffirmations(data.affirmations || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching affirmations:", err);
        setLoading(false);
      });
  }, []);

  // Handle random affirmation button
  const getRandomAffirmation = () => {
    fetch("/api/affirmation")
      .then((res) => res.json())
      .then((data) => {
        setRandomAffirmation(data.affirmation);
      })
      .catch(console.error);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🌟 Affirmations
      </h1>

      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          background: "#f0f4ff",
          borderRadius: "10px",
          textAlign: "center",
          border: "1px solid #d0ddff",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>✨ Need a quick boost?</h2>
        <button
          onClick={getRandomAffirmation}
          style={{
            padding: "10px 20px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Get Random Affirmation
        </button>

        {randomAffirmation && (
          <p
            style={{
              marginTop: "15px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            "{randomAffirmation}"
          </p>
        )}
      </div>

      <h2>📜 All Affirmations</h2>

      {loading ? (
        <p>Loading affirmations...</p>
      ) : (
        <ul style={{ paddingLeft: "20px" }}>
          {affirmations.map((a, i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
