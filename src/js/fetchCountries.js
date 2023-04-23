export default function fetchCountries(name) {
  const addressURL = 'https://restcountries.com/v3.1/name/';
  const options = '?fields=name,capital,population,flags,languages';
  return fetch(`${addressURL}${name}${options}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
