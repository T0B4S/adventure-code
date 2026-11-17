// Conexión con Google Sheets (CSV)

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const character = text[i];

    if (character === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (character === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !inQuotes) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (character === "\r" && text[i + 1] === "\n") i += 1;
    } else {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

// Servicio de Google Sheets: Realiza el fetch y parseo de las preguntas en formato CSV.
export async function fetchQuestionsFromSheet() {
  try {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQgTgA60IOKeXTbguOHtFG_cmh-gfUMO9K8gne0Ik0KwRg9wd7FNy3RjELUGaRpHIk4tB3nl-_0pwDc/pub?gid=0&single=true&output=csv";
    const res = await fetch(sheetUrl);
    
    if (!res.ok) {
      throw new Error("No se pudo conectar con la planilla de Google Sheets");
    }

    const text = await res.text();
    const rows = parseCsv(text);
    
    const parsedQuestions = rows.slice(1).map((row, idx) => {
      let rawDiff = row[1]?.trim().toLowerCase() || "verde";
      // Normalizamos las dificultades del Sheet para que coincidan con el juego
      if (rawDiff === "amarillo") rawDiff = "amarilla";
      if (rawDiff === "rojo") rawDiff = "roja";

      return {
        id: idx + 1,
        difficulty: rawDiff,
        type: row[2]?.trim() || "input",
        // CORREGIDO: Mapeamos como 'question' para que QuestionCard.jsx lo lea perfectamente
        question: row[3]?.trim() || "", 
        opA: row[4]?.trim() || "",
        opB: row[5]?.trim() || "",
        opC: row[6]?.trim() || "",
        correct: row[7]?.trim() || "",
        explanation: row[8]?.trim() || ""
      };
    }).filter(q => q.question !== "");

    return parsedQuestions;
  } catch (err) {
    console.warn("Aviso: Usando preguntas de respaldo locales debido a un error de red.", err);
    return null;
  }
}