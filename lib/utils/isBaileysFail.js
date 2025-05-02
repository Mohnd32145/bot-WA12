export default function isBaileysFail(error) {
  return error?.output?.statusCode >= 400 || error?.status >= 400;
}