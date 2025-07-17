import getStream from "get-stream";
import { PassThrough } from "stream";
import PDFDocument from "pdfkit";

export const generatePDFBuffer = async (textContent) => {
  const doc = new PDFDocument();
  const stream = doc.pipe(new PassThrough());

  doc.text(textContent);
  doc.end();

  const buffer = await getStream(stream); // Correct usage in ESM
  return buffer;
};
