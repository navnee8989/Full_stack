const axios = require("axios");

const FetchData = () => {
  let data = JSON.stringify({
    ticket_id: "8461450_8376",
    total_pax: "3",
    adult: "1",
    child: "1",
    infant: "1",
    adult_info: [
      {
        title: "Mr.",
        first_name: "navneet",
        last_name: "sondarva",
      },
    ],
    child_info: [
      {
        title: "Mstr..",
        first_name: "navneet",
        last_name: "sondarva",
      },
    ],
    infant_info: [
      {
        title: "Mstr..",
        first_name: "navneet",
        last_name: "sondarva",
      },
    ],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://omairiq.azurewebsites.net/book",
    headers: {
      "api-key":
        "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJqdGkiOiJmYzgxNGE2Mi01OGY0LTQ1ZTMtOWVkMy00NjBiYmNlYzY2ZDciLCJ1c2VyTmFtZSI6Ijk1NTUyMDIyMDIiLCJhcGlrZXkiOiJOVE16TkRVd01EcEJTVkpKVVNCVVJWTlVJRUZRU1RveE9Ea3hPVE13TURNMU9UazJPbEZSWWpoTFZqTkZNVzlVVjA1UlkxTldMMFZ0Y205VVlYRktUU3M1ZGtadmFIbzBSek00V1dod1REaHNhbU5xUjNwUE4xZEpTSGhWUTJwQ1N6TlJjVzA9IiwiZXhwIjoxNzE5Mzk1NTM4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU2MTczLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTYxNzMvIn0.JbrakL2J9JKOh0vdjYvQ4UpNzTcOzSC7nu-rCzm_FVk",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
