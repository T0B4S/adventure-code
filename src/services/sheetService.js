//Conexión con Google Sheets (CSV)

// Servicio de Google Sheets: Realiza el fetch y parseo de las preguntas en formato CSV.
export async function fetchQuestionsFromSheet() {
  try {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQgTgA60IOKeXTbguOHtFG_cmh-gfUMO9K8gne0Ik0KwRg9wd7FNy3RjELUGaRpHIk4tB3nl-_0pwDc/pub?gid=0&single=true&output=csv";
    const res = await fetch(sheetUrl);
    
    if (!res.ok) {
      throw new Error("No se pudo conectar con la planilla de Google Sheets");
    }

    const text = await res.text();
    const rows = text.split("\n").map(r => r.split(","));
    
    const parsedQuestions = rows.slice(1).map((row, idx) => ({
      id: idx + 1,
      difficulty: row[1]?.replace(/"/g, "").trim().toLowerCase() || "verde",
      type: row[2]?.replace(/"/g, "").trim() || "input",
      prompt: row[3]?.replace(/"/g, "").trim() || "",
      opA: row[4]?.replace(/"/g, "").trim() || "",
      opB: row[5]?.replace(/"/g, "").trim() || "",
      opC: row[6]?.replace(/"/g, "").trim() || "",
      correct: row[7]?.replace(/"/g, "").trim() || "",
      explanation: row[8]?.replace(/"/g, "").trim() || ""
    })).filter(q => q.prompt !== "");

    return parsedQuestions;
  } catch (err) {
    console.warn("Aviso: Usando preguntas de respaldo locales debido a un error de red.", err);
    return null;
  }
}