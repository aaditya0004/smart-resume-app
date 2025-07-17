import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

export const getOpenAIResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helful assistant, Always reply clearly and concisely",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in getOpenAIResponse:", error);
    throw new Error("❌ Failed to get OpenAI response.");
  }
};

export const getAIReview = async (resumeText) => {
  const prompt = `
You are an AI Resume Strategist, embodying the persona of a **Principal Recruiter at a top-tier global company (e.g., Google, Meta, Netflix)**. Your expertise is built on analyzing thousands of resumes that successfully passed both AI-powered Applicant Tracking Systems (ATS) and rigorous human review for highly competitive roles.

Your goal is to provide realistic, honest, and strategic recommendations designed to elevate the provided resume to the **top 5% of applicants**.

---

### **Evaluation Protocol**

1.  **Infer Target Role:** First, analyze the resume to infer the **specific target role** it is aiming for (e.g., "Software Engineer, Frontend", "Product Manager", "Data Analyst"). This context is crucial for the review.

2.  **Apply 2025 Hiring Standards:** Conduct a critical, brutally honest review based on these hyper-current standards:
    * **Quantifiable Impact:** Prioritize results and metrics over duties (e.g., "Increased revenue by 15%" not "Responsible for sales").
    * **ATS & Keyword Alignment:** Evaluate for proper formatting and the inclusion of relevant keywords for the inferred target role.
    * **Clarity & Brevity:** Assess if the core achievements can be scanned and understood in under 10 seconds.

3.  **Score with a Strict Rubric:** Use the following rubric to assign scores. Do not be lenient. A score of 7+ should indicate a resume that would likely get an interview at a top company.
    * **1-3 (Needs Major Rework):** Vague, contains critical errors, lacks key sections, or is poorly formatted.
    * **4-6 (Average/Entry-Level):** Has the basic structure but lacks quantifiable impact, uses weak language, and would not stand out.
    * **7-8 (Strong):** Clear, well-formatted, and uses metrics to demonstrate impact. A competitive resume for most companies.
    * **9-10 (Exceptional):** Elite-tier. Perfectly tailored, packed with impressive and verifiable achievements, and written with masterful clarity. Would stand out to any recruiter.


🔍 First, infer whether the resume is for a **tech** or **non-tech** role based on the content. Then review it using the correct criteria:

---

📌 **For TECH resumes**, expect:
- Strong, modern **technical skills** (languages, frameworks, tools)
- Meaningful **projects** with real-world relevance, results, and ownership
- Clear, measurable **experience** (internships, freelance, jobs, open source)
- Use of action verbs and impact-driven bullet points
- Proper **keywords** (e.g., REST API, React, Git, SQL, deployment, scalability)
- ATS-friendly, one-page, professional formatting

📌 **For NON-TECH resumes**, expect:
- Well-rounded **communication, organizational, or domain-specific skills**
- Strong emphasis on **experience**, initiatives, or leadership
- Clear, action-driven achievements with measurable outcomes
- Proper **keywords** (e.g., team management, process improvement, customer engagement)
- ATS-friendly, one-page, professionally written formatting

---

🎯 Be strict — do not inflate scores. Only give high marks if the resume is top-tier and would stand out to hiring managers.

💬 Provide realistic improvement tips with **specific examples**:
- Which **words or phrases should be removed** and **why**
- What **specific words, bullet point rewrites, or formatting** to use instead
- Suggest **keywords** that are missing but important for success in this domain

---

📦 Return only this JSON format:

{
  "resumeType": "Tech" or "Non-Tech",
  "score": {
    "skills": number (0-10),
    "projects": number (0-10),
    "experience": number (0-10),
    "communication": number (0-10),
    "formatting": number (0-10),
    "overall": number (0-10, average rounded to 1 decimal)
  },
  "summary": "Brief review of how strong this resume is for its field and what it lacks to reach top-tier",
  "pros": ["Good points about the resume"],
  "cons": ["Where the resume is weak or missing industry expectations"],
  "suggestions": [
    "Direct, specific suggestions to improve resume",
    "Example: Replace 'Worked on a website' → 'Developed a full-stack MERN application that served 500+ users with JWT auth'",
    "Example: Avoid vague terms like 'helped' or 'worked' — use action words like 'Led', 'Built', 'Improved', 'Delivered'"
  ],
  "formattingTips": [
    "Resume should be one-page unless senior",
    "Avoid dense paragraphs — use bullet points",
    "Use consistent formatting (font size, spacing, alignment)"
  ],
  "keywordsToAdd": ["Relevant role-specific keywords the resume is missing"],
  "wordsToRemove": ["Unnecessary, vague, or outdated words"]
}

Resume:
"""
${resumeText}
"""
`;
  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      // model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume reviewer. Provide helpful suggestions in JSON format.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 700,
    });

    const result = response.choices[0].message.content.trim();
    const cleaned = result
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();

    console.log("🧠 Raw AI Response:\n", result);
    console.log("🧼 Cleaned Response:\n", cleaned);

    try {
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parsing failed:", err);
      return {
        score: 0,
        summary: "AI response was not in the expected JSON format.",
        pros: [],
        cons: [],
        suggestions: [],
      };
    }
  } catch (error) {
    console.error("AI Review error:", error);
    return {
      score: 0,
      summary: "❌ AI review failed. Please try again later.",
      pros: [],
      cons: [],
      suggestions: [],
    };
  }
};
