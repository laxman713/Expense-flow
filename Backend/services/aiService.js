const { GoogleGenAI } = require("@google/genai");

console.log("Gemini API key loaded:", Boolean(process.env.GEMINI_API_KEY));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateCategory = async (title) => {
    try {
        const prompt = `
            I am building an expense tracker application.

            The expense title is: "${title}"

            Identify the most appropriate expense category.

            Return only one word representing the category.
            Do not provide any explanation or additional text.
        `;

        const response = await ai.models.generateContent({
            model: "gemma-4-26b-a4b-it",
            contents: prompt
        });

        const category = response.text.trim();
        console.log(category);
        return category;

    } catch (err) {
        console.log("AI categorization failed:", err.message);
         console.log("Error status:", err.status);
        console.log("Gemini failed:", err.message);
        return "Uncategorized";
    }
};
// const checkModels = async () => {
//     try {
//         const models = await ai.models.list();

//         for await (const model of models) {
//             console.log(model.name, model.supportedActions);
//         }

//     } catch (err) {
//         console.log(err.message);
//     }
// };

// checkModels();
generateCategory("Bought petrol").then(console.log);
module.exports = { generateCategory };