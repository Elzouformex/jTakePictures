const constraints = {
	video: {
		width: 1024,
		height:776,
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

const canvas = document.createElement('canvas');

captureVideoButton.onclick = function() {
	navigator.mediaDevices.getUserMedia(constraints).
	then(handleSuccess).catch(handleError);
};

screenshotButton.onclick = video.onclick = function() {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	alert(JSON.stringify(video));
	alert(video.videoWidth);
	alert(video.videoHeight);
	canvas.getContext('2d').drawImage(video, 0, 0);

	// Other browsers will fall back to image/png
	const img = document.createElement('img');
	const link = document.createElement('a');
	img.src = canvas.toDataURL('image/webp');
	link.href = canvas.toDataURL('image/webp');
	link.target = 'blank';
	picturesGallery.appendChild(link);
	link.appendChild(img);

	// Update thumbnail
	thumbnail.src = canvas.toDataURL('image/webp');
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