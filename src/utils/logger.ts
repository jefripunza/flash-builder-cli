export function log(message: string, isVerbose = false, verbose = false) {
  if (!isVerbose || verbose) {
    console.log(message);
  }
}
