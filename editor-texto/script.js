const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

document.getElementById('start-recording').addEventListener('click', () => {
	recognition.start();
	document.getElementById('start-recording').style.display = 'none';
	document.getElementById('stop-recording').style.display = 'inline-block';
});

document.getElementById('stop-recording').addEventListener('click', () => {
	recognition.stop();
	document.getElementById('stop-recording').style.display = 'none';
	document.getElementById('start-recording').style.display = 'inline-block';
});

recognition.onresult = (event) => {
	let transcription = '';
	for (let i = event.resultIndex; i < event.results.length; i++) {
		if (event.results[i].isFinal) {
			transcription += event.results[i][0].transcript;
		}
	}
	document.querySelector('.editor-content').innerText += transcription;
};

recognition.onerror = (event) => {
	console.error('Speech recognition error:', event.error);
};

function updateStatus() {
	const selection = window.getSelection();
	document.getElementById('editor-status').innerText = `Selection: ${
		selection.toString().length
	} characters`;
}

function clearSelection() {
	window.getSelection().removeAllRanges();
	updateStatus();
}

document.addEventListener('selectionchange', updateStatus);
