import { ref, onMounted, onUnmounted, readonly, computed } from "vue";
import { useVapiAudioEnhancer } from "./useVapiAudioEnhancer";
import Vapi from "@vapi-ai/web";

type CallStatus =
  | "Idle"
  | "Menghubungkan..."
  | "Terhubung"
  | "Panggilan Selesai"
  | "Error";

export function useVapi(assistantId: string, publicKey: string) {
  let vapi: any = null; // Instance Vapi
  let enhancer: any = null; // Audio enhancer

  const isCalling = ref(false);
  const callStatus = ref<CallStatus>("Idle");
  const transcript = ref<{ role: string; text: string }[]>([]);

  onMounted(() => {
    if (!publicKey || !assistantId) {
      console.error("Vapi Public Key atau Assistant ID tidak ditemukan!");
      callStatus.value = "Error";
      return;
    }

    vapi = new Vapi(publicKey);

    vapi.on("call-start", () => {
      isCalling.value = true;
      callStatus.value = "Terhubung";
      transcript.value = [];

      // Aktifkan enhancer
      enhancer = useVapiAudioEnhancer(vapi, {
        volume: 1.8,
        bassGain: 5,
        trebleGain: 3,
      });
    });

    vapi.on("call-end", () => {
      isCalling.value = false;
      callStatus.value = "Panggilan Selesai";

      // Matikan enhancer
      if (enhancer?.stop) enhancer.stop();
    });

    vapi.on("error", (e: Error) => {
      console.error("Vapi Error:", e);
      isCalling.value = false;
      callStatus.value = "Error";
    });

    // Transkrip real-time
    vapi.on("transcript", (payload: any) => {
      if (payload.type !== "transcript" || !payload.transcript) return;

      const lastMessage = transcript.value[transcript.value.length - 1];
      if (lastMessage && lastMessage.role === payload.role) {
        lastMessage.text = payload.transcript;
      } else {
        transcript.value.push({ role: payload.role, text: payload.transcript });
      }
    });
  });

  onUnmounted(() => {
    if (vapi) {
      vapi.stop();
      vapi = null;
    }
    if (enhancer?.stop) enhancer.stop();
  });

  const start = (instructions: string) => {
    if (vapi && !isCalling.value) {
      callStatus.value = "Menghubungkan...";
      vapi
        .start(assistantId, {
          firstMessage: instructions, // Hapus "overrideConfig" karena bikin error 400
        })
        .catch((err: any) => {
          console.error("Gagal memulai Vapi:", err);
          callStatus.value = "Error";
        });
    }
  };

  const stop = () => {
    if (vapi && isCalling.value) {
      vapi.stop();
    }
  };

  const toggleCall = (instructions: string) => {
    if (isCalling.value) stop();
    else start(instructions);
  };

  const statusInfo = computed(() => {
    switch (callStatus.value) {
      case "Terhubung":
        return { text: "Terhubung", class: "bg-green-100 text-green-800" };
      case "Menghubungkan...":
        return {
          text: "Menghubungkan...",
          class: "bg-yellow-100 text-yellow-800",
        };
      case "Panggilan Selesai":
        return { text: "Selesai", class: "bg-blue-100 text-blue-800" };
      case "Error":
        return { text: "Error", class: "bg-red-100 text-red-800" };
      default:
        return { text: "Siap", class: "bg-gray-100 text-gray-800" };
    }
  });

  return {
    isCalling: readonly(isCalling),
    callStatus: readonly(callStatus),
    transcript: readonly(transcript),
    statusInfo,
    toggleCall,
  };
}
