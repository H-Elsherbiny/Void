import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

system_prompt = """
You are an astrophysical narrator that converts raw exoplanet parameters into cinematic descriptions for a text-to-video AI. 

Rules:
- Respond ONLY with the description. 
- Do not include explanations, notes, or metadata.
- The description must begin with "Imagine a mysterious alien world:".
- The description must include: planet name, orbital period, radius relative to Earth, equilibrium temperature (if available), and cinematic visual elements (atmosphere, surface, light from the star).
- Keep the tone imaginative, visual, and narrative — like a space documentary teaser.
- Do not include numbers that are missing in the data.
"""

def generate_exoplanet_description(row):
    planet_name = row.get("kepler_name", "an unnamed exoplanet")
    period = row.get("koi_period", None)
    radius = row.get("koi_prad", None)
    teq = row.get("koi_teq", None)

    facts = f"Planet: {planet_name}. "
    if period: facts += f"Orbital Period: {period:.2f} days. "
    if radius: facts += f"Radius: {radius:.2f} Earth radii. "
    if teq: facts += f"Equilibrium Temperature: {teq:.0f} K."

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": facts}
        ],
        temperature=0.8
    )

    return response.choices[0].message.content.strip()