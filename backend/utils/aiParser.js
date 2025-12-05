import "dotenv/config";
import Groq from "groq-sdk";
import * as chrono from "chrono-node";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function aiParseTask(text) {
  try {
    console.log("🔍 Calling Groq AI...");

    const prompt = `
You are a task parser. Extract task details strictly into JSON.

Format only:
{
 "title": "clean title without extra words",
 "priority": "low|medium|high|critical",
 "status": "todo|in-progress|done",
 "dueDate": "YYYY-MM-DD|null"
}

Rules:
- Title must be short and cleaned (remove 'task', 'create', 'add', 'priority', filler words + dates)
- Default priority = "medium" if not specified
- Detect words: high/urgent -> high, critical->critical, medium/low as given
- Default status = "todo"
- Use natural dates like "today", "tomorrow", "next monday" and convert later
- dueDate must be ISO or null

Sentence: "${text}"
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    let raw = response.choices[0].message.content.trim();
    raw = raw.replace(/```json|```/g, "").trim();

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI returned invalid JSON");

    let parsed = JSON.parse(jsonMatch[0]);
    const lower = text.toLowerCase();

    if (/critical/.test(lower)) parsed.priority = "critical";
    else if (/urgent|high/.test(lower)) parsed.priority = "high";
    else if (/medium/.test(lower)) parsed.priority = "medium";
    else if (/low/.test(lower)) parsed.priority = "low";
    else parsed.priority = parsed.priority ?? "medium";

    if (/in progress/.test(lower)) parsed.status = "in-progress";
    else if (/done|complete|finished/.test(lower)) parsed.status = "done";
    else parsed.status = parsed.status ?? "todo";

parsed.title = parsed.title
  .replace(/^(create|add|make|task|schedule|set|please)\s+/gi, "")
  .replace(/(priority|task|to|please)/gi, "")
  .replace(/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next|this|upcoming|coming|in \d+ days)\b/gi, "")
  .replace(/\s+/g, " ")
  .trim();

if(/^\b(deployment|api|report|billing|folder|charts)\b/i.test(parsed.title))
    parsed.title = "Finish " + parsed.title;

parsed.title = parsed.title.charAt(0).toUpperCase() + parsed.title.slice(1);


    parsed.title = parsed.title.charAt(0).toUpperCase() + parsed.title.slice(1);

    const date = chrono.parseDate(text);
    parsed.dueDate = date ? date.toISOString().slice(0, 10) : null;

    return parsed;

  } catch (err) {
    console.log("❌ Groq failed →", err.message);
    return null;
  }
}
