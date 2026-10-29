---
title: "[Tap tap] Uhm... is this thing on?"
author: "Nadja Zollo"
author_bio: "Nadja (she/her) is a frontend developer currently based in Cologne, Germany."
date: 2026-12-19
author_links:
  - label: "Nadja on LinkedIn"
    url: "https://www.linkedin.com/in/nadja-zollo/"
    link_label: "nadja-zollo"
intro: "<p>Short introductory text</p>"
image: "advent26_1"
active: true
---
In web development, as in most of life, there's rarely just one way to get the result you want. Sometimes that's overwhelming. How do you know which path to pick? The upside of having options is that you can try different approaches and see what sticks. The best part is discovering an option you didn't even know existed.

This happened to me earlier this year when I was working on an AI-assisted tutoring web application. For the conversation with the AI assistant, the web app provides a chat component which, in addition to text input, also supports voice input. We use the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and the [SpeechRecognition interface](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) to transcribe speech-to-text and send the user's message to the backend. The backend uses [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) to stream the AI response to the frontend. This response includes text chunks and base64-encoded audio chunks.

<p class="highlight"><strong>Note:</strong> As of October 2026, <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility"> Browser compatibility of the <code>SpeechRecognition</code> interface</a> is still limited. Until recently, Firefox, for example, didn't support it at all and it's only been available since Firefox 161, Nightly build. Safari provides it prefixed as <code>webkitSpeechRecognition</code>.</p>

To play the audio, I went with the most obvious - and for a long time I thought my one and only - option, the [HTMLAudioElement interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement): create an audio element, take the `data:` URLs of the streamed audio chunks as source, and play them in order.

So far, so good. But soon enough, I ran into problems in Safari on iOS when speech recognition stopped working after the audio finished. In Safari on desktop and in Chrome, however, I did not observe this kind of behavior. As this issue affected a key feature and prevented users from having a smooth chat experience (on our primary target device, of all things), I had to come up with a solution.

## Hello? Testing... testing...
To find a solution meant to figure out what was going on first. But the lack of error messages made troubleshooting quite challenging. Not to mention setting up a seamless debugging workflow between an iPad and your local development environment (but that's a story for another day).

### Notetaking
The issue occured after every audio playback → speech recognition cycle, so it was reliably reproducible in Safari on iOS, whether the web app was launched in standalone mode or within the standard Safari browser. I had two test devices, one iPad running on iOS version `18.7.3` and one on version `26.2`. This led to the following observations:
- Initially, speech recognition worked flawlessly.
- After the audio finished playing the AI response, starting a new speech recognition would not capture any further speech input.
- The microphone icon appeared in the status bar (indicating that permission to use the mic was still granted).
- Even though the microphone seemed to be active, no transcription popped up.
- Reloading the page/app after each audio playback helped temporarily.
- It also helped to wait at least 10 seconds before starting the next speech recognition session. And well, that's quite a long wait...


### Debugging (sort of)
To investigate the issue, I tested in an isolated environment with a minimum reproducible example stripped down to the core interfaces `SpeechRecognition` and `HTMLAudioElement`. The example followed a simple approach to start speech recognition and play simulated audio responses. The goal was to comprehensively log events and examine states and transitions. Basically, `console.log` ALL THE THINGS (if you know, you know 🥲). But no luck. There were no error messages, exceptions, or state indicators to help identify the root cause. It was more of a silent failure and the fact that everything worked again after waiting long enough suggested that there was some timing or resource conflict going on.

By then, I had already searched half the internet, hoping Stack Overflow would come to the rescue. No agents, just me, my browser tabs, and an incredibly patient coworker who put up with my constant muttering. Eventually, I came across an issue in the repository for the Web Speech API spec: [Why is SpeechRecognition not working correctly in Safari?](https://github.com/WebAudio/web-speech-api/issues/96) It was from 2021, and no one had replied to it. The description matched what I had observed so closely that I posted a comment. To my surprise and delight, I got a response from one of the repo's contributors on the very same day. However, since it was the repo of the Web Speech API _specification document_ and not of its implementation, there wasn't much that they could do except point me to the official bug tracker. To them, it sounded like an implementation bug. Welp. But as frustrating as it was, I kind of felt relieved. My code was not the problem and I could stop chasing a bug that I could not fix myself. Now what? 


## Sidestepping
Early on, while searching for a solution to get `SpeechRecognition` and `HTMLAudioElement` working together,  the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) kept popping up in my search results. Stack Overflow threads, Mozilla Developer's Network (MDN) documentation, GitHub issues. Intrigued (or even more confused), I'd occasionally click through and start reading, only to bounce off because it sounded... just a little too much.

From MDN on [target audience](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#web_audio_api_target_audience): <q>The Web Audio API can seem intimidating to those that aren't familiar with audio or music terms, and as it incorporates a great deal of functionality it can prove difficult to get started if you are a developer.</q>

So when my initial approach hit a wall, I wondered, "What if I just gave it a try?". Besides, Web Audio API features are widely supported across browsers, including Safari on iOS. And since I didn't need complex audio filters for creative effects, I could skip some of the scarier-sounding parts like _BiquadFilterNode_ or _ConvolverNode_. I went ahead, adapted my debug example and swapped out the `HTMLAudioElement` interface for Web Audio API features.


### HTMLAudioElement vs. Web Audio API
For comparison, let's first take a look at a simplified example of the `HTMLAudioElement`. 
Here, we create a new audio object with the `Audio()` constructor and set the audio source. We also define a function that later can be used to start the playback:

```js
// Audio source as base64 encoded data URL
const audioChunk = "data:audio/mpeg;base64,<data>";

const audio = new Audio();
audio.src = audioChunk;

// Must be triggered by a user interaction (autoplay policy),
// otherwise play() rejects with a NotAllowedError.
async function playAudio() {
  try {
    await audio.play();
  } catch (error) {
    console.error("Audio play failed: ", error);
  }
}
```

When using the Web Audio API, everything happens in an `AudioContext`. Inside this context, we now need to create and connect different audio nodes to build an audio graph, the main concept of the Web Audio API. Nodes come in roughly three kinds: sources (input), nodes that modify the audio, and the destination (output). Once connected, _source_ → _modification_ → _destination_ represent an audio graph: 

```js
// Initialize the audio context
const audioContext = new AudioContext();

// Volume control (modification node)
const gainNode = audioContext.createGain();

// We can use audioContext.destination to get an
// AudioDestinationNode out of the box.
// That's our output, e.g. speakers (destination node)
gainNode.connect(audioContext.destination);

// At this point, we are here: modification -> destination
```
We created a single audio context and a gain node that is wired to the speakers. This has to be done only once, on page load or when the component mounts. Due to browsers' autoplay policies, an audio context created on page load is in a `suspended` state, which we will discuss again below.

Setting up the source node takes a bit more work. Unlike HTMLAudioElement, Web Audio API requires some data preparation. Which or how many steps are needed depends on the input type and some inputs need no preparation at all:
```js
// Audio source as base64 encoded data URL
const audioChunk = "data:audio/mpeg;base64,<data>";

// Convert base64 to ArrayBuffer
const base64Audio = audioChunk.split(",")[1];
const binaryString = atob(base64Audio);
const bytes = new Uint8Array(binaryString.length);
for (let i = 0; i < binaryString.length; i++) {
  bytes[i] = binaryString.charCodeAt(i);
}

// Decode raw bytes to audio samples
const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);

// Create the source node
const source = audioContext.createBufferSource();
source.buffer = audioBuffer;
// and connect it to the gain node
source.connect(gainNode);

// Now we have our graph: source -> modification -> destination

// Play
source.start();

```
This snippet demonstrates the basic flow for a single audio chunk: prepare the data, create a source node, connect it to the graph, and start playback. If you want to dig deeper, grab a snack and head over to MDN's guide [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API). It's a great resource with lots of (live) examples!


### Audio Control: `autoplay` and `resume()`
Browsers do not allow websites to play sound whenever they want. According to their _autoplay (blocking) policies_ (e.g. from [WebKit](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/) or [Google Chrome](https://developer.chrome.com/blog/autoplay/)), audio may only start when a user has interacted with the page, such as by tapping or clicking. Otherwise, playback will be blocked.

Sound that starts out of nowhere isn't just annoying. For people who use a screen reader or have difficulty concentrating, it's a real accessibility issue, as it limits their ability to use the site and [success criterion 1.4.2 Audio Control](https://www.w3.org/TR/WCAG22/#audio-control) of the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG22/)  applies to it.

With `HTMLAudioElement`, a blocked `play()` call causes a `NotAllowedError`. The Web Audio API handles it differently. If the `AudioContext` is created without user interaction, e.g. on page load, it starts in the `suspended` state. We can connect nodes and call `start()` as many times as we want, but nothing will happen. To get it running, we need to call `resume()` after a user interaction:
```js
// Called from a user interaction, e.g. a click handler
async function ensureAudioContextReady() {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
}
```
In Safari on iOS, context state can also change to `interrupted`, e.g. after a phone call or when switching tabs or apps. So, it's worth checking this state, too.


## Oh, it's working!
Et voilà, a bit of fiddling later, the audio was playing. Most importantly, in Safari on iOS the audio playback → speech recognition cycle worked, too! Playing the audio and speech recognition no longer got in each other's way. And not only did the debug example work with the Web Audio API approach: after everything was finally implemented and pushed, the real application with the actual user and data flow did too. Sure, it's more code than before and it takes a few extra steps, but the chat component has been running reliably for over eight months now, and I'd call that a success.


## Check, one, two
Do you remember the GitHub issue I mentioned earlier? This turned out to be a documented [WebKit bug (#317741)](https://bugs.webkit.org/show_bug.cgi?id=317741) that got a fix [(PR #67772)](https://github.com/WebKit/WebKit/pull/67772). The pull request description explains that using the microphone catpure requires an audio session to stay active, but speech recognition did not ensure that. As a result, other processes may have deactivated the audio session, causing speech recognition to fail silently. I really can't tell why using the Web Audio API avoids this issue. All I can say is that it does.

The fix landed in WebKit in June 2026. Kudos to everyone involved! 👏 As far as I can tell, it hasn't reached a stable release yet, though.

## Wrapping up
I started this post by saying the best part of having options is discovering one you didn't know existed. For me, that was the Web Audio API. Of course, I had seen it before, but I just never had a use case for it. 

There is this quote from the [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API) guide: 
<q>The Web Audio API does not replace the `<audio>` media element, but rather complements it, just like `<canvas>` coexists alongside the `<img>` element. Your use case will determine what tools you use to implement audio. If you want to control playback of an audio track, the `<audio>` media element provides a better, quicker solution than the Web Audio API. If you want to carry out more complex audio processing, as well as playback, the Web Audio API provides much more power and control.</q>

In theory, my use case (play some audio chunks) was a perfect fit for the good old audio element. In practice, a bug made the call. I'm actually quite happy about. Now I know there is another tool in the box.

