export function useVapiAudioEnhancer(
  vapi: any,
  options?: {
    volume?: number;
    bassGain?: number;
    trebleGain?: number;
  }
) {
  let audioContext: AudioContext | null = null;
  let sourceNode: MediaStreamAudioSourceNode | null = null;
  let gainNode: GainNode | null = null;
  let bassFilter: BiquadFilterNode | null = null;
  let trebleFilter: BiquadFilterNode | null = null;

  const defaultOptions = {
    volume: options?.volume ?? 1.5, // default 1.5x
    bassGain: options?.bassGain ?? 4,
    trebleGain: options?.trebleGain ?? 2,
  };

  const init = async () => {
    if (!vapi || !vapi._audioStream) {
      console.warn("Vapi audio stream tidak tersedia.");
      return;
    }

    try {
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const stream = vapi._audioStream as MediaStream;
      sourceNode = audioContext.createMediaStreamSource(stream);

      // Gain node untuk kontrol volume
      gainNode = audioContext.createGain();
      gainNode.gain.value = defaultOptions.volume;

      // Bass filter
      bassFilter = audioContext.createBiquadFilter();
      bassFilter.type = "lowshelf";
      bassFilter.frequency.value = 200;
      bassFilter.gain.value = defaultOptions.bassGain;

      // Treble filter
      trebleFilter = audioContext.createBiquadFilter();
      trebleFilter.type = "highshelf";
      trebleFilter.frequency.value = 3000;
      trebleFilter.gain.value = defaultOptions.trebleGain;

      // Rangkaian audio: source -> bass -> treble -> gain -> output
      sourceNode.connect(bassFilter);
      bassFilter.connect(trebleFilter);
      trebleFilter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      console.log("Audio enhancer aktif dengan volume:", defaultOptions.volume);
    } catch (error) {
      console.error("Gagal inisialisasi enhancer audio:", error);
    }
  };

  const stop = () => {
    try {
      gainNode?.disconnect();
      bassFilter?.disconnect();
      trebleFilter?.disconnect();
      sourceNode?.disconnect();
      audioContext?.close();
      console.log("Audio enhancer dimatikan.");
    } catch (error) {
      console.error("Gagal menghentikan enhancer audio:", error);
    }
  };

  init(); // jalankan otomatis

  return { stop };
}
