# Ruokakomero-App

Ruokakomero-sovellus on mobiilisovellus, joka auttaa käyttäjiä seuraamaan ruokakaappien sisältöä, jakamaan tiedot ruokakunnan kesken ja hyödyntämään tekoälypohjaista chatbotia reseptivinkkien saamiseksi.

---

## Sisällysluettelo

1. [Johdanto](#johdanto)  🟡
2. [Järjestelmän määrittely](#järjestelmän-määrittely) 🟡
   - [Käyttäjäryhmät](#käyttäjäryhmät) 
   - [Käyttötapaukset ja käyttäjätarinat](#käyttötapaukset-ja-käyttäjätarinat) 
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
8. [Asennusohjeet](#asennusohjeet) 🟡
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

Kun käyttäjä valitsee reseptin, sovellus luo siitä automaattisesti ostoslistan. Käyttäjä voi merkitä jo olemassa olevat ainesosat, jolloin ne poistuvat listalta. Lisäksi sovellus sisältää reseptien arviointitoiminnon, jonka avulla käyttäjä voi vaikuttaa suosituksiin. Pidetyistä resepteistä muodostuu henkilökohtainen reseptilista, kun taas epämieluisat reseptit suodattuvat pois, eikä chatbot ehdota niitä uudelleen.

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

## 3. Käyttöliittymä

### Käyttöliittymäkaavio
- Visuaaliset kaaviot löytyvät Figmasta tai [UI-suunnitelmadokumentista](linkki).

### Käyttöliittymän näkymät
- Etusivu
- Ruokatoiveiden kysely
- Chatbotin reseptiehdotukset
- Reseptilistaus

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

### Myyntitapahtumien API-dokumentaatio
- Esimerkki: `/api/items`

### Ruokien (Items) API-pyynnöt
- CRUD-operaatiot.

### Ruokakunnan API-pyynnöt
- Ruokakunnan hallinta ja synkronointi.

---

## 6. Autentikointi 

- **Teknologia:** Firebase Authentication tai JWT.
- **Ominaisuudet:**
  - Token-pohjainen kirjautuminen.
  - Turvallinen salasanan tallennus.

---

## 7. Testaus 

### Testausalueet
- **Database Access Layer:**
  - SQL-kyselyjen oikeellisuus ja suorituskyky.
  - Transaktioiden hallinta.
- **Frontend:** React Native Testing Library.


---

## 8. Asennusohjeet 

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

5. Asenna React Navigation:
   npm install @react-navigation/native
   npx expo install react-native-screens react-native-safe-area-context
   npm install @react-navigation/bottom-tabs

## 9. Projektisuunnitelma

- **Sprinttijako:** 3 Viikon sprintit, yhteensä 4 sprinttiä
- **Tiimi:** 6 Henkilöä (tiimijäsenet)

## 10. Käyttäjätarinat


[Käyttäjätarinat ja niiden hyväksymiskriteerit](https://haagahelia.sharepoint.com/:w:/t/Ruokakomero-app/EXVuzQbDBO1DtNnOEmNZY0wBUATwizgeybNp6XLnpgdUHA?e=8r5j4c)


## 11. Kehitystiimi ja lisenssi

- **Rinne Jonna**
- **Hynninen Lauri**
- **Kaitasalo Jouni**
- **Aarnio Arttu**
- **San Juan Rowina**
- **Kulmala Henri**

Lisenssi..

