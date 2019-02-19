const constraints = {
	video: {
		facingMode: {
			exact: "environment"
		}
	}
};

const captureVideoButton = document.querySelector('#capture-button');
const modalCaptureVideo = document.querySelector('#modal-takePictures');
const screenshotButton = document.querySelector('#screenshot-button');
//const img = document.querySelector('#screenshot img');
const video = document.querySelector('#modal-takePictures video');

const canvas = document.createElement('canvas');

captureVideoButton.onclick = function() {
	navigator.mediaDevices.getUserMedia(constraints).
	then(handleSuccess).catch(handleError);
};

/*screenshotButton.onclick = video.onclick = function() {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	canvas.getContext('2d').drawImage(video, 0, 0);
	// Other browsers will fall back to image/png
	img.src = canvas.toDataURL('image/webp');
};*/

function handleSuccess(stream) {
	alert('success');
	modalCaptureVideo.style.display = 'block';
	screenshotButton.disabled = false;
	video.srcObject = stream;
}

function handleError(error) {
	alert('error');
	alert(error.message);
	console.error('navigator.getUserMedia error: ', error.message);
}