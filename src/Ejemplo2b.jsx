import { useState, useEffect } from 'react';
import { TeamCard } from './components/TeamCard';
import { getTeams } from './lectura';

export function Ejemplo2b() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favouriteTeams, setFavouriteTeams] = useState(() => {
    const saved = localStorage.getItem('favouriteTeams');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    localStorage.setItem('favouriteTeams', JSON.stringify(favouriteTeams));
  }, [favouriteTeams]);

  return (
    <div className="container-fluid p-0 min-vh-100">
      <section className="title-section">
        <h1>Kings League</h1>
        <p>Explora los equipos oficiales de la liga más emocionante del mundo</p>
      </section>

      <main>
        <div className="main-grid">
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted">Cargando equipos...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger mx-3" role="alert">
              Error: {error}
            </div>
          ) : (
            teams.map((team) => (
              <div key={team.id}>
                <TeamCard team={team} favouriteTeams={favouriteTeams} setFavouriteTeams={setFavouriteTeams} />
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="text-center p-5 text-muted">
        <p>&copy; 2026 Kings League Fantasy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
