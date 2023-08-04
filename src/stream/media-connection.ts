import SignalConnection from './signal-conenction';
import EventEmitter from 'wolfy87-eventemitter';

interface PeerConnectionConfig {
  iceServers?: RTCIceServer[]
}
// interface PeerConnectionConstraint {

// }

export enum MediaConnectionEvents {
  TRACK = 'track',
  ICE_CANDIDATE = 'icecandidate',
  ICE_CONNECTION_STATE_CHANGE = 'iceconnectionstatechange',
  SIGNALING_STATE_CHANGE = 'signalingstatechange',
  CONNECTIONS_STATE_CHANGE = 'connectionstatechange',
  DATA_CHANNEL = 'datachannel'
}




export interface MediaConnectionOnFun {
  (
    name: MediaConnectionEvents.ICE_CANDIDATE,
    handler: (event: RTCPeerConnectionIceEvent) => void,
  ): void;
  (
    name: MediaConnectionEvents.ICE_CONNECTION_STATE_CHANGE,
    handler: (event: Event) => void,
  ): void;
}

export type MediaConnectionOffFun = MediaConnectionOnFun;

class MediaConnection {
  private peerConnection: RTCPeerConnection;
  private peerConnectionConfig: PeerConnectionConfig;
  private signalConnection: SignalConnection;
  private eventEmitter = new EventEmitter();
  on:MediaConnectionOnFun = this.eventEmitter.on;

  off: MediaConnectionOffFun = this.eventEmitter.off;

  constructor(signalConnection: SignalConnection ) {
    this.signalConnection = signalConnection;
  }
  connect() {
    this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
    this.bindEvents();
  }

  private bindEvents() {
    this.peerConnection.addEventListener(MediaConnectionEvents.TRACK, this.onTrack);
    this.peerConnection.addEventListener(MediaConnectionEvents.ICE_CANDIDATE, this.onIceCandidate.bind(this)),
    this.peerConnection.addEventListener(MediaConnectionEvents.ICE_CONNECTION_STATE_CHANGE, this.onIceConnectionStateChange.bind(this)),
    this.peerConnection.addEventListener(MediaConnectionEvents.SIGNALING_STATE_CHANGE, this.onSignalingStateChange.bind(this)),
    this.peerConnection.addEventListener(MediaConnectionEvents.CONNECTIONS_STATE_CHANGE, this.onConnectionStateChange.bind(this)),
    this.peerConnection.addEventListener(MediaConnectionEvents.DATA_CHANNEL, this.onDatachannel.bind(this))
  }

  private onTrack(event: RTCTrackEvent) {
    this.eventEmitter.emit(MediaConnectionEvents.TRACK, event)
  }

  private onIceCandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.eventEmitter.emit(MediaConnectionEvents.ICE_CANDIDATE, event)
    } else {
      /* there are no more candidates coming during this negotiation */
      this.peerConnection.removeEventListener(MediaConnectionEvents.ICE_CANDIDATE, this.onIceCandidate)
    }
  }

  private onIceConnectionStateChange() {

  }

  private onSignalingStateChange() {

  }

  private onConnectionStateChange(event: Event) {
    this.eventEmitter.emit(MediaConnectionEvents.CONNECTIONS_STATE_CHANGE, event)
  }

  private onDatachannel(event: RTCDataChannelEvent) {

  }

  private resetEvents() {

  }

  destroy () {
    this.resetEvents();
  }
}