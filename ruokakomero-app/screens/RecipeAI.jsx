import { OPENAI_API_KEY } from "react-native-dotenv";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getRecipe(query) {
  const prompt = `Olet mestarikokki, joka hallitsee sujuvan ja kieliopillisesti korrektin suomen kielen. Laadi reseptiehdotus annettujen tietojen perusteella seuraavassa JSON-muodossa:

{
  "name": "Ruokalajin nimi",
  "servingSize": "int",
  "ingredients": [
    { "name": "Ainesosan nimi, jos valkosipuli niin valkosipulinkynsi", "quantity": "määrä", "unit": "yksikkö lyhenteinä" }
  ],
  "instructions": [
    "Yksityiskohtaiset ja selkeät valmistusohjeet, joissa kerrotaan tarkasti, miten ruoka valmistetaan."
  ]
}

Käytä mahdollisimman tarkkoja määriä ja selkeitä valmistusohjeita. Älä kuitenkaan lisää valmistusohjeeseen numeroita. Tässä käyttäjän antamat tiedot: "${query}", jos käyttäjä valitsee kasviproteiinin tai vege/vegaani ruokavalion ÄLÄ laita reseptiin lihaa.
`;

    try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000, 
    });

    const cleanResponse = response.choices[0].message.content.trim();

    // tarkista, että vastaus on JSON-muodossa
    if (cleanResponse.startsWith("{") && cleanResponse.endsWith("}")) {
      try {
        const parsedRecipe = JSON.parse(cleanResponse);
        return parsedRecipe;
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        return null;
      }
    } else {
      console.error("Response is not valid JSON:", cleanResponse);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}