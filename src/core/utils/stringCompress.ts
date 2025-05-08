import LZString from 'lz-string';

export function CompressString(str: string) {
  return LZString.compressToUTF16(str);
  //return LZString.compressToBase64(str);

}

export function DecompressString(str: string) {
  return LZString.decompressFromUTF16(str);
  //return LZString.decompressFromBase64(str);
}
