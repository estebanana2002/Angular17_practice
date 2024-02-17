export interface Answer {
  answer: string;
  correct: boolean;
}

export interface Question {
  question: string;
  answer: Answer[];
}

export interface Exam {
  group: string;
  subject: string;
  title: string;
  teacher: string;
  description: string[];
  date: Date;
  duration: number
  questions: Question[];
}
