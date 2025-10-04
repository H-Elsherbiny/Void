import joblib
from pathlib import Path

def continue_training(telescope, X, y):
    if telescope == "Kepler":
        model_path = Path(telescope) / "kepler_test2_ensemble_model.pkl"
    if telescope == "Tess":
        model_path = Path(telescope) / "exoplanet_Tess_FP_Confirmed_ensemble_model.pkl"
    if telescope == "K2":
        model_path = Path(telescope) / "exoplanet_K2_FPandConfirmed_ensemble_model.pkl"
        
    model = joblib.load(model_path)
    
    model.fit_partial(X, y)
    joblib.dump(model, f"classification_models/{telescope}/{telescope}_v2.pkl")
    