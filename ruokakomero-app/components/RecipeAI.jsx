import { OpenAI } from "openai";
import { OPENAI_API_KEY } from "../constants/config";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getRecipe(query) {
  const prompt = `Olet mestarikokki. Laadi reseptiehdotus annettujen tietojen perusteella seuraavassa JSON-muodossa:

  {
    "name": "Ruokalajin nimi",
    "ingredients": [
      { "name": "Ainesosan nimi", "quantity": "määrä", "unit": "yksikkö" }
    ],
    "instructions": [
      "Vaihe 1",
      "Vaihe 2"
    ]
  }

  Käytä mahdollisimman tarkkoja määriä ja yksityiskohtaisia valmistusohjeita. Tässä käyttäjän antama tieto: "${query}".`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    response_format: "json",
  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
    return null;
  }
}
