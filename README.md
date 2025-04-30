# Ruokakomero-App

Ruokakomero-sovellus on mobiilisovellus, joka auttaa käyttäjiä seuraamaan ruokakaappien sisältöä, jakamaan tiedot ruokakunnan kesken ja hyödyntämään tekoälypohjaista chatbotia reseptivinkkien saamiseksi.

---

## Sisällysluettelo

1. [Johdanto](#Johdanto) 
2. [Järjestelmän määrittely](#järjestelmän-määrittely)
   - [Käyttäjäryhmät](#käyttäjäryhmät) 
   - [Käyttötapaukset ja käyttäjätarinat](#käyttötapaukset-ja-käyttäjätarinat) 
3. [Asennusohjeet](#asennusohjeet) 
4. [Käyttöliittymä](#käyttöliittymä) 
   - [Käyttöliittymäkaavio](#käyttöliittymäkaavio)
   - [Käyttöliittymän näkymät](#käyttöliittymän-näkymät)
5. [Tietokanta](#tietokanta) 
   - [Tietokantakaavio](#tietokantakaavio)
   - [Tietohakemisto](#tietohakemisto)
6. [REST API dokumentaatio](#rest-api-dokumentaatio) 
   - [Myyntitapahtumien API-dokumentaatio](#myyntitapahtumien-api-dokumentaatio)
   - [Ruokien (Items) API-pyynnöt](#ruokien-items-api-pyynnöt)
   - [Ruokakunnan API-pyynnöt](#ruokakunnan-api-pyynnöt)
7. [AI toiminnallisuuden tekninen kuvaus](#ai-toiminnallisuus)
8. [Autentikointi](#käyttäjän-autentikointi) 
9. [Käyttöoikeudet](#käyttöoikeudet)
10. [Testaus](#testaus) 
11. [Julkaisu](#julkaisu)  
12. [Kehitystiimi](#kehitystiimi) 


---

## 1. Johdanto

Ruokakomero-sovellus on suunniteltu helpottamaan reseptien löytämistä ja ostoslistan luomista käyttäjäystävällisellä ja pelillistetyllä lähestymistavalla. Sen tavoitteena on tarjota yksilöllisiä reseptisuosituksia käyttäjän mieltymysten ja ravitsemuksellisten tarpeiden mukaisesti.

Sovellus ohjaa käyttäjää reseptin valinnassa interaktiivisen käyttöliittymän avulla. Käyttäjä voi valita haluamansa hiilihydraatin, proteiinin ja annoskoon flashcard-tyylisellä valinnalla sekä säätää ruoan ravitsemuspitoisuutta liukusäätimellä. Näiden valintojen perusteella tekoäly ehdottaa sopivia reseptejä. Mikäli saatavilla, resepteissä esitetään myös ravintoarvotiedot.

Kun käyttäjä valitsee reseptin, sovellus luo siitä automaattisesti ostoslistan. Käyttäjä voi merkitä ostoslistalta jo olemassa olevat ainesosat, jolloin ne poistuvat listalta.

---


## 2. Järjestelmän määrittely

### Käyttäjäryhmät
- **Yksittäiset käyttäjät:** Sovelluksen käyttäminen henkilökohtaiseen tarpeeseen.

### Käyttötapaukset ja käyttäjätarinat
[Käyttäjätarinat ja niiden hyväksymiskriteerit](https://github.com/orgs/Ruokakomero/projects/1/views/1)


### Prosessikaavio ###
[Prosessikaavio](https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/Ruokakomero%20-%20prosessikaavio.pdf)
[Visio-linkki](https://haagahelia.sharepoint.com/:u:/r/teams/Ruokakomero-app/Jaetut%20asiakirjat/General/Ruokakomero%20-%20prosessikaavio.vsdx?d=wfd6c54846e4d46f2a6eec9b496f97940&csf=1&web=1&e=w1INfS)

---

## Käytetyt teknologiat
[![JavaScript][javascript-logo]][javascript-url]
[![React Native][react-native-logo]][react-native-url]
[![GitHub][github-logo]][github-url]
[![Expo Go][expo-logo]][expo-url]
[![Android Studio][android-studio-logo]][android-studio-url]
[![Bruno][bruno-logo]][bruno-url]
[![Visual Studio Code][vs-code-logo]][vs-code-url]
[![Firebase][firebase-logo]][firebase-url]
[![Openai][openai-logo]][openai-url]
[![Node.js][nodejs-logo]][nodejs-url]


<details>
<summary>Käytetyt kirjastot ja riippuvuudet:</summary>
expo/vector-icons<br>
react-navigation/native<br>
react-navigation/bottom-tabs<br>
react-native-community/slider<br>
react-native-picker/picker<br>
react-native-async-storage/async-storage<br>
react-native-element-dropdown<br>
react-native-check-box<br>
react-native-config<br>
react-native-screens<br>
react-native-safe-area-context<br>
react-native-popup-menu<br>
react-native-vector-icons<br>
dotenv
expofont
</details>


## 3. Asennusohjeet 

### Esivaatimukset

1. Kopioi repository Githubista
    ```
    git clone https://github.com/Ruokakomero/Ruokakomero-App.git
    ```
2. Asenna [Node.js](https://nodejs.org/).
3. Asenna Expo CLI:
   ```bash
   npm install -g expo-cli

4. Asenna React Native riippuvuudet:
    ```bash
    npm install

5. Asenna Firebase:

   ```bash
   npx expo install @react-native-firebase/app
   ```
    ---
6. Sovelluksen käynnistäminen
    ```
    npx expo start -c
    ```


## 4. Käyttöliittymä

### Käyttöliittymäkaavio
- Visuaaliset kaaviot löytyvät [UI-suunnitelmadokumentista](https://www.figma.com/design/UjDkmgpcvd6Rm2ateRlwBh/Ruokakomero?node-id=132-68).
- Käyttöliittymän rautalankamalli [Figma](https://www.figma.com/design/UjDkmgpcvd6Rm2ateRlwBh/Ruokakomero?node-id=0-1)

### Käyttöliittymän näkymät
- Kirjautumissivu

<img src="https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/simulator.png?raw=true" width="300" />

- Ruokatoiveiden kysely

<img src="https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/IMG_5091.png?raw=true" width="300" />

- Tekoälyn reseptiehdotukset

<img src="https://github.com/Ruokakomero/Ruokakomero-App/blob/main/Media/IMG_5095.png?raw=true" width="300" />

- Reseptilistaus

<img src="https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/IMG_5092.png?raw=true" width="300" />

- Ostoslista

<img src="https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/IMG_5093.png?raw=true" width="300" />

- Profiili

<img src="https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/IMG_5094.png?raw=true" width="300" />


---

## 5. Tietokanta

Tässä on Ruokakomero-sovelluksen Firebase-tietokannan rakenne. Se on suunniteltu tukemaan sovelluksen toiminnallisuuksia, kuten ostoslistojen tekemistä sekä reseptiehdotuksia.

<details>
<summary> Avaa tietokantarakenne </summary>

### **Users Collection (users)**

#### Document Schema:
```json

 {
   "userId": "user123",
   "name": "Example User",
   "email": "example@email.com",
 }

```

### Recipes Collection (`users/<userId>/recipes`)
#### Document Schema:
```json
{
   "recipeId": "recipe123",
   "name": "Pancakes",
   "ingredients": [
     { "name": "Flour", "unit": "kilograms", ... },
     { "name": "Milk", "unit": "liters", ... }
   ],
   "instructions": [
     "Mix ingredients.",
     "Cook on medium heat."
   ],
 }
```

### Shopping Lists Collection (`users/<userId>/shoppingLists`)
#### Document Schema:
```json
{
   "listId": "list123",
   "items": [
     { "name": "Milk", "quantity": 2, "unit": "liters" },
     { "name": "Flour", "quantity": 1, "unit": "kilograms" }
   ]
 }
```

</details>

## 📌 Kokoelmien kuvaus

- **users collection**: Käyttäjät ja niiden tiedot.
- **recipes collection**: Käyttäjien reseptit.
- **shopping lists collection**: Käyttäjien ostoslistat.


### Tietokantakaavio
[Tietokantakaavio](https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/Tietokantataulukko.pdf)

---

## REST API -dokumentaatio (Firebase Realtime Database + Authentication)

### Autentikointi

- Sovellus käyttää Firebase Authenticationia käyttäjän tunnistamiseen.
- Firebase palauttaa ID-tokenin kirjautumisen yhteydessä, jota voidaan käyttää REST-pyyntöjen valtuuttamiseen.
- Firebase SDK huolehtii autentikoinnista sovelluksen sisällä.

---

## 📁 API-endpointit (Firebase polkuina)

###  Käyttäjät
| Metodi | Polku | Kuvaus |
|--------|-------|--------|
| GET    | `/users/` | Palauttaa kaikki sovelluksen käyttäjät |
| POST   | `/users/`| Luo uuden käyttäjän |
| PATCH  | `/users/{userId}` | Päivittää olemassa olevan käyttäjän |
| DELETE | `/users/{userId}/` | Poistaa olemassa olevan käyttäjän |

**Esimerkki GET-datasta:**
```json

},
  "F14j26lXkif0tR6K0JRwgLnSziI1": {
    "diet": {
      "glutenFree": true,
      "lactoseFree": false,
      "vegan": false,
      "vege": true
    },
    "email": "",
    "firstName": "Maija",
    "lastName": "Mehiläinen"
  },
```

### 🍽 Reseptit (Recipes)

| Metodi | Polku | Kuvaus |
|--------|-------|--------|
| GET    | `/users/{userId}/recipes` | Palauttaa kaikki käyttäjän reseptit |
| POST   | `/users/{userId}/recipes` | Luo uuden reseptin |
| PATCH  | `/users/{userId}/recipes/{recipeId}` | Päivittää olemassa olevan reseptin |
| DELETE | `/users/{userId}/recipes/{recipeId}` | Poistaa reseptin |

**Esimerkki GET-datasta:**
```json
{
 {
  "-OOSG03z4iJm5YDOYITy": {
    "id": "-OOSG03z4iJm5YDOYITy",
    "ingredients": [
      {
        "name": "Kanafileet",
        "quantity": "900.00",
        "unit": "g"
      },
      {
        "name": "Perunat",
        "quantity": "1200.00",
        "unit": "g"
      },
      {
        "name": "Sipuli",
        "quantity": "1.50",
        "unit": "kpl"
      },
      {
        "name": "Valkosipulinkynsi",
        "quantity": "3.00",
        "unit": "kpl"
      },
      {
        "name": "Porkkana",
        "quantity": "3.00",
        "unit": "kpl"
      },
      {
        "name": "Kasvisliemikuutio",
        "quantity": "1.50",
        "unit": "kpl"
      },
      {
        "name": "Vettä",
        "quantity": "6.00",
        "unit": "dl"
      },
      {
        "name": "Suola",
        "quantity": "1.50",
        "unit": "tl"
      },
      {
        "name": "Pippuri",
        "quantity": "1.50",
        "unit": "tl"
      },
      {
        "name": "Oliiviöljy",
        "quantity": "3.00",
        "unit": "rkl"
      },
      {
        "name": "Tuoreita yrttejä (esim. timjami tai rosmariini)",
        "quantity": "1.50",
        "unit": "kpl"
      }
    ],
    "instructions": [
      "Aloita kuorimalla ja pilkkomalla perunat ja porkkanat sopivan kokoisiksi kuutioiksi. Hienonna sipuli ja valkosipulinkynnet.",
      "Kuumenna oliiviöljy suuressa paistokasarissa keskilämmöllä. Lisää hienonnettu sipuli ja valkosipuli, ja kuullota niitä noin 2–3 minuuttia, kunnes ne ovat pehmeitä.",
      "Leikkaa kanafileet suikaleiksi ja lisää ne paistokasariin sipulin sekä valkosipulin joukkoon. Paista, kunnes kana on saanut kauniin kullanruskean värin kaikilta puolilta.",
      "Lisää perunakuutiot ja porkkanat kasariin. Sekoita ainekset hyvin yhteen.",
      "Murustele kasvisliemikuutio seoksen päälle ja kaada vesi joukkoon. Lisää suola ja pippuri. Sekoita, jotta kaikki ainesosat jakautuvat tasaisesti.",
      "Peitä kansi ja anna padan kiehua miedolla lämmöllä noin 25–30 minuuttia, kunnes perunat ja porkkanat ovat kypsiä. Tarkista maku ja säädä tarvittaessa suolalla ja pippurilla.",
      "Ota pata pois lämmöltä ja lisää tuoreita yrttejä koristeluksi ennen tarjoilua. Tarjoile lämpimänä esimerkiksi salaatin kanssa."
    ],
    "name": "Laktoositon kana-perunapata",
    "servingSize": "6"
  }
}
```

---

### 📚 Reseptikokoelmat (Recipe Collections)

| Metodi | Polku | Kuvaus |
|--------|-------|--------|
| GET    | `/users/{userId}/recipeCollections` | Palauttaa kaikki kokoelmat |
| POST   | `/users/{userId}/recipeCollections` | Luo uuden kokoelman |
| PATCH  | `/users/{userId}/recipeCollections/{collectionId}` | Lisää reseptin kokoelmaan |
| DELETE | `/users/{userId}/recipeCollections/{collectionId}` | Poistaa kokoelman |

**Esimerkki GET-datasta:**
```json
{
  "-OOcKmai3NX9Gh-sO51w": {
    "id": "-OOcKmai3NX9Gh-sO51w",
    "name": "Testikokoelma",
    "recipes": [
      "-OOXuqVyP3UiHz3YHEUa",
      "-OOYFKqjLvY5CwNkhL1z"
    ]
  }
}
```

---

### 🤖 AI-reseptit (OpenAI)

| Funktio | Kuvaus |
|---------|--------|
| `getRecipe(query)` | Hakee suomenkielisen reseptin käyttäjän syötteen perusteella OpenAI:n GPT-mallilla |

**Esimerkki:**
```js
const recipe = await getRecipe("Proteiinit: kana, Hiilihydraatit: riisi, Annoskoko: 2");
```

---

## 📝 Huomioitavaa

- Firebase ei käytä perinteisiä REST URL:eja, mutta yllä kuvatut polut vastaavat dokumentin rakenteita Firebase SDK:ssa.
- Kaikki kirjoitusoperaatiot (`POST`, `PATCH`, `DELETE`) vaativat kirjautuneen käyttäjän tunnistamisen Firebase Authenticationin kautta.
- Firebase-tietokanta käyttää JSON-rakennetta ja on reaaliaikainen.

---

## 7. AI toiminnallisuuden tekninen kuvaus

**Tekoälyn käyttötarkoitus sovelluksessa**

Sovellukseen on integroitu tekoälytoiminto, jonka avulla voidaan luoda käyttäjän syötteiden perusteella reseptejä. Käyttäjä voi antaa esimerkiksi proteiini- ja hiilihydraattilähteet, ruokavaliot ja annoskoon ja tekoäly tuottaa näiden tietojen pohjalta valmiin reseptiehdotuksen. Kyseinen ehdotus sisältää ruoan nimen, annoskoon, ainesosat määrineen sekä yksityiskohtaiset valmistusohjeet.

**Käytetty AI-palvelu**

Reseptien generoinnissa käytetään OpenAI:n GPT-4o-mini -mallia, jonka rajapintaan sovellus muodostaa kyselyitä OpenAI:n virallisen `openai` JavaScript-kirjaston avulla.

**API-avain ja konfiguraatio**

API-avain sijoitetaan `.env` tiedostoon, joka sijaitsee projektin juurihakemistossa, josta se haetaan `react-native-dotenv` kirjaston avulla. Esimerkiksi:

```js
OPENAI_API_KEY=sk-abc123...
```

**Tekoälyn kutsuminen sovelluksessa**

Tekoälyn toteutus sijaitsee `getRecipe(query)`-funktiossa, joka rakentaa suomenkielisen kehotteen (promptin) käyttäen käyttäjän antamia valintoja ja lähettää sen `RecipeAI`-komponentille. Komponentissa on valmis kysely, johon käyttäjän prompti liitetään ja lähetetään OpenAI:n chat-muotoiselle API:lle. Palvelusta saatu vastaus muunnetaan JSON-objektiksi, joka sisältää seuraavat kentät:

- `name`: reseptin nimi

- `servingSize`: annoskoko

- `ingredients`: lista ainesosista, sisältäen nimen, määrän ja yksikön

- `instructions`: lista valmistusohjeista

Esimerkki funktiokutsusta:
```js
const aiRecipe = await getRecipe("Proteiinit: tofu, Hiilihydraatit: peruna, Annoskoko: 2, Ruokavaliot: vegaaninen");
````

**Tulosten näyttäminen käyttöliittymässä**

Tekoälyn palauttama resepti näytetään `GeneratedRecipeView`-komponentissa, jossa näytetään ruokalajin nimi, annoskoko, ainesosat ja valmistusohjeet. Mikäli reseptiä ei voida hakea tai parsia, käyttöliittymässä näytetään `RecipeErrorMessage`-komponentti virheilmoituksineen ja "Yritä uudelleen" -painikkeineen. Hakuprosessin aikana näytetään `RecipeLoadingIndicator`-komponentti, joka kertoo käyttäjälle latauksen olevan käynnissä.

**Reseptin uudelleen generointi sekä tallentaminen**

Käyttäjällä on mahdollisuus generoida uusi resepti valitsemillaan tiedoilla painamalla "Luo uusi resepti" -painiketta. Mikäli API-kutsu epäonnistuu, näytetään virheilmoitus ja käyttäjälle tarjotaan mahdollisuus yrittää uudelleen. Funktio `regenerateRecipe` huolehtii uuden pyynnön lähettämisestä ja tuloksen päivittämisestä näkymään. Painamalla "Tallenna resepti" -painiketta sovellus käyttää `saveRecipeToDatabase` -funktiota ja tallentaa luodun reseptin tietokantaan.

**API-kutsujen rajoitukset ja kustannukset**

- Token-rajoitukset: GPT-4o-mini tukee maksimissaan 128k tokenin kontekstia, mutta reseptien generointi on rajoitettu 1000 tokeniin.

- Hinnoittelu: GPT-4o-mini on kustannustehokkaampi kuin laajemmat GPT-4-mallit, mikä on yksi syy kyseisen mallin valinnalle. Käytöstä syntyy silti kustannuksia käytetyn token-määrän mukaan. [Tarkka hinnoittelu löytyy OpenAI:n virallisilta verkkosivuilta löytyy ajantasainen hinnoittelumalli.](https://platform.openai.com/docs/pricing/)

**Käyttäjädatan tietosuoja**

Sovellus ei lähetä henkilötietoja OpenAI:n palveluun. Ainoa API:lle välitetty käyttäjätieto on reseptin muodostamiseen liittyvä tekstimuotoinen syöte (proteiinit, hiilihydraatit, ruokavaliot jne.). GDPR:n näkökulmasta varmistetaan, ettei tunnistettavaa henkilötietoa sisällytetä API-kutsuihin, eikä OpenAI:n palauttamaa sisältöä säilytetä ilman käyttäjän erillistä tallennustoimintoa, milloin generoitu resepti tallennetaan tietokantaan.

---

## 8. Käyttäjän autentikointi 

**Teknologia:**

Firebase Authentication tai JWT

Tämä API käyttää Firebase Authentication -tunnistautumista. Kirjautumisen jälkeen käyttäjän tunnus (ID token) käytetään REST API -kutsujen valtuuttamiseen.

**Kuinka kirjautuminen toimii**

Käyttäjä syöttää sähköpostin ja salasanan. Kirjautuminen tehdään seuraavalla funktiolla:

```
const result = await AuthScreen.handleLogin(email, password);
```
Jos kirjautuminen onnistuu, result.success === true.

**Firebase ID-tokenin käyttö REST API:ssa**

Firebase palauttaa kirjautumisen jälkeen automaattisesti ID-tokenin, jota käytetään kaikissa REST-pyynnöissä.

--- 

## 9. Käyttäjän rekisteröinti ja ensimmäisen kirjautumisen logiikka


### Rekisteröityminen
  
 1. Käyttäjä täyttää sähköpostin ja salasanan rekisteröintilomakkeessa.
 2. Rekisteröinnin yhteydessä luodaan uusi käyttäjä Firebase Authenticationiin ja tallennetaan perustiedot Firebase Databaseen.
 3. Käyttäjän tietojen yhteyteen tallennetaan myös firstLoginDone: false, joka kertoo että käyttäjä ei ole vielä täyttänyt profiilitietojaan.
 4. Rekisteröitymisen jälkeen käyttäjä kirjataan ulos automaattisesti (auth.signOut()), jotta hänen täytyy erikseen kirjautua sisään.

### Kirjautuminen
  1. Kun käyttäjä kirjautuu sisään, Login-näkymä tarkistaa käyttäjän firstLoginDone-arvon tietokannasta.
  2. Jos firstLoginDone === false, käyttäjä ohjataan Profiili-välilehdelle (handleLogin("Profiili")).
  3. Jos firstLoginDone === true, käyttäjä ohjataan suoraan Etusivulle (handleLogin("Etusivu")).

### Navigointi
  1. handleLogin-funktio asettaa sovelluksen initialTab-tilan joko "Profiili" tai "Etusivu".
  2. Kun käyttäjä on kirjautuneena (user on olemassa), sovellus näyttää AppStackin, joka antaa initialTab-arvon MainTabs-näkymälle.
  3. MainTabs-komponentti avaa oikean välilehden (initialRouteName) käyttäjän kirjautumisen mukaan.

### Profiilin täyttäminen
  1. Profiilisivulla käyttäjä täyttää lisätietonsa.
  2. Kun tiedot on tallennettu, sovellus päivittää tietokantaan firstLoginDone: true.
  3. Tämän jälkeen kaikilla tulevilla kirjautumiskerroilla käyttäjä päätyy suoraan Etusivulle.

## 10. Testaus 

### Testausalueet
- **Database Access Layer:**
  - SQL-kyselyjen oikeellisuus ja suorituskyky.
  - Transaktioiden hallinta.
- **Frontend:** React Native Testing Library.


### Testi 1: Rekisteröityminen (Android)

- Sovellus aukeaa sisäänkirjautumissivulle
- "Eikö sinulla ole tiliä.." klikataan
- Vie "Rekisteröidy" sivulle
- Lisätään kentät ja klikataan rekisteröidy -nappia
- Nappia painettua saadaan ilmoitus onnistuneesta rekisteröitymisestä
- Testataan juuri luotuja tunnuksia
- OK, toimii!


### Testi 2: Ostoslistan lisäys (Android)

- Navigoidaan Ostoslista -sivulle
- Lista on tyhjä, sillä tavaraa ei ole lisätty vielä ja sovellus kertoo "Ei tuotteita"

![image](https://github.com/user-attachments/assets/4e134e23-674d-4ce7-bdd1-e88d1bdf86b0)

- Lisätään tuote ja tallennetaan

![image](https://github.com/user-attachments/assets/2701d976-60dc-412d-91ec-9cf4c76b356d)

- Lisätään toinen tuote "Maito, 2 L", tallennetaan ja merkitään banaanit kerätyksi napauttamalla riviä

![image](https://github.com/user-attachments/assets/a092e7c9-3f9e-479e-929e-5b356c1476e3)

- Testataan vielä poisto

![image](https://github.com/user-attachments/assets/63d4485c-4319-469e-b524-45656b9e57bb)

- OK, toimii


### Testi 3: Reseptin luominen (Android)

- Luodaan uusi resepti
- Lisätään ainesosia
- Tallennetaan resepti
- Resepti näkyy kokoelmassa
- Sen voi poistaa pyyhkäisemällä vasemmalle paljastaen poisto painikkeen.
- OK, toimii!


---
## 11. Julkaisu

Sovellus on julkaistu [Expo:ssa.](https://expo.dev/preview/update?message=Ruokakomero%20v1.0.2&updateRuntimeVersion=1.0.0&createdAt=2025-04-27T09%3A12%3A51.041Z&slug=ruokakomero-app&projectId=f322cb3f-78c5-4363-9118-57c6578fcffa&group=7ac81493-934f-446b-86d9-016e9612060b)

---


## 12. Kehitystiimi

**Jonna Rinne** <br>
**Lauri Hynninen** <br>
**Jouni Kaitasalo** <br>
**Arttu Aarnio** <br>
**Rowina San Juan** <br>
**Henri Kulmala** <br>

<!-- LOGOT JA URLIT -->
[javascript-logo]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge
[javascript-url]: https://www.javascript.com/
[react-native-logo]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-native-url]: https://reactnative.dev/
[github-logo]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white&style=for-the-badge
[github-url]: https://github.com/
[expo-logo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=fff
[expo-url]: https://expo.dev/go
[android-studio-logo]: https://img.shields.io/badge/android%20studio-346ac1?style=for-the-badge&logo=android%20studio&logoColor=white
[android-studio-url]: https://developer.android.com/studio
[bruno-logo]: https://img.shields.io/badge/Bruno-FF6C37?style=for-the-badge&logo=Bruno&logoColor=white
[bruno-url]: https://www.usebruno.com/
[vs-code-logo]: https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white&style=for-the-badge
[vs-code-url]: https://code.visualstudio.com/
[firebase-url]: https://firebase.google.com/
[firebase-logo]:https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[openai-url]: https://openai.com/
[openai-logo]: https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=fff&style=for-the-badge
[nodejs-url]: https://nodejs.org/en
[nodejs-logo]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
