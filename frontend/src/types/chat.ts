export interface Source {
    filename: string;
    page: number;
    chunk: number;
}

export interface ChatResponse {
    answer: string;
    sources: Source[];
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: Source[];
}