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

Tässä on Ruokakomero-sovelluksen tietokantarakenne. Se on suunniteltu tukemaan sovelluksen toiminnallisuuksia, kuten ruokavaraston hallintaa, viivakoodiskannausta ja reseptiehdotuksia.

<details>
<summary> Avaa tietokantataulut </summary>

### **Users**
| Kenttä        | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| userId       | string (PK) | Käyttäjän uniikki tunniste |
| name         | string      | Käyttäjän nimi |
| email        | string (unique) | Käyttäjän sähköposti |
| householdId  | string (FK) | Viittaus ruokakuntaan |

### **Households**
| Kenttä        | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| householdId  | string (PK) | Ruokakunnan tunniste |
| name         | string      | Ruokakunnan nimi |

### **StorageLocations**
| Kenttä        | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| storageId    | string (PK) | Säilytyspaikan tunniste |
| householdId  | string (FK) | Viittaus ruokakuntaan |
| name         | string      | Säilytyspaikan nimi |

### **Items**
| Kenttä         | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| itemId        | string (PK) | Tuotteen tunniste |
| householdId   | string (FK) | Viittaus ruokakuntaan |
| storageId     | string (FK) | Viittaus säilytyspaikkaan |
| name          | string      | Tuotteen nimi |
| eanCode       | string (FK) | Viivakoodin tunniste |
| quantity      | int         | Määrä |
| unit          | string      | Yksikkö |
| expirationDate | timestamp  | Viimeinen käyttöpäivä |
| addedBy       | string (FK) | Käyttäjä, joka lisäsi tuotteen |

### **Products**
| Kenttä          | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| eanCode       | string (PK) | Viivakoodin tunniste |
| name          | string      | Tuotteen nimi |
| brand         | string      | Tuotemerkin nimi |
| defaultUnit   | string      | Oletusyksikkö |
| defaultQuantity | int       | Oletusmäärä |
| imageUrl      | string      | Kuva tuotteen etiketistä |
| nutritionalInfo | json      | Ravintotiedot |

### **Recipes**
| Kenttä         | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| recipeId      | string (PK) | Reseptin tunniste |
| name          | string      | Reseptin nimi |
| ingredients   | json        | Ainesosaluettelo |
| instructions  | json        | Valmistusohjeet |
| createdBy     | string (FK) | Käyttäjä, joka loi reseptin |

### **ShoppingLists**
| Kenttä        | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| listId       | string (PK) | Ostoslistan tunniste |
| householdId  | string (FK) | Viittaus ruokakuntaan |
| items        | json        | Ostoslistan tuotteet |

### **ChatbotInteractions**
| Kenttä        | Tietotyyppi  | Kuvaus |
|--------------|------------|--------|
| interactionId | string (PK) | Keskustelun tunniste |
| userId       | string (FK) | Viittaus käyttäjään |
| query        | string      | Käyttäjän kysymys |
| response     | string      | Chatbotin vastaus |

</details>

## 📌 Taulujen kuvaus

- **users**: Käyttäjät, jotka kuuluvat tiettyyn ruokakuntaan.
- **households**: Ruokakunnat, joihin käyttäjät ja säilytyspaikat kuuluvat.
- **storageLocations**: Säilytyspaikat, kuten jääkaappi tai kuivakaappi.
- **items**: Tuotteet, jotka on lisätty säilytyspaikkoihin.
- **products**: Yleistietokanta tuotteille, joiden tiedot haetaan viivakoodilla.
- **recipes**: Käyttäjien reseptit, joissa hyödynnetään varastossa olevia tuotteita.
- **shoppingLists**: Ruokakunnan ostoslistat.
- **chatbotInteractions**: Chatbotin kanssa käydyt keskustelut ja ehdotukset.


### Tietokantakaavio ()
[Tietokantakaavio] ()



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

