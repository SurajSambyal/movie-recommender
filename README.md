# movie-recommender

A **content-based Movie Recommendation System** that suggests similar movies based on **genres, director, cast, and other metadata**, using **cosine similarity** as the core similarity metric.[cite:12][web:20][web:23]  
This project is built as a **front-end focused MCA class project** using **HTML, CSS, and JavaScript**.[cite:12]  

---

## 1. Project Overview

The **AI Movie Recommender** takes a **movie selected by the user** and recommends a list of **similar movies** by comparing feature vectors built from **movie metadata**.[cite:12][web:20][web:23]  

Key characteristics:[cite:12][web:20][web:23]  

- **Content-based filtering** – recommendations are based on **movie features**, not user ratings.[cite:12][web:20][web:23]  
- **Cosine similarity** to measure similarity between movie vectors.[web:20][web:23]  
- Implemented as a **simple, interactive web app** suitable for **academic submission (MCA subject project)**.[cite:12]  

---

## 2. Features

- 🔍 **Search / select a movie** and get a list of **similar movies**.[cite:12][web:20][web:23]  
- 📊 Uses **content features** like **genres, director, cast, and keywords** to compute similarity.[web:20][web:23]  
- 🧮 **Cosine similarity** over combined feature vectors.[web:20][web:23]  
- 💻 **Pure front-end implementation** (HTML, CSS, JS) – easy to run in any browser.[cite:12]  
- 🎓 **Designed as an MCA class project** with clean structure and documentation.[cite:12]  

---

## 3. Tech Stack

- **HTML5** – structure of the web page (forms, cards, layout).[cite:12]  
- **CSS3** – styling, responsive layout, and UI design.[cite:12]  
- **JavaScript (ES6)** – core logic for:
  - storing / loading movie data,
  - building feature vectors,
  - calculating cosine similarity,
  - rendering recommendations.[cite:12][web:20][web:23]  

(Optional if you actually use them – delete if not):  

- **JSON** – for movie dataset storage.[web:22][web:23]  
- **Any ML preprocessing done offline** (e.g., building feature matrix) and exported to JS-readable format.[web:20][web:23]  

---

## 4. How It Works

1. **Movie Dataset & Features**  
   Each movie has metadata like **title, genres, director, cast, and keywords**.[web:20][web:23]  
   These fields are combined into a **single text/feature representation** per movie.[web:20][web:23]  

2. **Vectorization**  
   The combined features are converted into **numeric vectors** (e.g., using a bag-of-words or similar encoding prepared in advance and embedded in JS).[web:20][web:23]  

3. **Cosine Similarity**  
   When the user selects a movie, the system:[web:20][web:23]  

   - retrieves the **feature vector** of the chosen movie,  
   - computes the **cosine similarity** between this vector and all other movie vectors,  
   - sorts movies by **similarity score**,  
