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

Ruokakomero-sovellus on suunniteltu vähentämään ruokahävikkiä ja helpottamaan arjen ruokasuunnittelua. Sovellus mahdollistaa jääkaapin, kuivakaapin ja pakastimen sisällön hallinnan, tiedon jakamisen ruokakunnan kesken sekä reseptiehdotukset tekoälyä hyödyntäen.

---

## 2. Järjestelmän määrittely

### Käyttäjäryhmät
- **Yksittäiset käyttäjät:** Sovelluksen käyttäminen henkilökohtaiseen tarpeeseen.
- **Ruokakunnat:** Useamman käyttäjän datan synkronointi saman ruokakunnan kesken.

### Käyttötapaukset ja käyttäjätarinat
- Käyttäjätarinat löytyvät [täältä](#käyttäjätarinat).

---

## 3. Käyttöliittymä

### Käyttöliittymäkaavio
- Visuaaliset kaaviot löytyvät Figmasta tai [UI-suunnitelmadokumentista](linkki).

### Käyttöliittymän näkymät
- Päävalikko
- Jääkaapin, kuivakaapin ja pakastimen sisällön hallinta
- Chatbotin reseptiehdotukset

---

## 4. Tietokanta

Tässä on Ruokakomero-sovelluksen Firebase-tietokannan rakenne. Se on suunniteltu tukemaan sovelluksen toiminnallisuuksia, kuten ruokavaraston hallintaa, viivakoodiskannausta ja reseptiehdotuksia.

<details>
<summary> Avaa tietokantarakenne </summary>

### **Users Collection (users)**

#### Document Schema:
```json
{
  "userId": "user123",
  "name": "Example User",
  "email": "example@email.com",
  "householdId": "household123",
}
```

### Households Collection (`households`)
#### Document Schema:
```json
{
  "householdId": "household123",
  "name": "Example Family",
  "users": ["userId1", "userId2"]
}
```

### Storage Locations Collection (`households/<householdId>/storageLocations`)
#### Document Schema:
```json
{
  "storageId": "storage123",
  "householdId": "household123",
  "name": "Pantry"
}
```

### Items Collection (`households/<householdId>/items`)
#### Document Schema:
```json
{
  "itemId": "item123",
  "householdId": "household123",
  "storageId": "storage123",
  "name": "Milk",
  "eanCode": "1234567890",
  "quantity": 2,
  "unit": "liters",
  "expirationDate": "2025-02-15T12:00:00Z",
  "addedBy": "userId1"
}
```

### Products Collection (`products`)
#### Document Schema:
```json
{
  "eanCode": "1234567890",
  "name": "Milk",
  "brand": "Example Brand",
  "defaultQuantity": 1,
  "defaultUnit": "liters",
  "imageUrl": "https://example.com/milk-label",
  "nutritionalInfo": { "calories": 150, "protein": 8, ...}
}
```

### Recipes Collection (`recipes`)
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
  "createdBy": "userId1"
}
```

### Shopping Lists Collection (`households/<householdId>/shoppingLists`)
#### Document Schema:
```json
{
  "listId": "list123",
  "householdId": "household123",
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

- **users collection**: Käyttäjät, jotka kuuluvat tiettyyn ruokakuntaan.
- **households collection**: Ruokakunnat, joihin käyttäjät ja säilytyspaikat kuuluvat.
- **storage locations collection**: Säilytyspaikat, kuten jääkaappi tai kuivakaappi.
- **items collection**: Tuotteet, jotka on lisätty säilytyspaikkoihin.
- **products collection**: Yleistietokanta tuotteille, joiden tiedot haetaan viivakoodilla.
- **recipes colection**: Käyttäjien reseptit, joissa hyödynnetään varastossa olevia tuotteita.
- **shopping lists collection**: Ruokakunnan ostoslistat.
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

