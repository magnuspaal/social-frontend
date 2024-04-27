

export const getStringFromReadableStream = async (readableStream: ReadableStream) => {
  const reader = readableStream.getReader()
  let value = (await reader.read()).value as Uint8Array;

  let read;
  while (!(read = await reader.read()).done) {
    const newValue = new Uint8Array(value.length + read.value.length)
    newValue.set(value)
    newValue.set(read.value, value.length)
    value = newValue
  }

  return new TextDecoder("utf-8").decode(value);
}