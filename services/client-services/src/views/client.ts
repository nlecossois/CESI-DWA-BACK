import axios from "axios";

export async function getUser(userId: string) {
  try {
    const response = await axios.get(`http://nginx/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}