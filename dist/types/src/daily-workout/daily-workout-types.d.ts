export type CognitiveExercise = {
    cogex_id: string;
    version: string;
    is_available: boolean;
    completed_today: boolean;
};
export type Content = {
    content_id: string;
    completed_today: boolean;
};
export type DailyWorkoutRecommendation = {
    cognitive_exercises: CognitiveExercise[];
    contents: Content[];
};
