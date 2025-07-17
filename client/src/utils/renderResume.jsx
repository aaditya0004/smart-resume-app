export const renderResumeText = (text, jobDescription = "") => {
  const allLines = text
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.includes("## RESUME ##"));
  let elements = [];
  let isHeader = true;

  const keywords = new Set(
    jobDescription
      .toLowerCase()
      .split(/[^a-zA-Z0-9]+/)
      .filter((word) => word.length > 3)
  );

  const highlightKeywords = (line) => {
    if (!jobDescription) return line;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
      line = line.replace(
        regex,
        `<span class="bg-yellow-200 font-medium rounded-sm px-1">$1</span>`
      );
    });
    return line;
  };

  let currentList = [];
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="space-y-1.5 mt-1 pl-1">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i];
    const key = `line-${i}`;
    if (line.match(/^## (.*) ##$/)) {
      isHeader = false;
    }
    if (isHeader) {
      if (i === 0) {
        elements.push(
          <h1
            key={key}
            className="text-center text-3xl font-bold text-gray-800"
            dangerouslySetInnerHTML={{ __html: highlightKeywords(line) }}
          />
        );
      } else {
        elements.push(
          <p
            key={key}
            className="text-center text-sm text-gray-600 mt-1"
            dangerouslySetInnerHTML={{ __html: highlightKeywords(line) }}
          />
        );
      }
      continue;
    }
    if (line.match(/^## (.*) ##$/)) {
      flushList();
      const headingText = line.match(/^## (.*) ##$/)[1];
      elements.push(
        <h2
          key={key}
          className="text-sm font-bold tracking-widest text-gray-700 mt-6 mb-1 border-b-2 border-gray-200 pb-1"
        >
          {headingText}
        </h2>
      );
      continue;
    }
    const nextLine = i + 1 < allLines.length ? allLines[i + 1] : "";
    const isDateLine =
      nextLine.match(/^\d{4}\s*-\s*\d{4}$/) ||
      nextLine.match(/^\(?[A-Za-z]+\s\d{4}\)?$/);
    if (
      (line.includes("Bachelor") ||
        line.includes("Class") ||
        line.includes("Organizer") ||
        line.includes("Member")) &&
      isDateLine
    ) {
      elements.push(
        <div key={key} className="flex justify-between items-center mt-2">
          <p
            className="font-semibold text-gray-800"
            dangerouslySetInnerHTML={{
              __html: highlightKeywords(line.trim()),
            }}
          />
          <p className="text-sm text-gray-500 font-medium whitespace-nowrap pl-4">
            {nextLine.trim()}
          </p>
        </div>
      );
      i++;
      continue;
    }
    if (line.trim().startsWith("➤") || line.trim().startsWith("-")) {
      const bulletText = line.trim().substring(1).trim();
      currentList.push(
        <li key={key} className="flex items-start text-gray-700 ml-1 mt-1">
          <span className="font-bold text-blue-600 mr-3 mt-1">➤</span>
          <span
            dangerouslySetInnerHTML={{
              __html: highlightKeywords(bulletText),
            }}
          />
        </li>
      );
      continue;
    }
    if (line.includes(":") && line.length < 150) {
      flushList();
      const parts = line.split(/:(.+)/);
      elements.push(
        <p key={key} className="text-gray-700 mt-1">
          <span className="font-semibold">{parts[0].trim()}:</span>
          <span
            dangerouslySetInnerHTML={{
              __html: parts[1] ? highlightKeywords(parts[1].trim()) : "",
            }}
          />
        </p>
      );
      continue;
    }
    if (!line.trim().startsWith("- GPA:") && !line.trim().match(/- \d{4}/)) {
      flushList();
      elements.push(
        <p
          key={key}
          className="font-semibold text-gray-800 mt-3"
          dangerouslySetInnerHTML={{ __html: highlightKeywords(line.trim()) }}
        />
      );
    }
  }
  flushList();
  return elements;
};