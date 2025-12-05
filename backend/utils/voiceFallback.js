function extractPriority(text) {
  text = text.toLowerCase();
  if (/critical|urgent/i.test(text)) return "critical";
  if (/high/i.test(text)) return "high";
  if (/medium|normal/i.test(text)) return "medium";
  if (/low/i.test(text)) return "low";
  return "medium"; 
}

function extractStatus(text) {
  text = text.toLowerCase();
  if (/in\s*progress|working/i.test(text)) return "in-progress";
  if (/done|complete|finished/i.test(text)) return "done";
  return "todo"; 
}

function extractDueDate(text) {
  text = text.toLowerCase();
  const today = new Date();

  if (text.includes("today")) return format(today);
  if (text.includes("tomorrow")) return format(addDays(today,1));

  const inDays = text.match(/in (\d+) days?/);
  if (inDays) return format(addDays(today, Number(inDays[1])));

  const inWeeks = text.match(/in (\d+) weeks?/);
  if (inWeeks) return format(addDays(today, Number(inWeeks[1])*7));

  const weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  for (let i=0;i<7;i++){
    if(text.includes(weekdays[i])){
      const target = nextWeekday(today,i);
      return format(target);
    }
  }

  const numeric = text.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (numeric) {
    const [_,d,m,y] = numeric;
    return format(new Date(`${y}-${m}-${d}`));
  }

  const monthNames = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
  const dm = text.match(/(\d{1,2})\s*(st|nd|rd|th)?\s*([a-z]+)/i);
  if(dm && monthNames.test(dm[3])){
    return format(new Date(`${dm[3]} ${dm[1]}, ${today.getFullYear()}`));
  }

  return null;
}

function extractTitle(text) {
  text = text.toLowerCase();

  const removeWords = [
    "create","add","make","assign","set","please","can you","need to",
    "a","an","task","priority","high","medium","low","critical","todo",
    "in progress","complete","done","to"
  ];

  let title = text;
  removeWords.forEach(word=>{
    title = title.replace(new RegExp("\\b"+word+"\\b","gi")," ");
  });

  title = title
    .replace(/due.*/gi,"")
    .replace(/\b(today|tomorrow|next|this|upcoming)\b.*/gi,"")
    .replace(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b.*/gi,"")
    .replace(/\b(in \d+ days?)\b.*/gi,"")
    .replace(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}.*/gi,"")
    .replace(/\d{1,2}(st|nd|rd|th)?\s+[A-Za-z]+.*/gi,"");

  title = title.replace(/\s+/g," ").trim();

  if (!title.trim()) return "Untitled Task";
return title.charAt(0).toUpperCase() + title.slice(1);

}

function addDays(d,x){ const dt=new Date(d); dt.setDate(dt.getDate()+x); return dt; }
function format(d){ return d.toISOString().slice(0,10); }
function nextWeekday(current, target){
  const d=new Date(current);
  const diff=(target+7-d.getDay())%7 || 7;
  d.setDate(d.getDate()+diff);
  return d;
}

module.exports = { extractTitle, extractPriority, extractStatus, extractDueDate };
