const DiffMatchPatch = require("diff-match-patch");
const pdfParse = require("pdf-parse");
const unidecode = require("unidecode");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI=new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 10,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

exports.analyzeDiff = async (doc1Buffer, doc2Buffer,userId) => {
  
  const text1 = await extractTextFromPDF(doc1Buffer);
  const text2 = await extractTextFromPDF(doc2Buffer);

  if (!text1 || !text2) {
    throw { status: 500, message: "Failed to extract text from one or both PDFs" };
  }
  const patchText=createDiff(text1,text2);
  const analysis=await analyzeWithGemini(patchText);

  if (userId) {
    await analysisService.saveUserAnalysis(userId, analysis);
  }

  return analysis;
};

async function extractTextFromPDF(buffer) {
  try {
    const pdfData = await pdfParse(buffer);
    return unidecode(pdfData.text.trim());
  } catch (error) {
    console.error("Error extracting text from PDF:", error.message);
    return null;
  }
}
function createDiff(oldText,newText)
{
  const dmp=new DiffMatchPatch();

  const patches= dmp.patch_make(oldText,newText);
  const patchesText=dmp.patch_toText(patches);
  return patchesText
  .replace(/\\n/g, " ") 
  .replace(/\n/g, " ") 
  .replace(/\\/g, "") 
  .replace(/\s+/g, " ") 
  .replace(/%[a-fA-F0-9]{2}/g, "") 
  .trim();

}

async function analyzeWithGemini(patchText) {
    try {
      const prompt = `
  Analyze the provided unified diff patch of the Romanian Penal Code. Provide the output in strictly numerical order of the article numbers as they appear in the diff patch. The numerical order must be the primary ordering principle.
  Organize your output into sections labeled '1. Substantive Changes'and '2. Expression Changes'. Within each section, list articles in the numerical order of appearance in the provided diff patch.
  Only include articles that are explicitly present in the unified diff patch. If an article is not mentioned in the diff, do not include it in the output.
  Identify all changes in the text, which means only modifications or additions that alter the legal meaning or interpretation. For expression changes focus only on word substitutions or rephrased sections that do not alter the legal meaning or movement of articles with no content change and only if they are present in the diff patch. If an article has not been modified, do not include it.
  Ignore any formatting or encoding changes that do not affect the text of the articles, such as line breaks, spacing, character encoding. Do not track these formatting changes. Only focus on text changes or section movements.
  Exclude any changes involving copyright-related content from the analysis and categorization. Do not include these changes in the output.
  
  Substantive Changes:
  Include the article number and title.
  If a new subsection has been added, state: “A new subsection has been added.”
  For all other changes, display only the modified or newly added portions of text:
  Prefix deleted or modified text with "PREVIOUS:".
  Prefix newly added text with "NEW:".
  Legal Impact Analysis: Provide a concise analysis (25 words or fewer) explaining the legal effect of the change (e.g., clarification, expansion, restriction, or alteration of legal interpretation).
  
  Expression Changes:
  Include the article number and title.
  Change Summary: Display the minor changes, focusing on changes in expression (e.g., synonyms or rephrased sections).
  
  Examples:
  Substantive Change:
  Art. 83, Conditions for Deferral of Penalty Enforcement:
  NEW:
    (21) Deferral of penalties is not permitted for offenses under Articles 335 and 336.
  Legal Impact Analysis:
    Restricts the applicability of deferral, clarifying cases where this leniency is prohibited.
  Expression Change:
    Art. 94, Supervision of Convicted Individuals:
    Only minor changes in expression detected; no legal impact.
  Diff Patch Content:
  ${patchText}
  `;
    const chatSession=model.startChat({
      generationConfig,
      history:[],});
      const result=await chatSession.sendMessage(prompt);
      return result.response.text();
    }
    catch(error){
      console.error("Error analyzing with Gemini:", error.message);
      throw new Error("Failed to analyze with Gemini API");
    }
}
