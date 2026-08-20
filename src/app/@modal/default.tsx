/**
 * REQUIRED. A parallel route needs a default for every segment that does not
 * match it; without this file the build fails on any hard navigation that is
 * not /contact (brief §16).
 */
export default function ModalDefault() {
  return null
}
