import ContentRow from "./ContentRow.jsx";
import { useMediaList } from "../hooks/useMediaList";

// A ContentRow that fetches its own data.
export default function RemoteRow({ title, path, params, mediaType }) {
  const list = useMediaList(path, params, mediaType);
  return <ContentRow title={title} {...list} />;
}
