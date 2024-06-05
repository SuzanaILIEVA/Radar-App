

export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
      bl_lat: '34.004837',
      bl_lng: '24.156199',
      tr_lat: '43.547548',
      tr_lng: '44.417484',
      limit: '300'
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };
  

  
