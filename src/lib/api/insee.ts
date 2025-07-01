'use server'

interface InseeApiResponse {
  siren: string;
  nic: string;
  siret: string;
  denominationUniteLegale: string; // Company Name
  adresseEtablissement: {
    numeroVoie: string;
    typeVoie: string;
    libelleVoie: string;
    codePostal: string;
    libelleCommune: string;
  };
}

interface InseeApiError {
  code: number;
  message: string;
}

export async function lookupSiret(siret: string): Promise<{ data?: InseeApiResponse; error?: string }> {
  const INSEE_API_KEY = process.env.INSEE_API_KEY; // Ensure this is set in your .env.local
  const INSEE_API_URL = "https://api.insee.fr/entreprises/sirene/V3/siret/";

  if (!INSEE_API_KEY) {
    return { error: "INSEE API Key is not configured." };
  }

  try {
    const response = await fetch(`${INSEE_API_URL}${siret}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${INSEE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData: InseeApiError = await response.json();
      return { error: `INSEE API Error: ${errorData.message || response.statusText}` };
    }

    const data = await response.json();
    // Assuming the structure is data.etablissement
    return { data: data.etablissement };
  } catch (e) {
    console.error("Error calling INSEE API:", e);
    return { error: "Failed to connect to INSEE API." };
  }
}
