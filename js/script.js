let data = [],
  cases = [],
  recovered = [],
  deaths = [],
  dates = [];

const countryNameElement = document.querySelector('.country');
const totalCasesElement = document.querySelector('.total-cases .details-cases');
const newCasesElement = document.querySelector(
  '.total-cases .details-cases-add'
);
const recoveredCasesElement = document.querySelector(
  '.recovered .details-recovered'
);
const newRecoveredElement = document.querySelector(
  '.recovered .details-recovered-add'
);
const deathCasesElement = document.querySelector('.deaths .details-deaths');
const newDeathsElement = document.querySelector('.deaths .details-deaths-add');

const ctx = document.getElementById('myChart-1').getContext('2d');
const ctx2 = document.getElementById('myChart-2').getContext('2d');
const ctx3 = document.getElementById('myChart-3').getContext('2d');

let countryCode;
let country = 'India';

let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
let todayDate = `${year}-${month}-${day}`;
let lastMonthDate = new Date(currentDate.getFullYear(), 0, 0)
  .toISOString('en-US')
  .replaceAll('/', '-');
let lastMonthDateFormat = lastMonthDate.substring(
  0,
  lastMonthDate.lastIndexOf('T')
);

function fetchData(userCountry) {
  country = userCountry;

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const fetchApi = async (userCountry) => {
    await fetch(
      `https://api.covid19api.com/total/country/${userCountry}/status/confirmed`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        result.forEach((DATA) => {
          dates.push(DATA.Date.substring(0, lastMonthDate.lastIndexOf('T')));
          cases.push(DATA.Cases);
          recovered.push;
        });
      });
    await fetch(
      `https://api.covid19api.com/total/country/${userCountry}/status/recovered`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        result.forEach((DATA) => {
          recovered.push(DATA.Cases);
        });
      });

    await fetch(
      `https://api.covid19api.com/total/country/${userCountry}/status/deaths`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        result.forEach((DATA) => {
          deaths.push(DATA.Cases);
        });
      });
    updateData();
    chart();
  };

  fetchApi(userCountry);
}
fetchData(country);

function updateData() {
  const totalCases = cases[cases.length - 1];
  const newTotalCases = totalCases - cases[cases.length - 2];

  const totalRecovered = recovered[recovered.length - 1];
  const newTotalRecovered = totalRecovered - recovered[recovered.length - 2];

  const totalDeaths = deaths[deaths.length - 1];
  const newTotalDeaths = totalDeaths - deaths[deaths.length - 2];

  countryNameElement.innerHTML = country;
  totalCasesElement.innerHTML = totalCases;
  newCasesElement.innerHTML = newTotalCases;
  recoveredCasesElement.innerHTML = totalRecovered;
  newRecoveredElement.innerHTML = newTotalRecovered;
  deathCasesElement.innerHTML = totalDeaths;
  newDeathsElement.innerHTML = newTotalDeaths;
}

let myChart1, myChart2, myChart3;
function chart() {
  if (myChart1 || myChart2 || myChart3) {
    myChart1.destroy();
    myChart2.destroy();
    myChart3.destroy();
  }

  myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Cases',
          data: cases,
          backgroundColor: 'rgba(78, 78, 78, 0.5)',
          borderColor: '#000',
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Recovered',
          data: recovered,
          backgroundColor: 'rgba(62, 158, 2, 0.5)',
          borderColor: '#3d9e02',
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Deaths',
          data: deaths,
          backgroundColor: 'rgba(207, 0, 0, 0.5)',
          borderColor: '#cf0000',
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

