// Definición de tipos
export interface Team {
  id: string;
  nombre: string;
  abr: string;
  escudo: string;
  color: string;
  video: string;
  poster: string;
  presupuesto: string;
  nombrepresidente: string;
  imagenpresidente: string;
  nombreentrenador: string;
  imagenentrenador: string;
}

export interface ApiResponse {
  teams: Team[];
}

// Función asíncrona para leer los equipos desde la API
export async function getTeams(): Promise<Team[]> {
  try {
    const response = await fetch('http://www.ies-azarquiel.es/paco/apikl/team');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    return data.teams;
  } catch (error) {
    console.error('Error al leer los equipos:', error);
    throw error;
  }
}