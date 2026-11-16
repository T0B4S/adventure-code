// Motor Principal: Controla la máquina de estados, el puntaje, las vidas y la lógica de la ruleta rusa.
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

  const spinRoulette = () => {
    const difficulties = ["verde", "amarilla", "roja"];
    const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
    setSelectedDifficulty(randomDiff);

    const available = questions.filter(q => q.difficulty === randomDiff);
    const selectedQ = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)] 
      : questions[Math.floor(Math.random() * questions.length)];

    setCurrentQuestion(selectedQ);
    setGameState("QUESTION");
  };

  const handleAnswerSubmit = (answerGiven, setFeedback) => {
    const isCorrect = answerGiven.trim().toLowerCase() === currentQuestion.correct.toLowerCase();

    if (isCorrect) {
      const pointsEarned = selectedDifficulty === "roja" ? 30 : selectedDifficulty === "amarilla" ? 20 : 10;
      const newScore = score + pointsEarned;
      setScore(newScore);
      
      setFeedback(
        <div className="p-3 bg-green-600/30 text-green-400 border border-green-500 rounded text-center font-bold">
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
      const isBulletShot = Math.random() < 0.5;

      if (isBulletShot) {
        const nextLives = lives - 1;
        const nextShots = shotsTaken + 1;
        setLives(nextLives);
        setShotsTaken(nextShots);

        setFeedback(
          <div className="p-3 bg-red-600/30 text-red-400 border border-red-500 rounded text-center font-bold animate-pulse">
            💥 ¡BANG! El disparo salió y perdiste 1 vida.
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
        setFeedback(
          <div className="p-3 bg-yellow-600/30 text-yellow-400 border border-yellow-500 rounded text-center font-bold">
            💨 ¡CLIC! Recámara vacía. Te salvaste del disparo.
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
    setPlayerName("");
    setSelectedAvatar(null);
    setGameState("REGISTER");
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
      {gameState === "REGISTER" && <RegisterForm onStart={handleStartRegister} />}
      {gameState === "LOADING" && <LoadingScreen />}
      {gameState === "TUTORIAL" && <TutorialModal onNext={() => setGameState("ROULETTE")} />}
      {gameState === "ROULETTE" && (
        <RouletteView 
          playerName={playerName} 
          lives={lives} 
          score={score} 
          onSpin={spinRoulette} 
        />
      )}
      {gameState === "QUESTION" && currentQuestion && (
        <QuestionCard 
          question={currentQuestion} 
          difficulty={selectedDifficulty} 
          lives={lives} 
          score={score} 
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