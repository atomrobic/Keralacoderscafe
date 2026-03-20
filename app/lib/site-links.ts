export const WHATSAPP_GATE_PATH = "/join/whatsapp";
export const GITHUB_REPO_URL =
  "https://github.com/KERALACODERSCAFE/Keralacoderscafe";

const WHATSAPP_INVITE_HOST = "https://chat.whatsapp.com";
const WHATSAPP_INVITE_CODE = "Kd3tVwJfjjh0HRZtoYfxcm";

export function getWhatsAppInviteUrl() {
  return `${WHATSAPP_INVITE_HOST}/${WHATSAPP_INVITE_CODE}`;
}
