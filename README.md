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

🟢🟡🔴

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

### Tietokantakaavio ()


### Tietohakemisto
- Dokumentaatio tietokantakyselyistä ja tietomalleista.

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
4. Asenna tietokantasovellus... (Firebase?)

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

