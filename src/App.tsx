import React, { useState, FormEvent, useRef } from "react";
import { PHRASES } from "./snippets";
import { Game } from "./types";
import "./App.css";

export const App = () => {
	const [game, setGame] = useState<Game>({
		userText: "",
		phrase: "",
		wrongText: false,
		victory: false,
		startTime: null,
		endTime: null,
	});

	const inputRef = useRef<HTMLInputElement>(null);

	const setFocus = (inputRef: any) => {
		return inputRef.current && inputRef.current.focus();
	};

	const handleClick = (idx: number) => {
		setFocus(inputRef);
		setGame({
			...game,
			phrase: PHRASES[idx],
			startTime: new Date().getTime(),
		});
	};

	const handleChange = (evt: FormEvent<HTMLInputElement>) => {
		let inputValue = evt.currentTarget.value;
		setGame({
			...game,
			userText: inputValue,
		});

		if (inputValue !== game.phrase.substring(0, inputValue.length)) {
			setGame({
				...game,
				wrongText: true,
				userText: inputValue,
			});
		} else {
			setGame({
				...game,
				wrongText: false,
				userText: inputValue,
			});
		}

		if (inputValue === game.phrase) {
			setGame({
				...game,
				wrongText: false,
				victory: true,
				endTime: new Date().getTime() - game.startTime!,
			});
		}
	};

	const noPaste = (evt: FormEvent) => {
		evt.preventDefault();
	};

	const noCtrlZ = (evt: any) => {
		if (evt.keyCode === 90) evt.preventDefault();
	};

	const restart = () => {
		setGame({
			userText: "",
			phrase: "",
			wrongText: false,
			victory: false,
			startTime: null,
			endTime: null,
		});
	};

	let color = game.wrongText ? "red" : "black";
	if (game.victory) {
		color = "green";
	}

	return (
		<main>
			<div className="game">
				<h1>Typing Race Game</h1>
				<button onClick={restart} className="restart">
					Restart
				</button>
				<h3>Your Phrase:</h3>
				{game.victory ? (
					<h4 style={{ color: "red", fontWeight: "bold" }}>
						Yay! You finished in {game.endTime}ms!
					</h4>
				) : (
					<h4>{game.phrase}</h4>
				)}
				<input
					type="text"
					onChange={handleChange}
					onPaste={noPaste}
					onKeyDown={noCtrlZ}
					value={game.userText}
					placeholder="Write here"
					style={{ color: color }}
					ref={inputRef}
				/>
				<div className="btns">
					{PHRASES.map((phrase, idx) => (
						<button key={idx} onClick={() => handleClick(idx)}>
							{phrase.substring(0, 20)}...
						</button>
					))}
				</div>
			</div>
		</main>
	);
};
