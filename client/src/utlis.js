const host = "http://localhost:5000";

// User API Routes
// export const registerUserRoute = `${host}/api/users/register`;
export const loginUserRoute = `${host}/api/auth/login`;
// export const fetchUserDetailsRoute = `${host}/api/users/details`;  // Change POST to GET in the route if possible
// export const updateUserRoute = `${host}/api/users/update/`;

// // Bike API Routes
export const registerBikeRoute = `${host}/api/bikes/register`;   // Add a bike
export const fetchAllBikesRoute = `${host}/api/bikes`;           // Get all bikes
export const fetchBikeByIdRoute = `${host}/api/bikes/`;          // Get a bike by ID
export const updateBikeRoute = `${host}/api/bikes/update/`;     // Update a bike by ID
export const deleteBikeRoute = `${host}/api/bikes/delete/`;     // Delete a bike by ID
