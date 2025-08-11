
# ⭐ StarTrack

**StarTrack** is an interactive web-based dashboard and machine learning pipeline for stellar classification using spectral data. It allows users to query stars by **PLATE-MJD-FIBERID** and view both **model predictions** and **actual classifications**, enabling a comparative, hands-on exploration of stellar data. Designed as a learning experience and showcase project, StarTrack combines tabular and spectral analysis through a **multimodal deep learning system**.

You can download StarTrack's CSV data here: https://drive.google.com/file/d/170lCU-O4Cxb-RVoX_OIWrBycr3kPjQbi/view?usp=sharing

---

## 🚀 Features

- 🔭 **Star Lookup** by PLATE, MJD, and FIBERID  
- 🧠 Dual-model predictions:
  - **Dense Model** for tabular metadata (e.g., redshift, magnitudes)
  - **BiLSTM Model** for raw spectral sequence data
- 🌌 **Fusion architecture** combining both representations
- 📊 Comparison of model outputs vs. actual SDSS subclass labels
- 🌐 Fully responsive web dashboard built with **React.js**

---

## 🧠 ML Architecture

StarTrack’s pipeline includes:

- **Tabular Branch**: A dense neural network trained on features like redshift, magnitude, and signal-to-noise ratio.  
- **Spectral Branch**: A Bidirectional LSTM trained on normalized 1D spectral flux values.  
- **Fusion Module**: Outputs from both branches are concatenated and passed through a multi-head attention mechanism to produce the final subclass prediction.

> ✅ Models trained and evaluated using data from the [Sloan Digital Sky Survey (SDSS)](https://www.sdss.org/)

---

## 📁 Dataset

- **Source**: SDSS DR16 Spectroscopic Archive  
- **Size**: ~800,000 for dense/tabular model, ~25,000 labeled samples  for LSTM/spectra model, 
- **Inputs**:
  - 1D flux spectra (from `.fits` files)  
  - Tabular metadata (PLATE, MJD, FIBERID, redshift, etc.)  
- **Labels**: Stellar subclasses (e.g., `A0`, `M5`, `K3`)

---

## 🛠️ Technologies Used

**Frontend**:  
- React.js  

**Backend / ML**:  
- Python  
- PyTorch  
- NumPy, Pandas  
- Matplotlib 
- Sklearn
- Node.js
- Jupyter Notebook
- Astropy (for `.fits` file handling) 

## Screenshots
<img width="1901" height="919" alt="image" src="https://github.com/user-attachments/assets/6d28a17a-e605-4583-b2ab-13c8f0dcaa9b" />
<img width="1905" height="919" alt="image" src="https://github.com/user-attachments/assets/d16670db-f2a4-4a00-9bf9-0083526ec050" />
<img width="1902" height="914" alt="image" src="https://github.com/user-attachments/assets/8c422d22-9ac4-40bc-85a7-0e565a913df4" />

