import { AudioPlayerManager } from '../modules/audioPlayer.js';

const AUDIO_SELECTORS = ['.audio-player', '.efsvp-audio'];

const hasAudioPlayer = (root = document) => AUDIO_SELECTORS.some((selector) => root.querySelector(selector));

/**
 * Initialize WaveSurfer-based audio players when present on the page.
 * @param {Object} context
 * @param {Record<string, any>} context.modules
 * @param {Document|HTMLElement} [context.root=document]
 * @returns {Object}
 */
export const initAudioBlock = (context = {}) => {
  const { modules = {}, root = document } = context;

  if (!hasAudioPlayer(root)) {
    return { ...context, modules };
  }

  if (!modules.audioPlayers) {
    modules.audioPlayers = new AudioPlayerManager();
  }

  return { ...context, modules };
};

export default initAudioBlock;
