// Select all elements

const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// App Variables
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  dates = [],
  formatedDates = [];

// Get users country code
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach((country) => {
  if (country.code == country_code) {
    user_country = country.name;
  }
});

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

function fetchData(user_country) {
  country_name_element.innerHTML = "Loading...";
  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);
  fetch(
    `https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
        "x-rapidapi-key": "d72c4ab8cfmsh393bc7bb7f141a1p1e36adjsnae9ebe72c597",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      dates = Object.keys(data);

      dates.forEach((date) => {
        // console.log(date);
        let DATA = data[date];

        formatedDates.push(formatDate(date));

        app_data.push(DATA);
        cases_list.push(parseInt(DATA.total_cases.replace(/,/g, "")));
        recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g, "")));
        deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g, "")));
      });
    })
    .then(() => {
      updateUI();
    })

    .catch((err) => {
      console.log(err);
    });
}

fetchData(user_country);

function updateUI() {
  updateStats();
  axesLinearChar();
}

function updateStats() {
  let last_entry = app_data[app_data.length - 1];
  let before_last_entry = app_data[app_data.length - 2];

  country_name_element.innerHTML = last_entry.country_name;

  total_cases_element.innerHTML = last_entry.total_cases || 0;
  new_cases_element.innerHTML = `+${last_entry.new_cases || 0}`;

  recovered_element.innerHTML = last_entry.total_recovered || 0;
  new_recovered_element.innerHTML = `+${
    parseInt(last_entry.total_recovered.replace(/,/g, "")) -
    parseInt(before_last_entry.total_recovered.replace(/,/g, ""))
  }`;

  deaths_element.innerHTML = last_entry.total_deaths || 0;
  new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
}

// Update chart

let my_chart;
function axesLinearChar() {
  if (my_chart) {
    my_chart.destroy();
  }
  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "#fff",
          backgroundColor: "#fff",
          borderWidth: 0.5,
        },
        {
          label: "Recovered",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 0.5,
        },
        {
          label: "Deaths",
          data: deaths_list,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
          borderWidth: 0.5,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);
  return `${date.getDate()} ${monthsName[date.getMonth()]}`;
}
