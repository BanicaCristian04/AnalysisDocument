# Descriere proiect

Proiectul reprezinta o aplicatie web care ofera functionalitatile de incarcare, comparare si analiza a documentelor juridice. Aplicatia permite utilizatorilor sa identifice diferente intre versiuni ale documentelor si sa obtina analiza lor din punct de veder legal.


# Specificatii functionale

## 1.Gestionare utilizatorilor:
  - Autentificare si inregistrare:
  - Utilizatorii isi pot crea propriul cont si se pot loga cu acesta pentru a face analiza documentelor.
## 2.Incarcarea documentelor:
  -  Utilizatorii pot incarca 2 documente de tip pdf pentru a fi comparate.
## 3.Analiza documentelor:
  - Identifica diferentele dintre cele doua documente incarcate.
  - Schimbarile sunt clasificate in 2 categorii: Schimbari substantiale si Schimbari de expresie
  - Fiecare schimbare subtantiala include o analiza din punct de vedere legala.
## 4.Vizualizarea rezultatelor
  - Rezultatele sunt afisate intr-un format json.
  - Toate analizele generate sunt salvate in contul utilizatorului.

# Specificatii tehnice

Aplicatia utilizeaza o arhitectura de tipul MVC pentru a organiza si structura codul, asigurand separarea responsabilitatilor.Urmatoarea sectiune detaliaza tehnologiile folosite in aplicatie:

1. Front-end:
  - React.js
2. Back-end:
  - Node.js cu express.js
  - Biblioteci:
    - pdf-parse: Extragere text din pdf.
    - diff-match-patch: Genereaza diferentele dintre doua texte.
    - unidecode: Normalizeaza textul pentru comparatii mai eficiente.
    - multer: Gestionarea fisierelor incarcate de utilizatori
3. Database:
  - MongoDB

# Procedura instalare back-end

  - 1.Asigura-te ca ai urmatoarele instalate pe sistem:
    - Node.js
    - MongoDB
    - Git
  - 2.Cloneaza repository-ul
    - git clone <url-proiect>
  - 3.Navigare director back-end
    - cd back-end
  - 4.Instalare dependente 
    - npm install express mongoose dotenv express-session connect-mongo pdf-parse diff-match-patch @google/generative-ai cors body-parser multer unidecode
  - 5.Configurare variabile de mediu
    - Creeaza un fisier .env in directoriul back-end si adauga urmatoarele variabile:
        - PORT=5000
        - MONGO_URI=mongodb://localhost:27017/<numele-database-ului>
        - SESSION_SECRET=<cheie-secreta>
        - GEMINI_KEY=<cheie-Gemini>
  - 6.Pornire server
    - Porneste serverul prin apelare comenzii: npm start
  - 7.Testare server
    - Jest(testare unitara): npm install --save-dev jest
    - Newman(pentru rularea colectiei Postman: teste de integrare): npm install -g newman
    - Playwright(pentru teste e2e): npm install --save-dev @playwright/test
    - K6(pentru teste de performanta): winget install k6
    - Comenzi pentru rularea testelor in parte:
      a. Jest: npx jest diffAnalyze.test.js
      b. Newman: newman run <collection.postman.js>
      c. Playwright: npx playwright test example.spec.js
      d. K6: k6 run 


   
