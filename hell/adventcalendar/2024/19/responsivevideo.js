/*
ResponsiveVideo Web Component
This makes a responsive video element respond to source media changes too
To use: load this module in your page and wrap a responsive-video element around your video element
Copyright 2024 Scott Jehl, @scottjehl
MIT License
*/
class ResponsiveVideo extends HTMLElement {
	constructor() {
		super();
		this.listenedMedia = [];
		this.reloadQueued = false;
	}
	connectedCallback() {
		this.video = this.querySelector('video');
		this.bindMediaListeners();
	}
	disconnectedCallback() {
		this.unbindMediaListeners();
	}
	bindMediaListeners(){
		this.querySelectorAll('source').forEach(source => {
			if (source.media) {
				const mqListener = (mq) => {
					if ((source.src === this.video.currentSrc || !this.previousSiblingIsPlaying(source, this.video.currentSrc)) && !this.reloadQueued) {
						this.reloadVideo();
					}
				};
				let mm = window.matchMedia(source.media);
				this.listenedMedia.push({ media: mm, handler: mqListener });
				if(mm?.addListener){
					mm.addListener(mqListener);
				} else {
					mm.addEventListener("change", mqListener);
				}
			}
		});
	}
	unbindMediaListeners(){
		this.listenedMedia.forEach(listener => {
			let mm = listener.media;
			if(mm?.removeListener){
				mm.removeListener(listener.handler);
			} else {
				mm.removeEventListener("change", listener.handler);
			}
		});
	}
	getPrevSiblings(elem){
		let siblings = [];
		function step(newElem){
			if(newElem.previousElementSibling){
				siblings.push(newElem.previousElementSibling);
				step(newElem.previousElementSibling);
			}
		}
		step(elem);
		return siblings;
	}
	previousSiblingIsPlaying(elem, currentSrc) {
		let prevSiblings = this.getPrevSiblings(elem);
		let priorSiblingIsPlaying = false;
		prevSiblings.forEach(el => {
			if (el.src === currentSrc) {
				priorSiblingIsPlaying = true;
			}
		});
		return priorSiblingIsPlaying;
	}
	reloadVideo(){
		this.reloadQueued = true;
		const currentTime = this.video.currentTime;
		const playState = this.video.playState;
		this.video.load();
		const videoLoaded = () => {
			this.video.playState = playState;
			this.video.currentTime = currentTime.toString();
			this.reloadQueued = false;
			this.video.removeEventListener("loadeddata", videoLoaded);
		};
		this.video.addEventListener("loadeddata", videoLoaded);
	}
}

// feature test for native video media switching media
const videoMediaChangeSupport = async () => {
	return new Promise(resolve => {
		const iframe = document.createElement("iframe");
		const video = document.createElement("video");
		const source = document.createElement("source");
		// iOS doesn't support so many things that are needed to test this.
		// here we're exiting early assuming the browser doesn't support the feature
		// because it doesn't support related APIs
		if( !window?.MediaSource ){
			return resolve(false);
		}
		const mediaSource = new MediaSource();
		mediaSource.addEventListener("sourceopen", () => resolve(true));
		source.src = URL.createObjectURL(mediaSource);
		source.media = "(min-width:10px)";
		video.append(source);
		iframe.width = "5";
		iframe.style.cssText = `position: absolute; visibility: hidden;`;
		document.documentElement.append(iframe);
		iframe.contentDocument.body.append(video);
		setTimeout(() => { iframe.width = "15"; });
		setTimeout(() => {
			iframe.remove();
			resolve(false);
		}, 1000);
	});
};

if( await videoMediaChangeSupport() === false ){
	customElements.define("responsive-video", ResponsiveVideo);
}