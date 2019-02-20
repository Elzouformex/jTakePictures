const constraints = {
	audio: false,
	video: {
		width: { ideal: 1280 },
		height: { ideal: 1024 },
		facingMode: {
			exact: "environment"
		}
	}
};

const captureVideoButton = document.querySelector('#capture-button');
const modalCaptureVideo = document.querySelector('#modal-takePictures');
const screenshotButton = document.querySelector('#screenshot-button');
const finishButton = document.querySelector('#finish-button');
const thumbnail = document.querySelector('#videoToolbar img');
const picturesGallery = document.querySelector('#picturesGallery');
const video = document.querySelector('#modal-takePictures video');
const element =  document.querySelector('#blankScreen');

const canvas = document.createElement('canvas');

captureVideoButton.onclick = function() {
	navigator.mediaDevices.getUserMedia(constraints).
	then(handleSuccess).catch(handleError);
};

screenshotButton.onclick = function() {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	canvas.getContext('2d').drawImage(video, 0, 0);

	const img = document.createElement('img');
	const link = document.createElement('a');
	const base64 = canvas.toDataURL('image/webp');	// Other browsers will fall back to image/png

	// Display blank screen
	element.classList.add('animated', 'fadeIn');
	element.classList.add('animated', 'fadeOut');

	// Add picture to gallery
	img.src = base64;
	link.href = base64;
	link.target = 'blank';
	picturesGallery.appendChild(link);
	link.appendChild(img);

	// Update thumbnail
	thumbnail.src = base64;
	thumbnail.style.display = 'inline';
};

function handleSuccess(stream) {
	modalCaptureVideo.style.display = 'block';
	screenshotButton.disabled = false;
	video.srcObject = stream;
	finishButton.addEventListener('click', function () {
		stopStream(stream);
		modalCaptureVideo.style.display = 'none';
		thumbnail.style.display = 'none';
	});
}

function handleError(error) {
	alert('error');
	alert(error.message);
	console.error('navigator.getUserMedia error: ', error.message);
}

function stopStream(stream) {
	stream.getVideoTracks().forEach(function (track) {
		track.stop();
	});
}