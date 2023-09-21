const accessKey =
 "vl0vp9juHWjPCXRyx8nROQXrjUpnudmHOYYdVlmyLOk";

// Define the API endpoint
const apiUrl =
 "https://api.unsplash.com/photos?page=1&per_page=20&client_id=" +
 accessKey;

// Fetch data from the API and log the result
export const resultData = () => {
 return fetch(apiUrl)
  .then((response) => {
   if (!response.ok) {
    throw new Error(
     "Network response was not ok"
    );
   }
   return response.json();
  })
  .then((data) => {
   return data;
  })
  .catch((error) => {
   console.error("Error fetching images:", error);
   throw error; // Rethrow the error to be handled later if needed
  });
};
