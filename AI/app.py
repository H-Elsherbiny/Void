from fastapi import FastAPI
from model_prediction import model_predict
from online_training import continue_training
from agent import generate_exoplanet_description
from simulation import wan_pipe
from habitability_with_esi import compute_esi_dataframe

app = FastAPI()


@app.post("/predict")
def predict_exoplanet(telescope, data):
    pred, proba = model_predict(telescope, data)
    return {"pred": pred, "proba": proba}


@app.post("/training")
def training(telescope, X, y):
    continue_training(telescope, X, y)
    return {"reply": "Done"}


@app.post("/description")
def get_description(row):
    descr = generate_exoplanet_description(row)
    return {"description": descr}


@app.post("/simulation")
def get_simulation(data):
    wan_pipe(data)
    return {"reply": "Done"}


@app.post("/esi")
def get_esi(df):
    esi = compute_esi_dataframe(df)
    return {"esi": esi}