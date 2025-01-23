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

<details>
<summary>Käyttäjätarinat</summary>

### Tarina 1
- Käyttäjänä haluan pystyä kirjaamaan sovellukseen kaikki ruokakaapissa olevani ainesosat  

### Tarina 2
- Käyttäjä haluan tarkastella listalta olemassa olevat ainesosat. 

### Tarina 3

- Käyttäjänä haluan jakaa kuivakaapin ja pakastimen sisällön muiden ruokakunnan jäsenten kanssa sovelluksen avulla, jotta voimme välttää päällekkäiset ostokset. 

### Tarina 4
- Käyttäjänä haluan käyttää sovelluksen chatbottia saadakseni resepti-ideoita kodistani jo löytyvien ruokatarvikkeiden perusteella. 

### Tarina 5

- Käyttäjänä haluan nähdä sovelluksesta ainesosien tarkat määrät (esim. 5 tomaattia, 5 dl vehnäjauhoja). 

### Tarina 6

- Käyttäjänä haluan tarkastella ruokakaapin ainesosia kategorioittain (esim. vihannekset, säilykkeet). 

### Tarina 7
- Käyttäjänä haluan, että sovelluksen käyttöliittymä on helppokäyttöinen. 

### Tarina 8

- Käyttäjänä haluan luoda ostoslistoja sovelluksen sisäisesti, jotta voin helposti suunnitella ostokseni ja varmistaa, että hankin kaiken tarvittavan. 

### Tarina 9

- Käyttäjänä haluan luoda ja tallentaa aterioita ja nähdä tallennettujen aterioiden ravintoarvot, sekä mahdollisesti yksittäisten ainesosien ravintoarvot. 

### Tarina 10
- Käyttäjänä haluan pystyä kalenterimuotoisesti tarkastelemaan ja pitämään kirjaa ruokailustani. 

### Tarina 11

- Käyttäjänä haluan pystyä kirjautumaan sovellukseen helposti, esimerkiksi käyttäjätunnukselle ja salasanalla. 

### Tarina 12
- Käyttäjänä haluan pystyä muuttamaan tietojani sovelluksessa. 

### Tarina 13
- Käyttäjänä, joka noudattaa erityisruokavaliota (kuten gluteeniton tai vegaaninen), haluan sovelluksen ehdottavan vain ruokavaliooni sopivia reseptejä, jotta voin pysyä ruokavaliossani. 

### Tarina 14

- Käyttäjänä haluan, että tarvikkeiden lisääminen sovellukseen olisi mahdollisimman helppoa, esim. hyödyntämällä tuotteen viivakoodia. 

</details>

## 11. Kehitystiimi ja lisenssi

- **Rinne Jonna**
- **Hynninen Lauri**
- **Kaitasalo Jouni**
- **Aarnio Arttu**
- **San Juan Rowina**
- **Kulmala Henri**

Lisenssi..

