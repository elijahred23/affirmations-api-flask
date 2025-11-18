import { useEffect, useState } from "react";

function App() {
  const [tab, setTab] = useState("random");
  const [affirmations, setAffirmations] = useState([]);
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [loadingAll, setLoadingAll] = useState(true);

  // Fetch all affirmations on load
  useEffect(() => {
    fetch("/api/affirmations")
      .then((res) => res.json())
      .then((data) => {
        setAffirmations(data.affirmations || []);
        setLoadingAll(false);
      })
      .catch((err) => {
        console.error("Error fetching affirmations:", err);
        setLoadingAll(false);
      });
  }, []);

  // Fetch random affirmation
  const getRandomAffirmation = () => {
    fetch("/api/affirmation")
      .then((res) => res.json())
      .then((data) => {
        setRandomAffirmation(data.affirmation);
      })
      .catch(console.error);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Affirmations</h1>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setTab("random")}
          style={{
            ...styles.tabButton,
            ...(tab === "random" ? styles.activeTab : {}),
          }}
        >
          Random Affirmation
        </button>

        <button
          onClick={() => setTab("all")}
          style={{
            ...styles.tabButton,
            ...(tab === "all" ? styles.activeTab : {}),
          }}
        >
          All Affirmations
        </button>
      </div>

      {/* Random Affirmation Tab */}
      {tab === "random" && (
        <div style={styles.card}>
          <h2 style={styles.subtitle}>✨ Need Inspiration?</h2>

          <button onClick={getRandomAffirmation} style={styles.button}>
            Get Affirmation
          </button>

          {randomAffirmation && (
            <p style={styles.randomText}>"{randomAffirmation}"</p>
          )}
        </div>
      )}

      {/* All Affirmations Tab */}
      {tab === "all" && (
        <div style={styles.card}>
          <h2 style={styles.subtitle}>📜 All Affirmations</h2>

          {loadingAll ? (
            <p>Loading affirmations...</p>
          ) : (
            <ul style={styles.list}>
              {affirmations.map((a, i) => (
                <li key={i} style={styles.listItem}>
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

/* ---------------------------------------------------------
   Inline Styles (Modern, Clean)
---------------------------------------------------------- */
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "38px",
    fontWeight: "800",
    color: "#333",
  },

  tabContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
    gap: "10px",
  },

  tabButton: {
    padding: "12px 22px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f8f8f8",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.2s",
  },

  activeTab: {
    background: "#4f46e5",
    color: "white",
    borderColor: "#4f46e5",
  },

  card: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "25px",
    border: "1px solid #eee",
  },

  subtitle: {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "22px",
    fontWeight: "600",
  },

  button: {
    padding: "12px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
  },

  randomText: {
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: "1.5",
    color: "#333",
  },

  list: {
    paddingLeft: "20px",
    maxHeight: "420px",
    overflowY: "auto",
  },

  listItem: {
    marginBottom: "10px",
    fontSize: "17px",
  },
};
