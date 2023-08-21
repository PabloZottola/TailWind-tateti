import { useState } from 'react';

const TURNS = {
	X: '❌',
	O: '⭕',
};

const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? 'is-selected' : ''}`;

	const handleClick = () => {
		updateBoard(index);
	};

	return (
		<div onClick={handleClick} className={className}>
			<span>{children}</span>
		</div>
	);
};

const WINNER_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [turn, setTurn] = useState(TURNS.X);
	const [winner, setWinner] = useState(null);

	const checkWinner = boardToCheck => {
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;
			if (
				boardToCheck[a] &&
				boardToCheck[a] === boardToCheck[b] &&
				boardToCheck[a] === boardToCheck[c]
			) {
				return boardToCheck[a];
			}
		}
		return null;
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
	};

	const checkEndGame = newBoard => {
		return newBoard.every(squeare => squeare !== null);
	};

	const updateBoard = index => {
		const newBoard = [...board];
		if (newBoard[index] || winner) return;
		newBoard[index] = turn;
		setBoard(newBoard);
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	};

	return (
		<>
			<main className='w-fit mx-10 my-auto text-center'>
				<h1 className='text-white mb-4 text-center text-5xl'>Ta Te Ti</h1>
				<button
					onClick={resetGame}
					className='px-4 py-1 mb-4 bg-transparent border-2 border-solid border-gray-200 text-white rounded font-bold cursor-pointer duration-200 hover:bg-slate-200 hover:text-black'
				>
					Reset del juego
				</button>
				<section className='grid gap-3 grid-cols-3'>
					{board.map((_, index) => {
						return (
							<Square key={index} index={index} updateBoard={updateBoard}>
								{board[index]}
							</Square>
						);
					})}
				</section>
				<section className='flex justify-center relative turn'>
					<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
					<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
				</section>
				<section>
					{winner !== null && (
						<section className='absolute w-screen h-screen top-0 left-0 grid place-items-center bg-opacity-70'>
							<div className='bg-gray-900 h-72 w-80 border-4 border-solid border-gray-200 rounded-2xl flex flex-col justify-center items-center'>
								<h2 className='text-white mt-7 text-3xl'>
									{winner === false ? 'Empate' : 'Gano:'}
								</h2>
								<header className='mx-0 my-auto pb-3 px-3 w-fit border-4 border-solid border-gray-200 rounded-xl flex gap-4 winner'>
									{winner && <Square>{winner}</Square>}
								</header>
								<footer className='text-white mb-7 text-2xl'>
									<button
										onClick={resetGame}
										className='px-4 py-1 bg-transparent border-2 border-solid border-gray-200 text-white rounded font-bold cursor-pointer duration-200 hover:bg-slate-200 hover:text-black'
									>
										Empezar de nuevo
									</button>
								</footer>
							</div>
						</section>
					)}
				</section>
			</main>
		</>
	);
}

export default App;
