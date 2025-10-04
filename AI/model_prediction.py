import joblib
from pathlib import Path
import pandas as pd

def model_predict(telescope, data):
    if telescope == "Kepler":
        model_path = Path(telescope) / "kepler_test2_ensemble_model.pkl"
        label_path = Path(telescope) / "label_test2_ensemble_model.pkl"
    if telescope == "Tess":
        model_path = Path(telescope) / "exoplanet_Tess_FP_Confirmed_ensemble_model.pkl"
        label_path = Path(telescope) / "label_Tess_FP_Confirmed_ensamble_encoder.pkl"
    if telescope == "K2":
        model_path = Path(telescope) / "exoplanet_K2_FPandConfirmed_ensemble_model.pkl"
        label_path = Path(telescope) / "label_K2_FPandConfirmed_encoder.pkl"
        
    model = joblib.load(model_path)
    label_encoder = joblib.load(label_path)
    
    df = pd.read_csv(data)
    
    y_pred_encoded = model.predict(df)
    y_pred_proba = model.predict_proba(df)
    y_pred = label_encoder.inverse_transform(y_pred_encoded)
    
    return y_pred, y_pred_proba