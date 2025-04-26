import FileUploader from "@/components/utilidad/file-uploader";


export default function HomePage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Subida con Server Action</h1>
      <FileUploader userId="usuario123" />
    </main>
  );
}
