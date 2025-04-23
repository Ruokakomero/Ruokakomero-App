# Ruokakomero-App

Ruokakomero-sovellus on mobiilisovellus, joka auttaa käyttäjiä seuraamaan ruokakaappien sisältöä, jakamaan tiedot ruokakunnan kesken ja hyödyntämään tekoälypohjaista chatbotia reseptivinkkien saamiseksi.

---

## Sisällysluettelo

1. [Johdanto](#johdanto)  🟡
2. [Järjestelmän määrittely](#järjestelmän-määrittely) 🟡
   - [Käyttäjäryhmät](#käyttäjäryhmät) 
   - [Käyttötapaukset ja käyttäjätarinat](#käyttötapaukset-ja-käyttäjätarinat) 
3. [Asennusohjeet](#asennusohjeet) 🟡
3. [Käyttöliittymä](#käyttöliittymä)  🔴
   - [Käyttöliittymäkaavio](#käyttöliittymäkaavio)
   - [Käyttöliittymän näkymät](#käyttöliittymän-näkymät)
4. [Tietokanta](#tietokanta) 🔴
   - [Tietokantakaavio](#tietokantakaavio)
   - [Tietohakemisto](#tietohakemisto)
5. [REST API dokumentaatio](#rest-api-dokumentaatio) 🔴
   - [Myyntitapahtumien API-dokumentaatio](#myyntitapahtumien-api-dokumentaatio)
   - [Ruokien (Items) API-pyynnöt](#ruokien-items-api-pyynnöt)
   - [Ruokakunnan API-pyynnöt](#ruokakunnan-api-pyynnöt)
6. [Autentikointi](#autentikointi) 🔴
7. [Testaus](#testaus)  🔴

9. [Projektisuunnitelma](#projektisuunnitelma) 🟡
10. [Käyttäjätarinat](#käyttäjätarinat) 🟡
11. [Kehitystiimi ja lisenssi](#kehitystiimi-ja-lisenssi) 🟡

🟢 Tehty - ei tarvitse enää muokata
🟡 Luonnos - ei vielä valmis
🔴 Pelkkä otsikko ja template -teksti

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
- Käyttäjätarinat löytyvät [täältä](#käyttäjätarinat).

### Prosessikaavio ###
[Prosessikaavio](https://github.com/Ruokakomero/Ruokakomero-App/blob/develop/Media/Ruokakomero%20-%20prosessikaavio.pdf)
[Visio-linkki](https://haagahelia.sharepoint.com/:u:/r/teams/Ruokakomero-app/Jaetut%20asiakirjat/General/Ruokakomero%20-%20prosessikaavio.vsdx?d=wfd6c54846e4d46f2a6eec9b496f97940&csf=1&web=1&e=w1INfS)

---

## Käytetyt teknologiat
[![TypeScript][typescript-logo]][typescript-url]
[![React Native][react-native-logo]][react-native-url]
[![GitHub][github-logo]][github-url]
[![Expo Go][expo-logo]][expo-url]
[![Android Studio][android-studio-logo]][android-studio-url]
[![Bruno][bruno-logo]][bruno-url]
[![Visual Studio Code][vs-code-logo]][vs-code-url]

<details>
<summary>Käytetyt kirjastot ja riippuvuudet:</summary>

react-navigation/native<br>
react-navigation/bottom-tabs<br>
react-native-screens<br>
react-native-safe-area-context

</details>


## 3. Asennusohjeet 

### Esivaatimukset
1. Asenna [Node.js](https://nodejs.org/).
2. Asenna Expo CLI:
   ```bash
   npm install -g expo-cli

3. Asenna React Native riippuvuudet:
    ```bash
    npm install

4. Asenna Firebase:

   ```bash
   npx expo install @react-native-firebase/app
   ```
    ---

## 3. Käyttöliittymä

### Käyttöliittymäkaavio
- Visuaaliset kaaviot löytyvät Figmasta tai [UI-suunnitelmadokumentista](linkki).

### Käyttöliittymän näkymät

- Ruokatoiveiden kysely
- Chatbotin reseptiehdotukset
- Reseptilistaus
- Profiili

---

## 4. Tietokanta

Tässä on Ruokakomero-sovelluksen Firebase-tietokannan rakenne. Se on suunniteltu tukemaan sovelluksen toiminnallisuuksia, kuten ostostlistojen tekemistä sekä reseptiehdotuksia.

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

### Chatbot Interactions Collection (`users/<userId>/chatbotInteractions`)
#### Document Schema:
```json
{
  "interactionId": "interaction123",
  "userId": "user123",
  "query": "What can I cook with items from our pantry?",
  "response": "You can make pancakes!",
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

## 5. REST API dokumentaatio ()

Kaikki pyynnöt ovat käyttäjäkohtaisia ja edellyttävät, että käyttäjä on kirjautunut Firebase Authenticationin kautta. Jokainen käyttäjän data sijaitsee polussa
```
/users/{userId}/
```

### Ruokien API-pyynnöt
- CRUD-operaatiot.

GET ostoslista
POST lisää tuote
PATCH muokkaa tuotetta
DELETE poista tuote




---

## 6. Käyttäjän autentikointi 

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

## 7. Testaus 

### Testausalueet
- **Database Access Layer:**
  - SQL-kyselyjen oikeellisuus ja suorituskyky.
  - Transaktioiden hallinta.
- **Frontend:** React Native Testing Library.


### Testi 1: Rekisteröityminen

- Sovellus aukeaa sisäänkirjautumissivulle
- "Eikö sinulla ole tiliä.." klikataan
  - Ongelma napin kanssa, se klippaa ruudun ulkopuolelle
  - Ei estä etenemistä

![image](https://github.com/user-attachments/assets/16f0b7ac-0c86-4aac-909d-6fddca634b0e)

- Vie "Rekisteröidy" sivulle
- Lisätään kentät ja klikataan rekisteröidy -nappia
  - Ongelma napin kanssa. Se klippaa ruudun ulkopuolelle
  - Ei estä etenemistä

![image](https://github.com/user-attachments/assets/68e361ef-1c0b-4938-8aef-7104fde2c3d8)

- Nappia painettua saadaan ilmoitus onnistuneesta rekisteröitymisestä
- Testataan juuri luotuja tunnuksia
- OK, toimii!


### Testi 2: Ostoslistan lisäys

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


### Testi 3: Reseptin luominen

- Luodaan uusi resepti
- Lisätään ainesosia
- Tallennetaan resepti
- Resepti näkyy kokoelmassa
- Sovellus kaatuu, kun avaan tallennetun reseptin
  - Sitä ei voi myöskään suoraan tuosta poistaa

![image](https://github.com/user-attachments/assets/0aa1693b-9933-43a2-8425-3112d2ac921b)




---





## 10. Käyttäjätarinat


[Käyttäjätarinat ja niiden hyväksymiskriteerit](https://haagahelia.sharepoint.com/:w:/t/Ruokakomero-app/EXVuzQbDBO1DtNnOEmNZY0wBUATwizgeybNp6XLnpgdUHA?e=8r5j4c)


## 11. Sovelluksen ovat toteuttaneet 

- **Jonna Rinne**
- **Lauri Hynninen**
- **Jouni Kaitasalo**
- **Arttu Aarnio**
- **Rowina San Juan**
- **Henri Kulmala**
<!-- TEKNOLOGIAT JA TYÖKALUT-->
[typescript-logo]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[react-native-logo]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-native-url]: https://reactnative.dev/
[github-logo]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white&style=for-the-badge
[github-url]: https://github.com/
[docker-logo]: https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[expo-logo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=fff
[expo-url]: https://expo.dev/go
[android-studio-logo]: https://img.shields.io/badge/android%20studio-346ac1?style=for-the-badge&logo=android%20studio&logoColor=white
[android-studio-url]: https://developer.android.com/studio
[bruno-logo]: https://img.shields.io/badge/Bruno-FF6C37?style=for-the-badge&logo=Bruno&logoColor=white
[bruno-url]: https://www.usebruno.com/
[vs-code-logo]: https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white&style=for-the-badge
[vs-code-url]: https://code.visualstudio.com/