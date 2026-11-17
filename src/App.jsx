// Motor Principal: Controla la máquina de estados, el puntaje, las vidas y la lógica de la ruleta rusa con tambor físico de 6 recámaras.
import { useState } from "react";
import { fetchQuestionsFromSheet } from "./services/sheetService";
import { FALLBACK_QUESTIONS } from "./data/mockQuestions";
import RegisterForm from "./components/RegisterForm";
import LoadingScreen from "./components/LoadingScreen";
import TutorialModal from "./components/TutorialModal";
import RouletteView from "./components/RouletteView";
import QuestionCard from "./components/QuestionCard";
import GameOverView from "./components/GameOverView";

export default function App() {
  const [gameState, setGameState] = useState("REGISTER"); 
  const [playerName, setPlayerName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [shotsTaken, setShotsTaken] = useState(0);
  
  // Estados para simular el tambor físico de la ruleta rusa
  const [chamberSize, setChamberSize] = useState(6);
  const [bulletsLeft, setBulletsLeft] = useState(3);
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleStartRegister = async (name, avatar) => {
    setPlayerName(name);
    setSelectedAvatar(avatar);
    setGameState("LOADING");

    let loadedQuestions = await fetchQuestionsFromSheet();
    if (!loadedQuestions || loadedQuestions.length === 0) {
      loadedQuestions = FALLBACK_QUESTIONS;
    }

    setQuestions(loadedQuestions);
    setTimeout(() => {
      setGameState("TUTORIAL");
    }, 1500);
  };

  const spinRoulette = (forcedDifficulty = null) => {
    const difficulties = ["verde", "amarilla", "roja"];
    const randomDiff = forcedDifficulty || difficulties[Math.floor(Math.random() * difficulties.length)];
    setSelectedDifficulty(randomDiff);

    const available = questions.filter(q => q.difficulty === randomDiff);
    const selectedQ = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)] 
      : questions[Math.floor(Math.random() * questions.length)];

    setCurrentQuestion(selectedQ);
    setGameState("QUESTION");
  };

  const handleAnswerSubmit = (answerGiven, setFeedback, setAvatarState) => {
    const correctAns = String(currentQuestion?.correct || "").trim().toLowerCase();
    const userAns = String(answerGiven || "").trim().toLowerCase();
    const isCorrect = userAns === correctAns;

    if (isCorrect) {
      if (setAvatarState) setAvatarState("acertado");

      const pointsEarned = selectedDifficulty === "roja" ? 30 : selectedDifficulty === "amarilla" ? 20 : 10;
      const newScore = score + pointsEarned;
      setScore(newScore);

      setFeedback(
        <div className="p-3 bg-green-600/30 text-green-400 border border-green-500 rounded text-center font-bold shadow-lg">
          ¡Respuesta Correcta! +{pointsEarned} pts
        </div>
      );

      setTimeout(() => {
        if (newScore >= 50) {
          setGameState(shotsTaken === 0 ? "VICTORY_PERFECT" : "VICTORY_INJURED");
        } else {
          setGameState("ROULETTE");
        }
      }, 1500);
    } else {
      // LÓGICA DE LA RULETA RUSA (FALLO)
      const probability = bulletsLeft / chamberSize;
      const isBulletShot = Math.random() < probability;

      if (isBulletShot) {
        // 💥 ¡BANG! El disparo salió (Daño real) -> Activamos animación ACERTADO (disparo)
        if (setAvatarState) setAvatarState("acertado");

        const nextLives = lives - 1;
        const nextShots = shotsTaken + 1;
        setLives(nextLives);
        setShotsTaken(nextShots);

        const nextBullets = bulletsLeft - 1;
        const nextChamber = chamberSize - 1;

        if (nextBullets <= 0 || nextChamber <= 0) {
          setBulletsLeft(3);
          setChamberSize(6);
        } else {
          setBulletsLeft(nextBullets);
          setChamberSize(nextChamber);
        }

        // El mensaje de daño se ejecuta fuera del hook, de forma directa
        setFeedback(
          <div className="p-3 bg-red-600/30 text-red-400 border border-red-500 rounded text-center font-bold animate-pulse shadow-lg">
            💥 ¡BANG! El disparo salió (Probabilidad: {Math.round(probability * 100)}%) y perdiste 1 vida.
          </div>
        );

        setTimeout(() => {
          if (nextLives <= 0) {
            setGameState("GAME_OVER");
          } else {
            setGameState("ROULETTE");
          }
        }, 2000);
      } else {
        // 💨 ¡CLIC! Recámara vacía (Se salvó) -> Activamos animación FALSO (alivio)
        if (setAvatarState) setAvatarState("falso");

        const nextChamber = chamberSize - 1;

        if (nextChamber <= 0 || bulletsLeft >= nextChamber) {
          setBulletsLeft(3);
          setChamberSize(6);
        } else {
          setChamberSize(nextChamber);
        }

        setFeedback(
          <div className="p-3 bg-yellow-600/30 text-yellow-400 border border-yellow-500 rounded text-center font-bold shadow-lg">
            💨 ¡CLIC! Recámara vacía (Probabilidad era {Math.round(probability * 100)}%). Te salvaste.
          </div>
        );

        setTimeout(() => {
          setGameState("ROULETTE");
        }, 2000);
      }
    }
  };

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setShotsTaken(0);
    setBulletsLeft(3);
    setChamberSize(6);
    setPlayerName("");
    setSelectedAvatar(null);
    setGameState("REGISTER");
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
      {gameState === "REGISTER" && <RegisterForm onStart={handleStartRegister} />}
      {gameState === "LOADING" && <LoadingScreen />}
      
      {gameState === "TUTORIAL" && (
        <TutorialModal 
          playerName={playerName} 
          avatarId={selectedAvatar} 
          onNext={() => setGameState("ROULETTE")} 
        />
      )}

      {gameState === "ROULETTE" && (
        <RouletteView 
          playerName={playerName} 
          avatarId={selectedAvatar}
          lives={lives} 
          score={score} 
          onSpin={spinRoulette} 
        />
      )}
      {gameState === "QUESTION" && currentQuestion && (
        <QuestionCard 
          key={currentQuestion.id + "-" + score + "-" + lives}
          
          question={currentQuestion} 
          difficulty={selectedDifficulty} 
          lives={lives} 
          score={score} 
          playerName={playerName}
          avatarId={selectedAvatar}
          onAnswer={handleAnswerSubmit} 
        />
      )}
      {(gameState === "GAME_OVER" || gameState === "VICTORY_INJURED" || gameState === "VICTORY_PERFECT") && (
        <GameOverView 
          status={gameState} 
          score={score} 
          shotsTaken={shotsTaken} 
          onReset={resetGame} 
        />
      )}
    </div>
  );
}