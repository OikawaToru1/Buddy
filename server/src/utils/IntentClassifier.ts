enum IntentType {
    Document_Summary = "Document_Summary",
    IntentToQuery = "IntentToQuery",
    General_Chat = "General_Chat"
}

export const classifyIntent = (query : string) : IntentType =>{
    if(isIntentToQuery(query)) {
        return IntentType.IntentToQuery;
    } else if(isDocumentLevelQuery(query)) {
        return IntentType.Document_Summary;
    } else {
        return IntentType.General_Chat;
    }
}


export const isDocumentLevelQuery = (query : string) : boolean => {
    const lowerCaseQuery = query.toLowerCase().trim();

    const documentLevelKeywords = [
      "summarize",
      "summary",
      "explain like i'm 5",
      "quiz me",
      "generate questions",
      "main points",
      "key takeaways",
      "what is this document about",
      "document overview",
      "document summary",
      "tl;dr",
      "gist of this document",
      "briefly explain this document",
      "What is this document about?",

      "What are the key takeaways?",

      "What is the summary?",
      "Can you summarize this document?",

      "Explain this document like I'm 5.",
      "Can you explain this document like I'm 5?",

      "Quiz me on this document.",
      "Can you generate questions based on this document?"
    ];

    return documentLevelKeywords.some(keyword => lowerCaseQuery.includes(keyword));
}

export const isIntentToQuery = (query : string) : boolean => {
    const lowerCaseQuery = query.toLowerCase().trim();


    const queryIntents = ["what", "how", "why", "when", "where", "who", "which", "whom"];

    if( queryIntents.some(intent => lowerCaseQuery.endsWith("?") || queryIntents.some(intent => lowerCaseQuery.startsWith(intent + " "))) )
    {
        return true;
    }
    
    return false;
}