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
11. [CI/CD ja julkaisu](#julkaisu)  
12. [Kehitystiimi](#kehitystiimi) 


---

## 1. Johdanto

Ruokakomero-sovellus on suunniteltu helpottamaan reseptien löytämistä ja ostoslistan luomista käyttäjäystävällisellä ja pelillistetyllä lähestymistavalla. Sen tavoitteena on tarjota yksilöllisiä reseptisuosituksia käyttäjän mieltymysten ja ravitsemuksellisten tarpeiden mukaisesti.

Sovellus ohjaa käyttäjää reseptin valinnassa interaktiivisen käyttöliittymän avulla. Käyttäjä voi valita haluamansa hiilihydraatin, proteiinin ja annoskoon flashcard-tyylisellä valinnalla sekä säätää ruoan ravitsemuspitoisuutta liukusäätimellä. Näiden valintojen perusteella chatbot ehdottaa sopivia reseptejä. Mikäli saatavilla, resepteissä esitetään myös ravintoarvotiedot.

Kun käyttäjä valitsee reseptin, sovellus luo siitä automaattisesti ostoslistan. Käyttäjä voi merkitä ostoslistalta jo olemassa olevat ainesosat, jolloin ne poistuvat listalta. (Poistetaanko?: Lisäksi sovellus sisältää reseptien arviointitoiminnon, jonka avulla käyttäjä voi vaikuttaa suosituksiin. Pidetyistä resepteistä muodostuu henkilökohtainen reseptilista, kun taas epämieluisat reseptit suodattuvat pois, eikä chatbot ehdota niitä uudelleen.)

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
- Visuaaliset kaaviot löytyvät Figmasta tai [UI-suunnitelmadokumentista](linkki).

### Käyttöliittymän näkymät

- Ruokatoiveiden kysely
- Chatbotin reseptiehdotukset
- Reseptilistaus
- Profiili

---

## 5. Tietokanta

Tässä on Ruokakomero-sovelluksen Firebase-tietokannan rakenne. Se on suunniteltu tukemaan sovelluksen toiminnallisuuksia, kuten ostostlistojen tekemistä sekä reseptiehdotuksia.

<details>
<summary> Avaa tietokantarakenne </summary>

### **Users Collection (users)**

#### Document Schema:
```json
{
 
}
```

### Recipes Collection (`users/<userId>/recipes`)
#### Document Schema:
```json
{

}
```

### Shopping Lists Collection (`users/<userId>/shoppingLists`)
#### Document Schema:
```json
{
 
}
```

### Chatbot Interactions Collection (`users/<userId>/chatbotInteractions`)
#### Document Schema:
```json
{
  
}
```

</details>

## 📌 Kokoelmien kuvaus

- **users collection**: Käyttäjät ja niiden tiedot.
- **recipes collection**: Käyttäjien reseptit.
- **shopping lists collection**: Käyttäjien ostoslistat.
- **chatbot interactions collection**: Chatbotin kanssa käydyt keskustelut ja ehdotukset.


### Tietokantakaavio ()
[Tietokantakaavio] (https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/Tietokantataulukko.pdf)

---

## REST API -dokumentaatio (Firebase Realtime Database + Authentication)

### Autentikointi

- Sovellus käyttää Firebase Authenticationia käyttäjän tunnistamiseen.
- Firebase palauttaa ID-tokenin kirjautumisen yhteydessä, jota voidaan käyttää REST-pyyntöjen valtuuttamiseen.
- Firebase SDK huolehtii autentikoinnista sovelluksen sisällä.

---

## 📁 API-endpointit (Firebase polkuina)

### 🍽 Reseptit (Recipes)

| Metodi | Polku | Kuvaus |
|--------|-------|--------|
| GET    | `/users/{userId}/recipes` | Palauttaa kaikki käyttäjän reseptit |
| POST   | `/users/{userId}/recipes` | Luo uusi resepti |
| PATCH  | `/users/{userId}/recipes/{recipeId}` | Päivittää olemassa olevan reseptin |
| DELETE | `/users/{userId}/recipes/{recipeId}` | Poistaa reseptin |

**Esimerkki POST-datasta:**
```json
{
 
}
```

---

### 🛍 Ostoslista (Shopping List)

| Metodi | Polku | Kuvaus |
|--------|-------|--------|
| GET    | `/users/{userId}/Ostoslista` | Palauttaa ostoslistan |
| POST   | `/users/{userId}/Ostoslista` | Lisää uuden tuotteen |
| PATCH  | `/users/{userId}/Ostoslista/{itemId}` | Päivittää tuotteen |
| DELETE | `/users/{userId}/Ostoslista/{itemId}` | Poistaa tuotteen |

**Esimerkki POST-datasta:**
```json
{
 
}
```

---

### 📚 Reseptikokoelmat (Recipe Collections)

| Metodi | Polku | Kuvaus |
|--------|-------|--------|
| GET    | `/users/{userId}/recipeCollections` | Palauttaa kaikki kokoelmat |
| POST   | `/users/{userId}/recipeCollections` | Luo uusi kokoelma |
| PATCH  | `/users/{userId}/recipeCollections/{collectionId}` | Lisää resepti kokoelmaan |
| DELETE | `/users/{userId}/recipeCollections/{collectionId}` | Poistaa kokoelman |

**Esimerkki POST-datasta:**
```json
{

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


## 9. Käyttöoikeudet


---

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
## 11. CI/CD ja julkaisu

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