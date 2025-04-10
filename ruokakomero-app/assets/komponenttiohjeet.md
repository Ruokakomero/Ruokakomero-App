## 🧩 Uudelleenkäytettävien komponenttien käyttöohjeet

Tässä dokumentissa kuvataan, miten seuraavat uudelleenkäytettävät komponentit toimivat ja miten niitä käytetään sovelluksessa:

- `TextThemed`
- `InputFieldComponent`
- `ButtonComponent`

Kaikki komponentit hyödyntävät tyylejä `styles/textStyles.js` ja `styles/componentStyles.js`.

---

### 📝 TextThemed

Yksinkertainen kääre `Text`-komponentille, jossa oletuksena fonttina käytetään `Manrope-R`.

#### ✅ Props
| Prop | Tyyppi | Kuvaus |
|------|--------|--------|
| `children` | `ReactNode` | Näytettävä teksti |
| `style` | `StyleObject` | Lisätyylit (yhdistyy oletustyyliin) |
| `...props` | `any` | Muita `Text`-komponentin hyväksymiä propseja |

#### 💡 Käyttöesimerkki
```jsx
<TextThemed style={textStyles.titleLargeBLight}>Tervetuloa</TextThemed>
```

#### 🔤 Eri tekstikokojen käyttö (textStyles.js)
| Tyyli | Käyttötarkoitus |
|-------|-----------------|
| `titleLargeB`, `titleLargeBLight` | Otsikot ja painotetut päätekstit |
| `titleSmall`, `titleSmallB`, `titleSmallLight` | Pienemmät otsikot ja väliotsikot |
| `bodyLarge`, `bodyLargeB`, `bodyLargeBLight` | Leipäteksti ja lomakeotsikot |
| `bodySmall`, `bodySmallLight` | Huomiotekstit ja selitteet |
| `textDanger` | Virhe- tai varoitusteksti punaisella värillä |
| `buttonText` | Käytetään ainoastaan napeissa, automaattisesti isolla ja lihavoituna |

---

### 📝 InputFieldComponent

Syöttökenttä, jossa on otsikko ja tyylit valittavissa teeman mukaan.

#### ✅ Props
| Prop | Tyyppi | Kuvaus |
|------|--------|--------|
| `placeholder` | `string` | Syötekentän placeholder-teksti |
| `styleType` | `"dark" \| undefined` | Määrittää tyylin (tummempi teksti jos "dark") |
| `value` | `string` | Syötteen arvo |
| `onChangeText` | `function` | Muutoksenkäsittelijä |
| `header` | `string` | Otsikkoteksti syötekentän yläpuolelle |
| `...props` | `any` | Muita `TextInput`-komponentin propseja |

#### 💡 Käyttöesimerkki
```jsx
<InputFieldComponent
  placeholder="Sähköposti"
  header="Sähköposti"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

---

### 📝 ButtonComponent

Nappi, jonka tyyli voidaan määrittää oletuksen (sininen) ja vaaran (punainen) välillä.

#### ✅ Props
| Prop | Tyyppi | Kuvaus |
|------|--------|--------|
| `content` | `string` | Napin teksti |
| `type` | `"default" \| "danger"` | Napin tyyli |
| `onPress` | `function` | Painalluksen tapahtumankäsittelijä |
| `...props` | `any` | Muita `TouchableOpacity`-komponentin propseja |

#### 💡 Käyttöesimerkki
```jsx
<ButtonComponent
  content={loading ? "Kirjaudutaan..." : "Kirjaudu"}
  onPress={handleLogin}
  type="default"
/>
```

---

### 📦 Yhdistelmäkäyttöesimerkki

```jsx
<View style={componentStyles.mainContainer}>
  <TextThemed style={textStyles.titleLargeBLight}>
    Kirjaudu sisään
  </TextThemed>

  <InputFieldComponent
    placeholder="Sähköposti"
    header="sähköposti"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
    keyboardType="email-address"
  />

  <InputFieldComponent
    placeholder="Salasana"
    header="salasana"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={true}
    autoCapitalize="none"
  />

  <View style={componentStyles.buttonWrapper}>
    <ButtonComponent
      content={loading ? "Kirjaudutaan..." : "Kirjaudu"}
      onPress={handleLogin}
    />

    <TextThemed
      style={textStyles.titleSmallBLight}
      onPress={() => navigation.navigate("Rekisteröidy")}
    >
      Eikö sinulla ole tiliä? Rekisteröidy tästä
    </TextThemed>
  </View>
</View>
```

---

### 🔚 Yhteenveto
- **TextThemed**: typografian yhdenmukaistamiseen
- **InputFieldComponent**: lomakekenttien standardointiin
- **ButtonComponent**: yhdenmukaiset napit, joissa on valinnainen tyyli

Kaikki komponentit perustuvat yhteisiin tyyleihin `textStyles` ja `componentStyles`, ja niiden tarkoituksena on nopeuttaa ja yhdenmukaistaa käyttöliittymän rakentamista.

