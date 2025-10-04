import numpy as np
import pandas as pd

EARTH = {
    "radius": 1.0,      # Earth radii
    "teq": 255.0,       # K (approx equilibrium)
    "insol": 1.0        # relative to Earth
}

def similarity_component(x, x0, w):
    try:
        x = float(x)
        if x <= 0 or x0 <= 0 or np.isnan(x):
            return np.nan
    except:
        return np.nan
    frac = abs((x - x0) / (x + x0))
    s = max(0.0, 1.0 - frac)
    return s ** w

def compute_esi_for_row(row, weights=None):
    """
    Compute ESI as product of components.
    weights: dict e.g. {'radius':0.57,'teq':0.7,'insol':0.7}
    Returns ESI (0-1) or np.nan if insufficient data.
    """
    if weights is None:
        weights = {'radius':0.57, 'teq':0.7, 'insol':0.7}
    comps = []

    if not pd.isna(row.get('koi_prad')):
        comps.append(similarity_component(row['koi_prad'], EARTH['radius'], weights['radius']))
    else:
        comps.append(np.nan)

    teq = row.get('koi_teq') if 'koi_teq' in row else None
    if pd.isna(teq):
        teq = None
    if teq is not None:
        comps.append(similarity_component(teq, EARTH['teq'], weights['teq']))
    else:
        comps.append(np.nan)

    if not pd.isna(row.get('koi_insol')):
        comps.append(similarity_component(row['koi_insol'], EARTH['insol'], weights['insol']))
    else:
        comps.append(np.nan)

    comps_valid = [c for c in comps if not pd.isna(c)]
    if len(comps_valid) == 0:
        return np.nan
    esi = 1.0
    for c in comps_valid:
        esi *= c

    n = len(comps_valid)
    esi = esi ** (1.0 / n)
    return float(esi)

def compute_esi_dataframe(df, weights=None):
    df['ESI'] = df.apply(lambda r: compute_esi_for_row(r, weights=weights), axis=1)
    return df['ESI'].values[0]
