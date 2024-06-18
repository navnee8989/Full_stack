// export const fetchAvailability = async (formDate) => {
//     try {
//       const { origin, destination } = formData;
//       const data = JSON.stringify({
//         origin: origin,
//         destination: destination,
//       });

//       const response = await axios.post("/availability", data, {
//         headers: {
//           "api-key":
//             "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
//           Authorization: `${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.data.data) {
//         toast.error("No tickets available for this route", {
//           position: "top-center",
//           transition: Bounce,
//         });
//         setAvailabilityDates([]);
//         setDisabledDates([]);
//       } else {
//         const dates = response.data.data;

//         // Format dates to YYYY-MM-DD for input[type="date"]
//         const formattedDates = dates.map((date) => formatDate(date));
//         console.log(formattedDates);
//         setAvailabilityDates(formattedDates);

//         // Calculate disabled dates
//         const allDates = formattedDates.map((date) => new Date(date));
//         const validDates = allDates.filter((date) =>!isNaN(date.getTime())); // Filter out invalid dates
//         const formattedDisabledDates = validDates.filter(
//           (date) =>!formattedDates.includes(formatDate(date))
//         );
//         setDisabledDates(formattedDisabledDates);
//       }
//     } catch (error) {
//       console.error("Error while fetching availability data", error);
//       toast.error("Error while fetching availability data");
//       setAvailabilityDates([]);
//       setDisabledDates([]);
//     }
//   };


// dateUtils.js
export const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };
  
  
  
  
  export const formatDatePayment = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    
    return [day, month, year].join('-');
  };
  
  export default { formatDate,formatDatePayment };
  