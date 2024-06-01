document.querySelector(".btn").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("answer").innerHTML = "";
  const inputcity = document.querySelector("#input-city").value;
  const nowCities = [
    "Pakistan",
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Hyderabad",
    "Abbottabad",
    "Bahawalpur",
    "Sargodha",
    "Sukkur",
    "Larkana",
    "Sheikhupura",
    "Jhang",
    "Rahim Yar Khan",
    "Gujrat",
    "london",
    "paris",
    "berlin",
    "delhi",
    "moscow",
    "newyork",
    "dubai",
    "mumbai",
    "shanghai",
    "riyadh",
    "seoul",
    "tokyo",
    "dhaka",
    "tehran",
    "istanbul",
    "US",
    "UK",
    "Saudia",
    "Canada",
    "America"
  ];
  if (!nowCities.includes(inputcity)) {
    document.getElementById("answer").innerHTML =
      "Plese enter correct city name!!.";
    return;
  }

  let date = new Date().toISOString().slice(0, 10);
  const apiAnswer = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${inputcity}&country=Pakistan`;

  fetch(apiAnswer)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        let timings = data.data.timings;
        let prayerTimes = `
        Fajr: ${timings.Fajr}<br><hr/>
        Dhuhr: ${timings.Dhuhr}<br><hr/>
        Asr: ${timings.Asr}<br><hr/>
        Maghrib: ${timings.Maghrib}<br><hr/>
        Isha: ${timings.Isha}<hr/>
      `;
        document.getElementById(
          "answer"
        ).innerHTML = `Date Of ${inputcity} (${date})<br>${prayerTimes}`;
      } else {
        document.getElementById(
          "answer"
        ).innerHTML = `Sorry, could not find prayer timings for ${inputcity} (${date})`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data", error);
      document.querySelector("#answer").innerHTML = `Error: ${error.message}`;
    });
});
