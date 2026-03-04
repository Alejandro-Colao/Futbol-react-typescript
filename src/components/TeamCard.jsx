import { useState } from 'react';

export function TeamCard({ team, favouriteTeams, setFavouriteTeams }) {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setExpandedAccordion(expandedAccordion === section ? null : section);
  };

  const toggleFavourite = () => {
    if (favouriteTeams.includes(team.id)) {
      setFavouriteTeams(favouriteTeams.filter(id => id !== team.id));
    } else {
      setFavouriteTeams([...favouriteTeams, team.id]);
    }
  };

  const isFavourite = favouriteTeams.includes(team.id);

  return (
    <div className="glass-card h-100 d-flex flex-column">
      <div className="position-relative p-4 text-center">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: `linear-gradient(135deg, ${team.color}22 0%, transparent 100%)`,
            zIndex: 0
          }}
        />
        <img
          src={team.escudo}
          alt={team.nombre}
          className="img-fluid mb-3 position-relative"
          style={{ maxHeight: '120px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))' }}
        />
        <h3 className="mb-2 position-relative" style={{ color: team.color }}>
          {team.nombre}
        </h3>
        <button
          className={`btn-premium position-relative ${isFavourite ? 'btn-primary-gradient' : 'btn-outline-light'}`}
          onClick={toggleFavourite}
          style={!isFavourite ? { background: 'transparent', border: '1px solid var(--glass-border)', color: 'white' } : {}}
        >
          {isFavourite ? '★ En Favoritos' : '☆ Favorito'}
        </button>
      </div>

      <div className="accordion accordion-flush flex-grow-1" id={`accordion-${team.id}`}>
        {/* Video Section */}
        <div className="accordion-item bg-transparent border-top border-white-10">
          <h2 className="accordion-header">
            <button
              className={`accordion-button bg-transparent text-white shadow-none ${expandedAccordion !== 'video' ? 'collapsed' : ''}`}
              type="button"
              onClick={() => toggleAccordion('video')}
            >
              Video Oficial
            </button>
          </h2>
          {expandedAccordion === 'video' && (
            <div className="accordion-body p-0 overflow-hidden">
              <video width="100%" controls className="d-block">
                <source src={team.video} type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {/* Poster Section */}
        <div className="accordion-item bg-transparent border-top border-white-10">
          <h2 className="accordion-header">
            <button
              className={`accordion-button bg-transparent text-white shadow-none ${expandedAccordion !== 'poster' ? 'collapsed' : ''}`}
              type="button"
              onClick={() => toggleAccordion('poster')}
            >
              Poster del Equipo
            </button>
          </h2>
          {expandedAccordion === 'poster' && (
            <div className="accordion-body text-center p-3">
              <img src={team.poster} alt="Poster" className="img-fluid rounded" style={{ maxHeight: '300px' }} />
            </div>
          )}
        </div>

        {/* President Section */}
        <div className="accordion-item bg-transparent border-top border-white-10">
          <h2 className="accordion-header">
            <button
              className={`accordion-button bg-transparent text-white shadow-none ${expandedAccordion !== 'presidente' ? 'collapsed' : ''}`}
              type="button"
              onClick={() => toggleAccordion('presidente')}
            >
              Presidente
            </button>
          </h2>
          {expandedAccordion === 'presidente' && (
            <div className="accordion-body text-center p-4">
              <img
                src={team.imagenpresidente}
                alt={team.nombrepresidente}
                className="rounded-circle mb-3 border border-2 border-warning"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h5 className="text-white mb-0">{team.nombrepresidente}</h5>
              <p className="small text-muted mb-0">Líder del Proyecto</p>
            </div>
          )}
        </div>

        {/* Coach Section */}
        <div className="accordion-item bg-transparent border-top border-white-10">
          <h2 className="accordion-header">
            <button
              className={`accordion-button bg-transparent text-white shadow-none ${expandedAccordion !== 'entrenador' ? 'collapsed' : ''}`}
              type="button"
              onClick={() => toggleAccordion('entrenador')}
            >
              Cuerpo Técnico
            </button>
          </h2>
          {expandedAccordion === 'entrenador' && (
            <div className="accordion-body text-center p-4">
              <img
                src={team.imagenentrenador}
                alt={team.nombreentrenador}
                className="rounded-circle mb-3 border border-2 border-info"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h5 className="text-white mb-0">{team.nombreentrenador}</h5>
              <p className="small text-muted mb-0">Director Técnico</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="accordion-item bg-transparent border-top border-white-10">
          <h2 className="accordion-header">
            <button
              className={`accordion-button bg-transparent text-white shadow-none ${expandedAccordion !== 'info' ? 'collapsed' : ''}`}
              type="button"
              onClick={() => toggleAccordion('info')}
            >
              Estadísticas y Más
            </button>
          </h2>
          {expandedAccordion === 'info' && (
            <div className="accordion-body p-4 text-muted small">
              <div className="d-flex justify-content-between mb-2">
                <span>Presupuesto</span>
                <span className="text-white fw-bold">{team.presupuesto}M €</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Abreviatura</span>
                <span className="text-white fw-bold">{team.abr}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .accordion-button::after {
          filter: invert(1);
        }
        .border-white-10 {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}} />
    </div>
  );
}
