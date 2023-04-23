import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  const isFilled = inputSearch.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (isFilled) {
    fetchCountries(isFilled)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.',
            {
              timeout: 2000,
            }
          );
          return;
        }
        markup(data);
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          timeout: 2000,
        });
        console.log(err);
      });
  }

  function markup(data) {
    const markupData = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li><img src="${svg}" alt="${official}" width='50' height='30'/>${official}</li>`;
      })
      .join('');

    if (data.length === 1) {
      const languages = Object.values(data[0].languages).join(', ');
      const markupInfo = `<ul>
      <li>Capital: ${data[0].capital}</li>
      <li>Population: ${data[0].population}</li>
      <li>Languages: ${languages}</li>
    </ul>`;
      countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
    }
    return countryList.insertAdjacentHTML('afterbegin', markupData);
  }
}
