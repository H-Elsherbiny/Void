# Exoplanet Discovery and Analysis Platform

A comprehensive machine learning platform for exoplanet classification, habitability assessment, and AI-generated visualizations. This project integrates multiple NASA space telescope datasets (Kepler, K2, TESS) to predict exoplanet characteristics and generate cinematic descriptions with video simulations.

## 🌟 Features

### 🔬 Exoplanet Classification
- **Multi-telescope Support**: Trained models for Kepler, K2, and TESS missions
- **Ensemble Learning**: High-accuracy ensemble models for robust predictions
- **Real-time Prediction**: FastAPI-based prediction endpoints
- **Online Learning**: Continuous model improvement with new data

### 🌍 Habitability Assessment
- **Earth Similarity Index (ESI)**: Calculates planetary habitability scores
- **Multi-parameter Analysis**: Considers radius, temperature, and insolation
- **Weighted Scoring**: Customizable weights for different habitability factors

### 🎬 AI-Generated Visualizations
- **Text-to-Video Generation**: Creates cinematic exoplanet videos using Wan2.1-T2V model
- **Intelligent Descriptions**: GPT-4 powered narrative generation
- **Visual Storytelling**: Converts raw data into engaging space documentaries

### 🚀 Simulation Engine
- **Advanced Video Pipeline**: High-quality 480P video generation
- **Customizable Parameters**: Adjustable frame rates, resolution, and guidance
- **GPU Acceleration**: CUDA-optimized for fast processing

## 📁 Project Structure

```
AI/
├── app.py                          # FastAPI main application
├── agent.py                        # AI description generation
├── model_prediction.py             # ML model prediction logic
├── habitability_with_esi.py       # Earth Similarity Index calculations
├── simulation.py                  # Video generation pipeline
├── online_training.py             # Continuous learning system
├── requirements.txt               # Project dependencies
├── video.mp4                      # Generated sample video
├── classification models/          # Pre-trained ML models
│   ├── Kepler/                    # Kepler mission models
│   │   ├── exoplanet_ensemble_model.pkl
│   │   ├── exoplanet_candinate_ensemble_model.pkl
│   │   ├── kepler_test1_ensemble_model.pkl
│   │   ├── kepler_test2_ensemble_model.pkl
│   │   └── label_*.pkl            # Label encoders
│   ├── K2/                        # K2 mission models
│   │   ├── exoplanet_K2_ensemble_model.pkl
│   │   ├── exoplanet_K2_FPandConfirmed_ensemble_model.pkl
│   │   └── label_*.pkl
│   └── Tess/                      # TESS mission models
│       ├── exoplanet_Tess_ensemble_model.pkl
│       ├── exoplanet_Tess_FP_Confirmed_ensemble_model.pkl
│       └── label_*.pkl
└── notebooks/                     # Data analysis notebooks
    ├── Kepler.ipynb
    ├── k2.ipynb
    └── Tess.ipynb
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackathon
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **GPU Setup (for video generation)**
   - Ensure CUDA-compatible GPU is available
   - Install PyTorch with CUDA support
   - Verify GPU memory (recommended: 8GB+ VRAM)

## 🚀 Usage

### Starting the API Server

```bash
python app.py
```

The API will be available at `http://localhost:8000`

### API Endpoints

#### 1. Exoplanet Prediction
```python
POST /predict
{
    "telescope": "Kepler",  # or "K2", "Tess"
    "data": "path/to/csv_file.csv"
}
```

**Response:**
```json
{
    "pred": ["CONFIRMED"],
    "proba": [[0.1, 0.9]]
}
```

#### 2. Model Training
```python
POST /training
{
    "telescope": "Kepler",
    "X": "training_features",
    "y": "training_labels"
}
```

#### 3. Generate Description
```python
POST /description
{
    "row": {
        "kepler_name": "Kepler-442b",
        "koi_period": 112.3,
        "koi_prad": 1.34,
        "koi_teq": 233
    }
}
```

#### 4. Video Simulation
```python
POST /simulation
{
    "data": "exoplanet_dataframe"
}
```

#### 5. Habitability Assessment
```python
POST /esi
{
    "df": "exoplanet_dataframe"
}
```

## 🧠 Machine Learning Models

### Model Performance
- **Kepler Models**: 94-99.5% accuracy across different datasets
- **K2 Models**: Optimized for K2 mission data
- **TESS Models**: Specialized for TESS observations

### Model Types
1. **General Classification**: Distinguishes between confirmed/false positive
2. **Candidate Analysis**: Identifies promising exoplanet candidates
3. **Disposition Prediction**: Predicts final classification status

### Training Data
- **Kepler**: 9,564 exoplanet candidates
- **K2**: Extended mission data
- **TESS**: Transiting Exoplanet Survey Satellite data

## 🌍 Habitability Analysis

### Earth Similarity Index (ESI)
The ESI calculation considers:
- **Radius**: Planetary radius relative to Earth
- **Temperature**: Equilibrium temperature
- **Insolation**: Stellar flux received

### Formula
```
ESI = (∏(similarity_components))^(1/n)
```

Where similarity components are calculated as:
```
s = max(0, 1 - |x - x₀|/(x + x₀))^w
```

## 🎬 Video Generation

### Technical Specifications
- **Resolution**: 480P (832x480)
- **Frame Rate**: 30 FPS
- **Duration**: 6 second (18 frames)
- **Model**: Wan2.1-T2V-1.3B-Diffusers

### Generation Process
1. **Data Input**: Exoplanet parameters
2. **Description Generation**: GPT-4 creates cinematic narrative
3. **Video Synthesis**: Wan pipeline generates video
4. **Output**: MP4 file with space documentary style

## 📊 Data Analysis

### Jupyter Notebooks
- **Kepler.ipynb**: Kepler mission data analysis
- **k2.ipynb**: K2 mission data exploration
- **Tess.ipynb**: TESS data processing

### Key Features
- Data preprocessing and cleaning
- Feature engineering
- Model training and validation
- Performance visualization

## 🔧 Configuration

### Model Paths
Models are automatically loaded based on telescope selection:
- **Kepler**: `classification_models/Kepler/`
- **K2**: `classification_models/K2/`
- **TESS**: `classification_models/Tess/`

### GPU Requirements
- **Minimum**: 20GB VRAM
- **Recommended**: 30GB+ VRAM
- **CUDA**: Version 11.8 or higher

## 📈 Performance Metrics

### Model Accuracy
- **Kepler Test**: 99.3% accuracy
- **Tess Test**: 91.7% accuracy
- **General Model**: 94% accuracy

### Processing Speed
- **Prediction**: < 1 second per batch
- **Video Generation**: 1-2 minutes (GPU dependent)
- **ESI Calculation**: < 100ms per planet


## 📄 License

This project is developed for NASA Space Apps Challenge 2025.

## 🙏 Acknowledgments

- **NASA**: For providing exoplanet datasets
- **OpenAI**: For GPT-4 API access
- **Hugging Face**: For Wan2.1-T2V model
- **FastAPI**: For robust API framework

