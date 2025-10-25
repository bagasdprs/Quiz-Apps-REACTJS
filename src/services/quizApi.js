import axios from "axios";

export const getQuizQuestions = async (amount = 5, type = "multiple") => {
  const url = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
  try {
    const { data } = await axios.get(url);
    console.log(`Fetched ${data.results.length} questions`);

    return data.results;
  } catch (error) {
    console.error("Error fetching quiz questions: ", error);
    return [];
  }
};
