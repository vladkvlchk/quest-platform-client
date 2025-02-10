export interface IAboutLevel {
  id: string;
  type: "about";
  name: "About Quest";
  title: string;
  main_picture: File | undefined;
  description: string;
  time_limit: number;
  difficulty: "easy" | "normal" | "hard";
}
