// Builds a standard PIX "Copia e Cola" payload (BR Code / EMVCo format), the
// same format banking apps expect when scanning a PIX QR code to pay.
// Spec: Banco Central do Brasil — Manual de Padrões para Iniciação do PIX.

function tlv(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

// Strip accents and anything outside the plain-ASCII range the spec expects.
function sanitize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .toUpperCase();
}

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function buildPixPayload(opts: {
  key: string;
  name: string;
  city: string;
  /** Optional fixed amount, e.g. 150.00. Leave undefined for guests to type any amount. */
  amount?: number;
  /** Reference id, shows up in the payer's bank as the transaction identifier. Max ~25 chars. */
  txid?: string;
}): string {
  const { key, name, city, amount, txid = "***" } = opts;

  const merchantAccountInfo = tlv("26", tlv("00", "br.gov.bcb.pix") + tlv("01", key));
  const amountField = amount != null ? tlv("54", amount.toFixed(2)) : "";
  const additionalData = tlv("62", tlv("05", sanitize(txid).slice(0, 25) || "***"));

  const payload =
    tlv("00", "01") + // Payload Format Indicator
    tlv("01", "11") + // Point of Initiation Method: 11 = static/reusable
    merchantAccountInfo +
    tlv("52", "0000") + // Merchant Category Code
    tlv("53", "986") + // Currency: BRL
    amountField +
    tlv("58", "BR") + // Country code
    tlv("59", sanitize(name).slice(0, 25)) + // Merchant name
    tlv("60", sanitize(city).slice(0, 15)) + // Merchant city
    additionalData +
    "6304"; // CRC tag + length, value appended below

  return payload + crc16(payload);
}
